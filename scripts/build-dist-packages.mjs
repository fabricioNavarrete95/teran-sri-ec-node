#!/usr/bin/env node
/**
 * Ensambla, a partir del monorepo YA compilado, un directorio por paquete con
 * exactamente lo que va a vivir en su rama `dist-*`:
 *
 *   dist/          → package.json (saneado) + dist/ + README.md + LICENSE.md   (sri-ec)
 *   dist-nestjs/   → ídem                                                    (sri-ec-nestjs)
 *
 * Esos directorios se publican en ramas huérfanas del mismo repo (ver
 * `.github/workflows/dist-branches.yml`). Cada rama tiene el paquete en su
 * RAÍZ, porque una dependencia git se resuelve contra la raíz del repo:
 * `npm install github:usuario/repo#dist` instala el paquete que está en la raíz
 * de esa rama. Dos paquetes ⇒ dos ramas: una sola rama no puede servir a los
 * dos, porque la instalación siempre toma la raíz del ref.
 *
 * El `package.json` se sanea a propósito: quien instala desde git NO compila ni
 * testea, así que `scripts` y `devDependencies` solo confunden (`prepare`
 * ausente ⇒ npm no intenta construir nada en la instalación). `publishConfig`
 * también se descarta: estas ramas no se publican a ningún registry.
 *
 * Uso:
 *   npm run build && node scripts/build-dist-packages.mjs [directorio-salida]
 *
 * @module scripts/build-dist-packages
 */
import { cpSync, existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const RAIZ = resolve(fileURLToPath(new URL('..', import.meta.url)));

/** Paquetes del monorepo que se publican como dependencia git, con su rama. */
const PAQUETES = [
  { directorio: 'packages/sri-ec', rama: 'dist' },
  { directorio: 'packages/nestjs-sri-ec', rama: 'dist-nestjs' },
];

/** Campos del `package.json` que NO tienen sentido en una instalación desde git. */
const CAMPOS_DESCARTADOS = ['scripts', 'devDependencies', 'publishConfig'];

const salida = resolve(process.argv[2] ?? join(RAIZ, 'dist-packages'));

for (const { directorio, rama } of PAQUETES) {
  const origen = join(RAIZ, directorio);
  const distOrigen = join(origen, 'dist');

  if (!existsSync(distOrigen)) {
    console.error(`Falta ${directorio}/dist — corre \`npm run build\` antes de este script.`);
    process.exit(1);
  }

  const pkg = JSON.parse(readFileSync(join(origen, 'package.json'), 'utf8'));
  for (const campo of CAMPOS_DESCARTADOS) delete pkg[campo];
  // Solo se empaqueta lo compilado + la documentación del paquete.
  pkg.files = ['dist', 'README.md', 'LICENSE.md'];

  const destino = join(salida, rama);
  rmSync(destino, { recursive: true, force: true });
  mkdirSync(destino, { recursive: true });

  writeFileSync(join(destino, 'package.json'), `${JSON.stringify(pkg, null, 2)}\n`);
  cpSync(distOrigen, join(destino, 'dist'), { recursive: true });
  for (const archivo of ['README.md', 'LICENSE.md']) {
    if (existsSync(join(origen, archivo))) {
      cpSync(join(origen, archivo), join(destino, archivo));
    }
  }

  console.log(`${rama}: ${pkg.name}@${pkg.version} → ${destino}`);
}

console.log(`Listo. Paquetes listos para publicar en ${salida}`);
