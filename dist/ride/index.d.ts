import { A as Ambiente, a as TipoEmision, R as RegimenRimpe, C as Comprobante, l as TotalImpuesto, F as Factura, L as LiquidacionCompra, N as NotaCredito, b as NotaDebito, G as GuiaRemision, c as Retencion } from '../index-D3nr7ONR.js';

/**
 * Tipos públicos e internos del submódulo RIDE (port funcional, no de PHP:
 * es una capa nueva). `RideOptions` es la API pública del submódulo; el
 * resto son los contratos de datos que
 * consumen los helpers de `blocks.ts` — pensados para que cada
 * `*.ride.ts` (factura en Task 1; los otros 5 en Task 2) solo tenga que
 * mapear su propio shape de documento a estas formas normalizadas, sin que
 * `blocks.ts` necesite conocer los 6 tipos de `Comprobante`.
 */
/** Tamaño de página soportado por el RIDE. */
type TamanoPaginaRide = 'A4' | 'LETTER';
/**
 * Datos de autorización del SRI para el comprobante. Si {@link RideOptions.autorizacion}
 * no se pasa, el RIDE se genera igual (Task 1, test "sin autorización") pero
 * marcado como no autorizado — el SRI autoriza de forma asíncrona y el RIDE
 * suele imprimirse antes de recibir la respuesta.
 */
interface AutorizacionRide {
    /** Número de autorización (normalmente igual a la clave de acceso de 49 dígitos). */
    numero: string;
    /** Fecha y hora de autorización, en el formato que entregue el SRI. */
    fecha: string;
}
/** Opciones de formato del RIDE. */
interface OpcionesFormatoRide {
    /** Tamaño de página. @default 'A4' */
    tamano?: TamanoPaginaRide;
    /**
     * Si se dibuja el **código de barras Code 128** de la clave de acceso bajo
     * el rótulo `CLAVE DE ACCESO`. Es lo que imprime la maqueta del Anexo 2 de
     * la Ficha Técnica; la nota al pie de la página 56 aclara que el código de
     * barras es opcional, de ahí la opción. @default true
     */
    codigoBarras?: boolean;
    /**
     * Si se dibuja el código QR de la clave de acceso.
     *
     * El QR **no** está en el Anexo 2 (era un añadido propio de v0.2.0); desde
     * 0.3.0 el predeterminado es el código de barras y esta opción queda como
     * alternativa para quien prefiera el QR — de ahí que su valor por defecto
     * pasara de `true` a `false`. Activarla requiere tener instalada la
     * dependencia opcional `qrcode`; con el predeterminado, `pdfkit` basta.
     * @default false
     */
    incluirQr?: boolean;
}
/**
 * Opciones de {@link generarRide}/`generarRide<Tipo>`. Genérica sobre `T`
 * para que cada renderer por tipo (`factura.ride.ts`, etc.) reciba
 * `RideOptions<Factura>` ya angostado por el despachador (`index.ts`) en vez
 * de tener que volver a discriminar la unión `Comprobante`.
 */
interface RideOptions<T extends Comprobante = Comprobante> {
    documento: T;
    /** Clave de acceso (49 dígitos): se imprime en la cabecera y se codifica en el QR. */
    claveAcceso: string;
    autorizacion?: AutorizacionRide;
    /** Logo del emisor (PNG/JPG), opcional. */
    logo?: Uint8Array;
    opciones?: OpcionesFormatoRide;
}
/**
 * Datos ya normalizados del bloque "emisor" (columna izquierda de la
 * cabecera, ver "Bloques obligatorios del RIDE" en el plan).
 *
 * `dirEstablecimiento` y `contribuyenteEspecial` NO viven en el
 * `InfoTributaria` compartido (`documents/shared.ts`) sino en cada tipo de
 * comprobante por separado (y `Factura` ni siquiera los modela) — este
 * contrato es el punto donde cada `*.ride.ts` homogeneiza esa diferencia
 * antes de llamar a `drawEmisor`.
 */
interface EmisorRide {
    logo?: Uint8Array;
    razonSocial: string;
    nombreComercial?: string;
    dirMatriz: string;
    dirEstablecimiento?: string;
    obligadoContabilidad?: 'SI' | 'NO';
    contribuyenteEspecial?: string;
    agenteRetencion?: string;
    /** Si viene, el RIDE imprime la leyenda literal del régimen (`LEYENDA_RIMPE`). */
    regimenRimpe?: RegimenRimpe;
    /**
     * Régimen Impositivo Simplificado (RISE, anterior a RIMPE). Modelado como
     * `string` suelto (no boolean) porque así lo trae cada documento
     * (`NotaCredito.rise`/`NotaDebito.rise`/`GuiaRemision.rise`) — auditoría
     * "campos fiscales omitidos": era el único campo de cabecera del emisor
     * que ningún `*.ride.ts` leía ni `drawEmisor` sabía imprimir.
     */
    rise?: string;
}
/** Datos del bloque "comprobante" (columna derecha de la cabecera): RUC, número, autorización, QR. */
interface ComprobanteRide {
    ruc: string;
    /** Nombre legible del documento: "FACTURA", "NOTA DE CRÉDITO", etc. Ver `nombreDocumento()` en `blocks.ts`. */
    nombreDocumento: string;
    /** `estab-ptoEmi-secuencial`. */
    numero: string;
    ambiente: Ambiente;
    tipoEmision: TipoEmision;
    claveAcceso: string;
    autorizacion?: AutorizacionRide;
}
/**
 * Datos del bloque "comprador". Reutilizable por los otros 5 comprobantes
 * (Task 2) cambiando la etiqueta: proveedor (liquidación de compra), sujeto
 * retenido (retención), destinatario (guía de remisión) — de ahí
 * `etiquetaSujeto`, que por defecto es "Razón Social / Nombres".
 */
interface CompradorRide {
    /** Etiqueta del bloque completo: "Comprador", "Proveedor", "Sujeto Retenido", etc. @default 'Comprador' */
    etiquetaSujeto?: string;
    razonSocial: string;
    identificacion: string;
    /**
     * Código del catálogo SRI "Tipos de Identificación" (`04` RUC, `05`
     * Cédula, `06` Pasaporte, `07` Consumidor Final, `08` Identificación del
     * Exterior) — `tipoIdentificacionComprador`/`Proveedor`/`SujetoRetenido`
     * en cada documento. Opcional porque no todos los `*.ride.ts` lo tienen
     * disponible para el sujeto que dibujan con este bloque (p.ej. el
     * `Destinatario` de guía de remisión no modela un tipo). Si viene,
     * `drawComprador` lo imprime decodificado junto al número de
     * identificación (auditoría "campos fiscales omitidos": antes se perdía
     * del todo, ningún bloque lo leía).
     */
    tipoIdentificacion?: string;
    fechaEmision: string;
    direccion?: string;
    guiaRemision?: string;
}
/**
 * Rectángulo de dibujo que cada `draw*` de `blocks.ts` recibe: dónde empezar
 * (`x`, `y`) y cuánto ancho tiene disponible. Cada helper devuelve el `y`
 * final (borde inferior de lo que dibujó) para que el caller arme el
 * siguiente `AreaRide` encadenando bloques verticalmente — es el único
 * "motor de layout" de este submódulo, deliberadamente simple: no hay
 * flexbox ni cálculo de altura disponible restante, cada `*.ride.ts` decide
 * el orden y el ancho de columnas de su propio cuerpo.
 */
interface AreaRide {
    x: number;
    y: number;
    width: number;
}
/**
 * Etiquetas literales de la tabla de totales del Anexo 2. Vive aquí y no en
 * `blocks.ts` por la misma razón que el resto de contratos de datos: `blocks.ts`
 * toma `PDFKit.PDFDocument` en sus firmas y `@types/pdfkit` es solo
 * devDependency, así que nada de lo que el barrel público reexporta puede
 * referenciarlo (ver la nota de `index.ts` sobre `TS2503`).
 */
interface EtiquetasTotales {
    /** Subtotal de la tarifa 0%. `SUBTOTAL IVA 0%` en factura; `SUBTOTAL 0%` en liquidación de compra. */
    subtotalCero: string;
    /** `SUBTOTAL NO OBJETO IVA` / `SUBTOTAL NO OBJETO DE IVA`. */
    subtotalNoObjeto: string;
    /** `SUBTOTAL EXENTO IVA` / `SUBTOTAL EXENTO DE IVA`. */
    subtotalExento: string;
    /** `SUBTOTAL SIN IMPUESTOS`. */
    subtotalSinImpuestos: string;
    /** `DESCUENTO` / `TOTAL DESCUENTO`. */
    descuento: string;
    /** `VALOR TOTAL`. */
    valorTotal: string;
}
/**
 * Datos del bloque "totales". `impuestos` es deliberadamente
 * {@link TotalImpuesto}`[]` (no `Impuesto[]`, que sí trae `tarifa`) porque es
 * el shape que comparten `Factura.totalConImpuestos`,
 * `LiquidacionCompra.totalConImpuestos`, `NotaCredito.totalConImpuestos` y
 * `NotaDebito.impuestos` — `drawTotales` deriva la tarifa a partir de
 * `codigoPorcentaje` (ver `LABEL_CODIGO_PORCENTAJE` en `blocks.ts`), no la
 * necesita como campo aparte.
 *
 * `totalDescuento` es opcional (fix round 1, hallazgo confirmado del
 * reviewer): `NotaCredito` y `NotaDebito` no lo modelan en absoluto (la
 * primera tiene `valorModificacion`, la segunda `valorTotal`, sin
 * `totalDescuento`) — de haber sido obligatorio, Task 2 habría tenido que
 * inventar un `'0.00'` sin respaldo en el documento real. `drawTotales` omite
 * la línea "Total descuento" cuando está ausente.
 */
interface TotalesRide {
    impuestos: TotalImpuesto[];
    totalSinImpuestos: string;
    totalDescuento?: string;
    propina?: string;
    importeTotal: string;
    /**
     * Sobreescribe las etiquetas literales de la tabla de totales. La factura
     * (Anexo 2, página 56) y la liquidación de compra (página 61) redactan las
     * mismas filas de forma distinta —`SUBTOTAL IVA 0%` vs `SUBTOTAL 0%`,
     * `DESCUENTO` vs `TOTAL DESCUENTO`—, así que cada `*.ride.ts` pone las de SU
     * maqueta en vez de que `blocks.ts` discrimine por tipo de comprobante. Sin
     * esto se usan las de la factura.
     */
    etiquetas?: Partial<EtiquetasTotales>;
    /**
     * Emite la fila `PROPINA` SIEMPRE (en `0.00` si el documento no la trae):
     * es una fila fija de la maqueta de la factura. Los comprobantes que no la
     * contemplan (notas, liquidación de compra) no la activan.
     */
    conPropina?: boolean;
    /**
     * Emite el recuadro `VALOR TOTAL SIN SUBSIDIO` / `AHORRO POR SUBSIDIO`
     * bajo la tabla de totales — solo la factura lo lleva.
     */
    conSubsidio?: boolean;
    /**
     * Moneda del comprobante (`Factura.moneda`/`LiquidacionCompra.moneda`/
     * `NotaCredito.moneda`; `NotaDebito` no la modela). Opcional porque
     * ninguno de los 3 documentos que la traen la declara obligatoria.
     * `drawTotales` la imprime junto al resto de totales (auditoría "campos
     * fiscales omitidos": antes se leía en ningún `*.ride.ts`).
     */
    moneda?: string;
}

/**
 * RIDE de Factura (codDoc `01`), conforme a la maqueta de la **página 56 del
 * Anexo 2** de la Ficha Técnica del SRI. Arma los tipos normalizados de
 * `types.ts` a partir del `Factura` de `documents/factura.ts` y compone los
 * cuatro bloques del Anexo 2: cabecera de dos columnas, banda del comprador,
 * tabla de detalles y pie de dos columnas.
 *
 * Es el patrón que Task 2 replica para los otros 5 tipos: mapear el documento a
 * `EmisorRide`/`ComprobanteRide`/`CompradorRide`/`TotalesRide`, y encadenar
 * `drawCabecera` → banda propia → `drawTablaDetalles` → `drawPie`, midiendo
 * cada bloque con su `medir*` antes de dibujarlo.
 */
declare function generarRideFactura(opciones: RideOptions<Factura>): Promise<Uint8Array>;

/**
 * RIDE de Liquidación de Compra (codDoc `03`), conforme a la maqueta de la
 * **página 61 del Anexo 2** de la Ficha Técnica del SRI: cabecera de dos
 * columnas, banda del proveedor con las etiquetas literales de esa página
 * (`Nombres y Apellidos:` / `Identificación:` / `Fecha Emision:` /
 * `Dirección:`, una por fila y sin título), detalle con UNA columna `Detalle
 * Adicional` y pie de dos columnas.
 *
 * A diferencia de la factura, su tabla de totales no lleva `PROPINA` ni el
 * recuadro de subsidios, y cuatro de sus filas usan otra redacción (ver
 * {@link ETIQUETAS_TOTALES}). `LiquidacionCompra` tampoco modela
 * `guiaRemision`.
 */
declare function generarRideLiquidacionCompra(opciones: RideOptions<LiquidacionCompra>): Promise<Uint8Array>;

/**
 * RIDE de Nota de Crédito (codDoc `04`), conforme a la maqueta de la **página
 * 57 del Anexo 2**: cabecera de dos columnas, banda del comprador, banda
 * `Comprobante que se modifica` / `Fecha Emisión (Comprobante a modificar)` /
 * `Razón de Modificación:`, detalle sin columnas de subsidio y pie de dos
 * columnas.
 *
 * `NotaCredito` no tiene `pagos` (el XSD 1.1.0 no lo contempla), así que la
 * columna izquierda del pie solo lleva la caja de información adicional — es
 * exactamente lo que dibuja la maqueta. `valorModificacion` se imprime como el
 * `VALOR TOTAL` de la tabla de totales: `NotaCredito` no modela un
 * `importeTotal` separado. La tabla no lleva `PROPINA` ni el recuadro de
 * subsidios (los añade solo la factura), y como el tipo tampoco modela
 * `totalDescuento`, la fila `DESCUENTO` se omite — igual que en la maqueta.
 */
declare function generarRideNotaCredito(opciones: RideOptions<NotaCredito>): Promise<Uint8Array>;

/**
 * RIDE de Nota de Débito (codDoc `05`), conforme a la maqueta de la **página
 * 58 del Anexo 2**: cabecera de dos columnas, banda del comprador, banda
 * `Comprobante que se modifica` / `Fecha Emisión (Comprobante a modificar)`,
 * la tabla de motivos con sus dos encabezados literales y pie de dos columnas.
 *
 * No hay tabla de detalle (a diferencia de factura/liquidación/nota de
 * crédito): la maqueta pone en su lugar la tabla de motivos.
 * `TotalesRide.totalDescuento` queda sin asignar porque `NotaDebito` no lo
 * modela —así que la fila `DESCUENTO` no se emite, igual que en la maqueta— y
 * `moneda` tampoco (este es el único de los seis comprobantes que no la
 * modela).
 */
declare function generarRideNotaDebito(opciones: RideOptions<NotaDebito>): Promise<Uint8Array>;

/**
 * RIDE de Guía de Remisión (codDoc `06`), conforme a la maqueta de la
 * **página 60 del Anexo 2**: cabecera de dos columnas, banda del
 * transportista (`Identificación (Transportista)`, `Razón Social / Nombres y
 * Apellidos:`, `Placa:`, `Punto de Partida:`, `Fecha inicio Transporte` /
 * `Fecha fin Transporte`), y por cada destinatario su propia banda + su tabla
 * `Cantidad | Descripcion | Código Principal | Código Auxiliar`.
 *
 * **Sin bloque de totales**: es el único de los 6 comprobantes sin montos (no
 * hay `detalles`, `totalConImpuestos` ni `pagos` a nivel documento), así que
 * el pie se dibuja solo con `infoAdicional`.
 */
declare function generarRideGuiaRemision(opciones: RideOptions<GuiaRemision>): Promise<Uint8Array>;

/**
 * RIDE de Comprobante de Retención (codDoc `07`), conforme a la maqueta de la
 * **página 59 del Anexo 2**: cabecera de dos columnas, banda del sujeto
 * retenido, la tabla de 8 columnas con los encabezados literales
 * ({@link RETENCION_COLUMN_SPECS}) y la caja `Información Adicional` abajo a
 * la izquierda.
 *
 * **Sin bloque de totales**: la maqueta de la retención no lo lleva (el valor
 * retenido de cada fila es la única cifra del comprobante), así que el pie se
 * dibuja solo con `infoAdicional`.
 */
declare function generarRideRetencion(opciones: RideOptions<Retencion>): Promise<Uint8Array>;

/**
 * Genera el PNG del código QR que codifica `texto` (la clave de acceso de 49
 * dígitos: es lo único que el portal del SRI necesita para verificar el
 * comprobante). Devuelve el buffer PNG listo para `doc.image()` de pdfkit.
 *
 * `width: 300` (más grande que el tamaño final en el PDF) porque
 * `doc.image()` reescala hacia abajo con buena calidad; escalar hacia
 * arriba un QR pequeño sí degrada la nitidez de los módulos.
 */
declare function generarQr(texto: string, width?: number): Promise<Buffer>;

/**
 * Genera el RIDE (PDF) del comprobante, despachando por `documento.tipo`.
 * Cubre los 6 tipos de comprobante del catálogo SRI (Task 1: factura;
 * Task 2: liquidación de compra, nota de crédito, nota de débito, guía de
 * remisión, retención).
 *
 * El `default` es una salvaguarda inalcanzable en tiempo de compilación
 * (`documento.tipo` es una unión discriminada exhaustiva sobre los 6 casos
 * de arriba): protege en runtime contra un `Comprobante` construido sin
 * pasar por el sistema de tipos (p.ej. `JSON.parse` de un payload externo
 * con un `tipo` inválido).
 */
declare function generarRide(opciones: RideOptions<Comprobante>): Promise<Uint8Array>;

export { type AreaRide, type AutorizacionRide, type CompradorRide, type ComprobanteRide, type EmisorRide, type EtiquetasTotales, type OpcionesFormatoRide, type RideOptions, type TamanoPaginaRide, type TotalesRide, generarQr, generarRide, generarRideFactura, generarRideGuiaRemision, generarRideLiquidacionCompra, generarRideNotaCredito, generarRideNotaDebito, generarRideRetencion };
