# Consumir `sri-ec` desde este monorepo, en otro proyecto

Este repo es un **monorepo** con dos paquetes:

| Paquete | Contenido |
| --- | --- |
| `sri-ec` | Cliente SRI: firma, emisión, transporte y el subpath `sri-ec/ride` |
| `sri-ec-nestjs` | Módulo NestJS (`SriModule`) sobre `sri-ec` |

Una dependencia git instala **la raíz del repo en ese ref**, y npm no soporta
subdirectorios de un repo git. Por eso CI publica en este mismo repo **una rama
huérfana por paquete**, con el paquete compilado en la raíz:

| Rama | Paquete que instala |
| --- | --- |
| `dist` | `sri-ec` |
| `dist-nestjs` | `sri-ec-nestjs` |

Sin registry, sin tokens, sin `npm publish` y sin compilar nada en la instalación.

## Instalación

En el `package.json` de tu proyecto:

```json
{
  "dependencies": {
    "sri-ec": "github:fabricioNavarrete95/teran-sri-ec-node#dist",
    "sri-ec-nestjs": "github:fabricioNavarrete95/teran-sri-ec-node#dist-nestjs",
    "@nestjs/common": "^11.0.0"
  }
}
```

```bash
npm install
```

> `@nestjs/common` es peer de `sri-ec-nestjs`. Si no usas el módulo NestJS, omite
> esa dependencia y su peer.

## Fijar la versión

`#dist` **se mueve** con cada push a `main`. Eso está bien para desarrollo, pero
un build de producción debe quedar clavado. Hay dos mecanismos:

1. **El lockfile.** `npm install` escribe el commit resuelto
   (`"resolved": "git+https://…#<sha>"`) y `npm ci` reinstala exactamente ese.
   Es lo que ya garantiza reproducibilidad si commiteas `package-lock.json`.
2. **SHA explícito.** Para clavarlo a mano:

   ```bash
   git ls-remote https://github.com/fabricioNavarrete95/teran-sri-ec-node.git \
     refs/heads/dist refs/heads/dist-nestjs
   ```

   ```json
   "sri-ec": "github:fabricioNavarrete95/teran-sri-ec-node#<sha>"
   ```

No hay tags a propósito: cada push reescribe ambas ramas y el SHA es la verdad.
Si más adelante quieres tags inmutables por versión, se agregan al workflow.

## La trampa: el peer de `sri-ec-nestjs`

`sri-ec-nestjs` declara `peerDependencies: { "sri-ec": "^0.4.0" }`. Si instalas
**solo** el paquete de NestJS, npm resuelve ese peer contra el registry público y
te baja el `sri-ec` **de npmjs** (el proyecto original de JonathanTerán), no este
fork:

```
"resolved": "https://registry.npmjs.org/sri-ec/-/sri-ec-0.4.0.tgz"
```

Verifícalo siempre:

```bash
npm ls sri-ec
# correcto:   sri-ec@0.4.0 -> github:fabricioNavarrete95/teran-sri-ec-node#...
# incorrecto: sri-ec@0.4.0   (sin URL de git ⇒ vino de npmjs)

npm ls sri-ec --json | grep -i registry.npmjs.org   # no debe devolver nada
```

Por eso el bloque de instalación declara **los dos paquetes**: el peer queda
satisfecho por la dependencia git y npm no consulta el registry.

## Uso

```ts
// core
import { SriClient, Ambiente, TipoComprobante, type Factura } from 'sri-ec';

// RIDE (requiere `npm install pdfkit`; el QR es opcional: `qrcode`)
import { generarRide } from 'sri-ec/ride';

// NestJS
import { SriModule } from 'sri-ec-nestjs';
```

```ts
@Module({
  imports: [
    SriModule.forRoot({
      ambiente: Ambiente.Pruebas,
      certificate: { p12: readFileSync('firma.p12'), password: process.env.SRI_P12_PASSWORD! },
    }),
  ],
})
export class AppModule {}
```

Requisitos: **Node.js >= 24**. `pdfkit` solo si generas RIDE; `qrcode` solo si
activas `opciones.incluirQr`.

## Docker / Coolify

Una dependencia git hace que npm clone el repo durante la instalación, así que la
imagen necesita `git`:

```dockerfile
FROM node:24-alpine
RUN apk add --no-cache git          # imprescindible: npm clona el repo
WORKDIR /app
COPY package*.json ./
RUN --mount=type=cache,target=/root/.npm npm ci
COPY . .
CMD ["node", "dist/main.js"]
```

- **Repo público** ⇒ sin credenciales. **Si pasa a privado**, el clon necesita
  auth: un build secret con un PAT (`https://x-access-token:${GITHUB_TOKEN}@github.com/...`)
  o un deploy key con `--mount=type=ssh`.
- `ignore-scripts=true` no molesta: estas ramas no tienen `prepare` ni install
  scripts.
- npm registra el `resolved` como `git+ssh://git@github.com/…` en el lockfile
  aunque declares `github:` o `git+https://…`: la descarga va por https y **no
  requiere llaves SSH** (verificado en un contenedor sin `~/.ssh`). Si algún
  runner forzara ssh, el parche conocido es
  `git config --global url."https://github.com/".insteadOf "ssh://git@github.com/"`.
- El techo de caché de npm es local al runner; el clon del repo se repite por
  build (son ~560 KB).

## Actualizar

```bash
# 1) push a main  → el workflow reescribe `dist` y `dist-nestjs`
# 2) en tu proyecto
npm install       # resuelve el ref nuevo y actualiza el lockfile
```

Si commiteaste el lockfile, `npm ci` seguirá instalando el commit anterior hasta
que actualices el lock. Es el comportamiento correcto: el build no cambia solo.

## Cómo probarlo

**1) Local, sin tocar GitHub** (usa el mismo contenido que publicaría CI):

```bash
npm run build
node scripts/build-dist-packages.mjs /tmp/pkgs

# simula cada rama como un repo git con el paquete en la raíz
for r in dist dist-nestjs; do
  ( cd "/tmp/pkgs/$r" && git init -q . \
    && git -c user.email=ci@local -c user.name=ci add -A \
    && git -c user.email=ci@local -c user.name=ci commit -qm "dist $r" )
done

# consumidor de prueba
mkdir -p /tmp/consumidor && cd /tmp/consumidor && npm init -y >/dev/null
npm install "git+file:///tmp/pkgs/dist" "git+file:///tmp/pkgs/dist-nestjs" @nestjs/common pdfkit
node -e "console.log(typeof require('sri-ec').SriClient, typeof require('sri-ec/ride').generarRide, typeof require('sri-ec-nestjs').SriModule)"
npm ls sri-ec
```

**2) En GitHub.** Un pull request hacia `main` ya dispara el workflow en modo
verificación (sin publicar), así que se puede validar antes de mergear. Después
del merge a `main`:

```bash
git ls-remote https://github.com/fabricioNavarrete95/teran-sri-ec-node.git refs/heads/dist refs/heads/dist-nestjs
# deben aparecer dos SHA; si no, revisa la pestaña Actions y que
# Settings → Actions → General → Workflow permissions esté en "Read and write"
```

**3) En un consumidor real**: instala con los refs de la tabla de arriba y corre
`npm ls sri-ec` para confirmar que la procedencia es git, no npmjs.

## Cómo se genera (mantenimiento)

- `.github/workflows/dist-branches.yml`: compila y publica ambas ramas en cada
  push a `main` que toque los paquetes, o a mano con *workflow_dispatch*.
  En **pull requests hacia `main`** el workflow corre igual pero **solo verifica**
  (ensambla el paquete y lo instala como dependencia git en un proyecto
  desechable): una rama sin mergear nunca reescribe `dist`/`dist-nestjs`.
- `scripts/build-dist-packages.mjs`: ensambla cada paquete — copia `dist/`,
  `README.md` y `LICENSE.md`, y sanea el `package.json` quitando `scripts`,
  `devDependencies` y `publishConfig` (quien instala desde git no compila ni
  testea).
- Las ramas `dist` y `dist-nestjs` son **generadas**: no se editan a mano y cada
  push las reescribe por completo (`--force`).

## Limitaciones conocidas

- Sin `npm audit` ni avisos de seguridad del registry sobre estos paquetes.
- Dos paquetes ⇒ dos clones del repo al instalar (uno por paquete).
- `#dist` es móvil: sin tags, la reproducibilidad vive en el lockfile o en un SHA
  explícito.
- El primer `npm install` en una máquina nueva requiere acceso a GitHub.
