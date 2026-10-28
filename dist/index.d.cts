import { ModuleMetadata, DynamicModule } from '@nestjs/common';
import { Ambiente, SriTransport, Certificate, SriClient, Comprobante, BatchEmitterOptions, BatchEmitter } from 'sri-ec';

/**
 * Tokens de inyección de `sri-ec-nestjs`. Símbolos (no strings)
 * para evitar colisiones con tokens de otras librerías en el contenedor de
 * Nest — mismo patrón que `getConnectionToken()` en `@nestjs/typeorm` o los
 * tokens internos de `@nestjs/config`.
 */
/**
 * Token del `SriClient` (ver `sri-ec`) configurado por
 * {@link SriModule}. Úsese con `@Inject(SRI_CLIENT)` cuando se necesite el
 * cliente crudo en vez de la fachada {@link SriService}.
 */
declare const SRI_CLIENT: unique symbol;
/**
 * Token de la configuración **no sensible** del módulo (`SriRuntimeOptions`:
 * `ambiente`, `transport`, `validate`), sea de la llamada síncrona a
 * `forRoot()` o del `useFactory` de `forRootAsync()`. Se exporta por si un
 * consumidor avanzado necesita leer `ambiente` fuera de {@link SriService}.
 *
 * **Nunca contiene el certificado ni el par `{ p12, password }`**: el módulo
 * los consume al construir el `SriClient`, antes de registrar nada en el
 * contenedor, para que una traza de error o un volcado del contenedor no
 * puedan exponer la contraseña del `.p12`.
 */
declare const SRI_MODULE_OPTIONS: unique symbol;

/**
 * Configuración **no sensible** del módulo: lo único que queda registrado en
 * el contenedor de Nest bajo `SRI_MODULE_OPTIONS`.
 *
 * El certificado (y muy especialmente el par `{ p12, password }`) se resuelve
 * ANTES de que nada entre al contenedor y nunca se registra: un volcado del
 * contenedor o un serializador de errores de Nest imprimiría la contraseña
 * del `.p12` en claro.
 */
interface SriRuntimeOptions {
    ambiente: Ambiente;
    /** Por defecto `new FetchSoapTransport()`, igual que `SriClient`. */
    transport?: SriTransport;
    /** `false` para saltar `assertValid()` antes de firmar. `true` por defecto. */
    validate?: boolean;
}
/**
 * Opciones de {@link SriModule.forRoot}. Solo `ambiente` y `certificate` son
 * obligatorios — el resto tiene un default sensato, igual que
 * `SriClientOptions` en `sri-ec`.
 */
interface SriModuleOptions extends SriRuntimeOptions {
    /**
     * Un `Certificate` ya cargado (p.ej. si el consumidor ya llamó
     * `loadCertificate()` por su cuenta, o lo obtiene de un secret manager en
     * ese formato), o el par `.p12`/contraseña crudo — en ese caso el módulo
     * llama `loadCertificate()` internamente antes de construir el `SriClient`.
     *
     * **Cuándo ocurre esa carga** difiere según el punto de entrada, porque el
     * certificado se resuelve siempre fuera del contenedor de DI (ver
     * `SriModule`):
     * - {@link SriModule.forRoot}: **al evaluar la definición del módulo**, es
     *   decir en la propia llamada a `forRoot()`, antes de que Nest compile
     *   nada. Un `.p12` o una contraseña inválidos fallan de inmediato, en el
     *   import del módulo, con `CertificateError` — no en la primera inyección.
     * - {@link SriModule.forRootAsync}: al resolver el provider interno que
     *   ejecuta la `useFactory`, ya durante la compilación del módulo (la
     *   `useFactory` se invoca exactamente una vez).
     *
     * En ninguno de los dos casos el `.p12` ni la contraseña quedan
     * registrados bajo un token del contenedor.
     */
    certificate: {
        p12: Uint8Array;
        password: string;
    } | Certificate;
    /** Registra el módulo como global (`@Global()`). `false` por defecto. */
    isGlobal?: boolean;
}
/** Opciones de {@link SriModule.forRootAsync} — mismo shape que `ConfigModule.forRootAsync`/`TypeOrmModule.forRootAsync` de Nest. */
interface SriModuleAsyncOptions extends Pick<ModuleMetadata, 'imports'> {
    /** Tokens a inyectar como argumentos de `useFactory`, en el mismo orden. */
    inject?: any[];
    /** Registra el módulo como global. `false` por defecto. */
    isGlobal?: boolean;
    /** Produce las {@link SriModuleOptions}, de forma síncrona o asíncrona. */
    useFactory: (...args: any[]) => SriModuleOptions | Promise<SriModuleOptions>;
}

/**
 * Fachada NestJS de `SriClient`: expone el cliente ya configurado por
 * {@link SriModule} como provider inyectable, más `createBatch()` para
 * obtener un `BatchEmitter` preconfigurado con el mismo `ambiente`/
 * `transport` del módulo. Sin lógica propia — cada método delega
 * íntegramente en `sri-ec`; este paquete es wiring de DI, no una
 * reimplementación.
 */
declare class SriService {
    readonly client: SriClient;
    private readonly moduleOptions;
    constructor(client: SriClient, moduleOptions: SriRuntimeOptions);
    /** Delega en `SriClient.emit()`. */
    emit(doc: Comprobante, claveAcceso?: string): ReturnType<SriClient['emit']>;
    /** Delega en `SriClient.authorize()`. */
    authorize(claveAcceso: string): ReturnType<SriClient['authorize']>;
    /** Delega en `SriClient.sign()`. */
    sign(xml: string): string;
    /** Delega en `SriClient.prepare()`: comprobante firmado + clave de acceso, sin tocar la red. */
    prepare(doc: Comprobante, claveAcceso?: string): ReturnType<SriClient['prepare']>;
    /**
     * `BatchEmitter` nuevo, preconfigurado con el `ambiente`/`transport` del
     * módulo — `opts` puede sobreescribir cualquier campo (p.ej.
     * `retryPolicy`, `repository`, `rateLimiter`, o incluso `ambiente`/
     * `transport` para un lote puntual con otra configuración).
     */
    createBatch(opts?: Partial<BatchEmitterOptions>): BatchEmitter;
}

/**
 * Módulo NestJS de `sri-ec`: wiring de DI puro (sin lógica de
 * negocio propia) que expone {@link SriService}/`SRI_CLIENT` configurados a
 * partir de {@link SriModuleOptions}. Mismo patrón `forRoot()`/
 * `forRootAsync()` que `ConfigModule`/`TypeOrmModule` en el ecosistema Nest.
 *
 * Ni el `.p12` ni su contraseña llegan nunca al contenedor: se consumen al
 * construir el `SriClient` y lo único que queda registrado bajo
 * `SRI_MODULE_OPTIONS` es {@link SriRuntimeOptions} (`ambiente`, `transport`,
 * `validate`).
 */
declare class SriModule {
    /** Registro síncrono: `options` ya trae `ambiente`/`certificate` resueltos. */
    static forRoot(options: SriModuleOptions): DynamicModule;
    /** Registro asíncrono: `useFactory` (con `inject`/`imports`) produce las `SriModuleOptions`, p.ej. leyendo un `ConfigService`. */
    static forRootAsync(options: SriModuleAsyncOptions): DynamicModule;
}

export { SRI_CLIENT, SRI_MODULE_OPTIONS, SriModule, type SriModuleAsyncOptions, type SriModuleOptions, type SriRuntimeOptions, SriService };
