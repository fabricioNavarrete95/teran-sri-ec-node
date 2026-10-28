/**
 * Catálogos SRI 2.0 (port de `src/Catalogs2/*.php`). Los valores del enum
 * son exactamente los códigos que el SRI espera en el XML — no renombrar.
 *
 * Excepción: {@link RegimenRimpe} no es un catálogo `Catalogs2/*.php`, porque
 * el SRI no le asigna un código — solo publica el texto que debe llevar
 * `infoTributaria/contribuyenteRimpe`. Se declara aquí, junto al resto de
 * catálogos, para que todo valor tributario del emisor se busque en el mismo
 * sitio.
 */
/** Ambiente de emisión: 1 = Pruebas, 2 = Producción. */
declare enum Ambiente {
    Pruebas = "1",
    Produccion = "2"
}
/** Tipo de comprobante electrónico (campo `codDoc` en la clave de acceso). */
declare enum TipoComprobante {
    Factura = "01",
    LiquidacionCompra = "03",
    NotaCredito = "04",
    NotaDebito = "05",
    GuiaRemision = "06",
    Retencion = "07"
}
/**
 * Tipo de emisión. Solo existe `Normal` — el tipo `Indisponibilidad` (offline
 * contingencia) fue retirado del catálogo SRI y no se soporta.
 */
declare enum TipoEmision {
    Normal = "1"
}
/**
 * Régimen RIMPE del emisor (Régimen para Emprendedores y Negocios Populares).
 *
 * La ficha técnica ("Consideraciones generales para el contribuyente RIMPE")
 * no publica un código de régimen para el XML, sino el TEXTO literal que debe
 * llevar `infoTributaria/contribuyenteRimpe`. Por eso aquí se modela lo que el
 * emisor declara — {@link RegimenRimpe} — y {@link LEYENDA_RIMPE} guarda ese
 * texto en un único lugar: el consumidor nunca escribe la leyenda a mano.
 */
declare enum RegimenRimpe {
    /** RIMPE general (emprendedor). */
    General = "GENERAL",
    /** Negocio popular. */
    NegocioPopular = "NEGOCIO_POPULAR"
}
/**
 * Leyenda literal que exige el SRI en `<contribuyenteRimpe>` y en el RIDE,
 * con la tilde y los espacios exactos: 27 caracteres para
 * {@link RegimenRimpe.General} y 45 para {@link RegimenRimpe.NegocioPopular}.
 *
 * No reformatear: el SRI valida el contenido del elemento, no solo la
 * etiqueta.
 */
declare const LEYENDA_RIMPE: Record<RegimenRimpe, string>;

/**
 * Tipos compartidos por los 6 comprobantes electrónicos (port de
 * `src/Documents/InfoTributaria.php`, `Impuesto.php`, `Pago.php` y
 * `Detalle.php`, más los campos opcionales que los generadores 1.x
 * (`src/Generators/*.php`) leen de más).
 *
 * Convención transversal: todo monto/monto-como-string se modela como
 * `string` (nunca `number`), tal como lo escribe cada serializador PHP
 * (`Money::format()`), para no perder precisión decimal ni reintroducir
 * errores de punto flotante en el cliente.
 */
/**
 * Nodo `infoTributaria`, común a los 6 comprobantes (port de
 * `src/Documents/InfoTributaria.php`).
 *
 * `tipoEmision` es opcional porque el value object PHP lo defaultea a
 * `TipoEmision::Normal` en el constructor; `nombreComercial`, `agenteRetencion`
 * y `regimenRimpe` son opcionales porque `XmlGenerator::createInfoTributaria()`
 * solo los emite si están presentes (`$value !== null`).
 *
 * `regimenRimpe` sustituye al texto libre que el PHP 1.x recibía en
 * `contribuyenteRimpe`: el consumidor declara el régimen y el serializador
 * escribe la leyenda literal que exige el SRI (`LEYENDA_RIMPE`).
 */
interface InfoTributaria {
    ambiente: Ambiente;
    razonSocial: string;
    ruc: string;
    estab: string;
    ptoEmi: string;
    secuencial: string;
    dirMatriz: string;
    tipoEmision?: TipoEmision;
    nombreComercial?: string;
    /** Si viene, se emite `<contribuyenteRimpe>` con la leyenda del régimen. */
    regimenRimpe?: RegimenRimpe;
    agenteRetencion?: string;
}
/**
 * Impuesto de un `detalle` (línea de ítem). Port de
 * `src/Documents/Impuesto.php` tal como lo escribe `FacturaXmlSerializer::detalles()`
 * (y equivalentes): siempre emite `tarifa` (con `'0'` como default si viene
 * null en PHP), por eso aquí es obligatorio.
 */
interface Impuesto {
    codigo: string;
    codigoPorcentaje: string;
    tarifa: string;
    baseImponible: string;
    valor: string;
}
/**
 * Impuesto agregado a nivel de comprobante (`totalConImpuestos` /
 * `infoNotaDebito.impuestos`). A diferencia de {@link Impuesto}, los
 * serializadores v2 nunca escriben `tarifa` aquí; `descuentoAdicional` es
 * un campo legado del generador 1.x (`FacturaGenerator::createInfoFactura()`),
 * opcional porque el value object v2 `Impuesto` no lo modela.
 */
interface TotalImpuesto {
    codigo: string;
    codigoPorcentaje: string;
    baseImponible: string;
    valor: string;
    descuentoAdicional?: string;
}
/**
 * Forma de pago (port de `src/Documents/Pago.php`). `formaPago` se modela
 * como `string` (no como el tipo nominal `FormaPago` de
 * `catalogs/forma-pago.ts`) para no acoplar el shape del documento al
 * catálogo — cualquier código de 2 dígitos válido según el SRI es aceptado
 * estructuralmente aquí; la validación de catálogo es responsabilidad de
 * zod/BusinessValidator (Task 5-6).
 */
interface Pago {
    formaPago: string;
    total: string;
    plazo?: string;
    unidadTiempo?: string;
}
/**
 * Línea de detalle (port de `src/Documents/Detalle.php`).
 * `detallesAdicionales` es el port de los pares `<detAdicional nombre="" valor="">`
 * que tanto `FacturaGenerator` como `GuiaRemisionXmlSerializer` soportan.
 */
interface Detalle {
    codigoPrincipal?: string;
    codigoAuxiliar?: string;
    descripcion: string;
    cantidad: string;
    precioUnitario: string;
    descuento: string;
    precioTotalSinImpuesto: string;
    impuestos: Impuesto[];
    detallesAdicionales?: Record<string, string>;
}

/**
 * Factura (codDoc `01`). Port de `src/Documents/Factura.php` +
 * `src/Xml/FacturaXmlSerializer.php`.
 *
 * `direccionComprador`, `guiaRemision`, `propina`, `moneda` e
 * `infoAdicional` no existen en el value object v2 de PHP (que solo lanza
 * la excepción/serializa un subconjunto), pero sí son leídos por
 * `FacturaGenerator::createInfoFactura()` (1.x) — se incluyen aquí como
 * opcionales para no perder cobertura de campos que el XSD del SRI permite.
 *
 * `dirEstablecimiento`/`contribuyenteEspecial` (fix round 1, hallazgo
 * confirmado del reviewer — gap real, no del RIDE): `resources/xsd/factura_v2.1.0.xsd`
 * los declara `minOccurs="0"` en `infoFactura`, y
 * `FacturaGenerator::createInfoFactura()` (1.x) los escribe justo después de
 * `fechaEmision` cuando están presentes. `Factura` era el único de los 6
 * tipos de comprobante de este port que no los modelaba — los otros 5
 * (`LiquidacionCompra`, `NotaCredito`, `NotaDebito`, `GuiaRemision`,
 * `Retencion`) ya los traían opcionales.
 */
interface Factura {
    tipo: TipoComprobante.Factura;
    infoTributaria: InfoTributaria;
    fechaEmision: string;
    dirEstablecimiento?: string;
    contribuyenteEspecial?: string;
    tipoIdentificacionComprador: string;
    razonSocialComprador: string;
    identificacionComprador: string;
    direccionComprador?: string;
    guiaRemision?: string;
    totalSinImpuestos: string;
    totalDescuento: string;
    propina?: string;
    importeTotal: string;
    moneda?: string;
    obligadoContabilidad?: 'SI' | 'NO';
    totalConImpuestos: TotalImpuesto[];
    detalles: Detalle[];
    pagos: Pago[];
    infoAdicional?: Record<string, string>;
}

/**
 * Liquidación de Compra (codDoc `03`). Port de
 * `src/Documents/LiquidacionCompra.php` + `src/Xml/LiquidacionCompraXmlSerializer.php`.
 *
 * Mismos totales que {@link import('./factura.js').Factura} pero con
 * "proveedor" en vez de "comprador" (el emisor liquida una compra a un
 * proveedor no obligado a facturar). `dirEstablecimiento`,
 * `contribuyenteEspecial` y `direccionProveedor` son opcionales porque el
 * serializador solo los emite si no son `null`
 * (`LiquidacionCompraXmlSerializer::infoLiquidacionCompra()`).
 */
interface LiquidacionCompra {
    tipo: TipoComprobante.LiquidacionCompra;
    infoTributaria: InfoTributaria;
    fechaEmision: string;
    dirEstablecimiento?: string;
    contribuyenteEspecial?: string;
    tipoIdentificacionProveedor: string;
    razonSocialProveedor: string;
    identificacionProveedor: string;
    direccionProveedor?: string;
    totalSinImpuestos: string;
    totalDescuento: string;
    importeTotal: string;
    moneda?: string;
    obligadoContabilidad?: 'SI' | 'NO';
    totalConImpuestos: TotalImpuesto[];
    detalles: Detalle[];
    pagos: Pago[];
    infoAdicional?: Record<string, string>;
}

/**
 * Nota de Crédito (codDoc `04`). Port de `src/Documents/NotaCredito.php` +
 * `src/Xml/NotaCreditoXmlSerializer.php`.
 *
 * Añade sobre Factura: `codDocModificado`/`numDocModificado`/
 * `fechaEmisionDocSustento` (identifican el comprobante que se está
 * modificando), `valorModificacion` y `motivo`. No tiene `pagos` (el XSD de
 * notaCredito 1.1.0 no lo contempla).
 *
 * Nota: aunque `Detalle.codigoPrincipal`/`codigoAuxiliar` se reutiliza tal
 * cual, `NotaCreditoXmlSerializer::detalles()` los renombra en el XML a
 * `codigoInterno`/`codigoAdicional` — ese remapeo es responsabilidad del
 * serializador (Task 7), no de este tipo.
 */
interface NotaCredito {
    tipo: TipoComprobante.NotaCredito;
    infoTributaria: InfoTributaria;
    fechaEmision: string;
    dirEstablecimiento?: string;
    tipoIdentificacionComprador: string;
    razonSocialComprador: string;
    identificacionComprador: string;
    contribuyenteEspecial?: string;
    obligadoContabilidad?: 'SI' | 'NO';
    rise?: string;
    codDocModificado: string;
    numDocModificado: string;
    fechaEmisionDocSustento: string;
    totalSinImpuestos: string;
    valorModificacion: string;
    moneda?: string;
    totalConImpuestos: TotalImpuesto[];
    detalles: Detalle[];
    motivo: string;
    infoAdicional?: Record<string, string>;
}

/**
 * Un motivo de la Nota de Débito (port de `src/Documents/Motivo.php`). Solo
 * lo usa este comprobante, por eso vive aquí y no en `shared.ts`.
 */
interface Motivo {
    razon: string;
    valor: string;
}
/**
 * Nota de Débito (codDoc `05`). Port de `src/Documents/NotaDebito.php` +
 * `src/Xml/NotaDebitoXmlSerializer.php`.
 *
 * `impuestos` usa {@link TotalImpuesto} (no `Impuesto`) porque
 * `NotaDebitoXmlSerializer::infoNotaDebito()` nunca escribe `tarifa` para
 * este nodo — solo `codigo`, `codigoPorcentaje`, `baseImponible`, `valor`.
 * `motivos` es obligatorio y no vacío en el value object PHP.
 */
interface NotaDebito {
    tipo: TipoComprobante.NotaDebito;
    infoTributaria: InfoTributaria;
    fechaEmision: string;
    dirEstablecimiento?: string;
    tipoIdentificacionComprador: string;
    razonSocialComprador: string;
    identificacionComprador: string;
    contribuyenteEspecial?: string;
    obligadoContabilidad?: 'SI' | 'NO';
    rise?: string;
    codDocModificado: string;
    numDocModificado: string;
    fechaEmisionDocSustento: string;
    totalSinImpuestos: string;
    impuestos: TotalImpuesto[];
    valorTotal: string;
    pagos: Pago[];
    motivos: Motivo[];
    infoAdicional?: Record<string, string>;
}

/**
 * Línea de detalle de un {@link Destinatario} dentro de una Guía de Remisión.
 * Port de la estructura cruda que documenta `src/Documents/Destinatario.php`
 * (`@param array<int, array<string,string>> $detalles`) y que
 * `GuiaRemisionXmlSerializer::destinatarios()` escribe: es un shape distinto
 * del `Detalle` compartido (usa `codigoInterno`/`codigoAdicional`, no tiene
 * `precioUnitario`/`impuestos`, y su `detallesAdicionales` es el mismo
 * mecanismo de pares nombre/valor que en `Detalle`).
 */
interface DestinatarioDetalle {
    codigoInterno?: string;
    codigoAdicional?: string;
    descripcion: string;
    cantidad: string;
    detallesAdicionales?: Record<string, string>;
}
/**
 * Destinatario de una Guía de Remisión (port de
 * `src/Documents/Destinatario.php`).
 */
interface Destinatario {
    identificacionDestinatario: string;
    razonSocialDestinatario: string;
    dirDestinatario: string;
    motivoTraslado: string;
    detalles: DestinatarioDetalle[];
    docAduaneroUnico?: string;
    codEstabDestino?: string;
    ruta?: string;
    codDocSustento?: string;
    numDocSustento?: string;
    numAutDocSustento?: string;
    fechaEmisionDocSustento?: string;
}
/**
 * Guía de Remisión (codDoc `06`). Port de `src/Documents/GuiaRemision.php` +
 * `src/Xml/GuiaRemisionXmlSerializer.php`.
 *
 * `dirEstablecimiento` es obligatorio (a diferencia de otros comprobantes):
 * el constructor PHP no lo declara `nullable` y el serializador lo escribe
 * incondicionalmente.
 */
interface GuiaRemision {
    tipo: TipoComprobante.GuiaRemision;
    infoTributaria: InfoTributaria;
    dirEstablecimiento: string;
    dirPartida: string;
    razonSocialTransportista: string;
    tipoIdentificacionTransportista: string;
    rucTransportista: string;
    fechaIniTransporte: string;
    fechaFinTransporte: string;
    placa: string;
    destinatarios: Destinatario[];
    rise?: string;
    obligadoContabilidad?: 'SI' | 'NO';
    contribuyenteEspecial?: string;
    infoAdicional?: Record<string, string>;
}

/**
 * Fila de `impuestosDocSustento` dentro de un `docSustento` (port de
 * `DocSustento::$impuestosDocSustento`). El value object PHP la documenta
 * como `array<string,string>` cruda y `RetencionXmlSerializer::docsSustento()`
 * la serializa con un `foreach ($imp as $k => $v)` genérico — no hay una
 * clase `ImpuestoDocSustento` en PHP que fije el catálogo de campos. Los 7
 * campos conocidos aquí son exactamente los que usa el fixture de paridad
 * 1.x↔v2 (`tests/Unit/Xml/RetencionXmlSerializerTest.php::parityData()`,
 * replicado en `tests/Unit/Documents/RetencionTest.php`); el índice de
 * `string` permite pasar cualquier campo SRI adicional sin perder el
 * autocompletado/type-check de los campos ya conocidos por Task 6/8.
 */
interface ImpuestoDocSustentoRow {
    codImpuestoDocSustento: string;
    codigoPorcentaje: string;
    baseImponible: string;
    tarifa: string;
    /**
     * `minOccurs="0"` en el XSD del SRI: solo aplica a contribuyentes con
     * proporcionalidad de crédito tributario. Opcional para no obligar a
     * inventar un placeholder cuando no corresponde.
     */
    factorProporcionalidad?: string;
    /** `minOccurs="0"` en el XSD del SRI: solo aplica junto a `factorProporcionalidad`. */
    baseImponibleModificada?: string;
    valorImpuesto: string;
    /**
     * Cualquier campo SRI adicional. `undefined` se admite (y se omite al
     * serializar) para que los campos opcionales de arriba encajen con el
     * índice; una fila nunca emite un elemento por una clave sin valor.
     */
    [extra: string]: string | undefined;
}
/**
 * Fila de `retenciones` dentro de un `docSustento` (port de
 * `DocSustento::$retenciones`). Mismos motivos que {@link ImpuestoDocSustentoRow}
 * para el índice de extras; los 5 campos conocidos son los que usan tanto
 * `RetencionXmlSerializerTest::parityData()` como el ejemplo de `README.md`
 * (`Procesar Comprobante de Retención`).
 */
interface RetencionRow {
    codigo: string;
    codigoRetencion: string;
    baseImponible: string;
    porcentajeRetener: string;
    valorRetenido: string;
    [extra: string]: string;
}
/**
 * Fila de `pagos` dentro de un `docSustento` (port de `DocSustento::$pagos`).
 * `formaPago`/`total` son los únicos campos que aparecen en el fixture de
 * paridad — a diferencia del `Pago` compartido (nodo `pago` de
 * factura/notaDebito/liquidacionCompra), no hay evidencia en el código
 * fuente PHP de `plazo`/`unidadTiempo` para este nodo, así que no se
 * inventan; el índice de `string` cubre cualquier variante real del SRI.
 */
interface PagoSustentoRow {
    formaPago: string;
    total: string;
    [extra: string]: string;
}
/**
 * Documento sustento de un Comprobante de Retención (port de
 * `src/Documents/DocSustento.php`, v2.0.0).
 *
 * `impuestosDocSustento`, `retenciones` y `pagos` usan filas
 * parcialmente tipadas ({@link ImpuestoDocSustentoRow}, {@link RetencionRow},
 * {@link PagoSustentoRow}): campos conocidos explícitos (los que Task 6 debe
 * leer y Task 8 debe escribir) + índice `[extra: string]: string` para
 * paridad exacta con el `foreach` genérico del value object/serializador PHP
 * sin perder cobertura de campos SRI no listados aquí. Las claves deben ser
 * nombres XML válidos (NCName).
 */
interface DocSustento {
    codSustento: string;
    codDocSustento: string;
    numDocSustento: string;
    fechaEmisionDocSustento: string;
    totalSinImpuestos: string;
    importeTotal: string;
    impuestosDocSustento: ImpuestoDocSustentoRow[];
    retenciones: RetencionRow[];
    pagos: PagoSustentoRow[];
    fechaRegistroContable?: string;
    numAutDocSustento?: string;
    pagoLocExt?: string;
    tipoRegi?: string;
    paisEfecPago?: string;
    aplicConvDobTwordsri?: string;
    pagExtSujRetNorLeg?: string;
    pagoRegFis?: string;
    totalComprobantesReembolso?: string;
    totalBaseImponibleReembolso?: string;
    totalImpuestoReembolso?: string;
}
/**
 * Comprobante de Retención (codDoc `07`). Port de
 * `src/Documents/Retencion.php` + `src/Xml/RetencionXmlSerializer.php`.
 *
 * `dirEstablecimiento` es obligatorio (igual que en GuiaRemision): el
 * serializador lo escribe incondicionalmente.
 */
interface Retencion {
    tipo: TipoComprobante.Retencion;
    infoTributaria: InfoTributaria;
    fechaEmision: string;
    dirEstablecimiento: string;
    tipoIdentificacionSujetoRetenido: string;
    razonSocialSujetoRetenido: string;
    identificacionSujetoRetenido: string;
    periodoFiscal: string;
    docsSustento: DocSustento[];
    contribuyenteEspecial?: string;
    obligadoContabilidad?: 'SI' | 'NO';
    tipoSujetoRetenido?: string;
    parteRel?: string;
    infoAdicional?: Record<string, string>;
}

/**
 * Punto de entrada del módulo `documents`: re-exporta cada comprobante y su
 * unión discriminada `Comprobante` (por `tipo`), análoga a
 * `Teran\Sri\Documents\*` en el paquete PHP.
 */

/** Unión discriminada (por `tipo`) de los 6 comprobantes soportados. */
type Comprobante = Factura | LiquidacionCompra | NotaCredito | NotaDebito | GuiaRemision | Retencion;

export { Ambiente as A, type Comprobante as C, type Destinatario as D, type Factura as F, type GuiaRemision as G, type InfoTributaria as I, type LiquidacionCompra as L, type Motivo as M, type NotaCredito as N, type Pago as P, RegimenRimpe as R, TipoComprobante as T, TipoEmision as a, type NotaDebito as b, type Retencion as c, type DestinatarioDetalle as d, type Detalle as e, type DocSustento as f, type Impuesto as g, type ImpuestoDocSustentoRow as h, LEYENDA_RIMPE as i, type PagoSustentoRow as j, type RetencionRow as k, type TotalImpuesto as l };
