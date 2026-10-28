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
export enum Ambiente {
  Pruebas = '1',
  Produccion = '2',
}

/** Tipo de comprobante electrónico (campo `codDoc` en la clave de acceso). */
export enum TipoComprobante {
  Factura = '01',
  LiquidacionCompra = '03',
  NotaCredito = '04',
  NotaDebito = '05',
  GuiaRemision = '06',
  Retencion = '07',
}

/**
 * Tipo de emisión. Solo existe `Normal` — el tipo `Indisponibilidad` (offline
 * contingencia) fue retirado del catálogo SRI y no se soporta.
 */
export enum TipoEmision {
  Normal = '1',
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
export enum RegimenRimpe {
  /** RIMPE general (emprendedor). */
  General = 'GENERAL',
  /** Negocio popular. */
  NegocioPopular = 'NEGOCIO_POPULAR',
}

/**
 * Leyenda literal que exige el SRI en `<contribuyenteRimpe>` y en el RIDE,
 * con la tilde y los espacios exactos: 27 caracteres para
 * {@link RegimenRimpe.General} y 45 para {@link RegimenRimpe.NegocioPopular}.
 *
 * No reformatear: el SRI valida el contenido del elemento, no solo la
 * etiqueta.
 */
export const LEYENDA_RIMPE: Record<RegimenRimpe, string> = {
  [RegimenRimpe.General]: 'CONTRIBUYENTE RÉGIMEN RIMPE',
  [RegimenRimpe.NegocioPopular]: 'CONTRIBUYENTE NEGOCIO POPULAR - RÉGIMEN RIMPE',
};
