// src/catalogs/index.ts
var Ambiente = /* @__PURE__ */ ((Ambiente2) => {
  Ambiente2["Pruebas"] = "1";
  Ambiente2["Produccion"] = "2";
  return Ambiente2;
})(Ambiente || {});
var TipoComprobante = /* @__PURE__ */ ((TipoComprobante2) => {
  TipoComprobante2["Factura"] = "01";
  TipoComprobante2["LiquidacionCompra"] = "03";
  TipoComprobante2["NotaCredito"] = "04";
  TipoComprobante2["NotaDebito"] = "05";
  TipoComprobante2["GuiaRemision"] = "06";
  TipoComprobante2["Retencion"] = "07";
  return TipoComprobante2;
})(TipoComprobante || {});
var TipoEmision = /* @__PURE__ */ ((TipoEmision2) => {
  TipoEmision2["Normal"] = "1";
  return TipoEmision2;
})(TipoEmision || {});
var RegimenRimpe = /* @__PURE__ */ ((RegimenRimpe2) => {
  RegimenRimpe2["General"] = "GENERAL";
  RegimenRimpe2["NegocioPopular"] = "NEGOCIO_POPULAR";
  return RegimenRimpe2;
})(RegimenRimpe || {});
var LEYENDA_RIMPE = {
  ["GENERAL" /* General */]: "CONTRIBUYENTE R\xC9GIMEN RIMPE",
  ["NEGOCIO_POPULAR" /* NegocioPopular */]: "CONTRIBUYENTE NEGOCIO POPULAR - R\xC9GIMEN RIMPE"
};

// src/catalogs/forma-pago.ts
var FormaPago = {
  /** Sin utilización del sistema financiero (Efectivo) */
  EFECTIVO: "01",
  /** Compensación de deudas */
  COMPENSACION_DEUDAS: "15",
  /** Tarjeta de débito */
  TARJETA_DEBITO: "16",
  /** Dinero electrónico */
  DINERO_ELECTRONICO: "17",
  /** Tarjeta prepago */
  TARJETA_PREPAGO: "18",
  /** Tarjeta de crédito */
  TARJETA_CREDITO: "19",
  /** Otros con utilización del sistema financiero */
  OTROS_SISTEMA_FINANCIERO: "20",
  /** Endoso de títulos */
  ENDOSO_TITULOS: "21"
};

export {
  Ambiente,
  TipoComprobante,
  TipoEmision,
  RegimenRimpe,
  LEYENDA_RIMPE,
  FormaPago
};
//# sourceMappingURL=chunk-W6LWDKCP.js.map