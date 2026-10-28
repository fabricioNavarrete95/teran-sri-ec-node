"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  SRI_CLIENT: () => SRI_CLIENT,
  SRI_MODULE_OPTIONS: () => SRI_MODULE_OPTIONS,
  SriModule: () => SriModule,
  SriService: () => SriService
});
module.exports = __toCommonJS(index_exports);

// src/tokens.ts
var SRI_CLIENT = /* @__PURE__ */ Symbol("SRI_CLIENT");
var SRI_MODULE_OPTIONS = /* @__PURE__ */ Symbol("SRI_MODULE_OPTIONS");

// src/sri.service.ts
var import_common = require("@nestjs/common");
var import_sri_ec = require("sri-ec");
function _ts_decorate(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") {
    r = Reflect.decorate(decorators, target, key, desc);
  } else {
    for (var i = decorators.length - 1; i >= 0; i--) {
      if (d = decorators[i]) {
        r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
      }
    }
  }
  return c > 3 && r && Object.defineProperty(target, key, r), r;
}
__name(_ts_decorate, "_ts_decorate");
function _ts_metadata(metadataKey, metadataValue) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") {
    return Reflect.metadata(metadataKey, metadataValue);
  }
}
__name(_ts_metadata, "_ts_metadata");
function _ts_param(paramIndex, decorator) {
  return function(target, key) {
    decorator(target, key, paramIndex);
  };
}
__name(_ts_param, "_ts_param");
var SriService = class {
  static {
    __name(this, "SriService");
  }
  client;
  moduleOptions;
  constructor(client, moduleOptions) {
    this.client = client;
    this.moduleOptions = moduleOptions;
  }
  /** Delega en `SriClient.emit()`. */
  emit(doc, claveAcceso) {
    return this.client.emit(doc, claveAcceso);
  }
  /** Delega en `SriClient.authorize()`. */
  authorize(claveAcceso) {
    return this.client.authorize(claveAcceso);
  }
  /** Delega en `SriClient.sign()`. */
  sign(xml) {
    return this.client.sign(xml);
  }
  /** Delega en `SriClient.prepare()`: comprobante firmado + clave de acceso, sin tocar la red. */
  prepare(doc, claveAcceso) {
    return this.client.prepare(doc, claveAcceso);
  }
  /**
  * `BatchEmitter` nuevo, preconfigurado con el `ambiente`/`transport` del
  * módulo — `opts` puede sobreescribir cualquier campo (p.ej.
  * `retryPolicy`, `repository`, `rateLimiter`, o incluso `ambiente`/
  * `transport` para un lote puntual con otra configuración).
  */
  createBatch(opts = {}) {
    return new import_sri_ec.BatchEmitter({
      ambiente: this.moduleOptions.ambiente,
      transport: this.moduleOptions.transport,
      ...opts
    });
  }
};
SriService = _ts_decorate([
  (0, import_common.Injectable)(),
  _ts_param(0, (0, import_common.Inject)(SRI_CLIENT)),
  _ts_param(1, (0, import_common.Inject)(SRI_MODULE_OPTIONS)),
  _ts_metadata("design:type", Function),
  _ts_metadata("design:paramtypes", [
    typeof import_sri_ec.SriClient === "undefined" ? Object : import_sri_ec.SriClient,
    typeof SriRuntimeOptions === "undefined" ? Object : SriRuntimeOptions
  ])
], SriService);

// src/sri.module.ts
var import_common2 = require("@nestjs/common");
var import_sri_ec2 = require("sri-ec");
function _ts_decorate2(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") {
    r = Reflect.decorate(decorators, target, key, desc);
  } else {
    for (var i = decorators.length - 1; i >= 0; i--) {
      if (d = decorators[i]) {
        r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
      }
    }
  }
  return c > 3 && r && Object.defineProperty(target, key, r), r;
}
__name(_ts_decorate2, "_ts_decorate");
function isP12Certificate(certificate) {
  return "p12" in certificate;
}
__name(isP12Certificate, "isP12Certificate");
function resolveCertificate(certificate) {
  return isP12Certificate(certificate) ? (0, import_sri_ec2.loadCertificate)(certificate.p12, certificate.password) : certificate;
}
__name(resolveCertificate, "resolveCertificate");
function splitOptions(options) {
  const client = new import_sri_ec2.SriClient({
    ambiente: options.ambiente,
    certificate: resolveCertificate(options.certificate),
    transport: options.transport,
    validate: options.validate
  });
  const runtime = {
    ambiente: options.ambiente
  };
  if (options.transport !== void 0) {
    runtime.transport = options.transport;
  }
  if (options.validate !== void 0) {
    runtime.validate = options.validate;
  }
  return {
    client,
    runtime
  };
}
__name(splitOptions, "splitOptions");
var SRI_RESOLVED_SETUP = /* @__PURE__ */ Symbol("SRI_RESOLVED_SETUP");
var asyncClientProvider = {
  provide: SRI_CLIENT,
  useFactory: /* @__PURE__ */ __name((setup) => setup.client, "useFactory"),
  inject: [
    SRI_RESOLVED_SETUP
  ]
};
var asyncRuntimeOptionsProvider = {
  provide: SRI_MODULE_OPTIONS,
  useFactory: /* @__PURE__ */ __name((setup) => setup.runtime, "useFactory"),
  inject: [
    SRI_RESOLVED_SETUP
  ]
};
var SriModule = class _SriModule {
  static {
    __name(this, "SriModule");
  }
  /** Registro síncrono: `options` ya trae `ambiente`/`certificate` resueltos. */
  static forRoot(options) {
    const { client, runtime } = splitOptions(options);
    return {
      module: _SriModule,
      global: options.isGlobal ?? false,
      providers: [
        {
          provide: SRI_MODULE_OPTIONS,
          useValue: runtime
        },
        {
          provide: SRI_CLIENT,
          useValue: client
        },
        SriService
      ],
      exports: [
        SriService,
        SRI_CLIENT
      ]
    };
  }
  /** Registro asíncrono: `useFactory` (con `inject`/`imports`) produce las `SriModuleOptions`, p.ej. leyendo un `ConfigService`. */
  static forRootAsync(options) {
    return {
      module: _SriModule,
      global: options.isGlobal ?? false,
      imports: options.imports ?? [],
      providers: [
        {
          provide: SRI_RESOLVED_SETUP,
          useFactory: /* @__PURE__ */ __name(async (...args) => splitOptions(await options.useFactory(...args)), "useFactory"),
          inject: options.inject ?? []
        },
        asyncClientProvider,
        asyncRuntimeOptionsProvider,
        SriService
      ],
      exports: [
        SriService,
        SRI_CLIENT
      ]
    };
  }
};
SriModule = _ts_decorate2([
  (0, import_common2.Module)({})
], SriModule);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  SRI_CLIENT,
  SRI_MODULE_OPTIONS,
  SriModule,
  SriService
});
//# sourceMappingURL=index.cjs.map