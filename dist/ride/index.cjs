"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/ride/index.ts
var ride_exports = {};
__export(ride_exports, {
  generarQr: () => generarQr,
  generarRide: () => generarRide,
  generarRideFactura: () => generarRideFactura,
  generarRideGuiaRemision: () => generarRideGuiaRemision,
  generarRideLiquidacionCompra: () => generarRideLiquidacionCompra,
  generarRideNotaCredito: () => generarRideNotaCredito,
  generarRideNotaDebito: () => generarRideNotaDebito,
  generarRideRetencion: () => generarRideRetencion
});
module.exports = __toCommonJS(ride_exports);

// src/catalogs/index.ts
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

// src/ride/blocks.ts
var import_sri_ec = require("sri-ec");

// src/ride/code128.ts
var PATRONES = [
  "212222",
  "222122",
  "222221",
  "121223",
  "121322",
  "131222",
  "122213",
  "122312",
  "132212",
  "221213",
  "221312",
  "231212",
  "112232",
  "122132",
  "122231",
  "113222",
  "123122",
  "123221",
  "223211",
  "221132",
  "221231",
  "213212",
  "223112",
  "312131",
  "311222",
  "321122",
  "321221",
  "312212",
  "322112",
  "322211",
  "212123",
  "212321",
  "232121",
  "111323",
  "131123",
  "131321",
  "112313",
  "132113",
  "132311",
  "211313",
  "231113",
  "231311",
  "112133",
  "112331",
  "132131",
  "113123",
  "113321",
  "133121",
  "313121",
  "211331",
  "231131",
  "213113",
  "213311",
  "213131",
  "311123",
  "311321",
  "331121",
  "312113",
  "312311",
  "332111",
  "314111",
  "221411",
  "431111",
  "111224",
  "111422",
  "121124",
  "121421",
  "141122",
  "141221",
  "112214",
  "112412",
  "122114",
  "122411",
  "142112",
  "142211",
  "241211",
  "221114",
  "413111",
  "241112",
  "134111",
  "111242",
  "121142",
  "121241",
  "114212",
  "124112",
  "124211",
  "411212",
  "421112",
  "421211",
  "212141",
  "214121",
  "412121",
  "111143",
  "111341",
  "131141",
  "114113",
  "114311",
  "411113",
  "411311",
  "113141",
  "114131",
  "311141",
  "411131",
  "211412",
  "211214",
  "211232",
  "2331112"
];
var START_B = 104;
var START_C = 105;
var STOP = 106;
var CAMBIO_A_C = 99;
var MODULOS_ZONA_MUDA = 10;
function valoresCode128(texto) {
  if (texto === "") {
    throw new RangeError("Code 128: el texto a codificar no puede estar vac\xEDo.");
  }
  if (/^\d+$/.test(texto)) {
    const impar = texto.length % 2 === 1;
    const valores2 = impar ? [START_B, texto.charCodeAt(0) - 32, CAMBIO_A_C] : [START_C];
    for (let i = impar ? 1 : 0; i < texto.length; i += 2) {
      valores2.push(Number(texto.slice(i, i + 2)));
    }
    return valores2;
  }
  const valores = [START_B];
  for (const caracter of texto) {
    const codigo = caracter.charCodeAt(0);
    if (codigo < 32 || codigo > 126) {
      throw new RangeError(`Code 128: car\xE1cter no representable en Code B: ${JSON.stringify(caracter)}.`);
    }
    valores.push(codigo - 32);
  }
  return valores;
}
function patronCode128(texto) {
  const valores = valoresCode128(texto);
  let suma = valores[0];
  for (let i = 1; i < valores.length; i++) {
    suma += i * valores[i];
  }
  valores.push(suma % 103, STOP);
  const modulos = [];
  for (const valor of valores) {
    for (const ancho of PATRONES[valor]) {
      modulos.push(Number(ancho));
    }
  }
  return modulos;
}
function dibujarCode128(doc, texto, area) {
  const modulos = patronCode128(texto);
  const anchoModulo = area.ancho / (modulos.reduce((a, b) => a + b, 0) + MODULOS_ZONA_MUDA * 2);
  doc.save().fillColor("#000000");
  let x = area.x + MODULOS_ZONA_MUDA * anchoModulo;
  for (let i = 0; i < modulos.length; i++) {
    const ancho = modulos[i] * anchoModulo;
    if (i % 2 === 0) {
      doc.rect(x, area.y, ancho, area.alto).fill();
    }
    x += ancho;
  }
  doc.restore();
}

// src/ride/blocks.ts
var FUENTE_NORMAL = "Helvetica";
var FUENTE_NEGRITA = "Helvetica-Bold";
var TAMANO_TITULO = 9;
var TAMANO_TEXTO = 8;
var TAMANO_TABLA = 7.5;
var COLOR_TEXTO = "#000000";
var COLOR_NO_AUTORIZADO = "#b00020";
var COLOR_ENCABEZADO_TABLA = "#ffffff";
var PADDING_CAJA = 6;
var PADDING_CELDA = 3;
var ESPACIO_LINEA = 2;
var CODIGO_IMPUESTO_IVA = "2";
var CODIGO_IMPUESTO_ICE = "3";
var CODIGO_IMPUESTO_IRBPNR = "5";
var LABEL_IMPUESTO = {
  [CODIGO_IMPUESTO_IRBPNR]: "IRBPNR"
};
var LABEL_CODIGO_PORCENTAJE = {
  "0": "0%",
  "2": "12%",
  "3": "14%",
  "4": "15%",
  "5": "5%",
  "6": "No objeto de IVA",
  "7": "Exento de IVA",
  "8": "IVA diferenciado",
  "10": "13%"
};
var LABEL_FORMA_PAGO = {
  [FormaPago.EFECTIVO]: "Sin utilizaci\xF3n del sistema financiero",
  [FormaPago.COMPENSACION_DEUDAS]: "Compensaci\xF3n de deudas",
  [FormaPago.TARJETA_DEBITO]: "Tarjeta de d\xE9bito",
  [FormaPago.DINERO_ELECTRONICO]: "Dinero electr\xF3nico",
  [FormaPago.TARJETA_PREPAGO]: "Tarjeta prepago",
  [FormaPago.TARJETA_CREDITO]: "Tarjeta de cr\xE9dito",
  [FormaPago.OTROS_SISTEMA_FINANCIERO]: "Otros con utilizaci\xF3n del sistema financiero",
  [FormaPago.ENDOSO_TITULOS]: "Endoso de t\xEDtulos"
};
var LABEL_AMBIENTE = {
  ["1" /* Pruebas */]: "PRUEBAS",
  ["2" /* Produccion */]: "PRODUCCI\xD3N"
};
var LABEL_TIPO_EMISION = {
  ["1" /* Normal */]: "NORMAL"
};
function etiquetaCatalogo(mapa, codigo) {
  if (codigo === void 0) return "";
  return mapa[codigo] ?? String(codigo);
}
function nombreDocumento(tipo) {
  switch (tipo) {
    case "01" /* Factura */:
      return "FACTURA";
    case "03" /* LiquidacionCompra */:
      return "LIQUIDACI\xD3N DE COMPRA DE BIENES Y PRESTACI\xD3N DE SERVICIOS";
    case "04" /* NotaCredito */:
      return "NOTA DE CR\xC9DITO";
    case "05" /* NotaDebito */:
      return "NOTA DE D\xC9BITO";
    case "06" /* GuiaRemision */:
      return "GU\xCDA DE REMISI\xD3N";
    case "07" /* Retencion */:
      return "COMPROBANTE DE RETENCI\xD3N";
  }
}
function nombreDocumentoPorCodigo(codDoc) {
  return NOMBRE_POR_COD_DOC[codDoc] ?? codDoc;
}
var NOMBRE_POR_COD_DOC = {
  ["01" /* Factura */]: "Factura",
  ["03" /* LiquidacionCompra */]: "Liquidaci\xF3n de Compra",
  ["04" /* NotaCredito */]: "Nota de Cr\xE9dito",
  ["05" /* NotaDebito */]: "Nota de D\xE9bito",
  ["06" /* GuiaRemision */]: "Gu\xEDa de Remisi\xF3n",
  ["07" /* Retencion */]: "Comprobante de Retenci\xF3n"
};
var LABEL_TIPO_IDENTIFICACION = {
  "04": "RUC",
  "05": "C\xE9dula de Identidad",
  "06": "Pasaporte",
  "07": "Consumidor Final",
  "08": "Identificaci\xF3n del Exterior"
};
function tipoIdentificacionLabel(codigo) {
  return LABEL_TIPO_IDENTIFICACION[codigo] ?? codigo;
}
function identificacionConTipo(identificacion, tipo) {
  return tipo ? `${identificacion} (${tipoIdentificacionLabel(tipo)})` : identificacion;
}
function formaPagoLabel(codigo) {
  return LABEL_FORMA_PAGO[codigo] ?? codigo;
}
function formatNumeroComprobante(info) {
  return `${info.estab}-${info.ptoEmi}-${info.secuencial}`;
}
function asegurarEspacio(doc, y, alturaMinima) {
  if (y + alturaMinima > limiteInferior(doc)) {
    doc.addPage();
    return doc.page.margins.top;
  }
  return y;
}
function limiteInferior(doc) {
  return doc.page.height - doc.page.margins.bottom;
}
function alturaUtilPagina(doc) {
  return doc.page.height - doc.page.margins.top - doc.page.margins.bottom;
}
function noVacio(v) {
  return v !== void 0 && v.trim() !== "";
}
function escribirTexto(doc, texto, x, y, opciones) {
  doc.text(texto, x, y, { ...opciones, height: Infinity });
}
function partirTextoPorAltura(doc, texto, ancho, altoMax) {
  if (texto === "" || doc.heightOfString(texto, { width: ancho }) <= altoMax) {
    return [texto];
  }
  const trozos = [];
  let actual = "";
  for (const token of texto.split(/(\s+)/)) {
    const candidato = actual + token;
    if (actual.trim() !== "" && doc.heightOfString(candidato, { width: ancho }) > altoMax) {
      trozos.push(actual.replace(/\s+$/, ""));
      actual = token.replace(/^\s+/, "");
    } else {
      actual = candidato;
    }
  }
  if (actual.trim() !== "") {
    trozos.push(actual);
  }
  return trozos.length > 0 ? trozos : [texto];
}
function dibujarBordeCaja(doc, x, y, ancho, alto) {
  doc.lineWidth(0.75).strokeColor(COLOR_TEXTO).rect(x, y, ancho, alto).stroke();
}
var ANCHO_VALOR = 75;
var TAMANO_MINIMO_AJUSTE = 4.5;
function tamanoQueCabe(doc, texto, ancho, base) {
  if (texto === "" || /\s/.test(texto)) return base;
  doc.fontSize(base);
  if (doc.widthOfString(texto) <= ancho) return base;
  let tamano = base;
  while (tamano > TAMANO_MINIMO_AJUSTE) {
    tamano = Math.max(TAMANO_MINIMO_AJUSTE, tamano - 0.25);
    doc.fontSize(tamano);
    if (doc.widthOfString(texto) <= ancho) return tamano;
  }
  return TAMANO_MINIMO_AJUSTE;
}
function aplicarFuente(doc, linea) {
  doc.font(linea.negrita ? FUENTE_NEGRITA : FUENTE_NORMAL).fontSize(linea.tamano ?? TAMANO_TEXTO).fillColor(linea.color ?? COLOR_TEXTO);
}
function aplicarFuenteColumna(doc, columna) {
  doc.font(columna.negrita ? FUENTE_NEGRITA : FUENTE_NORMAL).fillColor(columna.color ?? COLOR_TEXTO);
  const base = columna.tamano ?? TAMANO_TEXTO;
  const tamano = columna.ajustar ? tamanoQueCabe(doc, columna.texto, columna.ancho, base) : base;
  doc.fontSize(tamano);
  return tamano;
}
function opcionesColumna(columna) {
  return {
    width: columna.ancho,
    align: columna.alineacion ?? "left",
    characterSpacing: columna.espaciadoCaracteres
  };
}
function alturaLinea(doc, linea, anchoCaja) {
  if (linea.espaciador !== void 0) {
    return linea.espaciador;
  }
  if (linea.columnas) {
    return Math.max(
      ...linea.columnas.map((columna) => {
        aplicarFuenteColumna(doc, columna);
        return doc.heightOfString(columna.texto, opcionesColumna(columna));
      })
    );
  }
  aplicarFuente(doc, linea);
  const ancho = linea.ancho ?? anchoCaja;
  if (linea.valor === void 0) {
    return doc.heightOfString(linea.texto, opcionesLinea(doc, linea, ancho));
  }
  const anchoValor = linea.anchoValor ?? ANCHO_VALOR;
  return Math.max(
    doc.heightOfString(linea.texto, opcionesLinea(doc, linea, ancho - anchoValor - ESPACIO_LINEA)),
    doc.heightOfString(linea.valor, { width: anchoValor })
  );
}
function opcionesLinea(doc, linea, ancho) {
  if (linea.ajustar) {
    doc.fontSize(tamanoQueCabe(doc, linea.texto, ancho, linea.tamano ?? TAMANO_TEXTO));
  }
  return { width: ancho, align: linea.alineacion ?? "left", characterSpacing: linea.espaciadoCaracteres };
}
function avanceLinea(doc, linea, anchoCaja) {
  return alturaLinea(doc, linea, anchoCaja) + (linea.espaciador !== void 0 ? 0 : ESPACIO_LINEA);
}
function dibujarLinea(doc, linea, x, y, anchoCaja) {
  if (linea.espaciador !== void 0) {
    linea.dibujar?.(x, y, anchoCaja);
    return;
  }
  if (linea.columnas) {
    let cx = x;
    for (const columna of linea.columnas) {
      aplicarFuenteColumna(doc, columna);
      escribirTexto(doc, columna.texto, cx, y, opcionesColumna(columna));
      cx += columna.ancho;
    }
    return;
  }
  aplicarFuente(doc, linea);
  const ancho = linea.ancho ?? anchoCaja;
  if (linea.valor === void 0) {
    escribirTexto(doc, linea.texto, x, y, opcionesLinea(doc, linea, ancho));
    return;
  }
  const anchoValor = linea.anchoValor ?? ANCHO_VALOR;
  escribirTexto(doc, linea.texto, x, y, opcionesLinea(doc, linea, ancho - anchoValor - ESPACIO_LINEA));
  aplicarFuente(doc, linea);
  escribirTexto(doc, linea.valor, x + ancho - anchoValor, y, { width: anchoValor, align: "right" });
}
function lineaContinuacion(titulo) {
  return { texto: `${titulo} (continuaci\xF3n)`, negrita: true, tamano: TAMANO_TITULO };
}
function medirCaja(doc, lineas, anchoArea, alturaExtra = 0) {
  const anchoCaja = anchoArea - PADDING_CAJA * 2;
  let alto = PADDING_CAJA * 2 + alturaExtra;
  for (const linea of lineas) {
    alto += avanceLinea(doc, linea, anchoCaja);
  }
  return alto;
}
function dibujarCaja(doc, area, lineas, opciones = {}) {
  const anchoCaja = area.width - PADDING_CAJA * 2;
  const x = area.x + PADDING_CAJA;
  const alturaExtra = opciones.alturaExtra ?? 0;
  const altoContinuacion = opciones.titulo ? avanceLinea(doc, lineaContinuacion(opciones.titulo), anchoCaja) : 0;
  const presupuestoLinea = alturaUtilPagina(doc) - PADDING_CAJA * 2 - ESPACIO_LINEA - altoContinuacion;
  const lineasFinales = lineas.flatMap((linea) => partirLinea(doc, linea, anchoCaja, presupuestoLinea));
  let topCaja = area.y;
  let y = topCaja + PADDING_CAJA;
  if (opciones.dibujarExtra) {
    opciones.dibujarExtra(x, y, anchoCaja);
  }
  y += alturaExtra;
  let hayContenido = alturaExtra > 0;
  for (const linea of lineasFinales) {
    const alto = alturaLinea(doc, linea, anchoCaja);
    if (hayContenido && y + alto + PADDING_CAJA > limiteInferior(doc)) {
      dibujarBordeCaja(doc, area.x, topCaja, area.width, y + PADDING_CAJA - topCaja);
      doc.addPage();
      topCaja = doc.page.margins.top;
      y = topCaja + PADDING_CAJA;
      if (opciones.titulo) {
        const continuacion = lineaContinuacion(opciones.titulo);
        dibujarLinea(doc, continuacion, x, y, anchoCaja);
        y += avanceLinea(doc, continuacion, anchoCaja);
      }
    }
    dibujarLinea(doc, linea, x, y, anchoCaja);
    y += avanceLinea(doc, linea, anchoCaja);
    hayContenido = true;
  }
  const abajo = Math.max(y + PADDING_CAJA, Math.min(topCaja + (opciones.altoMinimo ?? 0), limiteInferior(doc)));
  dibujarBordeCaja(doc, area.x, topCaja, area.width, abajo - topCaja);
  return abajo;
}
function partirLinea(doc, linea, anchoCaja, presupuesto) {
  if (linea.espaciador !== void 0 || alturaLinea(doc, linea, anchoCaja) <= presupuesto) {
    return [linea];
  }
  if (linea.columnas) {
    const plano = { texto: linea.columnas.map((c) => c.texto).join(" "), negrita: linea.columnas[0]?.negrita };
    return partirLinea(doc, plano, anchoCaja, presupuesto);
  }
  aplicarFuente(doc, linea);
  const ancho = linea.ancho ?? anchoCaja;
  const anchoTexto = linea.valor === void 0 ? ancho : ancho - (linea.anchoValor ?? ANCHO_VALOR) - ESPACIO_LINEA;
  const trozos = partirTextoPorAltura(doc, linea.texto, anchoTexto, presupuesto);
  return trozos.map((texto, i) => i === 0 ? { ...linea, texto } : { ...linea, texto, valor: void 0 });
}
function drawBloquesEnFila(doc, y, altoIzquierda, altoDerecha, izquierda, derecha, separacion = 0) {
  const alto = Math.max(altoIzquierda, altoDerecha);
  if (alto > alturaUtilPagina(doc)) {
    let yActual = asegurarEspacio(doc, y, alturaUtilPagina(doc));
    yActual = izquierda(yActual) + separacion;
    yActual = asegurarEspacio(doc, yActual, alturaUtilPagina(doc));
    return derecha(yActual);
  }
  const yFila = asegurarEspacio(doc, y, alto);
  return Math.max(izquierda(yFila), derecha(yFila));
}
function drawEmisor(doc, emisor, area, altoMinimo) {
  let y = area.y;
  if (emisor.logo) {
    dibujarLogo(doc, emisor.logo, area.x, y, area.width);
    y += ALTURA_LOGO;
  }
  return dibujarCaja(doc, { ...area, y }, lineasEmisor(emisor, area.width), {
    altoMinimo: altoMinimo !== void 0 ? altoMinimo - (y - area.y) : void 0
  });
}
var ALTURA_IMAGEN_LOGO = 62;
var ALTURA_LOGO = ALTURA_IMAGEN_LOGO + 6;
function dibujarLogo(doc, logo, x, y, ancho) {
  try {
    doc.image(Buffer.from(logo), x, y, { fit: [ancho, ALTURA_IMAGEN_LOGO], align: "center", valign: "center" });
  } catch {
    throw new import_sri_ec.SriError(
      "El logo del emisor no se pudo procesar: formato no soportado o archivo corrupto. Usa PNG o JPG.",
      "RIDE_INVALID_LOGO"
    );
  }
}
var FRACCION_ETIQUETA_DIRECCION = 0.3;
var FRACCION_ETIQUETA_ANCHA = 0.68;
function filaEtiquetaValor(anchoCaja, etiqueta, valor, fraccionEtiqueta, opciones = {}) {
  const anchoEtiqueta = Math.floor(anchoCaja * fraccionEtiqueta);
  return {
    texto: etiqueta,
    columnas: [
      { texto: etiqueta, ancho: anchoEtiqueta, negrita: true, tamano: opciones.tamano },
      {
        texto: valor,
        ancho: anchoCaja - anchoEtiqueta,
        tamano: opciones.tamano,
        alineacion: opciones.alinearValorDerecha ? "right" : "left",
        ajustar: true
      }
    ]
  };
}
function lineasEmisor(emisor, anchoArea) {
  const anchoCaja = anchoArea - PADDING_CAJA * 2;
  const lineas = [{ texto: emisor.razonSocial, negrita: true, tamano: TAMANO_TITULO }];
  if (emisor.nombreComercial) {
    lineas.push({ texto: emisor.nombreComercial, tamano: TAMANO_TABLA });
  }
  lineas.push({ texto: "", espaciador: ESPACIO_LINEA * 2 });
  lineas.push(filaEtiquetaValor(anchoCaja, "Direcci\xF3n Matriz:", emisor.dirMatriz, FRACCION_ETIQUETA_DIRECCION));
  if (noVacio(emisor.dirEstablecimiento)) {
    lineas.push(
      filaEtiquetaValor(anchoCaja, "Direcci\xF3n Sucursal:", emisor.dirEstablecimiento, FRACCION_ETIQUETA_DIRECCION)
    );
  }
  if (noVacio(emisor.contribuyenteEspecial)) {
    lineas.push(
      filaEtiquetaValor(anchoCaja, "Contribuyente Especial Nro", emisor.contribuyenteEspecial, FRACCION_ETIQUETA_ANCHA, {
        alinearValorDerecha: true
      })
    );
  }
  if (emisor.obligadoContabilidad) {
    lineas.push(
      filaEtiquetaValor(anchoCaja, "OBLIGADO A LLEVAR CONTABILIDAD", emisor.obligadoContabilidad, FRACCION_ETIQUETA_ANCHA, {
        alinearValorDerecha: true
      })
    );
  }
  for (const [etiqueta, valor] of [
    ["Agente de Retenci\xF3n:", emisor.agenteRetencion],
    ["RISE:", emisor.rise]
  ]) {
    if (noVacio(valor)) {
      lineas.push(filaEtiquetaValor(anchoCaja, etiqueta, valor, 0.45));
    }
  }
  if (emisor.regimenRimpe) {
    lineas.push({
      texto: LEYENDA_RIMPE[emisor.regimenRimpe],
      negrita: true,
      tamano: TAMANO_TEXTO,
      ajustar: true
    });
  }
  return lineas;
}
function medirEmisor(doc, emisor, ancho) {
  return medirCaja(doc, lineasEmisor(emisor, ancho), ancho) + (emisor.logo ? ALTURA_LOGO : 0);
}
function drawComprobante(doc, comprobante, area, qr, codigoBarras = true, altoMinimo) {
  return dibujarCaja(doc, area, lineasComprobante(doc, comprobante, area.width, qr, codigoBarras), { altoMinimo });
}
function ajustarNombreDocumento(doc, nombre, anchoCaja) {
  const TAMANO_MAX = TAMANO_TITULO + 3;
  const ESPACIADO_MAX = 2.5;
  const lineas = (espaciado) => {
    const alto = doc.heightOfString(nombre, { width: anchoCaja, characterSpacing: espaciado });
    return Math.max(1, Math.round(alto / doc.heightOfString("X", { width: anchoCaja })));
  };
  doc.font(FUENTE_NEGRITA);
  for (const maxLineas of [1, 2]) {
    let tamano = TAMANO_MAX;
    let espaciado = ESPACIADO_MAX;
    while (tamano > TAMANO_TABLA) {
      doc.fontSize(tamano);
      if (lineas(espaciado) <= maxLineas) {
        return { tamano, espaciado };
      }
      tamano -= 0.5;
      espaciado = Math.max(0, espaciado - 0.35);
    }
  }
  doc.fontSize(TAMANO_TABLA);
  return { tamano: TAMANO_TABLA, espaciado: 0 };
}
var QR_LADO = 85;
var ALTURA_CODIGO_BARRAS = 34;
function lineasComprobante(doc, comprobante, anchoArea, qr, codigoBarras) {
  const anchoCaja = anchoArea - PADDING_CAJA * 2;
  const { tamano: tamanoNombreDoc, espaciado: espaciadoNombreDoc } = ajustarNombreDocumento(
    doc,
    comprobante.nombreDocumento,
    anchoCaja
  );
  const lineas = [
    filaEtiquetaValor(anchoCaja, "R.U.C.:", comprobante.ruc, 0.3, { tamano: TAMANO_TITULO }),
    {
      texto: comprobante.nombreDocumento,
      negrita: true,
      tamano: tamanoNombreDoc,
      espaciadoCaracteres: espaciadoNombreDoc
    },
    filaEtiquetaValor(anchoCaja, "No.", comprobante.numero, 0.15, { tamano: TAMANO_TITULO }),
    { texto: "N\xDAMERO DE AUTORIZACI\xD3N", tamano: TAMANO_TABLA }
  ];
  if (comprobante.autorizacion) {
    lineas.push({ texto: comprobante.autorizacion.numero, negrita: true, tamano: TAMANO_TABLA, ajustar: true });
    lineas.push(
      filaEtiquetaValor(anchoCaja, "FECHA Y HORA DE AUTORIZACI\xD3N", comprobante.autorizacion.fecha, 0.5, {
        tamano: TAMANO_TABLA
      })
    );
  } else {
    lineas.push({ texto: "COMPROBANTE NO AUTORIZADO", negrita: true, color: COLOR_NO_AUTORIZADO });
  }
  lineas.push(filaEtiquetaValor(anchoCaja, "AMBIENTE:", etiquetaCatalogo(LABEL_AMBIENTE, comprobante.ambiente), 0.35));
  lineas.push(
    filaEtiquetaValor(anchoCaja, "EMISI\xD3N:", etiquetaCatalogo(LABEL_TIPO_EMISION, comprobante.tipoEmision), 0.35)
  );
  lineas.push({ texto: "CLAVE DE ACCESO", tamano: TAMANO_TITULO });
  if (codigoBarras) {
    lineas.push({
      texto: "",
      espaciador: ALTURA_CODIGO_BARRAS + ESPACIO_LINEA,
      dibujar: (x, y, ancho) => dibujarCode128(doc, comprobante.claveAcceso, { x, y, ancho, alto: ALTURA_CODIGO_BARRAS })
    });
  }
  if (qr) {
    lineas.push({
      texto: "",
      espaciador: QR_LADO + ESPACIO_LINEA,
      dibujar: (x, y, ancho) => doc.image(qr, x + (ancho - QR_LADO) / 2, y, { width: QR_LADO, height: QR_LADO })
    });
  }
  lineas.push({ texto: comprobante.claveAcceso, tamano: TAMANO_TABLA, alineacion: "center", ajustar: true });
  return lineas;
}
function medirComprobante(doc, comprobante, ancho, hayQr, codigoBarras = true) {
  return medirCaja(doc, lineasComprobante(doc, comprobante, ancho, hayQr ? FALSO_QR : void 0, codigoBarras), ancho);
}
var FALSO_QR = Buffer.alloc(0);
var SEPARACION_COLUMNAS = 8;
function drawCabecera(doc, cabecera, area) {
  const { anchoIzquierda, anchoDerecha } = anchosCabecera(area.width);
  const codigoBarras = cabecera.codigoBarras ?? true;
  const altoIzquierda = medirEmisor(doc, cabecera.emisor, anchoIzquierda);
  const altoDerecha = medirComprobante(doc, cabecera.comprobante, anchoDerecha, cabecera.qr !== void 0, codigoBarras);
  const alto = Math.max(altoIzquierda, altoDerecha);
  const y = asegurarEspacio(doc, area.y, alto);
  const altoMinimoEmisor = cabecera.emisor.logo ? alto : void 0;
  const abajoIzquierda = drawEmisor(doc, cabecera.emisor, { x: area.x, y, width: anchoIzquierda }, altoMinimoEmisor);
  const abajoDerecha = drawComprobante(
    doc,
    cabecera.comprobante,
    { x: area.x + anchoIzquierda + SEPARACION_COLUMNAS, y, width: anchoDerecha },
    cabecera.qr,
    codigoBarras,
    alto
  );
  return Math.max(abajoIzquierda, abajoDerecha);
}
function medirCabecera(doc, cabecera, ancho) {
  const { anchoIzquierda, anchoDerecha } = anchosCabecera(ancho);
  return Math.max(
    medirEmisor(doc, cabecera.emisor, anchoIzquierda),
    medirComprobante(doc, cabecera.comprobante, anchoDerecha, cabecera.qr !== void 0, cabecera.codigoBarras ?? true)
  );
}
function anchosCabecera(ancho) {
  const anchoIzquierda = Math.floor((ancho - SEPARACION_COLUMNAS) / 2);
  return { anchoIzquierda, anchoDerecha: ancho - anchoIzquierda - SEPARACION_COLUMNAS };
}
function drawComprador(doc, comprador, area) {
  return drawBandaSujeto(doc, filasComprador(comprador), area, tituloComprador(comprador));
}
function tituloComprador(comprador) {
  return comprador.etiquetaSujeto?.toUpperCase();
}
var FRACCIONES_BANDA = [0.32, 0.3, 0.14, 0.24];
function drawBandaSujeto(doc, filas, area, titulo) {
  return dibujarCaja(doc, area, lineasBanda(filas, area.width, titulo), { titulo });
}
function medirBandaSujeto(doc, filas, ancho, titulo) {
  return medirCaja(doc, lineasBanda(filas, ancho, titulo), ancho);
}
function lineasBanda(filas, anchoArea, titulo) {
  const anchoCaja = anchoArea - PADDING_CAJA * 2;
  const anchosDe = (fracciones) => {
    const total = fracciones.reduce((s, f) => s + f, 0);
    const anchos = fracciones.map((f) => Math.floor(anchoCaja * f / total));
    anchos[3] = anchoCaja - anchos[0] - anchos[1] - anchos[2];
    return anchos;
  };
  const lineas = titulo ? [{ texto: titulo, negrita: true, tamano: TAMANO_TITULO }] : [];
  for (const fila of filas) {
    const anchos = anchosDe(fila.fracciones ?? FRACCIONES_BANDA);
    const columnas = fila.derecha === void 0 ? [
      { texto: fila.izquierda.etiqueta, ancho: anchos[0], negrita: true },
      { texto: fila.izquierda.valor, ancho: anchoCaja - anchos[0], ajustar: true }
    ] : [
      { texto: fila.izquierda.etiqueta, ancho: anchos[0], negrita: true },
      { texto: fila.izquierda.valor, ancho: anchos[1], ajustar: true },
      { texto: fila.derecha.etiqueta, ancho: anchos[2], negrita: true },
      { texto: fila.derecha.valor, ancho: anchos[3], ajustar: true }
    ];
    lineas.push({ texto: fila.izquierda.etiqueta, columnas });
  }
  return lineas;
}
function filasComprador(comprador) {
  const tipo = comprador.tipoIdentificacion ? ` (${LABEL_TIPO_IDENTIFICACION[comprador.tipoIdentificacion] ?? comprador.tipoIdentificacion})` : "";
  const pares = [
    ["Raz\xF3n Social / Nombres y Apellidos:", noVacio(comprador.razonSocial) ? comprador.razonSocial : void 0],
    ["Identificaci\xF3n:", noVacio(comprador.identificacion) ? `${comprador.identificacion}${tipo}` : void 0],
    ["Fecha Emisi\xF3n:", noVacio(comprador.fechaEmision) ? comprador.fechaEmision : void 0],
    ["Gu\xEDa Remisi\xF3n:", noVacio(comprador.guiaRemision) ? comprador.guiaRemision : void 0],
    ["Direcci\xF3n:", noVacio(comprador.direccion) ? comprador.direccion : void 0]
  ];
  return emparejarFilas(pares);
}
function emparejarFilas(pares) {
  const presentes = pares.filter((par) => par[1] !== void 0).map(([etiqueta, valor]) => ({ etiqueta, valor }));
  const filas = [];
  for (let i = 0; i < presentes.length; i += 2) {
    filas.push({ izquierda: presentes[i], derecha: presentes[i + 1] });
  }
  return filas;
}
function medirComprador(doc, comprador, ancho) {
  return medirBandaSujeto(doc, filasComprador(comprador), ancho, tituloComprador(comprador));
}
function construirColumnas(anchoTotal, specs) {
  const total = specs.reduce((s, [, peso]) => s + peso, 0);
  const widths = specs.map(([, peso]) => Math.floor(anchoTotal * peso / total));
  const usado = widths.reduce((a, b) => a + b, 0);
  widths[widths.length - 1] += anchoTotal - usado;
  return specs.map(([header, , align], i) => ({ header, width: widths[i], align }));
}
function especificacionDetalle(opciones) {
  const columnasExtra = opciones.detallesAdicionales ?? MAX_DETALLES_ADICIONALES;
  const etiquetas = { ...ETIQUETAS_DETALLE_FACTURA, ...opciones.etiquetas };
  const specs = [
    [etiquetas.codigoPrincipal, 8.5, "left"],
    [etiquetas.codigoAuxiliar, 7.5, "left"],
    [etiquetas.cantidad, 6.5, "right"],
    ["Descripci\xF3n", 18.5, "left"]
  ];
  for (let i = 0; i < columnasExtra; i++) {
    specs.push(["Detalle Adicional", 7, "left"]);
  }
  specs.push(["Precio Unitario", 8, "right"]);
  if (opciones.subsidio !== false) {
    specs.push(["Subsidio", 6.5, "right"], ["Precio Sin Subsidio", 7.5, "right"]);
  }
  specs.push(["Descuento", 7, "right"], ["Precio Total", 9, "right"]);
  return specs;
}
var MAX_DETALLES_ADICIONALES = 3;
var TAMANO_DETALLE = 6.5;
var ETIQUETAS_DETALLE_FACTURA = {
  codigoPrincipal: "Cod. Principal",
  codigoAuxiliar: "Cod. Auxiliar",
  cantidad: "Cant."
};
var ETIQUETAS_DETALLE_COMPLETAS = {
  codigoPrincipal: "C\xF3digo",
  codigoAuxiliar: "C\xF3digo Auxiliar",
  cantidad: "Cantidad"
};
function formatCantidadPrecision(valor) {
  const normalizado = (0, import_sri_ec.formatMonto)(valor, 6);
  const [intPart, fracPart] = normalizado.split(".");
  const fracRecortada = (fracPart ?? "").replace(/0+$/, "");
  return `${intPart}.${fracRecortada.length < 2 ? fracRecortada.padEnd(2, "0") : fracRecortada}`;
}
function celdasDetalle(d, opciones) {
  const columnasExtra = opciones.detallesAdicionales ?? MAX_DETALLES_ADICIONALES;
  const extras = Object.entries(d.detallesAdicionales ?? {}).map(([k, v]) => `${k}: ${v}`);
  const enColumnas = extras.slice(0, columnasExtra);
  const sobrantes = extras.slice(columnasExtra);
  const celdas = [
    d.codigoPrincipal ?? "",
    d.codigoAuxiliar ?? "",
    formatCantidadPrecision(d.cantidad),
    [d.descripcion, ...sobrantes].join("\n"),
    ...Array.from({ length: columnasExtra }, (_, i) => enColumnas[i] ?? ""),
    formatCantidadPrecision(d.precioUnitario)
  ];
  if (opciones.subsidio !== false) {
    celdas.push("0.00", (0, import_sri_ec.formatMonto)(d.precioTotalSinImpuesto, 2));
  }
  celdas.push((0, import_sri_ec.formatMonto)(d.descuento, 2), (0, import_sri_ec.formatMonto)(d.precioTotalSinImpuesto, 2));
  return celdas;
}
function fuenteFilaTabla(doc, esEncabezado, tamano) {
  doc.font(esEncabezado ? FUENTE_NEGRITA : FUENTE_NORMAL).fontSize(tamano).fillColor(COLOR_TEXTO);
}
function tamanosCelda(doc, columnas, celdas, esEncabezado, base) {
  fuenteFilaTabla(doc, esEncabezado, base);
  return columnas.map((col, i) => tamanoQueCabe(doc, celdas[i], col.width - PADDING_CELDA * 2, base));
}
function alturaFilaTabla(doc, columnas, celdas, esEncabezado, base) {
  const tamanos = tamanosCelda(doc, columnas, celdas, esEncabezado, base);
  const alturas = columnas.map((col, i) => {
    doc.fontSize(tamanos[i]);
    return doc.heightOfString(celdas[i], { width: col.width - PADDING_CELDA * 2 });
  });
  return Math.max(...alturas) + PADDING_CELDA * 2;
}
function dibujarFilaTabla(doc, columnas, celdas, x, y, esEncabezado, opciones = {}) {
  const base = opciones.tamano ?? TAMANO_TABLA;
  const alto = alturaFilaTabla(doc, columnas, celdas, esEncabezado, base);
  const anchoTotal = columnas.reduce((s, c) => s + c.width, 0);
  if (esEncabezado) {
    doc.rect(x, y, anchoTotal, alto).fillAndStroke(COLOR_ENCABEZADO_TABLA, COLOR_TEXTO);
    doc.fillColor(COLOR_TEXTO);
  }
  const tamanos = tamanosCelda(doc, columnas, celdas, esEncabezado, base);
  let cx = x;
  for (let i = 0; i < columnas.length; i++) {
    fuenteFilaTabla(doc, esEncabezado, tamanos[i]);
    escribirTexto(doc, celdas[i], cx + PADDING_CELDA, y + PADDING_CELDA, {
      width: columnas[i].width - PADDING_CELDA * 2,
      // Los encabezados van centrados en la maqueta del Anexo 2, sea cual sea
      // la alineación de los datos de esa columna.
      align: esEncabezado ? "center" : columnas[i].align
    });
    cx += columnas[i].width;
  }
  doc.lineWidth(0.5).strokeColor(COLOR_TEXTO);
  if (!esEncabezado) {
    doc.rect(x, y, anchoTotal, alto).stroke();
  }
  if (opciones.divisores !== false) {
    cx = x;
    for (const col of columnas.slice(0, -1)) {
      cx += col.width;
      doc.moveTo(cx, y).lineTo(cx, y + alto).stroke();
    }
  }
  return y + alto;
}
function dibujarFilaEnVariasPaginas(doc, columnas, encabezados, celdas, x, y, altoEncabezado, opciones) {
  const base = opciones.tamano ?? TAMANO_TABLA;
  const conEncabezado = opciones.conEncabezado !== false;
  const abrirPagina = () => {
    doc.addPage();
    const yTop = doc.page.margins.top;
    return conEncabezado ? dibujarFilaTabla(doc, columnas, encabezados, x, yTop, true, opciones) : yTop;
  };
  let yFila = y;
  if (yFila > doc.page.margins.top + altoEncabezado) {
    yFila = abrirPagina();
  }
  const presupuesto = alturaUtilPagina(doc) - altoEncabezado - PADDING_CELDA * 2;
  fuenteFilaTabla(doc, false, base);
  const trozos = columnas.map(
    (col, i) => partirTextoPorAltura(doc, celdas[i], col.width - PADDING_CELDA * 2, presupuesto)
  );
  const subFilas = Math.max(...trozos.map((t) => t.length));
  for (let s = 0; s < subFilas; s++) {
    if (s > 0) {
      yFila = abrirPagina();
    }
    yFila = dibujarFilaTabla(
      doc,
      columnas,
      trozos.map((t) => t[s] ?? ""),
      x,
      yFila,
      false,
      opciones
    );
  }
  return yFila;
}
function drawTablaGenerica(doc, columnas, filas, area, opciones = {}) {
  const base = opciones.tamano ?? TAMANO_TABLA;
  const conEncabezado = opciones.conEncabezado !== false;
  const encabezados = columnas.map((c) => c.header);
  const altoEncabezado = conEncabezado ? alturaFilaTabla(doc, columnas, encabezados, true, base) : 0;
  const altoPrimeraFila = filas.length > 0 ? alturaFilaTabla(doc, columnas, filas[0], false, base) : 0;
  let y = asegurarEspacio(doc, area.y, Math.min(altoEncabezado + altoPrimeraFila, alturaUtilPagina(doc)));
  if (conEncabezado) {
    y = dibujarFilaTabla(doc, columnas, encabezados, area.x, y, true, opciones);
  }
  for (const fila of filas) {
    const alto = alturaFilaTabla(doc, columnas, fila, false, base);
    if (y + alto <= limiteInferior(doc)) {
      y = dibujarFilaTabla(doc, columnas, fila, area.x, y, false, opciones);
      continue;
    }
    if (altoEncabezado + alto <= alturaUtilPagina(doc)) {
      doc.addPage();
      y = doc.page.margins.top;
      if (conEncabezado) {
        y = dibujarFilaTabla(doc, columnas, encabezados, area.x, y, true, opciones);
      }
      y = dibujarFilaTabla(doc, columnas, fila, area.x, y, false, opciones);
      continue;
    }
    y = dibujarFilaEnVariasPaginas(doc, columnas, encabezados, fila, area.x, y, altoEncabezado, opciones);
  }
  return y;
}
function medirTablaGenerica(doc, columnas, filas, opciones = {}) {
  const base = opciones.tamano ?? TAMANO_TABLA;
  const conEncabezado = opciones.conEncabezado !== false;
  let alto = conEncabezado ? alturaFilaTabla(doc, columnas, columnas.map((c) => c.header), true, base) : 0;
  for (const fila of filas) {
    alto += alturaFilaTabla(doc, columnas, fila, false, base);
  }
  return alto;
}
function drawTablaDetalles(doc, detalles, area, opciones = {}) {
  const columnas = construirColumnas(area.width, especificacionDetalle(opciones));
  const filas = detalles.map((d) => celdasDetalle(d, opciones));
  return drawTablaGenerica(doc, columnas, filas, area, { tamano: TAMANO_DETALLE });
}
function basesPorCodigoPorcentaje(impuestos) {
  const grupos = /* @__PURE__ */ new Map();
  for (const imp of impuestos) {
    if (imp.codigo !== CODIGO_IMPUESTO_IVA) continue;
    grupos.set(imp.codigoPorcentaje, (grupos.get(imp.codigoPorcentaje) ?? 0) + (0, import_sri_ec.toCents)(imp.baseImponible));
  }
  return grupos;
}
function agruparValorPorCodigo(impuestos) {
  const grupos = /* @__PURE__ */ new Map();
  for (const imp of impuestos) {
    grupos.set(imp.codigo, (grupos.get(imp.codigo) ?? 0) + (0, import_sri_ec.toCents)(imp.valor));
  }
  return grupos;
}
function drawTotales(doc, totales, area) {
  const columnas = columnasTotales(area.width);
  let y = drawTablaGenerica(doc, columnas, filasTotales(totales), area, OPCIONES_TABLA_TOTALES);
  const subsidio = filasSubsidio(totales);
  if (subsidio.length > 0) {
    y += SEPARACION_SUBSIDIO;
    y = drawTablaGenerica(doc, columnasTotales(area.width), subsidio, { ...area, y }, OPCIONES_TABLA_SUBSIDIO);
  }
  return y;
}
var OPCIONES_TABLA_TOTALES = { conEncabezado: false, tamano: TAMANO_TABLA };
var OPCIONES_TABLA_SUBSIDIO = { conEncabezado: false, tamano: TAMANO_TEXTO, divisores: false };
var SEPARACION_SUBSIDIO = 6;
function columnasTotales(ancho) {
  return construirColumnas(ancho, [
    ["", 0.72, "left"],
    ["", 0.28, "right"]
  ]);
}
var ETIQUETAS_TOTALES_FACTURA = {
  subtotalCero: "SUBTOTAL IVA 0%",
  subtotalNoObjeto: "SUBTOTAL NO OBJETO IVA",
  subtotalExento: "SUBTOTAL EXENTO IVA",
  subtotalSinImpuestos: "SUBTOTAL SIN IMPUESTOS",
  descuento: "DESCUENTO",
  valorTotal: "VALOR TOTAL"
};
var CODIGO_PORCENTAJE_CERO = "0";
var CODIGO_PORCENTAJE_NO_OBJETO = "6";
var CODIGO_PORCENTAJE_EXENTO = "7";
function filasTotales(totales) {
  const etiquetas = { ...ETIQUETAS_TOTALES_FACTURA, ...totales.etiquetas };
  const bases = basesPorCodigoPorcentaje(totales.impuestos);
  const filas = [];
  const filaSubtotal = (etiqueta, codigoPorcentaje) => {
    const cents = bases.get(codigoPorcentaje);
    bases.delete(codigoPorcentaje);
    filas.push([etiqueta, (0, import_sri_ec.fromCents)(cents ?? 0)]);
  };
  for (const [codigoPorcentaje, cents] of [...bases]) {
    if (codigoPorcentaje === CODIGO_PORCENTAJE_CERO || codigoPorcentaje === CODIGO_PORCENTAJE_NO_OBJETO || codigoPorcentaje === CODIGO_PORCENTAJE_EXENTO) {
      continue;
    }
    bases.delete(codigoPorcentaje);
    filas.push([`SUBTOTAL ${LABEL_CODIGO_PORCENTAJE[codigoPorcentaje] ?? codigoPorcentaje}`, (0, import_sri_ec.fromCents)(cents)]);
  }
  filaSubtotal(etiquetas.subtotalCero, CODIGO_PORCENTAJE_CERO);
  filaSubtotal(etiquetas.subtotalNoObjeto, CODIGO_PORCENTAJE_NO_OBJETO);
  filaSubtotal(etiquetas.subtotalExento, CODIGO_PORCENTAJE_EXENTO);
  filas.push([etiquetas.subtotalSinImpuestos, (0, import_sri_ec.formatMonto)(totales.totalSinImpuestos, 2)]);
  if (totales.totalDescuento !== void 0) {
    filas.push([etiquetas.descuento, (0, import_sri_ec.formatMonto)(totales.totalDescuento, 2)]);
  }
  const grupos = agruparValorPorCodigo(totales.impuestos);
  const ice = grupos.get(CODIGO_IMPUESTO_ICE);
  if (ice !== void 0) {
    filas.push(["ICE", (0, import_sri_ec.fromCents)(ice)]);
  }
  filas.push([`IVA${sufijoTarifaIva(totales.impuestos)}`, (0, import_sri_ec.fromCents)(grupos.get(CODIGO_IMPUESTO_IVA) ?? 0)]);
  for (const [codigo, cents] of grupos) {
    if (codigo === CODIGO_IMPUESTO_ICE || codigo === CODIGO_IMPUESTO_IVA) continue;
    filas.push([LABEL_IMPUESTO[codigo] ?? `OTRO IMPUESTO (C\xD3DIGO ${codigo})`, (0, import_sri_ec.fromCents)(cents)]);
  }
  if (totales.conPropina) {
    filas.push(["PROPINA", (0, import_sri_ec.formatMonto)(totales.propina ?? "0.00", 2)]);
  } else if (totales.propina) {
    filas.push(["PROPINA", (0, import_sri_ec.formatMonto)(totales.propina, 2)]);
  }
  if (noVacio(totales.moneda)) {
    filas.push(["MONEDA", totales.moneda]);
  }
  filas.push([etiquetas.valorTotal, (0, import_sri_ec.formatMonto)(totales.importeTotal, 2)]);
  return filas;
}
function filasSubsidio(totales) {
  if (!totales.conSubsidio) return [];
  return [
    ["VALOR TOTAL SIN SUBSIDIO", (0, import_sri_ec.formatMonto)(totales.importeTotal, 2)],
    ["AHORRO POR SUBSIDIO (incluye IVA cuando corresponda)", "0.00"]
  ];
}
function sufijoTarifaIva(impuestos) {
  const tarifas = new Set(
    impuestos.filter(
      (imp) => imp.codigo === CODIGO_IMPUESTO_IVA && imp.codigoPorcentaje !== CODIGO_PORCENTAJE_CERO && imp.codigoPorcentaje !== CODIGO_PORCENTAJE_NO_OBJETO && imp.codigoPorcentaje !== CODIGO_PORCENTAJE_EXENTO
    ).map((imp) => LABEL_CODIGO_PORCENTAJE[imp.codigoPorcentaje] ?? imp.codigoPorcentaje)
  );
  return tarifas.size === 1 ? ` ${[...tarifas][0]}` : "";
}
function medirTotales(doc, totales, ancho) {
  const columnas = columnasTotales(ancho);
  let alto = medirTablaGenerica(doc, columnas, filasTotales(totales), OPCIONES_TABLA_TOTALES);
  const subsidio = filasSubsidio(totales);
  if (subsidio.length > 0) {
    alto += SEPARACION_SUBSIDIO + medirTablaGenerica(doc, columnas, subsidio, OPCIONES_TABLA_SUBSIDIO);
  }
  return alto;
}
function drawFormasPago(doc, pagos, area) {
  return drawTablaGenerica(doc, columnasFormasPago(area.width), filasFormasPago(pagos), area);
}
function columnasFormasPago(ancho) {
  return construirColumnas(ancho, [
    ["Forma de Pago", 0.72, "left"],
    ["Valor", 0.28, "right"]
  ]);
}
function filasFormasPago(pagos) {
  return pagos.map((pago) => {
    const partes = [LABEL_FORMA_PAGO[pago.formaPago] ?? pago.formaPago];
    if (pago.plazo) partes.push(`Plazo: ${pago.plazo}`);
    if (pago.unidadTiempo) partes.push(`Unidad de Tiempo: ${pago.unidadTiempo}`);
    return [partes.join(" \u2014 "), (0, import_sri_ec.formatMonto)(pago.total, 2)];
  });
}
function medirFormasPago(doc, pagos, ancho) {
  return medirTablaGenerica(doc, columnasFormasPago(ancho), filasFormasPago(pagos));
}
function drawInfoAdicional(doc, infoAdicional, area, altoMinimo) {
  const lineas = lineasInfoAdicional(infoAdicional, area.width);
  if (lineas.length === 0) {
    return area.y;
  }
  return dibujarCaja(doc, area, lineas, { titulo: TITULO_INFO_ADICIONAL, altoMinimo });
}
var TITULO_INFO_ADICIONAL = "Informaci\xF3n Adicional";
function lineasInfoAdicional(infoAdicional, anchoArea) {
  const entradas = infoAdicional ? Object.entries(infoAdicional).filter(([, valor]) => noVacio(valor)) : [];
  if (entradas.length === 0) {
    return [];
  }
  const anchoCaja = anchoArea - PADDING_CAJA * 2;
  const anchoClave = Math.floor(anchoCaja * 0.4);
  return [
    { texto: TITULO_INFO_ADICIONAL, negrita: true, tamano: TAMANO_TITULO },
    { texto: "", espaciador: ESPACIO_LINEA * 2 },
    // Clave y valor en dos columnas, como en la maqueta (`Dirección` /
    // `Salinas y Santiago 123456789`), no concatenados con dos puntos.
    ...entradas.map(([clave, valor]) => ({
      texto: `${clave}: ${valor}`,
      columnas: [
        { texto: clave, ancho: anchoClave },
        { texto: valor, ancho: anchoCaja - anchoClave }
      ]
    }))
  ];
}
function medirInfoAdicional(doc, infoAdicional, ancho) {
  const lineas = lineasInfoAdicional(infoAdicional, ancho);
  return lineas.length === 0 ? 0 : medirCaja(doc, lineas, ancho);
}
var FRACCION_PIE_IZQUIERDA = 0.6;
var SEPARACION_PIE = 8;
function drawPie(doc, contenido, area) {
  const { anchoIzquierda, anchoDerecha } = anchosPie(area.width);
  const xDerecha = area.x + anchoIzquierda + SEPARACION_COLUMNAS;
  const altoInfo = medirInfoAdicional(doc, contenido.infoAdicional, anchoIzquierda);
  const altoPagos = contenido.pagos?.length ? medirFormasPago(doc, contenido.pagos, anchoIzquierda) : 0;
  const altoIzquierda = altoInfo + (altoInfo > 0 && altoPagos > 0 ? SEPARACION_PIE : 0) + altoPagos;
  const altoDerecha = contenido.totales ? medirTotales(doc, contenido.totales, anchoDerecha) : 0;
  return drawBloquesEnFila(
    doc,
    area.y,
    altoIzquierda,
    altoDerecha,
    (yFila) => {
      let y = yFila;
      if (altoInfo > 0) {
        const altoCaja = altoInfo + Math.max(0, altoDerecha - altoIzquierda);
        y = drawInfoAdicional(doc, contenido.infoAdicional, { x: area.x, y, width: anchoIzquierda }, altoCaja);
        if (altoPagos > 0) y += SEPARACION_PIE;
      }
      if (altoPagos > 0) {
        y = drawFormasPago(doc, contenido.pagos, { x: area.x, y, width: anchoIzquierda });
      }
      return y;
    },
    (yFila) => contenido.totales ? drawTotales(doc, contenido.totales, { x: xDerecha, y: yFila, width: anchoDerecha }) : yFila,
    SEPARACION_PIE
  );
}
function medirPie(doc, contenido, ancho) {
  const { anchoIzquierda, anchoDerecha } = anchosPie(ancho);
  const altoInfo = medirInfoAdicional(doc, contenido.infoAdicional, anchoIzquierda);
  const altoPagos = contenido.pagos?.length ? medirFormasPago(doc, contenido.pagos, anchoIzquierda) : 0;
  return Math.max(
    altoInfo + (altoInfo > 0 && altoPagos > 0 ? SEPARACION_PIE : 0) + altoPagos,
    contenido.totales ? medirTotales(doc, contenido.totales, anchoDerecha) : 0
  );
}
function anchosPie(ancho) {
  const anchoIzquierda = Math.floor((ancho - SEPARACION_COLUMNAS) * FRACCION_PIE_IZQUIERDA);
  return { anchoIzquierda, anchoDerecha: ancho - anchoIzquierda - SEPARACION_COLUMNAS };
}
function drawBloqueTexto(doc, titulo, lineas, area) {
  return dibujarCaja(doc, area, lineasBloqueTexto(titulo, lineas), { titulo });
}
function lineasBloqueTexto(titulo, lineas) {
  return [
    { texto: titulo, negrita: true, tamano: TAMANO_TITULO },
    ...lineas.map((texto) => ({ texto }))
  ];
}
function medirBloqueTexto(doc, titulo, lineas, ancho) {
  return medirCaja(doc, lineasBloqueTexto(titulo, lineas), ancho);
}

// src/ride/deps.ts
var import_sri_ec2 = require("sri-ec");
var MENSAJE_DEPENDENCIAS_FALTANTES = "Para generar el RIDE instala las dependencias opcionales: npm install pdfkit qrcode";
function esModuloNoEncontrado(err) {
  const codigoEsNoEncontrado = (code) => code === "ERR_MODULE_NOT_FOUND" || code === "MODULE_NOT_FOUND";
  if (codigoEsNoEncontrado(err?.code)) return true;
  return codigoEsNoEncontrado(err?.cause?.code);
}
async function cargarPdfkit() {
  try {
    const mod = await import("pdfkit");
    return mod.default;
  } catch (err) {
    if (!esModuloNoEncontrado(err)) throw err;
    throw new import_sri_ec2.SriError(MENSAJE_DEPENDENCIAS_FALTANTES, "RIDE_MISSING_DEPENDENCY");
  }
}
async function cargarQrcode() {
  try {
    const mod = await import("qrcode");
    return mod;
  } catch (err) {
    if (!esModuloNoEncontrado(err)) throw err;
    throw new import_sri_ec2.SriError(MENSAJE_DEPENDENCIAS_FALTANTES, "RIDE_MISSING_DEPENDENCY");
  }
}

// src/ride/pdf-doc.ts
var MARGEN = 36;
async function crearDocumentoRide(tamano = "A4") {
  const PDFDocumentCtor = await cargarPdfkit();
  const doc = new PDFDocumentCtor({
    size: tamano,
    margin: MARGEN,
    bufferPages: true,
    autoFirstPage: true
  });
  const chunks = [];
  doc.on("data", (chunk) => chunks.push(chunk));
  const bytesListos = new Promise((resolve, reject) => {
    doc.on("end", () => resolve(new Uint8Array(Buffer.concat(chunks))));
    doc.on("error", (error) => reject(error));
  });
  return {
    doc,
    finalizar: async () => {
      doc.end();
      return bytesListos;
    }
  };
}

// src/ride/qr.ts
var QR_WIDTH_DEFAULT = 300;
async function generarQr(texto, width = QR_WIDTH_DEFAULT) {
  const QRCode = await cargarQrcode();
  return QRCode.toBuffer(texto, { type: "png", margin: 1, width });
}

// src/ride/factura.ride.ts
var ESPACIADO_BLOQUE = 10;
async function generarRideFactura(opciones) {
  const { documento, claveAcceso, autorizacion, logo } = opciones;
  const codigoBarras = opciones.opciones?.codigoBarras ?? true;
  const incluirQr = opciones.opciones?.incluirQr ?? false;
  const tamano = opciones.opciones?.tamano ?? "A4";
  const { doc, finalizar } = await crearDocumentoRide(tamano);
  const qr = incluirQr ? await generarQr(claveAcceso) : void 0;
  const margenX = doc.page.margins.left;
  const anchoUtil = doc.page.width - doc.page.margins.left - doc.page.margins.right;
  let y = doc.page.margins.top;
  const emisor = {
    logo,
    razonSocial: documento.infoTributaria.razonSocial,
    nombreComercial: documento.infoTributaria.nombreComercial,
    dirMatriz: documento.infoTributaria.dirMatriz,
    // dirEstablecimiento/contribuyenteEspecial: fix round 1, gap real
    // confirmado del reviewer — Factura era el único de los 6 comprobantes
    // que no los modelaba (ver `documents/factura.ts`).
    dirEstablecimiento: documento.dirEstablecimiento,
    obligadoContabilidad: documento.obligadoContabilidad,
    contribuyenteEspecial: documento.contribuyenteEspecial,
    agenteRetencion: documento.infoTributaria.agenteRetencion,
    regimenRimpe: documento.infoTributaria.regimenRimpe
  };
  const comprobante = {
    ruc: documento.infoTributaria.ruc,
    nombreDocumento: nombreDocumento(documento.tipo),
    numero: formatNumeroComprobante(documento.infoTributaria),
    ambiente: documento.infoTributaria.ambiente,
    tipoEmision: documento.infoTributaria.tipoEmision ?? "1" /* Normal */,
    claveAcceso,
    autorizacion
  };
  const cabecera = { emisor, comprobante, qr, codigoBarras };
  y = asegurarEspacio(doc, y, medirCabecera(doc, cabecera, anchoUtil));
  y = drawCabecera(doc, cabecera, { x: margenX, y, width: anchoUtil }) + ESPACIADO_BLOQUE;
  const comprador = {
    razonSocial: documento.razonSocialComprador,
    identificacion: documento.identificacionComprador,
    tipoIdentificacion: documento.tipoIdentificacionComprador,
    fechaEmision: documento.fechaEmision,
    direccion: documento.direccionComprador,
    guiaRemision: documento.guiaRemision
  };
  y = asegurarEspacio(doc, y, medirComprador(doc, comprador, anchoUtil));
  y = drawComprador(doc, comprador, { x: margenX, y, width: anchoUtil }) + ESPACIADO_BLOQUE;
  y = drawTablaDetalles(doc, documento.detalles, { x: margenX, y, width: anchoUtil }) + ESPACIADO_BLOQUE;
  const totales = {
    impuestos: documento.totalConImpuestos,
    totalSinImpuestos: documento.totalSinImpuestos,
    totalDescuento: documento.totalDescuento,
    propina: documento.propina,
    importeTotal: documento.importeTotal,
    moneda: documento.moneda,
    // `PROPINA` y el recuadro de subsidios son filas fijas de la maqueta de la
    // factura (los otros comprobantes no las llevan).
    conPropina: true,
    conSubsidio: true
  };
  const pie = { infoAdicional: documento.infoAdicional, pagos: documento.pagos, totales };
  y = asegurarEspacio(doc, y, medirPie(doc, pie, anchoUtil));
  drawPie(doc, pie, { x: margenX, y, width: anchoUtil });
  return finalizar();
}

// src/ride/guia-remision.ride.ts
var ESPACIADO_BLOQUE2 = 10;
var FRACCIONES_DOS_PARES = [0.26, 0.32, 0.19, 0.23];
var DESTINATARIO_DETALLE_COLUMN_SPECS = [
  ["Cantidad", 0.12, "right"],
  ["Descripcion", 0.48, "left"],
  ["C\xF3digo Principal", 0.2, "left"],
  ["C\xF3digo Auxiliar", 0.2, "left"]
];
function celdasDestinatarioDetalle(d) {
  const extras = d.detallesAdicionales ? `
${Object.entries(d.detallesAdicionales).map(([k, v]) => `${k}: ${v}`).join("\n")}` : "";
  return [
    formatCantidadPrecision(d.cantidad),
    `${d.descripcion}${extras}`,
    d.codigoInterno ?? "",
    d.codigoAdicional ?? ""
  ];
}
function filasDestinatario(destinatario) {
  const filas = [];
  if (destinatario.codDocSustento || destinatario.numDocSustento) {
    const tipo = destinatario.codDocSustento ? nombreDocumentoPorCodigo(destinatario.codDocSustento).toUpperCase() : "";
    const comprobante = [tipo, destinatario.numDocSustento ?? ""].filter((parte) => parte !== "").join("   ");
    filas.push(
      destinatario.fechaEmisionDocSustento ? {
        izquierda: { etiqueta: "Comprobante de Venta:", valor: comprobante },
        derecha: { etiqueta: "Fecha de Emisi\xF3n:", valor: destinatario.fechaEmisionDocSustento },
        fracciones: FRACCIONES_DOS_PARES
      } : { izquierda: { etiqueta: "Comprobante de Venta:", valor: comprobante } }
    );
  }
  const pares = [
    ["N\xFAmero de Autorizaci\xF3n:", destinatario.numAutDocSustento],
    ["Motivo Traslado:", destinatario.motivoTraslado],
    ["Destino(Punto de llegada)", destinatario.dirDestinatario],
    ["Identificaci\xF3n (Destinatario)", destinatario.identificacionDestinatario],
    ["Raz\xF3n Social/Nombres Apellidos", destinatario.razonSocialDestinatario],
    ["Documento Aduanero", destinatario.docAduaneroUnico],
    ["C\xF3digo Establecimiento Destino", destinatario.codEstabDestino],
    ["Ruta:", destinatario.ruta]
  ];
  for (const [etiqueta, valor] of pares) {
    if (valor !== void 0 && valor.trim() !== "") {
      filas.push({ izquierda: { etiqueta, valor } });
    }
  }
  return filas;
}
async function generarRideGuiaRemision(opciones) {
  const { documento, claveAcceso, autorizacion, logo } = opciones;
  const codigoBarras = opciones.opciones?.codigoBarras ?? true;
  const incluirQr = opciones.opciones?.incluirQr ?? false;
  const tamano = opciones.opciones?.tamano ?? "A4";
  const { doc, finalizar } = await crearDocumentoRide(tamano);
  const qr = incluirQr ? await generarQr(claveAcceso) : void 0;
  const margenX = doc.page.margins.left;
  const anchoUtil = doc.page.width - doc.page.margins.left - doc.page.margins.right;
  let y = doc.page.margins.top;
  const emisor = {
    logo,
    razonSocial: documento.infoTributaria.razonSocial,
    nombreComercial: documento.infoTributaria.nombreComercial,
    dirMatriz: documento.infoTributaria.dirMatriz,
    dirEstablecimiento: documento.dirEstablecimiento,
    obligadoContabilidad: documento.obligadoContabilidad,
    contribuyenteEspecial: documento.contribuyenteEspecial,
    agenteRetencion: documento.infoTributaria.agenteRetencion,
    regimenRimpe: documento.infoTributaria.regimenRimpe,
    rise: documento.rise
  };
  const comprobante = {
    ruc: documento.infoTributaria.ruc,
    nombreDocumento: nombreDocumento(documento.tipo),
    numero: formatNumeroComprobante(documento.infoTributaria),
    ambiente: documento.infoTributaria.ambiente,
    tipoEmision: documento.infoTributaria.tipoEmision ?? "1" /* Normal */,
    claveAcceso,
    autorizacion
  };
  const cabecera = { emisor, comprobante, qr, codigoBarras };
  y = asegurarEspacio(doc, y, medirCabecera(doc, cabecera, anchoUtil));
  y = drawCabecera(doc, cabecera, { x: margenX, y, width: anchoUtil }) + ESPACIADO_BLOQUE2;
  const filasTransportista = [
    {
      izquierda: {
        etiqueta: "Identificaci\xF3n (Transportista)",
        valor: identificacionConTipo(documento.rucTransportista, documento.tipoIdentificacionTransportista)
      }
    },
    { izquierda: { etiqueta: "Raz\xF3n Social / Nombres y Apellidos:", valor: documento.razonSocialTransportista } },
    { izquierda: { etiqueta: "Placa:", valor: documento.placa } },
    { izquierda: { etiqueta: "Punto de Partida:", valor: documento.dirPartida } },
    {
      izquierda: { etiqueta: "Fecha inicio Transporte", valor: documento.fechaIniTransporte },
      derecha: { etiqueta: "Fecha fin Transporte", valor: documento.fechaFinTransporte },
      fracciones: FRACCIONES_DOS_PARES
    }
  ];
  y = asegurarEspacio(doc, y, medirBandaSujeto(doc, filasTransportista, anchoUtil));
  y = drawBandaSujeto(doc, filasTransportista, { x: margenX, y, width: anchoUtil }) + ESPACIADO_BLOQUE2;
  const columnasDetalle = construirColumnas(anchoUtil, DESTINATARIO_DETALLE_COLUMN_SPECS);
  for (const destinatario of documento.destinatarios) {
    const filas = filasDestinatario(destinatario);
    y = asegurarEspacio(doc, y, medirBandaSujeto(doc, filas, anchoUtil));
    y = drawBandaSujeto(doc, filas, { x: margenX, y, width: anchoUtil }) + ESPACIADO_BLOQUE2;
    const filasDetalle = destinatario.detalles.map(celdasDestinatarioDetalle);
    y = drawTablaGenerica(doc, columnasDetalle, filasDetalle, { x: margenX, y, width: anchoUtil }) + ESPACIADO_BLOQUE2;
  }
  const pie = { infoAdicional: documento.infoAdicional };
  y = asegurarEspacio(doc, y, medirPie(doc, pie, anchoUtil));
  drawPie(doc, pie, { x: margenX, y, width: anchoUtil });
  return finalizar();
}

// src/ride/liquidacion-compra.ride.ts
var ESPACIADO_BLOQUE3 = 10;
var OPCIONES_DETALLE = { detallesAdicionales: 1, etiquetas: ETIQUETAS_DETALLE_COMPLETAS };
var ETIQUETAS_TOTALES = {
  subtotalCero: "SUBTOTAL 0%",
  subtotalNoObjeto: "SUBTOTAL NO OBJETO DE IVA",
  subtotalExento: "SUBTOTAL EXENTO DE IVA",
  descuento: "TOTAL DESCUENTO"
};
async function generarRideLiquidacionCompra(opciones) {
  const { documento, claveAcceso, autorizacion, logo } = opciones;
  const codigoBarras = opciones.opciones?.codigoBarras ?? true;
  const incluirQr = opciones.opciones?.incluirQr ?? false;
  const tamano = opciones.opciones?.tamano ?? "A4";
  const { doc, finalizar } = await crearDocumentoRide(tamano);
  const qr = incluirQr ? await generarQr(claveAcceso) : void 0;
  const margenX = doc.page.margins.left;
  const anchoUtil = doc.page.width - doc.page.margins.left - doc.page.margins.right;
  let y = doc.page.margins.top;
  const emisor = {
    logo,
    razonSocial: documento.infoTributaria.razonSocial,
    nombreComercial: documento.infoTributaria.nombreComercial,
    dirMatriz: documento.infoTributaria.dirMatriz,
    dirEstablecimiento: documento.dirEstablecimiento,
    obligadoContabilidad: documento.obligadoContabilidad,
    contribuyenteEspecial: documento.contribuyenteEspecial,
    agenteRetencion: documento.infoTributaria.agenteRetencion,
    regimenRimpe: documento.infoTributaria.regimenRimpe
  };
  const comprobante = {
    ruc: documento.infoTributaria.ruc,
    nombreDocumento: nombreDocumento(documento.tipo),
    numero: formatNumeroComprobante(documento.infoTributaria),
    ambiente: documento.infoTributaria.ambiente,
    tipoEmision: documento.infoTributaria.tipoEmision ?? "1" /* Normal */,
    claveAcceso,
    autorizacion
  };
  const cabecera = { emisor, comprobante, qr, codigoBarras };
  y = asegurarEspacio(doc, y, medirCabecera(doc, cabecera, anchoUtil));
  y = drawCabecera(doc, cabecera, { x: margenX, y, width: anchoUtil }) + ESPACIADO_BLOQUE3;
  const filasProveedor = [
    { izquierda: { etiqueta: "Nombres y Apellidos:", valor: documento.razonSocialProveedor } },
    {
      izquierda: {
        etiqueta: "Identificaci\xF3n:",
        valor: identificacionConTipo(documento.identificacionProveedor, documento.tipoIdentificacionProveedor)
      }
    },
    { izquierda: { etiqueta: "Fecha Emision:", valor: documento.fechaEmision } }
  ];
  if (documento.direccionProveedor !== void 0 && documento.direccionProveedor.trim() !== "") {
    filasProveedor.push({ izquierda: { etiqueta: "Direcci\xF3n:", valor: documento.direccionProveedor } });
  }
  y = asegurarEspacio(doc, y, medirBandaSujeto(doc, filasProveedor, anchoUtil));
  y = drawBandaSujeto(doc, filasProveedor, { x: margenX, y, width: anchoUtil }) + ESPACIADO_BLOQUE3;
  y = drawTablaDetalles(doc, documento.detalles, { x: margenX, y, width: anchoUtil }, OPCIONES_DETALLE) + ESPACIADO_BLOQUE3;
  const totales = {
    impuestos: documento.totalConImpuestos,
    totalSinImpuestos: documento.totalSinImpuestos,
    totalDescuento: documento.totalDescuento,
    importeTotal: documento.importeTotal,
    moneda: documento.moneda,
    etiquetas: ETIQUETAS_TOTALES
  };
  const pie = { infoAdicional: documento.infoAdicional, pagos: documento.pagos, totales };
  y = asegurarEspacio(doc, y, medirPie(doc, pie, anchoUtil));
  drawPie(doc, pie, { x: margenX, y, width: anchoUtil });
  return finalizar();
}

// src/ride/nota-credito.ride.ts
var ESPACIADO_BLOQUE4 = 10;
var OPCIONES_DETALLE2 = { subsidio: false, etiquetas: ETIQUETAS_DETALLE_COMPLETAS };
async function generarRideNotaCredito(opciones) {
  const { documento, claveAcceso, autorizacion, logo } = opciones;
  const codigoBarras = opciones.opciones?.codigoBarras ?? true;
  const incluirQr = opciones.opciones?.incluirQr ?? false;
  const tamano = opciones.opciones?.tamano ?? "A4";
  const { doc, finalizar } = await crearDocumentoRide(tamano);
  const qr = incluirQr ? await generarQr(claveAcceso) : void 0;
  const margenX = doc.page.margins.left;
  const anchoUtil = doc.page.width - doc.page.margins.left - doc.page.margins.right;
  let y = doc.page.margins.top;
  const emisor = {
    logo,
    razonSocial: documento.infoTributaria.razonSocial,
    nombreComercial: documento.infoTributaria.nombreComercial,
    dirMatriz: documento.infoTributaria.dirMatriz,
    dirEstablecimiento: documento.dirEstablecimiento,
    obligadoContabilidad: documento.obligadoContabilidad,
    contribuyenteEspecial: documento.contribuyenteEspecial,
    agenteRetencion: documento.infoTributaria.agenteRetencion,
    regimenRimpe: documento.infoTributaria.regimenRimpe,
    rise: documento.rise
  };
  const comprobante = {
    ruc: documento.infoTributaria.ruc,
    nombreDocumento: nombreDocumento(documento.tipo),
    numero: formatNumeroComprobante(documento.infoTributaria),
    ambiente: documento.infoTributaria.ambiente,
    tipoEmision: documento.infoTributaria.tipoEmision ?? "1" /* Normal */,
    claveAcceso,
    autorizacion
  };
  const cabecera = { emisor, comprobante, qr, codigoBarras };
  y = asegurarEspacio(doc, y, medirCabecera(doc, cabecera, anchoUtil));
  y = drawCabecera(doc, cabecera, { x: margenX, y, width: anchoUtil }) + ESPACIADO_BLOQUE4;
  const comprador = {
    razonSocial: documento.razonSocialComprador,
    identificacion: documento.identificacionComprador,
    tipoIdentificacion: documento.tipoIdentificacionComprador,
    fechaEmision: documento.fechaEmision
  };
  y = asegurarEspacio(doc, y, medirComprador(doc, comprador, anchoUtil));
  y = drawComprador(doc, comprador, { x: margenX, y, width: anchoUtil }) + ESPACIADO_BLOQUE4;
  y = asegurarEspacio(doc, y, medirBandaSujeto(doc, filasModifica(documento), anchoUtil));
  y = drawBandaSujeto(doc, filasModifica(documento), { x: margenX, y, width: anchoUtil }) + ESPACIADO_BLOQUE4;
  y = drawTablaDetalles(doc, documento.detalles, { x: margenX, y, width: anchoUtil }, OPCIONES_DETALLE2) + ESPACIADO_BLOQUE4;
  const totales = {
    impuestos: documento.totalConImpuestos,
    totalSinImpuestos: documento.totalSinImpuestos,
    importeTotal: documento.valorModificacion,
    moneda: documento.moneda
  };
  const pie = { infoAdicional: documento.infoAdicional, totales };
  y = asegurarEspacio(doc, y, medirPie(doc, pie, anchoUtil));
  drawPie(doc, pie, { x: margenX, y, width: anchoUtil });
  return finalizar();
}
function filasModifica(documento) {
  return [
    {
      izquierda: {
        etiqueta: "Comprobante que se modifica",
        valor: nombreDocumentoPorCodigo(documento.codDocModificado).toUpperCase()
      },
      derecha: { etiqueta: "", valor: documento.numDocModificado }
    },
    {
      izquierda: {
        etiqueta: "Fecha Emisi\xF3n (Comprobante a modificar)",
        valor: documento.fechaEmisionDocSustento
      }
    },
    { izquierda: { etiqueta: "Raz\xF3n de Modificaci\xF3n:", valor: documento.motivo } }
  ];
}

// src/ride/nota-debito.ride.ts
var import_sri_ec3 = require("sri-ec");
var ESPACIADO_BLOQUE5 = 10;
var MOTIVO_COLUMN_SPECS = [
  ["RAZ\xD3N DE LA MODIFICACI\xD3N", 0.55, "left"],
  ["VALOR DE LA MODIFICACI\xD3N", 0.45, "right"]
];
async function generarRideNotaDebito(opciones) {
  const { documento, claveAcceso, autorizacion, logo } = opciones;
  const codigoBarras = opciones.opciones?.codigoBarras ?? true;
  const incluirQr = opciones.opciones?.incluirQr ?? false;
  const tamano = opciones.opciones?.tamano ?? "A4";
  const { doc, finalizar } = await crearDocumentoRide(tamano);
  const qr = incluirQr ? await generarQr(claveAcceso) : void 0;
  const margenX = doc.page.margins.left;
  const anchoUtil = doc.page.width - doc.page.margins.left - doc.page.margins.right;
  let y = doc.page.margins.top;
  const emisor = {
    logo,
    razonSocial: documento.infoTributaria.razonSocial,
    nombreComercial: documento.infoTributaria.nombreComercial,
    dirMatriz: documento.infoTributaria.dirMatriz,
    dirEstablecimiento: documento.dirEstablecimiento,
    obligadoContabilidad: documento.obligadoContabilidad,
    contribuyenteEspecial: documento.contribuyenteEspecial,
    agenteRetencion: documento.infoTributaria.agenteRetencion,
    regimenRimpe: documento.infoTributaria.regimenRimpe,
    rise: documento.rise
  };
  const comprobante = {
    ruc: documento.infoTributaria.ruc,
    nombreDocumento: nombreDocumento(documento.tipo),
    numero: formatNumeroComprobante(documento.infoTributaria),
    ambiente: documento.infoTributaria.ambiente,
    tipoEmision: documento.infoTributaria.tipoEmision ?? "1" /* Normal */,
    claveAcceso,
    autorizacion
  };
  const cabecera = { emisor, comprobante, qr, codigoBarras };
  y = asegurarEspacio(doc, y, medirCabecera(doc, cabecera, anchoUtil));
  y = drawCabecera(doc, cabecera, { x: margenX, y, width: anchoUtil }) + ESPACIADO_BLOQUE5;
  const comprador = {
    razonSocial: documento.razonSocialComprador,
    identificacion: documento.identificacionComprador,
    tipoIdentificacion: documento.tipoIdentificacionComprador,
    fechaEmision: documento.fechaEmision
  };
  y = asegurarEspacio(doc, y, medirComprador(doc, comprador, anchoUtil));
  y = drawComprador(doc, comprador, { x: margenX, y, width: anchoUtil }) + ESPACIADO_BLOQUE5;
  const filasModifica2 = [
    {
      izquierda: {
        etiqueta: "Comprobante que se modifica",
        valor: nombreDocumentoPorCodigo(documento.codDocModificado).toUpperCase()
      },
      derecha: { etiqueta: "", valor: documento.numDocModificado }
    },
    {
      izquierda: {
        etiqueta: "Fecha Emisi\xF3n (Comprobante a modificar)",
        valor: documento.fechaEmisionDocSustento
      }
    }
  ];
  y = asegurarEspacio(doc, y, medirBandaSujeto(doc, filasModifica2, anchoUtil));
  y = drawBandaSujeto(doc, filasModifica2, { x: margenX, y, width: anchoUtil }) + ESPACIADO_BLOQUE5;
  const columnasMotivos = construirColumnas(anchoUtil, MOTIVO_COLUMN_SPECS);
  const filasMotivos = documento.motivos.map((motivo) => [motivo.razon, (0, import_sri_ec3.formatMonto)(motivo.valor, 2)]);
  y = drawTablaGenerica(doc, columnasMotivos, filasMotivos, { x: margenX, y, width: anchoUtil }) + ESPACIADO_BLOQUE5;
  const totales = {
    impuestos: documento.impuestos,
    totalSinImpuestos: documento.totalSinImpuestos,
    importeTotal: documento.valorTotal
  };
  const pie = { infoAdicional: documento.infoAdicional, pagos: documento.pagos, totales };
  y = asegurarEspacio(doc, y, medirPie(doc, pie, anchoUtil));
  drawPie(doc, pie, { x: margenX, y, width: anchoUtil });
  return finalizar();
}

// src/ride/retencion.ride.ts
var import_sri_ec4 = require("sri-ec");
var ESPACIADO_BLOQUE6 = 10;
var RETENCION_COLUMN_SPECS = [
  ["Comprobante", 0.115, "left"],
  ["N\xFAmero", 0.15, "left"],
  ["Fecha Emisi\xF3n", 0.115, "center"],
  ["Ejercicio Fiscal", 0.11, "center"],
  ["Base Imponible para la Retenci\xF3n", 0.16, "right"],
  ["IMPUESTO", 0.12, "center"],
  ["Porcentaje Retenci\xF3n", 0.11, "right"],
  ["Valor Retenido", 0.12, "right"]
];
var LABEL_IMPUESTO_RETENCION = {
  "1": "RENTA",
  "2": "IVA",
  "6": "ISD"
};
function filasRetenciones(docsSustento, periodoFiscal) {
  const filas = [];
  for (const docSustento of docsSustento) {
    const identificacion = [
      nombreDocumentoPorCodigo(docSustento.codDocSustento).toUpperCase(),
      docSustento.numDocSustento,
      docSustento.fechaEmisionDocSustento,
      periodoFiscal
    ];
    if (docSustento.retenciones.length === 0) {
      filas.push([...identificacion, "", "", "", ""]);
      continue;
    }
    for (const retencion of docSustento.retenciones) {
      const impuesto = LABEL_IMPUESTO_RETENCION[retencion.codigo] ?? retencion.codigo;
      filas.push([
        ...identificacion,
        (0, import_sri_ec4.formatMonto)(retencion.baseImponible, 2),
        `${impuesto} (${retencion.codigoRetencion})`,
        `${retencion.porcentajeRetener}%`,
        (0, import_sri_ec4.formatMonto)(retencion.valorRetenido, 2)
      ]);
    }
  }
  return filas;
}
function totalRetenido(docsSustento) {
  let cents = 0;
  for (const docSustento of docsSustento) {
    for (const retencion of docSustento.retenciones) {
      cents += (0, import_sri_ec4.toCents)(retencion.valorRetenido);
    }
  }
  return (0, import_sri_ec4.fromCents)(cents);
}
var TITULO_DOC_SUSTENTO_DETALLE = "DETALLE DE DOCUMENTOS SUSTENTO";
function lineasDocumentosSustentoDetalle(documento) {
  const lineas = [
    `Total Retenido: ${totalRetenido(documento.docsSustento)}`
  ];
  if (documento.tipoSujetoRetenido) {
    lineas.push(`Tipo de Sujeto Retenido: ${documento.tipoSujetoRetenido}`);
  }
  if (documento.parteRel) {
    lineas.push(`Parte Relacionada: ${documento.parteRel}`);
  }
  for (const docSustento of documento.docsSustento) {
    lineas.push(
      `Documento Sustento: ${docSustento.codDocSustento} - ${docSustento.numDocSustento} (C\xF3digo de Sustento: ${docSustento.codSustento})`
    );
    lineas.push(`Total sin Impuestos: ${docSustento.totalSinImpuestos}`);
    lineas.push(`Importe Total: ${docSustento.importeTotal}`);
    for (const imp of docSustento.impuestosDocSustento) {
      let linea = `Impuesto: c\xF3digo ${imp.codImpuestoDocSustento}, % ${imp.codigoPorcentaje}, base imponible ${imp.baseImponible}, tarifa ${imp.tarifa}%, valor ${imp.valorImpuesto}`;
      if (imp.factorProporcionalidad) {
        linea += `, factor de proporcionalidad ${imp.factorProporcionalidad}`;
      }
      if (imp.baseImponibleModificada) {
        linea += `, base imponible modificada ${imp.baseImponibleModificada}`;
      }
      lineas.push(linea);
    }
    for (const pago of docSustento.pagos) {
      lineas.push(`Pago: ${formaPagoLabel(pago.formaPago)} - ${pago.total}`);
    }
  }
  return lineas;
}
async function generarRideRetencion(opciones) {
  const { documento, claveAcceso, autorizacion, logo } = opciones;
  const codigoBarras = opciones.opciones?.codigoBarras ?? true;
  const incluirQr = opciones.opciones?.incluirQr ?? false;
  const tamano = opciones.opciones?.tamano ?? "A4";
  const { doc, finalizar } = await crearDocumentoRide(tamano);
  const qr = incluirQr ? await generarQr(claveAcceso) : void 0;
  const margenX = doc.page.margins.left;
  const anchoUtil = doc.page.width - doc.page.margins.left - doc.page.margins.right;
  let y = doc.page.margins.top;
  const emisor = {
    logo,
    razonSocial: documento.infoTributaria.razonSocial,
    nombreComercial: documento.infoTributaria.nombreComercial,
    dirMatriz: documento.infoTributaria.dirMatriz,
    dirEstablecimiento: documento.dirEstablecimiento,
    obligadoContabilidad: documento.obligadoContabilidad,
    contribuyenteEspecial: documento.contribuyenteEspecial,
    agenteRetencion: documento.infoTributaria.agenteRetencion,
    regimenRimpe: documento.infoTributaria.regimenRimpe
  };
  const comprobante = {
    ruc: documento.infoTributaria.ruc,
    nombreDocumento: nombreDocumento(documento.tipo),
    numero: formatNumeroComprobante(documento.infoTributaria),
    ambiente: documento.infoTributaria.ambiente,
    tipoEmision: documento.infoTributaria.tipoEmision ?? "1" /* Normal */,
    claveAcceso,
    autorizacion
  };
  const cabecera = { emisor, comprobante, qr, codigoBarras };
  y = asegurarEspacio(doc, y, medirCabecera(doc, cabecera, anchoUtil));
  y = drawCabecera(doc, cabecera, { x: margenX, y, width: anchoUtil }) + ESPACIADO_BLOQUE6;
  const sujetoRetenido = {
    razonSocial: documento.razonSocialSujetoRetenido,
    identificacion: documento.identificacionSujetoRetenido,
    tipoIdentificacion: documento.tipoIdentificacionSujetoRetenido,
    fechaEmision: documento.fechaEmision
  };
  y = asegurarEspacio(doc, y, medirComprador(doc, sujetoRetenido, anchoUtil));
  y = drawComprador(doc, sujetoRetenido, { x: margenX, y, width: anchoUtil }) + ESPACIADO_BLOQUE6;
  const columnas = construirColumnas(anchoUtil, RETENCION_COLUMN_SPECS);
  const filas = filasRetenciones(documento.docsSustento, documento.periodoFiscal);
  y = drawTablaGenerica(doc, columnas, filas, { x: margenX, y, width: anchoUtil }) + ESPACIADO_BLOQUE6;
  const lineasDetalleSustento = lineasDocumentosSustentoDetalle(documento);
  y = asegurarEspacio(doc, y, medirBloqueTexto(doc, TITULO_DOC_SUSTENTO_DETALLE, lineasDetalleSustento, anchoUtil));
  y = drawBloqueTexto(doc, TITULO_DOC_SUSTENTO_DETALLE, lineasDetalleSustento, { x: margenX, y, width: anchoUtil }) + ESPACIADO_BLOQUE6;
  const pie = { infoAdicional: documento.infoAdicional };
  y = asegurarEspacio(doc, y, medirPie(doc, pie, anchoUtil));
  drawPie(doc, pie, { x: margenX, y, width: anchoUtil });
  return finalizar();
}

// src/ride/index.ts
var import_sri_ec5 = require("sri-ec");
async function generarRide(opciones) {
  switch (opciones.documento.tipo) {
    case "01" /* Factura */:
      return generarRideFactura({ ...opciones, documento: opciones.documento });
    case "03" /* LiquidacionCompra */:
      return generarRideLiquidacionCompra({ ...opciones, documento: opciones.documento });
    case "04" /* NotaCredito */:
      return generarRideNotaCredito({ ...opciones, documento: opciones.documento });
    case "05" /* NotaDebito */:
      return generarRideNotaDebito({ ...opciones, documento: opciones.documento });
    case "06" /* GuiaRemision */:
      return generarRideGuiaRemision({ ...opciones, documento: opciones.documento });
    case "07" /* Retencion */:
      return generarRideRetencion({ ...opciones, documento: opciones.documento });
    default:
      throw new import_sri_ec5.SriError("Tipo de comprobante no soportado por el RIDE.", "RIDE_NOT_IMPLEMENTED");
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  generarQr,
  generarRide,
  generarRideFactura,
  generarRideGuiaRemision,
  generarRideLiquidacionCompra,
  generarRideNotaCredito,
  generarRideNotaDebito,
  generarRideRetencion
});
//# sourceMappingURL=index.cjs.map