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

// src/index.ts
var src_exports = {};
__export(src_exports, {
  Ambiente: () => Ambiente,
  BatchEmitter: () => BatchEmitter,
  BatchProcessor: () => BatchProcessor,
  CertificateError: () => CertificateError,
  CommunicationError: () => CommunicationError,
  FacturaXmlSerializer: () => FacturaXmlSerializer,
  FetchSoapTransport: () => FetchSoapTransport,
  FormaPago: () => FormaPago,
  GuiaRemisionXmlSerializer: () => GuiaRemisionXmlSerializer,
  InMemoryComprobanteRepository: () => InMemoryComprobanteRepository,
  LEYENDA_RIMPE: () => LEYENDA_RIMPE,
  LiquidacionCompraXmlSerializer: () => LiquidacionCompraXmlSerializer,
  NotaCreditoXmlSerializer: () => NotaCreditoXmlSerializer,
  NotaDebitoXmlSerializer: () => NotaDebitoXmlSerializer,
  NullRateLimiter: () => NullRateLimiter,
  RegimenRimpe: () => RegimenRimpe,
  RetencionXmlSerializer: () => RetencionXmlSerializer,
  RetryPolicy: () => RetryPolicy,
  SRI_RUC_URL: () => SRI_RUC_URL,
  SRI_URLS: () => SRI_URLS,
  SignatureError: () => SignatureError,
  SriClient: () => SriClient,
  SriError: () => SriError,
  SystemClock: () => SystemClock,
  TipoComprobante: () => TipoComprobante,
  TipoEmision: () => TipoEmision,
  ValidationError: () => ValidationError,
  XadesSigner: () => XadesSigner,
  XmlBuilder: () => XmlBuilder,
  XmlElement: () => XmlElement,
  assertClaveAccesoWireSegura: () => assertClaveAccesoWireSegura,
  assertValid: () => assertValid,
  buildAuthorizationEnvelope: () => buildAuthorizationEnvelope,
  buildReceptionEnvelope: () => buildReceptionEnvelope,
  calcularDigitoVerificador: () => calcularDigitoVerificador,
  camposAdicionalesField: () => camposAdicionalesField,
  certificateInfo: () => certificateInfo,
  checkCamposLocales: () => checkCamposLocales,
  contribuyenteEspecialField: () => contribuyenteEspecialField,
  createBatchItem: () => createBatchItem,
  destinatarioDetalleSchema: () => destinatarioDetalleSchema,
  destinatarioSchema: () => destinatarioSchema,
  detalleSchema: () => detalleSchema,
  dirEstablecimientoField: () => dirEstablecimientoField,
  docSustentoSchema: () => docSustentoSchema,
  esRucLocalValido: () => esRucLocalValido,
  escapeXml: () => escapeXml,
  estabPtoEmiField: () => estabPtoEmiField,
  facturaSchema: () => facturaSchema,
  fechaField: () => fechaField,
  formaPagoField: () => formaPagoField,
  formatMonto: () => formatMonto,
  fromCents: () => fromCents,
  generarClaveAcceso: () => generarClaveAcceso,
  guiaRemisionSchema: () => guiaRemisionSchema,
  impuestoDocSustentoRowSchema: () => impuestoDocSustentoRowSchema,
  impuestoSchema: () => impuestoSchema,
  incrementAttempts: () => incrementAttempts,
  infoTributariaSchema: () => infoTributariaSchema,
  isMonto: () => isMonto,
  isTerminal: () => isTerminal,
  liquidacionCompraSchema: () => liquidacionCompraSchema,
  loadCertificate: () => loadCertificate,
  markAuthorized: () => markAuthorized,
  markFailed: () => markFailed,
  markInProcess: () => markInProcess,
  markRejected: () => markRejected,
  markSent: () => markSent,
  montoField: () => montoField,
  motivoSchema: () => motivoSchema,
  nonEmptyString: () => nonEmptyString,
  notaCreditoSchema: () => notaCreditoSchema,
  notaDebitoSchema: () => notaDebitoSchema,
  obligadoContabilidadField: () => obligadoContabilidadField,
  pagoSchema: () => pagoSchema,
  pagoSustentoRowSchema: () => pagoSustentoRowSchema,
  parseAuthorization: () => parseAuthorization,
  parseCertificateFields: () => parseCertificateFields,
  parseReception: () => parseReception,
  razonSocialField: () => razonSocialField,
  retencionRowSchema: () => retencionRowSchema,
  retencionSchema: () => retencionSchema,
  rucField: () => rucField,
  schemaFor: () => schemaFor,
  secuencialField: () => secuencialField,
  selectCredential: () => selectCredential,
  serializeXmlDocument: () => serializeXmlDocument,
  serializerFor: () => serializerFor,
  toCents: () => toCents,
  totalImpuestoSchema: () => totalImpuestoSchema,
  validarRucChecksum: () => validarRucChecksum,
  validarRucLocal: () => validarRucLocal,
  validarRucOnline: () => validarRucOnline,
  validateBusiness: () => validateBusiness,
  writeInfoAdicional: () => writeInfoAdicional,
  writeInfoTributaria: () => writeInfoTributaria,
  zodIssuesToErrors: () => zodIssuesToErrors
});
module.exports = __toCommonJS(src_exports);

// src/batch/batch-item.ts
var TERMINAL_STATES = /* @__PURE__ */ new Set(["AUTHORIZED", "REJECTED", "FAILED"]);
function isTerminal(state) {
  return TERMINAL_STATES.has(state);
}
function createBatchItem(claveAcceso, signedXml) {
  return { claveAcceso, signedXml, state: "PENDING", attempts: 0, messages: [] };
}
function markSent(item, messages = []) {
  return { ...item, state: "SENT", messages };
}
function markAuthorized(item, numeroAutorizacion, authorizedXml, messages) {
  return {
    ...item,
    state: "AUTHORIZED",
    numeroAutorizacion: numeroAutorizacion ?? item.numeroAutorizacion,
    authorizedXml: authorizedXml ?? item.authorizedXml,
    messages
  };
}
function markRejected(item, messages) {
  return { ...item, state: "REJECTED", messages };
}
function markInProcess(item, messages) {
  return { ...item, state: "IN_PROCESS", attempts: item.attempts + 1, messages };
}
function markFailed(item, messages) {
  return { ...item, state: "FAILED", messages };
}
function incrementAttempts(item) {
  return { ...item, attempts: item.attempts + 1 };
}

// src/batch/comprobante-repository.ts
var EMPTY_COUNTS = {
  PENDING: 0,
  SENT: 0,
  AUTHORIZED: 0,
  REJECTED: 0,
  IN_PROCESS: 0,
  FAILED: 0
};
var InMemoryComprobanteRepository = class {
  items = /* @__PURE__ */ new Map();
  put(item) {
    this.items.set(item.claveAcceso, item);
  }
  get(claveAcceso) {
    return this.items.get(claveAcceso);
  }
  pending() {
    return [...this.items.values()].filter((item) => !isTerminal(item.state));
  }
  counts() {
    const counts = { ...EMPTY_COUNTS };
    for (const item of this.items.values()) {
      counts[item.state] += 1;
    }
    return counts;
  }
};

// src/batch/retry-policy.ts
var RetryPolicy = class {
  maxAttempts;
  baseDelaySeconds;
  maxDelaySeconds;
  constructor(options = {}) {
    this.maxAttempts = options.maxAttempts ?? 5;
    this.baseDelaySeconds = options.baseDelaySeconds ?? 3;
    this.maxDelaySeconds = options.maxDelaySeconds ?? 600;
  }
  /** `true` mientras `attempts` no alcance `maxAttempts` (mismo `<` estricto que el PHP). */
  shouldRetry(attempts) {
    return attempts < this.maxAttempts;
  }
  /** Segundos de espera antes del intento número `attempt` (1-indexado, igual que el PHP). */
  delaySeconds(attempt) {
    const delay = this.baseDelaySeconds * 2 ** (attempt - 1);
    return Math.min(delay, this.maxDelaySeconds);
  }
};

// src/errors/index.ts
var SriError = class _SriError extends Error {
  code;
  constructor(message, code) {
    super(message);
    this.code = code;
    this.name = "SriError";
    Object.setPrototypeOf(this, _SriError.prototype);
  }
};
var ValidationError = class _ValidationError extends SriError {
  errors;
  constructor(message, errors) {
    super(errors.length > 0 ? `${message}: ${errors.join("; ")}` : message, "VALIDATION");
    this.errors = errors;
    this.name = "ValidationError";
    Object.setPrototypeOf(this, _ValidationError.prototype);
  }
};
var CertificateError = class _CertificateError extends SriError {
  constructor(message) {
    super(message, "CERTIFICATE");
    this.name = "CertificateError";
    Object.setPrototypeOf(this, _CertificateError.prototype);
  }
};
var SignatureError = class _SignatureError extends SriError {
  constructor(message) {
    super(message, "SIGNATURE");
    this.name = "SignatureError";
    Object.setPrototypeOf(this, _SignatureError.prototype);
  }
};
var CommunicationError = class _CommunicationError extends SriError {
  cause;
  /** Clave de acceso del comprobante en vuelo, si el error viene de `emit()`. */
  claveAcceso;
  /** XML firmado del comprobante en vuelo, si el error viene de `emit()`. */
  signedXml;
  constructor(message, cause, context) {
    super(message, "COMMUNICATION");
    this.cause = cause;
    if (context?.claveAcceso !== void 0) {
      this.claveAcceso = context.claveAcceso;
    }
    if (context?.signedXml !== void 0) {
      this.signedXml = context.signedXml;
    }
    this.name = "CommunicationError";
    Object.setPrototypeOf(this, _CommunicationError.prototype);
  }
};

// src/batch/batch-processor.ts
var NullRateLimiter = class {
  throttle() {
  }
};
var BatchProcessor = class {
  transport;
  ambiente;
  retryPolicy;
  rateLimiter;
  constructor(transport, ambiente, options = {}) {
    this.transport = transport;
    this.ambiente = ambiente;
    this.retryPolicy = options.retryPolicy ?? new RetryPolicy();
    this.rateLimiter = options.rateLimiter ?? new NullRateLimiter();
  }
  /** El RUC ocupa 13 dígitos a partir de la posición 10 en la clave de acceso (49 díg.). Port de `BatchProcessor::throttleKey()`. */
  throttleKey(item) {
    return item.claveAcceso.length >= 23 ? item.claveAcceso.slice(10, 23) : "sri";
  }
  /**
   * Avanza un item UN paso. Idempotente: los terminales se devuelven sin
   * cambios. Port exacto de `BatchProcessor::step()`.
   *
   * Nota (heredada del PHP): si el proceso falla entre un `enviar` exitoso y
   * el `repository.put`, una re-ejecución reenviará el item (todavía
   * `PENDING`). La reconciliación real (consultar autorización antes de
   * re-enviar) es un refinamiento planeado, no cubierto aquí.
   */
  async step(item) {
    if (isTerminal(item.state)) {
      return item;
    }
    try {
      if (item.state === "PENDING") {
        await this.rateLimiter.throttle(this.throttleKey(item));
        const r = await this.transport.enviar(item.signedXml, this.ambiente);
        return r.estado === "RECIBIDA" ? markSent(item, r.mensajes) : markRejected(item, r.mensajes);
      }
      await this.rateLimiter.throttle(this.throttleKey(item));
      const a = await this.transport.autorizar(item.claveAcceso, this.ambiente);
      switch (a.estado.toUpperCase()) {
        case "AUTORIZADO":
          return markAuthorized(item, a.numeroAutorizacion, a.comprobante, a.mensajes);
        case "EN PROCESO":
        case "EN PROCESAMIENTO":
          return this.retryPolicy.shouldRetry(item.attempts + 1) ? markInProcess(item, a.mensajes) : markFailed(incrementAttempts(item), a.mensajes);
        default:
          return markRejected(item, a.mensajes);
      }
    } catch (err) {
      if (!(err instanceof CommunicationError)) {
        throw err;
      }
      const next = incrementAttempts(item);
      return this.retryPolicy.shouldRetry(next.attempts) ? next : markFailed(next, [{ identificador: "", mensaje: err.message }]);
    }
  }
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
  async process(repository, maxPasses = 20) {
    for (let pass = 0; pass < maxPasses; pass++) {
      const pending = repository.pending();
      if (pending.length === 0) {
        return;
      }
      let stateChanged = false;
      for (const item of pending) {
        const next = await this.step(item);
        if (next.state !== item.state || next.attempts !== item.attempts) {
          repository.put(next);
        }
        if (next.state !== item.state) {
          stateChanged = true;
        }
      }
      if (!stateChanged) {
        return;
      }
    }
  }
};

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

// src/transport/urls.ts
var SRI_URLS = {
  ["1" /* Pruebas */]: {
    recepcion: "https://celcer.sri.gob.ec/comprobantes-electronicos-ws/RecepcionComprobantesOffline",
    autorizacion: "https://celcer.sri.gob.ec/comprobantes-electronicos-ws/AutorizacionComprobantesOffline"
  },
  ["2" /* Produccion */]: {
    recepcion: "https://cel.sri.gob.ec/comprobantes-electronicos-ws/RecepcionComprobantesOffline",
    autorizacion: "https://cel.sri.gob.ec/comprobantes-electronicos-ws/AutorizacionComprobantesOffline"
  }
};

// src/xml/xml-builder.ts
var XmlElement = class {
  constructor(name) {
    this.name = name;
  }
  name;
  attributes = [];
  children = [];
  setAttribute(name, value) {
    this.attributes.push([name, value]);
    return this;
  }
};
var XmlBuilder = class {
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
  child(parent, name, value) {
    if (value === "") {
      throw new ValidationError(
        `XmlBuilder::child(): cadena vac\xEDa para el elemento '${name}'.`,
        [
          "Use null/omita el valor para un elemento vac\xEDo intencional, u omita la llamada a child() si el elemento es opcional."
        ]
      );
    }
    const el = new XmlElement(name);
    if (value !== void 0 && value !== null) {
      el.children.push(value);
    }
    parent.children.push(el);
    return el;
  }
};
function escapeXml(text) {
  return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");
}
function serializeXmlDocument(root) {
  return `<?xml version="1.0" encoding="UTF-8"?>
${renderElement(root)}`;
}
function renderElement(el) {
  const attrs = el.attributes.map(([name, value]) => ` ${name}="${escapeXml(value)}"`).join("");
  if (el.children.length === 0) {
    return `<${el.name}${attrs}/>`;
  }
  const inner = el.children.map((child) => typeof child === "string" ? escapeXml(child) : renderElement(child)).join("");
  return `<${el.name}${attrs}>${inner}</${el.name}>`;
}

// src/transport/soap-envelope.ts
var CLAVE_ACCESO_PATTERN = /^\d{49}$/;
function assertClaveAccesoWireSegura(claveAcceso) {
  if (!CLAVE_ACCESO_PATTERN.test(claveAcceso)) {
    throw new ValidationError("Clave de acceso inv\xE1lida para consulta al SRI", [
      "claveAcceso debe ser exactamente 49 d\xEDgitos decimales."
    ]);
  }
  return claveAcceso;
}
function buildReceptionEnvelope(signedXml) {
  const b64 = Buffer.from(signedXml, "utf-8").toString("base64");
  return `<?xml version="1.0" encoding="UTF-8"?>
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ec="http://ec.gob.sri.ws.recepcion">
   <soapenv:Header/>
   <soapenv:Body>
      <ec:validarComprobante>
         <xml>${b64}</xml>
      </ec:validarComprobante>
   </soapenv:Body>
</soapenv:Envelope>`;
}
function buildAuthorizationEnvelope(claveAcceso) {
  assertClaveAccesoWireSegura(claveAcceso);
  return `<?xml version="1.0" encoding="UTF-8"?>
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ec="http://ec.gob.sri.ws.autorizacion">
   <soapenv:Header/>
   <soapenv:Body>
      <ec:autorizacionComprobante>
         <claveAccesoComprobante>${escapeXml(claveAcceso)}</claveAccesoComprobante>
      </ec:autorizacionComprobante>
   </soapenv:Body>
</soapenv:Envelope>`;
}

// src/transport/soap-response-parser.ts
var import_fast_xml_parser = require("fast-xml-parser");
var parser = new import_fast_xml_parser.XMLParser({
  removeNSPrefix: true,
  ignoreAttributes: true,
  trimValues: true,
  parseTagValue: false
});
function parseReception(responseXml) {
  const root = parseXml(responseXml);
  throwOnFault(root);
  const estado = textValue(findFirst(root, "estado")) ?? "DEVUELTA";
  const mensajes = findAll(root, "mensajes").flatMap((m) => directChildren(m, "mensaje").map(toMessage));
  return { estado, mensajes };
}
function parseAuthorization(responseXml) {
  const root = parseXml(responseXml);
  throwOnFault(root);
  const auth = findFirst(root, "autorizacion");
  if (typeof auth !== "object" || Array.isArray(auth)) {
    return { estado: "EN PROCESO", mensajes: [] };
  }
  const mensajes = directChildren(auth["mensajes"], "mensaje").map(toMessage);
  return {
    estado: textValue(auth["estado"]) ?? "EN PROCESO",
    numeroAutorizacion: textValue(auth["numeroAutorizacion"]),
    fechaAutorizacion: textValue(auth["fechaAutorizacion"]),
    comprobante: textValue(auth["comprobante"]),
    mensajes
  };
}
function parseXml(xml) {
  const validation = import_fast_xml_parser.XMLValidator.validate(xml);
  if (validation !== true) {
    throw new CommunicationError(
      `Respuesta XML del SRI malformada: ${validation.err.msg} (l\xEDnea ${validation.err.line}, columna ${validation.err.col})`
    );
  }
  return parser.parse(xml);
}
function throwOnFault(root) {
  const fault = findFirst(root, "Fault");
  if (fault === void 0) {
    return;
  }
  const faultstring = typeof fault === "object" && !Array.isArray(fault) ? textValue(findFirst(fault, "faultstring")) : void 0;
  throw new CommunicationError(`SRI SOAP Fault: ${faultstring ?? "unknown SOAP fault"}`);
}
function findFirst(node, tagName) {
  if (typeof node !== "object") {
    return void 0;
  }
  if (Array.isArray(node)) {
    for (const item of node) {
      const found = findFirst(item, tagName);
      if (found !== void 0) {
        return found;
      }
    }
    return void 0;
  }
  for (const [key, value] of Object.entries(node)) {
    if (key === tagName) {
      return Array.isArray(value) ? value[0] : value;
    }
    const found = findFirst(value, tagName);
    if (found !== void 0) {
      return found;
    }
  }
  return void 0;
}
function findAll(node, tagName) {
  const out = [];
  collect(node);
  return out;
  function collect(current) {
    if (typeof current !== "object") {
      return;
    }
    if (Array.isArray(current)) {
      for (const item of current) {
        collect(item);
      }
      return;
    }
    for (const [key, value] of Object.entries(current)) {
      if (key === tagName) {
        if (Array.isArray(value)) {
          out.push(...value.filter(isElement));
        } else if (isElement(value)) {
          out.push(value);
        }
      }
      collect(value);
    }
  }
}
function directChildren(node, childTag) {
  if (typeof node !== "object" || Array.isArray(node)) {
    return [];
  }
  const raw = node[childTag];
  if (raw === void 0) {
    return [];
  }
  const rows = Array.isArray(raw) ? raw : [raw];
  return rows.filter(isElement);
}
function isElement(node) {
  return typeof node === "object" && !Array.isArray(node);
}
function textValue(node) {
  if (typeof node !== "string" || node === "") {
    return void 0;
  }
  return node;
}
function toMessage(el) {
  return {
    identificador: textValue(el["identificador"]) ?? "",
    mensaje: textValue(el["mensaje"]) ?? "",
    tipo: textValue(el["tipo"]) ?? "",
    informacionAdicional: textValue(el["informacionAdicional"]) ?? ""
  };
}

// src/transport/fetch-soap-transport.ts
var FetchSoapTransport = class {
  timeoutMs;
  fetchImpl;
  constructor(options = {}) {
    this.timeoutMs = options.timeoutMs ?? 3e4;
    this.fetchImpl = options.fetch ?? fetch;
  }
  async enviar(signedXml, ambiente, opts) {
    const body = await this.post(
      SRI_URLS[ambiente].recepcion,
      buildReceptionEnvelope(signedXml),
      opts?.signal
    );
    return parseReception(body);
  }
  /**
   * @throws ValidationError si `claveAcceso` no son exactamente 49 dígitos —
   * se comprueba aquí, antes de resolver el endpoint o abrir la conexión, para
   * que ningún valor no confiable llegue a interpolarse en el envelope SOAP.
   */
  async autorizar(claveAcceso, ambiente, opts) {
    assertClaveAccesoWireSegura(claveAcceso);
    const body = await this.post(
      SRI_URLS[ambiente].autorizacion,
      buildAuthorizationEnvelope(claveAcceso),
      opts?.signal
    );
    return parseAuthorization(body);
  }
  /**
   * POST del envelope SOAP con los mismos headers que `Psr18SoapTransport::post()`
   * (`Content-Type: text/xml; charset=utf-8`, `SOAPAction: ''`). Combina el
   * timeout propio con el `AbortSignal` opcional del caller: cualquiera de
   * los dos que dispare primero aborta el `fetch`, y ambos casos (igual que
   * cualquier otro fallo de red) se reportan de manera uniforme como
   * `CommunicationError` — el caller no tiene forma de distinguir, desde
   * este XML de respuesta, un timeout de una cancelación manual.
   */
  async post(url, soapBody, externalSignal) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), this.timeoutMs);
    const onExternalAbort = () => controller.abort();
    if (externalSignal) {
      if (externalSignal.aborted) {
        controller.abort();
      } else {
        externalSignal.addEventListener("abort", onExternalAbort);
      }
    }
    try {
      const response = await this.fetchImpl(url, {
        method: "POST",
        headers: {
          "Content-Type": "text/xml; charset=utf-8",
          SOAPAction: ""
        },
        body: soapBody,
        signal: controller.signal
      });
      if (response.status !== 200) {
        await response.body?.cancel().catch(() => void 0);
        throw new CommunicationError(`El SRI respondi\xF3 HTTP ${response.status}`);
      }
      return await response.text();
    } catch (err) {
      if (err instanceof CommunicationError) {
        throw err;
      }
      throw new CommunicationError(`Error de comunicaci\xF3n con el SRI: ${errorMessage(err)}`, err);
    } finally {
      clearTimeout(timer);
      if (externalSignal) {
        externalSignal.removeEventListener("abort", onExternalAbort);
      }
    }
  }
};
function errorMessage(err) {
  return err instanceof Error ? err.message : String(err);
}

// src/batch/batch-emitter.ts
var BatchEmitter = class {
  repository;
  processor;
  constructor(opts) {
    this.repository = opts.repository ?? new InMemoryComprobanteRepository();
    this.processor = new BatchProcessor(opts.transport ?? new FetchSoapTransport(), opts.ambiente, {
      retryPolicy: opts.retryPolicy,
      rateLimiter: opts.rateLimiter
    });
  }
  /** Agrega un comprobante firmado. Idempotente por clave de acceso: si ya existe un item con esa clave, no lo duplica ni lo reemplaza. */
  add(claveAcceso, signedXml) {
    if (this.repository.get(claveAcceso) === void 0) {
      this.repository.put(createBatchItem(claveAcceso, signedXml));
    }
  }
  /**
   * Procesa los pendientes hasta que no queden, se agote `maxPasses`, o una
   * pasada no logre progreso de estado (retorna de inmediato en ese caso, sin
   * esperar — ver nota de clase). Re-llamable: reanuda donde quedó (items ya
   * terminales no se reprocesan; los que siguen `PENDING`/`SENT`/`IN_PROCESS`
   * continúan su máquina de estados).
   */
  run(opts = {}) {
    return this.processor.process(this.repository, opts.maxPasses ?? 20);
  }
  /** Conteo por estado (siempre los seis, con 0 para los que no tienen items). */
  status() {
    return this.repository.counts();
  }
  /** El `BatchItem` actual de `claveAcceso`, o `undefined` si nunca se agregó. */
  result(claveAcceso) {
    return this.repository.get(claveAcceso);
  }
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

// src/schemas/factura.schema.ts
var import_zod2 = require("zod");

// src/schemas/shared.schema.ts
var import_zod = require("zod");

// src/utils/money.ts
var MONTO_PATTERN = /^\d+(\.\d{1,6})?$/;
function isMonto(s) {
  return MONTO_PATTERN.test(s);
}
function toCents(monto) {
  if (!isMonto(monto)) {
    throw new ValidationError(`Monto inv\xE1lido: '${monto}'`, [
      "Debe ser un n\xFAmero no negativo con hasta 6 decimales."
    ]);
  }
  const [intPart, fracPart = ""] = monto.split(".");
  const fracPadded = fracPart.padEnd(6, "0");
  const totalMicro = BigInt(intPart) * 1000000n + BigInt(fracPadded);
  const cents = (totalMicro + 5000n) / 10000n;
  return Number(cents);
}
function fromCents(cents) {
  const sign = cents < 0 ? "-" : "";
  const absCents = Math.abs(cents);
  const intPart = Math.floor(absCents / 100);
  const centPart = absCents % 100;
  return `${sign}${intPart}.${centPart.toString().padStart(2, "0")}`;
}
function formatMonto(monto, decimals) {
  if (!isMonto(monto)) {
    throw new ValidationError(`Monto inv\xE1lido: '${monto}'`, [
      "Debe ser un n\xFAmero no negativo con hasta 6 decimales."
    ]);
  }
  const [intPart, fracPart = ""] = monto.split(".");
  const workScale = Math.max(decimals, fracPart.length);
  const fracPadded = fracPart.padEnd(workScale, "0");
  const totalMicro = BigInt(intPart) * 10n ** BigInt(workScale) + BigInt(fracPadded || "0");
  const divisor = 10n ** BigInt(workScale - decimals);
  const half = divisor / 2n;
  const rounded = (totalMicro + half) / divisor;
  const roundedStr = rounded.toString().padStart(decimals + 1, "0");
  const cut = roundedStr.length - decimals;
  const intOut = roundedStr.slice(0, cut);
  const fracOut = roundedStr.slice(cut);
  return decimals > 0 ? `${intOut}.${fracOut}` : intOut;
}

// src/schemas/shared.schema.ts
var nonEmptyString = import_zod.z.string().min(1, "no puede estar vac\xEDo");
var rucField = import_zod.z.string().regex(/^\d{13}$/, "debe tener exactamente 13 d\xEDgitos num\xE9ricos");
var estabPtoEmiField = import_zod.z.string().regex(/^\d{3}$/, "debe tener exactamente 3 d\xEDgitos num\xE9ricos");
var secuencialField = import_zod.z.string().regex(/^\d{9}$/, "debe tener exactamente 9 d\xEDgitos num\xE9ricos");
var fechaField = import_zod.z.string().regex(/^\d{2}\/\d{2}\/\d{4}$/, "debe tener formato 'DD/MM/YYYY'");
var montoField = import_zod.z.string().refine(isMonto, "debe ser un monto num\xE9rico v\xE1lido (entero o hasta 6 decimales, no negativo)");
var razonSocialField = import_zod.z.string().min(1, "no puede estar vac\xEDo").max(300, "excede el m\xE1ximo de 300 caracteres");
var dirEstablecimientoField = import_zod.z.string().min(1, "no puede estar vac\xEDo").max(300, "excede el m\xE1ximo de 300 caracteres");
var contribuyenteEspecialField = import_zod.z.string().min(1, "no puede estar vac\xEDo").max(13, "excede el m\xE1ximo de 13 caracteres");
var formaPagoField = import_zod.z.string().regex(/^\d{2}$/, "debe ser un c\xF3digo num\xE9rico de 2 d\xEDgitos");
var camposAdicionalesField = import_zod.z.record(import_zod.z.string(), import_zod.z.string());
var obligadoContabilidadField = import_zod.z.enum(["SI", "NO"]);
var infoTributariaSchema = import_zod.z.object({
  ambiente: import_zod.z.enum(Ambiente),
  razonSocial: razonSocialField,
  ruc: rucField,
  estab: estabPtoEmiField,
  ptoEmi: estabPtoEmiField,
  secuencial: secuencialField,
  dirMatriz: dirEstablecimientoField,
  tipoEmision: import_zod.z.enum(TipoEmision).optional(),
  nombreComercial: nonEmptyString.optional(),
  // Régimen RIMPE, no la leyenda: el serializador escribe el texto literal
  // (`LEYENDA_RIMPE`) que exige el SRI en `<contribuyenteRimpe>`.
  regimenRimpe: import_zod.z.enum(RegimenRimpe).optional(),
  agenteRetencion: nonEmptyString.optional()
}).strict();
var impuestoSchema = import_zod.z.object({
  codigo: nonEmptyString,
  codigoPorcentaje: nonEmptyString,
  tarifa: montoField,
  baseImponible: montoField,
  valor: montoField
}).strict();
var totalImpuestoSchema = import_zod.z.object({
  codigo: nonEmptyString,
  codigoPorcentaje: nonEmptyString,
  baseImponible: montoField,
  valor: montoField,
  descuentoAdicional: montoField.optional()
}).strict();
var pagoSchema = import_zod.z.object({
  formaPago: formaPagoField,
  total: montoField,
  plazo: nonEmptyString.optional(),
  unidadTiempo: nonEmptyString.optional()
}).strict();
var detalleSchema = import_zod.z.object({
  codigoPrincipal: nonEmptyString.optional(),
  codigoAuxiliar: nonEmptyString.optional(),
  descripcion: nonEmptyString,
  cantidad: montoField,
  precioUnitario: montoField,
  descuento: montoField,
  precioTotalSinImpuesto: montoField,
  impuestos: import_zod.z.array(impuestoSchema).min(1, "debe tener al menos un impuesto"),
  detallesAdicionales: camposAdicionalesField.optional()
}).strict();

// src/schemas/factura.schema.ts
var facturaSchema = import_zod2.z.object({
  tipo: import_zod2.z.literal("01" /* Factura */),
  infoTributaria: infoTributariaSchema,
  fechaEmision: fechaField,
  dirEstablecimiento: dirEstablecimientoField.optional(),
  contribuyenteEspecial: contribuyenteEspecialField.optional(),
  tipoIdentificacionComprador: nonEmptyString,
  razonSocialComprador: razonSocialField,
  identificacionComprador: nonEmptyString,
  direccionComprador: nonEmptyString.optional(),
  guiaRemision: nonEmptyString.optional(),
  totalSinImpuestos: montoField,
  totalDescuento: montoField,
  propina: montoField.optional(),
  importeTotal: montoField,
  moneda: nonEmptyString.optional(),
  obligadoContabilidad: obligadoContabilidadField.optional(),
  totalConImpuestos: import_zod2.z.array(totalImpuestoSchema).min(1, "debe tener al menos un total con impuestos"),
  detalles: import_zod2.z.array(detalleSchema).min(1, "debe tener al menos un detalle"),
  pagos: import_zod2.z.array(pagoSchema).min(1, "debe tener al menos una forma de pago"),
  infoAdicional: camposAdicionalesField.optional()
}).strict();

// src/schemas/guia-remision.schema.ts
var import_zod3 = require("zod");
var destinatarioDetalleSchema = import_zod3.z.object({
  codigoInterno: nonEmptyString.optional(),
  codigoAdicional: nonEmptyString.optional(),
  descripcion: nonEmptyString,
  cantidad: montoField,
  detallesAdicionales: camposAdicionalesField.optional()
}).strict();
var destinatarioSchema = import_zod3.z.object({
  identificacionDestinatario: nonEmptyString,
  razonSocialDestinatario: razonSocialField,
  dirDestinatario: nonEmptyString,
  motivoTraslado: nonEmptyString,
  detalles: import_zod3.z.array(destinatarioDetalleSchema).min(1, "debe tener al menos un detalle"),
  docAduaneroUnico: nonEmptyString.optional(),
  codEstabDestino: nonEmptyString.optional(),
  ruta: nonEmptyString.optional(),
  codDocSustento: nonEmptyString.optional(),
  numDocSustento: nonEmptyString.optional(),
  numAutDocSustento: nonEmptyString.optional(),
  fechaEmisionDocSustento: fechaField.optional()
}).strict();
var guiaRemisionSchema = import_zod3.z.object({
  tipo: import_zod3.z.literal("06" /* GuiaRemision */),
  infoTributaria: infoTributariaSchema,
  dirEstablecimiento: dirEstablecimientoField,
  dirPartida: nonEmptyString,
  razonSocialTransportista: razonSocialField,
  tipoIdentificacionTransportista: nonEmptyString,
  rucTransportista: rucField,
  fechaIniTransporte: fechaField,
  fechaFinTransporte: fechaField,
  placa: nonEmptyString,
  destinatarios: import_zod3.z.array(destinatarioSchema).min(1, "debe tener al menos un destinatario"),
  rise: nonEmptyString.optional(),
  obligadoContabilidad: obligadoContabilidadField.optional(),
  contribuyenteEspecial: contribuyenteEspecialField.optional(),
  infoAdicional: camposAdicionalesField.optional()
}).strict();

// src/schemas/liquidacion-compra.schema.ts
var import_zod4 = require("zod");
var liquidacionCompraSchema = import_zod4.z.object({
  tipo: import_zod4.z.literal("03" /* LiquidacionCompra */),
  infoTributaria: infoTributariaSchema,
  fechaEmision: fechaField,
  dirEstablecimiento: dirEstablecimientoField.optional(),
  contribuyenteEspecial: contribuyenteEspecialField.optional(),
  tipoIdentificacionProveedor: nonEmptyString,
  razonSocialProveedor: razonSocialField,
  identificacionProveedor: nonEmptyString,
  direccionProveedor: nonEmptyString.optional(),
  totalSinImpuestos: montoField,
  totalDescuento: montoField,
  importeTotal: montoField,
  moneda: nonEmptyString.optional(),
  obligadoContabilidad: obligadoContabilidadField.optional(),
  totalConImpuestos: import_zod4.z.array(totalImpuestoSchema).min(1, "debe tener al menos un total con impuestos"),
  detalles: import_zod4.z.array(detalleSchema).min(1, "debe tener al menos un detalle"),
  pagos: import_zod4.z.array(pagoSchema).min(1, "debe tener al menos una forma de pago"),
  infoAdicional: camposAdicionalesField.optional()
}).strict();

// src/schemas/nota-credito.schema.ts
var import_zod5 = require("zod");
var notaCreditoSchema = import_zod5.z.object({
  tipo: import_zod5.z.literal("04" /* NotaCredito */),
  infoTributaria: infoTributariaSchema,
  fechaEmision: fechaField,
  dirEstablecimiento: dirEstablecimientoField.optional(),
  tipoIdentificacionComprador: nonEmptyString,
  razonSocialComprador: razonSocialField,
  identificacionComprador: nonEmptyString,
  contribuyenteEspecial: contribuyenteEspecialField.optional(),
  obligadoContabilidad: obligadoContabilidadField.optional(),
  rise: nonEmptyString.optional(),
  codDocModificado: nonEmptyString,
  numDocModificado: nonEmptyString,
  fechaEmisionDocSustento: fechaField,
  totalSinImpuestos: montoField,
  valorModificacion: montoField,
  moneda: nonEmptyString.optional(),
  totalConImpuestos: import_zod5.z.array(totalImpuestoSchema).min(1, "debe tener al menos un total con impuestos"),
  detalles: import_zod5.z.array(detalleSchema).min(1, "debe tener al menos un detalle"),
  motivo: nonEmptyString,
  infoAdicional: camposAdicionalesField.optional()
}).strict();

// src/schemas/nota-debito.schema.ts
var import_zod6 = require("zod");
var motivoSchema = import_zod6.z.object({
  razon: nonEmptyString,
  valor: montoField
}).strict();
var notaDebitoSchema = import_zod6.z.object({
  tipo: import_zod6.z.literal("05" /* NotaDebito */),
  infoTributaria: infoTributariaSchema,
  fechaEmision: fechaField,
  dirEstablecimiento: dirEstablecimientoField.optional(),
  tipoIdentificacionComprador: nonEmptyString,
  razonSocialComprador: razonSocialField,
  identificacionComprador: nonEmptyString,
  contribuyenteEspecial: contribuyenteEspecialField.optional(),
  obligadoContabilidad: obligadoContabilidadField.optional(),
  rise: nonEmptyString.optional(),
  codDocModificado: nonEmptyString,
  numDocModificado: nonEmptyString,
  fechaEmisionDocSustento: fechaField,
  totalSinImpuestos: montoField,
  impuestos: import_zod6.z.array(totalImpuestoSchema).min(1, "debe tener al menos un impuesto"),
  valorTotal: montoField,
  pagos: import_zod6.z.array(pagoSchema).min(1, "debe tener al menos una forma de pago"),
  motivos: import_zod6.z.array(motivoSchema).min(1, "debe tener al menos un motivo"),
  infoAdicional: camposAdicionalesField.optional()
}).strict();

// src/schemas/retencion.schema.ts
var import_zod7 = require("zod");
var impuestoDocSustentoRowSchema = import_zod7.z.object({
  codImpuestoDocSustento: nonEmptyString,
  codigoPorcentaje: nonEmptyString,
  baseImponible: montoField,
  tarifa: montoField,
  // `minOccurs="0"` en el XSD: opcionales, no placeholders obligatorios.
  factorProporcionalidad: montoField.optional(),
  baseImponibleModificada: montoField.optional(),
  valorImpuesto: montoField
}).catchall(import_zod7.z.string().optional());
var retencionRowSchema = import_zod7.z.object({
  codigo: nonEmptyString,
  codigoRetencion: nonEmptyString,
  baseImponible: montoField,
  porcentajeRetener: montoField,
  valorRetenido: montoField
}).catchall(import_zod7.z.string());
var pagoSustentoRowSchema = import_zod7.z.object({
  formaPago: formaPagoField,
  total: montoField
}).catchall(import_zod7.z.string());
var docSustentoSchema = import_zod7.z.object({
  codSustento: nonEmptyString,
  codDocSustento: nonEmptyString,
  numDocSustento: nonEmptyString,
  fechaEmisionDocSustento: fechaField,
  totalSinImpuestos: montoField,
  importeTotal: montoField,
  impuestosDocSustento: import_zod7.z.array(impuestoDocSustentoRowSchema).min(1, "debe tener al menos un impuesto de documento sustento"),
  retenciones: import_zod7.z.array(retencionRowSchema).min(1, "debe tener al menos una retenci\xF3n"),
  pagos: import_zod7.z.array(pagoSustentoRowSchema).min(1, "debe tener al menos un pago"),
  fechaRegistroContable: fechaField.optional(),
  numAutDocSustento: nonEmptyString.optional(),
  pagoLocExt: nonEmptyString.optional(),
  tipoRegi: nonEmptyString.optional(),
  paisEfecPago: nonEmptyString.optional(),
  aplicConvDobTwordsri: nonEmptyString.optional(),
  pagExtSujRetNorLeg: nonEmptyString.optional(),
  pagoRegFis: nonEmptyString.optional(),
  totalComprobantesReembolso: montoField.optional(),
  totalBaseImponibleReembolso: montoField.optional(),
  totalImpuestoReembolso: montoField.optional()
}).strict();
var retencionSchema = import_zod7.z.object({
  tipo: import_zod7.z.literal("07" /* Retencion */),
  infoTributaria: infoTributariaSchema,
  fechaEmision: fechaField,
  dirEstablecimiento: dirEstablecimientoField,
  tipoIdentificacionSujetoRetenido: nonEmptyString,
  razonSocialSujetoRetenido: razonSocialField,
  identificacionSujetoRetenido: nonEmptyString,
  periodoFiscal: nonEmptyString,
  docsSustento: import_zod7.z.array(docSustentoSchema).min(1, "debe tener al menos un documento sustento"),
  contribuyenteEspecial: contribuyenteEspecialField.optional(),
  obligadoContabilidad: obligadoContabilidadField.optional(),
  tipoSujetoRetenido: nonEmptyString.optional(),
  parteRel: nonEmptyString.optional(),
  infoAdicional: camposAdicionalesField.optional()
}).strict();

// src/schemas/business-validator.ts
function toCentsOrNull(s) {
  if (typeof s !== "string" || !isMonto(s)) return null;
  return toCents(s);
}
function toMicroOrNull(s) {
  if (typeof s !== "string" || !isMonto(s)) return null;
  const [intPart, fracPart = ""] = s.split(".");
  const fracPadded = fracPart.padEnd(6, "0");
  return BigInt(intPart) * 1000000n + BigInt(fracPadded);
}
function microToCentsHalfUp(micro) {
  const negative = micro < 0n;
  const abs = negative ? -micro : micro;
  const cents = (abs + 5000n) / 10000n;
  return Number(negative ? -cents : cents);
}
function sumCentsOrNull(montos) {
  let total = 0;
  for (const monto of montos) {
    const cents = toCentsOrNull(monto);
    if (cents === null) return null;
    total += cents;
  }
  return total;
}
function esRucLocalValido(ruc) {
  if (!/^\d{13}$/.test(ruc)) return false;
  const tercerDigito = Number(ruc[2]);
  if (tercerDigito > 6 && tercerDigito !== 9) return false;
  if (ruc.slice(10, 13) === "000") return false;
  return true;
}
function checkRuc(ruc, path) {
  if (typeof ruc !== "string") return [];
  if (!esRucLocalValido(ruc)) {
    return [`${path}: RUC inv\xE1lido (tercer d\xEDgito de r\xE9gimen o c\xF3digo de establecimiento incorrecto).`];
  }
  return [];
}
function checkCamposLocales(info) {
  const limites = [
    ["razonSocial", 300],
    ["nombreComercial", 300],
    ["dirMatriz", 300],
    ["secuencial", 9]
  ];
  const errores = [];
  for (const [campo, longitud] of limites) {
    const valor = info[campo];
    if (typeof valor === "string" && [...valor].length > longitud) {
      errores.push(`infoTributaria.${campo}: excede la longitud m\xE1xima de ${longitud} caracteres.`);
    }
  }
  return errores;
}
var FORMAS_PAGO_VALIDAS = new Set(Object.values(FormaPago));
function checkFormaPago(formaPago, path) {
  if (typeof formaPago !== "string") return [];
  if (!FORMAS_PAGO_VALIDAS.has(formaPago)) {
    return [`${path}: c\xF3digo de forma de pago '${formaPago}' no est\xE1 en el cat\xE1logo SRI (catalogs/forma-pago.ts).`];
  }
  return [];
}
function checkTotalSinImpuestos(detalles, totalSinImpuestos) {
  const sumaCents = sumCentsOrNull(detalles.map((d) => d.precioTotalSinImpuesto));
  const totalCents = toCentsOrNull(totalSinImpuestos);
  if (sumaCents === null || totalCents === null || sumaCents === totalCents) return [];
  return [
    `totalSinImpuestos: la suma de detalles[].precioTotalSinImpuesto (${fromCents(sumaCents)}) no coincide con totalSinImpuestos (${totalSinImpuestos}).`
  ];
}
function checkDetalleMath(detalle, index) {
  const cantidadMicro = toMicroOrNull(detalle.cantidad);
  const precioMicro = toMicroOrNull(detalle.precioUnitario);
  const descuentoMicro = toMicroOrNull(detalle.descuento);
  const precioTotalCents = toCentsOrNull(detalle.precioTotalSinImpuesto);
  if (cantidadMicro === null || precioMicro === null || descuentoMicro === null || precioTotalCents === null) {
    return [];
  }
  const productoMicro = cantidadMicro * precioMicro / 1000000n;
  const netoMicro = productoMicro - descuentoMicro;
  const netoCents = microToCentsHalfUp(netoMicro);
  if (Math.abs(netoCents - precioTotalCents) > 1) {
    return [
      `detalles[${index}].precioTotalSinImpuesto: cantidad*precioUnitario-descuento (${fromCents(netoCents)}) no coincide con precioTotalSinImpuesto (${detalle.precioTotalSinImpuesto}) [tolerancia \xB10.01].`
    ];
  }
  return [];
}
function aggregateImpuestos(items) {
  const map = /* @__PURE__ */ new Map();
  for (const item of items) {
    const baseCents = toCentsOrNull(item.baseImponible);
    const valorCents = toCentsOrNull(item.valor);
    if (baseCents === null || valorCents === null) return null;
    const key = `${item.codigo}|${item.codigoPorcentaje}`;
    const prev = map.get(key) ?? { baseCents: 0, valorCents: 0 };
    map.set(key, { baseCents: prev.baseCents + baseCents, valorCents: prev.valorCents + valorCents });
  }
  return map;
}
function checkAgregacionImpuestos(detalles, totalConImpuestos) {
  const detalleAgg = aggregateImpuestos(detalles.flatMap((d) => d.impuestos));
  const totalAgg = aggregateImpuestos(totalConImpuestos);
  if (detalleAgg === null || totalAgg === null) return [];
  const errores = [];
  const keys = /* @__PURE__ */ new Set([...detalleAgg.keys(), ...totalAgg.keys()]);
  for (const key of keys) {
    const [codigo, codigoPorcentaje] = key.split("|");
    const d = detalleAgg.get(key);
    const t = totalAgg.get(key);
    if (!d || !t) {
      const faltaEn = d ? "totalConImpuestos" : "detalles[].impuestos";
      errores.push(
        `totalConImpuestos: el impuesto codigo=${codigo}/codigoPorcentaje=${codigoPorcentaje} no est\xE1 presente en ${faltaEn}.`
      );
      continue;
    }
    if (d.baseCents !== t.baseCents || d.valorCents !== t.valorCents) {
      errores.push(
        `totalConImpuestos: la agregaci\xF3n de detalles[].impuestos (codigo=${codigo}/codigoPorcentaje=${codigoPorcentaje}) \u2014 base ${fromCents(d.baseCents)}, valor ${fromCents(d.valorCents)} \u2014 no coincide con totalConImpuestos \u2014 base ${fromCents(t.baseCents)}, valor ${fromCents(t.valorCents)}.`
      );
    }
  }
  return errores;
}
function checkImporteTotal(totalSinImpuestos, totalConImpuestos, propina, importeTotal) {
  const totalSinImpuestosCents = toCentsOrNull(totalSinImpuestos);
  const impuestosCents = sumCentsOrNull(totalConImpuestos.map((t) => t.valor));
  const propinaCents = propina === void 0 ? 0 : toCentsOrNull(propina);
  const importeTotalCents = toCentsOrNull(importeTotal);
  if (totalSinImpuestosCents === null || impuestosCents === null || propinaCents === null || importeTotalCents === null) {
    return [];
  }
  const calculado = totalSinImpuestosCents + impuestosCents + propinaCents;
  if (calculado !== importeTotalCents) {
    return [
      `importeTotal: totalSinImpuestos + \u03A3 totalConImpuestos[].valor + propina (${fromCents(calculado)}) no coincide con importeTotal (${importeTotal}).`
    ];
  }
  return [];
}
function checkPagosSuman(pagos, objetivo, campoObjetivo) {
  const sumaCents = sumCentsOrNull(pagos.map((p) => p.total));
  const objetivoCents = toCentsOrNull(objetivo);
  if (sumaCents === null || objetivoCents === null || sumaCents === objetivoCents) return [];
  return [
    `${campoObjetivo}: la suma de pagos[].total (${fromCents(sumaCents)}) no coincide con ${campoObjetivo} (${objetivo}).`
  ];
}
function checkTotalCoherente(totalSinImpuestos, impuestos, campoTotal, valorCampoTotal) {
  const baseCents = toCentsOrNull(totalSinImpuestos);
  const impuestosCents = sumCentsOrNull(impuestos.map((i) => i.valor));
  const totalCents = toCentsOrNull(valorCampoTotal);
  if (baseCents === null || impuestosCents === null || totalCents === null) return [];
  const calculado = baseCents + impuestosCents;
  if (calculado !== totalCents) {
    return [
      `${campoTotal}: totalSinImpuestos + \u03A3 impuestos[].valor (${fromCents(calculado)}) no coincide con ${campoTotal} (${valorCampoTotal}).`
    ];
  }
  return [];
}
function checkValorRetenido(row, docIndex, rowIndex) {
  const baseMicro = toMicroOrNull(row.baseImponible);
  const porcentajeMicro = toMicroOrNull(row.porcentajeRetener);
  const valorRetenidoCents = toCentsOrNull(row.valorRetenido);
  if (baseMicro === null || porcentajeMicro === null || valorRetenidoCents === null) return [];
  const esperadoMicro = baseMicro * porcentajeMicro / 100000000n;
  const esperadoCents = microToCentsHalfUp(esperadoMicro);
  if (Math.abs(esperadoCents - valorRetenidoCents) > 1) {
    return [
      `docsSustento[${docIndex}].retenciones[${rowIndex}].valorRetenido: baseImponible*porcentajeRetener/100 (${fromCents(esperadoCents)}) no coincide con valorRetenido (${row.valorRetenido}) [tolerancia \xB10.01].`
    ];
  }
  return [];
}
function checkFacturaLike(totalSinImpuestos, totalConImpuestos, detalles, pagos, propina, importeTotal) {
  const errores = [];
  errores.push(...checkTotalSinImpuestos(detalles, totalSinImpuestos));
  detalles.forEach((detalle, index) => errores.push(...checkDetalleMath(detalle, index)));
  errores.push(...checkAgregacionImpuestos(detalles, totalConImpuestos));
  errores.push(...checkImporteTotal(totalSinImpuestos, totalConImpuestos, propina, importeTotal));
  errores.push(...checkPagosSuman(pagos, importeTotal, "importeTotal"));
  pagos.forEach((pago, index) => errores.push(...checkFormaPago(pago.formaPago, `pagos[${index}].formaPago`)));
  return errores;
}
function checkInfoTributariaComun(info) {
  if (!info) return [];
  return [...checkCamposLocales(info), ...checkRuc(info.ruc, "infoTributaria.ruc")];
}
function validateBusiness(doc) {
  const errores = [...checkInfoTributariaComun(doc.infoTributaria)];
  switch (doc.tipo) {
    case "01" /* Factura */: {
      const detalles = doc.detalles ?? [];
      const totalConImpuestos = doc.totalConImpuestos ?? [];
      const pagos = doc.pagos ?? [];
      errores.push(
        ...checkFacturaLike(
          doc.totalSinImpuestos,
          totalConImpuestos,
          detalles,
          pagos,
          doc.propina,
          doc.importeTotal
        )
      );
      break;
    }
    case "03" /* LiquidacionCompra */: {
      const detalles = doc.detalles ?? [];
      const totalConImpuestos = doc.totalConImpuestos ?? [];
      const pagos = doc.pagos ?? [];
      errores.push(
        ...checkFacturaLike(doc.totalSinImpuestos, totalConImpuestos, detalles, pagos, void 0, doc.importeTotal)
      );
      break;
    }
    case "04" /* NotaCredito */: {
      const detalles = doc.detalles ?? [];
      const totalConImpuestos = doc.totalConImpuestos ?? [];
      errores.push(...checkTotalSinImpuestos(detalles, doc.totalSinImpuestos));
      detalles.forEach((detalle, index) => errores.push(...checkDetalleMath(detalle, index)));
      errores.push(...checkAgregacionImpuestos(detalles, totalConImpuestos));
      errores.push(
        ...checkTotalCoherente(doc.totalSinImpuestos, totalConImpuestos, "valorModificacion", doc.valorModificacion)
      );
      break;
    }
    case "05" /* NotaDebito */: {
      const impuestos = doc.impuestos ?? [];
      const pagos = doc.pagos ?? [];
      errores.push(...checkTotalCoherente(doc.totalSinImpuestos, impuestos, "valorTotal", doc.valorTotal));
      errores.push(...checkPagosSuman(pagos, doc.valorTotal, "valorTotal"));
      pagos.forEach((pago, index) => errores.push(...checkFormaPago(pago.formaPago, `pagos[${index}].formaPago`)));
      break;
    }
    case "06" /* GuiaRemision */: {
      errores.push(...checkRuc(doc.rucTransportista, "rucTransportista"));
      break;
    }
    case "07" /* Retencion */: {
      const docsSustento = doc.docsSustento ?? [];
      docsSustento.forEach((docSustento, docIndex) => {
        (docSustento.retenciones ?? []).forEach((row, rowIndex) => {
          errores.push(...checkValorRetenido(row, docIndex, rowIndex));
        });
        (docSustento.pagos ?? []).forEach((pago, index) => {
          errores.push(
            ...checkFormaPago(pago.formaPago, `docsSustento[${docIndex}].pagos[${index}].formaPago`)
          );
        });
      });
      break;
    }
  }
  return errores;
}
function assertValid(doc) {
  const schemaResult = schemaFor(doc.tipo).safeParse(doc);
  const zodErrors = schemaResult.success ? [] : zodIssuesToErrors(schemaResult.error.issues);
  const businessErrors = validateBusiness(doc);
  const allErrors = [...zodErrors, ...businessErrors];
  if (allErrors.length > 0) {
    throw new ValidationError("Comprobante inv\xE1lido", allErrors);
  }
}

// src/schemas/index.ts
function schemaFor(tipo) {
  switch (tipo) {
    case "01" /* Factura */:
      return facturaSchema;
    case "03" /* LiquidacionCompra */:
      return liquidacionCompraSchema;
    case "04" /* NotaCredito */:
      return notaCreditoSchema;
    case "05" /* NotaDebito */:
      return notaDebitoSchema;
    case "06" /* GuiaRemision */:
      return guiaRemisionSchema;
    case "07" /* Retencion */:
      return retencionSchema;
  }
}
function zodIssuesToErrors(issues) {
  return issues.map((issue) => {
    const path = issue.path.map(String).join(".");
    return path ? `${path}: ${issue.message}` : issue.message;
  });
}

// src/signing/certificate.ts
var import_node_forge = __toESM(require("node-forge"), 1);

// src/signing/x509-der.ts
var RSA_ALGORITHM_OIDS = /* @__PURE__ */ new Set([
  "1.2.840.113549.1.1.1",
  // rsaEncryption
  "1.2.840.113549.1.1.10"
  // RSASSA-PSS
]);
var EC_ALGORITHM_OID = "1.2.840.10045.2.1";
var KEYWORDS = {
  "2.5.4.3": "CN",
  "2.5.4.6": "C",
  "2.5.4.7": "L",
  "2.5.4.8": "ST",
  "2.5.4.9": "STREET",
  "2.5.4.10": "O",
  "2.5.4.11": "OU",
  "0.9.2342.19200300.100.1.25": "DC",
  "0.9.2342.19200300.100.1.1": "UID"
};
function parseCertificateFields(certificatePem) {
  const der = pemToDer(certificatePem);
  const fields = extractFields(der);
  let keyType;
  if (RSA_ALGORITHM_OIDS.has(fields.publicKeyAlgorithmOid)) {
    keyType = "RSA";
  } else if (fields.publicKeyAlgorithmOid === EC_ALGORITHM_OID) {
    keyType = "EC";
  } else {
    throw new CertificateError(
      `Certificate: tipo de clave p\xFAblica no soportado (OID ${fields.publicKeyAlgorithmOid}).`
    );
  }
  return {
    serialNumberDecimal: hexToDecimalString(fields.serialNumberHex),
    issuerRfc4514: fields.issuerRfc4514,
    notAfter: fields.notAfter,
    keyType
  };
}
function pemToDer(certificate) {
  if (certificate.includes("-----BEGIN")) {
    const body = certificate.replace(/-----[^-]+-----|\s+/g, "");
    if (body === "") {
      throw new CertificateError("El certificado PEM no contiene base64 v\xE1lido.");
    }
    const der = Buffer.from(body, "base64");
    if (der.length === 0) {
      throw new CertificateError("El certificado PEM no contiene base64 v\xE1lido.");
    }
    return der;
  }
  throw new CertificateError("El certificado est\xE1 vac\xEDo o no est\xE1 en formato PEM.");
}
function extractFields(der) {
  const certificate = readTlv(der, 0);
  const tbs = readTlv(der, certificate.cs);
  let pos = tbs.cs;
  let node = readTlv(der, pos);
  if (node.tag === 160) {
    pos = node.next;
    node = readTlv(der, pos);
  }
  const serialNumberTlv = node;
  const serialNumberHex = bytesToHex(der.subarray(serialNumberTlv.cs, serialNumberTlv.next));
  pos = serialNumberTlv.next;
  pos = readTlv(der, pos).next;
  const issuer = readTlv(der, pos);
  if (issuer.tag !== 48) {
    throw new CertificateError(
      "Estructura del certificado inv\xE1lida: no se encontr\xF3 el emisor (RDNSequence)."
    );
  }
  pos = issuer.next;
  const issuerRfc4514 = formatRdnSequence(der, issuer.cs, issuer.next);
  const validity = readTlv(der, pos);
  pos = validity.next;
  const notBeforeTlv = readTlv(der, validity.cs);
  const notAfterTlv = readTlv(der, notBeforeTlv.next);
  const notAfter = decodeTime(notAfterTlv.tag, der.subarray(notAfterTlv.cs, notAfterTlv.next));
  const subject = readTlv(der, pos);
  pos = subject.next;
  const spki = readTlv(der, pos);
  const algorithmId = readTlv(der, spki.cs);
  const algorithmOidTlv = readTlv(der, algorithmId.cs);
  const publicKeyAlgorithmOid = decodeOid(
    der.subarray(algorithmOidTlv.cs, algorithmOidTlv.next)
  );
  return { serialNumberHex, issuerRfc4514, notAfter, publicKeyAlgorithmOid };
}
function readTlv(der, offset) {
  const size = der.length;
  if (offset < 0 || offset + 2 > size) {
    throw new CertificateError("DER truncado al leer la cabecera TLV.");
  }
  const tag = der[offset];
  const lengthByte = der[offset + 1];
  let contentStart;
  let length;
  if (lengthByte < 128) {
    contentStart = offset + 2;
    length = lengthByte;
  } else {
    const numBytes = lengthByte & 127;
    if (numBytes === 0 || numBytes > 4 || offset + 2 + numBytes > size) {
      throw new CertificateError("DER con longitud inv\xE1lida.");
    }
    length = 0;
    for (let i = 0; i < numBytes; i++) {
      length = length << 8 | der[offset + 2 + i];
    }
    contentStart = offset + 2 + numBytes;
  }
  if (contentStart + length > size) {
    throw new CertificateError("DER truncado: el contenido excede el tama\xF1o del certificado.");
  }
  return { tag, cs: contentStart, len: length, next: contentStart + length };
}
function formatRdnSequence(der, start, end) {
  const rdns = [];
  let pos = start;
  while (pos < end) {
    const set = readTlv(der, pos);
    const avas = [];
    let inner = set.cs;
    while (inner < set.next) {
      const ava = readTlv(der, inner);
      const oidTlv = readTlv(der, ava.cs);
      const oid = decodeOid(der.subarray(oidTlv.cs, oidTlv.next));
      const valueTlv = readTlv(der, oidTlv.next);
      const keyword = KEYWORDS[oid];
      if (keyword !== void 0) {
        const value = decodeDirectoryString(
          valueTlv.tag,
          der.subarray(valueTlv.cs, valueTlv.next)
        );
        avas.push(`${keyword}=${escapeRdnValue(value)}`);
      } else {
        const valueDer = der.subarray(oidTlv.next, valueTlv.next);
        avas.push(`${oid}=#${bytesToHex(valueDer)}`);
      }
      inner = ava.next;
    }
    rdns.push(avas.join("+"));
    pos = set.next;
  }
  return rdns.reverse().join(",");
}
function decodeOid(bytes) {
  if (bytes.length === 0) {
    throw new CertificateError("OID vac\xEDo en el certificado.");
  }
  let index = 0;
  let first = 0;
  let more;
  do {
    first = first << 7 | bytes[index] & 127;
    more = (bytes[index] & 128) !== 0;
    index++;
  } while (more && index < bytes.length);
  const arc1 = first < 40 ? 0 : first < 80 ? 1 : 2;
  const arcs = [arc1, first - 40 * arc1];
  let value = 0;
  for (; index < bytes.length; index++) {
    value = value << 7 | bytes[index] & 127;
    if ((bytes[index] & 128) === 0) {
      arcs.push(value);
      value = 0;
    }
  }
  return arcs.join(".");
}
function decodeDirectoryString(tag, content) {
  if (tag === 30) {
    return utf16BeToString(content);
  }
  if (tag === 28) {
    return utf32BeToString(content);
  }
  return Buffer.from(content).toString("utf-8");
}
function utf16BeToString(bytes) {
  const le = Buffer.alloc(bytes.length - bytes.length % 2);
  for (let i = 0; i + 1 < bytes.length; i += 2) {
    le[i] = bytes[i + 1];
    le[i + 1] = bytes[i];
  }
  return le.toString("utf16le");
}
function utf32BeToString(bytes) {
  let out = "";
  for (let i = 0; i + 3 < bytes.length; i += 4) {
    const codePoint = (bytes[i] << 24 | bytes[i + 1] << 16 | bytes[i + 2] << 8 | bytes[i + 3]) >>> 0;
    out += String.fromCodePoint(codePoint);
  }
  return out;
}
function escapeRdnValue(value) {
  const specials = /* @__PURE__ */ new Set([",", "+", '"', "\\", "<", ">", ";", "=", "#"]);
  const chars = Array.from(value);
  const length = chars.length;
  let out = "";
  for (let i = 0; i < length; i++) {
    const char = chars[i];
    if (specials.has(char)) {
      out += "\\" + char;
    } else if (char === " " && (i === 0 || i === length - 1)) {
      out += "\\" + char;
    } else {
      out += char;
    }
  }
  return out;
}
function bytesToHex(bytes) {
  let hex = "";
  for (const byte of bytes) {
    hex += byte.toString(16).padStart(2, "0");
  }
  return hex;
}
function hexToDecimalString(hex) {
  if (hex === "") {
    return "0";
  }
  return BigInt(`0x${hex}`).toString(10);
}
function decodeTime(tag, bytes) {
  const str = Buffer.from(bytes).toString("ascii");
  if (tag === 23) {
    const m = /^(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})Z$/.exec(str);
    if (!m) {
      throw new CertificateError(`Formato de UTCTime inv\xE1lido en el certificado: "${str}".`);
    }
    const [, yy, mm, dd, hh, mi, ss] = m;
    const year = Number(yy) < 50 ? 2e3 + Number(yy) : 1900 + Number(yy);
    return new Date(Date.UTC(year, Number(mm) - 1, Number(dd), Number(hh), Number(mi), Number(ss)));
  }
  if (tag === 24) {
    const m = /^(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})(?:\.\d+)?Z$/.exec(str);
    if (!m) {
      throw new CertificateError(
        `Formato de GeneralizedTime inv\xE1lido en el certificado: "${str}".`
      );
    }
    const [, yyyy, mm, dd, hh, mi, ss] = m;
    return new Date(
      Date.UTC(Number(yyyy), Number(mm) - 1, Number(dd), Number(hh), Number(mi), Number(ss))
    );
  }
  throw new CertificateError(
    `Tipo de tiempo ASN.1 no soportado (tag 0x${tag.toString(16)}) en el certificado.`
  );
}

// src/signing/certificate.ts
var KEY_BAG_TYPES = /* @__PURE__ */ new Set([
  import_node_forge.default.pki.oids["keyBag"],
  import_node_forge.default.pki.oids["pkcs8ShroudedKeyBag"]
]);
var CERT_BAG_TYPE = import_node_forge.default.pki.oids["certBag"];
function loadCertificate(p12, password) {
  const pfx = parsePfx(p12, password);
  const bags = pfx.safeContents.flatMap((sc) => sc.safeBags);
  const keyBags = bags.filter((bag) => KEY_BAG_TYPES.has(bag.type) && Boolean(bag.key));
  const certBags = bags.filter((bag) => bag.type === CERT_BAG_TYPE);
  const { keyBag, certBag, extraCertBags } = selectCredential(keyBags, certBags);
  return {
    certPem: certBagToPem(certBag),
    privateKeyPem: import_node_forge.default.pki.privateKeyToPem(keyBag.key),
    extraCerts: extraCertBags.map(certBagToPem)
  };
}
function selectCredential(keyBags, certBags) {
  if (keyBags.length === 0) {
    throw new CertificateError(
      "El archivo .p12 no contiene ninguna clave privada (o su tipo de clave no es soportado)."
    );
  }
  if (certBags.length === 0) {
    throw new CertificateError("El archivo .p12 no contiene ning\xFAn certificado.");
  }
  const keyBag = keyBags.length === 1 ? keyBags[0] : pickBestKeyBag(keyBags, certBags);
  const certBag = matchCertBagForKey(keyBag, certBags);
  const extraCertBags = certBags.filter((bag) => bag !== certBag);
  return { keyBag, certBag, extraCertBags };
}
function certificateInfo(cert) {
  return parseCertificateFields(cert.certPem);
}
function parsePfx(p12, password) {
  try {
    const binary = Buffer.from(p12).toString("binary");
    const asn1 = import_node_forge.default.asn1.fromDer(binary);
    return import_node_forge.default.pkcs12.pkcs12FromAsn1(asn1, password);
  } catch (err) {
    throw new CertificateError(
      `No se pudo leer el certificado .p12. Verifique la contrase\xF1a y el archivo. (${errorMessage2(err)})`
    );
  }
}
function errorMessage2(err) {
  return err instanceof Error ? err.message : String(err);
}
function localKeyIdHex(bag) {
  const raw = bag.attributes?.["localKeyId"]?.[0];
  if (typeof raw !== "string" || raw === "") {
    return void 0;
  }
  let hex = "";
  for (let i = 0; i < raw.length; i++) {
    hex += raw.charCodeAt(i).toString(16).padStart(2, "0");
  }
  return hex;
}
function hasFriendlyName(bag) {
  const raw = bag.attributes?.["friendlyName"]?.[0];
  return typeof raw === "string" && raw !== "";
}
function hasSigningKeyUsage(certBag) {
  const cert = certBag?.cert;
  if (!cert) {
    return false;
  }
  const ku = cert.getExtension("keyUsage");
  if (!ku) {
    return false;
  }
  return Boolean(ku.digitalSignature) || Boolean(ku.nonRepudiation);
}
function sameRsaModulus(certBag, keyBag) {
  const publicKey = certBag.cert?.publicKey;
  const privateKey = keyBag.key;
  if (!publicKey?.n || !privateKey?.n) {
    return false;
  }
  return publicKey.n.toString(16) === privateKey.n.toString(16);
}
function matchCertBagForKey(keyBag, certBags) {
  const found = findCertBagForKey(keyBag, certBags);
  if (found) {
    return found;
  }
  throw new CertificateError(
    `El archivo .p12 contiene ${certBags.length} certificados y ninguno se puede vincular a la clave privada (sin atributo localKeyId coincidente ni m\xF3dulo RSA igual). Elegir uno al azar producir\xEDa una firma con el certificado equivocado, que el SRI rechazar\xEDa. Reexporte el .p12 incluyendo el atributo localKeyId (p. ej. con \`openssl pkcs12 -export\`) o con un \xFAnico par certificado/clave.`
  );
}
function findCertBagForKey(keyBag, certBags) {
  const keyId = localKeyIdHex(keyBag);
  if (keyId !== void 0) {
    const byId = certBags.find((certBag) => localKeyIdHex(certBag) === keyId);
    if (byId) {
      return byId;
    }
  }
  const byModulus = certBags.find((certBag) => sameRsaModulus(certBag, keyBag));
  if (byModulus) {
    return byModulus;
  }
  return certBags.length === 1 ? certBags[0] : void 0;
}
function pickBestKeyBag(keyBags, certBags) {
  let best = keyBags[0];
  let bestScore = -1;
  for (const keyBag of keyBags) {
    const matchedCert = findCertBagForKey(keyBag, certBags);
    let score = 0;
    if (hasSigningKeyUsage(matchedCert)) {
      score += 2;
    }
    if (hasFriendlyName(keyBag) || matchedCert !== void 0 && hasFriendlyName(matchedCert)) {
      score += 1;
    }
    if (score > bestScore) {
      bestScore = score;
      best = keyBag;
    }
  }
  return best;
}
function certBagToPem(bag) {
  if (bag.cert) {
    return import_node_forge.default.pki.certificateToPem(bag.cert);
  }
  if (bag.asn1) {
    const der = Buffer.from(import_node_forge.default.asn1.toDer(bag.asn1).getBytes(), "binary");
    return pemEncode("CERTIFICATE", der);
  }
  throw new CertificateError(
    "No se pudo serializar un certificado del .p12 (tipo de certificado no soportado)."
  );
}
function pemEncode(label, der) {
  const base64 = der.toString("base64");
  const lines = [];
  for (let i = 0; i < base64.length; i += 64) {
    lines.push(base64.slice(i, i + 64));
  }
  return `-----BEGIN ${label}-----
${lines.join("\n")}
-----END ${label}-----
`;
}

// src/signing/clock.ts
var SystemClock = class {
  now() {
    return /* @__PURE__ */ new Date();
  }
};

// src/signing/xades-signer.ts
var import_node_crypto = require("crypto");

// src/signing/c14n.ts
var import_xmldom = require("@xmldom/xmldom");
var XMLNS_URI = "http://www.w3.org/2000/xmlns/";
var XML_URI = "http://www.w3.org/XML/1998/namespace";
var ELEMENT_NODE = 1;
var TEXT_NODE = 3;
var CDATA_SECTION_NODE = 4;
var PROCESSING_INSTRUCTION_NODE = 7;
var COMMENT_NODE = 8;
var DOCUMENT_NODE = 9;
function parseXml2(xml) {
  let doc;
  try {
    doc = new import_xmldom.DOMParser({
      onError: (level, message) => {
        if (level === "fatalError" || level === "error") {
          throw new Error(message);
        }
      }
    }).parseFromString(xml, "text/xml");
  } catch (err) {
    const detail = err instanceof Error ? err.message : String(err);
    throw new SignatureError(
      `Error al cargar el XML para la firma. Verifique que sea XML v\xE1lido. (${detail})`
    );
  }
  if (!doc.documentElement) {
    throw new SignatureError("El XML no tiene elemento ra\xEDz.");
  }
  return doc;
}
function stripIgnorableWhitespace(node, preserve = false) {
  const children = childNodes(node);
  let preserveHere = preserve;
  if (node.nodeType === ELEMENT_NODE) {
    const space = node.getAttribute("xml:space");
    if (space === "preserve") {
      preserveHere = true;
    } else if (space === "default") {
      preserveHere = false;
    }
  }
  const hasElementChild = children.some((child) => child.nodeType === ELEMENT_NODE);
  const hasRealText = children.some(
    (child) => (child.nodeType === TEXT_NODE || child.nodeType === CDATA_SECTION_NODE) && !isWhitespace(child.nodeValue ?? "")
  );
  if (!preserveHere && hasElementChild && !hasRealText) {
    for (const child of children) {
      if (child.nodeType === TEXT_NODE && isWhitespace(child.nodeValue ?? "")) {
        node.removeChild(child);
      }
    }
  }
  for (const child of children) {
    if (child.nodeType === ELEMENT_NODE) {
      stripIgnorableWhitespace(child, preserveHere);
    }
  }
}
function canonicalize(node) {
  const parts = [];
  if (node.nodeType === DOCUMENT_NODE) {
    let afterRoot = false;
    for (const child of childNodes(node)) {
      if (child.nodeType === ELEMENT_NODE) {
        renderElement2(child, inScopeNamespacesOf(child), /* @__PURE__ */ new Map(), parts);
        afterRoot = true;
      } else if (child.nodeType === PROCESSING_INSTRUCTION_NODE) {
        const pi = child;
        if (pi.target === "xml") {
          continue;
        }
        parts.push(afterRoot ? `
${renderPi(pi)}` : `${renderPi(pi)}
`);
      }
    }
    return parts.join("");
  }
  if (node.nodeType === ELEMENT_NODE) {
    const element = node;
    renderElement2(
      element,
      inScopeNamespacesOf(element),
      /* @__PURE__ */ new Map(),
      parts,
      inheritedXmlAttributes(element)
    );
    return parts.join("");
  }
  throw new SignatureError("Solo se puede canonicalizar un documento o un elemento.");
}
function inheritedXmlAttributes(element) {
  const inherited = /* @__PURE__ */ new Map();
  let current = element.parentNode;
  while (current && current.nodeType === ELEMENT_NODE) {
    for (const attr of attrNodes(current)) {
      if (isXmlAttribute(attr) && !inherited.has(attr.nodeName)) {
        inherited.set(attr.nodeName, attr);
      }
    }
    current = current.parentNode;
  }
  for (const attr of attrNodes(element)) {
    inherited.delete(attr.nodeName);
  }
  return [...inherited.values()];
}
function isXmlAttribute(attr) {
  return attr.nodeName.startsWith("xml:");
}
function serializeDocument(doc) {
  const parts = [xmlDeclaration(doc), "\n"];
  for (const child of childNodes(doc)) {
    if (child.nodeType === PROCESSING_INSTRUCTION_NODE) {
      if (child.target === "xml") {
        continue;
      }
      parts.push(renderPi(child), "\n");
    } else if (child.nodeType === COMMENT_NODE) {
      parts.push(`<!--${child.nodeValue ?? ""}-->`, "\n");
    } else if (child.nodeType === ELEMENT_NODE) {
      parts.push(serializeNode(child), "\n");
    }
  }
  return parts.join("");
}
function renderElement2(element, inScope, rendered, parts, inheritedXmlAttrs = []) {
  const declarations = [];
  for (const [prefix, uri] of inScope) {
    if (rendered.get(prefix) === uri) {
      continue;
    }
    if (prefix === "" && uri === "" && (rendered.get("") ?? "") === "") {
      continue;
    }
    declarations.push([prefix, uri]);
  }
  declarations.sort(([a], [b]) => a === "" ? -1 : b === "" ? 1 : compareStrings(a, b));
  const attributes = [...attrNodes(element), ...inheritedXmlAttrs].filter((attr) => !isNamespaceDeclaration(attr)).map((attr) => ({ attr, uri: attributeNamespace(attr, inScope) })).sort(
    (a, b) => compareStrings(a.uri, b.uri) || compareStrings(localName(a.attr), localName(b.attr))
  );
  parts.push(`<${element.nodeName}`);
  for (const [prefix, uri] of declarations) {
    parts.push(` ${prefix === "" ? "xmlns" : `xmlns:${prefix}`}="${escapeC14nAttribute(uri)}"`);
  }
  for (const { attr } of attributes) {
    parts.push(` ${attr.nodeName}="${escapeC14nAttribute(attr.value ?? "")}"`);
  }
  parts.push(">");
  const renderedHere = new Map(rendered);
  for (const [prefix, uri] of declarations) {
    renderedHere.set(prefix, uri);
  }
  for (const child of childNodes(element)) {
    switch (child.nodeType) {
      case ELEMENT_NODE: {
        const childElement = child;
        const childScope = new Map(inScope);
        mergeNamespaceDeclarations(childElement, childScope);
        renderElement2(childElement, childScope, renderedHere, parts);
        break;
      }
      case TEXT_NODE:
      case CDATA_SECTION_NODE:
        parts.push(escapeC14nText(child.nodeValue ?? ""));
        break;
      case PROCESSING_INSTRUCTION_NODE:
        parts.push(renderPi(child));
        break;
      default:
        break;
    }
  }
  parts.push(`</${element.nodeName}>`);
}
function inScopeNamespacesOf(element) {
  const chain = [];
  let current = element;
  while (current && current.nodeType === ELEMENT_NODE) {
    chain.push(current);
    current = current.parentNode;
  }
  const map = /* @__PURE__ */ new Map();
  for (let i = chain.length - 1; i >= 0; i--) {
    mergeNamespaceDeclarations(chain[i], map);
  }
  return map;
}
function mergeNamespaceDeclarations(element, map) {
  for (const attr of attrNodes(element)) {
    if (attr.nodeName === "xmlns") {
      map.set("", attr.value ?? "");
    } else if (attr.nodeName.startsWith("xmlns:")) {
      map.set(attr.nodeName.slice("xmlns:".length), attr.value ?? "");
    }
  }
}
function isNamespaceDeclaration(attr) {
  return attr.nodeName === "xmlns" || attr.nodeName.startsWith("xmlns:") || attr.namespaceURI === XMLNS_URI;
}
function attributeNamespace(attr, inScope) {
  const colon = attr.nodeName.indexOf(":");
  if (colon < 0) {
    return "";
  }
  const prefix = attr.nodeName.slice(0, colon);
  if (prefix === "xml") {
    return XML_URI;
  }
  return inScope.get(prefix) ?? attr.namespaceURI ?? "";
}
function localName(attr) {
  const colon = attr.nodeName.indexOf(":");
  return colon < 0 ? attr.nodeName : attr.nodeName.slice(colon + 1);
}
function compareStrings(a, b) {
  return a < b ? -1 : a > b ? 1 : 0;
}
function escapeC14nText(value) {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\r/g, "&#xD;");
}
function escapeC14nAttribute(value) {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/"/g, "&quot;").replace(/\t/g, "&#x9;").replace(/\n/g, "&#xA;").replace(/\r/g, "&#xD;");
}
function serializeNode(node) {
  switch (node.nodeType) {
    case ELEMENT_NODE: {
      const element = node;
      let out = `<${element.nodeName}`;
      for (const attr of attrNodes(element)) {
        out += ` ${attr.nodeName}="${escapeLibxmlAttribute(attr.value ?? "")}"`;
      }
      out += ">";
      for (const child of childNodes(element)) {
        out += serializeNode(child);
      }
      return `${out}</${element.nodeName}>`;
    }
    case TEXT_NODE:
      return escapeLibxmlText(node.nodeValue ?? "");
    case CDATA_SECTION_NODE:
      return `<![CDATA[${node.nodeValue ?? ""}]]>`;
    case COMMENT_NODE:
      return `<!--${node.nodeValue ?? ""}-->`;
    case PROCESSING_INSTRUCTION_NODE:
      return renderPi(node);
    default:
      return "";
  }
}
function escapeLibxmlText(value) {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\r/g, "&#13;");
}
function escapeLibxmlAttribute(value) {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/\t/g, "&#9;").replace(/\n/g, "&#10;").replace(/\r/g, "&#13;");
}
function xmlDeclaration(doc) {
  const declaration = childNodes(doc).find(
    (child) => child.nodeType === PROCESSING_INSTRUCTION_NODE && child.target === "xml"
  );
  const data = declaration ? declaration.data ?? "" : "";
  const version = /version\s*=\s*["']([^"']*)["']/.exec(data)?.[1] ?? "1.0";
  const encoding = /encoding\s*=\s*["']([^"']*)["']/.exec(data)?.[1];
  const standalone = /standalone\s*=\s*["']([^"']*)["']/.exec(data)?.[1];
  let out = `<?xml version="${version}"`;
  if (encoding !== void 0 && encoding !== "") {
    out += ` encoding="${encoding}"`;
  }
  if (standalone === "yes" || standalone === "no") {
    out += ` standalone="${standalone}"`;
  }
  return `${out}?>`;
}
function renderPi(pi) {
  const data = pi.data ?? "";
  return data === "" ? `<?${pi.target}?>` : `<?${pi.target} ${data}?>`;
}
function childNodes(node) {
  const list = node.childNodes;
  const out = [];
  for (let i = 0; i < list.length; i++) {
    const child = list.item(i);
    if (child) {
      out.push(child);
    }
  }
  return out;
}
function attrNodes(element) {
  const list = element.attributes;
  const out = [];
  for (let i = 0; i < list.length; i++) {
    const attr = list.item(i);
    if (attr) {
      out.push(attr);
    }
  }
  return out;
}
function isWhitespace(value) {
  return /^[\t\n\r ]*$/.test(value);
}

// src/signing/xades-signer.ts
var NS_DS = "http://www.w3.org/2000/09/xmldsig#";
var NS_XADES = "http://uri.etsi.org/01903/v1.3.2#";
var NS_DSIG11 = "http://www.w3.org/2009/xmldsig11#";
var NS_XMLNS = "http://www.w3.org/2000/xmlns/";
var ALG_C14N = "http://www.w3.org/TR/2001/REC-xml-c14n-20010315";
var ALG_SHA1 = "http://www.w3.org/2000/09/xmldsig#sha1";
var ALG_SHA256 = "http://www.w3.org/2001/04/xmlenc#sha256";
var ALG_RSA_SHA1 = "http://www.w3.org/2000/09/xmldsig#rsa-sha1";
var ALG_RSA_SHA256 = "http://www.w3.org/2001/04/xmldsig-more#rsa-sha256";
var ALG_ECDSA_SHA1 = "http://www.w3.org/2001/04/xmldsig-more#ecdsa-sha1";
var ALG_ECDSA_SHA256 = "http://www.w3.org/2001/04/xmldsig-more#ecdsa-sha256";
var ALG_ENVELOPED = "http://www.w3.org/2000/09/xmldsig#enveloped-signature";
var TYPE_SIGNED_PROPS = "http://uri.etsi.org/01903#SignedProperties";
var DEFAULT_DESCRIPTION = "Comprobante electr\xF3nico SRI Ecuador";
var CACHE_MAX_ENTRIES = 32;
var LruCache = class {
  constructor(maxEntries) {
    this.maxEntries = maxEntries;
  }
  maxEntries;
  entries = /* @__PURE__ */ new Map();
  get size() {
    return this.entries.size;
  }
  /** Solo para tests/diagnóstico: las claves son digests, nunca material sensible. */
  keys() {
    return [...this.entries.keys()];
  }
  get(key) {
    const value = this.entries.get(key);
    if (value === void 0) {
      return void 0;
    }
    this.entries.delete(key);
    this.entries.set(key, value);
    return value;
  }
  set(key, value) {
    this.entries.delete(key);
    this.entries.set(key, value);
    while (this.entries.size > this.maxEntries) {
      const oldest = this.entries.keys().next();
      if (oldest.done === true) {
        break;
      }
      this.entries.delete(oldest.value);
    }
  }
};
function cacheKeyFor(pem) {
  return (0, import_node_crypto.createHash)("sha256").update(pem, "utf8").digest("hex");
}
var XadesSigner = class {
  digestAlgorithm;
  description;
  clock;
  /**
   * El parseo del certificado no cambia entre documentos: se memoiza.
   * Clave del caché = SHA-256 del PEM, nunca el PEM (ver
   * {@link LruCache} y `privateKeyCache`).
   */
  certificateCache = new LruCache(CACHE_MAX_ENTRIES);
  /**
   * Igual con la clave privada ya parseada (evita re-parsear el PEM por
   * firma). Indexado por SHA-256 del PEM y acotado por LRU: un `Map` sin
   * límite indexado por el PEM dejaba TODAS las claves privadas de todos los
   * tenants firmados vivas en el heap (recuperables en texto plano de un
   * volcado de memoria) y crecía sin techo en un proceso multi-emisor.
   */
  privateKeyCache = new LruCache(CACHE_MAX_ENTRIES);
  constructor(options = {}, clock = new SystemClock()) {
    const digestAlgorithm = (options.digestAlgorithm ?? "sha1").toLowerCase();
    if (digestAlgorithm !== "sha1" && digestAlgorithm !== "sha256") {
      throw new SignatureError(
        `Algoritmo de digest no soportado: ${options.digestAlgorithm}. Use sha1 o sha256.`
      );
    }
    this.digestAlgorithm = digestAlgorithm;
    this.description = options.description ?? DEFAULT_DESCRIPTION;
    this.clock = clock;
  }
  /** Firma el XML con XAdES-BES y devuelve el documento firmado completo. */
  sign(xmlContent, cert) {
    const doc = parseXml2(xmlContent);
    stripIgnorableWhitespace(doc);
    const root = doc.documentElement;
    if (!root) {
      throw new SignatureError("El XML no tiene elemento ra\xEDz.");
    }
    const docId = root.getAttribute("id") || "comprobante";
    const signingTime = this.clock.now();
    const signingTimeText = formatSigningTime(signingTime);
    const suffix = (0, import_node_crypto.createHash)("sha1").update(signingTimeText + cert.certPem, "utf8").digest("hex").slice(0, 6);
    const ids = {
      signature: `Signature${suffix}`,
      signatureValue: `SignatureValue${suffix}`,
      signedInfo: `Signature-SignedInfo${suffix}`,
      keyInfo: `Certificate${suffix}`,
      signedProperties: `Signature${suffix}-SignedProperties${suffix}`,
      object: `Signature${suffix}-Object${suffix}`,
      docRef: `Reference-ID-${suffix}`,
      signedPropsRef: `SignedPropertiesID${suffix}`,
      keyInfoRef: `CertificateRef-${suffix}`
    };
    const certInfo = this.certificateData(cert);
    const signatureAlgorithm = this.signatureAlgorithm(certInfo.keyType);
    const digestAlgorithmUri = this.digestAlgorithmUri();
    const signature = doc.createElementNS(NS_DS, "ds:Signature");
    signature.setAttributeNS(NS_XMLNS, "xmlns:ds", NS_DS);
    signature.setAttributeNS(NS_XMLNS, "xmlns:etsi", NS_XADES);
    signature.setAttribute("Id", ids.signature);
    root.appendChild(signature);
    const signedInfo = doc.createElementNS(NS_DS, "ds:SignedInfo");
    signedInfo.setAttribute("Id", ids.signedInfo);
    signature.appendChild(signedInfo);
    signedInfo.appendChild(algorithmNode(doc, "ds:CanonicalizationMethod", ALG_C14N));
    signedInfo.appendChild(algorithmNode(doc, "ds:SignatureMethod", signatureAlgorithm));
    const refProps = doc.createElementNS(NS_DS, "ds:Reference");
    refProps.setAttribute("Id", ids.signedPropsRef);
    refProps.setAttribute("Type", TYPE_SIGNED_PROPS);
    refProps.setAttribute("URI", `#${ids.signedProperties}`);
    refProps.appendChild(algorithmNode(doc, "ds:DigestMethod", digestAlgorithmUri));
    const signedPropsDigestNode = doc.createElementNS(NS_DS, "ds:DigestValue");
    refProps.appendChild(signedPropsDigestNode);
    signedInfo.appendChild(refProps);
    const refDoc = doc.createElementNS(NS_DS, "ds:Reference");
    refDoc.setAttribute("Id", ids.docRef);
    refDoc.setAttribute("URI", `#${docId}`);
    const transforms = doc.createElementNS(NS_DS, "ds:Transforms");
    transforms.appendChild(algorithmNode(doc, "ds:Transform", ALG_ENVELOPED));
    refDoc.appendChild(transforms);
    refDoc.appendChild(algorithmNode(doc, "ds:DigestMethod", digestAlgorithmUri));
    const docDigestNode = doc.createElementNS(NS_DS, "ds:DigestValue");
    refDoc.appendChild(docDigestNode);
    signedInfo.appendChild(refDoc);
    const signatureValueNode = doc.createElementNS(NS_DS, "ds:SignatureValue");
    signatureValueNode.setAttribute("Id", ids.signatureValue);
    signature.appendChild(signatureValueNode);
    signature.appendChild(this.buildKeyInfo(doc, ids.keyInfo, certInfo, cert));
    const object = doc.createElementNS(NS_DS, "ds:Object");
    object.setAttribute("Id", ids.object);
    signature.appendChild(object);
    const qualifyingProps = doc.createElementNS(NS_XADES, "etsi:QualifyingProperties");
    qualifyingProps.setAttribute("Target", `#${ids.signature}`);
    object.appendChild(qualifyingProps);
    const signedProps = this.buildSignedProperties(
      doc,
      ids.signedProperties,
      ids.docRef,
      certInfo,
      signingTimeText
    );
    qualifyingProps.appendChild(signedProps);
    root.removeChild(signature);
    setText(doc, docDigestNode, this.digestBase64(Buffer.from(canonicalize(doc), "utf8")));
    root.appendChild(signature);
    setText(
      doc,
      signedPropsDigestNode,
      this.digestBase64(Buffer.from(canonicalize(signedProps), "utf8"))
    );
    const signedInfoCanonical = Buffer.from(canonicalize(signedInfo), "utf8");
    let rawSignature;
    try {
      rawSignature = (0, import_node_crypto.sign)(this.digestAlgorithm, signedInfoCanonical, this.privateKey(cert));
    } catch (err) {
      const detail = err instanceof Error ? err.message : String(err);
      throw new SignatureError(`Error al firmar el documento: ${detail}`);
    }
    setText(
      doc,
      signatureValueNode,
      chunkSplit(rawSignature.toString("base64"), 76, "\n").trim()
    );
    return serializeDocument(doc);
  }
  /** Port de `XadesSigner::buildKeyInfo()`. */
  buildKeyInfo(doc, keyInfoId, certInfo, cert) {
    const keyInfo = doc.createElementNS(NS_DS, "ds:KeyInfo");
    keyInfo.setAttribute("Id", keyInfoId);
    const x509Data = doc.createElementNS(NS_DS, "ds:X509Data");
    keyInfo.appendChild(x509Data);
    x509Data.appendChild(
      textElement(doc, NS_DS, "ds:X509Certificate", chunkSplit(certInfo.cleanCert, 76, "\n").trim())
    );
    for (const extraCert of cert.extraCerts) {
      const cleanExtra = cleanCertificate(extraCert);
      if (cleanExtra !== certInfo.cleanCert) {
        x509Data.appendChild(
          textElement(doc, NS_DS, "ds:X509Certificate", chunkSplit(cleanExtra, 76, "\n"))
        );
      }
    }
    const keyValue = doc.createElementNS(NS_DS, "ds:KeyValue");
    keyInfo.appendChild(keyValue);
    if (certInfo.keyType === "RSA") {
      const rsaKeyValue = doc.createElementNS(NS_DS, "ds:RSAKeyValue");
      keyValue.appendChild(rsaKeyValue);
      rsaKeyValue.appendChild(
        textElement(doc, NS_DS, "ds:Modulus", chunkSplit(certInfo.modulus ?? "", 76, "\n").trim())
      );
      rsaKeyValue.appendChild(textElement(doc, NS_DS, "ds:Exponent", certInfo.exponent ?? ""));
    } else {
      const ecKeyValue = doc.createElementNS(NS_DSIG11, "dsig11:ECKeyValue");
      ecKeyValue.setAttributeNS(NS_XMLNS, "xmlns:dsig11", NS_DSIG11);
      keyValue.appendChild(ecKeyValue);
      const curveName = certInfo.curve ?? "";
      if (curveName !== "") {
        const namedCurve = doc.createElementNS(NS_DSIG11, "dsig11:NamedCurve");
        namedCurve.setAttribute("URI", curveUri(curveName));
        ecKeyValue.appendChild(namedCurve);
      }
      const publicKey = certInfo.publicKey ?? "";
      if (publicKey !== "") {
        ecKeyValue.appendChild(
          textElement(doc, NS_DSIG11, "dsig11:PublicKey", chunkSplit(publicKey, 76, "\n"))
        );
      }
    }
    return keyInfo;
  }
  /** Port de `XadesSigner::buildSignedProperties()`. */
  buildSignedProperties(doc, signedPropsId, docRefId, certInfo, signingTimeText) {
    const signedProps = doc.createElementNS(NS_XADES, "etsi:SignedProperties");
    signedProps.setAttribute("Id", signedPropsId);
    const signedSigProps = doc.createElementNS(NS_XADES, "etsi:SignedSignatureProperties");
    signedProps.appendChild(signedSigProps);
    signedSigProps.appendChild(textElement(doc, NS_XADES, "etsi:SigningTime", signingTimeText));
    const signingCert = doc.createElementNS(NS_XADES, "etsi:SigningCertificate");
    signedSigProps.appendChild(signingCert);
    const certNode = doc.createElementNS(NS_XADES, "etsi:Cert");
    signingCert.appendChild(certNode);
    const certDigestNode = doc.createElementNS(NS_XADES, "etsi:CertDigest");
    certNode.appendChild(certDigestNode);
    const digestMethod = doc.createElementNS(NS_DS, "ds:DigestMethod");
    digestMethod.setAttributeNS(NS_XMLNS, "xmlns:ds", NS_DS);
    digestMethod.setAttribute("Algorithm", this.digestAlgorithmUri());
    certDigestNode.appendChild(digestMethod);
    const digestValue = textElement(doc, NS_DS, "ds:DigestValue", certInfo.certDigest);
    digestValue.setAttributeNS(NS_XMLNS, "xmlns:ds", NS_DS);
    certDigestNode.appendChild(digestValue);
    const issuerSerial = doc.createElementNS(NS_XADES, "etsi:IssuerSerial");
    certNode.appendChild(issuerSerial);
    const issuerName = textElement(doc, NS_DS, "ds:X509IssuerName", certInfo.issuerName);
    issuerName.setAttributeNS(NS_XMLNS, "xmlns:ds", NS_DS);
    issuerSerial.appendChild(issuerName);
    const serialNumber = textElement(doc, NS_DS, "ds:X509SerialNumber", certInfo.serialNumber);
    serialNumber.setAttributeNS(NS_XMLNS, "xmlns:ds", NS_DS);
    issuerSerial.appendChild(serialNumber);
    const signedDataObjProps = doc.createElementNS(NS_XADES, "etsi:SignedDataObjectProperties");
    signedProps.appendChild(signedDataObjProps);
    const dataObjFormat = doc.createElementNS(NS_XADES, "etsi:DataObjectFormat");
    dataObjFormat.setAttribute("ObjectReference", `#${docRefId}`);
    signedDataObjProps.appendChild(dataObjFormat);
    dataObjFormat.appendChild(textElement(doc, NS_XADES, "etsi:Description", this.description));
    dataObjFormat.appendChild(textElement(doc, NS_XADES, "etsi:MimeType", "text/xml"));
    return signedProps;
  }
  /** Port de `XadesSigner::extractCertificateInfo()` (memoizado por digest del PEM). */
  certificateData(cert) {
    const key = cacheKeyFor(cert.certPem);
    const cached = this.certificateCache.get(key);
    if (cached) {
      return cached;
    }
    const computed = this.computeCertificateData(cert);
    this.certificateCache.set(key, computed);
    return computed;
  }
  computeCertificateData(cert) {
    const cleanCert = cleanCertificate(cert.certPem);
    if (cleanCert === "") {
      throw new SignatureError("No se pudo leer el certificado X.509");
    }
    const der = Buffer.from(cleanCert, "base64");
    const fields = parseCertificateFields(cert.certPem);
    let publicKey;
    try {
      publicKey = (0, import_node_crypto.createPublicKey)(cert.certPem).export({ format: "jwk" });
    } catch (err) {
      const detail = err instanceof Error ? err.message : String(err);
      throw new SignatureError(
        `No se pudo extraer la clave p\xFAblica del certificado: ${detail}`
      );
    }
    const data = {
      cleanCert,
      certDigest: this.digestBase64(der),
      issuerName: fields.issuerRfc4514,
      serialNumber: fields.serialNumberDecimal,
      keyType: fields.keyType
    };
    if (fields.keyType === "RSA") {
      data.modulus = base64UrlToBase64(publicKey.n ?? "");
      data.exponent = base64UrlToBase64(publicKey.e ?? "");
    } else {
      data.curve = publicKey.crv ?? "";
      if (publicKey.x !== void 0 && publicKey.y !== void 0) {
        const point = Buffer.concat([
          Buffer.from([4]),
          Buffer.from(publicKey.x, "base64url"),
          Buffer.from(publicKey.y, "base64url")
        ]);
        data.publicKey = point.toString("base64");
      }
    }
    return data;
  }
  privateKey(cert) {
    const cacheKey = cacheKeyFor(cert.privateKeyPem);
    const cached = this.privateKeyCache.get(cacheKey);
    if (cached) {
      return cached;
    }
    let key;
    try {
      key = (0, import_node_crypto.createPrivateKey)(cert.privateKeyPem);
    } catch (err) {
      const detail = err instanceof Error ? err.message : String(err);
      throw new SignatureError(`No se pudo cargar la clave privada para firmar. (${detail})`);
    }
    this.privateKeyCache.set(cacheKey, key);
    return key;
  }
  signatureAlgorithm(keyType) {
    if (keyType === "EC") {
      return this.digestAlgorithm === "sha256" ? ALG_ECDSA_SHA256 : ALG_ECDSA_SHA1;
    }
    return this.digestAlgorithm === "sha256" ? ALG_RSA_SHA256 : ALG_RSA_SHA1;
  }
  digestAlgorithmUri() {
    return this.digestAlgorithm === "sha256" ? ALG_SHA256 : ALG_SHA1;
  }
  digestBase64(content) {
    return (0, import_node_crypto.createHash)(this.digestAlgorithm).update(content).digest("base64");
  }
};
function algorithmNode(doc, name, algorithm) {
  const node = doc.createElementNS(NS_DS, name);
  node.setAttribute("Algorithm", algorithm);
  return node;
}
function textElement(doc, ns, name, text) {
  const element = doc.createElementNS(ns, name);
  if (text !== "") {
    element.appendChild(doc.createTextNode(text));
  }
  return element;
}
function setText(doc, element, text) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
  element.appendChild(doc.createTextNode(text));
}
function cleanCertificate(cert) {
  return cert.split("-----BEGIN CERTIFICATE-----").join("").split("-----END CERTIFICATE-----").join("").replace(/[\n\r ]/g, "");
}
function chunkSplit(value, length, separator) {
  let out = "";
  for (let i = 0; i < value.length; i += length) {
    out += value.slice(i, i + length) + separator;
  }
  return out;
}
function base64UrlToBase64(value) {
  return Buffer.from(value, "base64url").toString("base64");
}
function formatSigningTime(date) {
  if (Number.isNaN(date.getTime())) {
    throw new SignatureError("El reloj devolvi\xF3 una fecha inv\xE1lida.");
  }
  const pad = (value, width = 2) => String(value).padStart(width, "0");
  const offsetMinutes = -date.getTimezoneOffset();
  const sign = offsetMinutes < 0 ? "-" : "+";
  const absolute = Math.abs(offsetMinutes);
  return `${pad(date.getFullYear(), 4)}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}${sign}${pad(Math.floor(absolute / 60))}:${pad(absolute % 60)}`;
}
function curveUri(curveName) {
  const curves = {
    "P-256": "urn:oid:1.2.840.10045.3.1.7",
    prime256v1: "urn:oid:1.2.840.10045.3.1.7",
    secp256r1: "urn:oid:1.2.840.10045.3.1.7",
    "P-384": "urn:oid:1.3.132.0.34",
    secp384r1: "urn:oid:1.3.132.0.34",
    "P-521": "urn:oid:1.3.132.0.35",
    secp521r1: "urn:oid:1.3.132.0.35"
  };
  return curves[curveName] ?? `urn:oid:${curveName}`;
}

// src/utils/clave-acceso.ts
function generarClaveAcceso(p) {
  const tipoEmision = p.tipoEmision ?? "1";
  const fecha = p.fecha.replace(/\//g, "");
  const clave48 = fecha + p.tipoComprobante + p.ruc + p.ambiente + p.serie + p.numero + p.codigoNum + tipoEmision;
  if (clave48.length !== 48) {
    throw new ValidationError(
      "Base de clave de acceso inv\xE1lida",
      [`Debe tener 48 d\xEDgitos, actual: ${clave48.length}`]
    );
  }
  if (!/^\d+$/.test(clave48)) {
    throw new ValidationError("Base de clave de acceso inv\xE1lida", [
      "Debe contener solo d\xEDgitos"
    ]);
  }
  const dv = calcularDigitoVerificador(clave48);
  return clave48 + dv;
}
function calcularDigitoVerificador(cadena48) {
  if (cadena48.length !== 48) {
    throw new ValidationError(
      "Cadena para d\xEDgito verificador inv\xE1lida",
      [`Debe tener 48 d\xEDgitos, actual: ${cadena48.length}`]
    );
  }
  if (!/^\d+$/.test(cadena48)) {
    throw new ValidationError("Cadena para d\xEDgito verificador inv\xE1lida", [
      "Debe contener solo d\xEDgitos"
    ]);
  }
  const invertida = cadena48.split("").reverse().join("");
  let suma = 0;
  let factor = 2;
  for (let i = 0; i < invertida.length; i++) {
    const digito = parseInt(invertida[i], 10);
    suma += digito * factor;
    factor++;
    if (factor > 7) {
      factor = 2;
    }
  }
  const residuo = suma % 11;
  let dv = 11 - residuo;
  if (dv === 11) {
    return 0;
  }
  if (dv === 10) {
    return 1;
  }
  return dv;
}

// src/utils/ruc-validator.ts
var SRI_RUC_URL = "https://srienlinea.sri.gob.ec/sri-catastro-sujeto-servicio-internet/rest/ConsolidadoContribuyente/existePorNumeroRuc?numeroRuc=";
var DEFAULT_TIMEOUT_MS = 3e3;
function validarRucLocal(ruc, opts = {}) {
  if (!esRucLocalValido(ruc)) return false;
  if (opts.checksum && !validarRucChecksum(ruc)) return false;
  return true;
}
var PROVINCIAS_VALIDAS = /* @__PURE__ */ new Set([
  "01",
  "02",
  "03",
  "04",
  "05",
  "06",
  "07",
  "08",
  "09",
  "10",
  "11",
  "12",
  "13",
  "14",
  "15",
  "16",
  "17",
  "18",
  "19",
  "20",
  "21",
  "22",
  "23",
  "24",
  "30"
]);
var COEFICIENTES_PUBLICA = [3, 2, 7, 6, 5, 4, 3, 2];
var COEFICIENTES_SOCIEDAD = [4, 3, 2, 7, 6, 5, 4, 3, 2];
function digitoVerificadorNatural(nueveDigitos) {
  const coeficientes = [2, 1, 2, 1, 2, 1, 2, 1, 2];
  let suma = 0;
  for (let i = 0; i < 9; i++) {
    let producto = Number(nueveDigitos[i]) * coeficientes[i];
    if (producto >= 10) producto -= 9;
    suma += producto;
  }
  const resto = suma % 10;
  return resto === 0 ? 0 : 10 - resto;
}
function digitoVerificadorModulo11(prefijo, coeficientes) {
  let suma = 0;
  for (let i = 0; i < coeficientes.length; i++) {
    suma += Number(prefijo[i]) * coeficientes[i];
  }
  const resto = suma % 11;
  return resto === 0 ? 0 : 11 - resto;
}
function validarRucChecksum(ruc) {
  if (!/^\d{13}$/.test(ruc)) return false;
  if (!PROVINCIAS_VALIDAS.has(ruc.slice(0, 2))) return false;
  const tercerDigito = Number(ruc[2]);
  if (tercerDigito >= 0 && tercerDigito <= 5) {
    if (ruc.slice(10, 13) === "000") return false;
    return digitoVerificadorNatural(ruc.slice(0, 9)) === Number(ruc[9]);
  }
  if (tercerDigito === 6) {
    if (ruc.slice(9, 13) === "0000") return false;
    return digitoVerificadorModulo11(ruc.slice(0, 8), COEFICIENTES_PUBLICA) === Number(ruc[8]);
  }
  if (tercerDigito === 9) {
    if (ruc.slice(10, 13) === "000") return false;
    return digitoVerificadorModulo11(ruc.slice(0, 9), COEFICIENTES_SOCIEDAD) === Number(ruc[9]);
  }
  return false;
}
async function checkOnline(ruc, fetchImpl, timeoutMs) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetchImpl(`${SRI_RUC_URL}${ruc}`, { signal: controller.signal });
    if (response.status !== 200) return null;
    const body = (await response.text()).trim();
    if (body === "true") return true;
    if (body === "false") return false;
    return null;
  } catch {
    return null;
  } finally {
    clearTimeout(timer);
  }
}
async function validarRucOnline(ruc, opts = {}) {
  if (!validarRucLocal(ruc)) return false;
  const fetchImpl = opts.fetch ?? fetch;
  const timeoutMs = opts.timeoutMs ?? DEFAULT_TIMEOUT_MS;
  const online = await checkOnline(ruc, fetchImpl, timeoutMs);
  return online ?? true;
}

// src/xml/factura.serializer.ts
var FacturaXmlSerializer = class _FacturaXmlSerializer {
  static VERSION = "2.1.0";
  static COD_DOC = "01" /* Factura */;
  static SCALE_MONEY = 2;
  static SCALE_QUANTITY = 6;
  serialize(factura, claveAcceso) {
    const b = new XmlBuilder();
    const root = new XmlElement("factura");
    root.setAttribute("id", "comprobante");
    root.setAttribute("version", _FacturaXmlSerializer.VERSION);
    this.infoTributaria(b, root, factura, claveAcceso);
    this.infoFactura(b, root, factura);
    this.detalles(b, root, factura);
    this.infoAdicional(b, root, factura);
    return serializeXmlDocument(root);
  }
  infoTributaria(b, root, f, claveAcceso) {
    const info = f.infoTributaria;
    const node = b.child(root, "infoTributaria");
    b.child(node, "ambiente", info.ambiente);
    b.child(node, "tipoEmision", info.tipoEmision ?? "1" /* Normal */);
    b.child(node, "razonSocial", info.razonSocial);
    if (info.nombreComercial !== void 0) {
      b.child(node, "nombreComercial", info.nombreComercial);
    }
    b.child(node, "ruc", info.ruc);
    b.child(node, "claveAcceso", claveAcceso);
    b.child(node, "codDoc", _FacturaXmlSerializer.COD_DOC);
    b.child(node, "estab", info.estab);
    b.child(node, "ptoEmi", info.ptoEmi);
    b.child(node, "secuencial", info.secuencial);
    b.child(node, "dirMatriz", info.dirMatriz);
    if (info.agenteRetencion !== void 0) {
      b.child(node, "agenteRetencion", info.agenteRetencion);
    }
    if (info.regimenRimpe !== void 0) {
      b.child(node, "contribuyenteRimpe", LEYENDA_RIMPE[info.regimenRimpe]);
    }
  }
  infoFactura(b, root, f) {
    const { SCALE_MONEY } = _FacturaXmlSerializer;
    const node = b.child(root, "infoFactura");
    b.child(node, "fechaEmision", f.fechaEmision);
    if (f.dirEstablecimiento !== void 0) {
      b.child(node, "dirEstablecimiento", f.dirEstablecimiento);
    }
    if (f.contribuyenteEspecial !== void 0) {
      b.child(node, "contribuyenteEspecial", f.contribuyenteEspecial);
    }
    b.child(node, "obligadoContabilidad", f.obligadoContabilidad ?? "NO");
    b.child(node, "tipoIdentificacionComprador", f.tipoIdentificacionComprador);
    if (f.guiaRemision !== void 0) {
      b.child(node, "guiaRemision", f.guiaRemision);
    }
    b.child(node, "razonSocialComprador", f.razonSocialComprador);
    b.child(node, "identificacionComprador", f.identificacionComprador);
    if (f.direccionComprador !== void 0) {
      b.child(node, "direccionComprador", f.direccionComprador);
    }
    b.child(node, "totalSinImpuestos", formatMonto(f.totalSinImpuestos, SCALE_MONEY));
    b.child(node, "totalDescuento", formatMonto(f.totalDescuento, SCALE_MONEY));
    const tci = b.child(node, "totalConImpuestos");
    for (const imp of f.totalConImpuestos) {
      const ti = b.child(tci, "totalImpuesto");
      b.child(ti, "codigo", imp.codigo);
      b.child(ti, "codigoPorcentaje", imp.codigoPorcentaje);
      if (imp.descuentoAdicional !== void 0) {
        b.child(ti, "descuentoAdicional", formatMonto(imp.descuentoAdicional, SCALE_MONEY));
      }
      b.child(ti, "baseImponible", formatMonto(imp.baseImponible, SCALE_MONEY));
      b.child(ti, "valor", formatMonto(imp.valor, SCALE_MONEY));
    }
    b.child(node, "propina", formatMonto(f.propina ?? "0.00", SCALE_MONEY));
    b.child(node, "importeTotal", formatMonto(f.importeTotal, SCALE_MONEY));
    b.child(node, "moneda", f.moneda ?? "DOLAR");
    const pagos = b.child(node, "pagos");
    for (const pago of f.pagos) {
      const p = b.child(pagos, "pago");
      b.child(p, "formaPago", pago.formaPago);
      b.child(p, "total", formatMonto(pago.total, SCALE_MONEY));
      if (pago.plazo !== void 0) {
        b.child(p, "plazo", pago.plazo);
        b.child(p, "unidadTiempo", pago.unidadTiempo ?? "dias");
      }
    }
  }
  detalles(b, root, f) {
    const { SCALE_MONEY, SCALE_QUANTITY } = _FacturaXmlSerializer;
    const node = b.child(root, "detalles");
    for (const det of f.detalles) {
      const d = b.child(node, "detalle");
      b.child(d, "codigoPrincipal", det.codigoPrincipal ?? "");
      if (det.codigoAuxiliar !== void 0) {
        b.child(d, "codigoAuxiliar", det.codigoAuxiliar);
      }
      b.child(d, "descripcion", det.descripcion);
      b.child(d, "cantidad", formatMonto(det.cantidad, SCALE_QUANTITY));
      b.child(d, "precioUnitario", formatMonto(det.precioUnitario, SCALE_QUANTITY));
      b.child(d, "descuento", formatMonto(det.descuento, SCALE_MONEY));
      b.child(
        d,
        "precioTotalSinImpuesto",
        formatMonto(det.precioTotalSinImpuesto, SCALE_MONEY)
      );
      const daEntries = det.detallesAdicionales ? Object.entries(det.detallesAdicionales) : [];
      if (daEntries.length > 0) {
        const da = b.child(d, "detallesAdicionales");
        for (const [nombre, valor] of daEntries) {
          const item = b.child(da, "detAdicional");
          item.setAttribute("nombre", nombre);
          item.setAttribute("valor", valor);
        }
      }
      const imps = b.child(d, "impuestos");
      for (const imp of det.impuestos) {
        const i = b.child(imps, "impuesto");
        b.child(i, "codigo", imp.codigo);
        b.child(i, "codigoPorcentaje", imp.codigoPorcentaje);
        const tarifaStr = imp.tarifa === "" ? "0" : imp.tarifa;
        b.child(i, "tarifa", formatMonto(tarifaStr, SCALE_MONEY));
        b.child(i, "baseImponible", formatMonto(imp.baseImponible, SCALE_MONEY));
        b.child(i, "valor", formatMonto(imp.valor, SCALE_MONEY));
      }
    }
  }
  /**
   * `<infoAdicional>` — último hijo de `<factura>`, después de `<detalles>`
   * (port de `XmlGenerator::addInfoAdicional()` / `FacturaGenerator::generate()`,
   * paso 4). No existe en el value object v2 de PHP, pero sí en el XSD
   * oficial y en el generador 1.x; se omite el elemento por completo si
   * `infoAdicional` está ausente o vacío (mismo criterio que
   * `if (empty($infoAdicional)) return;`).
   */
  infoAdicional(b, root, f) {
    const entries = f.infoAdicional ? Object.entries(f.infoAdicional) : [];
    if (entries.length === 0) {
      return;
    }
    const node = b.child(root, "infoAdicional");
    for (const [nombre, valor] of entries) {
      const campo = b.child(node, "campoAdicional", valor);
      campo.setAttribute("nombre", nombre);
    }
  }
};

// src/xml/common.ts
function writeInfoTributaria(b, root, info, claveAcceso, codDoc) {
  const node = b.child(root, "infoTributaria");
  b.child(node, "ambiente", info.ambiente);
  b.child(node, "tipoEmision", info.tipoEmision ?? "1" /* Normal */);
  b.child(node, "razonSocial", info.razonSocial);
  if (info.nombreComercial !== void 0) {
    b.child(node, "nombreComercial", info.nombreComercial);
  }
  b.child(node, "ruc", info.ruc);
  b.child(node, "claveAcceso", claveAcceso);
  b.child(node, "codDoc", codDoc);
  b.child(node, "estab", info.estab);
  b.child(node, "ptoEmi", info.ptoEmi);
  b.child(node, "secuencial", info.secuencial);
  b.child(node, "dirMatriz", info.dirMatriz);
  if (info.agenteRetencion !== void 0) {
    b.child(node, "agenteRetencion", info.agenteRetencion);
  }
  if (info.regimenRimpe !== void 0) {
    b.child(node, "contribuyenteRimpe", LEYENDA_RIMPE[info.regimenRimpe]);
  }
}
function writeInfoAdicional(b, root, infoAdicional) {
  const entries = infoAdicional ? Object.entries(infoAdicional) : [];
  if (entries.length === 0) {
    return;
  }
  const node = b.child(root, "infoAdicional");
  for (const [nombre, valor] of entries) {
    const campo = b.child(node, "campoAdicional", valor);
    campo.setAttribute("nombre", nombre);
  }
}

// src/xml/guia-remision.serializer.ts
var GuiaRemisionXmlSerializer = class _GuiaRemisionXmlSerializer {
  static VERSION = "1.1.0";
  static COD_DOC = "06" /* GuiaRemision */;
  serialize(doc, claveAcceso) {
    const b = new XmlBuilder();
    const root = new XmlElement("guiaRemision");
    root.setAttribute("id", "comprobante");
    root.setAttribute("version", _GuiaRemisionXmlSerializer.VERSION);
    writeInfoTributaria(b, root, doc.infoTributaria, claveAcceso, _GuiaRemisionXmlSerializer.COD_DOC);
    this.infoGuiaRemision(b, root, doc);
    this.destinatarios(b, root, doc);
    writeInfoAdicional(b, root, doc.infoAdicional);
    return serializeXmlDocument(root);
  }
  infoGuiaRemision(b, root, doc) {
    const node = b.child(root, "infoGuiaRemision");
    b.child(node, "dirEstablecimiento", doc.dirEstablecimiento);
    b.child(node, "dirPartida", doc.dirPartida);
    b.child(node, "razonSocialTransportista", doc.razonSocialTransportista);
    b.child(node, "tipoIdentificacionTransportista", doc.tipoIdentificacionTransportista);
    b.child(node, "rucTransportista", doc.rucTransportista);
    if (doc.rise !== void 0) {
      b.child(node, "rise", doc.rise);
    }
    if (doc.obligadoContabilidad !== void 0) {
      b.child(node, "obligadoContabilidad", doc.obligadoContabilidad);
    }
    if (doc.contribuyenteEspecial !== void 0) {
      b.child(node, "contribuyenteEspecial", doc.contribuyenteEspecial);
    }
    b.child(node, "fechaIniTransporte", doc.fechaIniTransporte);
    b.child(node, "fechaFinTransporte", doc.fechaFinTransporte);
    b.child(node, "placa", doc.placa);
  }
  destinatarios(b, root, doc) {
    const destsNode = b.child(root, "destinatarios");
    for (const dest of doc.destinatarios) {
      const destItem = b.child(destsNode, "destinatario");
      b.child(destItem, "identificacionDestinatario", dest.identificacionDestinatario);
      b.child(destItem, "razonSocialDestinatario", dest.razonSocialDestinatario);
      b.child(destItem, "dirDestinatario", dest.dirDestinatario);
      b.child(destItem, "motivoTraslado", dest.motivoTraslado);
      if (dest.docAduaneroUnico !== void 0) {
        b.child(destItem, "docAduaneroUnico", dest.docAduaneroUnico);
      }
      if (dest.codEstabDestino !== void 0) {
        b.child(destItem, "codEstabDestino", dest.codEstabDestino);
      }
      if (dest.ruta !== void 0) {
        b.child(destItem, "ruta", dest.ruta);
      }
      if (dest.codDocSustento !== void 0) {
        b.child(destItem, "codDocSustento", dest.codDocSustento);
      }
      if (dest.numDocSustento !== void 0) {
        b.child(destItem, "numDocSustento", dest.numDocSustento);
      }
      if (dest.numAutDocSustento !== void 0) {
        b.child(destItem, "numAutDocSustento", dest.numAutDocSustento);
      }
      if (dest.fechaEmisionDocSustento !== void 0) {
        b.child(destItem, "fechaEmisionDocSustento", dest.fechaEmisionDocSustento);
      }
      if (dest.detalles.length > 0) {
        const detallesNode = b.child(destItem, "detalles");
        for (const det of dest.detalles) {
          const detItem = b.child(detallesNode, "detalle");
          if (det.codigoInterno !== void 0) {
            b.child(detItem, "codigoInterno", det.codigoInterno);
          }
          if (det.codigoAdicional !== void 0) {
            b.child(detItem, "codigoAdicional", det.codigoAdicional);
          }
          b.child(detItem, "descripcion", det.descripcion);
          b.child(detItem, "cantidad", det.cantidad);
          const daEntries = det.detallesAdicionales ? Object.entries(det.detallesAdicionales) : [];
          if (daEntries.length > 0) {
            const daNode = b.child(detItem, "detallesAdicionales");
            for (const [nombre, valor] of daEntries) {
              const item = b.child(daNode, "detAdicional");
              item.setAttribute("nombre", nombre);
              item.setAttribute("valor", valor);
            }
          }
        }
      }
    }
  }
};

// src/xml/liquidacion-compra.serializer.ts
var LiquidacionCompraXmlSerializer = class _LiquidacionCompraXmlSerializer {
  static VERSION = "1.1.0";
  static COD_DOC = "03" /* LiquidacionCompra */;
  static SCALE_MONEY = 2;
  static SCALE_QUANTITY = 6;
  serialize(doc, claveAcceso) {
    const b = new XmlBuilder();
    const root = new XmlElement("liquidacionCompra");
    root.setAttribute("id", "comprobante");
    root.setAttribute("version", _LiquidacionCompraXmlSerializer.VERSION);
    writeInfoTributaria(
      b,
      root,
      doc.infoTributaria,
      claveAcceso,
      _LiquidacionCompraXmlSerializer.COD_DOC
    );
    this.infoLiquidacionCompra(b, root, doc);
    this.detalles(b, root, doc);
    writeInfoAdicional(b, root, doc.infoAdicional);
    return serializeXmlDocument(root);
  }
  infoLiquidacionCompra(b, root, doc) {
    const { SCALE_MONEY } = _LiquidacionCompraXmlSerializer;
    const node = b.child(root, "infoLiquidacionCompra");
    b.child(node, "fechaEmision", doc.fechaEmision);
    if (doc.dirEstablecimiento !== void 0) {
      b.child(node, "dirEstablecimiento", doc.dirEstablecimiento);
    }
    if (doc.contribuyenteEspecial !== void 0) {
      b.child(node, "contribuyenteEspecial", doc.contribuyenteEspecial);
    }
    b.child(node, "obligadoContabilidad", doc.obligadoContabilidad ?? "NO");
    b.child(node, "tipoIdentificacionProveedor", doc.tipoIdentificacionProveedor);
    b.child(node, "razonSocialProveedor", doc.razonSocialProveedor);
    b.child(node, "identificacionProveedor", doc.identificacionProveedor);
    if (doc.direccionProveedor !== void 0) {
      b.child(node, "direccionProveedor", doc.direccionProveedor);
    }
    b.child(node, "totalSinImpuestos", formatMonto(doc.totalSinImpuestos, SCALE_MONEY));
    b.child(node, "totalDescuento", formatMonto(doc.totalDescuento, SCALE_MONEY));
    const tci = b.child(node, "totalConImpuestos");
    for (const imp of doc.totalConImpuestos) {
      const ti = b.child(tci, "totalImpuesto");
      b.child(ti, "codigo", imp.codigo);
      b.child(ti, "codigoPorcentaje", imp.codigoPorcentaje);
      if (imp.descuentoAdicional !== void 0) {
        b.child(ti, "descuentoAdicional", formatMonto(imp.descuentoAdicional, SCALE_MONEY));
      }
      b.child(ti, "baseImponible", formatMonto(imp.baseImponible, SCALE_MONEY));
      b.child(ti, "valor", formatMonto(imp.valor, SCALE_MONEY));
    }
    b.child(node, "importeTotal", formatMonto(doc.importeTotal, SCALE_MONEY));
    b.child(node, "moneda", doc.moneda ?? "DOLAR");
    const pagos = b.child(node, "pagos");
    for (const pago of doc.pagos) {
      const p = b.child(pagos, "pago");
      b.child(p, "formaPago", pago.formaPago);
      b.child(p, "total", formatMonto(pago.total, SCALE_MONEY));
      if (pago.plazo !== void 0) {
        b.child(p, "plazo", pago.plazo);
        b.child(p, "unidadTiempo", pago.unidadTiempo ?? "dias");
      }
    }
  }
  detalles(b, root, doc) {
    const { SCALE_MONEY, SCALE_QUANTITY } = _LiquidacionCompraXmlSerializer;
    const node = b.child(root, "detalles");
    for (const det of doc.detalles) {
      const d = b.child(node, "detalle");
      b.child(d, "codigoPrincipal", det.codigoPrincipal ?? "");
      if (det.codigoAuxiliar !== void 0) {
        b.child(d, "codigoAuxiliar", det.codigoAuxiliar);
      }
      b.child(d, "descripcion", det.descripcion);
      b.child(d, "cantidad", formatMonto(det.cantidad, SCALE_QUANTITY));
      b.child(d, "precioUnitario", formatMonto(det.precioUnitario, SCALE_QUANTITY));
      b.child(d, "descuento", formatMonto(det.descuento, SCALE_MONEY));
      b.child(d, "precioTotalSinImpuesto", formatMonto(det.precioTotalSinImpuesto, SCALE_MONEY));
      const daEntries = det.detallesAdicionales ? Object.entries(det.detallesAdicionales) : [];
      if (daEntries.length > 0) {
        const da = b.child(d, "detallesAdicionales");
        for (const [nombre, valor] of daEntries) {
          const item = b.child(da, "detAdicional");
          item.setAttribute("nombre", nombre);
          item.setAttribute("valor", valor);
        }
      }
      const imps = b.child(d, "impuestos");
      for (const imp of det.impuestos) {
        const i = b.child(imps, "impuesto");
        b.child(i, "codigo", imp.codigo);
        b.child(i, "codigoPorcentaje", imp.codigoPorcentaje);
        const tarifaStr = imp.tarifa === "" ? "0" : imp.tarifa;
        b.child(i, "tarifa", formatMonto(tarifaStr, SCALE_MONEY));
        b.child(i, "baseImponible", formatMonto(imp.baseImponible, SCALE_MONEY));
        b.child(i, "valor", formatMonto(imp.valor, SCALE_MONEY));
      }
    }
  }
};

// src/xml/nota-credito.serializer.ts
var NotaCreditoXmlSerializer = class _NotaCreditoXmlSerializer {
  static VERSION = "1.1.0";
  static COD_DOC = "04" /* NotaCredito */;
  static SCALE_MONEY = 2;
  static SCALE_QUANTITY = 6;
  serialize(doc, claveAcceso) {
    const b = new XmlBuilder();
    const root = new XmlElement("notaCredito");
    root.setAttribute("id", "comprobante");
    root.setAttribute("version", _NotaCreditoXmlSerializer.VERSION);
    writeInfoTributaria(b, root, doc.infoTributaria, claveAcceso, _NotaCreditoXmlSerializer.COD_DOC);
    this.infoNotaCredito(b, root, doc);
    this.detalles(b, root, doc);
    writeInfoAdicional(b, root, doc.infoAdicional);
    return serializeXmlDocument(root);
  }
  infoNotaCredito(b, root, doc) {
    const { SCALE_MONEY } = _NotaCreditoXmlSerializer;
    const node = b.child(root, "infoNotaCredito");
    b.child(node, "fechaEmision", doc.fechaEmision);
    if (doc.dirEstablecimiento !== void 0) {
      b.child(node, "dirEstablecimiento", doc.dirEstablecimiento);
    }
    b.child(node, "tipoIdentificacionComprador", doc.tipoIdentificacionComprador);
    b.child(node, "razonSocialComprador", doc.razonSocialComprador);
    b.child(node, "identificacionComprador", doc.identificacionComprador);
    if (doc.contribuyenteEspecial !== void 0) {
      b.child(node, "contribuyenteEspecial", doc.contribuyenteEspecial);
    }
    b.child(node, "obligadoContabilidad", doc.obligadoContabilidad ?? "NO");
    if (doc.rise !== void 0) {
      b.child(node, "rise", doc.rise);
    }
    b.child(node, "codDocModificado", doc.codDocModificado);
    b.child(node, "numDocModificado", doc.numDocModificado);
    b.child(node, "fechaEmisionDocSustento", doc.fechaEmisionDocSustento);
    b.child(node, "totalSinImpuestos", formatMonto(doc.totalSinImpuestos, SCALE_MONEY));
    b.child(node, "valorModificacion", formatMonto(doc.valorModificacion, SCALE_MONEY));
    b.child(node, "moneda", doc.moneda ?? "DOLAR");
    const tci = b.child(node, "totalConImpuestos");
    for (const imp of doc.totalConImpuestos) {
      const ti = b.child(tci, "totalImpuesto");
      b.child(ti, "codigo", imp.codigo);
      b.child(ti, "codigoPorcentaje", imp.codigoPorcentaje);
      if (imp.descuentoAdicional !== void 0) {
        b.child(ti, "descuentoAdicional", formatMonto(imp.descuentoAdicional, SCALE_MONEY));
      }
      b.child(ti, "baseImponible", formatMonto(imp.baseImponible, SCALE_MONEY));
      b.child(ti, "valor", formatMonto(imp.valor, SCALE_MONEY));
    }
    b.child(node, "motivo", doc.motivo);
  }
  detalles(b, root, doc) {
    const { SCALE_MONEY, SCALE_QUANTITY } = _NotaCreditoXmlSerializer;
    const node = b.child(root, "detalles");
    for (const det of doc.detalles) {
      const d = b.child(node, "detalle");
      b.child(d, "codigoInterno", det.codigoPrincipal ?? "");
      if (det.codigoAuxiliar !== void 0) {
        b.child(d, "codigoAdicional", det.codigoAuxiliar);
      }
      b.child(d, "descripcion", det.descripcion);
      b.child(d, "cantidad", formatMonto(det.cantidad, SCALE_QUANTITY));
      b.child(d, "precioUnitario", formatMonto(det.precioUnitario, SCALE_QUANTITY));
      b.child(d, "descuento", formatMonto(det.descuento, SCALE_MONEY));
      b.child(d, "precioTotalSinImpuesto", formatMonto(det.precioTotalSinImpuesto, SCALE_MONEY));
      const daEntries = det.detallesAdicionales ? Object.entries(det.detallesAdicionales) : [];
      if (daEntries.length > 0) {
        const da = b.child(d, "detallesAdicionales");
        for (const [nombre, valor] of daEntries) {
          const item = b.child(da, "detAdicional");
          item.setAttribute("nombre", nombre);
          item.setAttribute("valor", valor);
        }
      }
      const imps = b.child(d, "impuestos");
      for (const imp of det.impuestos) {
        const i = b.child(imps, "impuesto");
        b.child(i, "codigo", imp.codigo);
        b.child(i, "codigoPorcentaje", imp.codigoPorcentaje);
        b.child(i, "baseImponible", formatMonto(imp.baseImponible, SCALE_MONEY));
        b.child(i, "valor", formatMonto(imp.valor, SCALE_MONEY));
      }
    }
  }
};

// src/xml/nota-debito.serializer.ts
var NotaDebitoXmlSerializer = class _NotaDebitoXmlSerializer {
  static VERSION = "1.0.0";
  static COD_DOC = "05" /* NotaDebito */;
  static SCALE_MONEY = 2;
  serialize(doc, claveAcceso) {
    const b = new XmlBuilder();
    const root = new XmlElement("notaDebito");
    root.setAttribute("id", "comprobante");
    root.setAttribute("version", _NotaDebitoXmlSerializer.VERSION);
    writeInfoTributaria(b, root, doc.infoTributaria, claveAcceso, _NotaDebitoXmlSerializer.COD_DOC);
    this.infoNotaDebito(b, root, doc);
    this.motivos(b, root, doc);
    writeInfoAdicional(b, root, doc.infoAdicional);
    return serializeXmlDocument(root);
  }
  infoNotaDebito(b, root, doc) {
    const { SCALE_MONEY } = _NotaDebitoXmlSerializer;
    const node = b.child(root, "infoNotaDebito");
    b.child(node, "fechaEmision", doc.fechaEmision);
    if (doc.dirEstablecimiento !== void 0) {
      b.child(node, "dirEstablecimiento", doc.dirEstablecimiento);
    }
    b.child(node, "tipoIdentificacionComprador", doc.tipoIdentificacionComprador);
    b.child(node, "razonSocialComprador", doc.razonSocialComprador);
    b.child(node, "identificacionComprador", doc.identificacionComprador);
    if (doc.contribuyenteEspecial !== void 0) {
      b.child(node, "contribuyenteEspecial", doc.contribuyenteEspecial);
    }
    b.child(node, "obligadoContabilidad", doc.obligadoContabilidad ?? "NO");
    if (doc.rise !== void 0) {
      b.child(node, "rise", doc.rise);
    }
    b.child(node, "codDocModificado", doc.codDocModificado);
    b.child(node, "numDocModificado", doc.numDocModificado);
    b.child(node, "fechaEmisionDocSustento", doc.fechaEmisionDocSustento);
    b.child(node, "totalSinImpuestos", formatMonto(doc.totalSinImpuestos, SCALE_MONEY));
    if (doc.impuestos.length > 0) {
      const impNode = b.child(node, "impuestos");
      for (const imp of doc.impuestos) {
        const i = b.child(impNode, "impuesto");
        b.child(i, "codigo", imp.codigo);
        b.child(i, "codigoPorcentaje", imp.codigoPorcentaje);
        if (imp.descuentoAdicional !== void 0) {
          b.child(i, "descuentoAdicional", formatMonto(imp.descuentoAdicional, SCALE_MONEY));
        }
        b.child(i, "baseImponible", formatMonto(imp.baseImponible, SCALE_MONEY));
        b.child(i, "valor", formatMonto(imp.valor, SCALE_MONEY));
      }
    }
    b.child(node, "valorTotal", formatMonto(doc.valorTotal, SCALE_MONEY));
    if (doc.pagos.length > 0) {
      const pagosNode = b.child(node, "pagos");
      for (const pago of doc.pagos) {
        const p = b.child(pagosNode, "pago");
        b.child(p, "formaPago", pago.formaPago);
        b.child(p, "total", formatMonto(pago.total, SCALE_MONEY));
        if (pago.plazo !== void 0) {
          b.child(p, "plazo", pago.plazo);
          b.child(p, "unidadTiempo", pago.unidadTiempo ?? "dias");
        }
      }
    }
  }
  motivos(b, root, doc) {
    const node = b.child(root, "motivos");
    for (const motivo of doc.motivos) {
      const m = b.child(node, "motivo");
      b.child(m, "razon", motivo.razon);
      b.child(m, "valor", formatMonto(motivo.valor, _NotaDebitoXmlSerializer.SCALE_MONEY));
    }
  }
};

// src/xml/retencion.serializer.ts
var RetencionXmlSerializer = class _RetencionXmlSerializer {
  static VERSION = "2.0.0";
  static COD_DOC = "07" /* Retencion */;
  serialize(doc, claveAcceso) {
    const b = new XmlBuilder();
    const root = new XmlElement("comprobanteRetencion");
    root.setAttribute("id", "comprobante");
    root.setAttribute("version", _RetencionXmlSerializer.VERSION);
    writeInfoTributaria(b, root, doc.infoTributaria, claveAcceso, _RetencionXmlSerializer.COD_DOC);
    this.infoCompRetencion(b, root, doc);
    this.docsSustento(b, root, doc);
    writeInfoAdicional(b, root, doc.infoAdicional);
    return serializeXmlDocument(root);
  }
  infoCompRetencion(b, root, doc) {
    const node = b.child(root, "infoCompRetencion");
    b.child(node, "fechaEmision", doc.fechaEmision);
    b.child(node, "dirEstablecimiento", doc.dirEstablecimiento);
    if (doc.contribuyenteEspecial !== void 0) {
      b.child(node, "contribuyenteEspecial", doc.contribuyenteEspecial);
    }
    if (doc.obligadoContabilidad !== void 0) {
      b.child(node, "obligadoContabilidad", doc.obligadoContabilidad);
    }
    b.child(node, "tipoIdentificacionSujetoRetenido", doc.tipoIdentificacionSujetoRetenido);
    if (doc.tipoSujetoRetenido !== void 0) {
      b.child(node, "tipoSujetoRetenido", doc.tipoSujetoRetenido);
    }
    if (doc.parteRel !== void 0) {
      b.child(node, "parteRel", doc.parteRel);
    }
    b.child(node, "razonSocialSujetoRetenido", doc.razonSocialSujetoRetenido);
    b.child(node, "identificacionSujetoRetenido", doc.identificacionSujetoRetenido);
    b.child(node, "periodoFiscal", doc.periodoFiscal);
  }
  docsSustento(b, root, doc) {
    const docsNode = b.child(root, "docsSustento");
    for (const docS of doc.docsSustento) {
      const docItem = b.child(docsNode, "docSustento");
      b.child(docItem, "codSustento", docS.codSustento);
      b.child(docItem, "codDocSustento", docS.codDocSustento);
      b.child(docItem, "numDocSustento", docS.numDocSustento);
      b.child(docItem, "fechaEmisionDocSustento", docS.fechaEmisionDocSustento);
      if (docS.fechaRegistroContable !== void 0) {
        b.child(docItem, "fechaRegistroContable", docS.fechaRegistroContable);
      }
      if (docS.numAutDocSustento !== void 0) {
        b.child(docItem, "numAutDocSustento", docS.numAutDocSustento);
      }
      if (docS.pagoLocExt !== void 0) {
        b.child(docItem, "pagoLocExt", docS.pagoLocExt);
      }
      if (docS.tipoRegi !== void 0) {
        b.child(docItem, "tipoRegi", docS.tipoRegi);
      }
      if (docS.paisEfecPago !== void 0) {
        b.child(docItem, "paisEfecPago", docS.paisEfecPago);
      }
      if (docS.aplicConvDobTwordsri !== void 0) {
        b.child(docItem, "aplicConvDobTwordsri", docS.aplicConvDobTwordsri);
      }
      if (docS.pagExtSujRetNorLeg !== void 0) {
        b.child(docItem, "pagExtSujRetNorLeg", docS.pagExtSujRetNorLeg);
      }
      if (docS.pagoRegFis !== void 0) {
        b.child(docItem, "pagoRegFis", docS.pagoRegFis);
      }
      if (docS.totalComprobantesReembolso !== void 0) {
        b.child(docItem, "totalComprobantesReembolso", docS.totalComprobantesReembolso);
      }
      if (docS.totalBaseImponibleReembolso !== void 0) {
        b.child(docItem, "totalBaseImponibleReembolso", docS.totalBaseImponibleReembolso);
      }
      if (docS.totalImpuestoReembolso !== void 0) {
        b.child(docItem, "totalImpuestoReembolso", docS.totalImpuestoReembolso);
      }
      b.child(docItem, "totalSinImpuestos", docS.totalSinImpuestos);
      b.child(docItem, "importeTotal", docS.importeTotal);
      if (docS.impuestosDocSustento.length > 0) {
        const impNode = b.child(docItem, "impuestosDocSustento");
        for (const imp of docS.impuestosDocSustento) {
          this.writeRow(b, impNode, "impuestoDocSustento", imp);
        }
      }
      if (docS.retenciones.length > 0) {
        const retNode = b.child(docItem, "retenciones");
        for (const ret of docS.retenciones) {
          this.writeRow(b, retNode, "retencion", ret);
        }
      }
      if (docS.pagos.length > 0) {
        const pagosNode = b.child(docItem, "pagos");
        for (const pago of docS.pagos) {
          this.writeRow(b, pagosNode, "pago", pago);
        }
      }
    }
  }
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
  writeRow(b, parent, name, row) {
    const item = b.child(parent, name);
    for (const [k, v] of Object.entries(row)) {
      if (v === void 0) {
        continue;
      }
      b.child(item, k, v !== "" ? v : null);
    }
  }
};

// src/xml/index.ts
var REGISTRY = {
  ["01" /* Factura */]: new FacturaXmlSerializer(),
  ["03" /* LiquidacionCompra */]: new LiquidacionCompraXmlSerializer(),
  ["04" /* NotaCredito */]: new NotaCreditoXmlSerializer(),
  ["05" /* NotaDebito */]: new NotaDebitoXmlSerializer(),
  ["06" /* GuiaRemision */]: new GuiaRemisionXmlSerializer(),
  ["07" /* Retencion */]: new RetencionXmlSerializer()
};
function serializerFor(tipo) {
  const serializer = REGISTRY[tipo];
  if (!serializer) {
    throw new SriError(
      `No hay serializador XML registrado para el tipo de comprobante '${tipo}'. Los tipos soportados son los 6 del cat\xE1logo TipoComprobante (01, 03, 04, 05, 06, 07).`,
      "UNSUPPORTED_COMPROBANTE"
    );
  }
  return serializer;
}

// src/sri-client.ts
var import_node_crypto2 = require("crypto");
var SriClient = class {
  ambiente;
  certificate;
  transport;
  signer;
  validateDoc;
  constructor(options) {
    this.ambiente = options.ambiente;
    this.certificate = options.certificate;
    this.transport = options.transport ?? new FetchSoapTransport();
    this.signer = options.signer ?? new XadesSigner(void 0, options.clock);
    this.validateDoc = options.validate ?? true;
  }
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
  prepare(doc, claveAcceso) {
    if (this.validateDoc) {
      assertValid(doc);
    }
    this.assertAmbienteConsistente(doc);
    const clave = claveAcceso === void 0 ? this.generarClaveAccesoPara(doc) : this.assertClaveAccesoCoherente(claveAcceso, doc);
    const xml = serializerFor(doc.tipo).serialize(doc, clave);
    return { claveAcceso: clave, signedXml: this.signer.sign(xml, this.certificate) };
  }
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
  async emit(doc, claveAcceso) {
    const { claveAcceso: clave, signedXml } = this.prepare(doc, claveAcceso);
    const reception = await withComprobanteContext(
      clave,
      signedXml,
      () => this.transport.enviar(signedXml, this.ambiente)
    );
    if (reception.estado !== "RECIBIDA") {
      return {
        status: "RECHAZADO",
        claveAcceso: clave,
        signedXml,
        messages: reception.mensajes,
        rejectedStage: "RECEPCION"
      };
    }
    const auth = await withComprobanteContext(
      clave,
      signedXml,
      () => this.transport.autorizar(clave, this.ambiente)
    );
    const status = mapEstadoAutorizacion(auth.estado);
    return {
      status,
      claveAcceso: clave,
      signedXml,
      numeroAutorizacion: auth.numeroAutorizacion,
      fechaAutorizacion: auth.fechaAutorizacion,
      authorizedXml: auth.comprobante,
      messages: auth.mensajes,
      rejectedStage: status === "RECHAZADO" ? "AUTORIZACION" : void 0
    };
  }
  /** Passthrough directo a `transport.autorizar()` para consultar una clave de acceso ya emitida (p.ej. re-consultar un `EN_PROCESO`). */
  authorize(claveAcceso) {
    return this.transport.autorizar(claveAcceso, this.ambiente);
  }
  /** Firma `xml` con el certificado del cliente, sin pasar por `enviar`/`autorizar` — útil para firmar y despachar por fuera de `emit()`. */
  sign(xml) {
    return this.signer.sign(xml, this.certificate);
  }
  /**
   * `doc.infoTributaria.ambiente` debe ser el mismo que `this.ambiente`: el
   * primero queda embebido en el XML (y en la clave de acceso, si se
   * genera), el segundo decide a qué endpoint (`SRI_URLS`) se envía —
   * dejarlos divergir enviaría un comprobante marcado como "Producción" al
   * endpoint de pruebas (o viceversa), algo que el SRI rechazaría de todos
   * modos; se prefiere fallar aquí, antes de firmar, con un error claro.
   */
  assertAmbienteConsistente(doc) {
    if (doc.infoTributaria.ambiente !== this.ambiente) {
      throw new ValidationError(
        "El ambiente de infoTributaria no coincide con el ambiente configurado en SriClient",
        [
          `infoTributaria.ambiente ('${doc.infoTributaria.ambiente}') debe ser igual al ambiente del cliente ('${this.ambiente}').`
        ]
      );
    }
  }
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
  assertClaveAccesoCoherente(claveAcceso, doc) {
    if (!/^\d{49}$/.test(claveAcceso)) {
      throw new ValidationError("Clave de acceso inv\xE1lida", [
        `claveAcceso debe tener exactamente 49 d\xEDgitos (recibido: ${claveAcceso.length} caracteres).`
      ]);
    }
    const base48 = claveAcceso.slice(0, 48);
    const dv = claveAcceso.slice(48);
    const esperado = String(calcularDigitoVerificador(base48));
    if (dv !== esperado) {
      throw new ValidationError("Clave de acceso inv\xE1lida", [
        `El d\xEDgito verificador de claveAcceso es '${dv}' pero el M\xF3dulo 11 sobre los primeros 48 d\xEDgitos da '${esperado}'.`
      ]);
    }
    const info = doc.infoTributaria;
    const esperados = [
      ["fecha (ddmmyyyy)", claveAcceso.slice(0, 8), fechaClaveAccesoDe(doc).replace(/\//g, "")],
      ["tipo de comprobante (codDoc)", claveAcceso.slice(8, 10), doc.tipo],
      ["ruc", claveAcceso.slice(10, 23), info.ruc],
      ["ambiente", claveAcceso.slice(23, 24), this.ambiente],
      ["serie (estab + ptoEmi)", claveAcceso.slice(24, 30), `${info.estab}${info.ptoEmi}`],
      ["secuencial", claveAcceso.slice(30, 39), info.secuencial]
    ];
    const errores = esperados.filter(([, enClave, enDocumento]) => enClave !== enDocumento).map(
      ([campo, enClave, enDocumento]) => `claveAcceso declara ${campo} = '${enClave}' pero el comprobante dice '${enDocumento}'.`
    );
    if (errores.length > 0) {
      throw new ValidationError("Clave de acceso incoherente con el comprobante", errores);
    }
    return claveAcceso;
  }
  /** Genera la clave de acceso de `doc` cuando el caller no provee una ya calculada. */
  generarClaveAccesoPara(doc) {
    const info = doc.infoTributaria;
    return generarClaveAcceso({
      fecha: fechaClaveAccesoDe(doc),
      tipoComprobante: doc.tipo,
      ruc: info.ruc,
      ambiente: this.ambiente,
      serie: `${info.estab}${info.ptoEmi}`,
      numero: info.secuencial,
      codigoNum: codigoNumAleatorio(),
      tipoEmision: info.tipoEmision
    });
  }
};
function fechaClaveAccesoDe(doc) {
  if (doc.tipo === "06" /* GuiaRemision */) {
    return doc.fechaIniTransporte;
  }
  return doc.fechaEmision;
}
async function withComprobanteContext(claveAcceso, signedXml, op) {
  try {
    return await op();
  } catch (err) {
    if (err instanceof CommunicationError) {
      throw new CommunicationError(err.message, err.cause ?? err, { claveAcceso, signedXml });
    }
    throw err;
  }
}
function codigoNumAleatorio() {
  return (0, import_node_crypto2.randomInt)(0, 1e8).toString().padStart(8, "0");
}
function mapEstadoAutorizacion(estado) {
  switch (estado.toUpperCase()) {
    case "AUTORIZADO":
      return "AUTORIZADO";
    case "EN PROCESO":
    case "EN PROCESAMIENTO":
      return "EN_PROCESO";
    default:
      return "RECHAZADO";
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Ambiente,
  BatchEmitter,
  BatchProcessor,
  CertificateError,
  CommunicationError,
  FacturaXmlSerializer,
  FetchSoapTransport,
  FormaPago,
  GuiaRemisionXmlSerializer,
  InMemoryComprobanteRepository,
  LEYENDA_RIMPE,
  LiquidacionCompraXmlSerializer,
  NotaCreditoXmlSerializer,
  NotaDebitoXmlSerializer,
  NullRateLimiter,
  RegimenRimpe,
  RetencionXmlSerializer,
  RetryPolicy,
  SRI_RUC_URL,
  SRI_URLS,
  SignatureError,
  SriClient,
  SriError,
  SystemClock,
  TipoComprobante,
  TipoEmision,
  ValidationError,
  XadesSigner,
  XmlBuilder,
  XmlElement,
  assertClaveAccesoWireSegura,
  assertValid,
  buildAuthorizationEnvelope,
  buildReceptionEnvelope,
  calcularDigitoVerificador,
  camposAdicionalesField,
  certificateInfo,
  checkCamposLocales,
  contribuyenteEspecialField,
  createBatchItem,
  destinatarioDetalleSchema,
  destinatarioSchema,
  detalleSchema,
  dirEstablecimientoField,
  docSustentoSchema,
  esRucLocalValido,
  escapeXml,
  estabPtoEmiField,
  facturaSchema,
  fechaField,
  formaPagoField,
  formatMonto,
  fromCents,
  generarClaveAcceso,
  guiaRemisionSchema,
  impuestoDocSustentoRowSchema,
  impuestoSchema,
  incrementAttempts,
  infoTributariaSchema,
  isMonto,
  isTerminal,
  liquidacionCompraSchema,
  loadCertificate,
  markAuthorized,
  markFailed,
  markInProcess,
  markRejected,
  markSent,
  montoField,
  motivoSchema,
  nonEmptyString,
  notaCreditoSchema,
  notaDebitoSchema,
  obligadoContabilidadField,
  pagoSchema,
  pagoSustentoRowSchema,
  parseAuthorization,
  parseCertificateFields,
  parseReception,
  razonSocialField,
  retencionRowSchema,
  retencionSchema,
  rucField,
  schemaFor,
  secuencialField,
  selectCredential,
  serializeXmlDocument,
  serializerFor,
  toCents,
  totalImpuestoSchema,
  validarRucChecksum,
  validarRucLocal,
  validarRucOnline,
  validateBusiness,
  writeInfoAdicional,
  writeInfoTributaria,
  zodIssuesToErrors
});
//# sourceMappingURL=index.cjs.map