import { A as Ambiente, C as Comprobante, I as InfoTributaria, T as TipoComprobante, a as TipoEmision, R as RegimenRimpe, F as Factura, L as LiquidacionCompra, N as NotaCredito, b as NotaDebito, G as GuiaRemision, c as Retencion } from './index-D3nr7ONR.js';
export { D as Destinatario, d as DestinatarioDetalle, e as Detalle, f as DocSustento, g as Impuesto, h as ImpuestoDocSustentoRow, i as LEYENDA_RIMPE, M as Motivo, P as Pago, j as PagoSustentoRow, k as RetencionRow, l as TotalImpuesto } from './index-D3nr7ONR.js';
import { z } from 'zod';
import forge from 'node-forge';

/**
 * Tipos del dominio de emisión (port de `src/Emission/*.php`).
 *
 * IMPORTANTE — `EmissionStatus`: los valores son identificadores INTERNOS de
 * esta librería, no necesariamente los strings crudos que devuelve el SRI en
 * el wire (p.ej. el SRI retorna "EN PROCESO" con espacio; aquí se usa
 * "EN_PROCESO" con guion bajo). La normalización wire → interno es
 * responsabilidad de `SriClient` (fuera de alcance de este módulo).
 *
 * `EmissionResult`/`Message` son interfaces planas (no clases) por decisión
 * explícita del controlador: no se porta el shim `ArrayAccess` de
 * `EmissionResult.php` (compat legacy PHP 1.x, fuera de alcance del port).
 */
type EmissionStatus = 'AUTORIZADO' | 'RECHAZADO' | 'EN_PROCESO' | 'ERROR';
/**
 * Etapa en la que el SRI rechazó el comprobante (solo aplica cuando
 * `status === 'RECHAZADO'`): `RECEPCION` (devuelto, XML/clave inválidos,
 * nunca entró al sistema) vs `AUTORIZACION` (recibido pero no autorizado,
 * regla de negocio/duplicado).
 */
type RejectionStage = 'RECEPCION' | 'AUTORIZACION';
interface Message {
    identificador: string;
    mensaje: string;
    tipo?: string;
    informacionAdicional?: string;
}
interface EmissionResult {
    status: EmissionStatus;
    claveAcceso: string;
    signedXml: string;
    numeroAutorizacion?: string;
    fechaAutorizacion?: string;
    authorizedXml?: string;
    messages: Message[];
    rejectedStage?: RejectionStage;
}

/**
 * Estado de un comprobante dentro del flujo de envío masivo. Port de
 * `Teran\Sri\Batch\ComprobanteState` (enum PHP) — mismos seis valores, mismos
 * literales de wire (usados tal cual como claves de {@link BatchEmitter.status}).
 *
 * Transiciones válidas: `PENDING` → `SENT` (recepción OK) | `REJECTED`
 * (recepción devuelta); `SENT`/`IN_PROCESS` → `AUTHORIZED` | `REJECTED` |
 * `IN_PROCESS` (sigue en proceso) | `FAILED` (reintentos de `RetryPolicy`
 * agotados, tanto por `EN PROCESO` persistente como por fallos de
 * comunicación transitorios).
 */
type ComprobanteState = 'PENDING' | 'SENT' | 'AUTHORIZED' | 'REJECTED' | 'IN_PROCESS' | 'FAILED';
/** Port de `ComprobanteState::isTerminal()`. Función libre (no método) porque `BatchItem` es una interfaz plana, no una clase. */
declare function isTerminal(state: ComprobanteState): boolean;
/**
 * Entidad inmutable de un comprobante en el flujo masivo (contrato canónico,
 * `contratos.md`). Port de `Teran\Sri\Batch\BatchItem`, pero como interfaz de
 * datos plana en vez de una clase `readonly` — las transiciones (`markSent`,
 * `markAuthorized`, etc.) son funciones libres que devuelven una NUEVA
 * instancia en vez de métodos de instancia, ya que una interfaz TS no puede
 * declarar comportamiento. El resultado es el mismo: ningún estado se muta,
 * cada transición es una función pura auditable de forma aislada.
 */
interface BatchItem {
    readonly claveAcceso: string;
    readonly signedXml: string;
    readonly state: ComprobanteState;
    readonly attempts: number;
    readonly numeroAutorizacion?: string;
    readonly authorizedXml?: string;
    readonly messages: Message[];
}
/** Crea un `BatchItem` nuevo en estado `PENDING`, 0 intentos, sin mensajes. */
declare function createBatchItem(claveAcceso: string, signedXml: string): BatchItem;
/** Recepción exitosa (`RECIBIDA`): `PENDING` → `SENT`. No incrementa `attempts` (mismo criterio que PHP). */
declare function markSent(item: BatchItem, messages?: Message[]): BatchItem;
/**
 * Autorización concedida: `SENT`/`IN_PROCESS` → `AUTHORIZED` (terminal).
 * `numeroAutorizacion`/`authorizedXml` caen de vuelta al valor previo del
 * item cuando llegan `undefined` — mismo `?? $this->...` defensivo del PHP.
 */
declare function markAuthorized(item: BatchItem, numeroAutorizacion: string | undefined, authorizedXml: string | undefined, messages: Message[]): BatchItem;
/** Rechazo (en recepción `DEVUELTA`, o en autorización `NO AUTORIZADO`): estado terminal, sin reintento. */
declare function markRejected(item: BatchItem, messages: Message[]): BatchItem;
/** El SRI sigue procesando (`EN PROCESO`/`EN PROCESAMIENTO`) y `RetryPolicy` todavía permite reintentar: incrementa `attempts`. */
declare function markInProcess(item: BatchItem, messages: Message[]): BatchItem;
/** Reintentos agotados (`EN PROCESO` persistente o fallo de comunicación transitorio): estado terminal. */
declare function markFailed(item: BatchItem, messages: Message[]): BatchItem;
/** Cuenta un intento sin cambiar de estado (usado en el manejo de `CommunicationError` de `BatchProcessor.step`). */
declare function incrementAttempts(item: BatchItem): BatchItem;

/**
 * Almacén de `BatchItem` para el motor de envío masivo. Port de
 * `Teran\Sri\Batch\ComprobanteRepositoryInterface`, con nombres idiomáticos
 * de mapa (`get`/`put`) en vez de `find`/`save` — mismo contrato semántico
 * (upsert por `claveAcceso`).
 */
interface ComprobanteRepository {
    /** Inserta o reemplaza (upsert) el item, indexado por `claveAcceso`. */
    put(item: BatchItem): void;
    /** `undefined` si no existe ningún item con esa clave de acceso. */
    get(claveAcceso: string): BatchItem | undefined;
    /** Items no terminales (`PENDING`, `SENT`, `IN_PROCESS`) — los que `BatchProcessor` todavía debe avanzar. */
    pending(): BatchItem[];
    /** Conteo por estado. A diferencia del `array<string,int>` disperso de PHP, siempre trae los seis estados (0 si no hay items en ese estado). */
    counts(): Record<ComprobanteState, number>;
}
/** Port de `Teran\Sri\Batch\InMemoryComprobanteRepository`: `Map` en vez de array asociativo PHP, mismo comportamiento de upsert. */
declare class InMemoryComprobanteRepository implements ComprobanteRepository {
    private readonly items;
    put(item: BatchItem): void;
    get(claveAcceso: string): BatchItem | undefined;
    pending(): BatchItem[];
    counts(): Record<ComprobanteState, number>;
}

/** Opciones de construcción de {@link RetryPolicy} — mismos tres campos que el PHP, todos opcionales con el mismo valor por defecto. */
interface RetryPolicyOptions {
    maxAttempts?: number;
    baseDelaySeconds?: number;
    maxDelaySeconds?: number;
}
/**
 * Política de reintentos para fallos transitorios y estado `EN PROCESO`. Port
 * exacto de `Teran\Sri\Batch\RetryPolicy`: backoff exponencial
 * `delay = baseDelaySeconds * 2^(attempt-1)`, acotado por `maxDelaySeconds`.
 *
 * `BatchProcessor.process()` nunca espera internamente (igual que el PHP):
 * cuando una pasada no logra progreso de estado, retorna de inmediato y deja
 * la reinvocación a un caller externo (worker de cola, cron). `delaySeconds()`
 * está expuesto justamente para que ese caller calcule cuánto esperar antes
 * de volver a invocar `process()`/`BatchEmitter.run()`.
 */
declare class RetryPolicy {
    readonly maxAttempts: number;
    readonly baseDelaySeconds: number;
    readonly maxDelaySeconds: number;
    constructor(options?: RetryPolicyOptions);
    /** `true` mientras `attempts` no alcance `maxAttempts` (mismo `<` estricto que el PHP). */
    shouldRetry(attempts: number): boolean;
    /** Segundos de espera antes del intento número `attempt` (1-indexado, igual que el PHP). */
    delaySeconds(attempt: number): number;
}

/**
 * Resultado de `validarComprobante` (recepción). Port de
 * `Teran\Sri\Transport\ReceptionOutcome`. `estado` es el string crudo que
 * devuelve el SRI en el wire (`RECIBIDA` | `DEVUELTA`, u otro valor no
 * documentado que el SRI decida enviar) — la normalización a
 * `EmissionStatus` interno es responsabilidad de `SriClient` (fuera de
 * alcance de este módulo).
 */
interface ReceptionOutcome {
    estado: string;
    mensajes: Message[];
}
/**
 * Resultado de `autorizacionComprobante` (autorización). Port de
 * `Teran\Sri\Transport\AuthorizationOutcome`. Cuando el SRI todavía no tiene
 * ningún nodo `<autorizacion>` que devolver (recién `RECIBIDA`, o
 * `numeroComprobantes=0`), `estado` es `'EN PROCESO'` y el resto de campos
 * quedan `undefined` — ver `parseAuthorization()` en `soap-response-parser.ts`.
 */
interface AuthorizationOutcome {
    estado: string;
    numeroAutorizacion?: string;
    fechaAutorizacion?: string;
    comprobante?: string;
    mensajes: Message[];
}
/**
 * Contrato de transporte hacia los web services SOAP offline del SRI. Port
 * de `Teran\Sri\Transport\SriTransportInterface`. `FetchSoapTransport` es la
 * implementación por defecto (basada en `fetch` nativo); `SriClient` acepta
 * cualquier otra implementación vía inyección (p.ej. para tests).
 */
interface SriTransport {
    enviar(signedXml: string, ambiente: Ambiente, opts?: {
        signal?: AbortSignal;
    }): Promise<ReceptionOutcome>;
    autorizar(claveAcceso: string, ambiente: Ambiente, opts?: {
        signal?: AbortSignal;
    }): Promise<AuthorizationOutcome>;
}

/** URLs (sin `?wsdl`: se invoca por POST directo, no vía `SoapClient`/WSDL) de los web services offline del SRI, por ambiente. Port de `Psr18SoapTransport::ENDPOINTS`. */
interface SriEndpoints {
    recepcion: string;
    autorizacion: string;
}
/**
 * Registro `Ambiente` → endpoints. `pruebas` usa el host `celcer` (Comprobantes
 * Electrónicos de CERtificación); `producción` usa `cel` — no confundir ambos
 * hosts entre sí (copiado literal de `Psr18SoapTransport::ENDPOINTS`).
 */
declare const SRI_URLS: Record<Ambiente, SriEndpoints>;

/**
 * Frontera de confianza del transporte: valida que `claveAcceso` sea
 * literalmente 49 dígitos antes de interpolarla en el envelope SOAP.
 *
 * La clave puede llegar de un caller arbitrario (`SriClient.authorize()`,
 * `BatchEmitter`, una fila de base de datos, un parámetro HTTP), y el
 * envelope se construye por concatenación de strings: sin esta comprobación,
 * un valor como `</claveAccesoComprobante><algo>…` reescribiría el cuerpo
 * SOAP enviado al SRI. Se valida (y no solo se escapa) porque cualquier cosa
 * que no sean 49 dígitos es, por definición, una clave inválida: no hay caso
 * legítimo que perder.
 *
 * @throws ValidationError si `claveAcceso` no son exactamente 49 dígitos.
 */
declare function assertClaveAccesoWireSegura(claveAcceso: string): string;
/**
 * Envelope de `validarComprobante` (recepción). El XML firmado va en base64
 * dentro de `<xml>` — el SRI decodifica ese base64 y valida el XSD/firma del
 * comprobante resultante. Port de `SoapEnvelopeBuilder::reception()`.
 */
declare function buildReceptionEnvelope(signedXml: string): string;
/**
 * Envelope de `autorizacionComprobante` (consulta de autorización por clave
 * de acceso). Port de `SoapEnvelopeBuilder::authorization()`.
 *
 * `claveAcceso` se valida con {@link assertClaveAccesoWireSegura} y además se
 * escapa con `escapeXml()` (defensa en profundidad: si la validación se
 * relajara alguna vez, el escape seguiría impidiendo la inyección XML). Para
 * una clave legítima de 49 dígitos el escape es la identidad, así que el
 * envelope resultante es byte a byte el mismo que producía el PHP.
 *
 * @throws ValidationError si `claveAcceso` no son exactamente 49 dígitos.
 */
declare function buildAuthorizationEnvelope(claveAcceso: string): string;

declare function parseReception(responseXml: string): ReceptionOutcome;
declare function parseAuthorization(responseXml: string): AuthorizationOutcome;

interface FetchSoapTransportOptions {
    /** Timeout por llamada, en milisegundos. Por defecto 30000 (igual que `SriSoapClient::$timeout` en PHP, en segundos allá). */
    timeoutMs?: number;
    /** `fetch` a usar — inyectable para tests (mock) o para runtimes sin `fetch` global. Por defecto `globalThis.fetch`. */
    fetch?: typeof fetch;
}
/**
 * Transporte SOAP sobre `fetch` nativo: POST directo del envelope XML a los
 * web services offline del SRI, sin WSDL ni `ext-soap`. Port funcional de
 * `Teran\Sri\Transport\Psr18SoapTransport` (mismos headers, mismo criterio
 * de error, mismas URLs por ambiente) pero sobre `fetch` en vez de PSR-18.
 */
declare class FetchSoapTransport implements SriTransport {
    private readonly timeoutMs;
    private readonly fetchImpl;
    constructor(options?: FetchSoapTransportOptions);
    enviar(signedXml: string, ambiente: Ambiente, opts?: {
        signal?: AbortSignal;
    }): Promise<ReceptionOutcome>;
    /**
     * @throws ValidationError si `claveAcceso` no son exactamente 49 dígitos —
     * se comprueba aquí, antes de resolver el endpoint o abrir la conexión, para
     * que ningún valor no confiable llegue a interpolarse en el envelope SOAP.
     */
    autorizar(claveAcceso: string, ambiente: Ambiente, opts?: {
        signal?: AbortSignal;
    }): Promise<AuthorizationOutcome>;
    /**
     * POST del envelope SOAP con los mismos headers que `Psr18SoapTransport::post()`
     * (`Content-Type: text/xml; charset=utf-8`, `SOAPAction: ''`). Combina el
     * timeout propio con el `AbortSignal` opcional del caller: cualquiera de
     * los dos que dispare primero aborta el `fetch`, y ambos casos (igual que
     * cualquier otro fallo de red) se reportan de manera uniforme como
     * `CommunicationError` — el caller no tiene forma de distinguir, desde
     * este XML de respuesta, un timeout de una cancelación manual.
     */
    private post;
}

/**
 * Limita la tasa de llamadas al SRI. `throttle()` bloquea (o espera) lo
 * necesario antes de cada llamada — implementaciones reales: token-bucket
 * global o por RUC. Port de `Teran\Sri\Batch\RateLimiterInterface`; `key` por
 * defecto es `'sri'` igual que el PHP.
 */
interface RateLimiter {
    throttle(key?: string): Promise<void> | void;
}
/** Port de `Teran\Sri\Batch\NullRateLimiter`: sin límite, no-op. Implementación por defecto de {@link BatchProcessor}. */
declare class NullRateLimiter implements RateLimiter {
    throttle(): void;
}
interface BatchProcessorOptions {
    retryPolicy?: RetryPolicy;
    rateLimiter?: RateLimiter;
}
/**
 * Conduce la máquina de estados del envío masivo de forma idempotente: enviar
 * → autorizar, con reintentos ({@link RetryPolicy}) y rate-limit. Port de
 * `Teran\Sri\Batch\BatchProcessor`.
 *
 * Pacing y reinvocación son responsabilidad del caller, igual que en el PHP:
 * `process()` (y `BatchEmitter.run()`, que delega en él) nunca espera
 * internamente. Cuando una pasada no logra progreso de estado (p. ej. todos
 * los items pendientes quedan `EN PROCESO`, o un fallo de comunicación solo
 * incrementó `attempts`), retorna de inmediato en vez de reintentar dentro de
 * la misma llamada. Un worker de cola (o cron) debe reinvocar `process()`/
 * `run()` más tarde — {@link RetryPolicy.delaySeconds} está expuesto
 * justamente para que ese caller calcule cuánto esperar antes de la próxima
 * invocación.
 */
declare class BatchProcessor {
    private readonly transport;
    private readonly ambiente;
    private readonly retryPolicy;
    private readonly rateLimiter;
    constructor(transport: SriTransport, ambiente: Ambiente, options?: BatchProcessorOptions);
    /** El RUC ocupa 13 dígitos a partir de la posición 10 en la clave de acceso (49 díg.). Port de `BatchProcessor::throttleKey()`. */
    private throttleKey;
    /**
     * Avanza un item UN paso. Idempotente: los terminales se devuelven sin
     * cambios. Port exacto de `BatchProcessor::step()`.
     *
     * Nota (heredada del PHP): si el proceso falla entre un `enviar` exitoso y
     * el `repository.put`, una re-ejecución reenviará el item (todavía
     * `PENDING`). La reconciliación real (consultar autorización antes de
     * re-enviar) es un refinamiento planeado, no cubierto aquí.
     */
    step(item: BatchItem): Promise<BatchItem>;
    /**
     * Recorre los pendientes del repositorio avanzándolos paso a paso mientras
     * cada pasada logre progreso de estado, hasta que no queden pendientes, se
     * agote `maxPasses`, o una pasada completa no cambie el estado de ningún
     * item. Port exacto de `BatchProcessor::process()`: cuando no hay progreso
     * (p. ej. todos los pendientes quedan `EN PROCESO`, o un fallo de
     * comunicación transitorio solo incrementó `attempts` sin cambiar de
     * estado), retorna de inmediato — nunca espera ni reintenta dentro de la
     * misma llamada — dejando la re-invocación a un caller externo (worker de
     * cola, cron). Sigue siendo reanudable: una llamada posterior a
     * `process()`/`run()` retoma exactamente donde quedó, sea porque no hubo
     * progreso o porque se agotó `maxPasses`.
     */
    process(repository: ComprobanteRepository, maxPasses?: number): Promise<void>;
}

/** Opciones de construcción de {@link BatchEmitter} (contrato canónico, `contratos.md`, extendido con hooks de testabilidad). */
interface BatchEmitterOptions {
    ambiente: Ambiente;
    /** Por defecto `new FetchSoapTransport()`, igual que `SriClient`. */
    transport?: SriTransport;
    retryPolicy?: RetryPolicy;
    /** Por defecto `new InMemoryComprobanteRepository()` — inyectable para persistir el lote en otro backend (DB, cola). */
    repository?: ComprobanteRepository;
    rateLimiter?: RateLimiter;
}
/**
 * Fachada del envío masivo: agrega comprobantes firmados, procesa y consulta
 * estado. Port de `Teran\Sri\Batch\BatchEmitter`. El firmado por tipo lo hace
 * el caller (serializador + `XadesSigner`); este motor es agnóstico al tipo
 * de comprobante — opera solo sobre `claveAcceso` + XML ya firmado.
 *
 * A diferencia del PHP (que recibe `BatchProcessor`/`ComprobanteRepositoryInterface`
 * ya construidos), este constructor arma ambos internamente a partir de
 * `ambiente`/`transport`/`retryPolicy` — mismo patrón que `SriClient`, donde
 * el caller solo provee lo que quiere personalizar.
 *
 * `run()` delega en `BatchProcessor.process()`, que nunca espera
 * internamente: pacing y reinvocación (cuándo volver a llamar `run()` para
 * que un item que sigue `EN PROCESO` o con fallos transitorios avance) son
 * responsabilidad del caller — un worker de cola o un cron — igual que en el
 * PHP. Usa `RetryPolicy.delaySeconds()` para calcular cuánto esperar antes de
 * la próxima invocación.
 */
declare class BatchEmitter {
    private readonly repository;
    private readonly processor;
    constructor(opts: BatchEmitterOptions);
    /** Agrega un comprobante firmado. Idempotente por clave de acceso: si ya existe un item con esa clave, no lo duplica ni lo reemplaza. */
    add(claveAcceso: string, signedXml: string): void;
    /**
     * Procesa los pendientes hasta que no queden, se agote `maxPasses`, o una
     * pasada no logre progreso de estado (retorna de inmediato en ese caso, sin
     * esperar — ver nota de clase). Re-llamable: reanuda donde quedó (items ya
     * terminales no se reprocesan; los que siguen `PENDING`/`SENT`/`IN_PROCESS`
     * continúan su máquina de estados).
     */
    run(opts?: {
        maxPasses?: number;
    }): Promise<void>;
    /** Conteo por estado (siempre los seis, con 0 para los que no tienen items). */
    status(): Record<ComprobanteState, number>;
    /** El `BatchItem` actual de `claveAcceso`, o `undefined` si nunca se agregó. */
    result(claveAcceso: string): BatchItem | undefined;
}

/**
 * Catálogo de Formas de Pago SRI Ecuador (port de `src/Catalogs/PaymentMethods.php`).
 *
 * Se modela como objeto `const` (no `enum`) porque, a diferencia de los
 * catálogos de `catalogs/index.ts`, el valor útil para el consumidor de la
 * librería es únicamente el código string — no hace falta un tipo enum
 * nominal, y un objeto `as const` permite derivar el tipo unión de códigos
 * sin generar un objeto helper adicional en tiempo de ejecución.
 */
declare const FormaPago: {
    /** Sin utilización del sistema financiero (Efectivo) */
    readonly EFECTIVO: "01";
    /** Compensación de deudas */
    readonly COMPENSACION_DEUDAS: "15";
    /** Tarjeta de débito */
    readonly TARJETA_DEBITO: "16";
    /** Dinero electrónico */
    readonly DINERO_ELECTRONICO: "17";
    /** Tarjeta prepago */
    readonly TARJETA_PREPAGO: "18";
    /** Tarjeta de crédito */
    readonly TARJETA_CREDITO: "19";
    /** Otros con utilización del sistema financiero */
    readonly OTROS_SISTEMA_FINANCIERO: "20";
    /** Endoso de títulos */
    readonly ENDOSO_TITULOS: "21";
};
/** Código de forma de pago válido según el catálogo SRI. */
type FormaPago = (typeof FormaPago)[keyof typeof FormaPago];

/**
 * Jerarquía de errores del paquete. Todas las subclases exponen un `code`
 * literal discriminante para permitir `switch`/narrowing por tipo de error
 * sin recurrir a `instanceof` en cadenas de manejo genéricas.
 *
 * Nota de implementación: aunque `target: ES2022` hace que extender `Error`
 * con clases nativas ya mantenga la cadena de prototipos correctamente (a
 * diferencia del downlevel a ES5), se llama explícitamente a
 * `Object.setPrototypeOf` en cada constructor para blindar el comportamiento
 * de `instanceof` ante cualquier entorno de ejecución no estándar (bundlers
 * que transpilen a un target inferior, realms distintos, etc.). Ver
 * `test/errors.test.ts` para la verificación.
 */
declare class SriError extends Error {
    readonly code: string;
    constructor(message: string, code: string);
}
/**
 * Error de validación (estructural o de negocio). `errors` contiene el
 * detalle de cada violación individual; se concatenan en `message` para que
 * loguear/lanzar la excepción sin inspeccionar `.errors` siga siendo útil.
 */
declare class ValidationError extends SriError {
    readonly code: 'VALIDATION';
    readonly errors: string[];
    constructor(message: string, errors: string[]);
}
/** Error al cargar/parsear un certificado (p12 inválido, contraseña incorrecta, etc.). */
declare class CertificateError extends SriError {
    readonly code: 'CERTIFICATE';
    constructor(message: string);
}
/** Error durante la firma XAdES-BES del comprobante. */
declare class SignatureError extends SriError {
    readonly code: 'SIGNATURE';
    constructor(message: string);
}
/**
 * Contexto del comprobante que se estaba emitiendo cuando falló la
 * comunicación. Lo adjunta {@link SriClient.emit} para que un fallo de red
 * NO destruya la única evidencia del comprobante: el par
 * `claveAcceso`/`signedXml`.
 */
interface CommunicationErrorContext {
    /** Clave de acceso (49 dígitos) del comprobante en vuelo. */
    claveAcceso?: string;
    /** XML ya firmado que se estaba enviando (o cuya autorización se consultaba). */
    signedXml?: string;
}
/**
 * Error de transporte al comunicarse con el SRI (timeout, red caída, SOAP
 * fault, etc.). `cause` conserva el error original para diagnóstico.
 *
 * Cuando el error escapa de `SriClient.emit()`, `claveAcceso`/`signedXml`
 * traen el comprobante que estaba en vuelo. **Persista ambos antes de
 * reintentar**: el SRI puede haber recibido y aceptado el comprobante aunque
 * la respuesta se haya perdido, y un `emit()` nuevo generaría una clave de
 * acceso distinta (el código numérico es aleatorio por llamada), dejando el
 * documento original irresoluble y duplicando el secuencial. Para resolver el
 * estado real use `SriClient.authorize(claveAcceso)`.
 */
declare class CommunicationError extends SriError {
    readonly code: 'COMMUNICATION';
    readonly cause?: unknown;
    /** Clave de acceso del comprobante en vuelo, si el error viene de `emit()`. */
    readonly claveAcceso?: string;
    /** XML firmado del comprobante en vuelo, si el error viene de `emit()`. */
    readonly signedXml?: string;
    constructor(message: string, cause?: unknown, context?: CommunicationErrorContext);
}

/**
 * Port de `BusinessValidator::validarRuc()`. Valida el RUC ecuatoriano de 13
 * dígitos localmente (tercer dígito de régimen + código de establecimiento
 * distinto de "000"). El formato "13 dígitos numéricos" ya lo exige
 * `rucField` en `schemas/shared.schema.ts`; esta función cubre el resto de
 * la regla que el comentario de ese archivo delega explícitamente a
 * BusinessValidator (Task 6).
 *
 * Nota: la validación *online* contra el SRI (`RucValidator::checkOnline()`
 * en PHP) es responsabilidad de Task 11 (`SriClient`/RUC), no de este
 * módulo — aquí solo vive la parte local/síncrona.
 *
 * Exportada (no solo de uso interno de `checkRuc`) porque el futuro port de
 * `Utils/RucValidator.php` (Task 14) llama a `BusinessValidator::validarRuc()`
 * como paso local antes de la verificación online (`RucValidator.php:16`) —
 * debe reusar exactamente esta función en vez de duplicar el algoritmo.
 */
declare function esRucLocalValido(ruc: string): boolean;
/**
 * Port de `BusinessValidator::validarCampos()`: longitudes máximas de campos
 * comunes de `infoTributaria` según ficha técnica SRI. `secuencial` ya está
 * acotado a exactamente 9 dígitos por `secuencialField` (zod, Task 5) y
 * `razonSocial` a 300 por `razonSocialField` — se repiten aquí para paridad
 * exacta con el PHP y para que `validateBusiness` siga siendo útil sin pasar
 * primero por zod (p.ej. sobre datos ya parseados).
 *
 * `mb_strlen` (PHP, cuenta caracteres Unicode) se replica con
 * `[...valor].length` (cuenta code points, no code units UTF-16).
 *
 * Exportada por la misma razón que {@link esRucLocalValido}: en PHP,
 * `SRI.php:239` llama a `BusinessValidator::validarCampos()` directamente
 * (fuera de la clase) antes de generar el XML — cualquier port futuro de ese
 * flujo (p.ej. un `SriClient.emit()` de Task 11+) debe poder reusar esta
 * función en vez de reimplementar las longitudes máximas.
 */
declare function checkCamposLocales(info: InfoTributaria): string[];
/**
 * Valida las reglas de negocio de `doc` (cuadre aritmético + port de
 * `BusinessValidator.php`). Nunca lanza: devuelve un array de mensajes
 * `"campo: descripción"` (vacío == sin errores de negocio). No repite
 * validación estructural/de forma (eso es `schemaFor(doc.tipo)`, Task 5) —
 * úsese junto a ella vía {@link assertValid}, o de forma independiente si
 * `doc` ya se sabe bien formado.
 */
declare function validateBusiness(doc: Comprobante): string[];
/**
 * Corre `schemaFor(doc.tipo)` (Task 5, estructura/forma) y
 * {@link validateBusiness} (este módulo, coherencia de negocio) sobre `doc`,
 * y lanza un único `ValidationError` con TODOS los errores acumulados
 * (issues de zod primero, luego los de negocio) si hay al menos uno. No
 * lanza (retorna `void`) si `doc` es válido en ambos sentidos.
 */
declare function assertValid(doc: Comprobante): void;

/**
 * Schema zod de Factura (codDoc `01`). Valida el documento completo, no solo
 * `infoTributaria`. Espejo estructural de `documents/factura.ts::Factura`
 * (`satisfies z.ZodType<Factura>` rompe el build si diverge).
 */
declare const facturaSchema: z.ZodObject<{
    tipo: z.ZodLiteral<TipoComprobante.Factura>;
    infoTributaria: z.ZodObject<{
        ambiente: z.ZodEnum<typeof Ambiente>;
        razonSocial: z.ZodString;
        ruc: z.ZodString;
        estab: z.ZodString;
        ptoEmi: z.ZodString;
        secuencial: z.ZodString;
        dirMatriz: z.ZodString;
        tipoEmision: z.ZodOptional<z.ZodEnum<typeof TipoEmision>>;
        nombreComercial: z.ZodOptional<z.ZodString>;
        regimenRimpe: z.ZodOptional<z.ZodEnum<typeof RegimenRimpe>>;
        agenteRetencion: z.ZodOptional<z.ZodString>;
    }, z.core.$strict>;
    fechaEmision: z.ZodString;
    dirEstablecimiento: z.ZodOptional<z.ZodString>;
    contribuyenteEspecial: z.ZodOptional<z.ZodString>;
    tipoIdentificacionComprador: z.ZodString;
    razonSocialComprador: z.ZodString;
    identificacionComprador: z.ZodString;
    direccionComprador: z.ZodOptional<z.ZodString>;
    guiaRemision: z.ZodOptional<z.ZodString>;
    totalSinImpuestos: z.ZodString;
    totalDescuento: z.ZodString;
    propina: z.ZodOptional<z.ZodString>;
    importeTotal: z.ZodString;
    moneda: z.ZodOptional<z.ZodString>;
    obligadoContabilidad: z.ZodOptional<z.ZodEnum<{
        SI: "SI";
        NO: "NO";
    }>>;
    totalConImpuestos: z.ZodArray<z.ZodObject<{
        codigo: z.ZodString;
        codigoPorcentaje: z.ZodString;
        baseImponible: z.ZodString;
        valor: z.ZodString;
        descuentoAdicional: z.ZodOptional<z.ZodString>;
    }, z.core.$strict>>;
    detalles: z.ZodArray<z.ZodObject<{
        codigoPrincipal: z.ZodOptional<z.ZodString>;
        codigoAuxiliar: z.ZodOptional<z.ZodString>;
        descripcion: z.ZodString;
        cantidad: z.ZodString;
        precioUnitario: z.ZodString;
        descuento: z.ZodString;
        precioTotalSinImpuesto: z.ZodString;
        impuestos: z.ZodArray<z.ZodObject<{
            codigo: z.ZodString;
            codigoPorcentaje: z.ZodString;
            tarifa: z.ZodString;
            baseImponible: z.ZodString;
            valor: z.ZodString;
        }, z.core.$strict>>;
        detallesAdicionales: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
    }, z.core.$strict>>;
    pagos: z.ZodArray<z.ZodObject<{
        formaPago: z.ZodString;
        total: z.ZodString;
        plazo: z.ZodOptional<z.ZodString>;
        unidadTiempo: z.ZodOptional<z.ZodString>;
    }, z.core.$strict>>;
    infoAdicional: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
}, z.core.$strict>;

/**
 * Línea de detalle de un {@link Destinatario} (port de la estructura cruda
 * que documenta `src/Documents/Destinatario.php`).
 */
declare const destinatarioDetalleSchema: z.ZodObject<{
    codigoInterno: z.ZodOptional<z.ZodString>;
    codigoAdicional: z.ZodOptional<z.ZodString>;
    descripcion: z.ZodString;
    cantidad: z.ZodString;
    detallesAdicionales: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
}, z.core.$strict>;
/**
 * Destinatario de una Guía de Remisión (port de `src/Documents/Destinatario.php`).
 * `detalles` no puede estar vacío: un destinatario sin ítems trasladados no
 * es representable.
 */
declare const destinatarioSchema: z.ZodObject<{
    identificacionDestinatario: z.ZodString;
    razonSocialDestinatario: z.ZodString;
    dirDestinatario: z.ZodString;
    motivoTraslado: z.ZodString;
    detalles: z.ZodArray<z.ZodObject<{
        codigoInterno: z.ZodOptional<z.ZodString>;
        codigoAdicional: z.ZodOptional<z.ZodString>;
        descripcion: z.ZodString;
        cantidad: z.ZodString;
        detallesAdicionales: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
    }, z.core.$strict>>;
    docAduaneroUnico: z.ZodOptional<z.ZodString>;
    codEstabDestino: z.ZodOptional<z.ZodString>;
    ruta: z.ZodOptional<z.ZodString>;
    codDocSustento: z.ZodOptional<z.ZodString>;
    numDocSustento: z.ZodOptional<z.ZodString>;
    numAutDocSustento: z.ZodOptional<z.ZodString>;
    fechaEmisionDocSustento: z.ZodOptional<z.ZodString>;
}, z.core.$strict>;
/**
 * Schema zod de Guía de Remisión (codDoc `06`). `dirEstablecimiento` es
 * obligatorio (a diferencia de otros comprobantes) y `destinatarios` no
 * puede estar vacío. Espejo estructural de
 * `documents/guia-remision.ts::GuiaRemision`.
 */
declare const guiaRemisionSchema: z.ZodObject<{
    tipo: z.ZodLiteral<TipoComprobante.GuiaRemision>;
    infoTributaria: z.ZodObject<{
        ambiente: z.ZodEnum<typeof Ambiente>;
        razonSocial: z.ZodString;
        ruc: z.ZodString;
        estab: z.ZodString;
        ptoEmi: z.ZodString;
        secuencial: z.ZodString;
        dirMatriz: z.ZodString;
        tipoEmision: z.ZodOptional<z.ZodEnum<typeof TipoEmision>>;
        nombreComercial: z.ZodOptional<z.ZodString>;
        regimenRimpe: z.ZodOptional<z.ZodEnum<typeof RegimenRimpe>>;
        agenteRetencion: z.ZodOptional<z.ZodString>;
    }, z.core.$strict>;
    dirEstablecimiento: z.ZodString;
    dirPartida: z.ZodString;
    razonSocialTransportista: z.ZodString;
    tipoIdentificacionTransportista: z.ZodString;
    rucTransportista: z.ZodString;
    fechaIniTransporte: z.ZodString;
    fechaFinTransporte: z.ZodString;
    placa: z.ZodString;
    destinatarios: z.ZodArray<z.ZodObject<{
        identificacionDestinatario: z.ZodString;
        razonSocialDestinatario: z.ZodString;
        dirDestinatario: z.ZodString;
        motivoTraslado: z.ZodString;
        detalles: z.ZodArray<z.ZodObject<{
            codigoInterno: z.ZodOptional<z.ZodString>;
            codigoAdicional: z.ZodOptional<z.ZodString>;
            descripcion: z.ZodString;
            cantidad: z.ZodString;
            detallesAdicionales: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
        }, z.core.$strict>>;
        docAduaneroUnico: z.ZodOptional<z.ZodString>;
        codEstabDestino: z.ZodOptional<z.ZodString>;
        ruta: z.ZodOptional<z.ZodString>;
        codDocSustento: z.ZodOptional<z.ZodString>;
        numDocSustento: z.ZodOptional<z.ZodString>;
        numAutDocSustento: z.ZodOptional<z.ZodString>;
        fechaEmisionDocSustento: z.ZodOptional<z.ZodString>;
    }, z.core.$strict>>;
    rise: z.ZodOptional<z.ZodString>;
    obligadoContabilidad: z.ZodOptional<z.ZodEnum<{
        SI: "SI";
        NO: "NO";
    }>>;
    contribuyenteEspecial: z.ZodOptional<z.ZodString>;
    infoAdicional: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
}, z.core.$strict>;

/**
 * Schema zod de Liquidación de Compra (codDoc `03`). Mismos totales que
 * {@link facturaSchema} pero con "proveedor" en vez de "comprador". Espejo
 * estructural de `documents/liquidacion-compra.ts::LiquidacionCompra`.
 */
declare const liquidacionCompraSchema: z.ZodObject<{
    tipo: z.ZodLiteral<TipoComprobante.LiquidacionCompra>;
    infoTributaria: z.ZodObject<{
        ambiente: z.ZodEnum<typeof Ambiente>;
        razonSocial: z.ZodString;
        ruc: z.ZodString;
        estab: z.ZodString;
        ptoEmi: z.ZodString;
        secuencial: z.ZodString;
        dirMatriz: z.ZodString;
        tipoEmision: z.ZodOptional<z.ZodEnum<typeof TipoEmision>>;
        nombreComercial: z.ZodOptional<z.ZodString>;
        regimenRimpe: z.ZodOptional<z.ZodEnum<typeof RegimenRimpe>>;
        agenteRetencion: z.ZodOptional<z.ZodString>;
    }, z.core.$strict>;
    fechaEmision: z.ZodString;
    dirEstablecimiento: z.ZodOptional<z.ZodString>;
    contribuyenteEspecial: z.ZodOptional<z.ZodString>;
    tipoIdentificacionProveedor: z.ZodString;
    razonSocialProveedor: z.ZodString;
    identificacionProveedor: z.ZodString;
    direccionProveedor: z.ZodOptional<z.ZodString>;
    totalSinImpuestos: z.ZodString;
    totalDescuento: z.ZodString;
    importeTotal: z.ZodString;
    moneda: z.ZodOptional<z.ZodString>;
    obligadoContabilidad: z.ZodOptional<z.ZodEnum<{
        SI: "SI";
        NO: "NO";
    }>>;
    totalConImpuestos: z.ZodArray<z.ZodObject<{
        codigo: z.ZodString;
        codigoPorcentaje: z.ZodString;
        baseImponible: z.ZodString;
        valor: z.ZodString;
        descuentoAdicional: z.ZodOptional<z.ZodString>;
    }, z.core.$strict>>;
    detalles: z.ZodArray<z.ZodObject<{
        codigoPrincipal: z.ZodOptional<z.ZodString>;
        codigoAuxiliar: z.ZodOptional<z.ZodString>;
        descripcion: z.ZodString;
        cantidad: z.ZodString;
        precioUnitario: z.ZodString;
        descuento: z.ZodString;
        precioTotalSinImpuesto: z.ZodString;
        impuestos: z.ZodArray<z.ZodObject<{
            codigo: z.ZodString;
            codigoPorcentaje: z.ZodString;
            tarifa: z.ZodString;
            baseImponible: z.ZodString;
            valor: z.ZodString;
        }, z.core.$strict>>;
        detallesAdicionales: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
    }, z.core.$strict>>;
    pagos: z.ZodArray<z.ZodObject<{
        formaPago: z.ZodString;
        total: z.ZodString;
        plazo: z.ZodOptional<z.ZodString>;
        unidadTiempo: z.ZodOptional<z.ZodString>;
    }, z.core.$strict>>;
    infoAdicional: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
}, z.core.$strict>;

/**
 * Schema zod de Nota de Crédito (codDoc `04`). Añade sobre Factura los
 * campos de identificación del documento sustento (`codDocModificado`,
 * `numDocModificado`, `fechaEmisionDocSustento`); no tiene `pagos`. Espejo
 * estructural de `documents/nota-credito.ts::NotaCredito`.
 */
declare const notaCreditoSchema: z.ZodObject<{
    tipo: z.ZodLiteral<TipoComprobante.NotaCredito>;
    infoTributaria: z.ZodObject<{
        ambiente: z.ZodEnum<typeof Ambiente>;
        razonSocial: z.ZodString;
        ruc: z.ZodString;
        estab: z.ZodString;
        ptoEmi: z.ZodString;
        secuencial: z.ZodString;
        dirMatriz: z.ZodString;
        tipoEmision: z.ZodOptional<z.ZodEnum<typeof TipoEmision>>;
        nombreComercial: z.ZodOptional<z.ZodString>;
        regimenRimpe: z.ZodOptional<z.ZodEnum<typeof RegimenRimpe>>;
        agenteRetencion: z.ZodOptional<z.ZodString>;
    }, z.core.$strict>;
    fechaEmision: z.ZodString;
    dirEstablecimiento: z.ZodOptional<z.ZodString>;
    tipoIdentificacionComprador: z.ZodString;
    razonSocialComprador: z.ZodString;
    identificacionComprador: z.ZodString;
    contribuyenteEspecial: z.ZodOptional<z.ZodString>;
    obligadoContabilidad: z.ZodOptional<z.ZodEnum<{
        SI: "SI";
        NO: "NO";
    }>>;
    rise: z.ZodOptional<z.ZodString>;
    codDocModificado: z.ZodString;
    numDocModificado: z.ZodString;
    fechaEmisionDocSustento: z.ZodString;
    totalSinImpuestos: z.ZodString;
    valorModificacion: z.ZodString;
    moneda: z.ZodOptional<z.ZodString>;
    totalConImpuestos: z.ZodArray<z.ZodObject<{
        codigo: z.ZodString;
        codigoPorcentaje: z.ZodString;
        baseImponible: z.ZodString;
        valor: z.ZodString;
        descuentoAdicional: z.ZodOptional<z.ZodString>;
    }, z.core.$strict>>;
    detalles: z.ZodArray<z.ZodObject<{
        codigoPrincipal: z.ZodOptional<z.ZodString>;
        codigoAuxiliar: z.ZodOptional<z.ZodString>;
        descripcion: z.ZodString;
        cantidad: z.ZodString;
        precioUnitario: z.ZodString;
        descuento: z.ZodString;
        precioTotalSinImpuesto: z.ZodString;
        impuestos: z.ZodArray<z.ZodObject<{
            codigo: z.ZodString;
            codigoPorcentaje: z.ZodString;
            tarifa: z.ZodString;
            baseImponible: z.ZodString;
            valor: z.ZodString;
        }, z.core.$strict>>;
        detallesAdicionales: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
    }, z.core.$strict>>;
    motivo: z.ZodString;
    infoAdicional: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
}, z.core.$strict>;

/**
 * Motivo de la Nota de Débito (port de `src/Documents/Motivo.php`).
 */
declare const motivoSchema: z.ZodObject<{
    razon: z.ZodString;
    valor: z.ZodString;
}, z.core.$strict>;
/**
 * Schema zod de Nota de Débito (codDoc `05`). `motivos` no puede estar
 * vacío: es obligatorio y no vacío en el value object PHP (ver comentario en
 * `documents/nota-debito.ts`). Espejo estructural de
 * `documents/nota-debito.ts::NotaDebito`.
 */
declare const notaDebitoSchema: z.ZodObject<{
    tipo: z.ZodLiteral<TipoComprobante.NotaDebito>;
    infoTributaria: z.ZodObject<{
        ambiente: z.ZodEnum<typeof Ambiente>;
        razonSocial: z.ZodString;
        ruc: z.ZodString;
        estab: z.ZodString;
        ptoEmi: z.ZodString;
        secuencial: z.ZodString;
        dirMatriz: z.ZodString;
        tipoEmision: z.ZodOptional<z.ZodEnum<typeof TipoEmision>>;
        nombreComercial: z.ZodOptional<z.ZodString>;
        regimenRimpe: z.ZodOptional<z.ZodEnum<typeof RegimenRimpe>>;
        agenteRetencion: z.ZodOptional<z.ZodString>;
    }, z.core.$strict>;
    fechaEmision: z.ZodString;
    dirEstablecimiento: z.ZodOptional<z.ZodString>;
    tipoIdentificacionComprador: z.ZodString;
    razonSocialComprador: z.ZodString;
    identificacionComprador: z.ZodString;
    contribuyenteEspecial: z.ZodOptional<z.ZodString>;
    obligadoContabilidad: z.ZodOptional<z.ZodEnum<{
        SI: "SI";
        NO: "NO";
    }>>;
    rise: z.ZodOptional<z.ZodString>;
    codDocModificado: z.ZodString;
    numDocModificado: z.ZodString;
    fechaEmisionDocSustento: z.ZodString;
    totalSinImpuestos: z.ZodString;
    impuestos: z.ZodArray<z.ZodObject<{
        codigo: z.ZodString;
        codigoPorcentaje: z.ZodString;
        baseImponible: z.ZodString;
        valor: z.ZodString;
        descuentoAdicional: z.ZodOptional<z.ZodString>;
    }, z.core.$strict>>;
    valorTotal: z.ZodString;
    pagos: z.ZodArray<z.ZodObject<{
        formaPago: z.ZodString;
        total: z.ZodString;
        plazo: z.ZodOptional<z.ZodString>;
        unidadTiempo: z.ZodOptional<z.ZodString>;
    }, z.core.$strict>>;
    motivos: z.ZodArray<z.ZodObject<{
        razon: z.ZodString;
        valor: z.ZodString;
    }, z.core.$strict>>;
    infoAdicional: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
}, z.core.$strict>;

/**
 * Fila de `impuestosDocSustento` (port de `DocSustento::$impuestosDocSustento`).
 * Usa `.catchall(z.string())` en vez de `.strict()`: el value object PHP no
 * fija el catálogo de campos (es un `foreach` genérico), así que cualquier
 * campo SRI adicional no listado en {@link ImpuestoDocSustentoRow} debe
 * pasar mientras sea `string` — igual que el índice `[extra: string]: string`
 * del tipo TS.
 */
declare const impuestoDocSustentoRowSchema: z.ZodObject<{
    codImpuestoDocSustento: z.ZodString;
    codigoPorcentaje: z.ZodString;
    baseImponible: z.ZodString;
    tarifa: z.ZodString;
    factorProporcionalidad: z.ZodOptional<z.ZodString>;
    baseImponibleModificada: z.ZodOptional<z.ZodString>;
    valorImpuesto: z.ZodString;
}, z.core.$catchall<z.ZodOptional<z.ZodString>>>;
/**
 * Fila de `retenciones` (port de `DocSustento::$retenciones`). Mismos
 * motivos de `.catchall` que {@link impuestoDocSustentoRowSchema}.
 */
declare const retencionRowSchema: z.ZodObject<{
    codigo: z.ZodString;
    codigoRetencion: z.ZodString;
    baseImponible: z.ZodString;
    porcentajeRetener: z.ZodString;
    valorRetenido: z.ZodString;
}, z.core.$catchall<z.ZodString>>;
/**
 * Fila de `pagos` dentro de un `docSustento` (port de `DocSustento::$pagos`).
 * Mismos motivos de `.catchall` que {@link impuestoDocSustentoRowSchema}.
 */
declare const pagoSustentoRowSchema: z.ZodObject<{
    formaPago: z.ZodString;
    total: z.ZodString;
}, z.core.$catchall<z.ZodString>>;
/**
 * Documento sustento de un Comprobante de Retención (port de
 * `src/Documents/DocSustento.php`, v2.0.0). `impuestosDocSustento`,
 * `retenciones` y `pagos` no pueden estar vacíos: son la razón de ser del
 * nodo `docSustento`.
 */
declare const docSustentoSchema: z.ZodObject<{
    codSustento: z.ZodString;
    codDocSustento: z.ZodString;
    numDocSustento: z.ZodString;
    fechaEmisionDocSustento: z.ZodString;
    totalSinImpuestos: z.ZodString;
    importeTotal: z.ZodString;
    impuestosDocSustento: z.ZodArray<z.ZodObject<{
        codImpuestoDocSustento: z.ZodString;
        codigoPorcentaje: z.ZodString;
        baseImponible: z.ZodString;
        tarifa: z.ZodString;
        factorProporcionalidad: z.ZodOptional<z.ZodString>;
        baseImponibleModificada: z.ZodOptional<z.ZodString>;
        valorImpuesto: z.ZodString;
    }, z.core.$catchall<z.ZodOptional<z.ZodString>>>>;
    retenciones: z.ZodArray<z.ZodObject<{
        codigo: z.ZodString;
        codigoRetencion: z.ZodString;
        baseImponible: z.ZodString;
        porcentajeRetener: z.ZodString;
        valorRetenido: z.ZodString;
    }, z.core.$catchall<z.ZodString>>>;
    pagos: z.ZodArray<z.ZodObject<{
        formaPago: z.ZodString;
        total: z.ZodString;
    }, z.core.$catchall<z.ZodString>>>;
    fechaRegistroContable: z.ZodOptional<z.ZodString>;
    numAutDocSustento: z.ZodOptional<z.ZodString>;
    pagoLocExt: z.ZodOptional<z.ZodString>;
    tipoRegi: z.ZodOptional<z.ZodString>;
    paisEfecPago: z.ZodOptional<z.ZodString>;
    aplicConvDobTwordsri: z.ZodOptional<z.ZodString>;
    pagExtSujRetNorLeg: z.ZodOptional<z.ZodString>;
    pagoRegFis: z.ZodOptional<z.ZodString>;
    totalComprobantesReembolso: z.ZodOptional<z.ZodString>;
    totalBaseImponibleReembolso: z.ZodOptional<z.ZodString>;
    totalImpuestoReembolso: z.ZodOptional<z.ZodString>;
}, z.core.$strict>;
/**
 * Schema zod de Comprobante de Retención (codDoc `07`). `dirEstablecimiento`
 * es obligatorio (igual que en Guía de Remisión) y `docsSustento` no puede
 * estar vacío. Espejo estructural de `documents/retencion.ts::Retencion`.
 */
declare const retencionSchema: z.ZodObject<{
    tipo: z.ZodLiteral<TipoComprobante.Retencion>;
    infoTributaria: z.ZodObject<{
        ambiente: z.ZodEnum<typeof Ambiente>;
        razonSocial: z.ZodString;
        ruc: z.ZodString;
        estab: z.ZodString;
        ptoEmi: z.ZodString;
        secuencial: z.ZodString;
        dirMatriz: z.ZodString;
        tipoEmision: z.ZodOptional<z.ZodEnum<typeof TipoEmision>>;
        nombreComercial: z.ZodOptional<z.ZodString>;
        regimenRimpe: z.ZodOptional<z.ZodEnum<typeof RegimenRimpe>>;
        agenteRetencion: z.ZodOptional<z.ZodString>;
    }, z.core.$strict>;
    fechaEmision: z.ZodString;
    dirEstablecimiento: z.ZodString;
    tipoIdentificacionSujetoRetenido: z.ZodString;
    razonSocialSujetoRetenido: z.ZodString;
    identificacionSujetoRetenido: z.ZodString;
    periodoFiscal: z.ZodString;
    docsSustento: z.ZodArray<z.ZodObject<{
        codSustento: z.ZodString;
        codDocSustento: z.ZodString;
        numDocSustento: z.ZodString;
        fechaEmisionDocSustento: z.ZodString;
        totalSinImpuestos: z.ZodString;
        importeTotal: z.ZodString;
        impuestosDocSustento: z.ZodArray<z.ZodObject<{
            codImpuestoDocSustento: z.ZodString;
            codigoPorcentaje: z.ZodString;
            baseImponible: z.ZodString;
            tarifa: z.ZodString;
            factorProporcionalidad: z.ZodOptional<z.ZodString>;
            baseImponibleModificada: z.ZodOptional<z.ZodString>;
            valorImpuesto: z.ZodString;
        }, z.core.$catchall<z.ZodOptional<z.ZodString>>>>;
        retenciones: z.ZodArray<z.ZodObject<{
            codigo: z.ZodString;
            codigoRetencion: z.ZodString;
            baseImponible: z.ZodString;
            porcentajeRetener: z.ZodString;
            valorRetenido: z.ZodString;
        }, z.core.$catchall<z.ZodString>>>;
        pagos: z.ZodArray<z.ZodObject<{
            formaPago: z.ZodString;
            total: z.ZodString;
        }, z.core.$catchall<z.ZodString>>>;
        fechaRegistroContable: z.ZodOptional<z.ZodString>;
        numAutDocSustento: z.ZodOptional<z.ZodString>;
        pagoLocExt: z.ZodOptional<z.ZodString>;
        tipoRegi: z.ZodOptional<z.ZodString>;
        paisEfecPago: z.ZodOptional<z.ZodString>;
        aplicConvDobTwordsri: z.ZodOptional<z.ZodString>;
        pagExtSujRetNorLeg: z.ZodOptional<z.ZodString>;
        pagoRegFis: z.ZodOptional<z.ZodString>;
        totalComprobantesReembolso: z.ZodOptional<z.ZodString>;
        totalBaseImponibleReembolso: z.ZodOptional<z.ZodString>;
        totalImpuestoReembolso: z.ZodOptional<z.ZodString>;
    }, z.core.$strict>>;
    contribuyenteEspecial: z.ZodOptional<z.ZodString>;
    obligadoContabilidad: z.ZodOptional<z.ZodEnum<{
        SI: "SI";
        NO: "NO";
    }>>;
    tipoSujetoRetenido: z.ZodOptional<z.ZodString>;
    parteRel: z.ZodOptional<z.ZodString>;
    infoAdicional: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
}, z.core.$strict>;

/**
 * Bloques de validación zod reutilizados por los 6 schemas de comprobante
 * (Task 5). Espejo estructural de los tipos en `documents/shared.ts`: cada
 * schema exportado aquí debe aceptar exactamente el shape del tipo TS
 * homónimo (verificado en tiempo de compilación con `satisfies z.ZodType<T>`
 * más abajo y en cada `*.schema.ts` de comprobante).
 *
 * Reglas compartidas (brief Task 5): `ruc` `/^\d{13}$/`, `estab`/`ptoEmi`
 * `/^\d{3}$/`, `secuencial` `/^\d{9}$/`, `fecha` `/^\d{2}\/\d{2}\/\d{4}$/`,
 * montos vía `isMonto` (`utils/money.ts`), `razonSocial` 1–300 caracteres,
 * `dirMatriz`/`dirEstablecimiento` 1–300 caracteres, `contribuyenteEspecial`
 * 1–13 caracteres (los tres últimos, límites del XSD confirmados por el
 * reviewer en dos rondas — `dirEstablecimiento`/`contribuyenteEspecial`
 * primero, `dirMatriz` en una auditoría posterior — antes modelados como
 * `nonEmptyString` sin tope superior).
 * La validación de catálogo (p.ej. que `ruc` tenga un tercer dígito válido,
 * que `formaPago` exista en `catalogs/forma-pago.ts`) es responsabilidad de
 * `BusinessValidator` (Task 6) — aquí solo se valida forma/estructura.
 */
/** Cadena no vacía; base de casi todo campo `string` obligatorio del XSD. */
declare const nonEmptyString: z.ZodString;
/** RUC ecuatoriano: exactamente 13 dígitos (port de `numeroRuc` en el XSD). */
declare const rucField: z.ZodString;
/** Código de establecimiento/punto de emisión: exactamente 3 dígitos. */
declare const estabPtoEmiField: z.ZodString;
/** Secuencial de `infoTributaria`: exactamente 9 dígitos. */
declare const secuencialField: z.ZodString;
/** Fecha en formato SRI `DD/MM/YYYY`. */
declare const fechaField: z.ZodString;
/** Monto decimal-seguro: reusa `isMonto` (entero o hasta 6 decimales, no negativo). */
declare const montoField: z.ZodString;
/** `razonSocial` y cualquier campo `razonSocial*`: 1–300 caracteres (port de `razonSocial` en el XSD). */
declare const razonSocialField: z.ZodString;
/**
 * `dirEstablecimiento`/`dirMatriz`: 1–300 caracteres (port del simpleType
 * `direccion` del XSD, confirmado en `resources/xsd/factura_v2.1.0.xsd:332-338`
 * — `<xs:maxLength value="300"/>`, el mismo tipo que usan `dirMatriz`,
 * `dirEstablecimiento` y `direccionComprador`/`direccionProveedor`/
 * `dirDestinatario`/`dirPartida`). Un solo objeto zod, reusado por
 * `infoTributariaSchema` (`dirMatriz`) y por los 6 `*.schema.ts`
 * (`dirEstablecimiento`) — el nombre quedó fijado por el primer uso
 * (`dirEstablecimiento`) cuando aún no se aplicaba a `dirMatriz`.
 *
 * `dirEstablecimiento` ya tenía este `.max` (hallazgo confirmado del
 * reviewer, fix round 1: sin él, un valor más largo pasaba zod, se firmaba
 * y el SRI lo rechazaba en la recepción, quemando la clave de acceso).
 * `dirMatriz` NO lo tenía — modelado como `nonEmptyString` sin tope
 * superior — la MISMA clase de bug, encontrada en una auditoría posterior:
 * `checkCamposLocales` (`business-validator.ts`) ya limita `dirMatriz` a
 * 300 en la capa de reglas de negocio (`validateBusiness`/`assertValid`),
 * pero quien valide solo con `schemaFor(doc.tipo).safeParse(doc)` — el uso
 * "de forma independiente" que `validateBusiness` documenta como válido —
 * no obtenía ese límite. Un schema de forma/estructura incompleto no debe
 * depender de que el llamador también corra la capa de negocio.
 */
declare const dirEstablecimientoField: z.ZodString;
/**
 * `contribuyenteEspecial`: 1–13 caracteres (port del simpleType
 * `contribuyenteEspecial` del XSD — el número de resolución, no un RUC;
 * puede ser más corto). Mismo motivo que {@link dirEstablecimientoField}
 * para no usar `nonEmptyString` a secas.
 */
declare const contribuyenteEspecialField: z.ZodString;
/** Código de forma de pago: 2 dígitos numéricos (catálogo real en `catalogs/forma-pago.ts`, validado por BusinessValidator). */
declare const formaPagoField: z.ZodString;
/** `infoAdicional` / `detallesAdicionales`: pares nombre/valor libres (`<campoAdicional nombre="" valor="">`). */
declare const camposAdicionalesField: z.ZodRecord<z.ZodString, z.ZodString>;
/** `obligadoContabilidad`: `'SI' | 'NO'` (port de `obligadoContabilidad` en el XSD). */
declare const obligadoContabilidadField: z.ZodEnum<{
    SI: "SI";
    NO: "NO";
}>;
/**
 * `infoTributaria`, común a los 6 comprobantes (port de
 * `src/Documents/InfoTributaria.php`).
 */
declare const infoTributariaSchema: z.ZodObject<{
    ambiente: z.ZodEnum<typeof Ambiente>;
    razonSocial: z.ZodString;
    ruc: z.ZodString;
    estab: z.ZodString;
    ptoEmi: z.ZodString;
    secuencial: z.ZodString;
    dirMatriz: z.ZodString;
    tipoEmision: z.ZodOptional<z.ZodEnum<typeof TipoEmision>>;
    nombreComercial: z.ZodOptional<z.ZodString>;
    regimenRimpe: z.ZodOptional<z.ZodEnum<typeof RegimenRimpe>>;
    agenteRetencion: z.ZodOptional<z.ZodString>;
}, z.core.$strict>;
/**
 * Impuesto de un `detalle` (línea de ítem). Port de `src/Documents/Impuesto.php`.
 */
declare const impuestoSchema: z.ZodObject<{
    codigo: z.ZodString;
    codigoPorcentaje: z.ZodString;
    tarifa: z.ZodString;
    baseImponible: z.ZodString;
    valor: z.ZodString;
}, z.core.$strict>;
/**
 * Impuesto agregado a nivel de comprobante (`totalConImpuestos` /
 * `infoNotaDebito.impuestos`). Port de la sección homónima del XSD.
 */
declare const totalImpuestoSchema: z.ZodObject<{
    codigo: z.ZodString;
    codigoPorcentaje: z.ZodString;
    baseImponible: z.ZodString;
    valor: z.ZodString;
    descuentoAdicional: z.ZodOptional<z.ZodString>;
}, z.core.$strict>;
/**
 * Forma de pago (port de `src/Documents/Pago.php`).
 */
declare const pagoSchema: z.ZodObject<{
    formaPago: z.ZodString;
    total: z.ZodString;
    plazo: z.ZodOptional<z.ZodString>;
    unidadTiempo: z.ZodOptional<z.ZodString>;
}, z.core.$strict>;
/**
 * Línea de detalle (port de `src/Documents/Detalle.php`). `impuestos` no
 * puede estar vacío: un detalle sin impuestos no es representable en el XSD
 * del SRI (`impuestos` es `maxOccurs="unbounded"` sin `minOccurs="0"`).
 */
declare const detalleSchema: z.ZodObject<{
    codigoPrincipal: z.ZodOptional<z.ZodString>;
    codigoAuxiliar: z.ZodOptional<z.ZodString>;
    descripcion: z.ZodString;
    cantidad: z.ZodString;
    precioUnitario: z.ZodString;
    descuento: z.ZodString;
    precioTotalSinImpuesto: z.ZodString;
    impuestos: z.ZodArray<z.ZodObject<{
        codigo: z.ZodString;
        codigoPorcentaje: z.ZodString;
        tarifa: z.ZodString;
        baseImponible: z.ZodString;
        valor: z.ZodString;
    }, z.core.$strict>>;
    detallesAdicionales: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
}, z.core.$strict>;

/**
 * Devuelve el schema zod correspondiente a un `TipoComprobante`, ya listo
 * para validar el documento completo (`infoTributaria` incluida) — no solo
 * un fragmento. Punto de entrada del módulo `schemas` (Task 5), consumido
 * por `SriClient`/`BusinessValidator` (Tasks 6, 11) antes de firmar/emitir.
 */
declare function schemaFor(tipo: TipoComprobante): z.ZodType<Comprobante>;
/**
 * Aplana los `issues` de un `ZodError` a líneas `"path: mensaje"`, listas
 * para volcar en `ValidationError.errors` (`errors/index.ts`). Las issues de
 * raíz (p.ej. `unrecognized_keys` sobre el objeto completo, `path: []`) se
 * devuelven sin prefijo de ruta.
 */
declare function zodIssuesToErrors(issues: readonly z.ZodIssue[]): string[];

/**
 * Certificado de firma ya extraído de un `.p12`: la hoja (leaf) en PEM, su
 * clave privada en PEM y, opcionalmente, la cadena de CAs intermedias.
 *
 * Equivalente a `Teran\Sri\Signing\Certificate` (PHP), pero como interfaz de
 * datos plana (sin invariantes en el constructor) — la validación de que el
 * `.p12` produjo un cert/key utilizables ocurre en `loadCertificate()`.
 */
interface Certificate {
    certPem: string;
    privateKeyPem: string;
    /** CAs intermedias en PEM. */
    extraCerts: string[];
}
interface CertificateInfo {
    /** Número de serie como decimal de precisión arbitraria. */
    serialNumberDecimal: string;
    /** DN del emisor en formato RFC 2253 (estilo Java X500Principal, el que espera el SRI). */
    issuerRfc4514: string;
    notAfter: Date;
    keyType: 'RSA' | 'EC';
}
type Pkcs12Bag = forge.pkcs12.Bag;
/**
 * Carga un `.p12` con node-forge (JS puro): a diferencia del `CertificateLoader`
 * de PHP, esto NO necesita un fallback a la CLI de OpenSSL para certificados
 * legacy (RC2/3DES pre-2024) — node-forge implementa esos algoritmos de PBE de
 * forma nativa y descifra ambos formatos igual. Por eso no existe aquí un
 * equivalente a `loadViaOpensslCli`: node-forge ya cubre ese caso.
 */
declare function loadCertificate(p12: Uint8Array, password: string): Certificate;
interface CredentialSelection {
    keyBag: Pkcs12Bag;
    certBag: Pkcs12Bag;
    extraCertBags: Pkcs12Bag[];
}
/**
 * Heurística de selección de credencial, aislada para poder testearla sin
 * depender de un `.p12` real con varias claves (difícil de generar con la
 * CLI de `openssl`, que solo exporta un par cert/key por invocación).
 *
 * Caso común (un único par cert/key, la inmensa mayoría de los `.p12` del
 * SRI): se toma directamente. Con varias claves, ver `pickBestKeyBag`.
 */
declare function selectCredential(keyBags: Pkcs12Bag[], certBags: Pkcs12Bag[]): CredentialSelection;
/**
 * Parsea los campos de `certificateInfo` re-leyendo el DER del `certPem`
 * directamente (ver `x509-der.ts`): evita depender de node-forge para esta
 * parte, ya que `forge.pki.certificateFromAsn1` rechaza certificados con
 * clave pública EC incluso cuando solo se necesitan metadatos del emisor.
 */
declare function certificateInfo(cert: Certificate): CertificateInfo;

/**
 * Reloj inyectable (port de `Teran\Sri\Signing\ClockInterface`): permite fijar
 * el instante de firma en los tests y hace determinista el sufijo de los ids
 * del XAdES, que se deriva de la fecha de firma.
 */
interface Clock {
    now(): Date;
}
/** Reloj del sistema (port de `Teran\Sri\Signing\SystemClock`). */
declare class SystemClock implements Clock {
    now(): Date;
}

interface ParsedCertificateFields {
    /** Número de serie como decimal de precisión arbitraria (sin signo). */
    serialNumberDecimal: string;
    /** DN del emisor en formato RFC 2253 (estilo Java X500Principal). */
    issuerRfc4514: string;
    notAfter: Date;
    keyType: 'RSA' | 'EC';
}
/**
 * Parsea los campos de un certificado X.509 en PEM que necesita
 * `certificateInfo()`, sin pasar por node-forge.
 */
declare function parseCertificateFields(certificatePem: string): ParsedCertificateFields;

type DigestAlgorithm = 'sha1' | 'sha256';
/** Port de `Teran\Sri\Signing\SignatureOptions`. */
interface SignatureOptions {
    /** `sha1` por defecto: es lo que valida el SRI. */
    digestAlgorithm?: DigestAlgorithm;
    /** Contenido de `etsi:Description`. */
    description?: string;
}
declare class XadesSigner {
    private readonly digestAlgorithm;
    private readonly description;
    private readonly clock;
    /**
     * El parseo del certificado no cambia entre documentos: se memoiza.
     * Clave del caché = SHA-256 del PEM, nunca el PEM (ver
     * {@link LruCache} y `privateKeyCache`).
     */
    private readonly certificateCache;
    /**
     * Igual con la clave privada ya parseada (evita re-parsear el PEM por
     * firma). Indexado por SHA-256 del PEM y acotado por LRU: un `Map` sin
     * límite indexado por el PEM dejaba TODAS las claves privadas de todos los
     * tenants firmados vivas en el heap (recuperables en texto plano de un
     * volcado de memoria) y crecía sin techo en un proceso multi-emisor.
     */
    private readonly privateKeyCache;
    constructor(options?: SignatureOptions, clock?: Clock);
    /** Firma el XML con XAdES-BES y devuelve el documento firmado completo. */
    sign(xmlContent: string, cert: Certificate): string;
    /** Port de `XadesSigner::buildKeyInfo()`. */
    private buildKeyInfo;
    /** Port de `XadesSigner::buildSignedProperties()`. */
    private buildSignedProperties;
    /** Port de `XadesSigner::extractCertificateInfo()` (memoizado por digest del PEM). */
    private certificateData;
    private computeCertificateData;
    private privateKey;
    private signatureAlgorithm;
    private digestAlgorithmUri;
    private digestBase64;
}

/**
 * Genera la clave de acceso completa (48 dígitos + dígito verificador).
 * Implementa el algoritmo Módulo 11 según la ficha técnica del SRI.
 *
 * @param p.fecha Formato 'dd/mm/yyyy' o 'ddmmyyyy'
 * @param p.tipoComprobante (01: Factura, 04: Nota de Crédito, etc.)
 * @param p.ruc
 * @param p.ambiente (1: Pruebas, 2: Producción)
 * @param p.serie (Establecimiento + Punto de Emisión, 6 dígitos)
 * @param p.numero (9 dígitos)
 * @param p.codigoNum (8 dígitos aleatorios o fijos)
 * @param p.tipoEmision (1: Normal, default '1')
 * @returns String de 49 dígitos
 */
declare function generarClaveAcceso(p: {
    fecha: string;
    tipoComprobante: string;
    ruc: string;
    ambiente: string;
    serie: string;
    numero: string;
    codigoNum: string;
    tipoEmision?: string;
}): string;
/**
 * Calcula el dígito verificador usando el algoritmo Módulo 11.
 *
 * @param cadena48 String de 48 dígitos
 * @returns Dígito verificador (0-9)
 * @throws ValidationError si cadena48 no tiene exactamente 48 dígitos o contiene no-dígitos
 */
declare function calcularDigitoVerificador(cadena48: string): number;

/** `true` si `s` es un monto válido: `/^\d+(\.\d{1,6})?$/`. */
declare function isMonto(s: string): boolean;
/**
 * Convierte un monto decimal (string, hasta 6 decimales) a centavos enteros,
 * redondeando half-up al segundo decimal — igual que `Money::format()` en
 * PHP, que sólo suma el delta de redondeo (`0.005`) antes de truncar.
 *
 * @throws ValidationError si `monto` no matchea `isMonto`.
 */
declare function toCents(monto: string): number;
/** Convierte centavos enteros a un monto decimal string con 2 decimales, p.ej. `11200 -> '112.00'`. */
declare function fromCents(cents: number): string;
/**
 * Formatea `monto` a `decimals` decimales con redondeo half-up — port
 * generalizado de `Money::format(int $decimals)` en PHP (que opera sobre un
 * `Money` interno a escala 6). A diferencia de `toCents`/`fromCents` (fijos
 * a escala 2, pensados para aritmética de negocio en centavos), esta
 * función soporta cualquier escala hasta 6 decimales: la usan los
 * serializadores XML (`xml/*.serializer.ts`) para formatear tanto montos
 * (escala 2) como cantidades/precios unitarios (escala 6), replicando
 * campo a campo `FacturaXmlSerializer::detalles()` y equivalentes — sin
 * asumir que el string de entrada ya viene con la escala exacta esperada.
 *
 * @throws ValidationError si `monto` no matchea `isMonto`.
 */
declare function formatMonto(monto: string, decimals: number): string;

/**
 * Port de `Teran\Sri\Utils\RucValidator` (PHP). En PHP, `RucValidator::validate()`
 * combina una validación local (delegada a `BusinessValidator::validarRuc()`) con
 * una verificación opcional contra el servicio REST público del SRI.
 *
 * Aquí se exponen las dos mitades por separado en vez de un único `validate()`
 * (brief de Task 14):
 *  - {@link validarRucLocal} — el paso local, síncrono. Por defecto reproduce
 *    exactamente la (deliberada) looseness de `BusinessValidator::validarRuc()`
 *    en PHP (sin módulo 10/11 ni provincia); `opts.checksum = true` añade,
 *    de forma aditiva y opt-in, el algoritmo real ecuatoriano vía
 *    {@link validarRucChecksum} (fix round 1).
 *  - {@link validarRucOnline} — el paso local + la verificación online, con
 *    fallback al resultado local si la red falla (mismo criterio que PHP).
 *
 * Nota de fidelidad: `validarRucOnline` no es un port línea-por-línea de
 * `RucValidator::validate()`:
 * el PHP original tiene una rama muerta (el resultado de `checkOnline()` nunca
 * afecta el valor de retorno) que aquí se corrige para que el chequeo online
 * cumpla el propósito descrito en sus propios comentarios.
 */
/** URL del servicio REST del SRI usado por `RucValidator::checkOnline()` (PHP). */
declare const SRI_RUC_URL = "https://srienlinea.sri.gob.ec/sri-catastro-sujeto-servicio-internet/rest/ConsolidadoContribuyente/existePorNumeroRuc?numeroRuc=";
interface ValidarRucOnlineOptions {
    /** `fetch` a usar — inyectable para tests (mock) o runtimes sin `fetch` global. Por defecto `fetch` global. */
    fetch?: typeof fetch;
    /** Timeout de la llamada HTTP, en milisegundos. Por defecto {@link DEFAULT_TIMEOUT_MS}. */
    timeoutMs?: number;
}
interface ValidarRucLocalOptions {
    /**
     * `false` (por defecto): comportamiento PHP-compatible — solo tercer dígito
     * de régimen + establecimiento != "000" (la looseness de
     * `BusinessValidator::validarRuc()`, preservada a propósito porque
     * `validarRucLocal` es la base de la que dependen `schemas/*` y
     * `business-validator.ts` en todo el paquete; cambiar el default rompería
     * paridad con el PHP fuente para todo consumidor existente).
     *
     * `true`: además exige que {@link validarRucChecksum} pase (módulo 10/11 +
     * provincia real) — validación *estricta*, opt-in, aditiva. No existe en el
     * PHP fuente; es una extensión de este port (fix round 1).
     */
    checksum?: boolean;
}
/**
 * Validación local de un RUC ecuatoriano de 13 dígitos. Port de
 * `BusinessValidator::validarRuc()` (llamado por `RucValidator::validate()`
 * como paso 1 en PHP) — reusa {@link esRucLocalValido} (Task 6) en vez de
 * duplicar el algoritmo: tercer dígito de régimen (0-6 o 9) + código de
 * establecimiento distinto de "000".
 *
 * Nota de fidelidad: el PHP original (y por tanto el comportamiento por
 * defecto de esta función) NO implementa módulo 10 (cédula), módulo 11 (RUC
 * sociedades/públicas) ni validación de código de provincia — pese a que esos
 * algoritmos son el estándar de facto para validar cédulas/RUC ecuatorianos,
 * `BusinessValidator::validarRuc()` solo hace las dos comprobaciones
 * estructurales de arriba. Se preserva esa looseness a propósito por defecto
 * (paridad de comportamiento con el PHP fuente — de la que dependen
 * `schemas/*.schema.ts` y `business-validator.ts` en todo el paquete), no por
 * omisión.
 *
 * `opts.checksum = true` aplica, ADEMÁS, el algoritmo real ecuatoriano
 * ({@link validarRucChecksum}: módulo 10/11 según el tipo de contribuyente +
 * código de provincia) — validación estricta, opt-in, que no cambia el
 * comportamiento por defecto de ningún caller existente.
 */
declare function validarRucLocal(ruc: string, opts?: ValidarRucLocalOptions): boolean;
/**
 * Validación *estricta* de un RUC ecuatoriano: el algoritmo real usado por el
 * SRI (módulo 10/11 según el tipo de contribuyente, deducido del tercer
 * dígito) + código de provincia. A diferencia de {@link validarRucLocal}
 * (looseness PHP-compatible por defecto), esta función SIEMPRE aplica el
 * algoritmo completo — no tiene modo "loose".
 *
 * Reglas por tipo (tercer dígito del RUC):
 *  - `0-5` (persona natural): módulo 10 sobre los primeros 9 dígitos
 *    (coeficientes `2,1,2,1,2,1,2,1,2`), dígito verificador en la posición 10
 *    (índice 9); establecimiento = últimos 3 dígitos, no puede ser `"000"`.
 *  - `6` (entidad pública): módulo 11 sobre los primeros 8 dígitos
 *    (coeficientes `3,2,7,6,5,4,3,2`), dígito verificador en la posición 9
 *    (índice 8); establecimiento = últimos 4 dígitos, no puede ser `"0000"`.
 *  - `9` (sociedad privada/extranjera): módulo 11 sobre los primeros 9
 *    dígitos (coeficientes `4,3,2,7,6,5,4,3,2`), dígito verificador en la
 *    posición 10 (índice 9); establecimiento = últimos 3 dígitos, no puede
 *    ser `"000"`.
 *  - Cualquier otro tercer dígito (7, 8): no existe en el catálogo del SRI →
 *    inválido.
 *
 * En todos los casos, los primeros 2 dígitos deben ser un código de
 * provincia válido (`01`-`24`, o `30` para "exterior").
 *
 * Nota sobre la especificación de sociedades privadas: la ronda de fix que
 * originó esta función describía, para sociedades, "coeficientes
 * `4,3,2,7,6,5,4,3` sobre los primeros 8 dígitos, dígito verificador en la
 * posición 9, establecimiento `'001'`" — esa combinación es aritméticamente
 * inconsistente (8 + 1 + 3 = 12 dígitos, no 13; sobra un dígito sin cubrir
 * por ninguna regla). Se implementó en su lugar el algoritmo estándar
 * ampliamente documentado y usado en validadores de RUC ecuatoriano
 * (9 coeficientes, verificador en la posición 10, establecimiento de 3
 * dígitos = 9 + 1 + 3 = 13 dígitos, consistente y simétrico con el patrón de
 * "públicas" salvo por el ancho del establecimiento).
 */
declare function validarRucChecksum(ruc: string): boolean;
/**
 * Validación de un RUC combinando el chequeo local ({@link validarRucLocal})
 * con una verificación contra el servicio REST del SRI ({@link SRI_RUC_URL}).
 * Port funcional de `RucValidator::validate()` (PHP):
 *
 *  1. Si el RUC no pasa la validación local, se rechaza sin llamar a la red.
 *  2. Si pasa, se intenta la verificación online. Un fallo de red/timeout/HTTP
 *     no-200 hace fallback al resultado local (que ya es `true`) — mismo
 *     criterio que el comentario `// 3. Si la validación online falla pero la
 *     local pasó, aceptamos el RUC` de `RucValidator.php`.
 *  3. Si la red responde de forma concluyente (HTTP 200 con cuerpo `"true"` o
 *     `"false"`), esa respuesta decide el resultado final.
 *
 * Nunca lanza: cualquier error de `fetch` se trata como "no concluyente" (ver
 * paso 2).
 *
 * Divergencia deliberada de la fuente PHP: en `RucValidator::validate()`, el
 * `if ($this->checkOnline($ruc)) { return true; } return true;` hace que el
 * resultado de `checkOnline()` NUNCA se use — ambas ramas devuelven `true`,
 * así que un RUC local-válido siempre pasa `validate()` sin importar lo que
 * diga el SRI (incluida una respuesta explícita `"false"`). Es, con alta
 * probabilidad, un bug de la fuente: el comentario "1. si falla usamos la
 * validación local" documenta claramente la intención de un fallback
 * *ante fallo*, no de ignorar una respuesta negativa explícita. Este port
 * implementa la intención documentada (paso 3 arriba) en vez de replicar la
 * rama muerta.
 */
declare function validarRucOnline(ruc: string, opts?: ValidarRucOnlineOptions): Promise<boolean>;

/**
 * Constructor XML mínimo y determinista (port de `src/Xml/DomBuilder.php`).
 * A diferencia de PHP (que envuelve un `DOMDocument` real), aquí se modela
 * un árbol de elementos ligero en memoria y se serializa a texto a mano —
 * sin motor DOM — porque el único consumidor es el propio paquete (los
 * serializadores de comprobante), que solo construye el árbol una vez y lo
 * vuelca; no necesita parsear XML ni mutar un árbol ya serializado.
 *
 * Salida SIN pretty-print (sin indentación ni saltos de línea añadidos):
 * igual que `DomBuilder.php`, que solo crea elementos/texto — el
 * pretty-print de PHP lo añade `DOMDocument::$formatOutput = true` en
 * `FacturaXmlSerializer::serialize()`, una capa por encima de `DomBuilder`.
 * El test golden normaliza espacios en blanco entre etiquetas antes de
 * comparar (ver `test/xml-factura.test.ts`), así que la ausencia de
 * indentación aquí no rompe la paridad con el fixture generado por PHP.
 */
declare class XmlElement {
    readonly name: string;
    readonly attributes: Array<[name: string, value: string]>;
    readonly children: Array<XmlElement | string>;
    constructor(name: string);
    setAttribute(name: string, value: string): this;
}
declare class XmlBuilder {
    /**
     * Crea un elemento `name` como hijo de `parent`, con texto opcional
     * `value` como único nodo hijo, y devuelve el elemento creado (para poder
     * anexarle hijos después). Port de `DomBuilder::child()`.
     *
     * - `value` omitido o `null` → elemento vacío intencional / contenedor al
     *   que se le anexarán hijos después (p.ej. `<pagos>`, `<totalConImpuestos>`).
     * - `value === ''` → error: usar `null`/omitir para un elemento vacío
     *   intencional, u omitir la llamada entera si el elemento es opcional.
     */
    child(parent: XmlElement, name: string, value?: string | null): XmlElement;
}
/** Escapa `& < > " '` para uso seguro dentro de texto o valores de atributo XML. */
declare function escapeXml(text: string): string;
/**
 * Serializa el árbol a partir de `root` como documento XML completo
 * (prólogo `<?xml version="1.0" encoding="UTF-8"?>` + elemento raíz), sin
 * pretty-print. Determinista: mismo árbol de entrada produce siempre el
 * mismo string de salida (mismo orden de atributos/hijos que fueron
 * anexados, sin reordenamiento).
 */
declare function serializeXmlDocument(root: XmlElement): string;

/**
 * Escribe el nodo `<infoTributaria>`, común a los 6 comprobantes
 * electrónicos: mismo complexType XSD `infoTributaria` en los esquemas
 * oficiales del SRI — confirmado byte a byte entre `factura_v2.1.0.xsd` y
 * `liquidacionCompra_v1.1.0.xsd` (los dos únicos XSD disponibles en el repo
 * PHP hermano `teran-sri-ec`). Port de la lógica ya usada en
 * `FacturaXmlSerializer.infoTributaria()` (Task 7), extraída aquí para que
 * los 5 serializadores de Task 8 no la dupliquen 5 veces.
 *
 * Orden XSD: `ambiente` → `tipoEmision` → `razonSocial` →
 * `nombreComercial`? → `ruc` → `claveAcceso` → `codDoc` → `estab` →
 * `ptoEmi` → `secuencial` → `dirMatriz` → `agenteRetencion`? →
 * `contribuyenteRimpe`?.
 *
 * `agenteRetencion`/`contribuyenteRimpe` NO existen en el value object v2 de
 * PHP (`Documents\InfoTributaria`, ningún comprobante lo modela), pero SÍ
 * son legales en el XSD oficial (`minOccurs="0"`) y el generador 1.x
 * (`XmlGenerator::createInfoTributaria()`) los escribe cuando están
 * presentes — se emiten aquí cuando el documento TS los trae, igual que
 * `FacturaXmlSerializer` (Task 7).
 *
 * Diferencia deliberada con el PHP 1.x: `<contribuyenteRimpe>` no recibe
 * texto libre, sino la leyenda literal del régimen que declare el documento
 * (`InfoTributaria.regimenRimpe` → `LEYENDA_RIMPE`). El SRI valida el
 * contenido de ese elemento, no solo la etiqueta.
 */
declare function writeInfoTributaria(b: XmlBuilder, root: XmlElement, info: InfoTributaria, claveAcceso: string, codDoc: string): void;
/**
 * Escribe `<infoAdicional>` (con sus `campoAdicional[nombre]`), como último
 * hijo del elemento raíz, si `infoAdicional` trae al menos una entrada — port
 * de `XmlGenerator::addInfoAdicional()` (1.x), reusado por los 5
 * serializadores de Task 8 igual que
 * `FacturaXmlSerializer.infoAdicional()` (Task 7, no extraído allí pero con
 * idéntico comportamiento).
 *
 * Ninguno de los 5 value objects v2 de PHP (`LiquidacionCompra`,
 * `NotaCredito`, `NotaDebito`, `GuiaRemision`, `Retencion`) modela
 * `infoAdicional`, así que ninguno de los 5 `Xml*Serializer.php`
 * correspondientes lo serializa — pero el generador 1.x SÍ (paso 4 de cada
 * `*Generator::generate()`), y el tipo TS del documento sí lo modela
 * (`infoAdicional?: Record<string, string>`), así que se emite aquí cuando
 * está presente.
 */
declare function writeInfoAdicional(b: XmlBuilder, root: XmlElement, infoAdicional?: Record<string, string>): void;

/**
 * Serializador XML de `Factura` (codDoc `01`). Port campo a campo de
 * `src/Xml/FacturaXmlSerializer.php` — misma estructura, mismo orden base de
 * elementos (`infoTributaria` → `infoFactura` → `detalles`), mismos valores
 * literales (`codDoc`, `version`).
 *
 * `Documents\Factura` (value object v2 de PHP) y su serializador NO modelan
 * `dirEstablecimiento`, `contribuyenteEspecial`, `direccionComprador`,
 * `guiaRemision`, `infoAdicional`, `contribuyenteRimpe`, `agenteRetencion`,
 * `TotalImpuesto.descuentoAdicional`, `Detalle.detallesAdicionales` ni
 * `Pago.plazo`/`unidadTiempo` — pero SÍ son campos legales del XSD oficial
 * `factura_v2.1.0.xsd` (todos `minOccurs="0"`), y el generador 1.x
 * (`Generators/FacturaGenerator.php` + `Generators/XmlGenerator.php`) sí los
 * escribe cuando están presentes, en la posición exacta que exige la
 * secuencia del XSD. Este serializador emite esos 11 campos cuando el
 * documento TS los trae (el tipo `Factura` los modela todos como
 * opcionales), en la posición verificada directamente contra
 * `resources/xsd/factura_v2.1.0.xsd` (no solo contra el generador 1.x, que
 * apunta a la versión de esquema `1.1.0` — se usó como referencia de orden,
 * pero la fuente de verdad final es el XSD 2.1.0):
 *
 *   - `infoTributaria`: `dirMatriz` → `agenteRetencion`? → `contribuyenteRimpe`?
 *   - `infoFactura`: `fechaEmision` → `dirEstablecimiento`? →
 *     `contribuyenteEspecial`? → `obligadoContabilidad`? (`dirEstablecimiento`/
 *     `contribuyenteEspecial` son fix round 1, hallazgo confirmado del
 *     reviewer — gap real, no del RIDE: `Factura` era el único de los 6
 *     tipos de este port que no los modelaba) → `tipoIdentificacionComprador`
 *     → `guiaRemision`? → `razonSocialComprador` → `identificacionComprador`
 *     → `direccionComprador`? → `totalSinImpuestos`
 *   - `totalImpuesto`: `codigoPorcentaje` → `descuentoAdicional`? →
 *     `baseImponible`
 *   - `detalle`: `precioTotalSinImpuesto` → `detallesAdicionales`?
 *     (`detAdicional[nombre][valor]`, sin nodo de texto) → `impuestos`
 *     (XSD línea ~103; mismo mecanismo que `GuiaRemisionXmlSerializer`/
 *     `LiquidacionCompraXmlSerializer` de Task 8).
 *   - `pago`: `total` → `plazo`? → `unidadTiempo` (con `'dias'` por defecto
 *     si `plazo` está presente pero `unidadTiempo` no — XSD líneas
 *     ~154-159; mismo default que `LiquidacionCompraXmlSerializer`/
 *     `NotaDebitoXmlSerializer` de Task 8).
 *   - `infoAdicional` (con sus `campoAdicional[nombre]`) como último hijo de
 *     `<factura>`, después de `<detalles>`.
 *
 * `propina` y `moneda` sí son obligatorios en el XSD (siempre se emiten),
 * pero ya no se hardcodean: se lee `f.propina`/`f.moneda` si el documento
 * los trae, y solo se usa el literal (`'0.00'`/`'DOLAR'`) cuando están
 * ausentes — igual que `FacturaGenerator::createInfoFactura()`
 * (`$data['propina'] ?? 0`, `$data['moneda'] ?? 'DOLAR'`).
 */
declare class FacturaXmlSerializer {
    private static readonly VERSION;
    private static readonly COD_DOC;
    private static readonly SCALE_MONEY;
    private static readonly SCALE_QUANTITY;
    serialize(factura: Factura, claveAcceso: string): string;
    private infoTributaria;
    private infoFactura;
    private detalles;
    /**
     * `<infoAdicional>` — último hijo de `<factura>`, después de `<detalles>`
     * (port de `XmlGenerator::addInfoAdicional()` / `FacturaGenerator::generate()`,
     * paso 4). No existe en el value object v2 de PHP, pero sí en el XSD
     * oficial y en el generador 1.x; se omite el elemento por completo si
     * `infoAdicional` está ausente o vacío (mismo criterio que
     * `if (empty($infoAdicional)) return;`).
     */
    private infoAdicional;
}

/**
 * Serializador XML de `LiquidacionCompra` (codDoc `03`). Port campo a campo
 * de `src/Xml/LiquidacionCompraXmlSerializer.php` — misma estructura, mismo
 * orden base de elementos (`infoTributaria` → `infoLiquidacionCompra` →
 * `detalles`).
 *
 * Campos opcionales del XSD oficial (`resources/xsd/liquidacionCompra_v1.1.0.xsd`
 * — el único XSD 1.1.0 disponible en el repo PHP hermano, y por tanto la
 * fuente de verdad más fuerte para esta familia de comprobantes) que el
 * value object v2 de PHP (`Documents\LiquidacionCompra`) NO modela pero que
 * SÍ escribe el generador 1.x (`LiquidacionCompraGenerator.php`) cuando
 * están presentes. Este serializador los emite si el documento TS los trae,
 * en la posición verificada contra el XSD:
 *
 *   - `infoLiquidacionCompra.totalConImpuestos[].descuentoAdicional`:
 *     `minOccurs="0"`, entre `codigoPorcentaje` y `baseImponible`
 *     (`Documents\Impuesto` de PHP no tiene este campo en absoluto).
 *   - `detalles[].detallesAdicionales`: `minOccurs="0"`, entre
 *     `precioTotalSinImpuesto` e `impuestos` (`Documents\Detalle` de PHP no
 *     lo modela).
 *   - `infoAdicional` (top-level, último hijo de `<liquidacionCompra>`): no
 *     existe en `Documents\LiquidacionCompra`, pero sí en el XSD y en
 *     `LiquidacionCompraGenerator::generate()` (paso 4) — ver
 *     `writeInfoAdicional()` en `common.ts`.
 *
 * `infoLiquidacionCompra.pagos[].plazo`/`unidadTiempo` SÍ son representables
 * en PHP v2 (`Documents\Pago` los modela) y `LiquidacionCompraXmlSerializer`
 * ya los serializa condicionalmente — se portan aquí tal cual (mismo
 * default `'dias'` si `plazo` está presente pero `unidadTiempo` no).
 *
 * `obligadoContabilidad`/`moneda` son obligatorios en el XSD y siempre se
 * emiten con su valor por defecto (`'NO'`/`'DOLAR'`) cuando el documento no
 * los trae — igual que `Documents\LiquidacionCompra` (constructor con
 * default) y `FacturaXmlSerializer` (Task 7). `pagos` se emite siempre
 * (wrapper incondicional), igual que `LiquidacionCompraXmlSerializer` (PHP
 * nunca comprueba `!== []` para este comprobante, a diferencia de
 * `NotaDebitoXmlSerializer`).
 */
declare class LiquidacionCompraXmlSerializer {
    private static readonly VERSION;
    private static readonly COD_DOC;
    private static readonly SCALE_MONEY;
    private static readonly SCALE_QUANTITY;
    serialize(doc: LiquidacionCompra, claveAcceso: string): string;
    private infoLiquidacionCompra;
    private detalles;
}

/**
 * Serializador XML de `NotaCredito` (codDoc `04`). Port campo a campo de
 * `src/Xml/NotaCreditoXmlSerializer.php`.
 *
 * Campos opcionales que el value object v2 de PHP (`Documents\NotaCredito`)
 * NO modela, pero que este serializador SÍ emite cuando el documento TS los
 * trae (mismo criterio que `LiquidacionCompraXmlSerializer`/
 * `FacturaXmlSerializer`, Task 7/8):
 *
 *   - `totalConImpuestos[].descuentoAdicional`: no existe en
 *     `Documents\Impuesto` (PHP) y `NotaCreditoXmlSerializer::infoNotaCredito()`
 *     nunca lo escribe, pero es el mismo complexType `totalImpuesto` que en
 *     `factura_v2.1.0.xsd`/`liquidacionCompra_v1.1.0.xsd`
 *     (`descuentoAdicional` `minOccurs="0"` entre `codigoPorcentaje` y
 *     `baseImponible`) — se asume la misma posición por convención de
 *     esquema SRI compartida entre comprobantes.
 *   - `detalles[].detallesAdicionales`: no existe en `Documents\Detalle`
 *     (PHP) ni en `NotaCreditoGenerator::createDetalles()` (1.x) — no hay
 *     XSD de notaCredito en el repo para confirmarlo directamente (a
 *     diferencia de `factura_v2.1.0.xsd`/`liquidacionCompra_v1.1.0.xsd`,
 *     que sí lo tienen). **Adición por analogía** (ficha técnica SRI: el
 *     detalle de notaCredito admite `detallesAdicionales` igual que
 *     factura/liquidacionCompra/guiaRemision — mismo complexType `detalle`
 *     reutilizado entre comprobantes): se emite entre
 *     `precioTotalSinImpuesto` e `impuestos`, mismo mecanismo
 *     `detAdicional[nombre][valor]` que `FacturaXmlSerializer`/
 *     `LiquidacionCompraXmlSerializer`.
 *   - `infoAdicional` (top-level, último hijo de `<notaCredito>`): no existe
 *     en `Documents\NotaCredito`, pero sí en `NotaCreditoGenerator::generate()`
 *     (paso 4, 1.x) — ver `writeInfoAdicional()` en `common.ts`.
 *
 * `codigoPrincipal`/`codigoAuxiliar` de `Detalle` se renombran en el XML a
 * `codigoInterno`/`codigoAdicional` (mismo remapeo que
 * `NotaCreditoXmlSerializer::detalles()`); no tiene `pagos` (el XSD 1.1.0 de
 * notaCredito no lo contempla, igual que el value object PHP).
 */
declare class NotaCreditoXmlSerializer {
    private static readonly VERSION;
    private static readonly COD_DOC;
    private static readonly SCALE_MONEY;
    private static readonly SCALE_QUANTITY;
    serialize(doc: NotaCredito, claveAcceso: string): string;
    private infoNotaCredito;
    private detalles;
}

/**
 * Serializador XML de `NotaDebito` (codDoc `05`). Port campo a campo de
 * `src/Xml/NotaDebitoXmlSerializer.php` — misma estructura, mismo orden base
 * de elementos (`infoTributaria` → `infoNotaDebito` → `motivos`).
 *
 * `impuestos`/`pagos` de `infoNotaDebito` se envuelven condicionalmente
 * (`if (doc.impuestos.length > 0)` / `if (doc.pagos.length > 0)`), igual que
 * `NotaDebitoXmlSerializer::infoNotaDebito()` (`if ($doc->impuestos !== [])` /
 * `if ($doc->pagos !== [])`) — a diferencia de `LiquidacionCompraXmlSerializer`,
 * que siempre envuelve `pagos` incondicionalmente.
 *
 * Campos opcionales que el value object v2 de PHP (`Documents\Impuesto`,
 * `Documents\Pago`) no modela para este comprobante, pero que este
 * serializador SÍ emite cuando el documento TS los trae, por analogía con el
 * mismo complexType compartido (`totalImpuesto`/`pago`) confirmado en
 * `factura_v2.1.0.xsd`/`liquidacionCompra_v1.1.0.xsd` (no hay XSD 1.0.0 de
 * notaDebito en el repo PHP para confirmarlo directamente, pero el
 * generador 1.x (`NotaDebitoGenerator::createInfoNotaDebito()`) hace un
 * `foreach ($imp/$pago as $k => $v)` genérico que SÍ pasaría estas claves si
 * estuvieran presentes en el array crudo — no hay evidencia en contra):
 *
 *   - `impuestos[].descuentoAdicional`: entre `codigoPorcentaje` y
 *     `baseImponible` (`NotaDebitoXmlSerializer::infoNotaDebito()` v2 nunca
 *     lo escribe).
 *   - `pagos[].plazo`/`unidadTiempo`: después de `total`, con
 *     `unidadTiempo` por defecto `'dias'` si `plazo` está presente
 *     (`NotaDebitoXmlSerializer` v2 nunca los escribe).
 *   - `infoAdicional` (top-level, último hijo de `<notaDebito>`, después de
 *     `motivos`): no existe en `Documents\NotaDebito`, pero sí en
 *     `NotaDebitoGenerator::generate()` (paso 4, 1.x) — ver
 *     `writeInfoAdicional()` en `common.ts`.
 *
 * `obligadoContabilidad` es obligatorio en el XSD y siempre se emite con su
 * valor por defecto (`'NO'`) cuando el documento no lo trae — igual que
 * `Documents\NotaDebito` (constructor con default) y `FacturaXmlSerializer`.
 */
declare class NotaDebitoXmlSerializer {
    private static readonly VERSION;
    private static readonly COD_DOC;
    private static readonly SCALE_MONEY;
    serialize(doc: NotaDebito, claveAcceso: string): string;
    private infoNotaDebito;
    private motivos;
}

/**
 * Serializador XML de `GuiaRemision` (codDoc `06`). Port campo a campo de
 * `src/Xml/GuiaRemisionXmlSerializer.php` — misma estructura, mismo orden
 * base de elementos (`infoTributaria` → `infoGuiaRemision` →
 * `destinatarios`).
 *
 * A diferencia de Factura/LiquidacionCompra/NotaCredito/NotaDebito,
 * `Documents\GuiaRemision` (PHP) NO defaultea `obligadoContabilidad` a
 * `'NO'` (es `?string` sin valor por defecto) y
 * `GuiaRemisionXmlSerializer::infoGuiaRemision()` lo emite condicionalmente
 * (`if ($doc->obligadoContabilidad !== null)`) — igual que `Retencion`. Se
 * respeta esa diferencia aquí (sin default, solo se emite si está presente).
 *
 * `destinatario.detalles[].cantidad` se serializa tal cual (sin
 * `formatMonto`): en PHP, `Destinatario.detalles` es un array crudo
 * (`array<string,string>`, no un `Detalle` value object), y
 * `GuiaRemisionXmlSerializer::destinatarios()` hace `(string) $det['cantidad']`
 * sin pasar por `Money::format()` — se replica el mismo pass-through aquí.
 *
 * `destinatario.detalles[].detallesAdicionales` SÍ está soportado en PHP v2
 * (`GuiaRemisionXmlSerializer::destinatarios()`, bloque `detallesAdicionales`)
 * — se porta tal cual, iterando `Record<string,string>` (nombre→valor) en
 * vez del array de pares `{nombre,valor}` crudo de PHP (mismo dato,
 * distinta representación en TS, ver `documents/guia-remision.ts`).
 *
 * `infoAdicional` (top-level, último hijo de `<guiaRemision>`, después de
 * `destinatarios`): no existe en `Documents\GuiaRemision`, pero sí en
 * `GuiaRemisionGenerator::generate()` (paso 4, 1.x) — ver
 * `writeInfoAdicional()` en `common.ts`.
 */
declare class GuiaRemisionXmlSerializer {
    private static readonly VERSION;
    private static readonly COD_DOC;
    serialize(doc: GuiaRemision, claveAcceso: string): string;
    private infoGuiaRemision;
    private destinatarios;
}

/**
 * Serializador XML de `Retencion` (codDoc `07`, comprobante de retención
 * v2.0.0 con `docsSustento`). Port campo a campo de
 * `src/Xml/RetencionXmlSerializer.php` — misma estructura, mismo orden base
 * de elementos (`infoTributaria` → `infoCompRetencion` → `docsSustento`).
 *
 * Igual que `GuiaRemision`, `Documents\Retencion` (PHP) NO defaultea
 * `obligadoContabilidad` (es `?string` sin valor por defecto) —
 * `RetencionXmlSerializer::infoCompRetencion()` lo emite condicionalmente,
 * igual que aquí.
 *
 * `docSustento.totalSinImpuestos`/`importeTotal` y todos los campos de
 * `impuestosDocSustento`/`retenciones`/`pagos` se serializan tal cual (sin
 * `formatMonto`): `Documents\DocSustento` (PHP) los modela como `string`
 * crudo, no como `Money`, y `RetencionXmlSerializer::docsSustento()` nunca
 * llama a `->format()` sobre ellos — se replica el mismo pass-through.
 *
 * `impuestosDocSustento`/`retenciones`/`pagos` no tienen un catálogo fijo de
 * campos: cada fila se serializa con un `foreach` genérico clave→valor
 * (`writeRow()`), igual que el `foreach ($row as $k => $v)` de PHP —
 * cualquier campo SRI adicional presente en la fila TS (más allá de los
 * campos conocidos del tipo, vía su índice `[extra: string]: string`) se
 * serializa también, en el orden de inserción del objeto.
 *
 * `infoAdicional` (top-level, último hijo de `<comprobanteRetencion>`,
 * después de `docsSustento`): no existe en `Documents\Retencion`, pero sí en
 * `RetencionGenerator::generate()` (paso 4, 1.x) — ver
 * `writeInfoAdicional()` en `common.ts`.
 */
declare class RetencionXmlSerializer {
    private static readonly VERSION;
    private static readonly COD_DOC;
    serialize(doc: Retencion, claveAcceso: string): string;
    private infoCompRetencion;
    private docsSustento;
    /**
     * Escribe una fila genérica clave→valor (port de los tres
     * `foreach ($row as $k => $v) { $b->child($item, (string) $k, $v !== '' ? (string) $v : null); }`
     * de `RetencionXmlSerializer::docsSustento()` en PHP, para
     * `impuestosDocSustento`/`retenciones`/`pagos`): no hay un catálogo fijo de
     * campos, cualquier clave presente en la fila se serializa tal cual, en el
     * orden de inserción del objeto (igual que el `foreach` de un array
     * asociativo PHP, ambos preservan orden de inserción). `''` se coerciona a
     * `null` (elemento vacío `<el></el>`) en vez de dejar que
     * `XmlBuilder.child()` lance, igual que `$v !== '' ? (string) $v : null`
     * en PHP.
     *
     * Un valor `undefined` (campo opcional del XSD explícitamente ausente,
     * p.ej. `factorProporcionalidad`) NO emite elemento: `minOccurs="0"`
     * significa omitirlo, no escribirlo vacío.
     */
    private writeRow;
}

/**
 * Serializador XML para un tipo de comprobante `D` (contrato compartido,
 * `contratos.md`). Un serializador por tipo de comprobante — no hay una
 * clase genérica "un serializador para todos"; cada `codDoc` tiene su propia
 * estructura XSD.
 */
interface XmlSerializer<D> {
    serialize(doc: D, claveAcceso: string): string;
}
/**
 * Devuelve el serializador XML correspondiente a `tipo`, listo para
 * serializar el documento completo. Análogo a `schemaFor()` en
 * `schemas/index.ts`. Los 6 tipos de comprobante soportados por el paquete
 * están registrados (ver `REGISTRY`).
 *
 * @throws SriError (código `UNSUPPORTED_COMPROBANTE`) si `tipo` no
 * corresponde a ninguno de los 6 comprobantes soportados. Deliberadamente
 * NO es un `ValidationError`: llegar aquí significa que el discriminante
 * `tipo` del documento no pertenece a la unión `Comprobante`, es decir un
 * error de programación (o un cast forzado), no un dato de usuario mal
 * formado. Emitirlo como `ValidationError` haría que lo tragaran los
 * manejadores que traducen validaciones a errores 4xx del usuario final, en
 * vez de aflorar como el bug que es.
 */
declare function serializerFor(tipo: TipoComprobante): XmlSerializer<Comprobante>;

/**
 * Opciones de construcción de {@link SriClient} (contrato canónico,
 * `contratos.md`). Solo `ambiente` y `certificate` son obligatorios; el
 * resto tiene un valor por defecto listo para producción (transporte real
 * sobre `fetch`, firmador XAdES-BES con el reloj del sistema, validación
 * zod+negocio activada).
 */
interface SriClientOptions {
    ambiente: Ambiente;
    certificate: Certificate;
    /** Por defecto `new FetchSoapTransport()` (SOAP sobre `fetch` nativo). */
    transport?: SriTransport;
    /** Por defecto `new XadesSigner(undefined, clock)`. */
    signer?: XadesSigner;
    /** Solo se usa para construir el firmador por defecto cuando no se pasa `signer` explícito. */
    clock?: Clock;
    /** `false` para saltar `assertValid()` (zod + BusinessValidator) antes de firmar. Por defecto `true`. */
    validate?: boolean;
}
/**
 * Comprobante ya listo para despachar: el par `claveAcceso`/`signedXml` que
 * produce {@link SriClient.prepare}. Es la única evidencia recuperable de un
 * comprobante — persístalo antes de enviarlo.
 */
interface PreparedComprobante {
    /** Clave de acceso de 49 dígitos embebida en el XML firmado. */
    claveAcceso: string;
    /** XML del comprobante ya serializado y firmado (XAdES-BES). */
    signedXml: string;
}
/**
 * Entrada de alto nivel del paquete para emisión individual. Orquesta
 * serializar → firmar → enviar (recepción) → autorizar, análogo a
 * `Teran\Sri\SriClient` (PHP) pero soportando los 6 tipos de comprobante vía
 * {@link serializerFor} (el PHP original solo soporta `Factura`; el resto
 * queda "fase posterior" según su propio comentario — aquí ya está
 * completo).
 */
declare class SriClient {
    private readonly ambiente;
    private readonly certificate;
    private readonly transport;
    private readonly signer;
    private readonly validateDoc;
    constructor(options: SriClientOptions);
    /**
     * Valida, calcula (o verifica) la clave de acceso, serializa y firma `doc`
     * — todo lo que hace {@link emit} **antes** de tocar la red — y devuelve el
     * par `{ claveAcceso, signedXml }`.
     *
     * Es la vía soportada para obtener un comprobante firmado sin emitirlo:
     * alimentar un {@link BatchEmitter} (`batch.add(claveAcceso, signedXml)`),
     * encolarlo en un worker, archivarlo, o despacharlo con un transporte
     * propio. Reimplementarlo por fuera no es viable: la generación de la clave
     * (código numérico aleatorio, fecha por tipo de comprobante — `GuiaRemision`
     * usa `fechaIniTransporte`, no `fechaEmision`) es privada por diseño.
     *
     * **Persista el resultado antes de enviarlo.** Una vez que el XML sale a la
     * red, la `claveAcceso` es el único identificador con el que se puede
     * resolver el comprobante ante el SRI (`authorize()`).
     *
     * @param doc Comprobante a preparar (unión discriminada por `tipo`).
     * @param claveAcceso Clave de 49 dígitos ya calculada; si se omite, se
     * genera. Si se provee, se verifica (formato, dígito verificador y
     * coherencia con los campos del documento) — ver {@link emit}.
     * @throws ValidationError si `doc` no pasa `assertValid()` (salvo
     * `validate: false`), si el ambiente no coincide, o si la `claveAcceso`
     * provista es inválida o contradice al documento.
     */
    prepare(doc: Comprobante, claveAcceso?: string): PreparedComprobante;
    /**
     * Emite `doc` al SRI: valida (salvo `validate: false`), calcula o reusa
     * `claveAcceso`, serializa, firma y ejecuta recepción + autorización.
     *
     * - Si la recepción no devuelve `estado === 'RECIBIDA'` (p.ej. `DEVUELTA`),
     *   el resultado es `RECHAZADO`/`RECEPCION` y **no** se llama a
     *   `autorizar` — el comprobante nunca entró al sistema del SRI.
     * - Si la recepción fue exitosa, se llama a `autorizar` y su `estado` se
     *   normaliza (case-insensitive, igual que `strtoupper()` en PHP):
     *   `AUTORIZADO` → `AUTORIZADO`; `EN PROCESO`/`EN PROCESAMIENTO` →
     *   `EN_PROCESO`; cualquier otro valor → `RECHAZADO`/`AUTORIZACION`.
     * - `CommunicationError` (fallo de red/timeout/SOAP fault) de `transport`
     *   se propaga — nunca se convierte en un `EmissionResult`, ya que a
     *   diferencia de un rechazo del SRI (una respuesta válida con un estado
     *   desfavorable), una falla de comunicación no permite saber si el
     *   comprobante llegó a procesarse. El error se re-lanza **enriquecido**
     *   con `claveAcceso` y `signedXml` (ver {@link CommunicationError}).
     *
     * ⚠️ **Ante un `CommunicationError`, el caller DEBE persistir
     * `err.claveAcceso` y `err.signedXml` antes de reintentar nada**, y
     * resolver el estado real del comprobante con
     * `authorize(err.claveAcceso)` — **nunca** con un `emit()` nuevo: cada
     * llamada genera un código numérico aleatorio distinto, así que un reintento
     * produciría otra clave de acceso, dejaría el comprobante original
     * irresoluble ante el SRI (que puede haberlo aceptado) y duplicaría el
     * secuencial. Si necesita el par clave/XML por adelantado en vez de
     * rescatarlo del error, use {@link prepare}.
     *
     * @param doc Comprobante a emitir (unión discriminada por `tipo`).
     * @param claveAcceso Clave de 49 dígitos ya calculada; si se omite, se
     * genera con {@link generarClaveAcceso} (fecha del propio `doc`, RUC/serie/
     * secuencial de `infoTributaria`, ambiente del cliente, código numérico
     * aleatorio de 8 dígitos). Si se provee, se verifica: 49 dígitos, dígito
     * verificador Módulo 11 correcto, y coherencia campo a campo con el
     * documento (fecha, tipo de comprobante, RUC, ambiente, serie y
     * secuencial) — una clave arbitraria quedaría firmada dentro del XML.
     * @throws ValidationError si `doc` no pasa `assertValid()` (salvo
     * `validate: false`), si `doc.infoTributaria.ambiente` no coincide con
     * el ambiente del cliente — enviar a un ambiente distinto del declarado
     * en el propio XML produciría un comprobante inconsistente que el SRI
     * rechazaría de todos modos, así que se falla rápido, antes de firmar —, o
     * si la `claveAcceso` provista es inválida o contradice al documento.
     */
    emit(doc: Comprobante, claveAcceso?: string): Promise<EmissionResult>;
    /** Passthrough directo a `transport.autorizar()` para consultar una clave de acceso ya emitida (p.ej. re-consultar un `EN_PROCESO`). */
    authorize(claveAcceso: string): Promise<AuthorizationOutcome>;
    /** Firma `xml` con el certificado del cliente, sin pasar por `enviar`/`autorizar` — útil para firmar y despachar por fuera de `emit()`. */
    sign(xml: string): string;
    /**
     * `doc.infoTributaria.ambiente` debe ser el mismo que `this.ambiente`: el
     * primero queda embebido en el XML (y en la clave de acceso, si se
     * genera), el segundo decide a qué endpoint (`SRI_URLS`) se envía —
     * dejarlos divergir enviaría un comprobante marcado como "Producción" al
     * endpoint de pruebas (o viceversa), algo que el SRI rechazaría de todos
     * modos; se prefiere fallar aquí, antes de firmar, con un error claro.
     */
    private assertAmbienteConsistente;
    /**
     * Verifica una `claveAcceso` provista por el caller antes de que quede
     * embebida (y firmada) dentro del XML. Sin esto, `emit(doc, 'BASURA')`
     * produciría un comprobante firmado con una clave que el SRI rechaza — o,
     * peor, una clave sintácticamente válida pero de otro documento.
     *
     * Se comprueban, en orden: formato (49 dígitos exactos), dígito verificador
     * Módulo 11 sobre los primeros 48, y coherencia de los campos embebidos
     * contra el documento según el layout de la ficha técnica del SRI:
     *
     * ```
     * [0,8)  fecha ddmmyyyy   [8,10) codDoc      [10,23) RUC     [23,24) ambiente
     * [24,30) estab+ptoEmi    [30,39) secuencial [39,47) código numérico
     * [47,48) tipoEmisión     [48,49) dígito verificador
     * ```
     *
     * El código numérico (aleatorio por definición) y el tipo de emisión no se
     * cotejan: el primero no tiene contraparte en el documento y el segundo ya
     * queda cubierto por el dígito verificador si el caller derivó la clave del
     * mismo `infoTributaria`.
     */
    private assertClaveAccesoCoherente;
    /** Genera la clave de acceso de `doc` cuando el caller no provee una ya calculada. */
    private generarClaveAccesoPara;
}

export { Ambiente, type AuthorizationOutcome, BatchEmitter, type BatchEmitterOptions, type BatchItem, BatchProcessor, type BatchProcessorOptions, type Certificate, CertificateError, type CertificateInfo, type Clock, CommunicationError, type CommunicationErrorContext, Comprobante, type ComprobanteRepository, type ComprobanteState, type CredentialSelection, type DigestAlgorithm, type EmissionResult, type EmissionStatus, Factura, FacturaXmlSerializer, FetchSoapTransport, type FetchSoapTransportOptions, FormaPago, GuiaRemision, GuiaRemisionXmlSerializer, InMemoryComprobanteRepository, InfoTributaria, LiquidacionCompra, LiquidacionCompraXmlSerializer, type Message, NotaCredito, NotaCreditoXmlSerializer, NotaDebito, NotaDebitoXmlSerializer, NullRateLimiter, type ParsedCertificateFields, type PreparedComprobante, type RateLimiter, type ReceptionOutcome, RegimenRimpe, type RejectionStage, Retencion, RetencionXmlSerializer, RetryPolicy, type RetryPolicyOptions, SRI_RUC_URL, SRI_URLS, SignatureError, type SignatureOptions, SriClient, type SriClientOptions, type SriEndpoints, SriError, type SriTransport, SystemClock, TipoComprobante, TipoEmision, type ValidarRucLocalOptions, type ValidarRucOnlineOptions, ValidationError, XadesSigner, XmlBuilder, XmlElement, type XmlSerializer, assertClaveAccesoWireSegura, assertValid, buildAuthorizationEnvelope, buildReceptionEnvelope, calcularDigitoVerificador, camposAdicionalesField, certificateInfo, checkCamposLocales, contribuyenteEspecialField, createBatchItem, destinatarioDetalleSchema, destinatarioSchema, detalleSchema, dirEstablecimientoField, docSustentoSchema, esRucLocalValido, escapeXml, estabPtoEmiField, facturaSchema, fechaField, formaPagoField, formatMonto, fromCents, generarClaveAcceso, guiaRemisionSchema, impuestoDocSustentoRowSchema, impuestoSchema, incrementAttempts, infoTributariaSchema, isMonto, isTerminal, liquidacionCompraSchema, loadCertificate, markAuthorized, markFailed, markInProcess, markRejected, markSent, montoField, motivoSchema, nonEmptyString, notaCreditoSchema, notaDebitoSchema, obligadoContabilidadField, pagoSchema, pagoSustentoRowSchema, parseAuthorization, parseCertificateFields, parseReception, razonSocialField, retencionRowSchema, retencionSchema, rucField, schemaFor, secuencialField, selectCredential, serializeXmlDocument, serializerFor, toCents, totalImpuestoSchema, validarRucChecksum, validarRucLocal, validarRucOnline, validateBusiness, writeInfoAdicional, writeInfoTributaria, zodIssuesToErrors };
