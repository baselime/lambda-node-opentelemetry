var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
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

// node_modules/@opentelemetry/api/build/src/platform/node/globalThis.js
var require_globalThis = __commonJS({
  "node_modules/@opentelemetry/api/build/src/platform/node/globalThis.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports._globalThis = void 0;
    exports._globalThis = typeof globalThis === "object" ? globalThis : global;
  }
});

// node_modules/@opentelemetry/api/build/src/platform/node/index.js
var require_node = __commonJS({
  "node_modules/@opentelemetry/api/build/src/platform/node/index.js"(exports) {
    "use strict";
    var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      Object.defineProperty(o, k2, { enumerable: true, get: function() {
        return m[k];
      } });
    } : function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      o[k2] = m[k];
    });
    var __exportStar = exports && exports.__exportStar || function(m, exports2) {
      for (var p in m)
        if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports2, p))
          __createBinding(exports2, m, p);
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    __exportStar(require_globalThis(), exports);
  }
});

// node_modules/@opentelemetry/api/build/src/platform/index.js
var require_platform = __commonJS({
  "node_modules/@opentelemetry/api/build/src/platform/index.js"(exports) {
    "use strict";
    var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      Object.defineProperty(o, k2, { enumerable: true, get: function() {
        return m[k];
      } });
    } : function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      o[k2] = m[k];
    });
    var __exportStar = exports && exports.__exportStar || function(m, exports2) {
      for (var p in m)
        if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports2, p))
          __createBinding(exports2, m, p);
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    __exportStar(require_node(), exports);
  }
});

// node_modules/@opentelemetry/api/build/src/version.js
var require_version = __commonJS({
  "node_modules/@opentelemetry/api/build/src/version.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.VERSION = void 0;
    exports.VERSION = "1.3.0";
  }
});

// node_modules/@opentelemetry/api/build/src/internal/semver.js
var require_semver = __commonJS({
  "node_modules/@opentelemetry/api/build/src/internal/semver.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.isCompatible = exports._makeCompatibilityCheck = void 0;
    var version_1 = require_version();
    var re = /^(\d+)\.(\d+)\.(\d+)(-(.+))?$/;
    function _makeCompatibilityCheck(ownVersion) {
      const acceptedVersions = /* @__PURE__ */ new Set([ownVersion]);
      const rejectedVersions = /* @__PURE__ */ new Set();
      const myVersionMatch = ownVersion.match(re);
      if (!myVersionMatch) {
        return () => false;
      }
      const ownVersionParsed = {
        major: +myVersionMatch[1],
        minor: +myVersionMatch[2],
        patch: +myVersionMatch[3],
        prerelease: myVersionMatch[4]
      };
      if (ownVersionParsed.prerelease != null) {
        return function isExactmatch(globalVersion) {
          return globalVersion === ownVersion;
        };
      }
      function _reject(v) {
        rejectedVersions.add(v);
        return false;
      }
      function _accept(v) {
        acceptedVersions.add(v);
        return true;
      }
      return function isCompatible(globalVersion) {
        if (acceptedVersions.has(globalVersion)) {
          return true;
        }
        if (rejectedVersions.has(globalVersion)) {
          return false;
        }
        const globalVersionMatch = globalVersion.match(re);
        if (!globalVersionMatch) {
          return _reject(globalVersion);
        }
        const globalVersionParsed = {
          major: +globalVersionMatch[1],
          minor: +globalVersionMatch[2],
          patch: +globalVersionMatch[3],
          prerelease: globalVersionMatch[4]
        };
        if (globalVersionParsed.prerelease != null) {
          return _reject(globalVersion);
        }
        if (ownVersionParsed.major !== globalVersionParsed.major) {
          return _reject(globalVersion);
        }
        if (ownVersionParsed.major === 0) {
          if (ownVersionParsed.minor === globalVersionParsed.minor && ownVersionParsed.patch <= globalVersionParsed.patch) {
            return _accept(globalVersion);
          }
          return _reject(globalVersion);
        }
        if (ownVersionParsed.minor <= globalVersionParsed.minor) {
          return _accept(globalVersion);
        }
        return _reject(globalVersion);
      };
    }
    exports._makeCompatibilityCheck = _makeCompatibilityCheck;
    exports.isCompatible = _makeCompatibilityCheck(version_1.VERSION);
  }
});

// node_modules/@opentelemetry/api/build/src/internal/global-utils.js
var require_global_utils = __commonJS({
  "node_modules/@opentelemetry/api/build/src/internal/global-utils.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.unregisterGlobal = exports.getGlobal = exports.registerGlobal = void 0;
    var platform_1 = require_platform();
    var version_1 = require_version();
    var semver_1 = require_semver();
    var major = version_1.VERSION.split(".")[0];
    var GLOBAL_OPENTELEMETRY_API_KEY = Symbol.for(`opentelemetry.js.api.${major}`);
    var _global = platform_1._globalThis;
    function registerGlobal(type, instance, diag, allowOverride = false) {
      var _a;
      const api2 = _global[GLOBAL_OPENTELEMETRY_API_KEY] = (_a = _global[GLOBAL_OPENTELEMETRY_API_KEY]) !== null && _a !== void 0 ? _a : {
        version: version_1.VERSION
      };
      if (!allowOverride && api2[type]) {
        const err = new Error(`@opentelemetry/api: Attempted duplicate registration of API: ${type}`);
        diag.error(err.stack || err.message);
        return false;
      }
      if (api2.version !== version_1.VERSION) {
        const err = new Error("@opentelemetry/api: All API registration versions must match");
        diag.error(err.stack || err.message);
        return false;
      }
      api2[type] = instance;
      diag.debug(`@opentelemetry/api: Registered a global for ${type} v${version_1.VERSION}.`);
      return true;
    }
    exports.registerGlobal = registerGlobal;
    function getGlobal(type) {
      var _a, _b;
      const globalVersion = (_a = _global[GLOBAL_OPENTELEMETRY_API_KEY]) === null || _a === void 0 ? void 0 : _a.version;
      if (!globalVersion || !(0, semver_1.isCompatible)(globalVersion)) {
        return;
      }
      return (_b = _global[GLOBAL_OPENTELEMETRY_API_KEY]) === null || _b === void 0 ? void 0 : _b[type];
    }
    exports.getGlobal = getGlobal;
    function unregisterGlobal(type, diag) {
      diag.debug(`@opentelemetry/api: Unregistering a global for ${type} v${version_1.VERSION}.`);
      const api2 = _global[GLOBAL_OPENTELEMETRY_API_KEY];
      if (api2) {
        delete api2[type];
      }
    }
    exports.unregisterGlobal = unregisterGlobal;
  }
});

// node_modules/@opentelemetry/api/build/src/diag/ComponentLogger.js
var require_ComponentLogger = __commonJS({
  "node_modules/@opentelemetry/api/build/src/diag/ComponentLogger.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.DiagComponentLogger = void 0;
    var global_utils_1 = require_global_utils();
    var DiagComponentLogger = class {
      constructor(props) {
        this._namespace = props.namespace || "DiagComponentLogger";
      }
      debug(...args) {
        return logProxy("debug", this._namespace, args);
      }
      error(...args) {
        return logProxy("error", this._namespace, args);
      }
      info(...args) {
        return logProxy("info", this._namespace, args);
      }
      warn(...args) {
        return logProxy("warn", this._namespace, args);
      }
      verbose(...args) {
        return logProxy("verbose", this._namespace, args);
      }
    };
    exports.DiagComponentLogger = DiagComponentLogger;
    function logProxy(funcName, namespace, args) {
      const logger = (0, global_utils_1.getGlobal)("diag");
      if (!logger) {
        return;
      }
      args.unshift(namespace);
      return logger[funcName](...args);
    }
  }
});

// node_modules/@opentelemetry/api/build/src/diag/types.js
var require_types = __commonJS({
  "node_modules/@opentelemetry/api/build/src/diag/types.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.DiagLogLevel = void 0;
    var DiagLogLevel;
    (function(DiagLogLevel2) {
      DiagLogLevel2[DiagLogLevel2["NONE"] = 0] = "NONE";
      DiagLogLevel2[DiagLogLevel2["ERROR"] = 30] = "ERROR";
      DiagLogLevel2[DiagLogLevel2["WARN"] = 50] = "WARN";
      DiagLogLevel2[DiagLogLevel2["INFO"] = 60] = "INFO";
      DiagLogLevel2[DiagLogLevel2["DEBUG"] = 70] = "DEBUG";
      DiagLogLevel2[DiagLogLevel2["VERBOSE"] = 80] = "VERBOSE";
      DiagLogLevel2[DiagLogLevel2["ALL"] = 9999] = "ALL";
    })(DiagLogLevel = exports.DiagLogLevel || (exports.DiagLogLevel = {}));
  }
});

// node_modules/@opentelemetry/api/build/src/diag/internal/logLevelLogger.js
var require_logLevelLogger = __commonJS({
  "node_modules/@opentelemetry/api/build/src/diag/internal/logLevelLogger.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.createLogLevelDiagLogger = void 0;
    var types_1 = require_types();
    function createLogLevelDiagLogger(maxLevel, logger) {
      if (maxLevel < types_1.DiagLogLevel.NONE) {
        maxLevel = types_1.DiagLogLevel.NONE;
      } else if (maxLevel > types_1.DiagLogLevel.ALL) {
        maxLevel = types_1.DiagLogLevel.ALL;
      }
      logger = logger || {};
      function _filterFunc(funcName, theLevel) {
        const theFunc = logger[funcName];
        if (typeof theFunc === "function" && maxLevel >= theLevel) {
          return theFunc.bind(logger);
        }
        return function() {
        };
      }
      return {
        error: _filterFunc("error", types_1.DiagLogLevel.ERROR),
        warn: _filterFunc("warn", types_1.DiagLogLevel.WARN),
        info: _filterFunc("info", types_1.DiagLogLevel.INFO),
        debug: _filterFunc("debug", types_1.DiagLogLevel.DEBUG),
        verbose: _filterFunc("verbose", types_1.DiagLogLevel.VERBOSE)
      };
    }
    exports.createLogLevelDiagLogger = createLogLevelDiagLogger;
  }
});

// node_modules/@opentelemetry/api/build/src/api/diag.js
var require_diag = __commonJS({
  "node_modules/@opentelemetry/api/build/src/api/diag.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.DiagAPI = void 0;
    var ComponentLogger_1 = require_ComponentLogger();
    var logLevelLogger_1 = require_logLevelLogger();
    var types_1 = require_types();
    var global_utils_1 = require_global_utils();
    var API_NAME = "diag";
    var DiagAPI = class {
      /**
       * Private internal constructor
       * @private
       */
      constructor() {
        function _logProxy(funcName) {
          return function(...args) {
            const logger = (0, global_utils_1.getGlobal)("diag");
            if (!logger)
              return;
            return logger[funcName](...args);
          };
        }
        const self2 = this;
        const setLogger = (logger, optionsOrLogLevel = { logLevel: types_1.DiagLogLevel.INFO }) => {
          var _a, _b, _c;
          if (logger === self2) {
            const err = new Error("Cannot use diag as the logger for itself. Please use a DiagLogger implementation like ConsoleDiagLogger or a custom implementation");
            self2.error((_a = err.stack) !== null && _a !== void 0 ? _a : err.message);
            return false;
          }
          if (typeof optionsOrLogLevel === "number") {
            optionsOrLogLevel = {
              logLevel: optionsOrLogLevel
            };
          }
          const oldLogger = (0, global_utils_1.getGlobal)("diag");
          const newLogger = (0, logLevelLogger_1.createLogLevelDiagLogger)((_b = optionsOrLogLevel.logLevel) !== null && _b !== void 0 ? _b : types_1.DiagLogLevel.INFO, logger);
          if (oldLogger && !optionsOrLogLevel.suppressOverrideMessage) {
            const stack = (_c = new Error().stack) !== null && _c !== void 0 ? _c : "<failed to generate stacktrace>";
            oldLogger.warn(`Current logger will be overwritten from ${stack}`);
            newLogger.warn(`Current logger will overwrite one already registered from ${stack}`);
          }
          return (0, global_utils_1.registerGlobal)("diag", newLogger, self2, true);
        };
        self2.setLogger = setLogger;
        self2.disable = () => {
          (0, global_utils_1.unregisterGlobal)(API_NAME, self2);
        };
        self2.createComponentLogger = (options) => {
          return new ComponentLogger_1.DiagComponentLogger(options);
        };
        self2.verbose = _logProxy("verbose");
        self2.debug = _logProxy("debug");
        self2.info = _logProxy("info");
        self2.warn = _logProxy("warn");
        self2.error = _logProxy("error");
      }
      /** Get the singleton instance of the DiagAPI API */
      static instance() {
        if (!this._instance) {
          this._instance = new DiagAPI();
        }
        return this._instance;
      }
    };
    exports.DiagAPI = DiagAPI;
  }
});

// node_modules/@opentelemetry/api/build/src/baggage/internal/baggage-impl.js
var require_baggage_impl = __commonJS({
  "node_modules/@opentelemetry/api/build/src/baggage/internal/baggage-impl.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.BaggageImpl = void 0;
    var BaggageImpl = class {
      constructor(entries) {
        this._entries = entries ? new Map(entries) : /* @__PURE__ */ new Map();
      }
      getEntry(key) {
        const entry = this._entries.get(key);
        if (!entry) {
          return void 0;
        }
        return Object.assign({}, entry);
      }
      getAllEntries() {
        return Array.from(this._entries.entries()).map(([k, v]) => [k, v]);
      }
      setEntry(key, entry) {
        const newBaggage = new BaggageImpl(this._entries);
        newBaggage._entries.set(key, entry);
        return newBaggage;
      }
      removeEntry(key) {
        const newBaggage = new BaggageImpl(this._entries);
        newBaggage._entries.delete(key);
        return newBaggage;
      }
      removeEntries(...keys) {
        const newBaggage = new BaggageImpl(this._entries);
        for (const key of keys) {
          newBaggage._entries.delete(key);
        }
        return newBaggage;
      }
      clear() {
        return new BaggageImpl();
      }
    };
    exports.BaggageImpl = BaggageImpl;
  }
});

// node_modules/@opentelemetry/api/build/src/baggage/internal/symbol.js
var require_symbol = __commonJS({
  "node_modules/@opentelemetry/api/build/src/baggage/internal/symbol.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.baggageEntryMetadataSymbol = void 0;
    exports.baggageEntryMetadataSymbol = Symbol("BaggageEntryMetadata");
  }
});

// node_modules/@opentelemetry/api/build/src/baggage/utils.js
var require_utils = __commonJS({
  "node_modules/@opentelemetry/api/build/src/baggage/utils.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.baggageEntryMetadataFromString = exports.createBaggage = void 0;
    var diag_1 = require_diag();
    var baggage_impl_1 = require_baggage_impl();
    var symbol_1 = require_symbol();
    var diag = diag_1.DiagAPI.instance();
    function createBaggage(entries = {}) {
      return new baggage_impl_1.BaggageImpl(new Map(Object.entries(entries)));
    }
    exports.createBaggage = createBaggage;
    function baggageEntryMetadataFromString(str) {
      if (typeof str !== "string") {
        diag.error(`Cannot create baggage metadata from unknown type: ${typeof str}`);
        str = "";
      }
      return {
        __TYPE__: symbol_1.baggageEntryMetadataSymbol,
        toString() {
          return str;
        }
      };
    }
    exports.baggageEntryMetadataFromString = baggageEntryMetadataFromString;
  }
});

// node_modules/@opentelemetry/api/build/src/context/context.js
var require_context = __commonJS({
  "node_modules/@opentelemetry/api/build/src/context/context.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ROOT_CONTEXT = exports.createContextKey = void 0;
    function createContextKey(description) {
      return Symbol.for(description);
    }
    exports.createContextKey = createContextKey;
    var BaseContext = class {
      /**
       * Construct a new context which inherits values from an optional parent context.
       *
       * @param parentContext a context from which to inherit values
       */
      constructor(parentContext) {
        const self2 = this;
        self2._currentContext = parentContext ? new Map(parentContext) : /* @__PURE__ */ new Map();
        self2.getValue = (key) => self2._currentContext.get(key);
        self2.setValue = (key, value) => {
          const context = new BaseContext(self2._currentContext);
          context._currentContext.set(key, value);
          return context;
        };
        self2.deleteValue = (key) => {
          const context = new BaseContext(self2._currentContext);
          context._currentContext.delete(key);
          return context;
        };
      }
    };
    exports.ROOT_CONTEXT = new BaseContext();
  }
});

// node_modules/@opentelemetry/api/build/src/diag/consoleLogger.js
var require_consoleLogger = __commonJS({
  "node_modules/@opentelemetry/api/build/src/diag/consoleLogger.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.DiagConsoleLogger = void 0;
    var consoleMap = [
      { n: "error", c: "error" },
      { n: "warn", c: "warn" },
      { n: "info", c: "info" },
      { n: "debug", c: "debug" },
      { n: "verbose", c: "trace" }
    ];
    var DiagConsoleLogger = class {
      constructor() {
        function _consoleFunc(funcName) {
          return function(...args) {
            if (console) {
              let theFunc = console[funcName];
              if (typeof theFunc !== "function") {
                theFunc = console.log;
              }
              if (typeof theFunc === "function") {
                return theFunc.apply(console, args);
              }
            }
          };
        }
        for (let i = 0; i < consoleMap.length; i++) {
          this[consoleMap[i].n] = _consoleFunc(consoleMap[i].c);
        }
      }
    };
    exports.DiagConsoleLogger = DiagConsoleLogger;
  }
});

// node_modules/@opentelemetry/api/build/src/metrics/NoopMeter.js
var require_NoopMeter = __commonJS({
  "node_modules/@opentelemetry/api/build/src/metrics/NoopMeter.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.createNoopMeter = exports.NOOP_OBSERVABLE_UP_DOWN_COUNTER_METRIC = exports.NOOP_OBSERVABLE_GAUGE_METRIC = exports.NOOP_OBSERVABLE_COUNTER_METRIC = exports.NOOP_UP_DOWN_COUNTER_METRIC = exports.NOOP_HISTOGRAM_METRIC = exports.NOOP_COUNTER_METRIC = exports.NOOP_METER = exports.NoopObservableUpDownCounterMetric = exports.NoopObservableGaugeMetric = exports.NoopObservableCounterMetric = exports.NoopObservableMetric = exports.NoopHistogramMetric = exports.NoopUpDownCounterMetric = exports.NoopCounterMetric = exports.NoopMetric = exports.NoopMeter = void 0;
    var NoopMeter = class {
      constructor() {
      }
      /**
       * @see {@link Meter.createHistogram}
       */
      createHistogram(_name, _options) {
        return exports.NOOP_HISTOGRAM_METRIC;
      }
      /**
       * @see {@link Meter.createCounter}
       */
      createCounter(_name, _options) {
        return exports.NOOP_COUNTER_METRIC;
      }
      /**
       * @see {@link Meter.createUpDownCounter}
       */
      createUpDownCounter(_name, _options) {
        return exports.NOOP_UP_DOWN_COUNTER_METRIC;
      }
      /**
       * @see {@link Meter.createObservableGauge}
       */
      createObservableGauge(_name, _options) {
        return exports.NOOP_OBSERVABLE_GAUGE_METRIC;
      }
      /**
       * @see {@link Meter.createObservableCounter}
       */
      createObservableCounter(_name, _options) {
        return exports.NOOP_OBSERVABLE_COUNTER_METRIC;
      }
      /**
       * @see {@link Meter.createObservableUpDownCounter}
       */
      createObservableUpDownCounter(_name, _options) {
        return exports.NOOP_OBSERVABLE_UP_DOWN_COUNTER_METRIC;
      }
      /**
       * @see {@link Meter.addBatchObservableCallback}
       */
      addBatchObservableCallback(_callback, _observables) {
      }
      /**
       * @see {@link Meter.removeBatchObservableCallback}
       */
      removeBatchObservableCallback(_callback) {
      }
    };
    exports.NoopMeter = NoopMeter;
    var NoopMetric = class {
    };
    exports.NoopMetric = NoopMetric;
    var NoopCounterMetric = class extends NoopMetric {
      add(_value, _attributes) {
      }
    };
    exports.NoopCounterMetric = NoopCounterMetric;
    var NoopUpDownCounterMetric = class extends NoopMetric {
      add(_value, _attributes) {
      }
    };
    exports.NoopUpDownCounterMetric = NoopUpDownCounterMetric;
    var NoopHistogramMetric = class extends NoopMetric {
      record(_value, _attributes) {
      }
    };
    exports.NoopHistogramMetric = NoopHistogramMetric;
    var NoopObservableMetric = class {
      addCallback(_callback) {
      }
      removeCallback(_callback) {
      }
    };
    exports.NoopObservableMetric = NoopObservableMetric;
    var NoopObservableCounterMetric = class extends NoopObservableMetric {
    };
    exports.NoopObservableCounterMetric = NoopObservableCounterMetric;
    var NoopObservableGaugeMetric = class extends NoopObservableMetric {
    };
    exports.NoopObservableGaugeMetric = NoopObservableGaugeMetric;
    var NoopObservableUpDownCounterMetric = class extends NoopObservableMetric {
    };
    exports.NoopObservableUpDownCounterMetric = NoopObservableUpDownCounterMetric;
    exports.NOOP_METER = new NoopMeter();
    exports.NOOP_COUNTER_METRIC = new NoopCounterMetric();
    exports.NOOP_HISTOGRAM_METRIC = new NoopHistogramMetric();
    exports.NOOP_UP_DOWN_COUNTER_METRIC = new NoopUpDownCounterMetric();
    exports.NOOP_OBSERVABLE_COUNTER_METRIC = new NoopObservableCounterMetric();
    exports.NOOP_OBSERVABLE_GAUGE_METRIC = new NoopObservableGaugeMetric();
    exports.NOOP_OBSERVABLE_UP_DOWN_COUNTER_METRIC = new NoopObservableUpDownCounterMetric();
    function createNoopMeter() {
      return exports.NOOP_METER;
    }
    exports.createNoopMeter = createNoopMeter;
  }
});

// node_modules/@opentelemetry/api/build/src/metrics/Metric.js
var require_Metric = __commonJS({
  "node_modules/@opentelemetry/api/build/src/metrics/Metric.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ValueType = void 0;
    var ValueType;
    (function(ValueType2) {
      ValueType2[ValueType2["INT"] = 0] = "INT";
      ValueType2[ValueType2["DOUBLE"] = 1] = "DOUBLE";
    })(ValueType = exports.ValueType || (exports.ValueType = {}));
  }
});

// node_modules/@opentelemetry/api/build/src/propagation/TextMapPropagator.js
var require_TextMapPropagator = __commonJS({
  "node_modules/@opentelemetry/api/build/src/propagation/TextMapPropagator.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.defaultTextMapSetter = exports.defaultTextMapGetter = void 0;
    exports.defaultTextMapGetter = {
      get(carrier, key) {
        if (carrier == null) {
          return void 0;
        }
        return carrier[key];
      },
      keys(carrier) {
        if (carrier == null) {
          return [];
        }
        return Object.keys(carrier);
      }
    };
    exports.defaultTextMapSetter = {
      set(carrier, key, value) {
        if (carrier == null) {
          return;
        }
        carrier[key] = value;
      }
    };
  }
});

// node_modules/@opentelemetry/api/build/src/context/NoopContextManager.js
var require_NoopContextManager = __commonJS({
  "node_modules/@opentelemetry/api/build/src/context/NoopContextManager.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.NoopContextManager = void 0;
    var context_1 = require_context();
    var NoopContextManager = class {
      active() {
        return context_1.ROOT_CONTEXT;
      }
      with(_context, fn, thisArg, ...args) {
        return fn.call(thisArg, ...args);
      }
      bind(_context, target) {
        return target;
      }
      enable() {
        return this;
      }
      disable() {
        return this;
      }
    };
    exports.NoopContextManager = NoopContextManager;
  }
});

// node_modules/@opentelemetry/api/build/src/api/context.js
var require_context2 = __commonJS({
  "node_modules/@opentelemetry/api/build/src/api/context.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ContextAPI = void 0;
    var NoopContextManager_1 = require_NoopContextManager();
    var global_utils_1 = require_global_utils();
    var diag_1 = require_diag();
    var API_NAME = "context";
    var NOOP_CONTEXT_MANAGER = new NoopContextManager_1.NoopContextManager();
    var ContextAPI = class {
      /** Empty private constructor prevents end users from constructing a new instance of the API */
      constructor() {
      }
      /** Get the singleton instance of the Context API */
      static getInstance() {
        if (!this._instance) {
          this._instance = new ContextAPI();
        }
        return this._instance;
      }
      /**
       * Set the current context manager.
       *
       * @returns true if the context manager was successfully registered, else false
       */
      setGlobalContextManager(contextManager) {
        return (0, global_utils_1.registerGlobal)(API_NAME, contextManager, diag_1.DiagAPI.instance());
      }
      /**
       * Get the currently active context
       */
      active() {
        return this._getContextManager().active();
      }
      /**
       * Execute a function with an active context
       *
       * @param context context to be active during function execution
       * @param fn function to execute in a context
       * @param thisArg optional receiver to be used for calling fn
       * @param args optional arguments forwarded to fn
       */
      with(context, fn, thisArg, ...args) {
        return this._getContextManager().with(context, fn, thisArg, ...args);
      }
      /**
       * Bind a context to a target function or event emitter
       *
       * @param context context to bind to the event emitter or function. Defaults to the currently active context
       * @param target function or event emitter to bind
       */
      bind(context, target) {
        return this._getContextManager().bind(context, target);
      }
      _getContextManager() {
        return (0, global_utils_1.getGlobal)(API_NAME) || NOOP_CONTEXT_MANAGER;
      }
      /** Disable and remove the global context manager */
      disable() {
        this._getContextManager().disable();
        (0, global_utils_1.unregisterGlobal)(API_NAME, diag_1.DiagAPI.instance());
      }
    };
    exports.ContextAPI = ContextAPI;
  }
});

// node_modules/@opentelemetry/api/build/src/trace/trace_flags.js
var require_trace_flags = __commonJS({
  "node_modules/@opentelemetry/api/build/src/trace/trace_flags.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.TraceFlags = void 0;
    var TraceFlags;
    (function(TraceFlags2) {
      TraceFlags2[TraceFlags2["NONE"] = 0] = "NONE";
      TraceFlags2[TraceFlags2["SAMPLED"] = 1] = "SAMPLED";
    })(TraceFlags = exports.TraceFlags || (exports.TraceFlags = {}));
  }
});

// node_modules/@opentelemetry/api/build/src/trace/invalid-span-constants.js
var require_invalid_span_constants = __commonJS({
  "node_modules/@opentelemetry/api/build/src/trace/invalid-span-constants.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.INVALID_SPAN_CONTEXT = exports.INVALID_TRACEID = exports.INVALID_SPANID = void 0;
    var trace_flags_1 = require_trace_flags();
    exports.INVALID_SPANID = "0000000000000000";
    exports.INVALID_TRACEID = "00000000000000000000000000000000";
    exports.INVALID_SPAN_CONTEXT = {
      traceId: exports.INVALID_TRACEID,
      spanId: exports.INVALID_SPANID,
      traceFlags: trace_flags_1.TraceFlags.NONE
    };
  }
});

// node_modules/@opentelemetry/api/build/src/trace/NonRecordingSpan.js
var require_NonRecordingSpan = __commonJS({
  "node_modules/@opentelemetry/api/build/src/trace/NonRecordingSpan.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.NonRecordingSpan = void 0;
    var invalid_span_constants_1 = require_invalid_span_constants();
    var NonRecordingSpan = class {
      constructor(_spanContext = invalid_span_constants_1.INVALID_SPAN_CONTEXT) {
        this._spanContext = _spanContext;
      }
      // Returns a SpanContext.
      spanContext() {
        return this._spanContext;
      }
      // By default does nothing
      setAttribute(_key, _value) {
        return this;
      }
      // By default does nothing
      setAttributes(_attributes) {
        return this;
      }
      // By default does nothing
      addEvent(_name, _attributes) {
        return this;
      }
      // By default does nothing
      setStatus(_status) {
        return this;
      }
      // By default does nothing
      updateName(_name) {
        return this;
      }
      // By default does nothing
      end(_endTime) {
      }
      // isRecording always returns false for NonRecordingSpan.
      isRecording() {
        return false;
      }
      // By default does nothing
      recordException(_exception, _time) {
      }
    };
    exports.NonRecordingSpan = NonRecordingSpan;
  }
});

// node_modules/@opentelemetry/api/build/src/trace/context-utils.js
var require_context_utils = __commonJS({
  "node_modules/@opentelemetry/api/build/src/trace/context-utils.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getSpanContext = exports.setSpanContext = exports.deleteSpan = exports.setSpan = exports.getActiveSpan = exports.getSpan = void 0;
    var context_1 = require_context();
    var NonRecordingSpan_1 = require_NonRecordingSpan();
    var context_2 = require_context2();
    var SPAN_KEY = (0, context_1.createContextKey)("OpenTelemetry Context Key SPAN");
    function getSpan(context) {
      return context.getValue(SPAN_KEY) || void 0;
    }
    exports.getSpan = getSpan;
    function getActiveSpan() {
      return getSpan(context_2.ContextAPI.getInstance().active());
    }
    exports.getActiveSpan = getActiveSpan;
    function setSpan(context, span) {
      return context.setValue(SPAN_KEY, span);
    }
    exports.setSpan = setSpan;
    function deleteSpan(context) {
      return context.deleteValue(SPAN_KEY);
    }
    exports.deleteSpan = deleteSpan;
    function setSpanContext(context, spanContext) {
      return setSpan(context, new NonRecordingSpan_1.NonRecordingSpan(spanContext));
    }
    exports.setSpanContext = setSpanContext;
    function getSpanContext(context) {
      var _a;
      return (_a = getSpan(context)) === null || _a === void 0 ? void 0 : _a.spanContext();
    }
    exports.getSpanContext = getSpanContext;
  }
});

// node_modules/@opentelemetry/api/build/src/trace/spancontext-utils.js
var require_spancontext_utils = __commonJS({
  "node_modules/@opentelemetry/api/build/src/trace/spancontext-utils.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.wrapSpanContext = exports.isSpanContextValid = exports.isValidSpanId = exports.isValidTraceId = void 0;
    var invalid_span_constants_1 = require_invalid_span_constants();
    var NonRecordingSpan_1 = require_NonRecordingSpan();
    var VALID_TRACEID_REGEX = /^([0-9a-f]{32})$/i;
    var VALID_SPANID_REGEX = /^[0-9a-f]{16}$/i;
    function isValidTraceId(traceId) {
      return VALID_TRACEID_REGEX.test(traceId) && traceId !== invalid_span_constants_1.INVALID_TRACEID;
    }
    exports.isValidTraceId = isValidTraceId;
    function isValidSpanId(spanId) {
      return VALID_SPANID_REGEX.test(spanId) && spanId !== invalid_span_constants_1.INVALID_SPANID;
    }
    exports.isValidSpanId = isValidSpanId;
    function isSpanContextValid(spanContext) {
      return isValidTraceId(spanContext.traceId) && isValidSpanId(spanContext.spanId);
    }
    exports.isSpanContextValid = isSpanContextValid;
    function wrapSpanContext(spanContext) {
      return new NonRecordingSpan_1.NonRecordingSpan(spanContext);
    }
    exports.wrapSpanContext = wrapSpanContext;
  }
});

// node_modules/@opentelemetry/api/build/src/trace/NoopTracer.js
var require_NoopTracer = __commonJS({
  "node_modules/@opentelemetry/api/build/src/trace/NoopTracer.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.NoopTracer = void 0;
    var context_1 = require_context2();
    var context_utils_1 = require_context_utils();
    var NonRecordingSpan_1 = require_NonRecordingSpan();
    var spancontext_utils_1 = require_spancontext_utils();
    var contextApi = context_1.ContextAPI.getInstance();
    var NoopTracer = class {
      // startSpan starts a noop span.
      startSpan(name, options, context) {
        const root = Boolean(options === null || options === void 0 ? void 0 : options.root);
        if (root) {
          return new NonRecordingSpan_1.NonRecordingSpan();
        }
        const parentFromContext = context && (0, context_utils_1.getSpanContext)(context);
        if (isSpanContext(parentFromContext) && (0, spancontext_utils_1.isSpanContextValid)(parentFromContext)) {
          return new NonRecordingSpan_1.NonRecordingSpan(parentFromContext);
        } else {
          return new NonRecordingSpan_1.NonRecordingSpan();
        }
      }
      startActiveSpan(name, arg2, arg3, arg4) {
        let opts;
        let ctx;
        let fn;
        if (arguments.length < 2) {
          return;
        } else if (arguments.length === 2) {
          fn = arg2;
        } else if (arguments.length === 3) {
          opts = arg2;
          fn = arg3;
        } else {
          opts = arg2;
          ctx = arg3;
          fn = arg4;
        }
        const parentContext = ctx !== null && ctx !== void 0 ? ctx : contextApi.active();
        const span = this.startSpan(name, opts, parentContext);
        const contextWithSpanSet = (0, context_utils_1.setSpan)(parentContext, span);
        return contextApi.with(contextWithSpanSet, fn, void 0, span);
      }
    };
    exports.NoopTracer = NoopTracer;
    function isSpanContext(spanContext) {
      return typeof spanContext === "object" && typeof spanContext["spanId"] === "string" && typeof spanContext["traceId"] === "string" && typeof spanContext["traceFlags"] === "number";
    }
  }
});

// node_modules/@opentelemetry/api/build/src/trace/ProxyTracer.js
var require_ProxyTracer = __commonJS({
  "node_modules/@opentelemetry/api/build/src/trace/ProxyTracer.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ProxyTracer = void 0;
    var NoopTracer_1 = require_NoopTracer();
    var NOOP_TRACER = new NoopTracer_1.NoopTracer();
    var ProxyTracer = class {
      constructor(_provider, name, version, options) {
        this._provider = _provider;
        this.name = name;
        this.version = version;
        this.options = options;
      }
      startSpan(name, options, context) {
        return this._getTracer().startSpan(name, options, context);
      }
      startActiveSpan(_name, _options, _context, _fn) {
        const tracer = this._getTracer();
        return Reflect.apply(tracer.startActiveSpan, tracer, arguments);
      }
      /**
       * Try to get a tracer from the proxy tracer provider.
       * If the proxy tracer provider has no delegate, return a noop tracer.
       */
      _getTracer() {
        if (this._delegate) {
          return this._delegate;
        }
        const tracer = this._provider.getDelegateTracer(this.name, this.version, this.options);
        if (!tracer) {
          return NOOP_TRACER;
        }
        this._delegate = tracer;
        return this._delegate;
      }
    };
    exports.ProxyTracer = ProxyTracer;
  }
});

// node_modules/@opentelemetry/api/build/src/trace/NoopTracerProvider.js
var require_NoopTracerProvider = __commonJS({
  "node_modules/@opentelemetry/api/build/src/trace/NoopTracerProvider.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.NoopTracerProvider = void 0;
    var NoopTracer_1 = require_NoopTracer();
    var NoopTracerProvider = class {
      getTracer(_name, _version, _options) {
        return new NoopTracer_1.NoopTracer();
      }
    };
    exports.NoopTracerProvider = NoopTracerProvider;
  }
});

// node_modules/@opentelemetry/api/build/src/trace/ProxyTracerProvider.js
var require_ProxyTracerProvider = __commonJS({
  "node_modules/@opentelemetry/api/build/src/trace/ProxyTracerProvider.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ProxyTracerProvider = void 0;
    var ProxyTracer_1 = require_ProxyTracer();
    var NoopTracerProvider_1 = require_NoopTracerProvider();
    var NOOP_TRACER_PROVIDER = new NoopTracerProvider_1.NoopTracerProvider();
    var ProxyTracerProvider = class {
      /**
       * Get a {@link ProxyTracer}
       */
      getTracer(name, version, options) {
        var _a;
        return (_a = this.getDelegateTracer(name, version, options)) !== null && _a !== void 0 ? _a : new ProxyTracer_1.ProxyTracer(this, name, version, options);
      }
      getDelegate() {
        var _a;
        return (_a = this._delegate) !== null && _a !== void 0 ? _a : NOOP_TRACER_PROVIDER;
      }
      /**
       * Set the delegate tracer provider
       */
      setDelegate(delegate) {
        this._delegate = delegate;
      }
      getDelegateTracer(name, version, options) {
        var _a;
        return (_a = this._delegate) === null || _a === void 0 ? void 0 : _a.getTracer(name, version, options);
      }
    };
    exports.ProxyTracerProvider = ProxyTracerProvider;
  }
});

// node_modules/@opentelemetry/api/build/src/trace/SamplingResult.js
var require_SamplingResult = __commonJS({
  "node_modules/@opentelemetry/api/build/src/trace/SamplingResult.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.SamplingDecision = void 0;
    var SamplingDecision;
    (function(SamplingDecision2) {
      SamplingDecision2[SamplingDecision2["NOT_RECORD"] = 0] = "NOT_RECORD";
      SamplingDecision2[SamplingDecision2["RECORD"] = 1] = "RECORD";
      SamplingDecision2[SamplingDecision2["RECORD_AND_SAMPLED"] = 2] = "RECORD_AND_SAMPLED";
    })(SamplingDecision = exports.SamplingDecision || (exports.SamplingDecision = {}));
  }
});

// node_modules/@opentelemetry/api/build/src/trace/span_kind.js
var require_span_kind = __commonJS({
  "node_modules/@opentelemetry/api/build/src/trace/span_kind.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.SpanKind = void 0;
    var SpanKind;
    (function(SpanKind2) {
      SpanKind2[SpanKind2["INTERNAL"] = 0] = "INTERNAL";
      SpanKind2[SpanKind2["SERVER"] = 1] = "SERVER";
      SpanKind2[SpanKind2["CLIENT"] = 2] = "CLIENT";
      SpanKind2[SpanKind2["PRODUCER"] = 3] = "PRODUCER";
      SpanKind2[SpanKind2["CONSUMER"] = 4] = "CONSUMER";
    })(SpanKind = exports.SpanKind || (exports.SpanKind = {}));
  }
});

// node_modules/@opentelemetry/api/build/src/trace/status.js
var require_status = __commonJS({
  "node_modules/@opentelemetry/api/build/src/trace/status.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.SpanStatusCode = void 0;
    var SpanStatusCode;
    (function(SpanStatusCode2) {
      SpanStatusCode2[SpanStatusCode2["UNSET"] = 0] = "UNSET";
      SpanStatusCode2[SpanStatusCode2["OK"] = 1] = "OK";
      SpanStatusCode2[SpanStatusCode2["ERROR"] = 2] = "ERROR";
    })(SpanStatusCode = exports.SpanStatusCode || (exports.SpanStatusCode = {}));
  }
});

// node_modules/@opentelemetry/api/build/src/trace/internal/tracestate-validators.js
var require_tracestate_validators = __commonJS({
  "node_modules/@opentelemetry/api/build/src/trace/internal/tracestate-validators.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.validateValue = exports.validateKey = void 0;
    var VALID_KEY_CHAR_RANGE = "[_0-9a-z-*/]";
    var VALID_KEY = `[a-z]${VALID_KEY_CHAR_RANGE}{0,255}`;
    var VALID_VENDOR_KEY = `[a-z0-9]${VALID_KEY_CHAR_RANGE}{0,240}@[a-z]${VALID_KEY_CHAR_RANGE}{0,13}`;
    var VALID_KEY_REGEX = new RegExp(`^(?:${VALID_KEY}|${VALID_VENDOR_KEY})$`);
    var VALID_VALUE_BASE_REGEX = /^[ -~]{0,255}[!-~]$/;
    var INVALID_VALUE_COMMA_EQUAL_REGEX = /,|=/;
    function validateKey(key) {
      return VALID_KEY_REGEX.test(key);
    }
    exports.validateKey = validateKey;
    function validateValue(value) {
      return VALID_VALUE_BASE_REGEX.test(value) && !INVALID_VALUE_COMMA_EQUAL_REGEX.test(value);
    }
    exports.validateValue = validateValue;
  }
});

// node_modules/@opentelemetry/api/build/src/trace/internal/tracestate-impl.js
var require_tracestate_impl = __commonJS({
  "node_modules/@opentelemetry/api/build/src/trace/internal/tracestate-impl.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.TraceStateImpl = void 0;
    var tracestate_validators_1 = require_tracestate_validators();
    var MAX_TRACE_STATE_ITEMS = 32;
    var MAX_TRACE_STATE_LEN = 512;
    var LIST_MEMBERS_SEPARATOR = ",";
    var LIST_MEMBER_KEY_VALUE_SPLITTER = "=";
    var TraceStateImpl = class {
      constructor(rawTraceState) {
        this._internalState = /* @__PURE__ */ new Map();
        if (rawTraceState)
          this._parse(rawTraceState);
      }
      set(key, value) {
        const traceState = this._clone();
        if (traceState._internalState.has(key)) {
          traceState._internalState.delete(key);
        }
        traceState._internalState.set(key, value);
        return traceState;
      }
      unset(key) {
        const traceState = this._clone();
        traceState._internalState.delete(key);
        return traceState;
      }
      get(key) {
        return this._internalState.get(key);
      }
      serialize() {
        return this._keys().reduce((agg, key) => {
          agg.push(key + LIST_MEMBER_KEY_VALUE_SPLITTER + this.get(key));
          return agg;
        }, []).join(LIST_MEMBERS_SEPARATOR);
      }
      _parse(rawTraceState) {
        if (rawTraceState.length > MAX_TRACE_STATE_LEN)
          return;
        this._internalState = rawTraceState.split(LIST_MEMBERS_SEPARATOR).reverse().reduce((agg, part) => {
          const listMember = part.trim();
          const i = listMember.indexOf(LIST_MEMBER_KEY_VALUE_SPLITTER);
          if (i !== -1) {
            const key = listMember.slice(0, i);
            const value = listMember.slice(i + 1, part.length);
            if ((0, tracestate_validators_1.validateKey)(key) && (0, tracestate_validators_1.validateValue)(value)) {
              agg.set(key, value);
            } else {
            }
          }
          return agg;
        }, /* @__PURE__ */ new Map());
        if (this._internalState.size > MAX_TRACE_STATE_ITEMS) {
          this._internalState = new Map(Array.from(this._internalState.entries()).reverse().slice(0, MAX_TRACE_STATE_ITEMS));
        }
      }
      _keys() {
        return Array.from(this._internalState.keys()).reverse();
      }
      _clone() {
        const traceState = new TraceStateImpl();
        traceState._internalState = new Map(this._internalState);
        return traceState;
      }
    };
    exports.TraceStateImpl = TraceStateImpl;
  }
});

// node_modules/@opentelemetry/api/build/src/trace/internal/utils.js
var require_utils2 = __commonJS({
  "node_modules/@opentelemetry/api/build/src/trace/internal/utils.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.createTraceState = void 0;
    var tracestate_impl_1 = require_tracestate_impl();
    function createTraceState(rawTraceState) {
      return new tracestate_impl_1.TraceStateImpl(rawTraceState);
    }
    exports.createTraceState = createTraceState;
  }
});

// node_modules/@opentelemetry/api/build/src/context-api.js
var require_context_api = __commonJS({
  "node_modules/@opentelemetry/api/build/src/context-api.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.context = void 0;
    var context_1 = require_context2();
    exports.context = context_1.ContextAPI.getInstance();
  }
});

// node_modules/@opentelemetry/api/build/src/diag-api.js
var require_diag_api = __commonJS({
  "node_modules/@opentelemetry/api/build/src/diag-api.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.diag = void 0;
    var diag_1 = require_diag();
    exports.diag = diag_1.DiagAPI.instance();
  }
});

// node_modules/@opentelemetry/api/build/src/metrics/NoopMeterProvider.js
var require_NoopMeterProvider = __commonJS({
  "node_modules/@opentelemetry/api/build/src/metrics/NoopMeterProvider.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.NOOP_METER_PROVIDER = exports.NoopMeterProvider = void 0;
    var NoopMeter_1 = require_NoopMeter();
    var NoopMeterProvider = class {
      getMeter(_name, _version, _options) {
        return NoopMeter_1.NOOP_METER;
      }
    };
    exports.NoopMeterProvider = NoopMeterProvider;
    exports.NOOP_METER_PROVIDER = new NoopMeterProvider();
  }
});

// node_modules/@opentelemetry/api/build/src/api/metrics.js
var require_metrics = __commonJS({
  "node_modules/@opentelemetry/api/build/src/api/metrics.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.MetricsAPI = void 0;
    var NoopMeterProvider_1 = require_NoopMeterProvider();
    var global_utils_1 = require_global_utils();
    var diag_1 = require_diag();
    var API_NAME = "metrics";
    var MetricsAPI = class {
      /** Empty private constructor prevents end users from constructing a new instance of the API */
      constructor() {
      }
      /** Get the singleton instance of the Metrics API */
      static getInstance() {
        if (!this._instance) {
          this._instance = new MetricsAPI();
        }
        return this._instance;
      }
      /**
       * Set the current global meter provider.
       * Returns true if the meter provider was successfully registered, else false.
       */
      setGlobalMeterProvider(provider2) {
        return (0, global_utils_1.registerGlobal)(API_NAME, provider2, diag_1.DiagAPI.instance());
      }
      /**
       * Returns the global meter provider.
       */
      getMeterProvider() {
        return (0, global_utils_1.getGlobal)(API_NAME) || NoopMeterProvider_1.NOOP_METER_PROVIDER;
      }
      /**
       * Returns a meter from the global meter provider.
       */
      getMeter(name, version, options) {
        return this.getMeterProvider().getMeter(name, version, options);
      }
      /** Remove the global meter provider */
      disable() {
        (0, global_utils_1.unregisterGlobal)(API_NAME, diag_1.DiagAPI.instance());
      }
    };
    exports.MetricsAPI = MetricsAPI;
  }
});

// node_modules/@opentelemetry/api/build/src/metrics-api.js
var require_metrics_api = __commonJS({
  "node_modules/@opentelemetry/api/build/src/metrics-api.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.metrics = void 0;
    var metrics_1 = require_metrics();
    exports.metrics = metrics_1.MetricsAPI.getInstance();
  }
});

// node_modules/@opentelemetry/api/build/src/propagation/NoopTextMapPropagator.js
var require_NoopTextMapPropagator = __commonJS({
  "node_modules/@opentelemetry/api/build/src/propagation/NoopTextMapPropagator.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.NoopTextMapPropagator = void 0;
    var NoopTextMapPropagator = class {
      /** Noop inject function does nothing */
      inject(_context, _carrier) {
      }
      /** Noop extract function does nothing and returns the input context */
      extract(context, _carrier) {
        return context;
      }
      fields() {
        return [];
      }
    };
    exports.NoopTextMapPropagator = NoopTextMapPropagator;
  }
});

// node_modules/@opentelemetry/api/build/src/baggage/context-helpers.js
var require_context_helpers = __commonJS({
  "node_modules/@opentelemetry/api/build/src/baggage/context-helpers.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.deleteBaggage = exports.setBaggage = exports.getBaggage = void 0;
    var context_1 = require_context();
    var BAGGAGE_KEY = (0, context_1.createContextKey)("OpenTelemetry Baggage Key");
    function getBaggage(context) {
      return context.getValue(BAGGAGE_KEY) || void 0;
    }
    exports.getBaggage = getBaggage;
    function setBaggage(context, baggage) {
      return context.setValue(BAGGAGE_KEY, baggage);
    }
    exports.setBaggage = setBaggage;
    function deleteBaggage(context) {
      return context.deleteValue(BAGGAGE_KEY);
    }
    exports.deleteBaggage = deleteBaggage;
  }
});

// node_modules/@opentelemetry/api/build/src/api/propagation.js
var require_propagation = __commonJS({
  "node_modules/@opentelemetry/api/build/src/api/propagation.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.PropagationAPI = void 0;
    var global_utils_1 = require_global_utils();
    var NoopTextMapPropagator_1 = require_NoopTextMapPropagator();
    var TextMapPropagator_1 = require_TextMapPropagator();
    var context_helpers_1 = require_context_helpers();
    var utils_1 = require_utils();
    var diag_1 = require_diag();
    var API_NAME = "propagation";
    var NOOP_TEXT_MAP_PROPAGATOR = new NoopTextMapPropagator_1.NoopTextMapPropagator();
    var PropagationAPI = class {
      /** Empty private constructor prevents end users from constructing a new instance of the API */
      constructor() {
        this.createBaggage = utils_1.createBaggage;
        this.getBaggage = context_helpers_1.getBaggage;
        this.setBaggage = context_helpers_1.setBaggage;
        this.deleteBaggage = context_helpers_1.deleteBaggage;
      }
      /** Get the singleton instance of the Propagator API */
      static getInstance() {
        if (!this._instance) {
          this._instance = new PropagationAPI();
        }
        return this._instance;
      }
      /**
       * Set the current propagator.
       *
       * @returns true if the propagator was successfully registered, else false
       */
      setGlobalPropagator(propagator) {
        return (0, global_utils_1.registerGlobal)(API_NAME, propagator, diag_1.DiagAPI.instance());
      }
      /**
       * Inject context into a carrier to be propagated inter-process
       *
       * @param context Context carrying tracing data to inject
       * @param carrier carrier to inject context into
       * @param setter Function used to set values on the carrier
       */
      inject(context, carrier, setter = TextMapPropagator_1.defaultTextMapSetter) {
        return this._getGlobalPropagator().inject(context, carrier, setter);
      }
      /**
       * Extract context from a carrier
       *
       * @param context Context which the newly created context will inherit from
       * @param carrier Carrier to extract context from
       * @param getter Function used to extract keys from a carrier
       */
      extract(context, carrier, getter = TextMapPropagator_1.defaultTextMapGetter) {
        return this._getGlobalPropagator().extract(context, carrier, getter);
      }
      /**
       * Return a list of all fields which may be used by the propagator.
       */
      fields() {
        return this._getGlobalPropagator().fields();
      }
      /** Remove the global propagator */
      disable() {
        (0, global_utils_1.unregisterGlobal)(API_NAME, diag_1.DiagAPI.instance());
      }
      _getGlobalPropagator() {
        return (0, global_utils_1.getGlobal)(API_NAME) || NOOP_TEXT_MAP_PROPAGATOR;
      }
    };
    exports.PropagationAPI = PropagationAPI;
  }
});

// node_modules/@opentelemetry/api/build/src/propagation-api.js
var require_propagation_api = __commonJS({
  "node_modules/@opentelemetry/api/build/src/propagation-api.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.propagation = void 0;
    var propagation_1 = require_propagation();
    exports.propagation = propagation_1.PropagationAPI.getInstance();
  }
});

// node_modules/@opentelemetry/api/build/src/api/trace.js
var require_trace = __commonJS({
  "node_modules/@opentelemetry/api/build/src/api/trace.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.TraceAPI = void 0;
    var global_utils_1 = require_global_utils();
    var ProxyTracerProvider_1 = require_ProxyTracerProvider();
    var spancontext_utils_1 = require_spancontext_utils();
    var context_utils_1 = require_context_utils();
    var diag_1 = require_diag();
    var API_NAME = "trace";
    var TraceAPI = class {
      /** Empty private constructor prevents end users from constructing a new instance of the API */
      constructor() {
        this._proxyTracerProvider = new ProxyTracerProvider_1.ProxyTracerProvider();
        this.wrapSpanContext = spancontext_utils_1.wrapSpanContext;
        this.isSpanContextValid = spancontext_utils_1.isSpanContextValid;
        this.deleteSpan = context_utils_1.deleteSpan;
        this.getSpan = context_utils_1.getSpan;
        this.getActiveSpan = context_utils_1.getActiveSpan;
        this.getSpanContext = context_utils_1.getSpanContext;
        this.setSpan = context_utils_1.setSpan;
        this.setSpanContext = context_utils_1.setSpanContext;
      }
      /** Get the singleton instance of the Trace API */
      static getInstance() {
        if (!this._instance) {
          this._instance = new TraceAPI();
        }
        return this._instance;
      }
      /**
       * Set the current global tracer.
       *
       * @returns true if the tracer provider was successfully registered, else false
       */
      setGlobalTracerProvider(provider2) {
        const success = (0, global_utils_1.registerGlobal)(API_NAME, this._proxyTracerProvider, diag_1.DiagAPI.instance());
        if (success) {
          this._proxyTracerProvider.setDelegate(provider2);
        }
        return success;
      }
      /**
       * Returns the global tracer provider.
       */
      getTracerProvider() {
        return (0, global_utils_1.getGlobal)(API_NAME) || this._proxyTracerProvider;
      }
      /**
       * Returns a tracer from the global tracer provider.
       */
      getTracer(name, version) {
        return this.getTracerProvider().getTracer(name, version);
      }
      /** Remove the global tracer provider */
      disable() {
        (0, global_utils_1.unregisterGlobal)(API_NAME, diag_1.DiagAPI.instance());
        this._proxyTracerProvider = new ProxyTracerProvider_1.ProxyTracerProvider();
      }
    };
    exports.TraceAPI = TraceAPI;
  }
});

// node_modules/@opentelemetry/api/build/src/trace-api.js
var require_trace_api = __commonJS({
  "node_modules/@opentelemetry/api/build/src/trace-api.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.trace = void 0;
    var trace_1 = require_trace();
    exports.trace = trace_1.TraceAPI.getInstance();
  }
});

// node_modules/@opentelemetry/api/build/src/index.js
var require_src = __commonJS({
  "node_modules/@opentelemetry/api/build/src/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.trace = exports.propagation = exports.metrics = exports.diag = exports.context = exports.INVALID_SPAN_CONTEXT = exports.INVALID_TRACEID = exports.INVALID_SPANID = exports.isValidSpanId = exports.isValidTraceId = exports.isSpanContextValid = exports.createTraceState = exports.TraceFlags = exports.SpanStatusCode = exports.SpanKind = exports.SamplingDecision = exports.ProxyTracerProvider = exports.ProxyTracer = exports.defaultTextMapSetter = exports.defaultTextMapGetter = exports.ValueType = exports.createNoopMeter = exports.DiagLogLevel = exports.DiagConsoleLogger = exports.ROOT_CONTEXT = exports.createContextKey = exports.baggageEntryMetadataFromString = void 0;
    var utils_1 = require_utils();
    Object.defineProperty(exports, "baggageEntryMetadataFromString", { enumerable: true, get: function() {
      return utils_1.baggageEntryMetadataFromString;
    } });
    var context_1 = require_context();
    Object.defineProperty(exports, "createContextKey", { enumerable: true, get: function() {
      return context_1.createContextKey;
    } });
    Object.defineProperty(exports, "ROOT_CONTEXT", { enumerable: true, get: function() {
      return context_1.ROOT_CONTEXT;
    } });
    var consoleLogger_1 = require_consoleLogger();
    Object.defineProperty(exports, "DiagConsoleLogger", { enumerable: true, get: function() {
      return consoleLogger_1.DiagConsoleLogger;
    } });
    var types_1 = require_types();
    Object.defineProperty(exports, "DiagLogLevel", { enumerable: true, get: function() {
      return types_1.DiagLogLevel;
    } });
    var NoopMeter_1 = require_NoopMeter();
    Object.defineProperty(exports, "createNoopMeter", { enumerable: true, get: function() {
      return NoopMeter_1.createNoopMeter;
    } });
    var Metric_1 = require_Metric();
    Object.defineProperty(exports, "ValueType", { enumerable: true, get: function() {
      return Metric_1.ValueType;
    } });
    var TextMapPropagator_1 = require_TextMapPropagator();
    Object.defineProperty(exports, "defaultTextMapGetter", { enumerable: true, get: function() {
      return TextMapPropagator_1.defaultTextMapGetter;
    } });
    Object.defineProperty(exports, "defaultTextMapSetter", { enumerable: true, get: function() {
      return TextMapPropagator_1.defaultTextMapSetter;
    } });
    var ProxyTracer_1 = require_ProxyTracer();
    Object.defineProperty(exports, "ProxyTracer", { enumerable: true, get: function() {
      return ProxyTracer_1.ProxyTracer;
    } });
    var ProxyTracerProvider_1 = require_ProxyTracerProvider();
    Object.defineProperty(exports, "ProxyTracerProvider", { enumerable: true, get: function() {
      return ProxyTracerProvider_1.ProxyTracerProvider;
    } });
    var SamplingResult_1 = require_SamplingResult();
    Object.defineProperty(exports, "SamplingDecision", { enumerable: true, get: function() {
      return SamplingResult_1.SamplingDecision;
    } });
    var span_kind_1 = require_span_kind();
    Object.defineProperty(exports, "SpanKind", { enumerable: true, get: function() {
      return span_kind_1.SpanKind;
    } });
    var status_1 = require_status();
    Object.defineProperty(exports, "SpanStatusCode", { enumerable: true, get: function() {
      return status_1.SpanStatusCode;
    } });
    var trace_flags_1 = require_trace_flags();
    Object.defineProperty(exports, "TraceFlags", { enumerable: true, get: function() {
      return trace_flags_1.TraceFlags;
    } });
    var utils_2 = require_utils2();
    Object.defineProperty(exports, "createTraceState", { enumerable: true, get: function() {
      return utils_2.createTraceState;
    } });
    var spancontext_utils_1 = require_spancontext_utils();
    Object.defineProperty(exports, "isSpanContextValid", { enumerable: true, get: function() {
      return spancontext_utils_1.isSpanContextValid;
    } });
    Object.defineProperty(exports, "isValidTraceId", { enumerable: true, get: function() {
      return spancontext_utils_1.isValidTraceId;
    } });
    Object.defineProperty(exports, "isValidSpanId", { enumerable: true, get: function() {
      return spancontext_utils_1.isValidSpanId;
    } });
    var invalid_span_constants_1 = require_invalid_span_constants();
    Object.defineProperty(exports, "INVALID_SPANID", { enumerable: true, get: function() {
      return invalid_span_constants_1.INVALID_SPANID;
    } });
    Object.defineProperty(exports, "INVALID_TRACEID", { enumerable: true, get: function() {
      return invalid_span_constants_1.INVALID_TRACEID;
    } });
    Object.defineProperty(exports, "INVALID_SPAN_CONTEXT", { enumerable: true, get: function() {
      return invalid_span_constants_1.INVALID_SPAN_CONTEXT;
    } });
    var context_api_1 = require_context_api();
    Object.defineProperty(exports, "context", { enumerable: true, get: function() {
      return context_api_1.context;
    } });
    var diag_api_1 = require_diag_api();
    Object.defineProperty(exports, "diag", { enumerable: true, get: function() {
      return diag_api_1.diag;
    } });
    var metrics_api_1 = require_metrics_api();
    Object.defineProperty(exports, "metrics", { enumerable: true, get: function() {
      return metrics_api_1.metrics;
    } });
    var propagation_api_1 = require_propagation_api();
    Object.defineProperty(exports, "propagation", { enumerable: true, get: function() {
      return propagation_api_1.propagation;
    } });
    var trace_api_1 = require_trace_api();
    Object.defineProperty(exports, "trace", { enumerable: true, get: function() {
      return trace_api_1.trace;
    } });
    exports.default = {
      context: context_api_1.context,
      diag: diag_api_1.diag,
      metrics: metrics_api_1.metrics,
      propagation: propagation_api_1.propagation,
      trace: trace_api_1.trace
    };
  }
});

// node_modules/@opentelemetry/core/build/src/trace/suppress-tracing.js
var require_suppress_tracing = __commonJS({
  "node_modules/@opentelemetry/core/build/src/trace/suppress-tracing.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.isTracingSuppressed = exports.unsuppressTracing = exports.suppressTracing = void 0;
    var api_1 = require_src();
    var SUPPRESS_TRACING_KEY = (0, api_1.createContextKey)("OpenTelemetry SDK Context Key SUPPRESS_TRACING");
    function suppressTracing(context) {
      return context.setValue(SUPPRESS_TRACING_KEY, true);
    }
    exports.suppressTracing = suppressTracing;
    function unsuppressTracing(context) {
      return context.deleteValue(SUPPRESS_TRACING_KEY);
    }
    exports.unsuppressTracing = unsuppressTracing;
    function isTracingSuppressed(context) {
      return context.getValue(SUPPRESS_TRACING_KEY) === true;
    }
    exports.isTracingSuppressed = isTracingSuppressed;
  }
});

// node_modules/@opentelemetry/core/build/src/baggage/constants.js
var require_constants = __commonJS({
  "node_modules/@opentelemetry/core/build/src/baggage/constants.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.BAGGAGE_MAX_TOTAL_LENGTH = exports.BAGGAGE_MAX_PER_NAME_VALUE_PAIRS = exports.BAGGAGE_MAX_NAME_VALUE_PAIRS = exports.BAGGAGE_HEADER = exports.BAGGAGE_ITEMS_SEPARATOR = exports.BAGGAGE_PROPERTIES_SEPARATOR = exports.BAGGAGE_KEY_PAIR_SEPARATOR = void 0;
    exports.BAGGAGE_KEY_PAIR_SEPARATOR = "=";
    exports.BAGGAGE_PROPERTIES_SEPARATOR = ";";
    exports.BAGGAGE_ITEMS_SEPARATOR = ",";
    exports.BAGGAGE_HEADER = "baggage";
    exports.BAGGAGE_MAX_NAME_VALUE_PAIRS = 180;
    exports.BAGGAGE_MAX_PER_NAME_VALUE_PAIRS = 4096;
    exports.BAGGAGE_MAX_TOTAL_LENGTH = 8192;
  }
});

// node_modules/@opentelemetry/core/build/src/baggage/utils.js
var require_utils3 = __commonJS({
  "node_modules/@opentelemetry/core/build/src/baggage/utils.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.parseKeyPairsIntoRecord = exports.parsePairKeyValue = exports.getKeyPairs = exports.serializeKeyPairs = void 0;
    var api_1 = require_src();
    var constants_1 = require_constants();
    function serializeKeyPairs(keyPairs) {
      return keyPairs.reduce((hValue, current) => {
        const value = `${hValue}${hValue !== "" ? constants_1.BAGGAGE_ITEMS_SEPARATOR : ""}${current}`;
        return value.length > constants_1.BAGGAGE_MAX_TOTAL_LENGTH ? hValue : value;
      }, "");
    }
    exports.serializeKeyPairs = serializeKeyPairs;
    function getKeyPairs(baggage) {
      return baggage.getAllEntries().map(([key, value]) => {
        let entry = `${encodeURIComponent(key)}=${encodeURIComponent(value.value)}`;
        if (value.metadata !== void 0) {
          entry += constants_1.BAGGAGE_PROPERTIES_SEPARATOR + value.metadata.toString();
        }
        return entry;
      });
    }
    exports.getKeyPairs = getKeyPairs;
    function parsePairKeyValue(entry) {
      const valueProps = entry.split(constants_1.BAGGAGE_PROPERTIES_SEPARATOR);
      if (valueProps.length <= 0)
        return;
      const keyPairPart = valueProps.shift();
      if (!keyPairPart)
        return;
      const keyPair = keyPairPart.split(constants_1.BAGGAGE_KEY_PAIR_SEPARATOR);
      if (keyPair.length !== 2)
        return;
      const key = decodeURIComponent(keyPair[0].trim());
      const value = decodeURIComponent(keyPair[1].trim());
      let metadata;
      if (valueProps.length > 0) {
        metadata = (0, api_1.baggageEntryMetadataFromString)(valueProps.join(constants_1.BAGGAGE_PROPERTIES_SEPARATOR));
      }
      return { key, value, metadata };
    }
    exports.parsePairKeyValue = parsePairKeyValue;
    function parseKeyPairsIntoRecord(value) {
      if (typeof value !== "string" || value.length === 0)
        return {};
      return value.split(constants_1.BAGGAGE_ITEMS_SEPARATOR).map((entry) => {
        return parsePairKeyValue(entry);
      }).filter((keyPair) => keyPair !== void 0 && keyPair.value.length > 0).reduce((headers, keyPair) => {
        headers[keyPair.key] = keyPair.value;
        return headers;
      }, {});
    }
    exports.parseKeyPairsIntoRecord = parseKeyPairsIntoRecord;
  }
});

// node_modules/@opentelemetry/core/build/src/baggage/propagation/W3CBaggagePropagator.js
var require_W3CBaggagePropagator = __commonJS({
  "node_modules/@opentelemetry/core/build/src/baggage/propagation/W3CBaggagePropagator.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.W3CBaggagePropagator = void 0;
    var api_1 = require_src();
    var suppress_tracing_1 = require_suppress_tracing();
    var constants_1 = require_constants();
    var utils_1 = require_utils3();
    var W3CBaggagePropagator = class {
      inject(context, carrier, setter) {
        const baggage = api_1.propagation.getBaggage(context);
        if (!baggage || (0, suppress_tracing_1.isTracingSuppressed)(context))
          return;
        const keyPairs = (0, utils_1.getKeyPairs)(baggage).filter((pair) => {
          return pair.length <= constants_1.BAGGAGE_MAX_PER_NAME_VALUE_PAIRS;
        }).slice(0, constants_1.BAGGAGE_MAX_NAME_VALUE_PAIRS);
        const headerValue = (0, utils_1.serializeKeyPairs)(keyPairs);
        if (headerValue.length > 0) {
          setter.set(carrier, constants_1.BAGGAGE_HEADER, headerValue);
        }
      }
      extract(context, carrier, getter) {
        const headerValue = getter.get(carrier, constants_1.BAGGAGE_HEADER);
        const baggageString = Array.isArray(headerValue) ? headerValue.join(constants_1.BAGGAGE_ITEMS_SEPARATOR) : headerValue;
        if (!baggageString)
          return context;
        const baggage = {};
        if (baggageString.length === 0) {
          return context;
        }
        const pairs = baggageString.split(constants_1.BAGGAGE_ITEMS_SEPARATOR);
        pairs.forEach((entry) => {
          const keyPair = (0, utils_1.parsePairKeyValue)(entry);
          if (keyPair) {
            const baggageEntry = { value: keyPair.value };
            if (keyPair.metadata) {
              baggageEntry.metadata = keyPair.metadata;
            }
            baggage[keyPair.key] = baggageEntry;
          }
        });
        if (Object.entries(baggage).length === 0) {
          return context;
        }
        return api_1.propagation.setBaggage(context, api_1.propagation.createBaggage(baggage));
      }
      fields() {
        return [constants_1.BAGGAGE_HEADER];
      }
    };
    exports.W3CBaggagePropagator = W3CBaggagePropagator;
  }
});

// node_modules/@opentelemetry/core/build/src/common/anchored-clock.js
var require_anchored_clock = __commonJS({
  "node_modules/@opentelemetry/core/build/src/common/anchored-clock.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.AnchoredClock = void 0;
    var AnchoredClock = class {
      /**
       * Create a new AnchoredClock anchored to the current time returned by systemClock.
       *
       * @param systemClock should be a clock that returns the number of milliseconds since January 1 1970 such as Date
       * @param monotonicClock should be a clock that counts milliseconds monotonically such as window.performance or perf_hooks.performance
       */
      constructor(systemClock, monotonicClock) {
        this._monotonicClock = monotonicClock;
        this._epochMillis = systemClock.now();
        this._performanceMillis = monotonicClock.now();
      }
      /**
       * Returns the current time by adding the number of milliseconds since the
       * AnchoredClock was created to the creation epoch time
       */
      now() {
        const delta = this._monotonicClock.now() - this._performanceMillis;
        return this._epochMillis + delta;
      }
    };
    exports.AnchoredClock = AnchoredClock;
  }
});

// node_modules/@opentelemetry/core/build/src/common/attributes.js
var require_attributes = __commonJS({
  "node_modules/@opentelemetry/core/build/src/common/attributes.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.isAttributeValue = exports.isAttributeKey = exports.sanitizeAttributes = void 0;
    var api_1 = require_src();
    function sanitizeAttributes(attributes) {
      const out = {};
      if (typeof attributes !== "object" || attributes == null) {
        return out;
      }
      for (const [key, val] of Object.entries(attributes)) {
        if (!isAttributeKey(key)) {
          api_1.diag.warn(`Invalid attribute key: ${key}`);
          continue;
        }
        if (!isAttributeValue(val)) {
          api_1.diag.warn(`Invalid attribute value set for key: ${key}`);
          continue;
        }
        if (Array.isArray(val)) {
          out[key] = val.slice();
        } else {
          out[key] = val;
        }
      }
      return out;
    }
    exports.sanitizeAttributes = sanitizeAttributes;
    function isAttributeKey(key) {
      return typeof key === "string" && key.length > 0;
    }
    exports.isAttributeKey = isAttributeKey;
    function isAttributeValue(val) {
      if (val == null) {
        return true;
      }
      if (Array.isArray(val)) {
        return isHomogeneousAttributeValueArray(val);
      }
      return isValidPrimitiveAttributeValue(val);
    }
    exports.isAttributeValue = isAttributeValue;
    function isHomogeneousAttributeValueArray(arr) {
      let type;
      for (const element of arr) {
        if (element == null)
          continue;
        if (!type) {
          if (isValidPrimitiveAttributeValue(element)) {
            type = typeof element;
            continue;
          }
          return false;
        }
        if (typeof element === type) {
          continue;
        }
        return false;
      }
      return true;
    }
    function isValidPrimitiveAttributeValue(val) {
      switch (typeof val) {
        case "number":
        case "boolean":
        case "string":
          return true;
      }
      return false;
    }
  }
});

// node_modules/@opentelemetry/core/build/src/common/logging-error-handler.js
var require_logging_error_handler = __commonJS({
  "node_modules/@opentelemetry/core/build/src/common/logging-error-handler.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.loggingErrorHandler = void 0;
    var api_1 = require_src();
    function loggingErrorHandler() {
      return (ex) => {
        api_1.diag.error(stringifyException(ex));
      };
    }
    exports.loggingErrorHandler = loggingErrorHandler;
    function stringifyException(ex) {
      if (typeof ex === "string") {
        return ex;
      } else {
        return JSON.stringify(flattenException(ex));
      }
    }
    function flattenException(ex) {
      const result = {};
      let current = ex;
      while (current !== null) {
        Object.getOwnPropertyNames(current).forEach((propertyName) => {
          if (result[propertyName])
            return;
          const value = current[propertyName];
          if (value) {
            result[propertyName] = String(value);
          }
        });
        current = Object.getPrototypeOf(current);
      }
      return result;
    }
  }
});

// node_modules/@opentelemetry/core/build/src/common/global-error-handler.js
var require_global_error_handler = __commonJS({
  "node_modules/@opentelemetry/core/build/src/common/global-error-handler.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.globalErrorHandler = exports.setGlobalErrorHandler = void 0;
    var logging_error_handler_1 = require_logging_error_handler();
    var delegateHandler = (0, logging_error_handler_1.loggingErrorHandler)();
    function setGlobalErrorHandler(handler) {
      delegateHandler = handler;
    }
    exports.setGlobalErrorHandler = setGlobalErrorHandler;
    function globalErrorHandler(ex) {
      try {
        delegateHandler(ex);
      } catch (_a) {
      }
    }
    exports.globalErrorHandler = globalErrorHandler;
  }
});

// node_modules/@opentelemetry/core/build/src/utils/sampling.js
var require_sampling = __commonJS({
  "node_modules/@opentelemetry/core/build/src/utils/sampling.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.TracesSamplerValues = void 0;
    var TracesSamplerValues;
    (function(TracesSamplerValues2) {
      TracesSamplerValues2["AlwaysOff"] = "always_off";
      TracesSamplerValues2["AlwaysOn"] = "always_on";
      TracesSamplerValues2["ParentBasedAlwaysOff"] = "parentbased_always_off";
      TracesSamplerValues2["ParentBasedAlwaysOn"] = "parentbased_always_on";
      TracesSamplerValues2["ParentBasedTraceIdRatio"] = "parentbased_traceidratio";
      TracesSamplerValues2["TraceIdRatio"] = "traceidratio";
    })(TracesSamplerValues = exports.TracesSamplerValues || (exports.TracesSamplerValues = {}));
  }
});

// node_modules/@opentelemetry/core/build/src/platform/browser/globalThis.js
var require_globalThis2 = __commonJS({
  "node_modules/@opentelemetry/core/build/src/platform/browser/globalThis.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports._globalThis = void 0;
    exports._globalThis = typeof globalThis === "object" ? globalThis : typeof self === "object" ? self : typeof window === "object" ? window : typeof global === "object" ? global : {};
  }
});

// node_modules/@opentelemetry/core/build/src/utils/environment.js
var require_environment = __commonJS({
  "node_modules/@opentelemetry/core/build/src/utils/environment.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getEnvWithoutDefaults = exports.parseEnvironment = exports.DEFAULT_ENVIRONMENT = exports.DEFAULT_ATTRIBUTE_COUNT_LIMIT = exports.DEFAULT_ATTRIBUTE_VALUE_LENGTH_LIMIT = void 0;
    var api_1 = require_src();
    var sampling_1 = require_sampling();
    var globalThis_1 = require_globalThis2();
    var DEFAULT_LIST_SEPARATOR = ",";
    var ENVIRONMENT_NUMBERS_KEYS = [
      "OTEL_BSP_EXPORT_TIMEOUT",
      "OTEL_BSP_MAX_EXPORT_BATCH_SIZE",
      "OTEL_BSP_MAX_QUEUE_SIZE",
      "OTEL_BSP_SCHEDULE_DELAY",
      "OTEL_ATTRIBUTE_VALUE_LENGTH_LIMIT",
      "OTEL_ATTRIBUTE_COUNT_LIMIT",
      "OTEL_SPAN_ATTRIBUTE_VALUE_LENGTH_LIMIT",
      "OTEL_SPAN_ATTRIBUTE_COUNT_LIMIT",
      "OTEL_SPAN_EVENT_COUNT_LIMIT",
      "OTEL_SPAN_LINK_COUNT_LIMIT",
      "OTEL_EXPORTER_OTLP_TIMEOUT",
      "OTEL_EXPORTER_OTLP_TRACES_TIMEOUT",
      "OTEL_EXPORTER_OTLP_METRICS_TIMEOUT",
      "OTEL_EXPORTER_JAEGER_AGENT_PORT"
    ];
    function isEnvVarANumber(key) {
      return ENVIRONMENT_NUMBERS_KEYS.indexOf(key) > -1;
    }
    var ENVIRONMENT_LISTS_KEYS = [
      "OTEL_NO_PATCH_MODULES",
      "OTEL_PROPAGATORS"
    ];
    function isEnvVarAList(key) {
      return ENVIRONMENT_LISTS_KEYS.indexOf(key) > -1;
    }
    exports.DEFAULT_ATTRIBUTE_VALUE_LENGTH_LIMIT = Infinity;
    exports.DEFAULT_ATTRIBUTE_COUNT_LIMIT = 128;
    exports.DEFAULT_ENVIRONMENT = {
      CONTAINER_NAME: "",
      ECS_CONTAINER_METADATA_URI_V4: "",
      ECS_CONTAINER_METADATA_URI: "",
      HOSTNAME: "",
      KUBERNETES_SERVICE_HOST: "",
      NAMESPACE: "",
      OTEL_BSP_EXPORT_TIMEOUT: 3e4,
      OTEL_BSP_MAX_EXPORT_BATCH_SIZE: 512,
      OTEL_BSP_MAX_QUEUE_SIZE: 2048,
      OTEL_BSP_SCHEDULE_DELAY: 5e3,
      OTEL_EXPORTER_JAEGER_AGENT_HOST: "",
      OTEL_EXPORTER_JAEGER_AGENT_PORT: 6832,
      OTEL_EXPORTER_JAEGER_ENDPOINT: "",
      OTEL_EXPORTER_JAEGER_PASSWORD: "",
      OTEL_EXPORTER_JAEGER_USER: "",
      OTEL_EXPORTER_OTLP_ENDPOINT: "",
      OTEL_EXPORTER_OTLP_TRACES_ENDPOINT: "",
      OTEL_EXPORTER_OTLP_METRICS_ENDPOINT: "",
      OTEL_EXPORTER_OTLP_HEADERS: "",
      OTEL_EXPORTER_OTLP_TRACES_HEADERS: "",
      OTEL_EXPORTER_OTLP_METRICS_HEADERS: "",
      OTEL_EXPORTER_OTLP_TIMEOUT: 1e4,
      OTEL_EXPORTER_OTLP_TRACES_TIMEOUT: 1e4,
      OTEL_EXPORTER_OTLP_METRICS_TIMEOUT: 1e4,
      OTEL_EXPORTER_ZIPKIN_ENDPOINT: "http://localhost:9411/api/v2/spans",
      OTEL_LOG_LEVEL: api_1.DiagLogLevel.INFO,
      OTEL_NO_PATCH_MODULES: [],
      OTEL_PROPAGATORS: ["tracecontext", "baggage"],
      OTEL_RESOURCE_ATTRIBUTES: "",
      OTEL_SERVICE_NAME: "",
      OTEL_ATTRIBUTE_VALUE_LENGTH_LIMIT: exports.DEFAULT_ATTRIBUTE_VALUE_LENGTH_LIMIT,
      OTEL_ATTRIBUTE_COUNT_LIMIT: exports.DEFAULT_ATTRIBUTE_COUNT_LIMIT,
      OTEL_SPAN_ATTRIBUTE_VALUE_LENGTH_LIMIT: exports.DEFAULT_ATTRIBUTE_VALUE_LENGTH_LIMIT,
      OTEL_SPAN_ATTRIBUTE_COUNT_LIMIT: exports.DEFAULT_ATTRIBUTE_COUNT_LIMIT,
      OTEL_SPAN_EVENT_COUNT_LIMIT: 128,
      OTEL_SPAN_LINK_COUNT_LIMIT: 128,
      OTEL_TRACES_EXPORTER: "otlp",
      OTEL_TRACES_SAMPLER: sampling_1.TracesSamplerValues.ParentBasedAlwaysOn,
      OTEL_TRACES_SAMPLER_ARG: "",
      OTEL_EXPORTER_OTLP_INSECURE: "",
      OTEL_EXPORTER_OTLP_TRACES_INSECURE: "",
      OTEL_EXPORTER_OTLP_METRICS_INSECURE: "",
      OTEL_EXPORTER_OTLP_CERTIFICATE: "",
      OTEL_EXPORTER_OTLP_TRACES_CERTIFICATE: "",
      OTEL_EXPORTER_OTLP_METRICS_CERTIFICATE: "",
      OTEL_EXPORTER_OTLP_COMPRESSION: "",
      OTEL_EXPORTER_OTLP_TRACES_COMPRESSION: "",
      OTEL_EXPORTER_OTLP_METRICS_COMPRESSION: "",
      OTEL_EXPORTER_OTLP_CLIENT_KEY: "",
      OTEL_EXPORTER_OTLP_TRACES_CLIENT_KEY: "",
      OTEL_EXPORTER_OTLP_METRICS_CLIENT_KEY: "",
      OTEL_EXPORTER_OTLP_CLIENT_CERTIFICATE: "",
      OTEL_EXPORTER_OTLP_TRACES_CLIENT_CERTIFICATE: "",
      OTEL_EXPORTER_OTLP_METRICS_CLIENT_CERTIFICATE: "",
      OTEL_EXPORTER_OTLP_PROTOCOL: "http/protobuf",
      OTEL_EXPORTER_OTLP_TRACES_PROTOCOL: "http/protobuf",
      OTEL_EXPORTER_OTLP_METRICS_PROTOCOL: "http/protobuf",
      OTEL_EXPORTER_OTLP_METRICS_TEMPORALITY_PREFERENCE: "cumulative"
    };
    function parseNumber(name, environment, values, min = -Infinity, max = Infinity) {
      if (typeof values[name] !== "undefined") {
        const value = Number(values[name]);
        if (!isNaN(value)) {
          if (value < min) {
            environment[name] = min;
          } else if (value > max) {
            environment[name] = max;
          } else {
            environment[name] = value;
          }
        }
      }
    }
    function parseStringList(name, output, input, separator = DEFAULT_LIST_SEPARATOR) {
      const givenValue = input[name];
      if (typeof givenValue === "string") {
        output[name] = givenValue.split(separator).map((v) => v.trim());
      }
    }
    var logLevelMap = {
      ALL: api_1.DiagLogLevel.ALL,
      VERBOSE: api_1.DiagLogLevel.VERBOSE,
      DEBUG: api_1.DiagLogLevel.DEBUG,
      INFO: api_1.DiagLogLevel.INFO,
      WARN: api_1.DiagLogLevel.WARN,
      ERROR: api_1.DiagLogLevel.ERROR,
      NONE: api_1.DiagLogLevel.NONE
    };
    function setLogLevelFromEnv(key, environment, values) {
      const value = values[key];
      if (typeof value === "string") {
        const theLevel = logLevelMap[value.toUpperCase()];
        if (theLevel != null) {
          environment[key] = theLevel;
        }
      }
    }
    function parseEnvironment(values) {
      const environment = {};
      for (const env in exports.DEFAULT_ENVIRONMENT) {
        const key = env;
        switch (key) {
          case "OTEL_LOG_LEVEL":
            setLogLevelFromEnv(key, environment, values);
            break;
          default:
            if (isEnvVarANumber(key)) {
              parseNumber(key, environment, values);
            } else if (isEnvVarAList(key)) {
              parseStringList(key, environment, values);
            } else {
              const value = values[key];
              if (typeof value !== "undefined" && value !== null) {
                environment[key] = String(value);
              }
            }
        }
      }
      return environment;
    }
    exports.parseEnvironment = parseEnvironment;
    function getEnvWithoutDefaults() {
      return typeof process !== "undefined" ? parseEnvironment(process.env) : parseEnvironment(globalThis_1._globalThis);
    }
    exports.getEnvWithoutDefaults = getEnvWithoutDefaults;
  }
});

// node_modules/@opentelemetry/core/build/src/platform/node/environment.js
var require_environment2 = __commonJS({
  "node_modules/@opentelemetry/core/build/src/platform/node/environment.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getEnv = void 0;
    var os = require("os");
    var environment_1 = require_environment();
    function getEnv() {
      const processEnv = (0, environment_1.parseEnvironment)(process.env);
      return Object.assign({
        HOSTNAME: os.hostname()
      }, environment_1.DEFAULT_ENVIRONMENT, processEnv);
    }
    exports.getEnv = getEnv;
  }
});

// node_modules/@opentelemetry/core/build/src/platform/node/globalThis.js
var require_globalThis3 = __commonJS({
  "node_modules/@opentelemetry/core/build/src/platform/node/globalThis.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports._globalThis = void 0;
    exports._globalThis = typeof globalThis === "object" ? globalThis : global;
  }
});

// node_modules/@opentelemetry/core/build/src/platform/node/hex-to-base64.js
var require_hex_to_base64 = __commonJS({
  "node_modules/@opentelemetry/core/build/src/platform/node/hex-to-base64.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.hexToBase64 = void 0;
    function intValue(charCode) {
      if (charCode >= 48 && charCode <= 57) {
        return charCode - 48;
      }
      if (charCode >= 97 && charCode <= 102) {
        return charCode - 87;
      }
      return charCode - 55;
    }
    var buf8 = Buffer.alloc(8);
    var buf16 = Buffer.alloc(16);
    function hexToBase64(hexStr) {
      let buf;
      if (hexStr.length === 16) {
        buf = buf8;
      } else if (hexStr.length === 32) {
        buf = buf16;
      } else {
        buf = Buffer.alloc(hexStr.length / 2);
      }
      let offset = 0;
      for (let i = 0; i < hexStr.length; i += 2) {
        const hi = intValue(hexStr.charCodeAt(i));
        const lo = intValue(hexStr.charCodeAt(i + 1));
        buf.writeUInt8(hi << 4 | lo, offset++);
      }
      return buf.toString("base64");
    }
    exports.hexToBase64 = hexToBase64;
  }
});

// node_modules/@opentelemetry/core/build/src/platform/node/RandomIdGenerator.js
var require_RandomIdGenerator = __commonJS({
  "node_modules/@opentelemetry/core/build/src/platform/node/RandomIdGenerator.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.RandomIdGenerator = void 0;
    var SPAN_ID_BYTES = 8;
    var TRACE_ID_BYTES = 16;
    var RandomIdGenerator = class {
      constructor() {
        this.generateTraceId = getIdGenerator(TRACE_ID_BYTES);
        this.generateSpanId = getIdGenerator(SPAN_ID_BYTES);
      }
    };
    exports.RandomIdGenerator = RandomIdGenerator;
    var SHARED_BUFFER = Buffer.allocUnsafe(TRACE_ID_BYTES);
    function getIdGenerator(bytes) {
      return function generateId() {
        for (let i = 0; i < bytes / 4; i++) {
          SHARED_BUFFER.writeUInt32BE(Math.random() * 2 ** 32 >>> 0, i * 4);
        }
        for (let i = 0; i < bytes; i++) {
          if (SHARED_BUFFER[i] > 0) {
            break;
          } else if (i === bytes - 1) {
            SHARED_BUFFER[bytes - 1] = 1;
          }
        }
        return SHARED_BUFFER.toString("hex", 0, bytes);
      };
    }
  }
});

// node_modules/@opentelemetry/core/build/src/platform/node/performance.js
var require_performance = __commonJS({
  "node_modules/@opentelemetry/core/build/src/platform/node/performance.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.otperformance = void 0;
    var perf_hooks_1 = require("perf_hooks");
    exports.otperformance = perf_hooks_1.performance;
  }
});

// node_modules/@opentelemetry/core/build/src/version.js
var require_version2 = __commonJS({
  "node_modules/@opentelemetry/core/build/src/version.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.VERSION = void 0;
    exports.VERSION = "1.8.0";
  }
});

// node_modules/@opentelemetry/semantic-conventions/build/src/trace/SemanticAttributes.js
var require_SemanticAttributes = __commonJS({
  "node_modules/@opentelemetry/semantic-conventions/build/src/trace/SemanticAttributes.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.MessageTypeValues = exports.RpcGrpcStatusCodeValues = exports.MessagingOperationValues = exports.MessagingDestinationKindValues = exports.HttpFlavorValues = exports.NetHostConnectionSubtypeValues = exports.NetHostConnectionTypeValues = exports.NetTransportValues = exports.FaasInvokedProviderValues = exports.FaasDocumentOperationValues = exports.FaasTriggerValues = exports.DbCassandraConsistencyLevelValues = exports.DbSystemValues = exports.SemanticAttributes = void 0;
    exports.SemanticAttributes = {
      /**
      * The full invoked ARN as provided on the `Context` passed to the function (`Lambda-Runtime-Invoked-Function-Arn` header on the `/runtime/invocation/next` applicable).
      *
      * Note: This may be different from `faas.id` if an alias is involved.
      */
      AWS_LAMBDA_INVOKED_ARN: "aws.lambda.invoked_arn",
      /**
      * An identifier for the database management system (DBMS) product being used. See below for a list of well-known identifiers.
      */
      DB_SYSTEM: "db.system",
      /**
      * The connection string used to connect to the database. It is recommended to remove embedded credentials.
      */
      DB_CONNECTION_STRING: "db.connection_string",
      /**
      * Username for accessing the database.
      */
      DB_USER: "db.user",
      /**
      * The fully-qualified class name of the [Java Database Connectivity (JDBC)](https://docs.oracle.com/javase/8/docs/technotes/guides/jdbc/) driver used to connect.
      */
      DB_JDBC_DRIVER_CLASSNAME: "db.jdbc.driver_classname",
      /**
      * If no [tech-specific attribute](#call-level-attributes-for-specific-technologies) is defined, this attribute is used to report the name of the database being accessed. For commands that switch the database, this should be set to the target database (even if the command fails).
      *
      * Note: In some SQL databases, the database name to be used is called &#34;schema name&#34;.
      */
      DB_NAME: "db.name",
      /**
      * The database statement being executed.
      *
      * Note: The value may be sanitized to exclude sensitive information.
      */
      DB_STATEMENT: "db.statement",
      /**
      * The name of the operation being executed, e.g. the [MongoDB command name](https://docs.mongodb.com/manual/reference/command/#database-operations) such as `findAndModify`, or the SQL keyword.
      *
      * Note: When setting this to an SQL keyword, it is not recommended to attempt any client-side parsing of `db.statement` just to get this property, but it should be set if the operation name is provided by the library being instrumented. If the SQL statement has an ambiguous operation, or performs more than one operation, this value may be omitted.
      */
      DB_OPERATION: "db.operation",
      /**
      * The Microsoft SQL Server [instance name](https://docs.microsoft.com/en-us/sql/connect/jdbc/building-the-connection-url?view=sql-server-ver15) connecting to. This name is used to determine the port of a named instance.
      *
      * Note: If setting a `db.mssql.instance_name`, `net.peer.port` is no longer required (but still recommended if non-standard).
      */
      DB_MSSQL_INSTANCE_NAME: "db.mssql.instance_name",
      /**
      * The name of the keyspace being accessed. To be used instead of the generic `db.name` attribute.
      */
      DB_CASSANDRA_KEYSPACE: "db.cassandra.keyspace",
      /**
      * The fetch size used for paging, i.e. how many rows will be returned at once.
      */
      DB_CASSANDRA_PAGE_SIZE: "db.cassandra.page_size",
      /**
      * The consistency level of the query. Based on consistency values from [CQL](https://docs.datastax.com/en/cassandra-oss/3.0/cassandra/dml/dmlConfigConsistency.html).
      */
      DB_CASSANDRA_CONSISTENCY_LEVEL: "db.cassandra.consistency_level",
      /**
      * The name of the primary table that the operation is acting upon, including the schema name (if applicable).
      *
      * Note: This mirrors the db.sql.table attribute but references cassandra rather than sql. It is not recommended to attempt any client-side parsing of `db.statement` just to get this property, but it should be set if it is provided by the library being instrumented. If the operation is acting upon an anonymous table, or more than one table, this value MUST NOT be set.
      */
      DB_CASSANDRA_TABLE: "db.cassandra.table",
      /**
      * Whether or not the query is idempotent.
      */
      DB_CASSANDRA_IDEMPOTENCE: "db.cassandra.idempotence",
      /**
      * The number of times a query was speculatively executed. Not set or `0` if the query was not executed speculatively.
      */
      DB_CASSANDRA_SPECULATIVE_EXECUTION_COUNT: "db.cassandra.speculative_execution_count",
      /**
      * The ID of the coordinating node for a query.
      */
      DB_CASSANDRA_COORDINATOR_ID: "db.cassandra.coordinator.id",
      /**
      * The data center of the coordinating node for a query.
      */
      DB_CASSANDRA_COORDINATOR_DC: "db.cassandra.coordinator.dc",
      /**
      * The [HBase namespace](https://hbase.apache.org/book.html#_namespace) being accessed. To be used instead of the generic `db.name` attribute.
      */
      DB_HBASE_NAMESPACE: "db.hbase.namespace",
      /**
      * The index of the database being accessed as used in the [`SELECT` command](https://redis.io/commands/select), provided as an integer. To be used instead of the generic `db.name` attribute.
      */
      DB_REDIS_DATABASE_INDEX: "db.redis.database_index",
      /**
      * The collection being accessed within the database stated in `db.name`.
      */
      DB_MONGODB_COLLECTION: "db.mongodb.collection",
      /**
      * The name of the primary table that the operation is acting upon, including the schema name (if applicable).
      *
      * Note: It is not recommended to attempt any client-side parsing of `db.statement` just to get this property, but it should be set if it is provided by the library being instrumented. If the operation is acting upon an anonymous table, or more than one table, this value MUST NOT be set.
      */
      DB_SQL_TABLE: "db.sql.table",
      /**
      * The type of the exception (its fully-qualified class name, if applicable). The dynamic type of the exception should be preferred over the static type in languages that support it.
      */
      EXCEPTION_TYPE: "exception.type",
      /**
      * The exception message.
      */
      EXCEPTION_MESSAGE: "exception.message",
      /**
      * A stacktrace as a string in the natural representation for the language runtime. The representation is to be determined and documented by each language SIG.
      */
      EXCEPTION_STACKTRACE: "exception.stacktrace",
      /**
        * SHOULD be set to true if the exception event is recorded at a point where it is known that the exception is escaping the scope of the span.
        *
        * Note: An exception is considered to have escaped (or left) the scope of a span,
      if that span is ended while the exception is still logically &#34;in flight&#34;.
      This may be actually &#34;in flight&#34; in some languages (e.g. if the exception
      is passed to a Context manager&#39;s `__exit__` method in Python) but will
      usually be caught at the point of recording the exception in most languages.
      
      It is usually not possible to determine at the point where an exception is thrown
      whether it will escape the scope of a span.
      However, it is trivial to know that an exception
      will escape, if one checks for an active exception just before ending the span,
      as done in the [example above](#exception-end-example).
      
      It follows that an exception may still escape the scope of the span
      even if the `exception.escaped` attribute was not set or set to false,
      since the event might have been recorded at a time where it was not
      clear whether the exception will escape.
        */
      EXCEPTION_ESCAPED: "exception.escaped",
      /**
      * Type of the trigger on which the function is executed.
      */
      FAAS_TRIGGER: "faas.trigger",
      /**
      * The execution ID of the current function execution.
      */
      FAAS_EXECUTION: "faas.execution",
      /**
      * The name of the source on which the triggering operation was performed. For example, in Cloud Storage or S3 corresponds to the bucket name, and in Cosmos DB to the database name.
      */
      FAAS_DOCUMENT_COLLECTION: "faas.document.collection",
      /**
      * Describes the type of the operation that was performed on the data.
      */
      FAAS_DOCUMENT_OPERATION: "faas.document.operation",
      /**
      * A string containing the time when the data was accessed in the [ISO 8601](https://www.iso.org/iso-8601-date-and-time-format.html) format expressed in [UTC](https://www.w3.org/TR/NOTE-datetime).
      */
      FAAS_DOCUMENT_TIME: "faas.document.time",
      /**
      * The document name/table subjected to the operation. For example, in Cloud Storage or S3 is the name of the file, and in Cosmos DB the table name.
      */
      FAAS_DOCUMENT_NAME: "faas.document.name",
      /**
      * A string containing the function invocation time in the [ISO 8601](https://www.iso.org/iso-8601-date-and-time-format.html) format expressed in [UTC](https://www.w3.org/TR/NOTE-datetime).
      */
      FAAS_TIME: "faas.time",
      /**
      * A string containing the schedule period as [Cron Expression](https://docs.oracle.com/cd/E12058_01/doc/doc.1014/e12030/cron_expressions.htm).
      */
      FAAS_CRON: "faas.cron",
      /**
      * A boolean that is true if the serverless function is executed for the first time (aka cold-start).
      */
      FAAS_COLDSTART: "faas.coldstart",
      /**
      * The name of the invoked function.
      *
      * Note: SHOULD be equal to the `faas.name` resource attribute of the invoked function.
      */
      FAAS_INVOKED_NAME: "faas.invoked_name",
      /**
      * The cloud provider of the invoked function.
      *
      * Note: SHOULD be equal to the `cloud.provider` resource attribute of the invoked function.
      */
      FAAS_INVOKED_PROVIDER: "faas.invoked_provider",
      /**
      * The cloud region of the invoked function.
      *
      * Note: SHOULD be equal to the `cloud.region` resource attribute of the invoked function.
      */
      FAAS_INVOKED_REGION: "faas.invoked_region",
      /**
      * Transport protocol used. See note below.
      */
      NET_TRANSPORT: "net.transport",
      /**
      * Remote address of the peer (dotted decimal for IPv4 or [RFC5952](https://tools.ietf.org/html/rfc5952) for IPv6).
      */
      NET_PEER_IP: "net.peer.ip",
      /**
      * Remote port number.
      */
      NET_PEER_PORT: "net.peer.port",
      /**
      * Remote hostname or similar, see note below.
      */
      NET_PEER_NAME: "net.peer.name",
      /**
      * Like `net.peer.ip` but for the host IP. Useful in case of a multi-IP host.
      */
      NET_HOST_IP: "net.host.ip",
      /**
      * Like `net.peer.port` but for the host port.
      */
      NET_HOST_PORT: "net.host.port",
      /**
      * Local hostname or similar, see note below.
      */
      NET_HOST_NAME: "net.host.name",
      /**
      * The internet connection type currently being used by the host.
      */
      NET_HOST_CONNECTION_TYPE: "net.host.connection.type",
      /**
      * This describes more details regarding the connection.type. It may be the type of cell technology connection, but it could be used for describing details about a wifi connection.
      */
      NET_HOST_CONNECTION_SUBTYPE: "net.host.connection.subtype",
      /**
      * The name of the mobile carrier.
      */
      NET_HOST_CARRIER_NAME: "net.host.carrier.name",
      /**
      * The mobile carrier country code.
      */
      NET_HOST_CARRIER_MCC: "net.host.carrier.mcc",
      /**
      * The mobile carrier network code.
      */
      NET_HOST_CARRIER_MNC: "net.host.carrier.mnc",
      /**
      * The ISO 3166-1 alpha-2 2-character country code associated with the mobile carrier network.
      */
      NET_HOST_CARRIER_ICC: "net.host.carrier.icc",
      /**
      * The [`service.name`](../../resource/semantic_conventions/README.md#service) of the remote service. SHOULD be equal to the actual `service.name` resource attribute of the remote service if any.
      */
      PEER_SERVICE: "peer.service",
      /**
      * Username or client_id extracted from the access token or [Authorization](https://tools.ietf.org/html/rfc7235#section-4.2) header in the inbound request from outside the system.
      */
      ENDUSER_ID: "enduser.id",
      /**
      * Actual/assumed role the client is making the request under extracted from token or application security context.
      */
      ENDUSER_ROLE: "enduser.role",
      /**
      * Scopes or granted authorities the client currently possesses extracted from token or application security context. The value would come from the scope associated with an [OAuth 2.0 Access Token](https://tools.ietf.org/html/rfc6749#section-3.3) or an attribute value in a [SAML 2.0 Assertion](http://docs.oasis-open.org/security/saml/Post2.0/sstc-saml-tech-overview-2.0.html).
      */
      ENDUSER_SCOPE: "enduser.scope",
      /**
      * Current &#34;managed&#34; thread ID (as opposed to OS thread ID).
      */
      THREAD_ID: "thread.id",
      /**
      * Current thread name.
      */
      THREAD_NAME: "thread.name",
      /**
      * The method or function name, or equivalent (usually rightmost part of the code unit&#39;s name).
      */
      CODE_FUNCTION: "code.function",
      /**
      * The &#34;namespace&#34; within which `code.function` is defined. Usually the qualified class or module name, such that `code.namespace` + some separator + `code.function` form a unique identifier for the code unit.
      */
      CODE_NAMESPACE: "code.namespace",
      /**
      * The source code file name that identifies the code unit as uniquely as possible (preferably an absolute file path).
      */
      CODE_FILEPATH: "code.filepath",
      /**
      * The line number in `code.filepath` best representing the operation. It SHOULD point within the code unit named in `code.function`.
      */
      CODE_LINENO: "code.lineno",
      /**
      * HTTP request method.
      */
      HTTP_METHOD: "http.method",
      /**
      * Full HTTP request URL in the form `scheme://host[:port]/path?query[#fragment]`. Usually the fragment is not transmitted over HTTP, but if it is known, it should be included nevertheless.
      *
      * Note: `http.url` MUST NOT contain credentials passed via URL in form of `https://username:password@www.example.com/`. In such case the attribute&#39;s value should be `https://www.example.com/`.
      */
      HTTP_URL: "http.url",
      /**
      * The full request target as passed in a HTTP request line or equivalent.
      */
      HTTP_TARGET: "http.target",
      /**
      * The value of the [HTTP host header](https://tools.ietf.org/html/rfc7230#section-5.4). An empty Host header should also be reported, see note.
      *
      * Note: When the header is present but empty the attribute SHOULD be set to the empty string. Note that this is a valid situation that is expected in certain cases, according the aforementioned [section of RFC 7230](https://tools.ietf.org/html/rfc7230#section-5.4). When the header is not set the attribute MUST NOT be set.
      */
      HTTP_HOST: "http.host",
      /**
      * The URI scheme identifying the used protocol.
      */
      HTTP_SCHEME: "http.scheme",
      /**
      * [HTTP response status code](https://tools.ietf.org/html/rfc7231#section-6).
      */
      HTTP_STATUS_CODE: "http.status_code",
      /**
      * Kind of HTTP protocol used.
      *
      * Note: If `net.transport` is not specified, it can be assumed to be `IP.TCP` except if `http.flavor` is `QUIC`, in which case `IP.UDP` is assumed.
      */
      HTTP_FLAVOR: "http.flavor",
      /**
      * Value of the [HTTP User-Agent](https://tools.ietf.org/html/rfc7231#section-5.5.3) header sent by the client.
      */
      HTTP_USER_AGENT: "http.user_agent",
      /**
      * The size of the request payload body in bytes. This is the number of bytes transferred excluding headers and is often, but not always, present as the [Content-Length](https://tools.ietf.org/html/rfc7230#section-3.3.2) header. For requests using transport encoding, this should be the compressed size.
      */
      HTTP_REQUEST_CONTENT_LENGTH: "http.request_content_length",
      /**
      * The size of the uncompressed request payload body after transport decoding. Not set if transport encoding not used.
      */
      HTTP_REQUEST_CONTENT_LENGTH_UNCOMPRESSED: "http.request_content_length_uncompressed",
      /**
      * The size of the response payload body in bytes. This is the number of bytes transferred excluding headers and is often, but not always, present as the [Content-Length](https://tools.ietf.org/html/rfc7230#section-3.3.2) header. For requests using transport encoding, this should be the compressed size.
      */
      HTTP_RESPONSE_CONTENT_LENGTH: "http.response_content_length",
      /**
      * The size of the uncompressed response payload body after transport decoding. Not set if transport encoding not used.
      */
      HTTP_RESPONSE_CONTENT_LENGTH_UNCOMPRESSED: "http.response_content_length_uncompressed",
      /**
      * The primary server name of the matched virtual host. This should be obtained via configuration. If no such configuration can be obtained, this attribute MUST NOT be set ( `net.host.name` should be used instead).
      *
      * Note: `http.url` is usually not readily available on the server side but would have to be assembled in a cumbersome and sometimes lossy process from other information (see e.g. open-telemetry/opentelemetry-python/pull/148). It is thus preferred to supply the raw data that is available.
      */
      HTTP_SERVER_NAME: "http.server_name",
      /**
      * The matched route (path template).
      */
      HTTP_ROUTE: "http.route",
      /**
        * The IP address of the original client behind all proxies, if known (e.g. from [X-Forwarded-For](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Forwarded-For)).
        *
        * Note: This is not necessarily the same as `net.peer.ip`, which would
      identify the network-level peer, which may be a proxy.
      
      This attribute should be set when a source of information different
      from the one used for `net.peer.ip`, is available even if that other
      source just confirms the same value as `net.peer.ip`.
      Rationale: For `net.peer.ip`, one typically does not know if it
      comes from a proxy, reverse proxy, or the actual client. Setting
      `http.client_ip` when it&#39;s the same as `net.peer.ip` means that
      one is at least somewhat confident that the address is not that of
      the closest proxy.
        */
      HTTP_CLIENT_IP: "http.client_ip",
      /**
      * The keys in the `RequestItems` object field.
      */
      AWS_DYNAMODB_TABLE_NAMES: "aws.dynamodb.table_names",
      /**
      * The JSON-serialized value of each item in the `ConsumedCapacity` response field.
      */
      AWS_DYNAMODB_CONSUMED_CAPACITY: "aws.dynamodb.consumed_capacity",
      /**
      * The JSON-serialized value of the `ItemCollectionMetrics` response field.
      */
      AWS_DYNAMODB_ITEM_COLLECTION_METRICS: "aws.dynamodb.item_collection_metrics",
      /**
      * The value of the `ProvisionedThroughput.ReadCapacityUnits` request parameter.
      */
      AWS_DYNAMODB_PROVISIONED_READ_CAPACITY: "aws.dynamodb.provisioned_read_capacity",
      /**
      * The value of the `ProvisionedThroughput.WriteCapacityUnits` request parameter.
      */
      AWS_DYNAMODB_PROVISIONED_WRITE_CAPACITY: "aws.dynamodb.provisioned_write_capacity",
      /**
      * The value of the `ConsistentRead` request parameter.
      */
      AWS_DYNAMODB_CONSISTENT_READ: "aws.dynamodb.consistent_read",
      /**
      * The value of the `ProjectionExpression` request parameter.
      */
      AWS_DYNAMODB_PROJECTION: "aws.dynamodb.projection",
      /**
      * The value of the `Limit` request parameter.
      */
      AWS_DYNAMODB_LIMIT: "aws.dynamodb.limit",
      /**
      * The value of the `AttributesToGet` request parameter.
      */
      AWS_DYNAMODB_ATTRIBUTES_TO_GET: "aws.dynamodb.attributes_to_get",
      /**
      * The value of the `IndexName` request parameter.
      */
      AWS_DYNAMODB_INDEX_NAME: "aws.dynamodb.index_name",
      /**
      * The value of the `Select` request parameter.
      */
      AWS_DYNAMODB_SELECT: "aws.dynamodb.select",
      /**
      * The JSON-serialized value of each item of the `GlobalSecondaryIndexes` request field.
      */
      AWS_DYNAMODB_GLOBAL_SECONDARY_INDEXES: "aws.dynamodb.global_secondary_indexes",
      /**
      * The JSON-serialized value of each item of the `LocalSecondaryIndexes` request field.
      */
      AWS_DYNAMODB_LOCAL_SECONDARY_INDEXES: "aws.dynamodb.local_secondary_indexes",
      /**
      * The value of the `ExclusiveStartTableName` request parameter.
      */
      AWS_DYNAMODB_EXCLUSIVE_START_TABLE: "aws.dynamodb.exclusive_start_table",
      /**
      * The the number of items in the `TableNames` response parameter.
      */
      AWS_DYNAMODB_TABLE_COUNT: "aws.dynamodb.table_count",
      /**
      * The value of the `ScanIndexForward` request parameter.
      */
      AWS_DYNAMODB_SCAN_FORWARD: "aws.dynamodb.scan_forward",
      /**
      * The value of the `Segment` request parameter.
      */
      AWS_DYNAMODB_SEGMENT: "aws.dynamodb.segment",
      /**
      * The value of the `TotalSegments` request parameter.
      */
      AWS_DYNAMODB_TOTAL_SEGMENTS: "aws.dynamodb.total_segments",
      /**
      * The value of the `Count` response parameter.
      */
      AWS_DYNAMODB_COUNT: "aws.dynamodb.count",
      /**
      * The value of the `ScannedCount` response parameter.
      */
      AWS_DYNAMODB_SCANNED_COUNT: "aws.dynamodb.scanned_count",
      /**
      * The JSON-serialized value of each item in the `AttributeDefinitions` request field.
      */
      AWS_DYNAMODB_ATTRIBUTE_DEFINITIONS: "aws.dynamodb.attribute_definitions",
      /**
      * The JSON-serialized value of each item in the the `GlobalSecondaryIndexUpdates` request field.
      */
      AWS_DYNAMODB_GLOBAL_SECONDARY_INDEX_UPDATES: "aws.dynamodb.global_secondary_index_updates",
      /**
      * A string identifying the messaging system.
      */
      MESSAGING_SYSTEM: "messaging.system",
      /**
      * The message destination name. This might be equal to the span name but is required nevertheless.
      */
      MESSAGING_DESTINATION: "messaging.destination",
      /**
      * The kind of message destination.
      */
      MESSAGING_DESTINATION_KIND: "messaging.destination_kind",
      /**
      * A boolean that is true if the message destination is temporary.
      */
      MESSAGING_TEMP_DESTINATION: "messaging.temp_destination",
      /**
      * The name of the transport protocol.
      */
      MESSAGING_PROTOCOL: "messaging.protocol",
      /**
      * The version of the transport protocol.
      */
      MESSAGING_PROTOCOL_VERSION: "messaging.protocol_version",
      /**
      * Connection string.
      */
      MESSAGING_URL: "messaging.url",
      /**
      * A value used by the messaging system as an identifier for the message, represented as a string.
      */
      MESSAGING_MESSAGE_ID: "messaging.message_id",
      /**
      * The [conversation ID](#conversations) identifying the conversation to which the message belongs, represented as a string. Sometimes called &#34;Correlation ID&#34;.
      */
      MESSAGING_CONVERSATION_ID: "messaging.conversation_id",
      /**
      * The (uncompressed) size of the message payload in bytes. Also use this attribute if it is unknown whether the compressed or uncompressed payload size is reported.
      */
      MESSAGING_MESSAGE_PAYLOAD_SIZE_BYTES: "messaging.message_payload_size_bytes",
      /**
      * The compressed size of the message payload in bytes.
      */
      MESSAGING_MESSAGE_PAYLOAD_COMPRESSED_SIZE_BYTES: "messaging.message_payload_compressed_size_bytes",
      /**
      * A string identifying the kind of message consumption as defined in the [Operation names](#operation-names) section above. If the operation is &#34;send&#34;, this attribute MUST NOT be set, since the operation can be inferred from the span kind in that case.
      */
      MESSAGING_OPERATION: "messaging.operation",
      /**
      * The identifier for the consumer receiving a message. For Kafka, set it to `{messaging.kafka.consumer_group} - {messaging.kafka.client_id}`, if both are present, or only `messaging.kafka.consumer_group`. For brokers, such as RabbitMQ and Artemis, set it to the `client_id` of the client consuming the message.
      */
      MESSAGING_CONSUMER_ID: "messaging.consumer_id",
      /**
      * RabbitMQ message routing key.
      */
      MESSAGING_RABBITMQ_ROUTING_KEY: "messaging.rabbitmq.routing_key",
      /**
      * Message keys in Kafka are used for grouping alike messages to ensure they&#39;re processed on the same partition. They differ from `messaging.message_id` in that they&#39;re not unique. If the key is `null`, the attribute MUST NOT be set.
      *
      * Note: If the key type is not string, it&#39;s string representation has to be supplied for the attribute. If the key has no unambiguous, canonical string form, don&#39;t include its value.
      */
      MESSAGING_KAFKA_MESSAGE_KEY: "messaging.kafka.message_key",
      /**
      * Name of the Kafka Consumer Group that is handling the message. Only applies to consumers, not producers.
      */
      MESSAGING_KAFKA_CONSUMER_GROUP: "messaging.kafka.consumer_group",
      /**
      * Client Id for the Consumer or Producer that is handling the message.
      */
      MESSAGING_KAFKA_CLIENT_ID: "messaging.kafka.client_id",
      /**
      * Partition the message is sent to.
      */
      MESSAGING_KAFKA_PARTITION: "messaging.kafka.partition",
      /**
      * A boolean that is true if the message is a tombstone.
      */
      MESSAGING_KAFKA_TOMBSTONE: "messaging.kafka.tombstone",
      /**
      * A string identifying the remoting system.
      */
      RPC_SYSTEM: "rpc.system",
      /**
      * The full (logical) name of the service being called, including its package name, if applicable.
      *
      * Note: This is the logical name of the service from the RPC interface perspective, which can be different from the name of any implementing class. The `code.namespace` attribute may be used to store the latter (despite the attribute name, it may include a class name; e.g., class with method actually executing the call on the server side, RPC client stub class on the client side).
      */
      RPC_SERVICE: "rpc.service",
      /**
      * The name of the (logical) method being called, must be equal to the $method part in the span name.
      *
      * Note: This is the logical name of the method from the RPC interface perspective, which can be different from the name of any implementing method/function. The `code.function` attribute may be used to store the latter (e.g., method actually executing the call on the server side, RPC client stub method on the client side).
      */
      RPC_METHOD: "rpc.method",
      /**
      * The [numeric status code](https://github.com/grpc/grpc/blob/v1.33.2/doc/statuscodes.md) of the gRPC request.
      */
      RPC_GRPC_STATUS_CODE: "rpc.grpc.status_code",
      /**
      * Protocol version as in `jsonrpc` property of request/response. Since JSON-RPC 1.0 does not specify this, the value can be omitted.
      */
      RPC_JSONRPC_VERSION: "rpc.jsonrpc.version",
      /**
      * `id` property of request or response. Since protocol allows id to be int, string, `null` or missing (for notifications), value is expected to be cast to string for simplicity. Use empty string in case of `null` value. Omit entirely if this is a notification.
      */
      RPC_JSONRPC_REQUEST_ID: "rpc.jsonrpc.request_id",
      /**
      * `error.code` property of response if it is an error response.
      */
      RPC_JSONRPC_ERROR_CODE: "rpc.jsonrpc.error_code",
      /**
      * `error.message` property of response if it is an error response.
      */
      RPC_JSONRPC_ERROR_MESSAGE: "rpc.jsonrpc.error_message",
      /**
      * Whether this is a received or sent message.
      */
      MESSAGE_TYPE: "message.type",
      /**
      * MUST be calculated as two different counters starting from `1` one for sent messages and one for received message.
      *
      * Note: This way we guarantee that the values will be consistent between different implementations.
      */
      MESSAGE_ID: "message.id",
      /**
      * Compressed size of the message in bytes.
      */
      MESSAGE_COMPRESSED_SIZE: "message.compressed_size",
      /**
      * Uncompressed size of the message in bytes.
      */
      MESSAGE_UNCOMPRESSED_SIZE: "message.uncompressed_size"
    };
    exports.DbSystemValues = {
      /** Some other SQL database. Fallback only. See notes. */
      OTHER_SQL: "other_sql",
      /** Microsoft SQL Server. */
      MSSQL: "mssql",
      /** MySQL. */
      MYSQL: "mysql",
      /** Oracle Database. */
      ORACLE: "oracle",
      /** IBM Db2. */
      DB2: "db2",
      /** PostgreSQL. */
      POSTGRESQL: "postgresql",
      /** Amazon Redshift. */
      REDSHIFT: "redshift",
      /** Apache Hive. */
      HIVE: "hive",
      /** Cloudscape. */
      CLOUDSCAPE: "cloudscape",
      /** HyperSQL DataBase. */
      HSQLDB: "hsqldb",
      /** Progress Database. */
      PROGRESS: "progress",
      /** SAP MaxDB. */
      MAXDB: "maxdb",
      /** SAP HANA. */
      HANADB: "hanadb",
      /** Ingres. */
      INGRES: "ingres",
      /** FirstSQL. */
      FIRSTSQL: "firstsql",
      /** EnterpriseDB. */
      EDB: "edb",
      /** InterSystems Caché. */
      CACHE: "cache",
      /** Adabas (Adaptable Database System). */
      ADABAS: "adabas",
      /** Firebird. */
      FIREBIRD: "firebird",
      /** Apache Derby. */
      DERBY: "derby",
      /** FileMaker. */
      FILEMAKER: "filemaker",
      /** Informix. */
      INFORMIX: "informix",
      /** InstantDB. */
      INSTANTDB: "instantdb",
      /** InterBase. */
      INTERBASE: "interbase",
      /** MariaDB. */
      MARIADB: "mariadb",
      /** Netezza. */
      NETEZZA: "netezza",
      /** Pervasive PSQL. */
      PERVASIVE: "pervasive",
      /** PointBase. */
      POINTBASE: "pointbase",
      /** SQLite. */
      SQLITE: "sqlite",
      /** Sybase. */
      SYBASE: "sybase",
      /** Teradata. */
      TERADATA: "teradata",
      /** Vertica. */
      VERTICA: "vertica",
      /** H2. */
      H2: "h2",
      /** ColdFusion IMQ. */
      COLDFUSION: "coldfusion",
      /** Apache Cassandra. */
      CASSANDRA: "cassandra",
      /** Apache HBase. */
      HBASE: "hbase",
      /** MongoDB. */
      MONGODB: "mongodb",
      /** Redis. */
      REDIS: "redis",
      /** Couchbase. */
      COUCHBASE: "couchbase",
      /** CouchDB. */
      COUCHDB: "couchdb",
      /** Microsoft Azure Cosmos DB. */
      COSMOSDB: "cosmosdb",
      /** Amazon DynamoDB. */
      DYNAMODB: "dynamodb",
      /** Neo4j. */
      NEO4J: "neo4j",
      /** Apache Geode. */
      GEODE: "geode",
      /** Elasticsearch. */
      ELASTICSEARCH: "elasticsearch",
      /** Memcached. */
      MEMCACHED: "memcached",
      /** CockroachDB. */
      COCKROACHDB: "cockroachdb"
    };
    exports.DbCassandraConsistencyLevelValues = {
      /** all. */
      ALL: "all",
      /** each_quorum. */
      EACH_QUORUM: "each_quorum",
      /** quorum. */
      QUORUM: "quorum",
      /** local_quorum. */
      LOCAL_QUORUM: "local_quorum",
      /** one. */
      ONE: "one",
      /** two. */
      TWO: "two",
      /** three. */
      THREE: "three",
      /** local_one. */
      LOCAL_ONE: "local_one",
      /** any. */
      ANY: "any",
      /** serial. */
      SERIAL: "serial",
      /** local_serial. */
      LOCAL_SERIAL: "local_serial"
    };
    exports.FaasTriggerValues = {
      /** A response to some data source operation such as a database or filesystem read/write. */
      DATASOURCE: "datasource",
      /** To provide an answer to an inbound HTTP request. */
      HTTP: "http",
      /** A function is set to be executed when messages are sent to a messaging system. */
      PUBSUB: "pubsub",
      /** A function is scheduled to be executed regularly. */
      TIMER: "timer",
      /** If none of the others apply. */
      OTHER: "other"
    };
    exports.FaasDocumentOperationValues = {
      /** When a new object is created. */
      INSERT: "insert",
      /** When an object is modified. */
      EDIT: "edit",
      /** When an object is deleted. */
      DELETE: "delete"
    };
    exports.FaasInvokedProviderValues = {
      /** Alibaba Cloud. */
      ALIBABA_CLOUD: "alibaba_cloud",
      /** Amazon Web Services. */
      AWS: "aws",
      /** Microsoft Azure. */
      AZURE: "azure",
      /** Google Cloud Platform. */
      GCP: "gcp"
    };
    exports.NetTransportValues = {
      /** ip_tcp. */
      IP_TCP: "ip_tcp",
      /** ip_udp. */
      IP_UDP: "ip_udp",
      /** Another IP-based protocol. */
      IP: "ip",
      /** Unix Domain socket. See below. */
      UNIX: "unix",
      /** Named or anonymous pipe. See note below. */
      PIPE: "pipe",
      /** In-process communication. */
      INPROC: "inproc",
      /** Something else (non IP-based). */
      OTHER: "other"
    };
    exports.NetHostConnectionTypeValues = {
      /** wifi. */
      WIFI: "wifi",
      /** wired. */
      WIRED: "wired",
      /** cell. */
      CELL: "cell",
      /** unavailable. */
      UNAVAILABLE: "unavailable",
      /** unknown. */
      UNKNOWN: "unknown"
    };
    exports.NetHostConnectionSubtypeValues = {
      /** GPRS. */
      GPRS: "gprs",
      /** EDGE. */
      EDGE: "edge",
      /** UMTS. */
      UMTS: "umts",
      /** CDMA. */
      CDMA: "cdma",
      /** EVDO Rel. 0. */
      EVDO_0: "evdo_0",
      /** EVDO Rev. A. */
      EVDO_A: "evdo_a",
      /** CDMA2000 1XRTT. */
      CDMA2000_1XRTT: "cdma2000_1xrtt",
      /** HSDPA. */
      HSDPA: "hsdpa",
      /** HSUPA. */
      HSUPA: "hsupa",
      /** HSPA. */
      HSPA: "hspa",
      /** IDEN. */
      IDEN: "iden",
      /** EVDO Rev. B. */
      EVDO_B: "evdo_b",
      /** LTE. */
      LTE: "lte",
      /** EHRPD. */
      EHRPD: "ehrpd",
      /** HSPAP. */
      HSPAP: "hspap",
      /** GSM. */
      GSM: "gsm",
      /** TD-SCDMA. */
      TD_SCDMA: "td_scdma",
      /** IWLAN. */
      IWLAN: "iwlan",
      /** 5G NR (New Radio). */
      NR: "nr",
      /** 5G NRNSA (New Radio Non-Standalone). */
      NRNSA: "nrnsa",
      /** LTE CA. */
      LTE_CA: "lte_ca"
    };
    exports.HttpFlavorValues = {
      /** HTTP 1.0. */
      HTTP_1_0: "1.0",
      /** HTTP 1.1. */
      HTTP_1_1: "1.1",
      /** HTTP 2. */
      HTTP_2_0: "2.0",
      /** SPDY protocol. */
      SPDY: "SPDY",
      /** QUIC protocol. */
      QUIC: "QUIC"
    };
    exports.MessagingDestinationKindValues = {
      /** A message sent to a queue. */
      QUEUE: "queue",
      /** A message sent to a topic. */
      TOPIC: "topic"
    };
    exports.MessagingOperationValues = {
      /** receive. */
      RECEIVE: "receive",
      /** process. */
      PROCESS: "process"
    };
    exports.RpcGrpcStatusCodeValues = {
      /** OK. */
      OK: 0,
      /** CANCELLED. */
      CANCELLED: 1,
      /** UNKNOWN. */
      UNKNOWN: 2,
      /** INVALID_ARGUMENT. */
      INVALID_ARGUMENT: 3,
      /** DEADLINE_EXCEEDED. */
      DEADLINE_EXCEEDED: 4,
      /** NOT_FOUND. */
      NOT_FOUND: 5,
      /** ALREADY_EXISTS. */
      ALREADY_EXISTS: 6,
      /** PERMISSION_DENIED. */
      PERMISSION_DENIED: 7,
      /** RESOURCE_EXHAUSTED. */
      RESOURCE_EXHAUSTED: 8,
      /** FAILED_PRECONDITION. */
      FAILED_PRECONDITION: 9,
      /** ABORTED. */
      ABORTED: 10,
      /** OUT_OF_RANGE. */
      OUT_OF_RANGE: 11,
      /** UNIMPLEMENTED. */
      UNIMPLEMENTED: 12,
      /** INTERNAL. */
      INTERNAL: 13,
      /** UNAVAILABLE. */
      UNAVAILABLE: 14,
      /** DATA_LOSS. */
      DATA_LOSS: 15,
      /** UNAUTHENTICATED. */
      UNAUTHENTICATED: 16
    };
    exports.MessageTypeValues = {
      /** sent. */
      SENT: "SENT",
      /** received. */
      RECEIVED: "RECEIVED"
    };
  }
});

// node_modules/@opentelemetry/semantic-conventions/build/src/trace/index.js
var require_trace2 = __commonJS({
  "node_modules/@opentelemetry/semantic-conventions/build/src/trace/index.js"(exports) {
    "use strict";
    var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      Object.defineProperty(o, k2, { enumerable: true, get: function() {
        return m[k];
      } });
    } : function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      o[k2] = m[k];
    });
    var __exportStar = exports && exports.__exportStar || function(m, exports2) {
      for (var p in m)
        if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports2, p))
          __createBinding(exports2, m, p);
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    __exportStar(require_SemanticAttributes(), exports);
  }
});

// node_modules/@opentelemetry/semantic-conventions/build/src/resource/SemanticResourceAttributes.js
var require_SemanticResourceAttributes = __commonJS({
  "node_modules/@opentelemetry/semantic-conventions/build/src/resource/SemanticResourceAttributes.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.TelemetrySdkLanguageValues = exports.OsTypeValues = exports.HostArchValues = exports.AwsEcsLaunchtypeValues = exports.CloudPlatformValues = exports.CloudProviderValues = exports.SemanticResourceAttributes = void 0;
    exports.SemanticResourceAttributes = {
      /**
      * Name of the cloud provider.
      */
      CLOUD_PROVIDER: "cloud.provider",
      /**
      * The cloud account ID the resource is assigned to.
      */
      CLOUD_ACCOUNT_ID: "cloud.account.id",
      /**
      * The geographical region the resource is running. Refer to your provider&#39;s docs to see the available regions, for example [Alibaba Cloud regions](https://www.alibabacloud.com/help/doc-detail/40654.htm), [AWS regions](https://aws.amazon.com/about-aws/global-infrastructure/regions_az/), [Azure regions](https://azure.microsoft.com/en-us/global-infrastructure/geographies/), or [Google Cloud regions](https://cloud.google.com/about/locations).
      */
      CLOUD_REGION: "cloud.region",
      /**
      * Cloud regions often have multiple, isolated locations known as zones to increase availability. Availability zone represents the zone where the resource is running.
      *
      * Note: Availability zones are called &#34;zones&#34; on Alibaba Cloud and Google Cloud.
      */
      CLOUD_AVAILABILITY_ZONE: "cloud.availability_zone",
      /**
      * The cloud platform in use.
      *
      * Note: The prefix of the service SHOULD match the one specified in `cloud.provider`.
      */
      CLOUD_PLATFORM: "cloud.platform",
      /**
      * The Amazon Resource Name (ARN) of an [ECS container instance](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/ECS_instances.html).
      */
      AWS_ECS_CONTAINER_ARN: "aws.ecs.container.arn",
      /**
      * The ARN of an [ECS cluster](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/clusters.html).
      */
      AWS_ECS_CLUSTER_ARN: "aws.ecs.cluster.arn",
      /**
      * The [launch type](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/launch_types.html) for an ECS task.
      */
      AWS_ECS_LAUNCHTYPE: "aws.ecs.launchtype",
      /**
      * The ARN of an [ECS task definition](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/task_definitions.html).
      */
      AWS_ECS_TASK_ARN: "aws.ecs.task.arn",
      /**
      * The task definition family this task definition is a member of.
      */
      AWS_ECS_TASK_FAMILY: "aws.ecs.task.family",
      /**
      * The revision for this task definition.
      */
      AWS_ECS_TASK_REVISION: "aws.ecs.task.revision",
      /**
      * The ARN of an EKS cluster.
      */
      AWS_EKS_CLUSTER_ARN: "aws.eks.cluster.arn",
      /**
      * The name(s) of the AWS log group(s) an application is writing to.
      *
      * Note: Multiple log groups must be supported for cases like multi-container applications, where a single application has sidecar containers, and each write to their own log group.
      */
      AWS_LOG_GROUP_NAMES: "aws.log.group.names",
      /**
      * The Amazon Resource Name(s) (ARN) of the AWS log group(s).
      *
      * Note: See the [log group ARN format documentation](https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/iam-access-control-overview-cwl.html#CWL_ARN_Format).
      */
      AWS_LOG_GROUP_ARNS: "aws.log.group.arns",
      /**
      * The name(s) of the AWS log stream(s) an application is writing to.
      */
      AWS_LOG_STREAM_NAMES: "aws.log.stream.names",
      /**
      * The ARN(s) of the AWS log stream(s).
      *
      * Note: See the [log stream ARN format documentation](https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/iam-access-control-overview-cwl.html#CWL_ARN_Format). One log group can contain several log streams, so these ARNs necessarily identify both a log group and a log stream.
      */
      AWS_LOG_STREAM_ARNS: "aws.log.stream.arns",
      /**
      * Container name.
      */
      CONTAINER_NAME: "container.name",
      /**
      * Container ID. Usually a UUID, as for example used to [identify Docker containers](https://docs.docker.com/engine/reference/run/#container-identification). The UUID might be abbreviated.
      */
      CONTAINER_ID: "container.id",
      /**
      * The container runtime managing this container.
      */
      CONTAINER_RUNTIME: "container.runtime",
      /**
      * Name of the image the container was built on.
      */
      CONTAINER_IMAGE_NAME: "container.image.name",
      /**
      * Container image tag.
      */
      CONTAINER_IMAGE_TAG: "container.image.tag",
      /**
      * Name of the [deployment environment](https://en.wikipedia.org/wiki/Deployment_environment) (aka deployment tier).
      */
      DEPLOYMENT_ENVIRONMENT: "deployment.environment",
      /**
      * A unique identifier representing the device.
      *
      * Note: The device identifier MUST only be defined using the values outlined below. This value is not an advertising identifier and MUST NOT be used as such. On iOS (Swift or Objective-C), this value MUST be equal to the [vendor identifier](https://developer.apple.com/documentation/uikit/uidevice/1620059-identifierforvendor). On Android (Java or Kotlin), this value MUST be equal to the Firebase Installation ID or a globally unique UUID which is persisted across sessions in your application. More information can be found [here](https://developer.android.com/training/articles/user-data-ids) on best practices and exact implementation details. Caution should be taken when storing personal data or anything which can identify a user. GDPR and data protection laws may apply, ensure you do your own due diligence.
      */
      DEVICE_ID: "device.id",
      /**
      * The model identifier for the device.
      *
      * Note: It&#39;s recommended this value represents a machine readable version of the model identifier rather than the market or consumer-friendly name of the device.
      */
      DEVICE_MODEL_IDENTIFIER: "device.model.identifier",
      /**
      * The marketing name for the device model.
      *
      * Note: It&#39;s recommended this value represents a human readable version of the device model rather than a machine readable alternative.
      */
      DEVICE_MODEL_NAME: "device.model.name",
      /**
      * The name of the single function that this runtime instance executes.
      *
      * Note: This is the name of the function as configured/deployed on the FaaS platform and is usually different from the name of the callback function (which may be stored in the [`code.namespace`/`code.function`](../../trace/semantic_conventions/span-general.md#source-code-attributes) span attributes).
      */
      FAAS_NAME: "faas.name",
      /**
        * The unique ID of the single function that this runtime instance executes.
        *
        * Note: Depending on the cloud provider, use:
      
      * **AWS Lambda:** The function [ARN](https://docs.aws.amazon.com/general/latest/gr/aws-arns-and-namespaces.html).
      Take care not to use the &#34;invoked ARN&#34; directly but replace any
      [alias suffix](https://docs.aws.amazon.com/lambda/latest/dg/configuration-aliases.html) with the resolved function version, as the same runtime instance may be invokable with multiple
      different aliases.
      * **GCP:** The [URI of the resource](https://cloud.google.com/iam/docs/full-resource-names)
      * **Azure:** The [Fully Qualified Resource ID](https://docs.microsoft.com/en-us/rest/api/resources/resources/get-by-id).
      
      On some providers, it may not be possible to determine the full ID at startup,
      which is why this field cannot be made required. For example, on AWS the account ID
      part of the ARN is not available without calling another AWS API
      which may be deemed too slow for a short-running lambda function.
      As an alternative, consider setting `faas.id` as a span attribute instead.
        */
      FAAS_ID: "faas.id",
      /**
        * The immutable version of the function being executed.
        *
        * Note: Depending on the cloud provider and platform, use:
      
      * **AWS Lambda:** The [function version](https://docs.aws.amazon.com/lambda/latest/dg/configuration-versions.html)
        (an integer represented as a decimal string).
      * **Google Cloud Run:** The [revision](https://cloud.google.com/run/docs/managing/revisions)
        (i.e., the function name plus the revision suffix).
      * **Google Cloud Functions:** The value of the
        [`K_REVISION` environment variable](https://cloud.google.com/functions/docs/env-var#runtime_environment_variables_set_automatically).
      * **Azure Functions:** Not applicable. Do not set this attribute.
        */
      FAAS_VERSION: "faas.version",
      /**
      * The execution environment ID as a string, that will be potentially reused for other invocations to the same function/function version.
      *
      * Note: * **AWS Lambda:** Use the (full) log stream name.
      */
      FAAS_INSTANCE: "faas.instance",
      /**
      * The amount of memory available to the serverless function in MiB.
      *
      * Note: It&#39;s recommended to set this attribute since e.g. too little memory can easily stop a Java AWS Lambda function from working correctly. On AWS Lambda, the environment variable `AWS_LAMBDA_FUNCTION_MEMORY_SIZE` provides this information.
      */
      FAAS_MAX_MEMORY: "faas.max_memory",
      /**
      * Unique host ID. For Cloud, this must be the instance_id assigned by the cloud provider.
      */
      HOST_ID: "host.id",
      /**
      * Name of the host. On Unix systems, it may contain what the hostname command returns, or the fully qualified hostname, or another name specified by the user.
      */
      HOST_NAME: "host.name",
      /**
      * Type of host. For Cloud, this must be the machine type.
      */
      HOST_TYPE: "host.type",
      /**
      * The CPU architecture the host system is running on.
      */
      HOST_ARCH: "host.arch",
      /**
      * Name of the VM image or OS install the host was instantiated from.
      */
      HOST_IMAGE_NAME: "host.image.name",
      /**
      * VM image ID. For Cloud, this value is from the provider.
      */
      HOST_IMAGE_ID: "host.image.id",
      /**
      * The version string of the VM image as defined in [Version SpanAttributes](README.md#version-attributes).
      */
      HOST_IMAGE_VERSION: "host.image.version",
      /**
      * The name of the cluster.
      */
      K8S_CLUSTER_NAME: "k8s.cluster.name",
      /**
      * The name of the Node.
      */
      K8S_NODE_NAME: "k8s.node.name",
      /**
      * The UID of the Node.
      */
      K8S_NODE_UID: "k8s.node.uid",
      /**
      * The name of the namespace that the pod is running in.
      */
      K8S_NAMESPACE_NAME: "k8s.namespace.name",
      /**
      * The UID of the Pod.
      */
      K8S_POD_UID: "k8s.pod.uid",
      /**
      * The name of the Pod.
      */
      K8S_POD_NAME: "k8s.pod.name",
      /**
      * The name of the Container in a Pod template.
      */
      K8S_CONTAINER_NAME: "k8s.container.name",
      /**
      * The UID of the ReplicaSet.
      */
      K8S_REPLICASET_UID: "k8s.replicaset.uid",
      /**
      * The name of the ReplicaSet.
      */
      K8S_REPLICASET_NAME: "k8s.replicaset.name",
      /**
      * The UID of the Deployment.
      */
      K8S_DEPLOYMENT_UID: "k8s.deployment.uid",
      /**
      * The name of the Deployment.
      */
      K8S_DEPLOYMENT_NAME: "k8s.deployment.name",
      /**
      * The UID of the StatefulSet.
      */
      K8S_STATEFULSET_UID: "k8s.statefulset.uid",
      /**
      * The name of the StatefulSet.
      */
      K8S_STATEFULSET_NAME: "k8s.statefulset.name",
      /**
      * The UID of the DaemonSet.
      */
      K8S_DAEMONSET_UID: "k8s.daemonset.uid",
      /**
      * The name of the DaemonSet.
      */
      K8S_DAEMONSET_NAME: "k8s.daemonset.name",
      /**
      * The UID of the Job.
      */
      K8S_JOB_UID: "k8s.job.uid",
      /**
      * The name of the Job.
      */
      K8S_JOB_NAME: "k8s.job.name",
      /**
      * The UID of the CronJob.
      */
      K8S_CRONJOB_UID: "k8s.cronjob.uid",
      /**
      * The name of the CronJob.
      */
      K8S_CRONJOB_NAME: "k8s.cronjob.name",
      /**
      * The operating system type.
      */
      OS_TYPE: "os.type",
      /**
      * Human readable (not intended to be parsed) OS version information, like e.g. reported by `ver` or `lsb_release -a` commands.
      */
      OS_DESCRIPTION: "os.description",
      /**
      * Human readable operating system name.
      */
      OS_NAME: "os.name",
      /**
      * The version string of the operating system as defined in [Version SpanAttributes](../../resource/semantic_conventions/README.md#version-attributes).
      */
      OS_VERSION: "os.version",
      /**
      * Process identifier (PID).
      */
      PROCESS_PID: "process.pid",
      /**
      * The name of the process executable. On Linux based systems, can be set to the `Name` in `proc/[pid]/status`. On Windows, can be set to the base name of `GetProcessImageFileNameW`.
      */
      PROCESS_EXECUTABLE_NAME: "process.executable.name",
      /**
      * The full path to the process executable. On Linux based systems, can be set to the target of `proc/[pid]/exe`. On Windows, can be set to the result of `GetProcessImageFileNameW`.
      */
      PROCESS_EXECUTABLE_PATH: "process.executable.path",
      /**
      * The command used to launch the process (i.e. the command name). On Linux based systems, can be set to the zeroth string in `proc/[pid]/cmdline`. On Windows, can be set to the first parameter extracted from `GetCommandLineW`.
      */
      PROCESS_COMMAND: "process.command",
      /**
      * The full command used to launch the process as a single string representing the full command. On Windows, can be set to the result of `GetCommandLineW`. Do not set this if you have to assemble it just for monitoring; use `process.command_args` instead.
      */
      PROCESS_COMMAND_LINE: "process.command_line",
      /**
      * All the command arguments (including the command/executable itself) as received by the process. On Linux-based systems (and some other Unixoid systems supporting procfs), can be set according to the list of null-delimited strings extracted from `proc/[pid]/cmdline`. For libc-based executables, this would be the full argv vector passed to `main`.
      */
      PROCESS_COMMAND_ARGS: "process.command_args",
      /**
      * The username of the user that owns the process.
      */
      PROCESS_OWNER: "process.owner",
      /**
      * The name of the runtime of this process. For compiled native binaries, this SHOULD be the name of the compiler.
      */
      PROCESS_RUNTIME_NAME: "process.runtime.name",
      /**
      * The version of the runtime of this process, as returned by the runtime without modification.
      */
      PROCESS_RUNTIME_VERSION: "process.runtime.version",
      /**
      * An additional description about the runtime of the process, for example a specific vendor customization of the runtime environment.
      */
      PROCESS_RUNTIME_DESCRIPTION: "process.runtime.description",
      /**
      * Logical name of the service.
      *
      * Note: MUST be the same for all instances of horizontally scaled services. If the value was not specified, SDKs MUST fallback to `unknown_service:` concatenated with [`process.executable.name`](process.md#process), e.g. `unknown_service:bash`. If `process.executable.name` is not available, the value MUST be set to `unknown_service`.
      */
      SERVICE_NAME: "service.name",
      /**
      * A namespace for `service.name`.
      *
      * Note: A string value having a meaning that helps to distinguish a group of services, for example the team name that owns a group of services. `service.name` is expected to be unique within the same namespace. If `service.namespace` is not specified in the Resource then `service.name` is expected to be unique for all services that have no explicit namespace defined (so the empty/unspecified namespace is simply one more valid namespace). Zero-length namespace string is assumed equal to unspecified namespace.
      */
      SERVICE_NAMESPACE: "service.namespace",
      /**
      * The string ID of the service instance.
      *
      * Note: MUST be unique for each instance of the same `service.namespace,service.name` pair (in other words `service.namespace,service.name,service.instance.id` triplet MUST be globally unique). The ID helps to distinguish instances of the same service that exist at the same time (e.g. instances of a horizontally scaled service). It is preferable for the ID to be persistent and stay the same for the lifetime of the service instance, however it is acceptable that the ID is ephemeral and changes during important lifetime events for the service (e.g. service restarts). If the service has no inherent unique ID that can be used as the value of this attribute it is recommended to generate a random Version 1 or Version 4 RFC 4122 UUID (services aiming for reproducible UUIDs may also use Version 5, see RFC 4122 for more recommendations).
      */
      SERVICE_INSTANCE_ID: "service.instance.id",
      /**
      * The version string of the service API or implementation.
      */
      SERVICE_VERSION: "service.version",
      /**
      * The name of the telemetry SDK as defined above.
      */
      TELEMETRY_SDK_NAME: "telemetry.sdk.name",
      /**
      * The language of the telemetry SDK.
      */
      TELEMETRY_SDK_LANGUAGE: "telemetry.sdk.language",
      /**
      * The version string of the telemetry SDK.
      */
      TELEMETRY_SDK_VERSION: "telemetry.sdk.version",
      /**
      * The version string of the auto instrumentation agent, if used.
      */
      TELEMETRY_AUTO_VERSION: "telemetry.auto.version",
      /**
      * The name of the web engine.
      */
      WEBENGINE_NAME: "webengine.name",
      /**
      * The version of the web engine.
      */
      WEBENGINE_VERSION: "webengine.version",
      /**
      * Additional description of the web engine (e.g. detailed version and edition information).
      */
      WEBENGINE_DESCRIPTION: "webengine.description"
    };
    exports.CloudProviderValues = {
      /** Alibaba Cloud. */
      ALIBABA_CLOUD: "alibaba_cloud",
      /** Amazon Web Services. */
      AWS: "aws",
      /** Microsoft Azure. */
      AZURE: "azure",
      /** Google Cloud Platform. */
      GCP: "gcp"
    };
    exports.CloudPlatformValues = {
      /** Alibaba Cloud Elastic Compute Service. */
      ALIBABA_CLOUD_ECS: "alibaba_cloud_ecs",
      /** Alibaba Cloud Function Compute. */
      ALIBABA_CLOUD_FC: "alibaba_cloud_fc",
      /** AWS Elastic Compute Cloud. */
      AWS_EC2: "aws_ec2",
      /** AWS Elastic Container Service. */
      AWS_ECS: "aws_ecs",
      /** AWS Elastic Kubernetes Service. */
      AWS_EKS: "aws_eks",
      /** AWS Lambda. */
      AWS_LAMBDA: "aws_lambda",
      /** AWS Elastic Beanstalk. */
      AWS_ELASTIC_BEANSTALK: "aws_elastic_beanstalk",
      /** Azure Virtual Machines. */
      AZURE_VM: "azure_vm",
      /** Azure Container Instances. */
      AZURE_CONTAINER_INSTANCES: "azure_container_instances",
      /** Azure Kubernetes Service. */
      AZURE_AKS: "azure_aks",
      /** Azure Functions. */
      AZURE_FUNCTIONS: "azure_functions",
      /** Azure App Service. */
      AZURE_APP_SERVICE: "azure_app_service",
      /** Google Cloud Compute Engine (GCE). */
      GCP_COMPUTE_ENGINE: "gcp_compute_engine",
      /** Google Cloud Run. */
      GCP_CLOUD_RUN: "gcp_cloud_run",
      /** Google Cloud Kubernetes Engine (GKE). */
      GCP_KUBERNETES_ENGINE: "gcp_kubernetes_engine",
      /** Google Cloud Functions (GCF). */
      GCP_CLOUD_FUNCTIONS: "gcp_cloud_functions",
      /** Google Cloud App Engine (GAE). */
      GCP_APP_ENGINE: "gcp_app_engine"
    };
    exports.AwsEcsLaunchtypeValues = {
      /** ec2. */
      EC2: "ec2",
      /** fargate. */
      FARGATE: "fargate"
    };
    exports.HostArchValues = {
      /** AMD64. */
      AMD64: "amd64",
      /** ARM32. */
      ARM32: "arm32",
      /** ARM64. */
      ARM64: "arm64",
      /** Itanium. */
      IA64: "ia64",
      /** 32-bit PowerPC. */
      PPC32: "ppc32",
      /** 64-bit PowerPC. */
      PPC64: "ppc64",
      /** 32-bit x86. */
      X86: "x86"
    };
    exports.OsTypeValues = {
      /** Microsoft Windows. */
      WINDOWS: "windows",
      /** Linux. */
      LINUX: "linux",
      /** Apple Darwin. */
      DARWIN: "darwin",
      /** FreeBSD. */
      FREEBSD: "freebsd",
      /** NetBSD. */
      NETBSD: "netbsd",
      /** OpenBSD. */
      OPENBSD: "openbsd",
      /** DragonFly BSD. */
      DRAGONFLYBSD: "dragonflybsd",
      /** HP-UX (Hewlett Packard Unix). */
      HPUX: "hpux",
      /** AIX (Advanced Interactive eXecutive). */
      AIX: "aix",
      /** Oracle Solaris. */
      SOLARIS: "solaris",
      /** IBM z/OS. */
      Z_OS: "z_os"
    };
    exports.TelemetrySdkLanguageValues = {
      /** cpp. */
      CPP: "cpp",
      /** dotnet. */
      DOTNET: "dotnet",
      /** erlang. */
      ERLANG: "erlang",
      /** go. */
      GO: "go",
      /** java. */
      JAVA: "java",
      /** nodejs. */
      NODEJS: "nodejs",
      /** php. */
      PHP: "php",
      /** python. */
      PYTHON: "python",
      /** ruby. */
      RUBY: "ruby",
      /** webjs. */
      WEBJS: "webjs"
    };
  }
});

// node_modules/@opentelemetry/semantic-conventions/build/src/resource/index.js
var require_resource = __commonJS({
  "node_modules/@opentelemetry/semantic-conventions/build/src/resource/index.js"(exports) {
    "use strict";
    var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      Object.defineProperty(o, k2, { enumerable: true, get: function() {
        return m[k];
      } });
    } : function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      o[k2] = m[k];
    });
    var __exportStar = exports && exports.__exportStar || function(m, exports2) {
      for (var p in m)
        if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports2, p))
          __createBinding(exports2, m, p);
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    __exportStar(require_SemanticResourceAttributes(), exports);
  }
});

// node_modules/@opentelemetry/semantic-conventions/build/src/index.js
var require_src2 = __commonJS({
  "node_modules/@opentelemetry/semantic-conventions/build/src/index.js"(exports) {
    "use strict";
    var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      Object.defineProperty(o, k2, { enumerable: true, get: function() {
        return m[k];
      } });
    } : function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      o[k2] = m[k];
    });
    var __exportStar = exports && exports.__exportStar || function(m, exports2) {
      for (var p in m)
        if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports2, p))
          __createBinding(exports2, m, p);
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    __exportStar(require_trace2(), exports);
    __exportStar(require_resource(), exports);
  }
});

// node_modules/@opentelemetry/core/build/src/platform/node/sdk-info.js
var require_sdk_info = __commonJS({
  "node_modules/@opentelemetry/core/build/src/platform/node/sdk-info.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.SDK_INFO = void 0;
    var version_1 = require_version2();
    var semantic_conventions_1 = require_src2();
    exports.SDK_INFO = {
      [semantic_conventions_1.SemanticResourceAttributes.TELEMETRY_SDK_NAME]: "opentelemetry",
      [semantic_conventions_1.SemanticResourceAttributes.PROCESS_RUNTIME_NAME]: "node",
      [semantic_conventions_1.SemanticResourceAttributes.TELEMETRY_SDK_LANGUAGE]: semantic_conventions_1.TelemetrySdkLanguageValues.NODEJS,
      [semantic_conventions_1.SemanticResourceAttributes.TELEMETRY_SDK_VERSION]: version_1.VERSION
    };
  }
});

// node_modules/@opentelemetry/core/build/src/platform/node/timer-util.js
var require_timer_util = __commonJS({
  "node_modules/@opentelemetry/core/build/src/platform/node/timer-util.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.unrefTimer = void 0;
    function unrefTimer(timer) {
      timer.unref();
    }
    exports.unrefTimer = unrefTimer;
  }
});

// node_modules/@opentelemetry/core/build/src/platform/node/index.js
var require_node2 = __commonJS({
  "node_modules/@opentelemetry/core/build/src/platform/node/index.js"(exports) {
    "use strict";
    var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      Object.defineProperty(o, k2, { enumerable: true, get: function() {
        return m[k];
      } });
    } : function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      o[k2] = m[k];
    });
    var __exportStar = exports && exports.__exportStar || function(m, exports2) {
      for (var p in m)
        if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports2, p))
          __createBinding(exports2, m, p);
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    __exportStar(require_environment2(), exports);
    __exportStar(require_globalThis3(), exports);
    __exportStar(require_hex_to_base64(), exports);
    __exportStar(require_RandomIdGenerator(), exports);
    __exportStar(require_performance(), exports);
    __exportStar(require_sdk_info(), exports);
    __exportStar(require_timer_util(), exports);
  }
});

// node_modules/@opentelemetry/core/build/src/platform/index.js
var require_platform2 = __commonJS({
  "node_modules/@opentelemetry/core/build/src/platform/index.js"(exports) {
    "use strict";
    var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      Object.defineProperty(o, k2, { enumerable: true, get: function() {
        return m[k];
      } });
    } : function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      o[k2] = m[k];
    });
    var __exportStar = exports && exports.__exportStar || function(m, exports2) {
      for (var p in m)
        if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports2, p))
          __createBinding(exports2, m, p);
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    __exportStar(require_node2(), exports);
  }
});

// node_modules/@opentelemetry/core/build/src/common/time.js
var require_time = __commonJS({
  "node_modules/@opentelemetry/core/build/src/common/time.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.isTimeInput = exports.isTimeInputHrTime = exports.hrTimeToMicroseconds = exports.hrTimeToMilliseconds = exports.hrTimeToNanoseconds = exports.hrTimeToTimeStamp = exports.hrTimeDuration = exports.timeInputToHrTime = exports.hrTime = void 0;
    var platform_1 = require_platform2();
    var NANOSECOND_DIGITS = 9;
    var SECOND_TO_NANOSECONDS = Math.pow(10, NANOSECOND_DIGITS);
    function numberToHrtime(epochMillis) {
      const epochSeconds = epochMillis / 1e3;
      const seconds = Math.trunc(epochSeconds);
      const nanos = Number((epochSeconds - seconds).toFixed(NANOSECOND_DIGITS)) * SECOND_TO_NANOSECONDS;
      return [seconds, nanos];
    }
    function getTimeOrigin() {
      let timeOrigin = platform_1.otperformance.timeOrigin;
      if (typeof timeOrigin !== "number") {
        const perf = platform_1.otperformance;
        timeOrigin = perf.timing && perf.timing.fetchStart;
      }
      return timeOrigin;
    }
    function hrTime(performanceNow) {
      const timeOrigin = numberToHrtime(getTimeOrigin());
      const now = numberToHrtime(typeof performanceNow === "number" ? performanceNow : platform_1.otperformance.now());
      let seconds = timeOrigin[0] + now[0];
      let nanos = timeOrigin[1] + now[1];
      if (nanos > SECOND_TO_NANOSECONDS) {
        nanos -= SECOND_TO_NANOSECONDS;
        seconds += 1;
      }
      return [seconds, nanos];
    }
    exports.hrTime = hrTime;
    function timeInputToHrTime(time) {
      if (isTimeInputHrTime(time)) {
        return time;
      } else if (typeof time === "number") {
        if (time < getTimeOrigin()) {
          return hrTime(time);
        } else {
          return numberToHrtime(time);
        }
      } else if (time instanceof Date) {
        return numberToHrtime(time.getTime());
      } else {
        throw TypeError("Invalid input type");
      }
    }
    exports.timeInputToHrTime = timeInputToHrTime;
    function hrTimeDuration(startTime, endTime) {
      let seconds = endTime[0] - startTime[0];
      let nanos = endTime[1] - startTime[1];
      if (nanos < 0) {
        seconds -= 1;
        nanos += SECOND_TO_NANOSECONDS;
      }
      return [seconds, nanos];
    }
    exports.hrTimeDuration = hrTimeDuration;
    function hrTimeToTimeStamp(time) {
      const precision = NANOSECOND_DIGITS;
      const tmp = `${"0".repeat(precision)}${time[1]}Z`;
      const nanoString = tmp.substr(tmp.length - precision - 1);
      const date = new Date(time[0] * 1e3).toISOString();
      return date.replace("000Z", nanoString);
    }
    exports.hrTimeToTimeStamp = hrTimeToTimeStamp;
    function hrTimeToNanoseconds(time) {
      return time[0] * SECOND_TO_NANOSECONDS + time[1];
    }
    exports.hrTimeToNanoseconds = hrTimeToNanoseconds;
    function hrTimeToMilliseconds(time) {
      return Math.round(time[0] * 1e3 + time[1] / 1e6);
    }
    exports.hrTimeToMilliseconds = hrTimeToMilliseconds;
    function hrTimeToMicroseconds(time) {
      return Math.round(time[0] * 1e6 + time[1] / 1e3);
    }
    exports.hrTimeToMicroseconds = hrTimeToMicroseconds;
    function isTimeInputHrTime(value) {
      return Array.isArray(value) && value.length === 2 && typeof value[0] === "number" && typeof value[1] === "number";
    }
    exports.isTimeInputHrTime = isTimeInputHrTime;
    function isTimeInput(value) {
      return isTimeInputHrTime(value) || typeof value === "number" || value instanceof Date;
    }
    exports.isTimeInput = isTimeInput;
  }
});

// node_modules/@opentelemetry/core/build/src/common/types.js
var require_types2 = __commonJS({
  "node_modules/@opentelemetry/core/build/src/common/types.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
  }
});

// node_modules/@opentelemetry/core/build/src/ExportResult.js
var require_ExportResult = __commonJS({
  "node_modules/@opentelemetry/core/build/src/ExportResult.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ExportResultCode = void 0;
    var ExportResultCode;
    (function(ExportResultCode2) {
      ExportResultCode2[ExportResultCode2["SUCCESS"] = 0] = "SUCCESS";
      ExportResultCode2[ExportResultCode2["FAILED"] = 1] = "FAILED";
    })(ExportResultCode = exports.ExportResultCode || (exports.ExportResultCode = {}));
  }
});

// node_modules/@opentelemetry/core/build/src/propagation/composite.js
var require_composite = __commonJS({
  "node_modules/@opentelemetry/core/build/src/propagation/composite.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.CompositePropagator = void 0;
    var api_1 = require_src();
    var CompositePropagator = class {
      /**
       * Construct a composite propagator from a list of propagators.
       *
       * @param [config] Configuration object for composite propagator
       */
      constructor(config = {}) {
        var _a;
        this._propagators = (_a = config.propagators) !== null && _a !== void 0 ? _a : [];
        this._fields = Array.from(new Set(this._propagators.map((p) => typeof p.fields === "function" ? p.fields() : []).reduce((x, y) => x.concat(y), [])));
      }
      /**
       * Run each of the configured propagators with the given context and carrier.
       * Propagators are run in the order they are configured, so if multiple
       * propagators write the same carrier key, the propagator later in the list
       * will "win".
       *
       * @param context Context to inject
       * @param carrier Carrier into which context will be injected
       */
      inject(context, carrier, setter) {
        for (const propagator of this._propagators) {
          try {
            propagator.inject(context, carrier, setter);
          } catch (err) {
            api_1.diag.warn(`Failed to inject with ${propagator.constructor.name}. Err: ${err.message}`);
          }
        }
      }
      /**
       * Run each of the configured propagators with the given context and carrier.
       * Propagators are run in the order they are configured, so if multiple
       * propagators write the same context key, the propagator later in the list
       * will "win".
       *
       * @param context Context to add values to
       * @param carrier Carrier from which to extract context
       */
      extract(context, carrier, getter) {
        return this._propagators.reduce((ctx, propagator) => {
          try {
            return propagator.extract(ctx, carrier, getter);
          } catch (err) {
            api_1.diag.warn(`Failed to inject with ${propagator.constructor.name}. Err: ${err.message}`);
          }
          return ctx;
        }, context);
      }
      fields() {
        return this._fields.slice();
      }
    };
    exports.CompositePropagator = CompositePropagator;
  }
});

// node_modules/@opentelemetry/core/build/src/internal/validators.js
var require_validators = __commonJS({
  "node_modules/@opentelemetry/core/build/src/internal/validators.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.validateValue = exports.validateKey = void 0;
    var VALID_KEY_CHAR_RANGE = "[_0-9a-z-*/]";
    var VALID_KEY = `[a-z]${VALID_KEY_CHAR_RANGE}{0,255}`;
    var VALID_VENDOR_KEY = `[a-z0-9]${VALID_KEY_CHAR_RANGE}{0,240}@[a-z]${VALID_KEY_CHAR_RANGE}{0,13}`;
    var VALID_KEY_REGEX = new RegExp(`^(?:${VALID_KEY}|${VALID_VENDOR_KEY})$`);
    var VALID_VALUE_BASE_REGEX = /^[ -~]{0,255}[!-~]$/;
    var INVALID_VALUE_COMMA_EQUAL_REGEX = /,|=/;
    function validateKey(key) {
      return VALID_KEY_REGEX.test(key);
    }
    exports.validateKey = validateKey;
    function validateValue(value) {
      return VALID_VALUE_BASE_REGEX.test(value) && !INVALID_VALUE_COMMA_EQUAL_REGEX.test(value);
    }
    exports.validateValue = validateValue;
  }
});

// node_modules/@opentelemetry/core/build/src/trace/TraceState.js
var require_TraceState = __commonJS({
  "node_modules/@opentelemetry/core/build/src/trace/TraceState.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.TraceState = void 0;
    var validators_1 = require_validators();
    var MAX_TRACE_STATE_ITEMS = 32;
    var MAX_TRACE_STATE_LEN = 512;
    var LIST_MEMBERS_SEPARATOR = ",";
    var LIST_MEMBER_KEY_VALUE_SPLITTER = "=";
    var TraceState = class {
      constructor(rawTraceState) {
        this._internalState = /* @__PURE__ */ new Map();
        if (rawTraceState)
          this._parse(rawTraceState);
      }
      set(key, value) {
        const traceState = this._clone();
        if (traceState._internalState.has(key)) {
          traceState._internalState.delete(key);
        }
        traceState._internalState.set(key, value);
        return traceState;
      }
      unset(key) {
        const traceState = this._clone();
        traceState._internalState.delete(key);
        return traceState;
      }
      get(key) {
        return this._internalState.get(key);
      }
      serialize() {
        return this._keys().reduce((agg, key) => {
          agg.push(key + LIST_MEMBER_KEY_VALUE_SPLITTER + this.get(key));
          return agg;
        }, []).join(LIST_MEMBERS_SEPARATOR);
      }
      _parse(rawTraceState) {
        if (rawTraceState.length > MAX_TRACE_STATE_LEN)
          return;
        this._internalState = rawTraceState.split(LIST_MEMBERS_SEPARATOR).reverse().reduce((agg, part) => {
          const listMember = part.trim();
          const i = listMember.indexOf(LIST_MEMBER_KEY_VALUE_SPLITTER);
          if (i !== -1) {
            const key = listMember.slice(0, i);
            const value = listMember.slice(i + 1, part.length);
            if ((0, validators_1.validateKey)(key) && (0, validators_1.validateValue)(value)) {
              agg.set(key, value);
            } else {
            }
          }
          return agg;
        }, /* @__PURE__ */ new Map());
        if (this._internalState.size > MAX_TRACE_STATE_ITEMS) {
          this._internalState = new Map(Array.from(this._internalState.entries()).reverse().slice(0, MAX_TRACE_STATE_ITEMS));
        }
      }
      _keys() {
        return Array.from(this._internalState.keys()).reverse();
      }
      _clone() {
        const traceState = new TraceState();
        traceState._internalState = new Map(this._internalState);
        return traceState;
      }
    };
    exports.TraceState = TraceState;
  }
});

// node_modules/@opentelemetry/core/build/src/trace/W3CTraceContextPropagator.js
var require_W3CTraceContextPropagator = __commonJS({
  "node_modules/@opentelemetry/core/build/src/trace/W3CTraceContextPropagator.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.W3CTraceContextPropagator = exports.parseTraceParent = exports.TRACE_STATE_HEADER = exports.TRACE_PARENT_HEADER = void 0;
    var api_1 = require_src();
    var suppress_tracing_1 = require_suppress_tracing();
    var TraceState_1 = require_TraceState();
    exports.TRACE_PARENT_HEADER = "traceparent";
    exports.TRACE_STATE_HEADER = "tracestate";
    var VERSION = "00";
    var VERSION_PART = "(?!ff)[\\da-f]{2}";
    var TRACE_ID_PART = "(?![0]{32})[\\da-f]{32}";
    var PARENT_ID_PART = "(?![0]{16})[\\da-f]{16}";
    var FLAGS_PART = "[\\da-f]{2}";
    var TRACE_PARENT_REGEX = new RegExp(`^\\s?(${VERSION_PART})-(${TRACE_ID_PART})-(${PARENT_ID_PART})-(${FLAGS_PART})(-.*)?\\s?$`);
    function parseTraceParent(traceParent) {
      const match = TRACE_PARENT_REGEX.exec(traceParent);
      if (!match)
        return null;
      if (match[1] === "00" && match[5])
        return null;
      return {
        traceId: match[2],
        spanId: match[3],
        traceFlags: parseInt(match[4], 16)
      };
    }
    exports.parseTraceParent = parseTraceParent;
    var W3CTraceContextPropagator = class {
      inject(context, carrier, setter) {
        const spanContext = api_1.trace.getSpanContext(context);
        if (!spanContext || (0, suppress_tracing_1.isTracingSuppressed)(context) || !(0, api_1.isSpanContextValid)(spanContext))
          return;
        const traceParent = `${VERSION}-${spanContext.traceId}-${spanContext.spanId}-0${Number(spanContext.traceFlags || api_1.TraceFlags.NONE).toString(16)}`;
        setter.set(carrier, exports.TRACE_PARENT_HEADER, traceParent);
        if (spanContext.traceState) {
          setter.set(carrier, exports.TRACE_STATE_HEADER, spanContext.traceState.serialize());
        }
      }
      extract(context, carrier, getter) {
        const traceParentHeader = getter.get(carrier, exports.TRACE_PARENT_HEADER);
        if (!traceParentHeader)
          return context;
        const traceParent = Array.isArray(traceParentHeader) ? traceParentHeader[0] : traceParentHeader;
        if (typeof traceParent !== "string")
          return context;
        const spanContext = parseTraceParent(traceParent);
        if (!spanContext)
          return context;
        spanContext.isRemote = true;
        const traceStateHeader = getter.get(carrier, exports.TRACE_STATE_HEADER);
        if (traceStateHeader) {
          const state = Array.isArray(traceStateHeader) ? traceStateHeader.join(",") : traceStateHeader;
          spanContext.traceState = new TraceState_1.TraceState(typeof state === "string" ? state : void 0);
        }
        return api_1.trace.setSpanContext(context, spanContext);
      }
      fields() {
        return [exports.TRACE_PARENT_HEADER, exports.TRACE_STATE_HEADER];
      }
    };
    exports.W3CTraceContextPropagator = W3CTraceContextPropagator;
  }
});

// node_modules/@opentelemetry/core/build/src/trace/IdGenerator.js
var require_IdGenerator = __commonJS({
  "node_modules/@opentelemetry/core/build/src/trace/IdGenerator.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
  }
});

// node_modules/@opentelemetry/core/build/src/trace/rpc-metadata.js
var require_rpc_metadata = __commonJS({
  "node_modules/@opentelemetry/core/build/src/trace/rpc-metadata.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getRPCMetadata = exports.deleteRPCMetadata = exports.setRPCMetadata = exports.RPCType = void 0;
    var api_1 = require_src();
    var RPC_METADATA_KEY = (0, api_1.createContextKey)("OpenTelemetry SDK Context Key RPC_METADATA");
    var RPCType;
    (function(RPCType2) {
      RPCType2["HTTP"] = "http";
    })(RPCType = exports.RPCType || (exports.RPCType = {}));
    function setRPCMetadata(context, meta) {
      return context.setValue(RPC_METADATA_KEY, meta);
    }
    exports.setRPCMetadata = setRPCMetadata;
    function deleteRPCMetadata(context) {
      return context.deleteValue(RPC_METADATA_KEY);
    }
    exports.deleteRPCMetadata = deleteRPCMetadata;
    function getRPCMetadata(context) {
      return context.getValue(RPC_METADATA_KEY);
    }
    exports.getRPCMetadata = getRPCMetadata;
  }
});

// node_modules/@opentelemetry/core/build/src/trace/sampler/AlwaysOffSampler.js
var require_AlwaysOffSampler = __commonJS({
  "node_modules/@opentelemetry/core/build/src/trace/sampler/AlwaysOffSampler.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.AlwaysOffSampler = void 0;
    var api_1 = require_src();
    var AlwaysOffSampler = class {
      shouldSample() {
        return {
          decision: api_1.SamplingDecision.NOT_RECORD
        };
      }
      toString() {
        return "AlwaysOffSampler";
      }
    };
    exports.AlwaysOffSampler = AlwaysOffSampler;
  }
});

// node_modules/@opentelemetry/core/build/src/trace/sampler/AlwaysOnSampler.js
var require_AlwaysOnSampler = __commonJS({
  "node_modules/@opentelemetry/core/build/src/trace/sampler/AlwaysOnSampler.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.AlwaysOnSampler = void 0;
    var api_1 = require_src();
    var AlwaysOnSampler = class {
      shouldSample() {
        return {
          decision: api_1.SamplingDecision.RECORD_AND_SAMPLED
        };
      }
      toString() {
        return "AlwaysOnSampler";
      }
    };
    exports.AlwaysOnSampler = AlwaysOnSampler;
  }
});

// node_modules/@opentelemetry/core/build/src/trace/sampler/ParentBasedSampler.js
var require_ParentBasedSampler = __commonJS({
  "node_modules/@opentelemetry/core/build/src/trace/sampler/ParentBasedSampler.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ParentBasedSampler = void 0;
    var api_1 = require_src();
    var global_error_handler_1 = require_global_error_handler();
    var AlwaysOffSampler_1 = require_AlwaysOffSampler();
    var AlwaysOnSampler_1 = require_AlwaysOnSampler();
    var ParentBasedSampler = class {
      constructor(config) {
        var _a, _b, _c, _d;
        this._root = config.root;
        if (!this._root) {
          (0, global_error_handler_1.globalErrorHandler)(new Error("ParentBasedSampler must have a root sampler configured"));
          this._root = new AlwaysOnSampler_1.AlwaysOnSampler();
        }
        this._remoteParentSampled = (_a = config.remoteParentSampled) !== null && _a !== void 0 ? _a : new AlwaysOnSampler_1.AlwaysOnSampler();
        this._remoteParentNotSampled = (_b = config.remoteParentNotSampled) !== null && _b !== void 0 ? _b : new AlwaysOffSampler_1.AlwaysOffSampler();
        this._localParentSampled = (_c = config.localParentSampled) !== null && _c !== void 0 ? _c : new AlwaysOnSampler_1.AlwaysOnSampler();
        this._localParentNotSampled = (_d = config.localParentNotSampled) !== null && _d !== void 0 ? _d : new AlwaysOffSampler_1.AlwaysOffSampler();
      }
      shouldSample(context, traceId, spanName, spanKind, attributes, links) {
        const parentContext = api_1.trace.getSpanContext(context);
        if (!parentContext || !(0, api_1.isSpanContextValid)(parentContext)) {
          return this._root.shouldSample(context, traceId, spanName, spanKind, attributes, links);
        }
        if (parentContext.isRemote) {
          if (parentContext.traceFlags & api_1.TraceFlags.SAMPLED) {
            return this._remoteParentSampled.shouldSample(context, traceId, spanName, spanKind, attributes, links);
          }
          return this._remoteParentNotSampled.shouldSample(context, traceId, spanName, spanKind, attributes, links);
        }
        if (parentContext.traceFlags & api_1.TraceFlags.SAMPLED) {
          return this._localParentSampled.shouldSample(context, traceId, spanName, spanKind, attributes, links);
        }
        return this._localParentNotSampled.shouldSample(context, traceId, spanName, spanKind, attributes, links);
      }
      toString() {
        return `ParentBased{root=${this._root.toString()}, remoteParentSampled=${this._remoteParentSampled.toString()}, remoteParentNotSampled=${this._remoteParentNotSampled.toString()}, localParentSampled=${this._localParentSampled.toString()}, localParentNotSampled=${this._localParentNotSampled.toString()}}`;
      }
    };
    exports.ParentBasedSampler = ParentBasedSampler;
  }
});

// node_modules/@opentelemetry/core/build/src/trace/sampler/TraceIdRatioBasedSampler.js
var require_TraceIdRatioBasedSampler = __commonJS({
  "node_modules/@opentelemetry/core/build/src/trace/sampler/TraceIdRatioBasedSampler.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.TraceIdRatioBasedSampler = void 0;
    var api_1 = require_src();
    var TraceIdRatioBasedSampler = class {
      constructor(_ratio = 0) {
        this._ratio = _ratio;
        this._ratio = this._normalize(_ratio);
        this._upperBound = Math.floor(this._ratio * 4294967295);
      }
      shouldSample(context, traceId) {
        return {
          decision: (0, api_1.isValidTraceId)(traceId) && this._accumulate(traceId) < this._upperBound ? api_1.SamplingDecision.RECORD_AND_SAMPLED : api_1.SamplingDecision.NOT_RECORD
        };
      }
      toString() {
        return `TraceIdRatioBased{${this._ratio}}`;
      }
      _normalize(ratio) {
        if (typeof ratio !== "number" || isNaN(ratio))
          return 0;
        return ratio >= 1 ? 1 : ratio <= 0 ? 0 : ratio;
      }
      _accumulate(traceId) {
        let accumulation = 0;
        for (let i = 0; i < traceId.length / 8; i++) {
          const pos = i * 8;
          const part = parseInt(traceId.slice(pos, pos + 8), 16);
          accumulation = (accumulation ^ part) >>> 0;
        }
        return accumulation;
      }
    };
    exports.TraceIdRatioBasedSampler = TraceIdRatioBasedSampler;
  }
});

// node_modules/@opentelemetry/core/build/src/utils/lodash.merge.js
var require_lodash_merge = __commonJS({
  "node_modules/@opentelemetry/core/build/src/utils/lodash.merge.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.isPlainObject = void 0;
    var objectTag = "[object Object]";
    var nullTag = "[object Null]";
    var undefinedTag = "[object Undefined]";
    var funcProto = Function.prototype;
    var funcToString = funcProto.toString;
    var objectCtorString = funcToString.call(Object);
    var getPrototype = overArg(Object.getPrototypeOf, Object);
    var objectProto = Object.prototype;
    var hasOwnProperty = objectProto.hasOwnProperty;
    var symToStringTag = Symbol ? Symbol.toStringTag : void 0;
    var nativeObjectToString = objectProto.toString;
    function overArg(func, transform) {
      return function(arg) {
        return func(transform(arg));
      };
    }
    function isPlainObject(value) {
      if (!isObjectLike(value) || baseGetTag(value) !== objectTag) {
        return false;
      }
      const proto = getPrototype(value);
      if (proto === null) {
        return true;
      }
      const Ctor = hasOwnProperty.call(proto, "constructor") && proto.constructor;
      return typeof Ctor == "function" && Ctor instanceof Ctor && funcToString.call(Ctor) === objectCtorString;
    }
    exports.isPlainObject = isPlainObject;
    function isObjectLike(value) {
      return value != null && typeof value == "object";
    }
    function baseGetTag(value) {
      if (value == null) {
        return value === void 0 ? undefinedTag : nullTag;
      }
      return symToStringTag && symToStringTag in Object(value) ? getRawTag(value) : objectToString(value);
    }
    function getRawTag(value) {
      const isOwn = hasOwnProperty.call(value, symToStringTag), tag = value[symToStringTag];
      let unmasked = false;
      try {
        value[symToStringTag] = void 0;
        unmasked = true;
      } catch (e) {
      }
      const result = nativeObjectToString.call(value);
      if (unmasked) {
        if (isOwn) {
          value[symToStringTag] = tag;
        } else {
          delete value[symToStringTag];
        }
      }
      return result;
    }
    function objectToString(value) {
      return nativeObjectToString.call(value);
    }
  }
});

// node_modules/@opentelemetry/core/build/src/utils/merge.js
var require_merge = __commonJS({
  "node_modules/@opentelemetry/core/build/src/utils/merge.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.merge = void 0;
    var lodash_merge_1 = require_lodash_merge();
    var MAX_LEVEL = 20;
    function merge(...args) {
      let result = args.shift();
      const objects = /* @__PURE__ */ new WeakMap();
      while (args.length > 0) {
        result = mergeTwoObjects(result, args.shift(), 0, objects);
      }
      return result;
    }
    exports.merge = merge;
    function takeValue(value) {
      if (isArray(value)) {
        return value.slice();
      }
      return value;
    }
    function mergeTwoObjects(one, two, level = 0, objects) {
      let result;
      if (level > MAX_LEVEL) {
        return void 0;
      }
      level++;
      if (isPrimitive(one) || isPrimitive(two) || isFunction(two)) {
        result = takeValue(two);
      } else if (isArray(one)) {
        result = one.slice();
        if (isArray(two)) {
          for (let i = 0, j = two.length; i < j; i++) {
            result.push(takeValue(two[i]));
          }
        } else if (isObject(two)) {
          const keys = Object.keys(two);
          for (let i = 0, j = keys.length; i < j; i++) {
            const key = keys[i];
            result[key] = takeValue(two[key]);
          }
        }
      } else if (isObject(one)) {
        if (isObject(two)) {
          if (!shouldMerge(one, two)) {
            return two;
          }
          result = Object.assign({}, one);
          const keys = Object.keys(two);
          for (let i = 0, j = keys.length; i < j; i++) {
            const key = keys[i];
            const twoValue = two[key];
            if (isPrimitive(twoValue)) {
              if (typeof twoValue === "undefined") {
                delete result[key];
              } else {
                result[key] = twoValue;
              }
            } else {
              const obj1 = result[key];
              const obj2 = twoValue;
              if (wasObjectReferenced(one, key, objects) || wasObjectReferenced(two, key, objects)) {
                delete result[key];
              } else {
                if (isObject(obj1) && isObject(obj2)) {
                  const arr1 = objects.get(obj1) || [];
                  const arr2 = objects.get(obj2) || [];
                  arr1.push({ obj: one, key });
                  arr2.push({ obj: two, key });
                  objects.set(obj1, arr1);
                  objects.set(obj2, arr2);
                }
                result[key] = mergeTwoObjects(result[key], twoValue, level, objects);
              }
            }
          }
        } else {
          result = two;
        }
      }
      return result;
    }
    function wasObjectReferenced(obj, key, objects) {
      const arr = objects.get(obj[key]) || [];
      for (let i = 0, j = arr.length; i < j; i++) {
        const info = arr[i];
        if (info.key === key && info.obj === obj) {
          return true;
        }
      }
      return false;
    }
    function isArray(value) {
      return Array.isArray(value);
    }
    function isFunction(value) {
      return typeof value === "function";
    }
    function isObject(value) {
      return !isPrimitive(value) && !isArray(value) && !isFunction(value) && typeof value === "object";
    }
    function isPrimitive(value) {
      return typeof value === "string" || typeof value === "number" || typeof value === "boolean" || typeof value === "undefined" || value instanceof Date || value instanceof RegExp || value === null;
    }
    function shouldMerge(one, two) {
      if (!(0, lodash_merge_1.isPlainObject)(one) || !(0, lodash_merge_1.isPlainObject)(two)) {
        return false;
      }
      return true;
    }
  }
});

// node_modules/@opentelemetry/core/build/src/utils/url.js
var require_url = __commonJS({
  "node_modules/@opentelemetry/core/build/src/utils/url.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.isUrlIgnored = exports.urlMatches = void 0;
    function urlMatches(url, urlToMatch) {
      if (typeof urlToMatch === "string") {
        return url === urlToMatch;
      } else {
        return !!url.match(urlToMatch);
      }
    }
    exports.urlMatches = urlMatches;
    function isUrlIgnored(url, ignoredUrls) {
      if (!ignoredUrls) {
        return false;
      }
      for (const ignoreUrl of ignoredUrls) {
        if (urlMatches(url, ignoreUrl)) {
          return true;
        }
      }
      return false;
    }
    exports.isUrlIgnored = isUrlIgnored;
  }
});

// node_modules/@opentelemetry/core/build/src/utils/wrap.js
var require_wrap = __commonJS({
  "node_modules/@opentelemetry/core/build/src/utils/wrap.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.isWrapped = void 0;
    function isWrapped(func) {
      return typeof func === "function" && typeof func.__original === "function" && typeof func.__unwrap === "function" && func.__wrapped === true;
    }
    exports.isWrapped = isWrapped;
  }
});

// node_modules/@opentelemetry/core/build/src/utils/promise.js
var require_promise = __commonJS({
  "node_modules/@opentelemetry/core/build/src/utils/promise.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Deferred = void 0;
    var Deferred = class {
      constructor() {
        this._promise = new Promise((resolve, reject) => {
          this._resolve = resolve;
          this._reject = reject;
        });
      }
      get promise() {
        return this._promise;
      }
      resolve(val) {
        this._resolve(val);
      }
      reject(err) {
        this._reject(err);
      }
    };
    exports.Deferred = Deferred;
  }
});

// node_modules/@opentelemetry/core/build/src/utils/callback.js
var require_callback = __commonJS({
  "node_modules/@opentelemetry/core/build/src/utils/callback.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.BindOnceFuture = void 0;
    var promise_1 = require_promise();
    var BindOnceFuture = class {
      constructor(_callback, _that) {
        this._callback = _callback;
        this._that = _that;
        this._isCalled = false;
        this._deferred = new promise_1.Deferred();
      }
      get isCalled() {
        return this._isCalled;
      }
      get promise() {
        return this._deferred.promise;
      }
      call(...args) {
        if (!this._isCalled) {
          this._isCalled = true;
          try {
            Promise.resolve(this._callback.call(this._that, ...args)).then((val) => this._deferred.resolve(val), (err) => this._deferred.reject(err));
          } catch (err) {
            this._deferred.reject(err);
          }
        }
        return this._deferred.promise;
      }
    };
    exports.BindOnceFuture = BindOnceFuture;
  }
});

// node_modules/@opentelemetry/core/build/src/internal/exporter.js
var require_exporter = __commonJS({
  "node_modules/@opentelemetry/core/build/src/internal/exporter.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports._export = void 0;
    var api_1 = require_src();
    var suppress_tracing_1 = require_suppress_tracing();
    function _export(exporter, arg) {
      return new Promise((resolve) => {
        api_1.context.with((0, suppress_tracing_1.suppressTracing)(api_1.context.active()), () => {
          exporter.export(arg, (result) => {
            resolve(result);
          });
        });
      });
    }
    exports._export = _export;
  }
});

// node_modules/@opentelemetry/core/build/src/index.js
var require_src3 = __commonJS({
  "node_modules/@opentelemetry/core/build/src/index.js"(exports) {
    "use strict";
    var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      Object.defineProperty(o, k2, { enumerable: true, get: function() {
        return m[k];
      } });
    } : function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      o[k2] = m[k];
    });
    var __exportStar = exports && exports.__exportStar || function(m, exports2) {
      for (var p in m)
        if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports2, p))
          __createBinding(exports2, m, p);
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.internal = exports.baggageUtils = void 0;
    __exportStar(require_W3CBaggagePropagator(), exports);
    __exportStar(require_anchored_clock(), exports);
    __exportStar(require_attributes(), exports);
    __exportStar(require_global_error_handler(), exports);
    __exportStar(require_logging_error_handler(), exports);
    __exportStar(require_time(), exports);
    __exportStar(require_types2(), exports);
    __exportStar(require_ExportResult(), exports);
    __exportStar(require_version2(), exports);
    exports.baggageUtils = require_utils3();
    __exportStar(require_platform2(), exports);
    __exportStar(require_composite(), exports);
    __exportStar(require_W3CTraceContextPropagator(), exports);
    __exportStar(require_IdGenerator(), exports);
    __exportStar(require_rpc_metadata(), exports);
    __exportStar(require_AlwaysOffSampler(), exports);
    __exportStar(require_AlwaysOnSampler(), exports);
    __exportStar(require_ParentBasedSampler(), exports);
    __exportStar(require_TraceIdRatioBasedSampler(), exports);
    __exportStar(require_suppress_tracing(), exports);
    __exportStar(require_TraceState(), exports);
    __exportStar(require_environment(), exports);
    __exportStar(require_merge(), exports);
    __exportStar(require_sampling(), exports);
    __exportStar(require_url(), exports);
    __exportStar(require_wrap(), exports);
    __exportStar(require_callback(), exports);
    __exportStar(require_version2(), exports);
    var exporter_1 = require_exporter();
    exports.internal = {
      _export: exporter_1._export
    };
  }
});

// node_modules/semver/internal/constants.js
var require_constants2 = __commonJS({
  "node_modules/semver/internal/constants.js"(exports, module2) {
    var SEMVER_SPEC_VERSION = "2.0.0";
    var MAX_LENGTH = 256;
    var MAX_SAFE_INTEGER = Number.MAX_SAFE_INTEGER || /* istanbul ignore next */
    9007199254740991;
    var MAX_SAFE_COMPONENT_LENGTH = 16;
    module2.exports = {
      SEMVER_SPEC_VERSION,
      MAX_LENGTH,
      MAX_SAFE_INTEGER,
      MAX_SAFE_COMPONENT_LENGTH
    };
  }
});

// node_modules/semver/internal/debug.js
var require_debug = __commonJS({
  "node_modules/semver/internal/debug.js"(exports, module2) {
    var debug = typeof process === "object" && process.env && process.env.NODE_DEBUG && /\bsemver\b/i.test(process.env.NODE_DEBUG) ? (...args) => console.error("SEMVER", ...args) : () => {
    };
    module2.exports = debug;
  }
});

// node_modules/semver/internal/re.js
var require_re = __commonJS({
  "node_modules/semver/internal/re.js"(exports, module2) {
    var { MAX_SAFE_COMPONENT_LENGTH } = require_constants2();
    var debug = require_debug();
    exports = module2.exports = {};
    var re = exports.re = [];
    var src = exports.src = [];
    var t = exports.t = {};
    var R = 0;
    var createToken = (name, value, isGlobal) => {
      const index = R++;
      debug(name, index, value);
      t[name] = index;
      src[index] = value;
      re[index] = new RegExp(value, isGlobal ? "g" : void 0);
    };
    createToken("NUMERICIDENTIFIER", "0|[1-9]\\d*");
    createToken("NUMERICIDENTIFIERLOOSE", "[0-9]+");
    createToken("NONNUMERICIDENTIFIER", "\\d*[a-zA-Z-][a-zA-Z0-9-]*");
    createToken("MAINVERSION", `(${src[t.NUMERICIDENTIFIER]})\\.(${src[t.NUMERICIDENTIFIER]})\\.(${src[t.NUMERICIDENTIFIER]})`);
    createToken("MAINVERSIONLOOSE", `(${src[t.NUMERICIDENTIFIERLOOSE]})\\.(${src[t.NUMERICIDENTIFIERLOOSE]})\\.(${src[t.NUMERICIDENTIFIERLOOSE]})`);
    createToken("PRERELEASEIDENTIFIER", `(?:${src[t.NUMERICIDENTIFIER]}|${src[t.NONNUMERICIDENTIFIER]})`);
    createToken("PRERELEASEIDENTIFIERLOOSE", `(?:${src[t.NUMERICIDENTIFIERLOOSE]}|${src[t.NONNUMERICIDENTIFIER]})`);
    createToken("PRERELEASE", `(?:-(${src[t.PRERELEASEIDENTIFIER]}(?:\\.${src[t.PRERELEASEIDENTIFIER]})*))`);
    createToken("PRERELEASELOOSE", `(?:-?(${src[t.PRERELEASEIDENTIFIERLOOSE]}(?:\\.${src[t.PRERELEASEIDENTIFIERLOOSE]})*))`);
    createToken("BUILDIDENTIFIER", "[0-9A-Za-z-]+");
    createToken("BUILD", `(?:\\+(${src[t.BUILDIDENTIFIER]}(?:\\.${src[t.BUILDIDENTIFIER]})*))`);
    createToken("FULLPLAIN", `v?${src[t.MAINVERSION]}${src[t.PRERELEASE]}?${src[t.BUILD]}?`);
    createToken("FULL", `^${src[t.FULLPLAIN]}$`);
    createToken("LOOSEPLAIN", `[v=\\s]*${src[t.MAINVERSIONLOOSE]}${src[t.PRERELEASELOOSE]}?${src[t.BUILD]}?`);
    createToken("LOOSE", `^${src[t.LOOSEPLAIN]}$`);
    createToken("GTLT", "((?:<|>)?=?)");
    createToken("XRANGEIDENTIFIERLOOSE", `${src[t.NUMERICIDENTIFIERLOOSE]}|x|X|\\*`);
    createToken("XRANGEIDENTIFIER", `${src[t.NUMERICIDENTIFIER]}|x|X|\\*`);
    createToken("XRANGEPLAIN", `[v=\\s]*(${src[t.XRANGEIDENTIFIER]})(?:\\.(${src[t.XRANGEIDENTIFIER]})(?:\\.(${src[t.XRANGEIDENTIFIER]})(?:${src[t.PRERELEASE]})?${src[t.BUILD]}?)?)?`);
    createToken("XRANGEPLAINLOOSE", `[v=\\s]*(${src[t.XRANGEIDENTIFIERLOOSE]})(?:\\.(${src[t.XRANGEIDENTIFIERLOOSE]})(?:\\.(${src[t.XRANGEIDENTIFIERLOOSE]})(?:${src[t.PRERELEASELOOSE]})?${src[t.BUILD]}?)?)?`);
    createToken("XRANGE", `^${src[t.GTLT]}\\s*${src[t.XRANGEPLAIN]}$`);
    createToken("XRANGELOOSE", `^${src[t.GTLT]}\\s*${src[t.XRANGEPLAINLOOSE]}$`);
    createToken("COERCE", `${"(^|[^\\d])(\\d{1,"}${MAX_SAFE_COMPONENT_LENGTH}})(?:\\.(\\d{1,${MAX_SAFE_COMPONENT_LENGTH}}))?(?:\\.(\\d{1,${MAX_SAFE_COMPONENT_LENGTH}}))?(?:$|[^\\d])`);
    createToken("COERCERTL", src[t.COERCE], true);
    createToken("LONETILDE", "(?:~>?)");
    createToken("TILDETRIM", `(\\s*)${src[t.LONETILDE]}\\s+`, true);
    exports.tildeTrimReplace = "$1~";
    createToken("TILDE", `^${src[t.LONETILDE]}${src[t.XRANGEPLAIN]}$`);
    createToken("TILDELOOSE", `^${src[t.LONETILDE]}${src[t.XRANGEPLAINLOOSE]}$`);
    createToken("LONECARET", "(?:\\^)");
    createToken("CARETTRIM", `(\\s*)${src[t.LONECARET]}\\s+`, true);
    exports.caretTrimReplace = "$1^";
    createToken("CARET", `^${src[t.LONECARET]}${src[t.XRANGEPLAIN]}$`);
    createToken("CARETLOOSE", `^${src[t.LONECARET]}${src[t.XRANGEPLAINLOOSE]}$`);
    createToken("COMPARATORLOOSE", `^${src[t.GTLT]}\\s*(${src[t.LOOSEPLAIN]})$|^$`);
    createToken("COMPARATOR", `^${src[t.GTLT]}\\s*(${src[t.FULLPLAIN]})$|^$`);
    createToken("COMPARATORTRIM", `(\\s*)${src[t.GTLT]}\\s*(${src[t.LOOSEPLAIN]}|${src[t.XRANGEPLAIN]})`, true);
    exports.comparatorTrimReplace = "$1$2$3";
    createToken("HYPHENRANGE", `^\\s*(${src[t.XRANGEPLAIN]})\\s+-\\s+(${src[t.XRANGEPLAIN]})\\s*$`);
    createToken("HYPHENRANGELOOSE", `^\\s*(${src[t.XRANGEPLAINLOOSE]})\\s+-\\s+(${src[t.XRANGEPLAINLOOSE]})\\s*$`);
    createToken("STAR", "(<|>)?=?\\s*\\*");
    createToken("GTE0", "^\\s*>=\\s*0\\.0\\.0\\s*$");
    createToken("GTE0PRE", "^\\s*>=\\s*0\\.0\\.0-0\\s*$");
  }
});

// node_modules/semver/internal/parse-options.js
var require_parse_options = __commonJS({
  "node_modules/semver/internal/parse-options.js"(exports, module2) {
    var opts = ["includePrerelease", "loose", "rtl"];
    var parseOptions = (options) => !options ? {} : typeof options !== "object" ? { loose: true } : opts.filter((k) => options[k]).reduce((o, k) => {
      o[k] = true;
      return o;
    }, {});
    module2.exports = parseOptions;
  }
});

// node_modules/semver/internal/identifiers.js
var require_identifiers = __commonJS({
  "node_modules/semver/internal/identifiers.js"(exports, module2) {
    var numeric = /^[0-9]+$/;
    var compareIdentifiers = (a, b) => {
      const anum = numeric.test(a);
      const bnum = numeric.test(b);
      if (anum && bnum) {
        a = +a;
        b = +b;
      }
      return a === b ? 0 : anum && !bnum ? -1 : bnum && !anum ? 1 : a < b ? -1 : 1;
    };
    var rcompareIdentifiers = (a, b) => compareIdentifiers(b, a);
    module2.exports = {
      compareIdentifiers,
      rcompareIdentifiers
    };
  }
});

// node_modules/semver/classes/semver.js
var require_semver2 = __commonJS({
  "node_modules/semver/classes/semver.js"(exports, module2) {
    var debug = require_debug();
    var { MAX_LENGTH, MAX_SAFE_INTEGER } = require_constants2();
    var { re, t } = require_re();
    var parseOptions = require_parse_options();
    var { compareIdentifiers } = require_identifiers();
    var SemVer = class {
      constructor(version, options) {
        options = parseOptions(options);
        if (version instanceof SemVer) {
          if (version.loose === !!options.loose && version.includePrerelease === !!options.includePrerelease) {
            return version;
          } else {
            version = version.version;
          }
        } else if (typeof version !== "string") {
          throw new TypeError(`Invalid Version: ${version}`);
        }
        if (version.length > MAX_LENGTH) {
          throw new TypeError(
            `version is longer than ${MAX_LENGTH} characters`
          );
        }
        debug("SemVer", version, options);
        this.options = options;
        this.loose = !!options.loose;
        this.includePrerelease = !!options.includePrerelease;
        const m = version.trim().match(options.loose ? re[t.LOOSE] : re[t.FULL]);
        if (!m) {
          throw new TypeError(`Invalid Version: ${version}`);
        }
        this.raw = version;
        this.major = +m[1];
        this.minor = +m[2];
        this.patch = +m[3];
        if (this.major > MAX_SAFE_INTEGER || this.major < 0) {
          throw new TypeError("Invalid major version");
        }
        if (this.minor > MAX_SAFE_INTEGER || this.minor < 0) {
          throw new TypeError("Invalid minor version");
        }
        if (this.patch > MAX_SAFE_INTEGER || this.patch < 0) {
          throw new TypeError("Invalid patch version");
        }
        if (!m[4]) {
          this.prerelease = [];
        } else {
          this.prerelease = m[4].split(".").map((id) => {
            if (/^[0-9]+$/.test(id)) {
              const num = +id;
              if (num >= 0 && num < MAX_SAFE_INTEGER) {
                return num;
              }
            }
            return id;
          });
        }
        this.build = m[5] ? m[5].split(".") : [];
        this.format();
      }
      format() {
        this.version = `${this.major}.${this.minor}.${this.patch}`;
        if (this.prerelease.length) {
          this.version += `-${this.prerelease.join(".")}`;
        }
        return this.version;
      }
      toString() {
        return this.version;
      }
      compare(other) {
        debug("SemVer.compare", this.version, this.options, other);
        if (!(other instanceof SemVer)) {
          if (typeof other === "string" && other === this.version) {
            return 0;
          }
          other = new SemVer(other, this.options);
        }
        if (other.version === this.version) {
          return 0;
        }
        return this.compareMain(other) || this.comparePre(other);
      }
      compareMain(other) {
        if (!(other instanceof SemVer)) {
          other = new SemVer(other, this.options);
        }
        return compareIdentifiers(this.major, other.major) || compareIdentifiers(this.minor, other.minor) || compareIdentifiers(this.patch, other.patch);
      }
      comparePre(other) {
        if (!(other instanceof SemVer)) {
          other = new SemVer(other, this.options);
        }
        if (this.prerelease.length && !other.prerelease.length) {
          return -1;
        } else if (!this.prerelease.length && other.prerelease.length) {
          return 1;
        } else if (!this.prerelease.length && !other.prerelease.length) {
          return 0;
        }
        let i = 0;
        do {
          const a = this.prerelease[i];
          const b = other.prerelease[i];
          debug("prerelease compare", i, a, b);
          if (a === void 0 && b === void 0) {
            return 0;
          } else if (b === void 0) {
            return 1;
          } else if (a === void 0) {
            return -1;
          } else if (a === b) {
            continue;
          } else {
            return compareIdentifiers(a, b);
          }
        } while (++i);
      }
      compareBuild(other) {
        if (!(other instanceof SemVer)) {
          other = new SemVer(other, this.options);
        }
        let i = 0;
        do {
          const a = this.build[i];
          const b = other.build[i];
          debug("prerelease compare", i, a, b);
          if (a === void 0 && b === void 0) {
            return 0;
          } else if (b === void 0) {
            return 1;
          } else if (a === void 0) {
            return -1;
          } else if (a === b) {
            continue;
          } else {
            return compareIdentifiers(a, b);
          }
        } while (++i);
      }
      // preminor will bump the version up to the next minor release, and immediately
      // down to pre-release. premajor and prepatch work the same way.
      inc(release, identifier) {
        switch (release) {
          case "premajor":
            this.prerelease.length = 0;
            this.patch = 0;
            this.minor = 0;
            this.major++;
            this.inc("pre", identifier);
            break;
          case "preminor":
            this.prerelease.length = 0;
            this.patch = 0;
            this.minor++;
            this.inc("pre", identifier);
            break;
          case "prepatch":
            this.prerelease.length = 0;
            this.inc("patch", identifier);
            this.inc("pre", identifier);
            break;
          case "prerelease":
            if (this.prerelease.length === 0) {
              this.inc("patch", identifier);
            }
            this.inc("pre", identifier);
            break;
          case "major":
            if (this.minor !== 0 || this.patch !== 0 || this.prerelease.length === 0) {
              this.major++;
            }
            this.minor = 0;
            this.patch = 0;
            this.prerelease = [];
            break;
          case "minor":
            if (this.patch !== 0 || this.prerelease.length === 0) {
              this.minor++;
            }
            this.patch = 0;
            this.prerelease = [];
            break;
          case "patch":
            if (this.prerelease.length === 0) {
              this.patch++;
            }
            this.prerelease = [];
            break;
          case "pre":
            if (this.prerelease.length === 0) {
              this.prerelease = [0];
            } else {
              let i = this.prerelease.length;
              while (--i >= 0) {
                if (typeof this.prerelease[i] === "number") {
                  this.prerelease[i]++;
                  i = -2;
                }
              }
              if (i === -1) {
                this.prerelease.push(0);
              }
            }
            if (identifier) {
              if (compareIdentifiers(this.prerelease[0], identifier) === 0) {
                if (isNaN(this.prerelease[1])) {
                  this.prerelease = [identifier, 0];
                }
              } else {
                this.prerelease = [identifier, 0];
              }
            }
            break;
          default:
            throw new Error(`invalid increment argument: ${release}`);
        }
        this.format();
        this.raw = this.version;
        return this;
      }
    };
    module2.exports = SemVer;
  }
});

// node_modules/semver/functions/parse.js
var require_parse = __commonJS({
  "node_modules/semver/functions/parse.js"(exports, module2) {
    var { MAX_LENGTH } = require_constants2();
    var { re, t } = require_re();
    var SemVer = require_semver2();
    var parseOptions = require_parse_options();
    var parse = (version, options) => {
      options = parseOptions(options);
      if (version instanceof SemVer) {
        return version;
      }
      if (typeof version !== "string") {
        return null;
      }
      if (version.length > MAX_LENGTH) {
        return null;
      }
      const r = options.loose ? re[t.LOOSE] : re[t.FULL];
      if (!r.test(version)) {
        return null;
      }
      try {
        return new SemVer(version, options);
      } catch (er) {
        return null;
      }
    };
    module2.exports = parse;
  }
});

// node_modules/semver/functions/valid.js
var require_valid = __commonJS({
  "node_modules/semver/functions/valid.js"(exports, module2) {
    var parse = require_parse();
    var valid = (version, options) => {
      const v = parse(version, options);
      return v ? v.version : null;
    };
    module2.exports = valid;
  }
});

// node_modules/semver/functions/clean.js
var require_clean = __commonJS({
  "node_modules/semver/functions/clean.js"(exports, module2) {
    var parse = require_parse();
    var clean = (version, options) => {
      const s = parse(version.trim().replace(/^[=v]+/, ""), options);
      return s ? s.version : null;
    };
    module2.exports = clean;
  }
});

// node_modules/semver/functions/inc.js
var require_inc = __commonJS({
  "node_modules/semver/functions/inc.js"(exports, module2) {
    var SemVer = require_semver2();
    var inc = (version, release, options, identifier) => {
      if (typeof options === "string") {
        identifier = options;
        options = void 0;
      }
      try {
        return new SemVer(
          version instanceof SemVer ? version.version : version,
          options
        ).inc(release, identifier).version;
      } catch (er) {
        return null;
      }
    };
    module2.exports = inc;
  }
});

// node_modules/semver/functions/compare.js
var require_compare = __commonJS({
  "node_modules/semver/functions/compare.js"(exports, module2) {
    var SemVer = require_semver2();
    var compare = (a, b, loose) => new SemVer(a, loose).compare(new SemVer(b, loose));
    module2.exports = compare;
  }
});

// node_modules/semver/functions/eq.js
var require_eq = __commonJS({
  "node_modules/semver/functions/eq.js"(exports, module2) {
    var compare = require_compare();
    var eq = (a, b, loose) => compare(a, b, loose) === 0;
    module2.exports = eq;
  }
});

// node_modules/semver/functions/diff.js
var require_diff = __commonJS({
  "node_modules/semver/functions/diff.js"(exports, module2) {
    var parse = require_parse();
    var eq = require_eq();
    var diff = (version1, version2) => {
      if (eq(version1, version2)) {
        return null;
      } else {
        const v1 = parse(version1);
        const v2 = parse(version2);
        const hasPre = v1.prerelease.length || v2.prerelease.length;
        const prefix = hasPre ? "pre" : "";
        const defaultResult = hasPre ? "prerelease" : "";
        for (const key in v1) {
          if (key === "major" || key === "minor" || key === "patch") {
            if (v1[key] !== v2[key]) {
              return prefix + key;
            }
          }
        }
        return defaultResult;
      }
    };
    module2.exports = diff;
  }
});

// node_modules/semver/functions/major.js
var require_major = __commonJS({
  "node_modules/semver/functions/major.js"(exports, module2) {
    var SemVer = require_semver2();
    var major = (a, loose) => new SemVer(a, loose).major;
    module2.exports = major;
  }
});

// node_modules/semver/functions/minor.js
var require_minor = __commonJS({
  "node_modules/semver/functions/minor.js"(exports, module2) {
    var SemVer = require_semver2();
    var minor = (a, loose) => new SemVer(a, loose).minor;
    module2.exports = minor;
  }
});

// node_modules/semver/functions/patch.js
var require_patch = __commonJS({
  "node_modules/semver/functions/patch.js"(exports, module2) {
    var SemVer = require_semver2();
    var patch = (a, loose) => new SemVer(a, loose).patch;
    module2.exports = patch;
  }
});

// node_modules/semver/functions/prerelease.js
var require_prerelease = __commonJS({
  "node_modules/semver/functions/prerelease.js"(exports, module2) {
    var parse = require_parse();
    var prerelease = (version, options) => {
      const parsed = parse(version, options);
      return parsed && parsed.prerelease.length ? parsed.prerelease : null;
    };
    module2.exports = prerelease;
  }
});

// node_modules/semver/functions/rcompare.js
var require_rcompare = __commonJS({
  "node_modules/semver/functions/rcompare.js"(exports, module2) {
    var compare = require_compare();
    var rcompare = (a, b, loose) => compare(b, a, loose);
    module2.exports = rcompare;
  }
});

// node_modules/semver/functions/compare-loose.js
var require_compare_loose = __commonJS({
  "node_modules/semver/functions/compare-loose.js"(exports, module2) {
    var compare = require_compare();
    var compareLoose = (a, b) => compare(a, b, true);
    module2.exports = compareLoose;
  }
});

// node_modules/semver/functions/compare-build.js
var require_compare_build = __commonJS({
  "node_modules/semver/functions/compare-build.js"(exports, module2) {
    var SemVer = require_semver2();
    var compareBuild = (a, b, loose) => {
      const versionA = new SemVer(a, loose);
      const versionB = new SemVer(b, loose);
      return versionA.compare(versionB) || versionA.compareBuild(versionB);
    };
    module2.exports = compareBuild;
  }
});

// node_modules/semver/functions/sort.js
var require_sort = __commonJS({
  "node_modules/semver/functions/sort.js"(exports, module2) {
    var compareBuild = require_compare_build();
    var sort = (list, loose) => list.sort((a, b) => compareBuild(a, b, loose));
    module2.exports = sort;
  }
});

// node_modules/semver/functions/rsort.js
var require_rsort = __commonJS({
  "node_modules/semver/functions/rsort.js"(exports, module2) {
    var compareBuild = require_compare_build();
    var rsort = (list, loose) => list.sort((a, b) => compareBuild(b, a, loose));
    module2.exports = rsort;
  }
});

// node_modules/semver/functions/gt.js
var require_gt = __commonJS({
  "node_modules/semver/functions/gt.js"(exports, module2) {
    var compare = require_compare();
    var gt = (a, b, loose) => compare(a, b, loose) > 0;
    module2.exports = gt;
  }
});

// node_modules/semver/functions/lt.js
var require_lt = __commonJS({
  "node_modules/semver/functions/lt.js"(exports, module2) {
    var compare = require_compare();
    var lt = (a, b, loose) => compare(a, b, loose) < 0;
    module2.exports = lt;
  }
});

// node_modules/semver/functions/neq.js
var require_neq = __commonJS({
  "node_modules/semver/functions/neq.js"(exports, module2) {
    var compare = require_compare();
    var neq = (a, b, loose) => compare(a, b, loose) !== 0;
    module2.exports = neq;
  }
});

// node_modules/semver/functions/gte.js
var require_gte = __commonJS({
  "node_modules/semver/functions/gte.js"(exports, module2) {
    var compare = require_compare();
    var gte = (a, b, loose) => compare(a, b, loose) >= 0;
    module2.exports = gte;
  }
});

// node_modules/semver/functions/lte.js
var require_lte = __commonJS({
  "node_modules/semver/functions/lte.js"(exports, module2) {
    var compare = require_compare();
    var lte = (a, b, loose) => compare(a, b, loose) <= 0;
    module2.exports = lte;
  }
});

// node_modules/semver/functions/cmp.js
var require_cmp = __commonJS({
  "node_modules/semver/functions/cmp.js"(exports, module2) {
    var eq = require_eq();
    var neq = require_neq();
    var gt = require_gt();
    var gte = require_gte();
    var lt = require_lt();
    var lte = require_lte();
    var cmp = (a, op, b, loose) => {
      switch (op) {
        case "===":
          if (typeof a === "object") {
            a = a.version;
          }
          if (typeof b === "object") {
            b = b.version;
          }
          return a === b;
        case "!==":
          if (typeof a === "object") {
            a = a.version;
          }
          if (typeof b === "object") {
            b = b.version;
          }
          return a !== b;
        case "":
        case "=":
        case "==":
          return eq(a, b, loose);
        case "!=":
          return neq(a, b, loose);
        case ">":
          return gt(a, b, loose);
        case ">=":
          return gte(a, b, loose);
        case "<":
          return lt(a, b, loose);
        case "<=":
          return lte(a, b, loose);
        default:
          throw new TypeError(`Invalid operator: ${op}`);
      }
    };
    module2.exports = cmp;
  }
});

// node_modules/semver/functions/coerce.js
var require_coerce = __commonJS({
  "node_modules/semver/functions/coerce.js"(exports, module2) {
    var SemVer = require_semver2();
    var parse = require_parse();
    var { re, t } = require_re();
    var coerce = (version, options) => {
      if (version instanceof SemVer) {
        return version;
      }
      if (typeof version === "number") {
        version = String(version);
      }
      if (typeof version !== "string") {
        return null;
      }
      options = options || {};
      let match = null;
      if (!options.rtl) {
        match = version.match(re[t.COERCE]);
      } else {
        let next;
        while ((next = re[t.COERCERTL].exec(version)) && (!match || match.index + match[0].length !== version.length)) {
          if (!match || next.index + next[0].length !== match.index + match[0].length) {
            match = next;
          }
          re[t.COERCERTL].lastIndex = next.index + next[1].length + next[2].length;
        }
        re[t.COERCERTL].lastIndex = -1;
      }
      if (match === null) {
        return null;
      }
      return parse(`${match[2]}.${match[3] || "0"}.${match[4] || "0"}`, options);
    };
    module2.exports = coerce;
  }
});

// node_modules/yallist/iterator.js
var require_iterator = __commonJS({
  "node_modules/yallist/iterator.js"(exports, module2) {
    "use strict";
    module2.exports = function(Yallist) {
      Yallist.prototype[Symbol.iterator] = function* () {
        for (let walker = this.head; walker; walker = walker.next) {
          yield walker.value;
        }
      };
    };
  }
});

// node_modules/yallist/yallist.js
var require_yallist = __commonJS({
  "node_modules/yallist/yallist.js"(exports, module2) {
    "use strict";
    module2.exports = Yallist;
    Yallist.Node = Node;
    Yallist.create = Yallist;
    function Yallist(list) {
      var self2 = this;
      if (!(self2 instanceof Yallist)) {
        self2 = new Yallist();
      }
      self2.tail = null;
      self2.head = null;
      self2.length = 0;
      if (list && typeof list.forEach === "function") {
        list.forEach(function(item) {
          self2.push(item);
        });
      } else if (arguments.length > 0) {
        for (var i = 0, l = arguments.length; i < l; i++) {
          self2.push(arguments[i]);
        }
      }
      return self2;
    }
    Yallist.prototype.removeNode = function(node) {
      if (node.list !== this) {
        throw new Error("removing node which does not belong to this list");
      }
      var next = node.next;
      var prev = node.prev;
      if (next) {
        next.prev = prev;
      }
      if (prev) {
        prev.next = next;
      }
      if (node === this.head) {
        this.head = next;
      }
      if (node === this.tail) {
        this.tail = prev;
      }
      node.list.length--;
      node.next = null;
      node.prev = null;
      node.list = null;
      return next;
    };
    Yallist.prototype.unshiftNode = function(node) {
      if (node === this.head) {
        return;
      }
      if (node.list) {
        node.list.removeNode(node);
      }
      var head = this.head;
      node.list = this;
      node.next = head;
      if (head) {
        head.prev = node;
      }
      this.head = node;
      if (!this.tail) {
        this.tail = node;
      }
      this.length++;
    };
    Yallist.prototype.pushNode = function(node) {
      if (node === this.tail) {
        return;
      }
      if (node.list) {
        node.list.removeNode(node);
      }
      var tail = this.tail;
      node.list = this;
      node.prev = tail;
      if (tail) {
        tail.next = node;
      }
      this.tail = node;
      if (!this.head) {
        this.head = node;
      }
      this.length++;
    };
    Yallist.prototype.push = function() {
      for (var i = 0, l = arguments.length; i < l; i++) {
        push(this, arguments[i]);
      }
      return this.length;
    };
    Yallist.prototype.unshift = function() {
      for (var i = 0, l = arguments.length; i < l; i++) {
        unshift(this, arguments[i]);
      }
      return this.length;
    };
    Yallist.prototype.pop = function() {
      if (!this.tail) {
        return void 0;
      }
      var res = this.tail.value;
      this.tail = this.tail.prev;
      if (this.tail) {
        this.tail.next = null;
      } else {
        this.head = null;
      }
      this.length--;
      return res;
    };
    Yallist.prototype.shift = function() {
      if (!this.head) {
        return void 0;
      }
      var res = this.head.value;
      this.head = this.head.next;
      if (this.head) {
        this.head.prev = null;
      } else {
        this.tail = null;
      }
      this.length--;
      return res;
    };
    Yallist.prototype.forEach = function(fn, thisp) {
      thisp = thisp || this;
      for (var walker = this.head, i = 0; walker !== null; i++) {
        fn.call(thisp, walker.value, i, this);
        walker = walker.next;
      }
    };
    Yallist.prototype.forEachReverse = function(fn, thisp) {
      thisp = thisp || this;
      for (var walker = this.tail, i = this.length - 1; walker !== null; i--) {
        fn.call(thisp, walker.value, i, this);
        walker = walker.prev;
      }
    };
    Yallist.prototype.get = function(n) {
      for (var i = 0, walker = this.head; walker !== null && i < n; i++) {
        walker = walker.next;
      }
      if (i === n && walker !== null) {
        return walker.value;
      }
    };
    Yallist.prototype.getReverse = function(n) {
      for (var i = 0, walker = this.tail; walker !== null && i < n; i++) {
        walker = walker.prev;
      }
      if (i === n && walker !== null) {
        return walker.value;
      }
    };
    Yallist.prototype.map = function(fn, thisp) {
      thisp = thisp || this;
      var res = new Yallist();
      for (var walker = this.head; walker !== null; ) {
        res.push(fn.call(thisp, walker.value, this));
        walker = walker.next;
      }
      return res;
    };
    Yallist.prototype.mapReverse = function(fn, thisp) {
      thisp = thisp || this;
      var res = new Yallist();
      for (var walker = this.tail; walker !== null; ) {
        res.push(fn.call(thisp, walker.value, this));
        walker = walker.prev;
      }
      return res;
    };
    Yallist.prototype.reduce = function(fn, initial) {
      var acc;
      var walker = this.head;
      if (arguments.length > 1) {
        acc = initial;
      } else if (this.head) {
        walker = this.head.next;
        acc = this.head.value;
      } else {
        throw new TypeError("Reduce of empty list with no initial value");
      }
      for (var i = 0; walker !== null; i++) {
        acc = fn(acc, walker.value, i);
        walker = walker.next;
      }
      return acc;
    };
    Yallist.prototype.reduceReverse = function(fn, initial) {
      var acc;
      var walker = this.tail;
      if (arguments.length > 1) {
        acc = initial;
      } else if (this.tail) {
        walker = this.tail.prev;
        acc = this.tail.value;
      } else {
        throw new TypeError("Reduce of empty list with no initial value");
      }
      for (var i = this.length - 1; walker !== null; i--) {
        acc = fn(acc, walker.value, i);
        walker = walker.prev;
      }
      return acc;
    };
    Yallist.prototype.toArray = function() {
      var arr = new Array(this.length);
      for (var i = 0, walker = this.head; walker !== null; i++) {
        arr[i] = walker.value;
        walker = walker.next;
      }
      return arr;
    };
    Yallist.prototype.toArrayReverse = function() {
      var arr = new Array(this.length);
      for (var i = 0, walker = this.tail; walker !== null; i++) {
        arr[i] = walker.value;
        walker = walker.prev;
      }
      return arr;
    };
    Yallist.prototype.slice = function(from, to) {
      to = to || this.length;
      if (to < 0) {
        to += this.length;
      }
      from = from || 0;
      if (from < 0) {
        from += this.length;
      }
      var ret = new Yallist();
      if (to < from || to < 0) {
        return ret;
      }
      if (from < 0) {
        from = 0;
      }
      if (to > this.length) {
        to = this.length;
      }
      for (var i = 0, walker = this.head; walker !== null && i < from; i++) {
        walker = walker.next;
      }
      for (; walker !== null && i < to; i++, walker = walker.next) {
        ret.push(walker.value);
      }
      return ret;
    };
    Yallist.prototype.sliceReverse = function(from, to) {
      to = to || this.length;
      if (to < 0) {
        to += this.length;
      }
      from = from || 0;
      if (from < 0) {
        from += this.length;
      }
      var ret = new Yallist();
      if (to < from || to < 0) {
        return ret;
      }
      if (from < 0) {
        from = 0;
      }
      if (to > this.length) {
        to = this.length;
      }
      for (var i = this.length, walker = this.tail; walker !== null && i > to; i--) {
        walker = walker.prev;
      }
      for (; walker !== null && i > from; i--, walker = walker.prev) {
        ret.push(walker.value);
      }
      return ret;
    };
    Yallist.prototype.splice = function(start, deleteCount, ...nodes) {
      if (start > this.length) {
        start = this.length - 1;
      }
      if (start < 0) {
        start = this.length + start;
      }
      for (var i = 0, walker = this.head; walker !== null && i < start; i++) {
        walker = walker.next;
      }
      var ret = [];
      for (var i = 0; walker && i < deleteCount; i++) {
        ret.push(walker.value);
        walker = this.removeNode(walker);
      }
      if (walker === null) {
        walker = this.tail;
      }
      if (walker !== this.head && walker !== this.tail) {
        walker = walker.prev;
      }
      for (var i = 0; i < nodes.length; i++) {
        walker = insert(this, walker, nodes[i]);
      }
      return ret;
    };
    Yallist.prototype.reverse = function() {
      var head = this.head;
      var tail = this.tail;
      for (var walker = head; walker !== null; walker = walker.prev) {
        var p = walker.prev;
        walker.prev = walker.next;
        walker.next = p;
      }
      this.head = tail;
      this.tail = head;
      return this;
    };
    function insert(self2, node, value) {
      var inserted = node === self2.head ? new Node(value, null, node, self2) : new Node(value, node, node.next, self2);
      if (inserted.next === null) {
        self2.tail = inserted;
      }
      if (inserted.prev === null) {
        self2.head = inserted;
      }
      self2.length++;
      return inserted;
    }
    function push(self2, item) {
      self2.tail = new Node(item, self2.tail, null, self2);
      if (!self2.head) {
        self2.head = self2.tail;
      }
      self2.length++;
    }
    function unshift(self2, item) {
      self2.head = new Node(item, null, self2.head, self2);
      if (!self2.tail) {
        self2.tail = self2.head;
      }
      self2.length++;
    }
    function Node(value, prev, next, list) {
      if (!(this instanceof Node)) {
        return new Node(value, prev, next, list);
      }
      this.list = list;
      this.value = value;
      if (prev) {
        prev.next = this;
        this.prev = prev;
      } else {
        this.prev = null;
      }
      if (next) {
        next.prev = this;
        this.next = next;
      } else {
        this.next = null;
      }
    }
    try {
      require_iterator()(Yallist);
    } catch (er) {
    }
  }
});

// node_modules/lru-cache/index.js
var require_lru_cache = __commonJS({
  "node_modules/lru-cache/index.js"(exports, module2) {
    "use strict";
    var Yallist = require_yallist();
    var MAX = Symbol("max");
    var LENGTH = Symbol("length");
    var LENGTH_CALCULATOR = Symbol("lengthCalculator");
    var ALLOW_STALE = Symbol("allowStale");
    var MAX_AGE = Symbol("maxAge");
    var DISPOSE = Symbol("dispose");
    var NO_DISPOSE_ON_SET = Symbol("noDisposeOnSet");
    var LRU_LIST = Symbol("lruList");
    var CACHE = Symbol("cache");
    var UPDATE_AGE_ON_GET = Symbol("updateAgeOnGet");
    var naiveLength = () => 1;
    var LRUCache = class {
      constructor(options) {
        if (typeof options === "number")
          options = { max: options };
        if (!options)
          options = {};
        if (options.max && (typeof options.max !== "number" || options.max < 0))
          throw new TypeError("max must be a non-negative number");
        const max = this[MAX] = options.max || Infinity;
        const lc = options.length || naiveLength;
        this[LENGTH_CALCULATOR] = typeof lc !== "function" ? naiveLength : lc;
        this[ALLOW_STALE] = options.stale || false;
        if (options.maxAge && typeof options.maxAge !== "number")
          throw new TypeError("maxAge must be a number");
        this[MAX_AGE] = options.maxAge || 0;
        this[DISPOSE] = options.dispose;
        this[NO_DISPOSE_ON_SET] = options.noDisposeOnSet || false;
        this[UPDATE_AGE_ON_GET] = options.updateAgeOnGet || false;
        this.reset();
      }
      // resize the cache when the max changes.
      set max(mL) {
        if (typeof mL !== "number" || mL < 0)
          throw new TypeError("max must be a non-negative number");
        this[MAX] = mL || Infinity;
        trim(this);
      }
      get max() {
        return this[MAX];
      }
      set allowStale(allowStale) {
        this[ALLOW_STALE] = !!allowStale;
      }
      get allowStale() {
        return this[ALLOW_STALE];
      }
      set maxAge(mA) {
        if (typeof mA !== "number")
          throw new TypeError("maxAge must be a non-negative number");
        this[MAX_AGE] = mA;
        trim(this);
      }
      get maxAge() {
        return this[MAX_AGE];
      }
      // resize the cache when the lengthCalculator changes.
      set lengthCalculator(lC) {
        if (typeof lC !== "function")
          lC = naiveLength;
        if (lC !== this[LENGTH_CALCULATOR]) {
          this[LENGTH_CALCULATOR] = lC;
          this[LENGTH] = 0;
          this[LRU_LIST].forEach((hit) => {
            hit.length = this[LENGTH_CALCULATOR](hit.value, hit.key);
            this[LENGTH] += hit.length;
          });
        }
        trim(this);
      }
      get lengthCalculator() {
        return this[LENGTH_CALCULATOR];
      }
      get length() {
        return this[LENGTH];
      }
      get itemCount() {
        return this[LRU_LIST].length;
      }
      rforEach(fn, thisp) {
        thisp = thisp || this;
        for (let walker = this[LRU_LIST].tail; walker !== null; ) {
          const prev = walker.prev;
          forEachStep(this, fn, walker, thisp);
          walker = prev;
        }
      }
      forEach(fn, thisp) {
        thisp = thisp || this;
        for (let walker = this[LRU_LIST].head; walker !== null; ) {
          const next = walker.next;
          forEachStep(this, fn, walker, thisp);
          walker = next;
        }
      }
      keys() {
        return this[LRU_LIST].toArray().map((k) => k.key);
      }
      values() {
        return this[LRU_LIST].toArray().map((k) => k.value);
      }
      reset() {
        if (this[DISPOSE] && this[LRU_LIST] && this[LRU_LIST].length) {
          this[LRU_LIST].forEach((hit) => this[DISPOSE](hit.key, hit.value));
        }
        this[CACHE] = /* @__PURE__ */ new Map();
        this[LRU_LIST] = new Yallist();
        this[LENGTH] = 0;
      }
      dump() {
        return this[LRU_LIST].map((hit) => isStale(this, hit) ? false : {
          k: hit.key,
          v: hit.value,
          e: hit.now + (hit.maxAge || 0)
        }).toArray().filter((h) => h);
      }
      dumpLru() {
        return this[LRU_LIST];
      }
      set(key, value, maxAge) {
        maxAge = maxAge || this[MAX_AGE];
        if (maxAge && typeof maxAge !== "number")
          throw new TypeError("maxAge must be a number");
        const now = maxAge ? Date.now() : 0;
        const len = this[LENGTH_CALCULATOR](value, key);
        if (this[CACHE].has(key)) {
          if (len > this[MAX]) {
            del(this, this[CACHE].get(key));
            return false;
          }
          const node = this[CACHE].get(key);
          const item = node.value;
          if (this[DISPOSE]) {
            if (!this[NO_DISPOSE_ON_SET])
              this[DISPOSE](key, item.value);
          }
          item.now = now;
          item.maxAge = maxAge;
          item.value = value;
          this[LENGTH] += len - item.length;
          item.length = len;
          this.get(key);
          trim(this);
          return true;
        }
        const hit = new Entry(key, value, len, now, maxAge);
        if (hit.length > this[MAX]) {
          if (this[DISPOSE])
            this[DISPOSE](key, value);
          return false;
        }
        this[LENGTH] += hit.length;
        this[LRU_LIST].unshift(hit);
        this[CACHE].set(key, this[LRU_LIST].head);
        trim(this);
        return true;
      }
      has(key) {
        if (!this[CACHE].has(key))
          return false;
        const hit = this[CACHE].get(key).value;
        return !isStale(this, hit);
      }
      get(key) {
        return get(this, key, true);
      }
      peek(key) {
        return get(this, key, false);
      }
      pop() {
        const node = this[LRU_LIST].tail;
        if (!node)
          return null;
        del(this, node);
        return node.value;
      }
      del(key) {
        del(this, this[CACHE].get(key));
      }
      load(arr) {
        this.reset();
        const now = Date.now();
        for (let l = arr.length - 1; l >= 0; l--) {
          const hit = arr[l];
          const expiresAt = hit.e || 0;
          if (expiresAt === 0)
            this.set(hit.k, hit.v);
          else {
            const maxAge = expiresAt - now;
            if (maxAge > 0) {
              this.set(hit.k, hit.v, maxAge);
            }
          }
        }
      }
      prune() {
        this[CACHE].forEach((value, key) => get(this, key, false));
      }
    };
    var get = (self2, key, doUse) => {
      const node = self2[CACHE].get(key);
      if (node) {
        const hit = node.value;
        if (isStale(self2, hit)) {
          del(self2, node);
          if (!self2[ALLOW_STALE])
            return void 0;
        } else {
          if (doUse) {
            if (self2[UPDATE_AGE_ON_GET])
              node.value.now = Date.now();
            self2[LRU_LIST].unshiftNode(node);
          }
        }
        return hit.value;
      }
    };
    var isStale = (self2, hit) => {
      if (!hit || !hit.maxAge && !self2[MAX_AGE])
        return false;
      const diff = Date.now() - hit.now;
      return hit.maxAge ? diff > hit.maxAge : self2[MAX_AGE] && diff > self2[MAX_AGE];
    };
    var trim = (self2) => {
      if (self2[LENGTH] > self2[MAX]) {
        for (let walker = self2[LRU_LIST].tail; self2[LENGTH] > self2[MAX] && walker !== null; ) {
          const prev = walker.prev;
          del(self2, walker);
          walker = prev;
        }
      }
    };
    var del = (self2, node) => {
      if (node) {
        const hit = node.value;
        if (self2[DISPOSE])
          self2[DISPOSE](hit.key, hit.value);
        self2[LENGTH] -= hit.length;
        self2[CACHE].delete(hit.key);
        self2[LRU_LIST].removeNode(node);
      }
    };
    var Entry = class {
      constructor(key, value, length, now, maxAge) {
        this.key = key;
        this.value = value;
        this.length = length;
        this.now = now;
        this.maxAge = maxAge || 0;
      }
    };
    var forEachStep = (self2, fn, node, thisp) => {
      let hit = node.value;
      if (isStale(self2, hit)) {
        del(self2, node);
        if (!self2[ALLOW_STALE])
          hit = void 0;
      }
      if (hit)
        fn.call(thisp, hit.value, hit.key, self2);
    };
    module2.exports = LRUCache;
  }
});

// node_modules/semver/classes/range.js
var require_range = __commonJS({
  "node_modules/semver/classes/range.js"(exports, module2) {
    var Range = class {
      constructor(range, options) {
        options = parseOptions(options);
        if (range instanceof Range) {
          if (range.loose === !!options.loose && range.includePrerelease === !!options.includePrerelease) {
            return range;
          } else {
            return new Range(range.raw, options);
          }
        }
        if (range instanceof Comparator) {
          this.raw = range.value;
          this.set = [[range]];
          this.format();
          return this;
        }
        this.options = options;
        this.loose = !!options.loose;
        this.includePrerelease = !!options.includePrerelease;
        this.raw = range;
        this.set = range.split("||").map((r) => this.parseRange(r.trim())).filter((c) => c.length);
        if (!this.set.length) {
          throw new TypeError(`Invalid SemVer Range: ${range}`);
        }
        if (this.set.length > 1) {
          const first = this.set[0];
          this.set = this.set.filter((c) => !isNullSet(c[0]));
          if (this.set.length === 0) {
            this.set = [first];
          } else if (this.set.length > 1) {
            for (const c of this.set) {
              if (c.length === 1 && isAny(c[0])) {
                this.set = [c];
                break;
              }
            }
          }
        }
        this.format();
      }
      format() {
        this.range = this.set.map((comps) => {
          return comps.join(" ").trim();
        }).join("||").trim();
        return this.range;
      }
      toString() {
        return this.range;
      }
      parseRange(range) {
        range = range.trim();
        const memoOpts = Object.keys(this.options).join(",");
        const memoKey = `parseRange:${memoOpts}:${range}`;
        const cached = cache.get(memoKey);
        if (cached) {
          return cached;
        }
        const loose = this.options.loose;
        const hr = loose ? re[t.HYPHENRANGELOOSE] : re[t.HYPHENRANGE];
        range = range.replace(hr, hyphenReplace(this.options.includePrerelease));
        debug("hyphen replace", range);
        range = range.replace(re[t.COMPARATORTRIM], comparatorTrimReplace);
        debug("comparator trim", range);
        range = range.replace(re[t.TILDETRIM], tildeTrimReplace);
        range = range.replace(re[t.CARETTRIM], caretTrimReplace);
        range = range.split(/\s+/).join(" ");
        let rangeList = range.split(" ").map((comp) => parseComparator(comp, this.options)).join(" ").split(/\s+/).map((comp) => replaceGTE0(comp, this.options));
        if (loose) {
          rangeList = rangeList.filter((comp) => {
            debug("loose invalid filter", comp, this.options);
            return !!comp.match(re[t.COMPARATORLOOSE]);
          });
        }
        debug("range list", rangeList);
        const rangeMap = /* @__PURE__ */ new Map();
        const comparators = rangeList.map((comp) => new Comparator(comp, this.options));
        for (const comp of comparators) {
          if (isNullSet(comp)) {
            return [comp];
          }
          rangeMap.set(comp.value, comp);
        }
        if (rangeMap.size > 1 && rangeMap.has("")) {
          rangeMap.delete("");
        }
        const result = [...rangeMap.values()];
        cache.set(memoKey, result);
        return result;
      }
      intersects(range, options) {
        if (!(range instanceof Range)) {
          throw new TypeError("a Range is required");
        }
        return this.set.some((thisComparators) => {
          return isSatisfiable(thisComparators, options) && range.set.some((rangeComparators) => {
            return isSatisfiable(rangeComparators, options) && thisComparators.every((thisComparator) => {
              return rangeComparators.every((rangeComparator) => {
                return thisComparator.intersects(rangeComparator, options);
              });
            });
          });
        });
      }
      // if ANY of the sets match ALL of its comparators, then pass
      test(version) {
        if (!version) {
          return false;
        }
        if (typeof version === "string") {
          try {
            version = new SemVer(version, this.options);
          } catch (er) {
            return false;
          }
        }
        for (let i = 0; i < this.set.length; i++) {
          if (testSet(this.set[i], version, this.options)) {
            return true;
          }
        }
        return false;
      }
    };
    module2.exports = Range;
    var LRU = require_lru_cache();
    var cache = new LRU({ max: 1e3 });
    var parseOptions = require_parse_options();
    var Comparator = require_comparator();
    var debug = require_debug();
    var SemVer = require_semver2();
    var {
      re,
      t,
      comparatorTrimReplace,
      tildeTrimReplace,
      caretTrimReplace
    } = require_re();
    var isNullSet = (c) => c.value === "<0.0.0-0";
    var isAny = (c) => c.value === "";
    var isSatisfiable = (comparators, options) => {
      let result = true;
      const remainingComparators = comparators.slice();
      let testComparator = remainingComparators.pop();
      while (result && remainingComparators.length) {
        result = remainingComparators.every((otherComparator) => {
          return testComparator.intersects(otherComparator, options);
        });
        testComparator = remainingComparators.pop();
      }
      return result;
    };
    var parseComparator = (comp, options) => {
      debug("comp", comp, options);
      comp = replaceCarets(comp, options);
      debug("caret", comp);
      comp = replaceTildes(comp, options);
      debug("tildes", comp);
      comp = replaceXRanges(comp, options);
      debug("xrange", comp);
      comp = replaceStars(comp, options);
      debug("stars", comp);
      return comp;
    };
    var isX = (id) => !id || id.toLowerCase() === "x" || id === "*";
    var replaceTildes = (comp, options) => comp.trim().split(/\s+/).map((c) => {
      return replaceTilde(c, options);
    }).join(" ");
    var replaceTilde = (comp, options) => {
      const r = options.loose ? re[t.TILDELOOSE] : re[t.TILDE];
      return comp.replace(r, (_, M, m, p, pr) => {
        debug("tilde", comp, _, M, m, p, pr);
        let ret;
        if (isX(M)) {
          ret = "";
        } else if (isX(m)) {
          ret = `>=${M}.0.0 <${+M + 1}.0.0-0`;
        } else if (isX(p)) {
          ret = `>=${M}.${m}.0 <${M}.${+m + 1}.0-0`;
        } else if (pr) {
          debug("replaceTilde pr", pr);
          ret = `>=${M}.${m}.${p}-${pr} <${M}.${+m + 1}.0-0`;
        } else {
          ret = `>=${M}.${m}.${p} <${M}.${+m + 1}.0-0`;
        }
        debug("tilde return", ret);
        return ret;
      });
    };
    var replaceCarets = (comp, options) => comp.trim().split(/\s+/).map((c) => {
      return replaceCaret(c, options);
    }).join(" ");
    var replaceCaret = (comp, options) => {
      debug("caret", comp, options);
      const r = options.loose ? re[t.CARETLOOSE] : re[t.CARET];
      const z = options.includePrerelease ? "-0" : "";
      return comp.replace(r, (_, M, m, p, pr) => {
        debug("caret", comp, _, M, m, p, pr);
        let ret;
        if (isX(M)) {
          ret = "";
        } else if (isX(m)) {
          ret = `>=${M}.0.0${z} <${+M + 1}.0.0-0`;
        } else if (isX(p)) {
          if (M === "0") {
            ret = `>=${M}.${m}.0${z} <${M}.${+m + 1}.0-0`;
          } else {
            ret = `>=${M}.${m}.0${z} <${+M + 1}.0.0-0`;
          }
        } else if (pr) {
          debug("replaceCaret pr", pr);
          if (M === "0") {
            if (m === "0") {
              ret = `>=${M}.${m}.${p}-${pr} <${M}.${m}.${+p + 1}-0`;
            } else {
              ret = `>=${M}.${m}.${p}-${pr} <${M}.${+m + 1}.0-0`;
            }
          } else {
            ret = `>=${M}.${m}.${p}-${pr} <${+M + 1}.0.0-0`;
          }
        } else {
          debug("no pr");
          if (M === "0") {
            if (m === "0") {
              ret = `>=${M}.${m}.${p}${z} <${M}.${m}.${+p + 1}-0`;
            } else {
              ret = `>=${M}.${m}.${p}${z} <${M}.${+m + 1}.0-0`;
            }
          } else {
            ret = `>=${M}.${m}.${p} <${+M + 1}.0.0-0`;
          }
        }
        debug("caret return", ret);
        return ret;
      });
    };
    var replaceXRanges = (comp, options) => {
      debug("replaceXRanges", comp, options);
      return comp.split(/\s+/).map((c) => {
        return replaceXRange(c, options);
      }).join(" ");
    };
    var replaceXRange = (comp, options) => {
      comp = comp.trim();
      const r = options.loose ? re[t.XRANGELOOSE] : re[t.XRANGE];
      return comp.replace(r, (ret, gtlt, M, m, p, pr) => {
        debug("xRange", comp, ret, gtlt, M, m, p, pr);
        const xM = isX(M);
        const xm = xM || isX(m);
        const xp = xm || isX(p);
        const anyX = xp;
        if (gtlt === "=" && anyX) {
          gtlt = "";
        }
        pr = options.includePrerelease ? "-0" : "";
        if (xM) {
          if (gtlt === ">" || gtlt === "<") {
            ret = "<0.0.0-0";
          } else {
            ret = "*";
          }
        } else if (gtlt && anyX) {
          if (xm) {
            m = 0;
          }
          p = 0;
          if (gtlt === ">") {
            gtlt = ">=";
            if (xm) {
              M = +M + 1;
              m = 0;
              p = 0;
            } else {
              m = +m + 1;
              p = 0;
            }
          } else if (gtlt === "<=") {
            gtlt = "<";
            if (xm) {
              M = +M + 1;
            } else {
              m = +m + 1;
            }
          }
          if (gtlt === "<") {
            pr = "-0";
          }
          ret = `${gtlt + M}.${m}.${p}${pr}`;
        } else if (xm) {
          ret = `>=${M}.0.0${pr} <${+M + 1}.0.0-0`;
        } else if (xp) {
          ret = `>=${M}.${m}.0${pr} <${M}.${+m + 1}.0-0`;
        }
        debug("xRange return", ret);
        return ret;
      });
    };
    var replaceStars = (comp, options) => {
      debug("replaceStars", comp, options);
      return comp.trim().replace(re[t.STAR], "");
    };
    var replaceGTE0 = (comp, options) => {
      debug("replaceGTE0", comp, options);
      return comp.trim().replace(re[options.includePrerelease ? t.GTE0PRE : t.GTE0], "");
    };
    var hyphenReplace = (incPr) => ($0, from, fM, fm, fp, fpr, fb, to, tM, tm, tp, tpr, tb) => {
      if (isX(fM)) {
        from = "";
      } else if (isX(fm)) {
        from = `>=${fM}.0.0${incPr ? "-0" : ""}`;
      } else if (isX(fp)) {
        from = `>=${fM}.${fm}.0${incPr ? "-0" : ""}`;
      } else if (fpr) {
        from = `>=${from}`;
      } else {
        from = `>=${from}${incPr ? "-0" : ""}`;
      }
      if (isX(tM)) {
        to = "";
      } else if (isX(tm)) {
        to = `<${+tM + 1}.0.0-0`;
      } else if (isX(tp)) {
        to = `<${tM}.${+tm + 1}.0-0`;
      } else if (tpr) {
        to = `<=${tM}.${tm}.${tp}-${tpr}`;
      } else if (incPr) {
        to = `<${tM}.${tm}.${+tp + 1}-0`;
      } else {
        to = `<=${to}`;
      }
      return `${from} ${to}`.trim();
    };
    var testSet = (set, version, options) => {
      for (let i = 0; i < set.length; i++) {
        if (!set[i].test(version)) {
          return false;
        }
      }
      if (version.prerelease.length && !options.includePrerelease) {
        for (let i = 0; i < set.length; i++) {
          debug(set[i].semver);
          if (set[i].semver === Comparator.ANY) {
            continue;
          }
          if (set[i].semver.prerelease.length > 0) {
            const allowed = set[i].semver;
            if (allowed.major === version.major && allowed.minor === version.minor && allowed.patch === version.patch) {
              return true;
            }
          }
        }
        return false;
      }
      return true;
    };
  }
});

// node_modules/semver/classes/comparator.js
var require_comparator = __commonJS({
  "node_modules/semver/classes/comparator.js"(exports, module2) {
    var ANY = Symbol("SemVer ANY");
    var Comparator = class {
      static get ANY() {
        return ANY;
      }
      constructor(comp, options) {
        options = parseOptions(options);
        if (comp instanceof Comparator) {
          if (comp.loose === !!options.loose) {
            return comp;
          } else {
            comp = comp.value;
          }
        }
        debug("comparator", comp, options);
        this.options = options;
        this.loose = !!options.loose;
        this.parse(comp);
        if (this.semver === ANY) {
          this.value = "";
        } else {
          this.value = this.operator + this.semver.version;
        }
        debug("comp", this);
      }
      parse(comp) {
        const r = this.options.loose ? re[t.COMPARATORLOOSE] : re[t.COMPARATOR];
        const m = comp.match(r);
        if (!m) {
          throw new TypeError(`Invalid comparator: ${comp}`);
        }
        this.operator = m[1] !== void 0 ? m[1] : "";
        if (this.operator === "=") {
          this.operator = "";
        }
        if (!m[2]) {
          this.semver = ANY;
        } else {
          this.semver = new SemVer(m[2], this.options.loose);
        }
      }
      toString() {
        return this.value;
      }
      test(version) {
        debug("Comparator.test", version, this.options.loose);
        if (this.semver === ANY || version === ANY) {
          return true;
        }
        if (typeof version === "string") {
          try {
            version = new SemVer(version, this.options);
          } catch (er) {
            return false;
          }
        }
        return cmp(version, this.operator, this.semver, this.options);
      }
      intersects(comp, options) {
        if (!(comp instanceof Comparator)) {
          throw new TypeError("a Comparator is required");
        }
        if (!options || typeof options !== "object") {
          options = {
            loose: !!options,
            includePrerelease: false
          };
        }
        if (this.operator === "") {
          if (this.value === "") {
            return true;
          }
          return new Range(comp.value, options).test(this.value);
        } else if (comp.operator === "") {
          if (comp.value === "") {
            return true;
          }
          return new Range(this.value, options).test(comp.semver);
        }
        const sameDirectionIncreasing = (this.operator === ">=" || this.operator === ">") && (comp.operator === ">=" || comp.operator === ">");
        const sameDirectionDecreasing = (this.operator === "<=" || this.operator === "<") && (comp.operator === "<=" || comp.operator === "<");
        const sameSemVer = this.semver.version === comp.semver.version;
        const differentDirectionsInclusive = (this.operator === ">=" || this.operator === "<=") && (comp.operator === ">=" || comp.operator === "<=");
        const oppositeDirectionsLessThan = cmp(this.semver, "<", comp.semver, options) && (this.operator === ">=" || this.operator === ">") && (comp.operator === "<=" || comp.operator === "<");
        const oppositeDirectionsGreaterThan = cmp(this.semver, ">", comp.semver, options) && (this.operator === "<=" || this.operator === "<") && (comp.operator === ">=" || comp.operator === ">");
        return sameDirectionIncreasing || sameDirectionDecreasing || sameSemVer && differentDirectionsInclusive || oppositeDirectionsLessThan || oppositeDirectionsGreaterThan;
      }
    };
    module2.exports = Comparator;
    var parseOptions = require_parse_options();
    var { re, t } = require_re();
    var cmp = require_cmp();
    var debug = require_debug();
    var SemVer = require_semver2();
    var Range = require_range();
  }
});

// node_modules/semver/functions/satisfies.js
var require_satisfies = __commonJS({
  "node_modules/semver/functions/satisfies.js"(exports, module2) {
    var Range = require_range();
    var satisfies = (version, range, options) => {
      try {
        range = new Range(range, options);
      } catch (er) {
        return false;
      }
      return range.test(version);
    };
    module2.exports = satisfies;
  }
});

// node_modules/semver/ranges/to-comparators.js
var require_to_comparators = __commonJS({
  "node_modules/semver/ranges/to-comparators.js"(exports, module2) {
    var Range = require_range();
    var toComparators = (range, options) => new Range(range, options).set.map((comp) => comp.map((c) => c.value).join(" ").trim().split(" "));
    module2.exports = toComparators;
  }
});

// node_modules/semver/ranges/max-satisfying.js
var require_max_satisfying = __commonJS({
  "node_modules/semver/ranges/max-satisfying.js"(exports, module2) {
    var SemVer = require_semver2();
    var Range = require_range();
    var maxSatisfying = (versions, range, options) => {
      let max = null;
      let maxSV = null;
      let rangeObj = null;
      try {
        rangeObj = new Range(range, options);
      } catch (er) {
        return null;
      }
      versions.forEach((v) => {
        if (rangeObj.test(v)) {
          if (!max || maxSV.compare(v) === -1) {
            max = v;
            maxSV = new SemVer(max, options);
          }
        }
      });
      return max;
    };
    module2.exports = maxSatisfying;
  }
});

// node_modules/semver/ranges/min-satisfying.js
var require_min_satisfying = __commonJS({
  "node_modules/semver/ranges/min-satisfying.js"(exports, module2) {
    var SemVer = require_semver2();
    var Range = require_range();
    var minSatisfying = (versions, range, options) => {
      let min = null;
      let minSV = null;
      let rangeObj = null;
      try {
        rangeObj = new Range(range, options);
      } catch (er) {
        return null;
      }
      versions.forEach((v) => {
        if (rangeObj.test(v)) {
          if (!min || minSV.compare(v) === 1) {
            min = v;
            minSV = new SemVer(min, options);
          }
        }
      });
      return min;
    };
    module2.exports = minSatisfying;
  }
});

// node_modules/semver/ranges/min-version.js
var require_min_version = __commonJS({
  "node_modules/semver/ranges/min-version.js"(exports, module2) {
    var SemVer = require_semver2();
    var Range = require_range();
    var gt = require_gt();
    var minVersion = (range, loose) => {
      range = new Range(range, loose);
      let minver = new SemVer("0.0.0");
      if (range.test(minver)) {
        return minver;
      }
      minver = new SemVer("0.0.0-0");
      if (range.test(minver)) {
        return minver;
      }
      minver = null;
      for (let i = 0; i < range.set.length; ++i) {
        const comparators = range.set[i];
        let setMin = null;
        comparators.forEach((comparator) => {
          const compver = new SemVer(comparator.semver.version);
          switch (comparator.operator) {
            case ">":
              if (compver.prerelease.length === 0) {
                compver.patch++;
              } else {
                compver.prerelease.push(0);
              }
              compver.raw = compver.format();
            case "":
            case ">=":
              if (!setMin || gt(compver, setMin)) {
                setMin = compver;
              }
              break;
            case "<":
            case "<=":
              break;
            default:
              throw new Error(`Unexpected operation: ${comparator.operator}`);
          }
        });
        if (setMin && (!minver || gt(minver, setMin))) {
          minver = setMin;
        }
      }
      if (minver && range.test(minver)) {
        return minver;
      }
      return null;
    };
    module2.exports = minVersion;
  }
});

// node_modules/semver/ranges/valid.js
var require_valid2 = __commonJS({
  "node_modules/semver/ranges/valid.js"(exports, module2) {
    var Range = require_range();
    var validRange = (range, options) => {
      try {
        return new Range(range, options).range || "*";
      } catch (er) {
        return null;
      }
    };
    module2.exports = validRange;
  }
});

// node_modules/semver/ranges/outside.js
var require_outside = __commonJS({
  "node_modules/semver/ranges/outside.js"(exports, module2) {
    var SemVer = require_semver2();
    var Comparator = require_comparator();
    var { ANY } = Comparator;
    var Range = require_range();
    var satisfies = require_satisfies();
    var gt = require_gt();
    var lt = require_lt();
    var lte = require_lte();
    var gte = require_gte();
    var outside = (version, range, hilo, options) => {
      version = new SemVer(version, options);
      range = new Range(range, options);
      let gtfn, ltefn, ltfn, comp, ecomp;
      switch (hilo) {
        case ">":
          gtfn = gt;
          ltefn = lte;
          ltfn = lt;
          comp = ">";
          ecomp = ">=";
          break;
        case "<":
          gtfn = lt;
          ltefn = gte;
          ltfn = gt;
          comp = "<";
          ecomp = "<=";
          break;
        default:
          throw new TypeError('Must provide a hilo val of "<" or ">"');
      }
      if (satisfies(version, range, options)) {
        return false;
      }
      for (let i = 0; i < range.set.length; ++i) {
        const comparators = range.set[i];
        let high = null;
        let low = null;
        comparators.forEach((comparator) => {
          if (comparator.semver === ANY) {
            comparator = new Comparator(">=0.0.0");
          }
          high = high || comparator;
          low = low || comparator;
          if (gtfn(comparator.semver, high.semver, options)) {
            high = comparator;
          } else if (ltfn(comparator.semver, low.semver, options)) {
            low = comparator;
          }
        });
        if (high.operator === comp || high.operator === ecomp) {
          return false;
        }
        if ((!low.operator || low.operator === comp) && ltefn(version, low.semver)) {
          return false;
        } else if (low.operator === ecomp && ltfn(version, low.semver)) {
          return false;
        }
      }
      return true;
    };
    module2.exports = outside;
  }
});

// node_modules/semver/ranges/gtr.js
var require_gtr = __commonJS({
  "node_modules/semver/ranges/gtr.js"(exports, module2) {
    var outside = require_outside();
    var gtr = (version, range, options) => outside(version, range, ">", options);
    module2.exports = gtr;
  }
});

// node_modules/semver/ranges/ltr.js
var require_ltr = __commonJS({
  "node_modules/semver/ranges/ltr.js"(exports, module2) {
    var outside = require_outside();
    var ltr = (version, range, options) => outside(version, range, "<", options);
    module2.exports = ltr;
  }
});

// node_modules/semver/ranges/intersects.js
var require_intersects = __commonJS({
  "node_modules/semver/ranges/intersects.js"(exports, module2) {
    var Range = require_range();
    var intersects = (r1, r2, options) => {
      r1 = new Range(r1, options);
      r2 = new Range(r2, options);
      return r1.intersects(r2);
    };
    module2.exports = intersects;
  }
});

// node_modules/semver/ranges/simplify.js
var require_simplify = __commonJS({
  "node_modules/semver/ranges/simplify.js"(exports, module2) {
    var satisfies = require_satisfies();
    var compare = require_compare();
    module2.exports = (versions, range, options) => {
      const set = [];
      let first = null;
      let prev = null;
      const v = versions.sort((a, b) => compare(a, b, options));
      for (const version of v) {
        const included = satisfies(version, range, options);
        if (included) {
          prev = version;
          if (!first) {
            first = version;
          }
        } else {
          if (prev) {
            set.push([first, prev]);
          }
          prev = null;
          first = null;
        }
      }
      if (first) {
        set.push([first, null]);
      }
      const ranges = [];
      for (const [min, max] of set) {
        if (min === max) {
          ranges.push(min);
        } else if (!max && min === v[0]) {
          ranges.push("*");
        } else if (!max) {
          ranges.push(`>=${min}`);
        } else if (min === v[0]) {
          ranges.push(`<=${max}`);
        } else {
          ranges.push(`${min} - ${max}`);
        }
      }
      const simplified = ranges.join(" || ");
      const original = typeof range.raw === "string" ? range.raw : String(range);
      return simplified.length < original.length ? simplified : range;
    };
  }
});

// node_modules/semver/ranges/subset.js
var require_subset = __commonJS({
  "node_modules/semver/ranges/subset.js"(exports, module2) {
    var Range = require_range();
    var Comparator = require_comparator();
    var { ANY } = Comparator;
    var satisfies = require_satisfies();
    var compare = require_compare();
    var subset = (sub, dom, options = {}) => {
      if (sub === dom) {
        return true;
      }
      sub = new Range(sub, options);
      dom = new Range(dom, options);
      let sawNonNull = false;
      OUTER:
        for (const simpleSub of sub.set) {
          for (const simpleDom of dom.set) {
            const isSub = simpleSubset(simpleSub, simpleDom, options);
            sawNonNull = sawNonNull || isSub !== null;
            if (isSub) {
              continue OUTER;
            }
          }
          if (sawNonNull) {
            return false;
          }
        }
      return true;
    };
    var simpleSubset = (sub, dom, options) => {
      if (sub === dom) {
        return true;
      }
      if (sub.length === 1 && sub[0].semver === ANY) {
        if (dom.length === 1 && dom[0].semver === ANY) {
          return true;
        } else if (options.includePrerelease) {
          sub = [new Comparator(">=0.0.0-0")];
        } else {
          sub = [new Comparator(">=0.0.0")];
        }
      }
      if (dom.length === 1 && dom[0].semver === ANY) {
        if (options.includePrerelease) {
          return true;
        } else {
          dom = [new Comparator(">=0.0.0")];
        }
      }
      const eqSet = /* @__PURE__ */ new Set();
      let gt, lt;
      for (const c of sub) {
        if (c.operator === ">" || c.operator === ">=") {
          gt = higherGT(gt, c, options);
        } else if (c.operator === "<" || c.operator === "<=") {
          lt = lowerLT(lt, c, options);
        } else {
          eqSet.add(c.semver);
        }
      }
      if (eqSet.size > 1) {
        return null;
      }
      let gtltComp;
      if (gt && lt) {
        gtltComp = compare(gt.semver, lt.semver, options);
        if (gtltComp > 0) {
          return null;
        } else if (gtltComp === 0 && (gt.operator !== ">=" || lt.operator !== "<=")) {
          return null;
        }
      }
      for (const eq of eqSet) {
        if (gt && !satisfies(eq, String(gt), options)) {
          return null;
        }
        if (lt && !satisfies(eq, String(lt), options)) {
          return null;
        }
        for (const c of dom) {
          if (!satisfies(eq, String(c), options)) {
            return false;
          }
        }
        return true;
      }
      let higher, lower;
      let hasDomLT, hasDomGT;
      let needDomLTPre = lt && !options.includePrerelease && lt.semver.prerelease.length ? lt.semver : false;
      let needDomGTPre = gt && !options.includePrerelease && gt.semver.prerelease.length ? gt.semver : false;
      if (needDomLTPre && needDomLTPre.prerelease.length === 1 && lt.operator === "<" && needDomLTPre.prerelease[0] === 0) {
        needDomLTPre = false;
      }
      for (const c of dom) {
        hasDomGT = hasDomGT || c.operator === ">" || c.operator === ">=";
        hasDomLT = hasDomLT || c.operator === "<" || c.operator === "<=";
        if (gt) {
          if (needDomGTPre) {
            if (c.semver.prerelease && c.semver.prerelease.length && c.semver.major === needDomGTPre.major && c.semver.minor === needDomGTPre.minor && c.semver.patch === needDomGTPre.patch) {
              needDomGTPre = false;
            }
          }
          if (c.operator === ">" || c.operator === ">=") {
            higher = higherGT(gt, c, options);
            if (higher === c && higher !== gt) {
              return false;
            }
          } else if (gt.operator === ">=" && !satisfies(gt.semver, String(c), options)) {
            return false;
          }
        }
        if (lt) {
          if (needDomLTPre) {
            if (c.semver.prerelease && c.semver.prerelease.length && c.semver.major === needDomLTPre.major && c.semver.minor === needDomLTPre.minor && c.semver.patch === needDomLTPre.patch) {
              needDomLTPre = false;
            }
          }
          if (c.operator === "<" || c.operator === "<=") {
            lower = lowerLT(lt, c, options);
            if (lower === c && lower !== lt) {
              return false;
            }
          } else if (lt.operator === "<=" && !satisfies(lt.semver, String(c), options)) {
            return false;
          }
        }
        if (!c.operator && (lt || gt) && gtltComp !== 0) {
          return false;
        }
      }
      if (gt && hasDomLT && !lt && gtltComp !== 0) {
        return false;
      }
      if (lt && hasDomGT && !gt && gtltComp !== 0) {
        return false;
      }
      if (needDomGTPre || needDomLTPre) {
        return false;
      }
      return true;
    };
    var higherGT = (a, b, options) => {
      if (!a) {
        return b;
      }
      const comp = compare(a.semver, b.semver, options);
      return comp > 0 ? a : comp < 0 ? b : b.operator === ">" && a.operator === ">=" ? b : a;
    };
    var lowerLT = (a, b, options) => {
      if (!a) {
        return b;
      }
      const comp = compare(a.semver, b.semver, options);
      return comp < 0 ? a : comp > 0 ? b : b.operator === "<" && a.operator === "<=" ? b : a;
    };
    module2.exports = subset;
  }
});

// node_modules/semver/index.js
var require_semver3 = __commonJS({
  "node_modules/semver/index.js"(exports, module2) {
    var internalRe = require_re();
    var constants = require_constants2();
    var SemVer = require_semver2();
    var identifiers = require_identifiers();
    var parse = require_parse();
    var valid = require_valid();
    var clean = require_clean();
    var inc = require_inc();
    var diff = require_diff();
    var major = require_major();
    var minor = require_minor();
    var patch = require_patch();
    var prerelease = require_prerelease();
    var compare = require_compare();
    var rcompare = require_rcompare();
    var compareLoose = require_compare_loose();
    var compareBuild = require_compare_build();
    var sort = require_sort();
    var rsort = require_rsort();
    var gt = require_gt();
    var lt = require_lt();
    var eq = require_eq();
    var neq = require_neq();
    var gte = require_gte();
    var lte = require_lte();
    var cmp = require_cmp();
    var coerce = require_coerce();
    var Comparator = require_comparator();
    var Range = require_range();
    var satisfies = require_satisfies();
    var toComparators = require_to_comparators();
    var maxSatisfying = require_max_satisfying();
    var minSatisfying = require_min_satisfying();
    var minVersion = require_min_version();
    var validRange = require_valid2();
    var outside = require_outside();
    var gtr = require_gtr();
    var ltr = require_ltr();
    var intersects = require_intersects();
    var simplifyRange = require_simplify();
    var subset = require_subset();
    module2.exports = {
      parse,
      valid,
      clean,
      inc,
      diff,
      major,
      minor,
      patch,
      prerelease,
      compare,
      rcompare,
      compareLoose,
      compareBuild,
      sort,
      rsort,
      gt,
      lt,
      eq,
      neq,
      gte,
      lte,
      cmp,
      coerce,
      Comparator,
      Range,
      satisfies,
      toComparators,
      maxSatisfying,
      minSatisfying,
      minVersion,
      validRange,
      outside,
      gtr,
      ltr,
      intersects,
      simplifyRange,
      subset,
      SemVer,
      re: internalRe.re,
      src: internalRe.src,
      tokens: internalRe.t,
      SEMVER_SPEC_VERSION: constants.SEMVER_SPEC_VERSION,
      compareIdentifiers: identifiers.compareIdentifiers,
      rcompareIdentifiers: identifiers.rcompareIdentifiers
    };
  }
});

// node_modules/@opentelemetry/instrumentation-http/build/src/enums/AttributeNames.js
var require_AttributeNames = __commonJS({
  "node_modules/@opentelemetry/instrumentation-http/build/src/enums/AttributeNames.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.AttributeNames = void 0;
    var AttributeNames;
    (function(AttributeNames2) {
      AttributeNames2["HTTP_ERROR_NAME"] = "http.error_name";
      AttributeNames2["HTTP_ERROR_MESSAGE"] = "http.error_message";
      AttributeNames2["HTTP_STATUS_TEXT"] = "http.status_text";
    })(AttributeNames = exports.AttributeNames || (exports.AttributeNames = {}));
  }
});

// node_modules/@opentelemetry/instrumentation-http/build/src/utils.js
var require_utils4 = __commonJS({
  "node_modules/@opentelemetry/instrumentation-http/build/src/utils.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.headerCapture = exports.getIncomingRequestMetricAttributesOnResponse = exports.getIncomingRequestAttributesOnResponse = exports.getIncomingRequestMetricAttributes = exports.getIncomingRequestAttributes = exports.getOutgoingRequestMetricAttributesOnResponse = exports.getOutgoingRequestAttributesOnResponse = exports.getAttributesFromHttpKind = exports.getOutgoingRequestMetricAttributes = exports.getOutgoingRequestAttributes = exports.extractHostnameAndPort = exports.isValidOptionsType = exports.getRequestInfo = exports.isCompressed = exports.setResponseContentLengthAttribute = exports.setRequestContentLengthAttribute = exports.setSpanWithError = exports.isIgnored = exports.satisfiesPattern = exports.parseResponseStatus = exports.getAbsoluteUrl = void 0;
    var api_1 = require_src();
    var semantic_conventions_1 = require_src2();
    var core_1 = require_src3();
    var url = require("url");
    var AttributeNames_1 = require_AttributeNames();
    var getAbsoluteUrl = (requestUrl, headers, fallbackProtocol = "http:") => {
      const reqUrlObject = requestUrl || {};
      const protocol = reqUrlObject.protocol || fallbackProtocol;
      const port = (reqUrlObject.port || "").toString();
      const path = reqUrlObject.path || "/";
      let host = reqUrlObject.host || reqUrlObject.hostname || headers.host || "localhost";
      if (host.indexOf(":") === -1 && port && port !== "80" && port !== "443") {
        host += `:${port}`;
      }
      return `${protocol}//${host}${path}`;
    };
    exports.getAbsoluteUrl = getAbsoluteUrl;
    var parseResponseStatus = (kind, statusCode) => {
      const upperBound = kind === api_1.SpanKind.CLIENT ? 400 : 500;
      if (statusCode && statusCode >= 100 && statusCode < upperBound) {
        return api_1.SpanStatusCode.UNSET;
      }
      return api_1.SpanStatusCode.ERROR;
    };
    exports.parseResponseStatus = parseResponseStatus;
    var satisfiesPattern = (constant, pattern) => {
      if (typeof pattern === "string") {
        return pattern === constant;
      } else if (pattern instanceof RegExp) {
        return pattern.test(constant);
      } else if (typeof pattern === "function") {
        return pattern(constant);
      } else {
        throw new TypeError("Pattern is in unsupported datatype");
      }
    };
    exports.satisfiesPattern = satisfiesPattern;
    var isIgnored = (constant, list, onException) => {
      if (!list) {
        return false;
      }
      try {
        for (const pattern of list) {
          if ((0, exports.satisfiesPattern)(constant, pattern)) {
            return true;
          }
        }
      } catch (e) {
        if (onException) {
          onException(e);
        }
      }
      return false;
    };
    exports.isIgnored = isIgnored;
    var setSpanWithError = (span, error) => {
      const message = error.message;
      span.setAttributes({
        [AttributeNames_1.AttributeNames.HTTP_ERROR_NAME]: error.name,
        [AttributeNames_1.AttributeNames.HTTP_ERROR_MESSAGE]: message
      });
      span.setStatus({ code: api_1.SpanStatusCode.ERROR, message });
      span.recordException(error);
    };
    exports.setSpanWithError = setSpanWithError;
    var setRequestContentLengthAttribute = (request, attributes) => {
      const length = getContentLength(request.headers);
      if (length === null)
        return;
      if ((0, exports.isCompressed)(request.headers)) {
        attributes[semantic_conventions_1.SemanticAttributes.HTTP_REQUEST_CONTENT_LENGTH] = length;
      } else {
        attributes[semantic_conventions_1.SemanticAttributes.HTTP_REQUEST_CONTENT_LENGTH_UNCOMPRESSED] = length;
      }
    };
    exports.setRequestContentLengthAttribute = setRequestContentLengthAttribute;
    var setResponseContentLengthAttribute = (response, attributes) => {
      const length = getContentLength(response.headers);
      if (length === null)
        return;
      if ((0, exports.isCompressed)(response.headers)) {
        attributes[semantic_conventions_1.SemanticAttributes.HTTP_RESPONSE_CONTENT_LENGTH] = length;
      } else {
        attributes[semantic_conventions_1.SemanticAttributes.HTTP_RESPONSE_CONTENT_LENGTH_UNCOMPRESSED] = length;
      }
    };
    exports.setResponseContentLengthAttribute = setResponseContentLengthAttribute;
    function getContentLength(headers) {
      const contentLengthHeader = headers["content-length"];
      if (contentLengthHeader === void 0)
        return null;
      const contentLength = parseInt(contentLengthHeader, 10);
      if (isNaN(contentLength))
        return null;
      return contentLength;
    }
    var isCompressed = (headers) => {
      const encoding = headers["content-encoding"];
      return !!encoding && encoding !== "identity";
    };
    exports.isCompressed = isCompressed;
    var getRequestInfo = (options, extraOptions) => {
      var _a;
      let pathname = "/";
      let origin = "";
      let optionsParsed;
      if (typeof options === "string") {
        optionsParsed = url.parse(options);
        pathname = optionsParsed.pathname || "/";
        origin = `${optionsParsed.protocol || "http:"}//${optionsParsed.host}`;
        if (extraOptions !== void 0) {
          Object.assign(optionsParsed, extraOptions);
        }
      } else if (options instanceof url.URL) {
        optionsParsed = {
          protocol: options.protocol,
          hostname: typeof options.hostname === "string" && options.hostname.startsWith("[") ? options.hostname.slice(1, -1) : options.hostname,
          path: `${options.pathname || ""}${options.search || ""}`
        };
        if (options.port !== "") {
          optionsParsed.port = Number(options.port);
        }
        if (options.username || options.password) {
          optionsParsed.auth = `${options.username}:${options.password}`;
        }
        pathname = options.pathname;
        origin = options.origin;
        if (extraOptions !== void 0) {
          Object.assign(optionsParsed, extraOptions);
        }
      } else {
        optionsParsed = Object.assign({ protocol: options.host ? "http:" : void 0 }, options);
        pathname = options.pathname;
        if (!pathname && optionsParsed.path) {
          pathname = url.parse(optionsParsed.path).pathname || "/";
        }
        const hostname = optionsParsed.host || (optionsParsed.port != null ? `${optionsParsed.hostname}${optionsParsed.port}` : optionsParsed.hostname);
        origin = `${optionsParsed.protocol || "http:"}//${hostname}`;
      }
      const headers = (_a = optionsParsed.headers) !== null && _a !== void 0 ? _a : {};
      optionsParsed.headers = Object.keys(headers).reduce((normalizedHeader, key) => {
        normalizedHeader[key.toLowerCase()] = headers[key];
        return normalizedHeader;
      }, {});
      const method = optionsParsed.method ? optionsParsed.method.toUpperCase() : "GET";
      return { origin, pathname, method, optionsParsed };
    };
    exports.getRequestInfo = getRequestInfo;
    var isValidOptionsType = (options) => {
      if (!options) {
        return false;
      }
      const type = typeof options;
      return type === "string" || type === "object" && !Array.isArray(options);
    };
    exports.isValidOptionsType = isValidOptionsType;
    var extractHostnameAndPort = (requestOptions) => {
      var _a;
      if (requestOptions.hostname && requestOptions.port) {
        return { hostname: requestOptions.hostname, port: requestOptions.port };
      }
      const matches = ((_a = requestOptions.host) === null || _a === void 0 ? void 0 : _a.match(/^([^:/ ]+)(:\d{1,5})?/)) || null;
      const hostname = requestOptions.hostname || (matches === null ? "localhost" : matches[1]);
      let port = requestOptions.port;
      if (!port) {
        if (matches && matches[2]) {
          port = matches[2].substring(1);
        } else {
          port = requestOptions.protocol === "https:" ? "443" : "80";
        }
      }
      return { hostname, port };
    };
    exports.extractHostnameAndPort = extractHostnameAndPort;
    var getOutgoingRequestAttributes = (requestOptions, options) => {
      var _a, _b;
      const hostname = options.hostname;
      const port = options.port;
      const requestMethod = requestOptions.method;
      const method = requestMethod ? requestMethod.toUpperCase() : "GET";
      const headers = requestOptions.headers || {};
      const userAgent = headers["user-agent"];
      const attributes = {
        [semantic_conventions_1.SemanticAttributes.HTTP_URL]: (0, exports.getAbsoluteUrl)(requestOptions, headers, `${options.component}:`),
        [semantic_conventions_1.SemanticAttributes.HTTP_METHOD]: method,
        [semantic_conventions_1.SemanticAttributes.HTTP_TARGET]: requestOptions.path || "/",
        [semantic_conventions_1.SemanticAttributes.NET_PEER_NAME]: hostname,
        [semantic_conventions_1.SemanticAttributes.HTTP_HOST]: (_b = (_a = requestOptions.headers) === null || _a === void 0 ? void 0 : _a.host) !== null && _b !== void 0 ? _b : `${hostname}:${port}`
      };
      if (userAgent !== void 0) {
        attributes[semantic_conventions_1.SemanticAttributes.HTTP_USER_AGENT] = userAgent;
      }
      return Object.assign(attributes, options.hookAttributes);
    };
    exports.getOutgoingRequestAttributes = getOutgoingRequestAttributes;
    var getOutgoingRequestMetricAttributes = (spanAttributes) => {
      const metricAttributes = {};
      metricAttributes[semantic_conventions_1.SemanticAttributes.HTTP_METHOD] = spanAttributes[semantic_conventions_1.SemanticAttributes.HTTP_METHOD];
      metricAttributes[semantic_conventions_1.SemanticAttributes.NET_PEER_NAME] = spanAttributes[semantic_conventions_1.SemanticAttributes.NET_PEER_NAME];
      return metricAttributes;
    };
    exports.getOutgoingRequestMetricAttributes = getOutgoingRequestMetricAttributes;
    var getAttributesFromHttpKind = (kind) => {
      const attributes = {};
      if (kind) {
        attributes[semantic_conventions_1.SemanticAttributes.HTTP_FLAVOR] = kind;
        if (kind.toUpperCase() !== "QUIC") {
          attributes[semantic_conventions_1.SemanticAttributes.NET_TRANSPORT] = semantic_conventions_1.NetTransportValues.IP_TCP;
        } else {
          attributes[semantic_conventions_1.SemanticAttributes.NET_TRANSPORT] = semantic_conventions_1.NetTransportValues.IP_UDP;
        }
      }
      return attributes;
    };
    exports.getAttributesFromHttpKind = getAttributesFromHttpKind;
    var getOutgoingRequestAttributesOnResponse = (response) => {
      const { statusCode, statusMessage, httpVersion, socket } = response;
      const { remoteAddress, remotePort } = socket;
      const attributes = {
        [semantic_conventions_1.SemanticAttributes.NET_PEER_IP]: remoteAddress,
        [semantic_conventions_1.SemanticAttributes.NET_PEER_PORT]: remotePort
      };
      (0, exports.setResponseContentLengthAttribute)(response, attributes);
      if (statusCode) {
        attributes[semantic_conventions_1.SemanticAttributes.HTTP_STATUS_CODE] = statusCode;
        attributes[AttributeNames_1.AttributeNames.HTTP_STATUS_TEXT] = (statusMessage || "").toUpperCase();
      }
      const httpKindAttributes = (0, exports.getAttributesFromHttpKind)(httpVersion);
      return Object.assign(attributes, httpKindAttributes);
    };
    exports.getOutgoingRequestAttributesOnResponse = getOutgoingRequestAttributesOnResponse;
    var getOutgoingRequestMetricAttributesOnResponse = (spanAttributes) => {
      const metricAttributes = {};
      metricAttributes[semantic_conventions_1.SemanticAttributes.NET_PEER_PORT] = spanAttributes[semantic_conventions_1.SemanticAttributes.NET_PEER_PORT];
      metricAttributes[semantic_conventions_1.SemanticAttributes.HTTP_STATUS_CODE] = spanAttributes[semantic_conventions_1.SemanticAttributes.HTTP_STATUS_CODE];
      metricAttributes[semantic_conventions_1.SemanticAttributes.HTTP_FLAVOR] = spanAttributes[semantic_conventions_1.SemanticAttributes.HTTP_FLAVOR];
      return metricAttributes;
    };
    exports.getOutgoingRequestMetricAttributesOnResponse = getOutgoingRequestMetricAttributesOnResponse;
    var getIncomingRequestAttributes = (request, options) => {
      const headers = request.headers;
      const userAgent = headers["user-agent"];
      const ips = headers["x-forwarded-for"];
      const method = request.method || "GET";
      const httpVersion = request.httpVersion;
      const requestUrl = request.url ? url.parse(request.url) : null;
      const host = (requestUrl === null || requestUrl === void 0 ? void 0 : requestUrl.host) || headers.host;
      const hostname = (requestUrl === null || requestUrl === void 0 ? void 0 : requestUrl.hostname) || (host === null || host === void 0 ? void 0 : host.replace(/^(.*)(:[0-9]{1,5})/, "$1")) || "localhost";
      const serverName = options.serverName;
      const attributes = {
        [semantic_conventions_1.SemanticAttributes.HTTP_URL]: (0, exports.getAbsoluteUrl)(requestUrl, headers, `${options.component}:`),
        [semantic_conventions_1.SemanticAttributes.HTTP_HOST]: host,
        [semantic_conventions_1.SemanticAttributes.NET_HOST_NAME]: hostname,
        [semantic_conventions_1.SemanticAttributes.HTTP_METHOD]: method,
        [semantic_conventions_1.SemanticAttributes.HTTP_SCHEME]: options.component
      };
      if (typeof ips === "string") {
        attributes[semantic_conventions_1.SemanticAttributes.HTTP_CLIENT_IP] = ips.split(",")[0];
      }
      if (typeof serverName === "string") {
        attributes[semantic_conventions_1.SemanticAttributes.HTTP_SERVER_NAME] = serverName;
      }
      if (requestUrl) {
        attributes[semantic_conventions_1.SemanticAttributes.HTTP_TARGET] = requestUrl.pathname || "/";
      }
      if (userAgent !== void 0) {
        attributes[semantic_conventions_1.SemanticAttributes.HTTP_USER_AGENT] = userAgent;
      }
      (0, exports.setRequestContentLengthAttribute)(request, attributes);
      const httpKindAttributes = (0, exports.getAttributesFromHttpKind)(httpVersion);
      return Object.assign(attributes, httpKindAttributes, options.hookAttributes);
    };
    exports.getIncomingRequestAttributes = getIncomingRequestAttributes;
    var getIncomingRequestMetricAttributes = (spanAttributes) => {
      const metricAttributes = {};
      metricAttributes[semantic_conventions_1.SemanticAttributes.HTTP_SCHEME] = spanAttributes[semantic_conventions_1.SemanticAttributes.HTTP_SCHEME];
      metricAttributes[semantic_conventions_1.SemanticAttributes.HTTP_METHOD] = spanAttributes[semantic_conventions_1.SemanticAttributes.HTTP_METHOD];
      metricAttributes[semantic_conventions_1.SemanticAttributes.NET_HOST_NAME] = spanAttributes[semantic_conventions_1.SemanticAttributes.NET_HOST_NAME];
      metricAttributes[semantic_conventions_1.SemanticAttributes.HTTP_FLAVOR] = spanAttributes[semantic_conventions_1.SemanticAttributes.HTTP_FLAVOR];
      return metricAttributes;
    };
    exports.getIncomingRequestMetricAttributes = getIncomingRequestMetricAttributes;
    var getIncomingRequestAttributesOnResponse = (request, response) => {
      const { socket } = request;
      const { statusCode, statusMessage } = response;
      const { localAddress, localPort, remoteAddress, remotePort } = socket;
      const rpcMetadata = (0, core_1.getRPCMetadata)(api_1.context.active());
      const attributes = {
        [semantic_conventions_1.SemanticAttributes.NET_HOST_IP]: localAddress,
        [semantic_conventions_1.SemanticAttributes.NET_HOST_PORT]: localPort,
        [semantic_conventions_1.SemanticAttributes.NET_PEER_IP]: remoteAddress,
        [semantic_conventions_1.SemanticAttributes.NET_PEER_PORT]: remotePort,
        [semantic_conventions_1.SemanticAttributes.HTTP_STATUS_CODE]: statusCode,
        [AttributeNames_1.AttributeNames.HTTP_STATUS_TEXT]: (statusMessage || "").toUpperCase()
      };
      if ((rpcMetadata === null || rpcMetadata === void 0 ? void 0 : rpcMetadata.type) === core_1.RPCType.HTTP && rpcMetadata.route !== void 0) {
        attributes[semantic_conventions_1.SemanticAttributes.HTTP_ROUTE] = rpcMetadata.route;
      }
      return attributes;
    };
    exports.getIncomingRequestAttributesOnResponse = getIncomingRequestAttributesOnResponse;
    var getIncomingRequestMetricAttributesOnResponse = (spanAttributes) => {
      const metricAttributes = {};
      metricAttributes[semantic_conventions_1.SemanticAttributes.HTTP_STATUS_CODE] = spanAttributes[semantic_conventions_1.SemanticAttributes.HTTP_STATUS_CODE];
      metricAttributes[semantic_conventions_1.SemanticAttributes.NET_HOST_PORT] = spanAttributes[semantic_conventions_1.SemanticAttributes.NET_HOST_PORT];
      return metricAttributes;
    };
    exports.getIncomingRequestMetricAttributesOnResponse = getIncomingRequestMetricAttributesOnResponse;
    function headerCapture(type, headers) {
      const normalizedHeaders = new Map(headers.map((header) => [header.toLowerCase(), header.toLowerCase().replace(/-/g, "_")]));
      return (span, getHeader) => {
        for (const [capturedHeader, normalizedHeader] of normalizedHeaders) {
          const value = getHeader(capturedHeader);
          if (value === void 0) {
            continue;
          }
          const key = `http.${type}.header.${normalizedHeader}`;
          if (typeof value === "string") {
            span.setAttribute(key, [value]);
          } else if (Array.isArray(value)) {
            span.setAttribute(key, value);
          } else {
            span.setAttribute(key, [value]);
          }
        }
      };
    }
    exports.headerCapture = headerCapture;
  }
});

// node_modules/@opentelemetry/instrumentation-http/build/src/version.js
var require_version3 = __commonJS({
  "node_modules/@opentelemetry/instrumentation-http/build/src/version.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.VERSION = void 0;
    exports.VERSION = "0.34.0";
  }
});

// node_modules/@opentelemetry/instrumentation/build/src/autoLoaderUtils.js
var require_autoLoaderUtils = __commonJS({
  "node_modules/@opentelemetry/instrumentation/build/src/autoLoaderUtils.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.disableInstrumentations = exports.enableInstrumentations = exports.parseInstrumentationOptions = void 0;
    function parseInstrumentationOptions(options = []) {
      let instrumentations = [];
      for (let i = 0, j = options.length; i < j; i++) {
        const option = options[i];
        if (Array.isArray(option)) {
          const results = parseInstrumentationOptions(option);
          instrumentations = instrumentations.concat(results.instrumentations);
        } else if (typeof option === "function") {
          instrumentations.push(new option());
        } else if (option.instrumentationName) {
          instrumentations.push(option);
        }
      }
      return { instrumentations };
    }
    exports.parseInstrumentationOptions = parseInstrumentationOptions;
    function enableInstrumentations(instrumentations, tracerProvider, meterProvider) {
      for (let i = 0, j = instrumentations.length; i < j; i++) {
        const instrumentation = instrumentations[i];
        if (tracerProvider) {
          instrumentation.setTracerProvider(tracerProvider);
        }
        if (meterProvider) {
          instrumentation.setMeterProvider(meterProvider);
        }
        if (!instrumentation.getConfig().enabled) {
          instrumentation.enable();
        }
      }
    }
    exports.enableInstrumentations = enableInstrumentations;
    function disableInstrumentations(instrumentations) {
      instrumentations.forEach((instrumentation) => instrumentation.disable());
    }
    exports.disableInstrumentations = disableInstrumentations;
  }
});

// node_modules/@opentelemetry/instrumentation/build/src/autoLoader.js
var require_autoLoader = __commonJS({
  "node_modules/@opentelemetry/instrumentation/build/src/autoLoader.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.registerInstrumentations = void 0;
    var api_1 = require_src();
    var autoLoaderUtils_1 = require_autoLoaderUtils();
    function registerInstrumentations2(options) {
      const { instrumentations } = (0, autoLoaderUtils_1.parseInstrumentationOptions)(options.instrumentations);
      const tracerProvider = options.tracerProvider || api_1.trace.getTracerProvider();
      const meterProvider = options.meterProvider || api_1.metrics.getMeterProvider();
      (0, autoLoaderUtils_1.enableInstrumentations)(instrumentations, tracerProvider, meterProvider);
      return () => {
        (0, autoLoaderUtils_1.disableInstrumentations)(instrumentations);
      };
    }
    exports.registerInstrumentations = registerInstrumentations2;
  }
});

// node_modules/shimmer/index.js
var require_shimmer = __commonJS({
  "node_modules/shimmer/index.js"(exports, module2) {
    "use strict";
    function isFunction(funktion) {
      return typeof funktion === "function";
    }
    var logger = console.error.bind(console);
    function defineProperty(obj, name, value) {
      var enumerable = !!obj[name] && obj.propertyIsEnumerable(name);
      Object.defineProperty(obj, name, {
        configurable: true,
        enumerable,
        writable: true,
        value
      });
    }
    function shimmer(options) {
      if (options && options.logger) {
        if (!isFunction(options.logger))
          logger("new logger isn't a function, not replacing");
        else
          logger = options.logger;
      }
    }
    function wrap(nodule, name, wrapper) {
      if (!nodule || !nodule[name]) {
        logger("no original function " + name + " to wrap");
        return;
      }
      if (!wrapper) {
        logger("no wrapper function");
        logger(new Error().stack);
        return;
      }
      if (!isFunction(nodule[name]) || !isFunction(wrapper)) {
        logger("original object and wrapper must be functions");
        return;
      }
      var original = nodule[name];
      var wrapped = wrapper(original, name);
      defineProperty(wrapped, "__original", original);
      defineProperty(wrapped, "__unwrap", function() {
        if (nodule[name] === wrapped)
          defineProperty(nodule, name, original);
      });
      defineProperty(wrapped, "__wrapped", true);
      defineProperty(nodule, name, wrapped);
      return wrapped;
    }
    function massWrap(nodules, names, wrapper) {
      if (!nodules) {
        logger("must provide one or more modules to patch");
        logger(new Error().stack);
        return;
      } else if (!Array.isArray(nodules)) {
        nodules = [nodules];
      }
      if (!(names && Array.isArray(names))) {
        logger("must provide one or more functions to wrap on modules");
        return;
      }
      nodules.forEach(function(nodule) {
        names.forEach(function(name) {
          wrap(nodule, name, wrapper);
        });
      });
    }
    function unwrap(nodule, name) {
      if (!nodule || !nodule[name]) {
        logger("no function to unwrap.");
        logger(new Error().stack);
        return;
      }
      if (!nodule[name].__unwrap) {
        logger("no original to unwrap to -- has " + name + " already been unwrapped?");
      } else {
        return nodule[name].__unwrap();
      }
    }
    function massUnwrap(nodules, names) {
      if (!nodules) {
        logger("must provide one or more modules to patch");
        logger(new Error().stack);
        return;
      } else if (!Array.isArray(nodules)) {
        nodules = [nodules];
      }
      if (!(names && Array.isArray(names))) {
        logger("must provide one or more functions to unwrap on modules");
        return;
      }
      nodules.forEach(function(nodule) {
        names.forEach(function(name) {
          unwrap(nodule, name);
        });
      });
    }
    shimmer.wrap = wrap;
    shimmer.massWrap = massWrap;
    shimmer.unwrap = unwrap;
    shimmer.massUnwrap = massUnwrap;
    module2.exports = shimmer;
  }
});

// node_modules/@opentelemetry/instrumentation/build/src/instrumentation.js
var require_instrumentation = __commonJS({
  "node_modules/@opentelemetry/instrumentation/build/src/instrumentation.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.InstrumentationAbstract = void 0;
    var api_1 = require_src();
    var shimmer = require_shimmer();
    var InstrumentationAbstract = class {
      constructor(instrumentationName, instrumentationVersion, config = {}) {
        this.instrumentationName = instrumentationName;
        this.instrumentationVersion = instrumentationVersion;
        this._wrap = shimmer.wrap;
        this._unwrap = shimmer.unwrap;
        this._massWrap = shimmer.massWrap;
        this._massUnwrap = shimmer.massUnwrap;
        this._config = Object.assign({ enabled: true }, config);
        this._diag = api_1.diag.createComponentLogger({
          namespace: instrumentationName
        });
        this._tracer = api_1.trace.getTracer(instrumentationName, instrumentationVersion);
        this._meter = api_1.metrics.getMeter(instrumentationName, instrumentationVersion);
      }
      /* Returns meter */
      get meter() {
        return this._meter;
      }
      /**
       * Sets MeterProvider to this plugin
       * @param meterProvider
       */
      setMeterProvider(meterProvider) {
        this._meter = meterProvider.getMeter(this.instrumentationName, this.instrumentationVersion);
      }
      /* Returns InstrumentationConfig */
      getConfig() {
        return this._config;
      }
      /**
       * Sets InstrumentationConfig to this plugin
       * @param InstrumentationConfig
       */
      setConfig(config = {}) {
        this._config = Object.assign({}, config);
      }
      /**
       * Sets TraceProvider to this plugin
       * @param tracerProvider
       */
      setTracerProvider(tracerProvider) {
        this._tracer = tracerProvider.getTracer(this.instrumentationName, this.instrumentationVersion);
      }
      /* Returns tracer */
      get tracer() {
        return this._tracer;
      }
    };
    exports.InstrumentationAbstract = InstrumentationAbstract;
  }
});

// node_modules/resolve/lib/homedir.js
var require_homedir = __commonJS({
  "node_modules/resolve/lib/homedir.js"(exports, module2) {
    "use strict";
    var os = require("os");
    module2.exports = os.homedir || function homedir() {
      var home = process.env.HOME;
      var user = process.env.LOGNAME || process.env.USER || process.env.LNAME || process.env.USERNAME;
      if (process.platform === "win32") {
        return process.env.USERPROFILE || process.env.HOMEDRIVE + process.env.HOMEPATH || home || null;
      }
      if (process.platform === "darwin") {
        return home || (user ? "/Users/" + user : null);
      }
      if (process.platform === "linux") {
        return home || (process.getuid() === 0 ? "/root" : user ? "/home/" + user : null);
      }
      return home || null;
    };
  }
});

// node_modules/resolve/lib/caller.js
var require_caller = __commonJS({
  "node_modules/resolve/lib/caller.js"(exports, module2) {
    module2.exports = function() {
      var origPrepareStackTrace = Error.prepareStackTrace;
      Error.prepareStackTrace = function(_, stack2) {
        return stack2;
      };
      var stack = new Error().stack;
      Error.prepareStackTrace = origPrepareStackTrace;
      return stack[2].getFileName();
    };
  }
});

// node_modules/path-parse/index.js
var require_path_parse = __commonJS({
  "node_modules/path-parse/index.js"(exports, module2) {
    "use strict";
    var isWindows = process.platform === "win32";
    var splitWindowsRe = /^(((?:[a-zA-Z]:|[\\\/]{2}[^\\\/]+[\\\/]+[^\\\/]+)?[\\\/]?)(?:[^\\\/]*[\\\/])*)((\.{1,2}|[^\\\/]+?|)(\.[^.\/\\]*|))[\\\/]*$/;
    var win32 = {};
    function win32SplitPath(filename) {
      return splitWindowsRe.exec(filename).slice(1);
    }
    win32.parse = function(pathString) {
      if (typeof pathString !== "string") {
        throw new TypeError(
          "Parameter 'pathString' must be a string, not " + typeof pathString
        );
      }
      var allParts = win32SplitPath(pathString);
      if (!allParts || allParts.length !== 5) {
        throw new TypeError("Invalid path '" + pathString + "'");
      }
      return {
        root: allParts[1],
        dir: allParts[0] === allParts[1] ? allParts[0] : allParts[0].slice(0, -1),
        base: allParts[2],
        ext: allParts[4],
        name: allParts[3]
      };
    };
    var splitPathRe = /^((\/?)(?:[^\/]*\/)*)((\.{1,2}|[^\/]+?|)(\.[^.\/]*|))[\/]*$/;
    var posix = {};
    function posixSplitPath(filename) {
      return splitPathRe.exec(filename).slice(1);
    }
    posix.parse = function(pathString) {
      if (typeof pathString !== "string") {
        throw new TypeError(
          "Parameter 'pathString' must be a string, not " + typeof pathString
        );
      }
      var allParts = posixSplitPath(pathString);
      if (!allParts || allParts.length !== 5) {
        throw new TypeError("Invalid path '" + pathString + "'");
      }
      return {
        root: allParts[1],
        dir: allParts[0].slice(0, -1),
        base: allParts[2],
        ext: allParts[4],
        name: allParts[3]
      };
    };
    if (isWindows)
      module2.exports = win32.parse;
    else
      module2.exports = posix.parse;
    module2.exports.posix = posix.parse;
    module2.exports.win32 = win32.parse;
  }
});

// node_modules/resolve/lib/node-modules-paths.js
var require_node_modules_paths = __commonJS({
  "node_modules/resolve/lib/node-modules-paths.js"(exports, module2) {
    var path = require("path");
    var parse = path.parse || require_path_parse();
    var getNodeModulesDirs = function getNodeModulesDirs2(absoluteStart, modules) {
      var prefix = "/";
      if (/^([A-Za-z]:)/.test(absoluteStart)) {
        prefix = "";
      } else if (/^\\\\/.test(absoluteStart)) {
        prefix = "\\\\";
      }
      var paths = [absoluteStart];
      var parsed = parse(absoluteStart);
      while (parsed.dir !== paths[paths.length - 1]) {
        paths.push(parsed.dir);
        parsed = parse(parsed.dir);
      }
      return paths.reduce(function(dirs, aPath) {
        return dirs.concat(modules.map(function(moduleDir) {
          return path.resolve(prefix, aPath, moduleDir);
        }));
      }, []);
    };
    module2.exports = function nodeModulesPaths(start, opts, request) {
      var modules = opts && opts.moduleDirectory ? [].concat(opts.moduleDirectory) : ["node_modules"];
      if (opts && typeof opts.paths === "function") {
        return opts.paths(
          request,
          start,
          function() {
            return getNodeModulesDirs(start, modules);
          },
          opts
        );
      }
      var dirs = getNodeModulesDirs(start, modules);
      return opts && opts.paths ? dirs.concat(opts.paths) : dirs;
    };
  }
});

// node_modules/resolve/lib/normalize-options.js
var require_normalize_options = __commonJS({
  "node_modules/resolve/lib/normalize-options.js"(exports, module2) {
    module2.exports = function(x, opts) {
      return opts || {};
    };
  }
});

// node_modules/function-bind/implementation.js
var require_implementation = __commonJS({
  "node_modules/function-bind/implementation.js"(exports, module2) {
    "use strict";
    var ERROR_MESSAGE = "Function.prototype.bind called on incompatible ";
    var slice = Array.prototype.slice;
    var toStr = Object.prototype.toString;
    var funcType = "[object Function]";
    module2.exports = function bind(that) {
      var target = this;
      if (typeof target !== "function" || toStr.call(target) !== funcType) {
        throw new TypeError(ERROR_MESSAGE + target);
      }
      var args = slice.call(arguments, 1);
      var bound;
      var binder = function() {
        if (this instanceof bound) {
          var result = target.apply(
            this,
            args.concat(slice.call(arguments))
          );
          if (Object(result) === result) {
            return result;
          }
          return this;
        } else {
          return target.apply(
            that,
            args.concat(slice.call(arguments))
          );
        }
      };
      var boundLength = Math.max(0, target.length - args.length);
      var boundArgs = [];
      for (var i = 0; i < boundLength; i++) {
        boundArgs.push("$" + i);
      }
      bound = Function("binder", "return function (" + boundArgs.join(",") + "){ return binder.apply(this,arguments); }")(binder);
      if (target.prototype) {
        var Empty = function Empty2() {
        };
        Empty.prototype = target.prototype;
        bound.prototype = new Empty();
        Empty.prototype = null;
      }
      return bound;
    };
  }
});

// node_modules/function-bind/index.js
var require_function_bind = __commonJS({
  "node_modules/function-bind/index.js"(exports, module2) {
    "use strict";
    var implementation = require_implementation();
    module2.exports = Function.prototype.bind || implementation;
  }
});

// node_modules/has/src/index.js
var require_src4 = __commonJS({
  "node_modules/has/src/index.js"(exports, module2) {
    "use strict";
    var bind = require_function_bind();
    module2.exports = bind.call(Function.call, Object.prototype.hasOwnProperty);
  }
});

// node_modules/is-core-module/core.json
var require_core = __commonJS({
  "node_modules/is-core-module/core.json"(exports, module2) {
    module2.exports = {
      assert: true,
      "node:assert": [">= 14.18 && < 15", ">= 16"],
      "assert/strict": ">= 15",
      "node:assert/strict": ">= 16",
      async_hooks: ">= 8",
      "node:async_hooks": [">= 14.18 && < 15", ">= 16"],
      buffer_ieee754: ">= 0.5 && < 0.9.7",
      buffer: true,
      "node:buffer": [">= 14.18 && < 15", ">= 16"],
      child_process: true,
      "node:child_process": [">= 14.18 && < 15", ">= 16"],
      cluster: ">= 0.5",
      "node:cluster": [">= 14.18 && < 15", ">= 16"],
      console: true,
      "node:console": [">= 14.18 && < 15", ">= 16"],
      constants: true,
      "node:constants": [">= 14.18 && < 15", ">= 16"],
      crypto: true,
      "node:crypto": [">= 14.18 && < 15", ">= 16"],
      _debug_agent: ">= 1 && < 8",
      _debugger: "< 8",
      dgram: true,
      "node:dgram": [">= 14.18 && < 15", ">= 16"],
      diagnostics_channel: [">= 14.17 && < 15", ">= 15.1"],
      "node:diagnostics_channel": [">= 14.18 && < 15", ">= 16"],
      dns: true,
      "node:dns": [">= 14.18 && < 15", ">= 16"],
      "dns/promises": ">= 15",
      "node:dns/promises": ">= 16",
      domain: ">= 0.7.12",
      "node:domain": [">= 14.18 && < 15", ">= 16"],
      events: true,
      "node:events": [">= 14.18 && < 15", ">= 16"],
      freelist: "< 6",
      fs: true,
      "node:fs": [">= 14.18 && < 15", ">= 16"],
      "fs/promises": [">= 10 && < 10.1", ">= 14"],
      "node:fs/promises": [">= 14.18 && < 15", ">= 16"],
      _http_agent: ">= 0.11.1",
      "node:_http_agent": [">= 14.18 && < 15", ">= 16"],
      _http_client: ">= 0.11.1",
      "node:_http_client": [">= 14.18 && < 15", ">= 16"],
      _http_common: ">= 0.11.1",
      "node:_http_common": [">= 14.18 && < 15", ">= 16"],
      _http_incoming: ">= 0.11.1",
      "node:_http_incoming": [">= 14.18 && < 15", ">= 16"],
      _http_outgoing: ">= 0.11.1",
      "node:_http_outgoing": [">= 14.18 && < 15", ">= 16"],
      _http_server: ">= 0.11.1",
      "node:_http_server": [">= 14.18 && < 15", ">= 16"],
      http: true,
      "node:http": [">= 14.18 && < 15", ">= 16"],
      http2: ">= 8.8",
      "node:http2": [">= 14.18 && < 15", ">= 16"],
      https: true,
      "node:https": [">= 14.18 && < 15", ">= 16"],
      inspector: ">= 8",
      "node:inspector": [">= 14.18 && < 15", ">= 16"],
      "inspector/promises": [">= 19"],
      "node:inspector/promises": [">= 19"],
      _linklist: "< 8",
      module: true,
      "node:module": [">= 14.18 && < 15", ">= 16"],
      net: true,
      "node:net": [">= 14.18 && < 15", ">= 16"],
      "node-inspect/lib/_inspect": ">= 7.6 && < 12",
      "node-inspect/lib/internal/inspect_client": ">= 7.6 && < 12",
      "node-inspect/lib/internal/inspect_repl": ">= 7.6 && < 12",
      os: true,
      "node:os": [">= 14.18 && < 15", ">= 16"],
      path: true,
      "node:path": [">= 14.18 && < 15", ">= 16"],
      "path/posix": ">= 15.3",
      "node:path/posix": ">= 16",
      "path/win32": ">= 15.3",
      "node:path/win32": ">= 16",
      perf_hooks: ">= 8.5",
      "node:perf_hooks": [">= 14.18 && < 15", ">= 16"],
      process: ">= 1",
      "node:process": [">= 14.18 && < 15", ">= 16"],
      punycode: ">= 0.5",
      "node:punycode": [">= 14.18 && < 15", ">= 16"],
      querystring: true,
      "node:querystring": [">= 14.18 && < 15", ">= 16"],
      readline: true,
      "node:readline": [">= 14.18 && < 15", ">= 16"],
      "readline/promises": ">= 17",
      "node:readline/promises": ">= 17",
      repl: true,
      "node:repl": [">= 14.18 && < 15", ">= 16"],
      smalloc: ">= 0.11.5 && < 3",
      _stream_duplex: ">= 0.9.4",
      "node:_stream_duplex": [">= 14.18 && < 15", ">= 16"],
      _stream_transform: ">= 0.9.4",
      "node:_stream_transform": [">= 14.18 && < 15", ">= 16"],
      _stream_wrap: ">= 1.4.1",
      "node:_stream_wrap": [">= 14.18 && < 15", ">= 16"],
      _stream_passthrough: ">= 0.9.4",
      "node:_stream_passthrough": [">= 14.18 && < 15", ">= 16"],
      _stream_readable: ">= 0.9.4",
      "node:_stream_readable": [">= 14.18 && < 15", ">= 16"],
      _stream_writable: ">= 0.9.4",
      "node:_stream_writable": [">= 14.18 && < 15", ">= 16"],
      stream: true,
      "node:stream": [">= 14.18 && < 15", ">= 16"],
      "stream/consumers": ">= 16.7",
      "node:stream/consumers": ">= 16.7",
      "stream/promises": ">= 15",
      "node:stream/promises": ">= 16",
      "stream/web": ">= 16.5",
      "node:stream/web": ">= 16.5",
      string_decoder: true,
      "node:string_decoder": [">= 14.18 && < 15", ">= 16"],
      sys: [">= 0.4 && < 0.7", ">= 0.8"],
      "node:sys": [">= 14.18 && < 15", ">= 16"],
      "node:test": [">= 16.17 && < 17", ">= 18"],
      timers: true,
      "node:timers": [">= 14.18 && < 15", ">= 16"],
      "timers/promises": ">= 15",
      "node:timers/promises": ">= 16",
      _tls_common: ">= 0.11.13",
      "node:_tls_common": [">= 14.18 && < 15", ">= 16"],
      _tls_legacy: ">= 0.11.3 && < 10",
      _tls_wrap: ">= 0.11.3",
      "node:_tls_wrap": [">= 14.18 && < 15", ">= 16"],
      tls: true,
      "node:tls": [">= 14.18 && < 15", ">= 16"],
      trace_events: ">= 10",
      "node:trace_events": [">= 14.18 && < 15", ">= 16"],
      tty: true,
      "node:tty": [">= 14.18 && < 15", ">= 16"],
      url: true,
      "node:url": [">= 14.18 && < 15", ">= 16"],
      util: true,
      "node:util": [">= 14.18 && < 15", ">= 16"],
      "util/types": ">= 15.3",
      "node:util/types": ">= 16",
      "v8/tools/arguments": ">= 10 && < 12",
      "v8/tools/codemap": [">= 4.4 && < 5", ">= 5.2 && < 12"],
      "v8/tools/consarray": [">= 4.4 && < 5", ">= 5.2 && < 12"],
      "v8/tools/csvparser": [">= 4.4 && < 5", ">= 5.2 && < 12"],
      "v8/tools/logreader": [">= 4.4 && < 5", ">= 5.2 && < 12"],
      "v8/tools/profile_view": [">= 4.4 && < 5", ">= 5.2 && < 12"],
      "v8/tools/splaytree": [">= 4.4 && < 5", ">= 5.2 && < 12"],
      v8: ">= 1",
      "node:v8": [">= 14.18 && < 15", ">= 16"],
      vm: true,
      "node:vm": [">= 14.18 && < 15", ">= 16"],
      wasi: ">= 13.4 && < 13.5",
      worker_threads: ">= 11.7",
      "node:worker_threads": [">= 14.18 && < 15", ">= 16"],
      zlib: ">= 0.5",
      "node:zlib": [">= 14.18 && < 15", ">= 16"]
    };
  }
});

// node_modules/is-core-module/index.js
var require_is_core_module = __commonJS({
  "node_modules/is-core-module/index.js"(exports, module2) {
    "use strict";
    var has = require_src4();
    function specifierIncluded(current, specifier) {
      var nodeParts = current.split(".");
      var parts = specifier.split(" ");
      var op = parts.length > 1 ? parts[0] : "=";
      var versionParts = (parts.length > 1 ? parts[1] : parts[0]).split(".");
      for (var i = 0; i < 3; ++i) {
        var cur = parseInt(nodeParts[i] || 0, 10);
        var ver = parseInt(versionParts[i] || 0, 10);
        if (cur === ver) {
          continue;
        }
        if (op === "<") {
          return cur < ver;
        }
        if (op === ">=") {
          return cur >= ver;
        }
        return false;
      }
      return op === ">=";
    }
    function matchesRange(current, range) {
      var specifiers = range.split(/ ?&& ?/);
      if (specifiers.length === 0) {
        return false;
      }
      for (var i = 0; i < specifiers.length; ++i) {
        if (!specifierIncluded(current, specifiers[i])) {
          return false;
        }
      }
      return true;
    }
    function versionIncluded(nodeVersion, specifierValue) {
      if (typeof specifierValue === "boolean") {
        return specifierValue;
      }
      var current = typeof nodeVersion === "undefined" ? process.versions && process.versions.node : nodeVersion;
      if (typeof current !== "string") {
        throw new TypeError(typeof nodeVersion === "undefined" ? "Unable to determine current node version" : "If provided, a valid node version is required");
      }
      if (specifierValue && typeof specifierValue === "object") {
        for (var i = 0; i < specifierValue.length; ++i) {
          if (matchesRange(current, specifierValue[i])) {
            return true;
          }
        }
        return false;
      }
      return matchesRange(current, specifierValue);
    }
    var data = require_core();
    module2.exports = function isCore(x, nodeVersion) {
      return has(data, x) && versionIncluded(nodeVersion, data[x]);
    };
  }
});

// node_modules/resolve/lib/async.js
var require_async = __commonJS({
  "node_modules/resolve/lib/async.js"(exports, module2) {
    var fs = require("fs");
    var getHomedir = require_homedir();
    var path = require("path");
    var caller = require_caller();
    var nodeModulesPaths = require_node_modules_paths();
    var normalizeOptions = require_normalize_options();
    var isCore = require_is_core_module();
    var realpathFS = process.platform !== "win32" && fs.realpath && typeof fs.realpath.native === "function" ? fs.realpath.native : fs.realpath;
    var homedir = getHomedir();
    var defaultPaths = function() {
      return [
        path.join(homedir, ".node_modules"),
        path.join(homedir, ".node_libraries")
      ];
    };
    var defaultIsFile = function isFile(file, cb) {
      fs.stat(file, function(err, stat) {
        if (!err) {
          return cb(null, stat.isFile() || stat.isFIFO());
        }
        if (err.code === "ENOENT" || err.code === "ENOTDIR")
          return cb(null, false);
        return cb(err);
      });
    };
    var defaultIsDir = function isDirectory(dir, cb) {
      fs.stat(dir, function(err, stat) {
        if (!err) {
          return cb(null, stat.isDirectory());
        }
        if (err.code === "ENOENT" || err.code === "ENOTDIR")
          return cb(null, false);
        return cb(err);
      });
    };
    var defaultRealpath = function realpath(x, cb) {
      realpathFS(x, function(realpathErr, realPath) {
        if (realpathErr && realpathErr.code !== "ENOENT")
          cb(realpathErr);
        else
          cb(null, realpathErr ? x : realPath);
      });
    };
    var maybeRealpath = function maybeRealpath2(realpath, x, opts, cb) {
      if (opts && opts.preserveSymlinks === false) {
        realpath(x, cb);
      } else {
        cb(null, x);
      }
    };
    var defaultReadPackage = function defaultReadPackage2(readFile, pkgfile, cb) {
      readFile(pkgfile, function(readFileErr, body) {
        if (readFileErr)
          cb(readFileErr);
        else {
          try {
            var pkg = JSON.parse(body);
            cb(null, pkg);
          } catch (jsonErr) {
            cb(null);
          }
        }
      });
    };
    var getPackageCandidates = function getPackageCandidates2(x, start, opts) {
      var dirs = nodeModulesPaths(start, opts, x);
      for (var i = 0; i < dirs.length; i++) {
        dirs[i] = path.join(dirs[i], x);
      }
      return dirs;
    };
    module2.exports = function resolve(x, options, callback) {
      var cb = callback;
      var opts = options;
      if (typeof options === "function") {
        cb = opts;
        opts = {};
      }
      if (typeof x !== "string") {
        var err = new TypeError("Path must be a string.");
        return process.nextTick(function() {
          cb(err);
        });
      }
      opts = normalizeOptions(x, opts);
      var isFile = opts.isFile || defaultIsFile;
      var isDirectory = opts.isDirectory || defaultIsDir;
      var readFile = opts.readFile || fs.readFile;
      var realpath = opts.realpath || defaultRealpath;
      var readPackage = opts.readPackage || defaultReadPackage;
      if (opts.readFile && opts.readPackage) {
        var conflictErr = new TypeError("`readFile` and `readPackage` are mutually exclusive.");
        return process.nextTick(function() {
          cb(conflictErr);
        });
      }
      var packageIterator = opts.packageIterator;
      var extensions = opts.extensions || [".js"];
      var includeCoreModules = opts.includeCoreModules !== false;
      var basedir = opts.basedir || path.dirname(caller());
      var parent = opts.filename || basedir;
      opts.paths = opts.paths || defaultPaths();
      var absoluteStart = path.resolve(basedir);
      maybeRealpath(
        realpath,
        absoluteStart,
        opts,
        function(err2, realStart) {
          if (err2)
            cb(err2);
          else
            init(realStart);
        }
      );
      var res;
      function init(basedir2) {
        if (/^(?:\.\.?(?:\/|$)|\/|([A-Za-z]:)?[/\\])/.test(x)) {
          res = path.resolve(basedir2, x);
          if (x === "." || x === ".." || x.slice(-1) === "/")
            res += "/";
          if (/\/$/.test(x) && res === basedir2) {
            loadAsDirectory(res, opts.package, onfile);
          } else
            loadAsFile(res, opts.package, onfile);
        } else if (includeCoreModules && isCore(x)) {
          return cb(null, x);
        } else
          loadNodeModules(x, basedir2, function(err2, n, pkg) {
            if (err2)
              cb(err2);
            else if (n) {
              return maybeRealpath(realpath, n, opts, function(err3, realN) {
                if (err3) {
                  cb(err3);
                } else {
                  cb(null, realN, pkg);
                }
              });
            } else {
              var moduleError = new Error("Cannot find module '" + x + "' from '" + parent + "'");
              moduleError.code = "MODULE_NOT_FOUND";
              cb(moduleError);
            }
          });
      }
      function onfile(err2, m, pkg) {
        if (err2)
          cb(err2);
        else if (m)
          cb(null, m, pkg);
        else
          loadAsDirectory(res, function(err3, d, pkg2) {
            if (err3)
              cb(err3);
            else if (d) {
              maybeRealpath(realpath, d, opts, function(err4, realD) {
                if (err4) {
                  cb(err4);
                } else {
                  cb(null, realD, pkg2);
                }
              });
            } else {
              var moduleError = new Error("Cannot find module '" + x + "' from '" + parent + "'");
              moduleError.code = "MODULE_NOT_FOUND";
              cb(moduleError);
            }
          });
      }
      function loadAsFile(x2, thePackage, callback2) {
        var loadAsFilePackage = thePackage;
        var cb2 = callback2;
        if (typeof loadAsFilePackage === "function") {
          cb2 = loadAsFilePackage;
          loadAsFilePackage = void 0;
        }
        var exts = [""].concat(extensions);
        load(exts, x2, loadAsFilePackage);
        function load(exts2, x3, loadPackage) {
          if (exts2.length === 0)
            return cb2(null, void 0, loadPackage);
          var file = x3 + exts2[0];
          var pkg = loadPackage;
          if (pkg)
            onpkg(null, pkg);
          else
            loadpkg(path.dirname(file), onpkg);
          function onpkg(err2, pkg_, dir) {
            pkg = pkg_;
            if (err2)
              return cb2(err2);
            if (dir && pkg && opts.pathFilter) {
              var rfile = path.relative(dir, file);
              var rel = rfile.slice(0, rfile.length - exts2[0].length);
              var r = opts.pathFilter(pkg, x3, rel);
              if (r)
                return load(
                  [""].concat(extensions.slice()),
                  path.resolve(dir, r),
                  pkg
                );
            }
            isFile(file, onex);
          }
          function onex(err2, ex) {
            if (err2)
              return cb2(err2);
            if (ex)
              return cb2(null, file, pkg);
            load(exts2.slice(1), x3, pkg);
          }
        }
      }
      function loadpkg(dir, cb2) {
        if (dir === "" || dir === "/")
          return cb2(null);
        if (process.platform === "win32" && /^\w:[/\\]*$/.test(dir)) {
          return cb2(null);
        }
        if (/[/\\]node_modules[/\\]*$/.test(dir))
          return cb2(null);
        maybeRealpath(realpath, dir, opts, function(unwrapErr, pkgdir) {
          if (unwrapErr)
            return loadpkg(path.dirname(dir), cb2);
          var pkgfile = path.join(pkgdir, "package.json");
          isFile(pkgfile, function(err2, ex) {
            if (!ex)
              return loadpkg(path.dirname(dir), cb2);
            readPackage(readFile, pkgfile, function(err3, pkgParam) {
              if (err3)
                cb2(err3);
              var pkg = pkgParam;
              if (pkg && opts.packageFilter) {
                pkg = opts.packageFilter(pkg, pkgfile);
              }
              cb2(null, pkg, dir);
            });
          });
        });
      }
      function loadAsDirectory(x2, loadAsDirectoryPackage, callback2) {
        var cb2 = callback2;
        var fpkg = loadAsDirectoryPackage;
        if (typeof fpkg === "function") {
          cb2 = fpkg;
          fpkg = opts.package;
        }
        maybeRealpath(realpath, x2, opts, function(unwrapErr, pkgdir) {
          if (unwrapErr)
            return cb2(unwrapErr);
          var pkgfile = path.join(pkgdir, "package.json");
          isFile(pkgfile, function(err2, ex) {
            if (err2)
              return cb2(err2);
            if (!ex)
              return loadAsFile(path.join(x2, "index"), fpkg, cb2);
            readPackage(readFile, pkgfile, function(err3, pkgParam) {
              if (err3)
                return cb2(err3);
              var pkg = pkgParam;
              if (pkg && opts.packageFilter) {
                pkg = opts.packageFilter(pkg, pkgfile);
              }
              if (pkg && pkg.main) {
                if (typeof pkg.main !== "string") {
                  var mainError = new TypeError("package \u201C" + pkg.name + "\u201D `main` must be a string");
                  mainError.code = "INVALID_PACKAGE_MAIN";
                  return cb2(mainError);
                }
                if (pkg.main === "." || pkg.main === "./") {
                  pkg.main = "index";
                }
                loadAsFile(path.resolve(x2, pkg.main), pkg, function(err4, m, pkg2) {
                  if (err4)
                    return cb2(err4);
                  if (m)
                    return cb2(null, m, pkg2);
                  if (!pkg2)
                    return loadAsFile(path.join(x2, "index"), pkg2, cb2);
                  var dir = path.resolve(x2, pkg2.main);
                  loadAsDirectory(dir, pkg2, function(err5, n, pkg3) {
                    if (err5)
                      return cb2(err5);
                    if (n)
                      return cb2(null, n, pkg3);
                    loadAsFile(path.join(x2, "index"), pkg3, cb2);
                  });
                });
                return;
              }
              loadAsFile(path.join(x2, "/index"), pkg, cb2);
            });
          });
        });
      }
      function processDirs(cb2, dirs) {
        if (dirs.length === 0)
          return cb2(null, void 0);
        var dir = dirs[0];
        isDirectory(path.dirname(dir), isdir);
        function isdir(err2, isdir2) {
          if (err2)
            return cb2(err2);
          if (!isdir2)
            return processDirs(cb2, dirs.slice(1));
          loadAsFile(dir, opts.package, onfile2);
        }
        function onfile2(err2, m, pkg) {
          if (err2)
            return cb2(err2);
          if (m)
            return cb2(null, m, pkg);
          loadAsDirectory(dir, opts.package, ondir);
        }
        function ondir(err2, n, pkg) {
          if (err2)
            return cb2(err2);
          if (n)
            return cb2(null, n, pkg);
          processDirs(cb2, dirs.slice(1));
        }
      }
      function loadNodeModules(x2, start, cb2) {
        var thunk = function() {
          return getPackageCandidates(x2, start, opts);
        };
        processDirs(
          cb2,
          packageIterator ? packageIterator(x2, start, thunk, opts) : thunk()
        );
      }
    };
  }
});

// node_modules/resolve/lib/core.json
var require_core2 = __commonJS({
  "node_modules/resolve/lib/core.json"(exports, module2) {
    module2.exports = {
      assert: true,
      "node:assert": [">= 14.18 && < 15", ">= 16"],
      "assert/strict": ">= 15",
      "node:assert/strict": ">= 16",
      async_hooks: ">= 8",
      "node:async_hooks": [">= 14.18 && < 15", ">= 16"],
      buffer_ieee754: ">= 0.5 && < 0.9.7",
      buffer: true,
      "node:buffer": [">= 14.18 && < 15", ">= 16"],
      child_process: true,
      "node:child_process": [">= 14.18 && < 15", ">= 16"],
      cluster: ">= 0.5",
      "node:cluster": [">= 14.18 && < 15", ">= 16"],
      console: true,
      "node:console": [">= 14.18 && < 15", ">= 16"],
      constants: true,
      "node:constants": [">= 14.18 && < 15", ">= 16"],
      crypto: true,
      "node:crypto": [">= 14.18 && < 15", ">= 16"],
      _debug_agent: ">= 1 && < 8",
      _debugger: "< 8",
      dgram: true,
      "node:dgram": [">= 14.18 && < 15", ">= 16"],
      diagnostics_channel: [">= 14.17 && < 15", ">= 15.1"],
      "node:diagnostics_channel": [">= 14.18 && < 15", ">= 16"],
      dns: true,
      "node:dns": [">= 14.18 && < 15", ">= 16"],
      "dns/promises": ">= 15",
      "node:dns/promises": ">= 16",
      domain: ">= 0.7.12",
      "node:domain": [">= 14.18 && < 15", ">= 16"],
      events: true,
      "node:events": [">= 14.18 && < 15", ">= 16"],
      freelist: "< 6",
      fs: true,
      "node:fs": [">= 14.18 && < 15", ">= 16"],
      "fs/promises": [">= 10 && < 10.1", ">= 14"],
      "node:fs/promises": [">= 14.18 && < 15", ">= 16"],
      _http_agent: ">= 0.11.1",
      "node:_http_agent": [">= 14.18 && < 15", ">= 16"],
      _http_client: ">= 0.11.1",
      "node:_http_client": [">= 14.18 && < 15", ">= 16"],
      _http_common: ">= 0.11.1",
      "node:_http_common": [">= 14.18 && < 15", ">= 16"],
      _http_incoming: ">= 0.11.1",
      "node:_http_incoming": [">= 14.18 && < 15", ">= 16"],
      _http_outgoing: ">= 0.11.1",
      "node:_http_outgoing": [">= 14.18 && < 15", ">= 16"],
      _http_server: ">= 0.11.1",
      "node:_http_server": [">= 14.18 && < 15", ">= 16"],
      http: true,
      "node:http": [">= 14.18 && < 15", ">= 16"],
      http2: ">= 8.8",
      "node:http2": [">= 14.18 && < 15", ">= 16"],
      https: true,
      "node:https": [">= 14.18 && < 15", ">= 16"],
      inspector: ">= 8",
      "node:inspector": [">= 14.18 && < 15", ">= 16"],
      _linklist: "< 8",
      module: true,
      "node:module": [">= 14.18 && < 15", ">= 16"],
      net: true,
      "node:net": [">= 14.18 && < 15", ">= 16"],
      "node-inspect/lib/_inspect": ">= 7.6 && < 12",
      "node-inspect/lib/internal/inspect_client": ">= 7.6 && < 12",
      "node-inspect/lib/internal/inspect_repl": ">= 7.6 && < 12",
      os: true,
      "node:os": [">= 14.18 && < 15", ">= 16"],
      path: true,
      "node:path": [">= 14.18 && < 15", ">= 16"],
      "path/posix": ">= 15.3",
      "node:path/posix": ">= 16",
      "path/win32": ">= 15.3",
      "node:path/win32": ">= 16",
      perf_hooks: ">= 8.5",
      "node:perf_hooks": [">= 14.18 && < 15", ">= 16"],
      process: ">= 1",
      "node:process": [">= 14.18 && < 15", ">= 16"],
      punycode: ">= 0.5",
      "node:punycode": [">= 14.18 && < 15", ">= 16"],
      querystring: true,
      "node:querystring": [">= 14.18 && < 15", ">= 16"],
      readline: true,
      "node:readline": [">= 14.18 && < 15", ">= 16"],
      "readline/promises": ">= 17",
      "node:readline/promises": ">= 17",
      repl: true,
      "node:repl": [">= 14.18 && < 15", ">= 16"],
      smalloc: ">= 0.11.5 && < 3",
      _stream_duplex: ">= 0.9.4",
      "node:_stream_duplex": [">= 14.18 && < 15", ">= 16"],
      _stream_transform: ">= 0.9.4",
      "node:_stream_transform": [">= 14.18 && < 15", ">= 16"],
      _stream_wrap: ">= 1.4.1",
      "node:_stream_wrap": [">= 14.18 && < 15", ">= 16"],
      _stream_passthrough: ">= 0.9.4",
      "node:_stream_passthrough": [">= 14.18 && < 15", ">= 16"],
      _stream_readable: ">= 0.9.4",
      "node:_stream_readable": [">= 14.18 && < 15", ">= 16"],
      _stream_writable: ">= 0.9.4",
      "node:_stream_writable": [">= 14.18 && < 15", ">= 16"],
      stream: true,
      "node:stream": [">= 14.18 && < 15", ">= 16"],
      "stream/consumers": ">= 16.7",
      "node:stream/consumers": ">= 16.7",
      "stream/promises": ">= 15",
      "node:stream/promises": ">= 16",
      "stream/web": ">= 16.5",
      "node:stream/web": ">= 16.5",
      string_decoder: true,
      "node:string_decoder": [">= 14.18 && < 15", ">= 16"],
      sys: [">= 0.4 && < 0.7", ">= 0.8"],
      "node:sys": [">= 14.18 && < 15", ">= 16"],
      "node:test": ">= 18",
      timers: true,
      "node:timers": [">= 14.18 && < 15", ">= 16"],
      "timers/promises": ">= 15",
      "node:timers/promises": ">= 16",
      _tls_common: ">= 0.11.13",
      "node:_tls_common": [">= 14.18 && < 15", ">= 16"],
      _tls_legacy: ">= 0.11.3 && < 10",
      _tls_wrap: ">= 0.11.3",
      "node:_tls_wrap": [">= 14.18 && < 15", ">= 16"],
      tls: true,
      "node:tls": [">= 14.18 && < 15", ">= 16"],
      trace_events: ">= 10",
      "node:trace_events": [">= 14.18 && < 15", ">= 16"],
      tty: true,
      "node:tty": [">= 14.18 && < 15", ">= 16"],
      url: true,
      "node:url": [">= 14.18 && < 15", ">= 16"],
      util: true,
      "node:util": [">= 14.18 && < 15", ">= 16"],
      "util/types": ">= 15.3",
      "node:util/types": ">= 16",
      "v8/tools/arguments": ">= 10 && < 12",
      "v8/tools/codemap": [">= 4.4 && < 5", ">= 5.2 && < 12"],
      "v8/tools/consarray": [">= 4.4 && < 5", ">= 5.2 && < 12"],
      "v8/tools/csvparser": [">= 4.4 && < 5", ">= 5.2 && < 12"],
      "v8/tools/logreader": [">= 4.4 && < 5", ">= 5.2 && < 12"],
      "v8/tools/profile_view": [">= 4.4 && < 5", ">= 5.2 && < 12"],
      "v8/tools/splaytree": [">= 4.4 && < 5", ">= 5.2 && < 12"],
      v8: ">= 1",
      "node:v8": [">= 14.18 && < 15", ">= 16"],
      vm: true,
      "node:vm": [">= 14.18 && < 15", ">= 16"],
      wasi: ">= 13.4 && < 13.5",
      worker_threads: ">= 11.7",
      "node:worker_threads": [">= 14.18 && < 15", ">= 16"],
      zlib: ">= 0.5",
      "node:zlib": [">= 14.18 && < 15", ">= 16"]
    };
  }
});

// node_modules/resolve/lib/core.js
var require_core3 = __commonJS({
  "node_modules/resolve/lib/core.js"(exports, module2) {
    var current = process.versions && process.versions.node && process.versions.node.split(".") || [];
    function specifierIncluded(specifier) {
      var parts = specifier.split(" ");
      var op = parts.length > 1 ? parts[0] : "=";
      var versionParts = (parts.length > 1 ? parts[1] : parts[0]).split(".");
      for (var i = 0; i < 3; ++i) {
        var cur = parseInt(current[i] || 0, 10);
        var ver = parseInt(versionParts[i] || 0, 10);
        if (cur === ver) {
          continue;
        }
        if (op === "<") {
          return cur < ver;
        } else if (op === ">=") {
          return cur >= ver;
        }
        return false;
      }
      return op === ">=";
    }
    function matchesRange(range) {
      var specifiers = range.split(/ ?&& ?/);
      if (specifiers.length === 0) {
        return false;
      }
      for (var i = 0; i < specifiers.length; ++i) {
        if (!specifierIncluded(specifiers[i])) {
          return false;
        }
      }
      return true;
    }
    function versionIncluded(specifierValue) {
      if (typeof specifierValue === "boolean") {
        return specifierValue;
      }
      if (specifierValue && typeof specifierValue === "object") {
        for (var i = 0; i < specifierValue.length; ++i) {
          if (matchesRange(specifierValue[i])) {
            return true;
          }
        }
        return false;
      }
      return matchesRange(specifierValue);
    }
    var data = require_core2();
    var core = {};
    for (mod in data) {
      if (Object.prototype.hasOwnProperty.call(data, mod)) {
        core[mod] = versionIncluded(data[mod]);
      }
    }
    var mod;
    module2.exports = core;
  }
});

// node_modules/resolve/lib/is-core.js
var require_is_core = __commonJS({
  "node_modules/resolve/lib/is-core.js"(exports, module2) {
    var isCoreModule = require_is_core_module();
    module2.exports = function isCore(x) {
      return isCoreModule(x);
    };
  }
});

// node_modules/resolve/lib/sync.js
var require_sync = __commonJS({
  "node_modules/resolve/lib/sync.js"(exports, module2) {
    var isCore = require_is_core_module();
    var fs = require("fs");
    var path = require("path");
    var getHomedir = require_homedir();
    var caller = require_caller();
    var nodeModulesPaths = require_node_modules_paths();
    var normalizeOptions = require_normalize_options();
    var realpathFS = process.platform !== "win32" && fs.realpathSync && typeof fs.realpathSync.native === "function" ? fs.realpathSync.native : fs.realpathSync;
    var homedir = getHomedir();
    var defaultPaths = function() {
      return [
        path.join(homedir, ".node_modules"),
        path.join(homedir, ".node_libraries")
      ];
    };
    var defaultIsFile = function isFile(file) {
      try {
        var stat = fs.statSync(file, { throwIfNoEntry: false });
      } catch (e) {
        if (e && (e.code === "ENOENT" || e.code === "ENOTDIR"))
          return false;
        throw e;
      }
      return !!stat && (stat.isFile() || stat.isFIFO());
    };
    var defaultIsDir = function isDirectory(dir) {
      try {
        var stat = fs.statSync(dir, { throwIfNoEntry: false });
      } catch (e) {
        if (e && (e.code === "ENOENT" || e.code === "ENOTDIR"))
          return false;
        throw e;
      }
      return !!stat && stat.isDirectory();
    };
    var defaultRealpathSync = function realpathSync(x) {
      try {
        return realpathFS(x);
      } catch (realpathErr) {
        if (realpathErr.code !== "ENOENT") {
          throw realpathErr;
        }
      }
      return x;
    };
    var maybeRealpathSync = function maybeRealpathSync2(realpathSync, x, opts) {
      if (opts && opts.preserveSymlinks === false) {
        return realpathSync(x);
      }
      return x;
    };
    var defaultReadPackageSync = function defaultReadPackageSync2(readFileSync, pkgfile) {
      var body = readFileSync(pkgfile);
      try {
        var pkg = JSON.parse(body);
        return pkg;
      } catch (jsonErr) {
      }
    };
    var getPackageCandidates = function getPackageCandidates2(x, start, opts) {
      var dirs = nodeModulesPaths(start, opts, x);
      for (var i = 0; i < dirs.length; i++) {
        dirs[i] = path.join(dirs[i], x);
      }
      return dirs;
    };
    module2.exports = function resolveSync(x, options) {
      if (typeof x !== "string") {
        throw new TypeError("Path must be a string.");
      }
      var opts = normalizeOptions(x, options);
      var isFile = opts.isFile || defaultIsFile;
      var readFileSync = opts.readFileSync || fs.readFileSync;
      var isDirectory = opts.isDirectory || defaultIsDir;
      var realpathSync = opts.realpathSync || defaultRealpathSync;
      var readPackageSync = opts.readPackageSync || defaultReadPackageSync;
      if (opts.readFileSync && opts.readPackageSync) {
        throw new TypeError("`readFileSync` and `readPackageSync` are mutually exclusive.");
      }
      var packageIterator = opts.packageIterator;
      var extensions = opts.extensions || [".js"];
      var includeCoreModules = opts.includeCoreModules !== false;
      var basedir = opts.basedir || path.dirname(caller());
      var parent = opts.filename || basedir;
      opts.paths = opts.paths || defaultPaths();
      var absoluteStart = maybeRealpathSync(realpathSync, path.resolve(basedir), opts);
      if (/^(?:\.\.?(?:\/|$)|\/|([A-Za-z]:)?[/\\])/.test(x)) {
        var res = path.resolve(absoluteStart, x);
        if (x === "." || x === ".." || x.slice(-1) === "/")
          res += "/";
        var m = loadAsFileSync(res) || loadAsDirectorySync(res);
        if (m)
          return maybeRealpathSync(realpathSync, m, opts);
      } else if (includeCoreModules && isCore(x)) {
        return x;
      } else {
        var n = loadNodeModulesSync(x, absoluteStart);
        if (n)
          return maybeRealpathSync(realpathSync, n, opts);
      }
      var err = new Error("Cannot find module '" + x + "' from '" + parent + "'");
      err.code = "MODULE_NOT_FOUND";
      throw err;
      function loadAsFileSync(x2) {
        var pkg = loadpkg(path.dirname(x2));
        if (pkg && pkg.dir && pkg.pkg && opts.pathFilter) {
          var rfile = path.relative(pkg.dir, x2);
          var r = opts.pathFilter(pkg.pkg, x2, rfile);
          if (r) {
            x2 = path.resolve(pkg.dir, r);
          }
        }
        if (isFile(x2)) {
          return x2;
        }
        for (var i = 0; i < extensions.length; i++) {
          var file = x2 + extensions[i];
          if (isFile(file)) {
            return file;
          }
        }
      }
      function loadpkg(dir) {
        if (dir === "" || dir === "/")
          return;
        if (process.platform === "win32" && /^\w:[/\\]*$/.test(dir)) {
          return;
        }
        if (/[/\\]node_modules[/\\]*$/.test(dir))
          return;
        var pkgfile = path.join(maybeRealpathSync(realpathSync, dir, opts), "package.json");
        if (!isFile(pkgfile)) {
          return loadpkg(path.dirname(dir));
        }
        var pkg = readPackageSync(readFileSync, pkgfile);
        if (pkg && opts.packageFilter) {
          pkg = opts.packageFilter(
            pkg,
            /*pkgfile,*/
            dir
          );
        }
        return { pkg, dir };
      }
      function loadAsDirectorySync(x2) {
        var pkgfile = path.join(maybeRealpathSync(realpathSync, x2, opts), "/package.json");
        if (isFile(pkgfile)) {
          try {
            var pkg = readPackageSync(readFileSync, pkgfile);
          } catch (e) {
          }
          if (pkg && opts.packageFilter) {
            pkg = opts.packageFilter(
              pkg,
              /*pkgfile,*/
              x2
            );
          }
          if (pkg && pkg.main) {
            if (typeof pkg.main !== "string") {
              var mainError = new TypeError("package \u201C" + pkg.name + "\u201D `main` must be a string");
              mainError.code = "INVALID_PACKAGE_MAIN";
              throw mainError;
            }
            if (pkg.main === "." || pkg.main === "./") {
              pkg.main = "index";
            }
            try {
              var m2 = loadAsFileSync(path.resolve(x2, pkg.main));
              if (m2)
                return m2;
              var n2 = loadAsDirectorySync(path.resolve(x2, pkg.main));
              if (n2)
                return n2;
            } catch (e) {
            }
          }
        }
        return loadAsFileSync(path.join(x2, "/index"));
      }
      function loadNodeModulesSync(x2, start) {
        var thunk = function() {
          return getPackageCandidates(x2, start, opts);
        };
        var dirs = packageIterator ? packageIterator(x2, start, thunk, opts) : thunk();
        for (var i = 0; i < dirs.length; i++) {
          var dir = dirs[i];
          if (isDirectory(path.dirname(dir))) {
            var m2 = loadAsFileSync(dir);
            if (m2)
              return m2;
            var n2 = loadAsDirectorySync(dir);
            if (n2)
              return n2;
          }
        }
      }
    };
  }
});

// node_modules/resolve/index.js
var require_resolve = __commonJS({
  "node_modules/resolve/index.js"(exports, module2) {
    var async = require_async();
    async.core = require_core3();
    async.isCore = require_is_core();
    async.sync = require_sync();
    module2.exports = async;
  }
});

// node_modules/ms/index.js
var require_ms = __commonJS({
  "node_modules/ms/index.js"(exports, module2) {
    var s = 1e3;
    var m = s * 60;
    var h = m * 60;
    var d = h * 24;
    var w = d * 7;
    var y = d * 365.25;
    module2.exports = function(val, options) {
      options = options || {};
      var type = typeof val;
      if (type === "string" && val.length > 0) {
        return parse(val);
      } else if (type === "number" && isFinite(val)) {
        return options.long ? fmtLong(val) : fmtShort(val);
      }
      throw new Error(
        "val is not a non-empty string or a valid number. val=" + JSON.stringify(val)
      );
    };
    function parse(str) {
      str = String(str);
      if (str.length > 100) {
        return;
      }
      var match = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(
        str
      );
      if (!match) {
        return;
      }
      var n = parseFloat(match[1]);
      var type = (match[2] || "ms").toLowerCase();
      switch (type) {
        case "years":
        case "year":
        case "yrs":
        case "yr":
        case "y":
          return n * y;
        case "weeks":
        case "week":
        case "w":
          return n * w;
        case "days":
        case "day":
        case "d":
          return n * d;
        case "hours":
        case "hour":
        case "hrs":
        case "hr":
        case "h":
          return n * h;
        case "minutes":
        case "minute":
        case "mins":
        case "min":
        case "m":
          return n * m;
        case "seconds":
        case "second":
        case "secs":
        case "sec":
        case "s":
          return n * s;
        case "milliseconds":
        case "millisecond":
        case "msecs":
        case "msec":
        case "ms":
          return n;
        default:
          return void 0;
      }
    }
    function fmtShort(ms) {
      var msAbs = Math.abs(ms);
      if (msAbs >= d) {
        return Math.round(ms / d) + "d";
      }
      if (msAbs >= h) {
        return Math.round(ms / h) + "h";
      }
      if (msAbs >= m) {
        return Math.round(ms / m) + "m";
      }
      if (msAbs >= s) {
        return Math.round(ms / s) + "s";
      }
      return ms + "ms";
    }
    function fmtLong(ms) {
      var msAbs = Math.abs(ms);
      if (msAbs >= d) {
        return plural(ms, msAbs, d, "day");
      }
      if (msAbs >= h) {
        return plural(ms, msAbs, h, "hour");
      }
      if (msAbs >= m) {
        return plural(ms, msAbs, m, "minute");
      }
      if (msAbs >= s) {
        return plural(ms, msAbs, s, "second");
      }
      return ms + " ms";
    }
    function plural(ms, msAbs, n, name) {
      var isPlural = msAbs >= n * 1.5;
      return Math.round(ms / n) + " " + name + (isPlural ? "s" : "");
    }
  }
});

// node_modules/debug/src/common.js
var require_common = __commonJS({
  "node_modules/debug/src/common.js"(exports, module2) {
    function setup(env) {
      createDebug.debug = createDebug;
      createDebug.default = createDebug;
      createDebug.coerce = coerce;
      createDebug.disable = disable;
      createDebug.enable = enable;
      createDebug.enabled = enabled;
      createDebug.humanize = require_ms();
      createDebug.destroy = destroy;
      Object.keys(env).forEach((key) => {
        createDebug[key] = env[key];
      });
      createDebug.names = [];
      createDebug.skips = [];
      createDebug.formatters = {};
      function selectColor(namespace) {
        let hash = 0;
        for (let i = 0; i < namespace.length; i++) {
          hash = (hash << 5) - hash + namespace.charCodeAt(i);
          hash |= 0;
        }
        return createDebug.colors[Math.abs(hash) % createDebug.colors.length];
      }
      createDebug.selectColor = selectColor;
      function createDebug(namespace) {
        let prevTime;
        let enableOverride = null;
        let namespacesCache;
        let enabledCache;
        function debug(...args) {
          if (!debug.enabled) {
            return;
          }
          const self2 = debug;
          const curr = Number(new Date());
          const ms = curr - (prevTime || curr);
          self2.diff = ms;
          self2.prev = prevTime;
          self2.curr = curr;
          prevTime = curr;
          args[0] = createDebug.coerce(args[0]);
          if (typeof args[0] !== "string") {
            args.unshift("%O");
          }
          let index = 0;
          args[0] = args[0].replace(/%([a-zA-Z%])/g, (match, format) => {
            if (match === "%%") {
              return "%";
            }
            index++;
            const formatter = createDebug.formatters[format];
            if (typeof formatter === "function") {
              const val = args[index];
              match = formatter.call(self2, val);
              args.splice(index, 1);
              index--;
            }
            return match;
          });
          createDebug.formatArgs.call(self2, args);
          const logFn = self2.log || createDebug.log;
          logFn.apply(self2, args);
        }
        debug.namespace = namespace;
        debug.useColors = createDebug.useColors();
        debug.color = createDebug.selectColor(namespace);
        debug.extend = extend;
        debug.destroy = createDebug.destroy;
        Object.defineProperty(debug, "enabled", {
          enumerable: true,
          configurable: false,
          get: () => {
            if (enableOverride !== null) {
              return enableOverride;
            }
            if (namespacesCache !== createDebug.namespaces) {
              namespacesCache = createDebug.namespaces;
              enabledCache = createDebug.enabled(namespace);
            }
            return enabledCache;
          },
          set: (v) => {
            enableOverride = v;
          }
        });
        if (typeof createDebug.init === "function") {
          createDebug.init(debug);
        }
        return debug;
      }
      function extend(namespace, delimiter) {
        const newDebug = createDebug(this.namespace + (typeof delimiter === "undefined" ? ":" : delimiter) + namespace);
        newDebug.log = this.log;
        return newDebug;
      }
      function enable(namespaces) {
        createDebug.save(namespaces);
        createDebug.namespaces = namespaces;
        createDebug.names = [];
        createDebug.skips = [];
        let i;
        const split = (typeof namespaces === "string" ? namespaces : "").split(/[\s,]+/);
        const len = split.length;
        for (i = 0; i < len; i++) {
          if (!split[i]) {
            continue;
          }
          namespaces = split[i].replace(/\*/g, ".*?");
          if (namespaces[0] === "-") {
            createDebug.skips.push(new RegExp("^" + namespaces.slice(1) + "$"));
          } else {
            createDebug.names.push(new RegExp("^" + namespaces + "$"));
          }
        }
      }
      function disable() {
        const namespaces = [
          ...createDebug.names.map(toNamespace),
          ...createDebug.skips.map(toNamespace).map((namespace) => "-" + namespace)
        ].join(",");
        createDebug.enable("");
        return namespaces;
      }
      function enabled(name) {
        if (name[name.length - 1] === "*") {
          return true;
        }
        let i;
        let len;
        for (i = 0, len = createDebug.skips.length; i < len; i++) {
          if (createDebug.skips[i].test(name)) {
            return false;
          }
        }
        for (i = 0, len = createDebug.names.length; i < len; i++) {
          if (createDebug.names[i].test(name)) {
            return true;
          }
        }
        return false;
      }
      function toNamespace(regexp) {
        return regexp.toString().substring(2, regexp.toString().length - 2).replace(/\.\*\?$/, "*");
      }
      function coerce(val) {
        if (val instanceof Error) {
          return val.stack || val.message;
        }
        return val;
      }
      function destroy() {
        console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
      }
      createDebug.enable(createDebug.load());
      return createDebug;
    }
    module2.exports = setup;
  }
});

// node_modules/debug/src/browser.js
var require_browser = __commonJS({
  "node_modules/debug/src/browser.js"(exports, module2) {
    exports.formatArgs = formatArgs;
    exports.save = save;
    exports.load = load;
    exports.useColors = useColors;
    exports.storage = localstorage();
    exports.destroy = (() => {
      let warned = false;
      return () => {
        if (!warned) {
          warned = true;
          console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
        }
      };
    })();
    exports.colors = [
      "#0000CC",
      "#0000FF",
      "#0033CC",
      "#0033FF",
      "#0066CC",
      "#0066FF",
      "#0099CC",
      "#0099FF",
      "#00CC00",
      "#00CC33",
      "#00CC66",
      "#00CC99",
      "#00CCCC",
      "#00CCFF",
      "#3300CC",
      "#3300FF",
      "#3333CC",
      "#3333FF",
      "#3366CC",
      "#3366FF",
      "#3399CC",
      "#3399FF",
      "#33CC00",
      "#33CC33",
      "#33CC66",
      "#33CC99",
      "#33CCCC",
      "#33CCFF",
      "#6600CC",
      "#6600FF",
      "#6633CC",
      "#6633FF",
      "#66CC00",
      "#66CC33",
      "#9900CC",
      "#9900FF",
      "#9933CC",
      "#9933FF",
      "#99CC00",
      "#99CC33",
      "#CC0000",
      "#CC0033",
      "#CC0066",
      "#CC0099",
      "#CC00CC",
      "#CC00FF",
      "#CC3300",
      "#CC3333",
      "#CC3366",
      "#CC3399",
      "#CC33CC",
      "#CC33FF",
      "#CC6600",
      "#CC6633",
      "#CC9900",
      "#CC9933",
      "#CCCC00",
      "#CCCC33",
      "#FF0000",
      "#FF0033",
      "#FF0066",
      "#FF0099",
      "#FF00CC",
      "#FF00FF",
      "#FF3300",
      "#FF3333",
      "#FF3366",
      "#FF3399",
      "#FF33CC",
      "#FF33FF",
      "#FF6600",
      "#FF6633",
      "#FF9900",
      "#FF9933",
      "#FFCC00",
      "#FFCC33"
    ];
    function useColors() {
      if (typeof window !== "undefined" && window.process && (window.process.type === "renderer" || window.process.__nwjs)) {
        return true;
      }
      if (typeof navigator !== "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)) {
        return false;
      }
      return typeof document !== "undefined" && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || typeof window !== "undefined" && window.console && (window.console.firebug || window.console.exception && window.console.table) || typeof navigator !== "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31 || typeof navigator !== "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/);
    }
    function formatArgs(args) {
      args[0] = (this.useColors ? "%c" : "") + this.namespace + (this.useColors ? " %c" : " ") + args[0] + (this.useColors ? "%c " : " ") + "+" + module2.exports.humanize(this.diff);
      if (!this.useColors) {
        return;
      }
      const c = "color: " + this.color;
      args.splice(1, 0, c, "color: inherit");
      let index = 0;
      let lastC = 0;
      args[0].replace(/%[a-zA-Z%]/g, (match) => {
        if (match === "%%") {
          return;
        }
        index++;
        if (match === "%c") {
          lastC = index;
        }
      });
      args.splice(lastC, 0, c);
    }
    exports.log = console.debug || console.log || (() => {
    });
    function save(namespaces) {
      try {
        if (namespaces) {
          exports.storage.setItem("debug", namespaces);
        } else {
          exports.storage.removeItem("debug");
        }
      } catch (error) {
      }
    }
    function load() {
      let r;
      try {
        r = exports.storage.getItem("debug");
      } catch (error) {
      }
      if (!r && typeof process !== "undefined" && "env" in process) {
        r = process.env.DEBUG;
      }
      return r;
    }
    function localstorage() {
      try {
        return localStorage;
      } catch (error) {
      }
    }
    module2.exports = require_common()(exports);
    var { formatters } = module2.exports;
    formatters.j = function(v) {
      try {
        return JSON.stringify(v);
      } catch (error) {
        return "[UnexpectedJSONParseError]: " + error.message;
      }
    };
  }
});

// node_modules/debug/src/node.js
var require_node3 = __commonJS({
  "node_modules/debug/src/node.js"(exports, module2) {
    var tty = require("tty");
    var util = require("util");
    exports.init = init;
    exports.log = log;
    exports.formatArgs = formatArgs;
    exports.save = save;
    exports.load = load;
    exports.useColors = useColors;
    exports.destroy = util.deprecate(
      () => {
      },
      "Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."
    );
    exports.colors = [6, 2, 3, 4, 5, 1];
    try {
      const supportsColor = require("supports-color");
      if (supportsColor && (supportsColor.stderr || supportsColor).level >= 2) {
        exports.colors = [
          20,
          21,
          26,
          27,
          32,
          33,
          38,
          39,
          40,
          41,
          42,
          43,
          44,
          45,
          56,
          57,
          62,
          63,
          68,
          69,
          74,
          75,
          76,
          77,
          78,
          79,
          80,
          81,
          92,
          93,
          98,
          99,
          112,
          113,
          128,
          129,
          134,
          135,
          148,
          149,
          160,
          161,
          162,
          163,
          164,
          165,
          166,
          167,
          168,
          169,
          170,
          171,
          172,
          173,
          178,
          179,
          184,
          185,
          196,
          197,
          198,
          199,
          200,
          201,
          202,
          203,
          204,
          205,
          206,
          207,
          208,
          209,
          214,
          215,
          220,
          221
        ];
      }
    } catch (error) {
    }
    exports.inspectOpts = Object.keys(process.env).filter((key) => {
      return /^debug_/i.test(key);
    }).reduce((obj, key) => {
      const prop = key.substring(6).toLowerCase().replace(/_([a-z])/g, (_, k) => {
        return k.toUpperCase();
      });
      let val = process.env[key];
      if (/^(yes|on|true|enabled)$/i.test(val)) {
        val = true;
      } else if (/^(no|off|false|disabled)$/i.test(val)) {
        val = false;
      } else if (val === "null") {
        val = null;
      } else {
        val = Number(val);
      }
      obj[prop] = val;
      return obj;
    }, {});
    function useColors() {
      return "colors" in exports.inspectOpts ? Boolean(exports.inspectOpts.colors) : tty.isatty(process.stderr.fd);
    }
    function formatArgs(args) {
      const { namespace: name, useColors: useColors2 } = this;
      if (useColors2) {
        const c = this.color;
        const colorCode = "\x1B[3" + (c < 8 ? c : "8;5;" + c);
        const prefix = `  ${colorCode};1m${name} \x1B[0m`;
        args[0] = prefix + args[0].split("\n").join("\n" + prefix);
        args.push(colorCode + "m+" + module2.exports.humanize(this.diff) + "\x1B[0m");
      } else {
        args[0] = getDate() + name + " " + args[0];
      }
    }
    function getDate() {
      if (exports.inspectOpts.hideDate) {
        return "";
      }
      return new Date().toISOString() + " ";
    }
    function log(...args) {
      return process.stderr.write(util.format(...args) + "\n");
    }
    function save(namespaces) {
      if (namespaces) {
        process.env.DEBUG = namespaces;
      } else {
        delete process.env.DEBUG;
      }
    }
    function load() {
      return process.env.DEBUG;
    }
    function init(debug) {
      debug.inspectOpts = {};
      const keys = Object.keys(exports.inspectOpts);
      for (let i = 0; i < keys.length; i++) {
        debug.inspectOpts[keys[i]] = exports.inspectOpts[keys[i]];
      }
    }
    module2.exports = require_common()(exports);
    var { formatters } = module2.exports;
    formatters.o = function(v) {
      this.inspectOpts.colors = this.useColors;
      return util.inspect(v, this.inspectOpts).split("\n").map((str) => str.trim()).join(" ");
    };
    formatters.O = function(v) {
      this.inspectOpts.colors = this.useColors;
      return util.inspect(v, this.inspectOpts);
    };
  }
});

// node_modules/debug/src/index.js
var require_src5 = __commonJS({
  "node_modules/debug/src/index.js"(exports, module2) {
    if (typeof process === "undefined" || process.type === "renderer" || process.browser === true || process.__nwjs) {
      module2.exports = require_browser();
    } else {
      module2.exports = require_node3();
    }
  }
});

// node_modules/module-details-from-path/index.js
var require_module_details_from_path = __commonJS({
  "node_modules/module-details-from-path/index.js"(exports, module2) {
    "use strict";
    var path = require("path");
    module2.exports = function(file) {
      var segments = file.split(path.sep);
      var index = segments.lastIndexOf("node_modules");
      if (index === -1)
        return;
      if (!segments[index + 1])
        return;
      var scoped = segments[index + 1][0] === "@";
      var name = scoped ? segments[index + 1] + "/" + segments[index + 2] : segments[index + 1];
      var offset = scoped ? 3 : 2;
      return {
        name,
        basedir: segments.slice(0, index + offset).join(path.sep),
        path: segments.slice(index + offset).join(path.sep)
      };
    };
  }
});

// node_modules/require-in-the-middle/package.json
var require_package = __commonJS({
  "node_modules/require-in-the-middle/package.json"(exports, module2) {
    module2.exports = {
      name: "require-in-the-middle",
      version: "5.2.0",
      description: "Module to hook into the Node.js require function",
      main: "index.js",
      dependencies: {
        debug: "^4.1.1",
        "module-details-from-path": "^1.0.3",
        resolve: "^1.22.1"
      },
      devDependencies: {
        "@babel/core": "^7.9.0",
        "@babel/preset-env": "^7.9.5",
        "@babel/preset-typescript": "^7.9.0",
        "@babel/register": "^7.9.0",
        "ipp-printer": "^1.0.0",
        patterns: "^1.0.3",
        roundround: "^0.2.0",
        semver: "^6.3.0",
        standard: "^14.3.1",
        tape: "^4.11.0"
      },
      scripts: {
        test: "npm run test:lint && npm run test:tape && npm run test:babel",
        "test:lint": "standard",
        "test:tape": "tape test/*.js",
        "test:babel": "node test/babel/babel-register.js"
      },
      repository: {
        type: "git",
        url: "git+https://github.com/elastic/require-in-the-middle.git"
      },
      keywords: [
        "require",
        "hook",
        "shim",
        "shimmer",
        "shimming",
        "patch",
        "monkey",
        "monkeypatch",
        "module",
        "load"
      ],
      files: [],
      author: "Thomas Watson Steen <w@tson.dk> (https://twitter.com/wa7son)",
      license: "MIT",
      bugs: {
        url: "https://github.com/elastic/require-in-the-middle/issues"
      },
      homepage: "https://github.com/elastic/require-in-the-middle#readme",
      engines: {
        node: ">=6"
      }
    };
  }
});

// node_modules/require-in-the-middle/index.js
var require_require_in_the_middle = __commonJS({
  "node_modules/require-in-the-middle/index.js"(exports, module2) {
    "use strict";
    var path = require("path");
    var Module = require("module");
    var resolve = require_resolve();
    var debug = require_src5()("require-in-the-middle");
    var parse = require_module_details_from_path();
    module2.exports = Hook;
    var isCore;
    if (Module.isBuiltin) {
      isCore = Module.isBuiltin;
    } else {
      isCore = (moduleName) => {
        return !!resolve.core[moduleName];
      };
    }
    var normalize = /([/\\]index)?(\.js)?$/;
    function Hook(modules, options, onrequire) {
      if (this instanceof Hook === false)
        return new Hook(modules, options, onrequire);
      if (typeof modules === "function") {
        onrequire = modules;
        modules = null;
        options = null;
      } else if (typeof options === "function") {
        onrequire = options;
        options = null;
      }
      if (typeof Module._resolveFilename !== "function") {
        console.error("Error: Expected Module._resolveFilename to be a function (was: %s) - aborting!", typeof Module._resolveFilename);
        console.error("Please report this error as an issue related to Node.js %s at %s", process.version, require_package().bugs.url);
        return;
      }
      this.cache = /* @__PURE__ */ new Map();
      this._unhooked = false;
      this._origRequire = Module.prototype.require;
      const self2 = this;
      const patching = /* @__PURE__ */ new Set();
      const internals = options ? options.internals === true : false;
      const hasWhitelist = Array.isArray(modules);
      debug("registering require hook");
      this._require = Module.prototype.require = function(id) {
        if (self2._unhooked === true) {
          debug("ignoring require call - module is soft-unhooked");
          return self2._origRequire.apply(this, arguments);
        }
        const core = isCore(id);
        let filename;
        if (core) {
          filename = id;
          if (id.startsWith("node:")) {
            const idWithoutPrefix = id.slice(5);
            if (isCore(idWithoutPrefix)) {
              filename = idWithoutPrefix;
            }
          }
        } else {
          filename = Module._resolveFilename(id, this);
        }
        let moduleName, basedir;
        debug("processing %s module require('%s'): %s", core === true ? "core" : "non-core", id, filename);
        if (self2.cache.has(filename) === true) {
          debug("returning already patched cached module: %s", filename);
          return self2.cache.get(filename);
        }
        const isPatching = patching.has(filename);
        if (isPatching === false) {
          patching.add(filename);
        }
        const exports2 = self2._origRequire.apply(this, arguments);
        if (isPatching === true) {
          debug("module is in the process of being patched already - ignoring: %s", filename);
          return exports2;
        }
        patching.delete(filename);
        if (core === true) {
          if (hasWhitelist === true && modules.includes(filename) === false) {
            debug("ignoring core module not on whitelist: %s", filename);
            return exports2;
          }
          moduleName = filename;
        } else if (hasWhitelist === true && modules.includes(filename)) {
          const parsedPath = path.parse(filename);
          moduleName = parsedPath.name;
          basedir = parsedPath.dir;
        } else {
          const stat = parse(filename);
          if (stat === void 0) {
            debug("could not parse filename: %s", filename);
            return exports2;
          }
          moduleName = stat.name;
          basedir = stat.basedir;
          const fullModuleName = resolveModuleName(stat);
          debug("resolved filename to module: %s (id: %s, resolved: %s, basedir: %s)", moduleName, id, fullModuleName, basedir);
          if (hasWhitelist === true && modules.includes(moduleName) === false) {
            if (modules.includes(fullModuleName) === false)
              return exports2;
            moduleName = fullModuleName;
          } else {
            let res;
            try {
              res = resolve.sync(moduleName, { basedir });
            } catch (e) {
              debug("could not resolve module: %s", moduleName);
              return exports2;
            }
            if (res !== filename) {
              if (internals === true) {
                moduleName = moduleName + path.sep + path.relative(basedir, filename);
                debug("preparing to process require of internal file: %s", moduleName);
              } else {
                debug("ignoring require of non-main module file: %s", res);
                return exports2;
              }
            }
          }
        }
        if (self2.cache.has(filename) === false) {
          self2.cache.set(filename, exports2);
          debug("calling require hook: %s", moduleName);
          self2.cache.set(filename, onrequire(exports2, moduleName, basedir));
        }
        debug("returning module: %s", moduleName);
        return self2.cache.get(filename);
      };
    }
    Hook.prototype.unhook = function() {
      this._unhooked = true;
      if (this._require === Module.prototype.require) {
        Module.prototype.require = this._origRequire;
        debug("unhook successful");
      } else {
        debug("unhook unsuccessful");
      }
    };
    function resolveModuleName(stat) {
      const normalizedPath = path.sep !== "/" ? stat.path.split(path.sep).join("/") : stat.path;
      return path.posix.join(stat.name, normalizedPath).replace(normalize, "");
    }
  }
});

// node_modules/@opentelemetry/instrumentation/build/src/platform/node/ModuleNameTrie.js
var require_ModuleNameTrie = __commonJS({
  "node_modules/@opentelemetry/instrumentation/build/src/platform/node/ModuleNameTrie.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ModuleNameTrie = exports.ModuleNameSeparator = void 0;
    exports.ModuleNameSeparator = "/";
    var ModuleNameTrieNode = class {
      constructor() {
        this.hooks = [];
        this.children = /* @__PURE__ */ new Map();
      }
    };
    var ModuleNameTrie = class {
      constructor() {
        this._trie = new ModuleNameTrieNode();
        this._counter = 0;
      }
      /**
       * Insert a module hook into the trie
       *
       * @param {Hooked} hook Hook
       */
      insert(hook) {
        let trieNode = this._trie;
        for (const moduleNamePart of hook.moduleName.split(exports.ModuleNameSeparator)) {
          let nextNode = trieNode.children.get(moduleNamePart);
          if (!nextNode) {
            nextNode = new ModuleNameTrieNode();
            trieNode.children.set(moduleNamePart, nextNode);
          }
          trieNode = nextNode;
        }
        trieNode.hooks.push({ hook, insertedId: this._counter++ });
      }
      /**
       * Search for matching hooks in the trie
       *
       * @param {string} moduleName Module name
       * @param {boolean} maintainInsertionOrder Whether to return the results in insertion order
       * @returns {Hooked[]} Matching hooks
       */
      search(moduleName, { maintainInsertionOrder } = {}) {
        let trieNode = this._trie;
        const results = [];
        for (const moduleNamePart of moduleName.split(exports.ModuleNameSeparator)) {
          const nextNode = trieNode.children.get(moduleNamePart);
          if (!nextNode) {
            break;
          }
          results.push(...nextNode.hooks);
          trieNode = nextNode;
        }
        if (results.length === 0) {
          return [];
        }
        if (results.length === 1) {
          return [results[0].hook];
        }
        if (maintainInsertionOrder) {
          results.sort((a, b) => a.insertedId - b.insertedId);
        }
        return results.map(({ hook }) => hook);
      }
    };
    exports.ModuleNameTrie = ModuleNameTrie;
  }
});

// node_modules/@opentelemetry/instrumentation/build/src/platform/node/RequireInTheMiddleSingleton.js
var require_RequireInTheMiddleSingleton = __commonJS({
  "node_modules/@opentelemetry/instrumentation/build/src/platform/node/RequireInTheMiddleSingleton.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.RequireInTheMiddleSingleton = void 0;
    var RequireInTheMiddle = require_require_in_the_middle();
    var path = require("path");
    var ModuleNameTrie_1 = require_ModuleNameTrie();
    var isMocha = ["afterEach", "after", "beforeEach", "before", "describe", "it"].every((fn) => {
      return typeof global[fn] === "function";
    });
    var RequireInTheMiddleSingleton = class {
      constructor() {
        this._moduleNameTrie = new ModuleNameTrie_1.ModuleNameTrie();
        this._initialize();
      }
      _initialize() {
        RequireInTheMiddle(
          // Intercept all `require` calls; we will filter the matching ones below
          null,
          { internals: true },
          (exports2, name, basedir) => {
            const normalizedModuleName = normalizePathSeparators(name);
            const matches = this._moduleNameTrie.search(normalizedModuleName, { maintainInsertionOrder: true });
            for (const { onRequire } of matches) {
              exports2 = onRequire(exports2, name, basedir);
            }
            return exports2;
          }
        );
      }
      /**
       * Register a hook with `require-in-the-middle`
       *
       * @param {string} moduleName Module name
       * @param {RequireInTheMiddle.OnRequireFn} onRequire Hook function
       * @returns {Hooked} Registered hook
       */
      register(moduleName, onRequire) {
        const hooked = { moduleName, onRequire };
        this._moduleNameTrie.insert(hooked);
        return hooked;
      }
      /**
       * Get the `RequireInTheMiddleSingleton` singleton
       *
       * @returns {RequireInTheMiddleSingleton} Singleton of `RequireInTheMiddleSingleton`
       */
      static getInstance() {
        var _a;
        if (isMocha)
          return new RequireInTheMiddleSingleton();
        return this._instance = (_a = this._instance) !== null && _a !== void 0 ? _a : new RequireInTheMiddleSingleton();
      }
    };
    exports.RequireInTheMiddleSingleton = RequireInTheMiddleSingleton;
    function normalizePathSeparators(moduleNameOrPath) {
      return path.sep !== ModuleNameTrie_1.ModuleNameSeparator ? moduleNameOrPath.split(path.sep).join(ModuleNameTrie_1.ModuleNameSeparator) : moduleNameOrPath;
    }
  }
});

// node_modules/@opentelemetry/instrumentation/build/src/platform/node/instrumentation.js
var require_instrumentation2 = __commonJS({
  "node_modules/@opentelemetry/instrumentation/build/src/platform/node/instrumentation.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.InstrumentationBase = void 0;
    var path = require("path");
    var semver_1 = require_semver3();
    var instrumentation_1 = require_instrumentation();
    var RequireInTheMiddleSingleton_1 = require_RequireInTheMiddleSingleton();
    var api_1 = require_src();
    var InstrumentationBase = class extends instrumentation_1.InstrumentationAbstract {
      constructor(instrumentationName, instrumentationVersion, config = {}) {
        super(instrumentationName, instrumentationVersion, config);
        this._hooks = [];
        this._requireInTheMiddleSingleton = RequireInTheMiddleSingleton_1.RequireInTheMiddleSingleton.getInstance();
        this._enabled = false;
        let modules = this.init();
        if (modules && !Array.isArray(modules)) {
          modules = [modules];
        }
        this._modules = modules || [];
        if (this._modules.length === 0) {
          api_1.diag.debug(`No modules instrumentation has been defined for '${this.instrumentationName}@${this.instrumentationVersion}', nothing will be patched`);
        }
        if (this._config.enabled) {
          this.enable();
        }
      }
      _warnOnPreloadedModules() {
        this._modules.forEach((module3) => {
          const { name } = module3;
          try {
            const resolvedModule = require.resolve(name);
            if (require.cache[resolvedModule]) {
              this._diag.warn(`Module ${name} has been loaded before ${this.instrumentationName} so it might not work, please initialize it before requiring ${name}`);
            }
          } catch (_a) {
          }
        });
      }
      _extractPackageVersion(baseDir) {
        try {
          const version = require(path.join(baseDir, "package.json")).version;
          return typeof version === "string" ? version : void 0;
        } catch (error) {
          api_1.diag.warn("Failed extracting version", baseDir);
        }
        return void 0;
      }
      _onRequire(module3, exports2, name, baseDir) {
        var _a;
        if (!baseDir) {
          if (typeof module3.patch === "function") {
            module3.moduleExports = exports2;
            if (this._enabled) {
              return module3.patch(exports2);
            }
          }
          return exports2;
        }
        const version = this._extractPackageVersion(baseDir);
        module3.moduleVersion = version;
        if (module3.name === name) {
          if (isSupported(module3.supportedVersions, version, module3.includePrerelease)) {
            if (typeof module3.patch === "function") {
              module3.moduleExports = exports2;
              if (this._enabled) {
                return module3.patch(exports2, module3.moduleVersion);
              }
            }
          }
          return exports2;
        }
        const files = (_a = module3.files) !== null && _a !== void 0 ? _a : [];
        const supportedFileInstrumentations = files.filter((f) => f.name === name).filter((f) => isSupported(f.supportedVersions, version, module3.includePrerelease));
        return supportedFileInstrumentations.reduce((patchedExports, file) => {
          file.moduleExports = patchedExports;
          if (this._enabled) {
            return file.patch(patchedExports, module3.moduleVersion);
          }
          return patchedExports;
        }, exports2);
      }
      enable() {
        if (this._enabled) {
          return;
        }
        this._enabled = true;
        if (this._hooks.length > 0) {
          for (const module3 of this._modules) {
            if (typeof module3.patch === "function" && module3.moduleExports) {
              module3.patch(module3.moduleExports, module3.moduleVersion);
            }
            for (const file of module3.files) {
              if (file.moduleExports) {
                file.patch(file.moduleExports, module3.moduleVersion);
              }
            }
          }
          return;
        }
        this._warnOnPreloadedModules();
        for (const module3 of this._modules) {
          this._hooks.push(this._requireInTheMiddleSingleton.register(module3.name, (exports2, name, baseDir) => {
            return this._onRequire(module3, exports2, name, baseDir);
          }));
        }
      }
      disable() {
        if (!this._enabled) {
          return;
        }
        this._enabled = false;
        for (const module3 of this._modules) {
          if (typeof module3.unpatch === "function" && module3.moduleExports) {
            module3.unpatch(module3.moduleExports, module3.moduleVersion);
          }
          for (const file of module3.files) {
            if (file.moduleExports) {
              file.unpatch(file.moduleExports, module3.moduleVersion);
            }
          }
        }
      }
      isEnabled() {
        return this._enabled;
      }
    };
    exports.InstrumentationBase = InstrumentationBase;
    function isSupported(supportedVersions, version, includePrerelease) {
      if (typeof version === "undefined") {
        return supportedVersions.includes("*");
      }
      return supportedVersions.some((supportedVersion) => {
        return (0, semver_1.satisfies)(version, supportedVersion, { includePrerelease });
      });
    }
  }
});

// node_modules/@opentelemetry/instrumentation/build/src/platform/node/instrumentationNodeModuleDefinition.js
var require_instrumentationNodeModuleDefinition = __commonJS({
  "node_modules/@opentelemetry/instrumentation/build/src/platform/node/instrumentationNodeModuleDefinition.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.InstrumentationNodeModuleDefinition = void 0;
    var InstrumentationNodeModuleDefinition = class {
      constructor(name, supportedVersions, patch, unpatch, files) {
        this.name = name;
        this.supportedVersions = supportedVersions;
        this.patch = patch;
        this.unpatch = unpatch;
        this.files = files || [];
      }
    };
    exports.InstrumentationNodeModuleDefinition = InstrumentationNodeModuleDefinition;
  }
});

// node_modules/@opentelemetry/instrumentation/build/src/platform/node/instrumentationNodeModuleFile.js
var require_instrumentationNodeModuleFile = __commonJS({
  "node_modules/@opentelemetry/instrumentation/build/src/platform/node/instrumentationNodeModuleFile.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.InstrumentationNodeModuleFile = void 0;
    var path_1 = require("path");
    var InstrumentationNodeModuleFile = class {
      constructor(name, supportedVersions, patch, unpatch) {
        this.supportedVersions = supportedVersions;
        this.patch = patch;
        this.unpatch = unpatch;
        this.name = (0, path_1.normalize)(name);
      }
    };
    exports.InstrumentationNodeModuleFile = InstrumentationNodeModuleFile;
  }
});

// node_modules/@opentelemetry/instrumentation/build/src/platform/node/types.js
var require_types3 = __commonJS({
  "node_modules/@opentelemetry/instrumentation/build/src/platform/node/types.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
  }
});

// node_modules/@opentelemetry/instrumentation/build/src/platform/node/index.js
var require_node4 = __commonJS({
  "node_modules/@opentelemetry/instrumentation/build/src/platform/node/index.js"(exports) {
    "use strict";
    var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      Object.defineProperty(o, k2, { enumerable: true, get: function() {
        return m[k];
      } });
    } : function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      o[k2] = m[k];
    });
    var __exportStar = exports && exports.__exportStar || function(m, exports2) {
      for (var p in m)
        if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports2, p))
          __createBinding(exports2, m, p);
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    __exportStar(require_instrumentation2(), exports);
    __exportStar(require_instrumentationNodeModuleDefinition(), exports);
    __exportStar(require_instrumentationNodeModuleFile(), exports);
    __exportStar(require_types3(), exports);
  }
});

// node_modules/@opentelemetry/instrumentation/build/src/platform/index.js
var require_platform3 = __commonJS({
  "node_modules/@opentelemetry/instrumentation/build/src/platform/index.js"(exports) {
    "use strict";
    var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      Object.defineProperty(o, k2, { enumerable: true, get: function() {
        return m[k];
      } });
    } : function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      o[k2] = m[k];
    });
    var __exportStar = exports && exports.__exportStar || function(m, exports2) {
      for (var p in m)
        if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports2, p))
          __createBinding(exports2, m, p);
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    __exportStar(require_node4(), exports);
  }
});

// node_modules/@opentelemetry/instrumentation/build/src/types.js
var require_types4 = __commonJS({
  "node_modules/@opentelemetry/instrumentation/build/src/types.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
  }
});

// node_modules/@opentelemetry/instrumentation/build/src/types_internal.js
var require_types_internal = __commonJS({
  "node_modules/@opentelemetry/instrumentation/build/src/types_internal.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
  }
});

// node_modules/@opentelemetry/instrumentation/build/src/utils.js
var require_utils5 = __commonJS({
  "node_modules/@opentelemetry/instrumentation/build/src/utils.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.isWrapped = exports.safeExecuteInTheMiddleAsync = exports.safeExecuteInTheMiddle = void 0;
    function safeExecuteInTheMiddle(execute, onFinish, preventThrowingError) {
      let error;
      let result;
      try {
        result = execute();
      } catch (e) {
        error = e;
      } finally {
        onFinish(error, result);
        if (error && !preventThrowingError) {
          throw error;
        }
        return result;
      }
    }
    exports.safeExecuteInTheMiddle = safeExecuteInTheMiddle;
    async function safeExecuteInTheMiddleAsync(execute, onFinish, preventThrowingError) {
      let error;
      let result;
      try {
        result = await execute();
      } catch (e) {
        error = e;
      } finally {
        onFinish(error, result);
        if (error && !preventThrowingError) {
          throw error;
        }
        return result;
      }
    }
    exports.safeExecuteInTheMiddleAsync = safeExecuteInTheMiddleAsync;
    function isWrapped(func) {
      return typeof func === "function" && typeof func.__original === "function" && typeof func.__unwrap === "function" && func.__wrapped === true;
    }
    exports.isWrapped = isWrapped;
  }
});

// node_modules/@opentelemetry/instrumentation/build/src/index.js
var require_src6 = __commonJS({
  "node_modules/@opentelemetry/instrumentation/build/src/index.js"(exports) {
    "use strict";
    var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      Object.defineProperty(o, k2, { enumerable: true, get: function() {
        return m[k];
      } });
    } : function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      o[k2] = m[k];
    });
    var __exportStar = exports && exports.__exportStar || function(m, exports2) {
      for (var p in m)
        if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports2, p))
          __createBinding(exports2, m, p);
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    __exportStar(require_autoLoader(), exports);
    __exportStar(require_platform3(), exports);
    __exportStar(require_types4(), exports);
    __exportStar(require_types_internal(), exports);
    __exportStar(require_utils5(), exports);
  }
});

// node_modules/@opentelemetry/instrumentation-http/build/src/http.js
var require_http = __commonJS({
  "node_modules/@opentelemetry/instrumentation-http/build/src/http.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.HttpInstrumentation = void 0;
    var api_1 = require_src();
    var core_1 = require_src3();
    var semver = require_semver3();
    var url = require("url");
    var utils = require_utils4();
    var version_1 = require_version3();
    var instrumentation_1 = require_src6();
    var core_2 = require_src3();
    var HttpInstrumentation2 = class extends instrumentation_1.InstrumentationBase {
      constructor(config) {
        super("@opentelemetry/instrumentation-http", version_1.VERSION, config);
        this._spanNotEnded = /* @__PURE__ */ new WeakSet();
        this._version = process.versions.node;
        this._headerCapture = this._createHeaderCapture();
        this._updateMetricInstruments();
      }
      setMeterProvider(meterProvider) {
        super.setMeterProvider(meterProvider);
        this._updateMetricInstruments();
      }
      _updateMetricInstruments() {
        this._httpServerDurationHistogram = this.meter.createHistogram("http.server.duration", {
          description: "measures the duration of the inbound HTTP requests",
          unit: "ms",
          valueType: api_1.ValueType.DOUBLE
        });
        this._httpClientDurationHistogram = this.meter.createHistogram("http.client.duration", {
          description: "measures the duration of the outbound HTTP requests",
          unit: "ms",
          valueType: api_1.ValueType.DOUBLE
        });
      }
      _getConfig() {
        return this._config;
      }
      setConfig(config) {
        super.setConfig(config);
        this._headerCapture = this._createHeaderCapture();
      }
      init() {
        return [this._getHttpsInstrumentation(), this._getHttpInstrumentation()];
      }
      _getHttpInstrumentation() {
        return new instrumentation_1.InstrumentationNodeModuleDefinition("http", ["*"], (moduleExports) => {
          this._diag.debug(`Applying patch for http@${this._version}`);
          if ((0, instrumentation_1.isWrapped)(moduleExports.request)) {
            this._unwrap(moduleExports, "request");
          }
          this._wrap(moduleExports, "request", this._getPatchOutgoingRequestFunction("http"));
          if ((0, instrumentation_1.isWrapped)(moduleExports.get)) {
            this._unwrap(moduleExports, "get");
          }
          this._wrap(moduleExports, "get", this._getPatchOutgoingGetFunction(moduleExports.request));
          if ((0, instrumentation_1.isWrapped)(moduleExports.Server.prototype.emit)) {
            this._unwrap(moduleExports.Server.prototype, "emit");
          }
          this._wrap(moduleExports.Server.prototype, "emit", this._getPatchIncomingRequestFunction("http"));
          return moduleExports;
        }, (moduleExports) => {
          if (moduleExports === void 0)
            return;
          this._diag.debug(`Removing patch for http@${this._version}`);
          this._unwrap(moduleExports, "request");
          this._unwrap(moduleExports, "get");
          this._unwrap(moduleExports.Server.prototype, "emit");
        });
      }
      _getHttpsInstrumentation() {
        return new instrumentation_1.InstrumentationNodeModuleDefinition("https", ["*"], (moduleExports) => {
          this._diag.debug(`Applying patch for https@${this._version}`);
          if ((0, instrumentation_1.isWrapped)(moduleExports.request)) {
            this._unwrap(moduleExports, "request");
          }
          this._wrap(moduleExports, "request", this._getPatchHttpsOutgoingRequestFunction("https"));
          if ((0, instrumentation_1.isWrapped)(moduleExports.get)) {
            this._unwrap(moduleExports, "get");
          }
          this._wrap(moduleExports, "get", this._getPatchHttpsOutgoingGetFunction(moduleExports.request));
          if ((0, instrumentation_1.isWrapped)(moduleExports.Server.prototype.emit)) {
            this._unwrap(moduleExports.Server.prototype, "emit");
          }
          this._wrap(moduleExports.Server.prototype, "emit", this._getPatchIncomingRequestFunction("https"));
          return moduleExports;
        }, (moduleExports) => {
          if (moduleExports === void 0)
            return;
          this._diag.debug(`Removing patch for https@${this._version}`);
          this._unwrap(moduleExports, "request");
          this._unwrap(moduleExports, "get");
          this._unwrap(moduleExports.Server.prototype, "emit");
        });
      }
      /**
       * Creates spans for incoming requests, restoring spans' context if applied.
       */
      _getPatchIncomingRequestFunction(component) {
        return (original) => {
          return this._incomingRequestFunction(component, original);
        };
      }
      /**
       * Creates spans for outgoing requests, sending spans' context for distributed
       * tracing.
       */
      _getPatchOutgoingRequestFunction(component) {
        return (original) => {
          return this._outgoingRequestFunction(component, original);
        };
      }
      _getPatchOutgoingGetFunction(clientRequest) {
        return (_original) => {
          return function outgoingGetRequest(options, ...args) {
            const req = clientRequest(options, ...args);
            req.end();
            return req;
          };
        };
      }
      /** Patches HTTPS outgoing requests */
      _getPatchHttpsOutgoingRequestFunction(component) {
        return (original) => {
          const instrumentation = this;
          return function httpsOutgoingRequest(options, ...args) {
            var _a;
            if (component === "https" && typeof options === "object" && ((_a = options === null || options === void 0 ? void 0 : options.constructor) === null || _a === void 0 ? void 0 : _a.name) !== "URL") {
              options = Object.assign({}, options);
              instrumentation._setDefaultOptions(options);
            }
            return instrumentation._getPatchOutgoingRequestFunction(component)(original)(options, ...args);
          };
        };
      }
      _setDefaultOptions(options) {
        options.protocol = options.protocol || "https:";
        options.port = options.port || 443;
      }
      /** Patches HTTPS outgoing get requests */
      _getPatchHttpsOutgoingGetFunction(clientRequest) {
        return (original) => {
          const instrumentation = this;
          return function httpsOutgoingRequest(options, ...args) {
            return instrumentation._getPatchOutgoingGetFunction(clientRequest)(original)(options, ...args);
          };
        };
      }
      /**
       * Attach event listeners to a client request to end span and add span attributes.
       *
       * @param request The original request object.
       * @param options The arguments to the original function.
       * @param span representing the current operation
       * @param startTime representing the start time of the request to calculate duration in Metric
       * @param metricAttributes metric attributes
       */
      _traceClientRequest(request, hostname, span, startTime, metricAttributes) {
        if (this._getConfig().requestHook) {
          this._callRequestHook(span, request);
        }
        request.prependListener("response", (response) => {
          const responseAttributes = utils.getOutgoingRequestAttributesOnResponse(response);
          span.setAttributes(responseAttributes);
          metricAttributes = Object.assign(metricAttributes, utils.getOutgoingRequestMetricAttributesOnResponse(responseAttributes));
          if (this._getConfig().responseHook) {
            this._callResponseHook(span, response);
          }
          this._headerCapture.client.captureRequestHeaders(span, (header) => request.getHeader(header));
          this._headerCapture.client.captureResponseHeaders(span, (header) => response.headers[header]);
          api_1.context.bind(api_1.context.active(), response);
          this._diag.debug("outgoingRequest on response()");
          response.on("end", () => {
            this._diag.debug("outgoingRequest on end()");
            let status;
            if (response.aborted && !response.complete) {
              status = { code: api_1.SpanStatusCode.ERROR };
            } else {
              status = { code: utils.parseResponseStatus(api_1.SpanKind.CLIENT, response.statusCode) };
            }
            span.setStatus(status);
            if (this._getConfig().applyCustomAttributesOnSpan) {
              (0, instrumentation_1.safeExecuteInTheMiddle)(() => this._getConfig().applyCustomAttributesOnSpan(span, request, response), () => {
              }, true);
            }
            this._closeHttpSpan(span, api_1.SpanKind.CLIENT, startTime, metricAttributes);
          });
          response.on("error", (error) => {
            this._diag.debug("outgoingRequest on error()", error);
            utils.setSpanWithError(span, error);
            const code = utils.parseResponseStatus(api_1.SpanKind.CLIENT, response.statusCode);
            span.setStatus({ code, message: error.message });
            this._closeHttpSpan(span, api_1.SpanKind.CLIENT, startTime, metricAttributes);
          });
        });
        request.on("close", () => {
          this._diag.debug("outgoingRequest on request close()");
          if (!request.aborted) {
            this._closeHttpSpan(span, api_1.SpanKind.CLIENT, startTime, metricAttributes);
          }
        });
        request.on("error", (error) => {
          this._diag.debug("outgoingRequest on request error()", error);
          utils.setSpanWithError(span, error);
          this._closeHttpSpan(span, api_1.SpanKind.CLIENT, startTime, metricAttributes);
        });
        this._diag.debug("http.ClientRequest return request");
        return request;
      }
      _incomingRequestFunction(component, original) {
        const instrumentation = this;
        return function incomingRequest(event, ...args) {
          if (event !== "request") {
            return original.apply(this, [event, ...args]);
          }
          const request = args[0];
          const response = args[1];
          const pathname = request.url ? url.parse(request.url).pathname || "/" : "/";
          const method = request.method || "GET";
          instrumentation._diag.debug(`${component} instrumentation incomingRequest`);
          if (utils.isIgnored(pathname, instrumentation._getConfig().ignoreIncomingPaths, (e) => instrumentation._diag.error("caught ignoreIncomingPaths error: ", e)) || (0, instrumentation_1.safeExecuteInTheMiddle)(() => {
            var _a, _b;
            return (_b = (_a = instrumentation._getConfig()).ignoreIncomingRequestHook) === null || _b === void 0 ? void 0 : _b.call(_a, request);
          }, (e) => {
            if (e != null) {
              instrumentation._diag.error("caught ignoreIncomingRequestHook error: ", e);
            }
          }, true)) {
            return api_1.context.with((0, core_1.suppressTracing)(api_1.context.active()), () => {
              api_1.context.bind(api_1.context.active(), request);
              api_1.context.bind(api_1.context.active(), response);
              return original.apply(this, [event, ...args]);
            });
          }
          const headers = request.headers;
          const spanAttributes = utils.getIncomingRequestAttributes(request, {
            component,
            serverName: instrumentation._getConfig().serverName,
            hookAttributes: instrumentation._callStartSpanHook(request, instrumentation._getConfig().startIncomingSpanHook)
          });
          const spanOptions = {
            kind: api_1.SpanKind.SERVER,
            attributes: spanAttributes
          };
          const startTime = (0, core_1.hrTime)();
          let metricAttributes = utils.getIncomingRequestMetricAttributes(spanAttributes);
          const ctx = api_1.propagation.extract(api_1.ROOT_CONTEXT, headers);
          const span = instrumentation._startHttpSpan(`${component.toLocaleUpperCase()} ${method}`, spanOptions, ctx);
          const rpcMetadata = {
            type: core_2.RPCType.HTTP,
            span
          };
          return api_1.context.with((0, core_2.setRPCMetadata)(api_1.trace.setSpan(ctx, span), rpcMetadata), () => {
            api_1.context.bind(api_1.context.active(), request);
            api_1.context.bind(api_1.context.active(), response);
            if (instrumentation._getConfig().requestHook) {
              instrumentation._callRequestHook(span, request);
            }
            if (instrumentation._getConfig().responseHook) {
              instrumentation._callResponseHook(span, response);
            }
            instrumentation._headerCapture.server.captureRequestHeaders(span, (header) => request.headers[header]);
            const originalEnd = response.end;
            response.end = function(..._args) {
              response.end = originalEnd;
              const returned = (0, instrumentation_1.safeExecuteInTheMiddle)(() => response.end.apply(this, arguments), (error) => {
                if (error) {
                  utils.setSpanWithError(span, error);
                  instrumentation._closeHttpSpan(span, api_1.SpanKind.SERVER, startTime, metricAttributes);
                  throw error;
                }
              });
              const attributes = utils.getIncomingRequestAttributesOnResponse(request, response);
              metricAttributes = Object.assign(metricAttributes, utils.getIncomingRequestMetricAttributesOnResponse(attributes));
              instrumentation._headerCapture.server.captureResponseHeaders(span, (header) => response.getHeader(header));
              span.setAttributes(attributes).setStatus({ code: utils.parseResponseStatus(api_1.SpanKind.SERVER, response.statusCode) });
              if (instrumentation._getConfig().applyCustomAttributesOnSpan) {
                (0, instrumentation_1.safeExecuteInTheMiddle)(() => instrumentation._getConfig().applyCustomAttributesOnSpan(span, request, response), () => {
                }, true);
              }
              instrumentation._closeHttpSpan(span, api_1.SpanKind.SERVER, startTime, metricAttributes);
              return returned;
            };
            return (0, instrumentation_1.safeExecuteInTheMiddle)(() => original.apply(this, [event, ...args]), (error) => {
              if (error) {
                utils.setSpanWithError(span, error);
                instrumentation._closeHttpSpan(span, api_1.SpanKind.SERVER, startTime, metricAttributes);
                throw error;
              }
            });
          });
        };
      }
      _outgoingRequestFunction(component, original) {
        const instrumentation = this;
        return function outgoingRequest(options, ...args) {
          if (!utils.isValidOptionsType(options)) {
            return original.apply(this, [options, ...args]);
          }
          const extraOptions = typeof args[0] === "object" && (typeof options === "string" || options instanceof url.URL) ? args.shift() : void 0;
          const { origin, pathname, method, optionsParsed } = utils.getRequestInfo(options, extraOptions);
          if (component === "http" && semver.lt(process.version, "9.0.0") && optionsParsed.protocol === "https:") {
            return original.apply(this, [optionsParsed, ...args]);
          }
          if (utils.isIgnored(origin + pathname, instrumentation._getConfig().ignoreOutgoingUrls, (e) => instrumentation._diag.error("caught ignoreOutgoingUrls error: ", e)) || (0, instrumentation_1.safeExecuteInTheMiddle)(() => {
            var _a, _b;
            return (_b = (_a = instrumentation._getConfig()).ignoreOutgoingRequestHook) === null || _b === void 0 ? void 0 : _b.call(_a, optionsParsed);
          }, (e) => {
            if (e != null) {
              instrumentation._diag.error("caught ignoreOutgoingRequestHook error: ", e);
            }
          }, true)) {
            return original.apply(this, [optionsParsed, ...args]);
          }
          const operationName = `${component.toUpperCase()} ${method}`;
          const { hostname, port } = utils.extractHostnameAndPort(optionsParsed);
          const attributes = utils.getOutgoingRequestAttributes(optionsParsed, {
            component,
            port,
            hostname,
            hookAttributes: instrumentation._callStartSpanHook(optionsParsed, instrumentation._getConfig().startOutgoingSpanHook)
          });
          const startTime = (0, core_1.hrTime)();
          const metricAttributes = utils.getOutgoingRequestMetricAttributes(attributes);
          const spanOptions = {
            kind: api_1.SpanKind.CLIENT,
            attributes
          };
          const span = instrumentation._startHttpSpan(operationName, spanOptions);
          const parentContext = api_1.context.active();
          const requestContext = api_1.trace.setSpan(parentContext, span);
          if (!optionsParsed.headers) {
            optionsParsed.headers = {};
          }
          api_1.propagation.inject(requestContext, optionsParsed.headers);
          return api_1.context.with(requestContext, () => {
            const cb = args[args.length - 1];
            if (typeof cb === "function") {
              args[args.length - 1] = api_1.context.bind(parentContext, cb);
            }
            const request = (0, instrumentation_1.safeExecuteInTheMiddle)(() => original.apply(this, [optionsParsed, ...args]), (error) => {
              if (error) {
                utils.setSpanWithError(span, error);
                instrumentation._closeHttpSpan(span, api_1.SpanKind.CLIENT, startTime, metricAttributes);
                throw error;
              }
            });
            instrumentation._diag.debug(`${component} instrumentation outgoingRequest`);
            api_1.context.bind(parentContext, request);
            return instrumentation._traceClientRequest(request, hostname, span, startTime, metricAttributes);
          });
        };
      }
      _startHttpSpan(name, options, ctx = api_1.context.active()) {
        const requireParent = options.kind === api_1.SpanKind.CLIENT ? this._getConfig().requireParentforOutgoingSpans : this._getConfig().requireParentforIncomingSpans;
        let span;
        const currentSpan = api_1.trace.getSpan(ctx);
        if (requireParent === true && currentSpan === void 0) {
          span = api_1.trace.wrapSpanContext(api_1.INVALID_SPAN_CONTEXT);
        } else if (requireParent === true && (currentSpan === null || currentSpan === void 0 ? void 0 : currentSpan.spanContext().isRemote)) {
          span = currentSpan;
        } else {
          span = this.tracer.startSpan(name, options, ctx);
        }
        this._spanNotEnded.add(span);
        return span;
      }
      _closeHttpSpan(span, spanKind, startTime, metricAttributes) {
        if (!this._spanNotEnded.has(span)) {
          return;
        }
        span.end();
        this._spanNotEnded.delete(span);
        const duration = (0, core_1.hrTimeToMilliseconds)((0, core_1.hrTimeDuration)(startTime, (0, core_1.hrTime)()));
        if (spanKind === api_1.SpanKind.SERVER) {
          this._httpServerDurationHistogram.record(duration, metricAttributes);
        } else if (spanKind === api_1.SpanKind.CLIENT) {
          this._httpClientDurationHistogram.record(duration, metricAttributes);
        }
      }
      _callResponseHook(span, response) {
        (0, instrumentation_1.safeExecuteInTheMiddle)(() => this._getConfig().responseHook(span, response), () => {
        }, true);
      }
      _callRequestHook(span, request) {
        (0, instrumentation_1.safeExecuteInTheMiddle)(() => this._getConfig().requestHook(span, request), () => {
        }, true);
      }
      _callStartSpanHook(request, hookFunc) {
        if (typeof hookFunc === "function") {
          return (0, instrumentation_1.safeExecuteInTheMiddle)(() => hookFunc(request), () => {
          }, true);
        }
      }
      _createHeaderCapture() {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
        const config = this._getConfig();
        return {
          client: {
            captureRequestHeaders: utils.headerCapture("request", (_c = (_b = (_a = config.headersToSpanAttributes) === null || _a === void 0 ? void 0 : _a.client) === null || _b === void 0 ? void 0 : _b.requestHeaders) !== null && _c !== void 0 ? _c : []),
            captureResponseHeaders: utils.headerCapture("response", (_f = (_e = (_d = config.headersToSpanAttributes) === null || _d === void 0 ? void 0 : _d.client) === null || _e === void 0 ? void 0 : _e.responseHeaders) !== null && _f !== void 0 ? _f : [])
          },
          server: {
            captureRequestHeaders: utils.headerCapture("request", (_j = (_h = (_g = config.headersToSpanAttributes) === null || _g === void 0 ? void 0 : _g.server) === null || _h === void 0 ? void 0 : _h.requestHeaders) !== null && _j !== void 0 ? _j : []),
            captureResponseHeaders: utils.headerCapture("response", (_m = (_l = (_k = config.headersToSpanAttributes) === null || _k === void 0 ? void 0 : _k.server) === null || _l === void 0 ? void 0 : _l.responseHeaders) !== null && _m !== void 0 ? _m : [])
          }
        };
      }
    };
    exports.HttpInstrumentation = HttpInstrumentation2;
  }
});

// node_modules/@opentelemetry/instrumentation-http/build/src/types.js
var require_types5 = __commonJS({
  "node_modules/@opentelemetry/instrumentation-http/build/src/types.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
  }
});

// node_modules/@opentelemetry/instrumentation-http/build/src/index.js
var require_src7 = __commonJS({
  "node_modules/@opentelemetry/instrumentation-http/build/src/index.js"(exports) {
    "use strict";
    var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      Object.defineProperty(o, k2, { enumerable: true, get: function() {
        return m[k];
      } });
    } : function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      o[k2] = m[k];
    });
    var __exportStar = exports && exports.__exportStar || function(m, exports2) {
      for (var p in m)
        if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports2, p))
          __createBinding(exports2, m, p);
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    __exportStar(require_http(), exports);
    __exportStar(require_types5(), exports);
    __exportStar(require_utils4(), exports);
  }
});

// node_modules/@opentelemetry/resources/build/src/platform/node/default-service-name.js
var require_default_service_name = __commonJS({
  "node_modules/@opentelemetry/resources/build/src/platform/node/default-service-name.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.defaultServiceName = void 0;
    function defaultServiceName() {
      return `unknown_service:${process.argv0}`;
    }
    exports.defaultServiceName = defaultServiceName;
  }
});

// node_modules/@opentelemetry/resources/build/src/platform/node/detect-resources.js
var require_detect_resources = __commonJS({
  "node_modules/@opentelemetry/resources/build/src/platform/node/detect-resources.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.detectResources = void 0;
    var Resource_1 = require_Resource();
    var api_1 = require_src();
    var util = require("util");
    var detectResources = async (config = {}) => {
      const internalConfig = Object.assign(config);
      const resources = await Promise.all((internalConfig.detectors || []).map(async (d) => {
        try {
          const resource = await d.detect(internalConfig);
          api_1.diag.debug(`${d.constructor.name} found resource.`, resource);
          return resource;
        } catch (e) {
          api_1.diag.debug(`${d.constructor.name} failed: ${e.message}`);
          return Resource_1.Resource.empty();
        }
      }));
      logResources(resources);
      return resources.reduce((acc, resource) => acc.merge(resource), Resource_1.Resource.empty());
    };
    exports.detectResources = detectResources;
    var logResources = (resources) => {
      resources.forEach((resource) => {
        if (Object.keys(resource.attributes).length > 0) {
          const resourceDebugString = util.inspect(resource.attributes, {
            depth: 2,
            breakLength: Infinity,
            sorted: true,
            compact: false
          });
          api_1.diag.verbose(resourceDebugString);
        }
      });
    };
  }
});

// node_modules/@opentelemetry/resources/build/src/platform/node/HostDetector.js
var require_HostDetector = __commonJS({
  "node_modules/@opentelemetry/resources/build/src/platform/node/HostDetector.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.hostDetector = void 0;
    var semantic_conventions_1 = require_src2();
    var Resource_1 = require_Resource();
    var os_1 = require("os");
    var HostDetector = class {
      async detect(_config) {
        const attributes = {
          [semantic_conventions_1.SemanticResourceAttributes.HOST_NAME]: (0, os_1.hostname)(),
          [semantic_conventions_1.SemanticResourceAttributes.HOST_ARCH]: this._normalizeArch((0, os_1.arch)())
        };
        return new Resource_1.Resource(attributes);
      }
      _normalizeArch(nodeArchString) {
        switch (nodeArchString) {
          case "arm":
            return "arm32";
          case "ppc":
            return "ppc32";
          case "x64":
            return "amd64";
          default:
            return nodeArchString;
        }
      }
    };
    exports.hostDetector = new HostDetector();
  }
});

// node_modules/@opentelemetry/resources/build/src/platform/node/OSDetector.js
var require_OSDetector = __commonJS({
  "node_modules/@opentelemetry/resources/build/src/platform/node/OSDetector.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.osDetector = void 0;
    var semantic_conventions_1 = require_src2();
    var Resource_1 = require_Resource();
    var os_1 = require("os");
    var OSDetector = class {
      async detect(_config) {
        const attributes = {
          [semantic_conventions_1.SemanticResourceAttributes.OS_TYPE]: this._normalizeType((0, os_1.platform)()),
          [semantic_conventions_1.SemanticResourceAttributes.OS_VERSION]: (0, os_1.release)()
        };
        return new Resource_1.Resource(attributes);
      }
      _normalizeType(nodePlatform) {
        switch (nodePlatform) {
          case "sunos":
            return "solaris";
          case "win32":
            return "windows";
          default:
            return nodePlatform;
        }
      }
    };
    exports.osDetector = new OSDetector();
  }
});

// node_modules/@opentelemetry/resources/build/src/platform/node/index.js
var require_node5 = __commonJS({
  "node_modules/@opentelemetry/resources/build/src/platform/node/index.js"(exports) {
    "use strict";
    var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      Object.defineProperty(o, k2, { enumerable: true, get: function() {
        return m[k];
      } });
    } : function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      o[k2] = m[k];
    });
    var __exportStar = exports && exports.__exportStar || function(m, exports2) {
      for (var p in m)
        if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports2, p))
          __createBinding(exports2, m, p);
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    __exportStar(require_default_service_name(), exports);
    __exportStar(require_detect_resources(), exports);
    __exportStar(require_HostDetector(), exports);
    __exportStar(require_OSDetector(), exports);
  }
});

// node_modules/@opentelemetry/resources/build/src/platform/index.js
var require_platform4 = __commonJS({
  "node_modules/@opentelemetry/resources/build/src/platform/index.js"(exports) {
    "use strict";
    var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      Object.defineProperty(o, k2, { enumerable: true, get: function() {
        return m[k];
      } });
    } : function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      o[k2] = m[k];
    });
    var __exportStar = exports && exports.__exportStar || function(m, exports2) {
      for (var p in m)
        if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports2, p))
          __createBinding(exports2, m, p);
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    __exportStar(require_node5(), exports);
  }
});

// node_modules/@opentelemetry/resources/build/src/Resource.js
var require_Resource = __commonJS({
  "node_modules/@opentelemetry/resources/build/src/Resource.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Resource = void 0;
    var semantic_conventions_1 = require_src2();
    var core_1 = require_src3();
    var platform_1 = require_platform4();
    var Resource2 = class {
      constructor(attributes) {
        this.attributes = attributes;
      }
      /**
       * Returns an empty Resource
       */
      static empty() {
        return Resource2.EMPTY;
      }
      /**
       * Returns a Resource that indentifies the SDK in use.
       */
      static default() {
        return new Resource2({
          [semantic_conventions_1.SemanticResourceAttributes.SERVICE_NAME]: (0, platform_1.defaultServiceName)(),
          [semantic_conventions_1.SemanticResourceAttributes.TELEMETRY_SDK_LANGUAGE]: core_1.SDK_INFO[semantic_conventions_1.SemanticResourceAttributes.TELEMETRY_SDK_LANGUAGE],
          [semantic_conventions_1.SemanticResourceAttributes.TELEMETRY_SDK_NAME]: core_1.SDK_INFO[semantic_conventions_1.SemanticResourceAttributes.TELEMETRY_SDK_NAME],
          [semantic_conventions_1.SemanticResourceAttributes.TELEMETRY_SDK_VERSION]: core_1.SDK_INFO[semantic_conventions_1.SemanticResourceAttributes.TELEMETRY_SDK_VERSION]
        });
      }
      /**
       * Returns a new, merged {@link Resource} by merging the current Resource
       * with the other Resource. In case of a collision, other Resource takes
       * precedence.
       *
       * @param other the Resource that will be merged with this.
       * @returns the newly merged Resource.
       */
      merge(other) {
        if (!other || !Object.keys(other.attributes).length)
          return this;
        const mergedAttributes = Object.assign({}, this.attributes, other.attributes);
        return new Resource2(mergedAttributes);
      }
    };
    exports.Resource = Resource2;
    Resource2.EMPTY = new Resource2({});
  }
});

// node_modules/@opentelemetry/resources/build/src/types.js
var require_types6 = __commonJS({
  "node_modules/@opentelemetry/resources/build/src/types.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
  }
});

// node_modules/@opentelemetry/resources/build/src/config.js
var require_config = __commonJS({
  "node_modules/@opentelemetry/resources/build/src/config.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
  }
});

// node_modules/@opentelemetry/resources/build/src/detectors/BrowserDetector.js
var require_BrowserDetector = __commonJS({
  "node_modules/@opentelemetry/resources/build/src/detectors/BrowserDetector.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.browserDetector = void 0;
    var api_1 = require_src();
    var semantic_conventions_1 = require_src2();
    var __1 = require_src8();
    var BrowserDetector = class {
      async detect(config) {
        const isBrowser = typeof navigator !== "undefined";
        if (!isBrowser) {
          return __1.Resource.empty();
        }
        const browserResource = {
          [semantic_conventions_1.SemanticResourceAttributes.PROCESS_RUNTIME_NAME]: "browser",
          [semantic_conventions_1.SemanticResourceAttributes.PROCESS_RUNTIME_DESCRIPTION]: "Web Browser",
          [semantic_conventions_1.SemanticResourceAttributes.PROCESS_RUNTIME_VERSION]: navigator.userAgent
        };
        return this._getResourceAttributes(browserResource, config);
      }
      /**
       * Validates process resource attribute map from process variables
       *
       * @param browserResource The un-sanitized resource attributes from process as key/value pairs.
       * @param config: Config
       * @returns The sanitized resource attributes.
       */
      _getResourceAttributes(browserResource, _config) {
        if (browserResource[semantic_conventions_1.SemanticResourceAttributes.PROCESS_RUNTIME_VERSION] === "") {
          api_1.diag.debug("BrowserDetector failed: Unable to find required browser resources. ");
          return __1.Resource.empty();
        } else {
          return new __1.Resource(Object.assign({}, browserResource));
        }
      }
    };
    exports.browserDetector = new BrowserDetector();
  }
});

// node_modules/@opentelemetry/resources/build/src/detectors/EnvDetector.js
var require_EnvDetector = __commonJS({
  "node_modules/@opentelemetry/resources/build/src/detectors/EnvDetector.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.envDetector = void 0;
    var api_1 = require_src();
    var core_1 = require_src3();
    var semantic_conventions_1 = require_src2();
    var Resource_1 = require_Resource();
    var EnvDetector = class {
      constructor() {
        this._MAX_LENGTH = 255;
        this._COMMA_SEPARATOR = ",";
        this._LABEL_KEY_VALUE_SPLITTER = "=";
        this._ERROR_MESSAGE_INVALID_CHARS = "should be a ASCII string with a length greater than 0 and not exceed " + this._MAX_LENGTH + " characters.";
        this._ERROR_MESSAGE_INVALID_VALUE = "should be a ASCII string with a length not exceed " + this._MAX_LENGTH + " characters.";
      }
      /**
       * Returns a {@link Resource} populated with attributes from the
       * OTEL_RESOURCE_ATTRIBUTES environment variable. Note this is an async
       * function to conform to the Detector interface.
       *
       * @param config The resource detection config
       */
      async detect(_config) {
        const attributes = {};
        const env = (0, core_1.getEnv)();
        const rawAttributes = env.OTEL_RESOURCE_ATTRIBUTES;
        const serviceName = env.OTEL_SERVICE_NAME;
        if (rawAttributes) {
          try {
            const parsedAttributes = this._parseResourceAttributes(rawAttributes);
            Object.assign(attributes, parsedAttributes);
          } catch (e) {
            api_1.diag.debug(`EnvDetector failed: ${e.message}`);
          }
        }
        if (serviceName) {
          attributes[semantic_conventions_1.SemanticResourceAttributes.SERVICE_NAME] = serviceName;
        }
        return new Resource_1.Resource(attributes);
      }
      /**
       * Creates an attribute map from the OTEL_RESOURCE_ATTRIBUTES environment
       * variable.
       *
       * OTEL_RESOURCE_ATTRIBUTES: A comma-separated list of attributes describing
       * the source in more detail, e.g. “key1=val1,key2=val2”. Domain names and
       * paths are accepted as attribute keys. Values may be quoted or unquoted in
       * general. If a value contains whitespaces, =, or " characters, it must
       * always be quoted.
       *
       * @param rawEnvAttributes The resource attributes as a comma-seperated list
       * of key/value pairs.
       * @returns The sanitized resource attributes.
       */
      _parseResourceAttributes(rawEnvAttributes) {
        if (!rawEnvAttributes)
          return {};
        const attributes = {};
        const rawAttributes = rawEnvAttributes.split(this._COMMA_SEPARATOR, -1);
        for (const rawAttribute of rawAttributes) {
          const keyValuePair = rawAttribute.split(this._LABEL_KEY_VALUE_SPLITTER, -1);
          if (keyValuePair.length !== 2) {
            continue;
          }
          let [key, value] = keyValuePair;
          key = key.trim();
          value = value.trim().split(/^"|"$/).join("");
          if (!this._isValidAndNotEmpty(key)) {
            throw new Error(`Attribute key ${this._ERROR_MESSAGE_INVALID_CHARS}`);
          }
          if (!this._isValid(value)) {
            throw new Error(`Attribute value ${this._ERROR_MESSAGE_INVALID_VALUE}`);
          }
          attributes[key] = decodeURIComponent(value);
        }
        return attributes;
      }
      /**
       * Determines whether the given String is a valid printable ASCII string with
       * a length not exceed _MAX_LENGTH characters.
       *
       * @param str The String to be validated.
       * @returns Whether the String is valid.
       */
      _isValid(name) {
        return name.length <= this._MAX_LENGTH && this._isBaggageOctetString(name);
      }
      // https://www.w3.org/TR/baggage/#definition
      _isBaggageOctetString(str) {
        for (let i = 0; i < str.length; i++) {
          const ch = str.charCodeAt(i);
          if (ch < 33 || ch === 44 || ch === 59 || ch === 92 || ch > 126) {
            return false;
          }
        }
        return true;
      }
      /**
       * Determines whether the given String is a valid printable ASCII string with
       * a length greater than 0 and not exceed _MAX_LENGTH characters.
       *
       * @param str The String to be validated.
       * @returns Whether the String is valid and not empty.
       */
      _isValidAndNotEmpty(str) {
        return str.length > 0 && this._isValid(str);
      }
    };
    exports.envDetector = new EnvDetector();
  }
});

// node_modules/@opentelemetry/resources/build/src/detectors/ProcessDetector.js
var require_ProcessDetector = __commonJS({
  "node_modules/@opentelemetry/resources/build/src/detectors/ProcessDetector.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.processDetector = void 0;
    var api_1 = require_src();
    var semantic_conventions_1 = require_src2();
    var Resource_1 = require_Resource();
    var ProcessDetector = class {
      async detect(config) {
        if (typeof process !== "object") {
          return Resource_1.Resource.empty();
        }
        const processResource = {
          [semantic_conventions_1.SemanticResourceAttributes.PROCESS_PID]: process.pid,
          [semantic_conventions_1.SemanticResourceAttributes.PROCESS_EXECUTABLE_NAME]: process.title || "",
          [semantic_conventions_1.SemanticResourceAttributes.PROCESS_COMMAND]: process.argv[1] || "",
          [semantic_conventions_1.SemanticResourceAttributes.PROCESS_COMMAND_LINE]: process.argv.join(" ") || "",
          [semantic_conventions_1.SemanticResourceAttributes.PROCESS_RUNTIME_VERSION]: process.versions.node,
          [semantic_conventions_1.SemanticResourceAttributes.PROCESS_RUNTIME_NAME]: "nodejs",
          [semantic_conventions_1.SemanticResourceAttributes.PROCESS_RUNTIME_DESCRIPTION]: "Node.js"
        };
        return this._getResourceAttributes(processResource, config);
      }
      /**
       * Validates process resource attribute map from process varaibls
       *
       * @param processResource The unsantized resource attributes from process as key/value pairs.
       * @param config: Config
       * @returns The sanitized resource attributes.
       */
      _getResourceAttributes(processResource, _config) {
        if (processResource[semantic_conventions_1.SemanticResourceAttributes.PROCESS_EXECUTABLE_NAME] === "" || processResource[semantic_conventions_1.SemanticResourceAttributes.PROCESS_EXECUTABLE_PATH] === "" || processResource[semantic_conventions_1.SemanticResourceAttributes.PROCESS_COMMAND] === "" || processResource[semantic_conventions_1.SemanticResourceAttributes.PROCESS_COMMAND_LINE] === "" || processResource[semantic_conventions_1.SemanticResourceAttributes.PROCESS_RUNTIME_VERSION] === "") {
          api_1.diag.debug("ProcessDetector failed: Unable to find required process resources. ");
          return Resource_1.Resource.empty();
        } else {
          return new Resource_1.Resource(Object.assign({}, processResource));
        }
      }
    };
    exports.processDetector = new ProcessDetector();
  }
});

// node_modules/@opentelemetry/resources/build/src/detectors/index.js
var require_detectors = __commonJS({
  "node_modules/@opentelemetry/resources/build/src/detectors/index.js"(exports) {
    "use strict";
    var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      Object.defineProperty(o, k2, { enumerable: true, get: function() {
        return m[k];
      } });
    } : function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      o[k2] = m[k];
    });
    var __exportStar = exports && exports.__exportStar || function(m, exports2) {
      for (var p in m)
        if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports2, p))
          __createBinding(exports2, m, p);
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    __exportStar(require_BrowserDetector(), exports);
    __exportStar(require_EnvDetector(), exports);
    __exportStar(require_ProcessDetector(), exports);
  }
});

// node_modules/@opentelemetry/resources/build/src/index.js
var require_src8 = __commonJS({
  "node_modules/@opentelemetry/resources/build/src/index.js"(exports) {
    "use strict";
    var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      Object.defineProperty(o, k2, { enumerable: true, get: function() {
        return m[k];
      } });
    } : function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      o[k2] = m[k];
    });
    var __exportStar = exports && exports.__exportStar || function(m, exports2) {
      for (var p in m)
        if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports2, p))
          __createBinding(exports2, m, p);
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    __exportStar(require_Resource(), exports);
    __exportStar(require_platform4(), exports);
    __exportStar(require_types6(), exports);
    __exportStar(require_config(), exports);
    __exportStar(require_detectors(), exports);
  }
});

// node_modules/@opentelemetry/sdk-trace-base/build/src/enums.js
var require_enums = __commonJS({
  "node_modules/@opentelemetry/sdk-trace-base/build/src/enums.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ExceptionEventName = void 0;
    exports.ExceptionEventName = "exception";
  }
});

// node_modules/@opentelemetry/sdk-trace-base/build/src/Span.js
var require_Span = __commonJS({
  "node_modules/@opentelemetry/sdk-trace-base/build/src/Span.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Span = void 0;
    var api2 = require_src();
    var core_1 = require_src3();
    var semantic_conventions_1 = require_src2();
    var enums_1 = require_enums();
    var Span = class {
      /**
       * Constructs a new Span instance.
       *
       * @deprecated calling Span constructor directly is not supported. Please use tracer.startSpan.
       * */
      constructor(parentTracer, context, spanName, spanContext, kind, parentSpanId, links = [], startTime, clock = core_1.otperformance) {
        this.attributes = {};
        this.links = [];
        this.events = [];
        this.status = {
          code: api2.SpanStatusCode.UNSET
        };
        this.endTime = [0, 0];
        this._ended = false;
        this._duration = [-1, -1];
        this._clock = clock;
        this.name = spanName;
        this._spanContext = spanContext;
        this.parentSpanId = parentSpanId;
        this.kind = kind;
        this.links = links;
        this.startTime = (0, core_1.timeInputToHrTime)(startTime !== null && startTime !== void 0 ? startTime : clock.now());
        this.resource = parentTracer.resource;
        this.instrumentationLibrary = parentTracer.instrumentationLibrary;
        this._spanLimits = parentTracer.getSpanLimits();
        this._spanProcessor = parentTracer.getActiveSpanProcessor();
        this._spanProcessor.onStart(this, context);
        this._attributeValueLengthLimit = this._spanLimits.attributeValueLengthLimit || 0;
      }
      spanContext() {
        return this._spanContext;
      }
      setAttribute(key, value) {
        if (value == null || this._isSpanEnded())
          return this;
        if (key.length === 0) {
          api2.diag.warn(`Invalid attribute key: ${key}`);
          return this;
        }
        if (!(0, core_1.isAttributeValue)(value)) {
          api2.diag.warn(`Invalid attribute value set for key: ${key}`);
          return this;
        }
        if (Object.keys(this.attributes).length >= this._spanLimits.attributeCountLimit && !Object.prototype.hasOwnProperty.call(this.attributes, key)) {
          return this;
        }
        this.attributes[key] = this._truncateToSize(value);
        return this;
      }
      setAttributes(attributes) {
        for (const [k, v] of Object.entries(attributes)) {
          this.setAttribute(k, v);
        }
        return this;
      }
      /**
       *
       * @param name Span Name
       * @param [attributesOrStartTime] Span attributes or start time
       *     if type is {@type TimeInput} and 3rd param is undefined
       * @param [startTime] Specified start time for the event
       */
      addEvent(name, attributesOrStartTime, startTime) {
        if (this._isSpanEnded())
          return this;
        if (this._spanLimits.eventCountLimit === 0) {
          api2.diag.warn("No events allowed.");
          return this;
        }
        if (this.events.length >= this._spanLimits.eventCountLimit) {
          api2.diag.warn("Dropping extra events.");
          this.events.shift();
        }
        if ((0, core_1.isTimeInput)(attributesOrStartTime)) {
          if (typeof startTime === "undefined") {
            startTime = attributesOrStartTime;
          }
          attributesOrStartTime = void 0;
        }
        if (typeof startTime === "undefined") {
          startTime = this._clock.now();
        }
        const attributes = (0, core_1.sanitizeAttributes)(attributesOrStartTime);
        this.events.push({
          name,
          attributes,
          time: (0, core_1.timeInputToHrTime)(startTime)
        });
        return this;
      }
      setStatus(status) {
        if (this._isSpanEnded())
          return this;
        this.status = status;
        return this;
      }
      updateName(name) {
        if (this._isSpanEnded())
          return this;
        this.name = name;
        return this;
      }
      end(endTime) {
        if (this._isSpanEnded()) {
          api2.diag.error("You can only call end() on a span once.");
          return;
        }
        this._ended = true;
        this.endTime = (0, core_1.timeInputToHrTime)(endTime !== null && endTime !== void 0 ? endTime : this._clock.now());
        this._duration = (0, core_1.hrTimeDuration)(this.startTime, this.endTime);
        if (this._duration[0] < 0) {
          api2.diag.warn("Inconsistent start and end time, startTime > endTime. Setting span duration to 0ms.", this.startTime, this.endTime);
          this.endTime = this.startTime.slice();
          this._duration = [0, 0];
        }
        this._spanProcessor.onEnd(this);
      }
      isRecording() {
        return this._ended === false;
      }
      recordException(exception, time = this._clock.now()) {
        const attributes = {};
        if (typeof exception === "string") {
          attributes[semantic_conventions_1.SemanticAttributes.EXCEPTION_MESSAGE] = exception;
        } else if (exception) {
          if (exception.code) {
            attributes[semantic_conventions_1.SemanticAttributes.EXCEPTION_TYPE] = exception.code.toString();
          } else if (exception.name) {
            attributes[semantic_conventions_1.SemanticAttributes.EXCEPTION_TYPE] = exception.name;
          }
          if (exception.message) {
            attributes[semantic_conventions_1.SemanticAttributes.EXCEPTION_MESSAGE] = exception.message;
          }
          if (exception.stack) {
            attributes[semantic_conventions_1.SemanticAttributes.EXCEPTION_STACKTRACE] = exception.stack;
          }
        }
        if (attributes[semantic_conventions_1.SemanticAttributes.EXCEPTION_TYPE] || attributes[semantic_conventions_1.SemanticAttributes.EXCEPTION_MESSAGE]) {
          this.addEvent(enums_1.ExceptionEventName, attributes, time);
        } else {
          api2.diag.warn(`Failed to record an exception ${exception}`);
        }
      }
      get duration() {
        return this._duration;
      }
      get ended() {
        return this._ended;
      }
      _isSpanEnded() {
        if (this._ended) {
          api2.diag.warn(`Can not execute the operation on ended Span {traceId: ${this._spanContext.traceId}, spanId: ${this._spanContext.spanId}}`);
        }
        return this._ended;
      }
      // Utility function to truncate given value within size
      // for value type of string, will truncate to given limit
      // for type of non-string, will return same value
      _truncateToLimitUtil(value, limit) {
        if (value.length <= limit) {
          return value;
        }
        return value.substr(0, limit);
      }
      /**
       * If the given attribute value is of type string and has more characters than given {@code attributeValueLengthLimit} then
       * return string with trucated to {@code attributeValueLengthLimit} characters
       *
       * If the given attribute value is array of strings then
       * return new array of strings with each element truncated to {@code attributeValueLengthLimit} characters
       *
       * Otherwise return same Attribute {@code value}
       *
       * @param value Attribute value
       * @returns truncated attribute value if required, otherwise same value
       */
      _truncateToSize(value) {
        const limit = this._attributeValueLengthLimit;
        if (limit <= 0) {
          api2.diag.warn(`Attribute value limit must be positive, got ${limit}`);
          return value;
        }
        if (typeof value === "string") {
          return this._truncateToLimitUtil(value, limit);
        }
        if (Array.isArray(value)) {
          return value.map((val) => typeof val === "string" ? this._truncateToLimitUtil(val, limit) : val);
        }
        return value;
      }
    };
    exports.Span = Span;
  }
});

// node_modules/@opentelemetry/sdk-trace-base/build/src/Sampler.js
var require_Sampler = __commonJS({
  "node_modules/@opentelemetry/sdk-trace-base/build/src/Sampler.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.SamplingDecision = void 0;
    var SamplingDecision;
    (function(SamplingDecision2) {
      SamplingDecision2[SamplingDecision2["NOT_RECORD"] = 0] = "NOT_RECORD";
      SamplingDecision2[SamplingDecision2["RECORD"] = 1] = "RECORD";
      SamplingDecision2[SamplingDecision2["RECORD_AND_SAMPLED"] = 2] = "RECORD_AND_SAMPLED";
    })(SamplingDecision = exports.SamplingDecision || (exports.SamplingDecision = {}));
  }
});

// node_modules/@opentelemetry/sdk-trace-base/build/src/sampler/AlwaysOffSampler.js
var require_AlwaysOffSampler2 = __commonJS({
  "node_modules/@opentelemetry/sdk-trace-base/build/src/sampler/AlwaysOffSampler.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.AlwaysOffSampler = void 0;
    var Sampler_1 = require_Sampler();
    var AlwaysOffSampler = class {
      shouldSample() {
        return {
          decision: Sampler_1.SamplingDecision.NOT_RECORD
        };
      }
      toString() {
        return "AlwaysOffSampler";
      }
    };
    exports.AlwaysOffSampler = AlwaysOffSampler;
  }
});

// node_modules/@opentelemetry/sdk-trace-base/build/src/sampler/AlwaysOnSampler.js
var require_AlwaysOnSampler2 = __commonJS({
  "node_modules/@opentelemetry/sdk-trace-base/build/src/sampler/AlwaysOnSampler.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.AlwaysOnSampler = void 0;
    var Sampler_1 = require_Sampler();
    var AlwaysOnSampler = class {
      shouldSample() {
        return {
          decision: Sampler_1.SamplingDecision.RECORD_AND_SAMPLED
        };
      }
      toString() {
        return "AlwaysOnSampler";
      }
    };
    exports.AlwaysOnSampler = AlwaysOnSampler;
  }
});

// node_modules/@opentelemetry/sdk-trace-base/build/src/sampler/ParentBasedSampler.js
var require_ParentBasedSampler2 = __commonJS({
  "node_modules/@opentelemetry/sdk-trace-base/build/src/sampler/ParentBasedSampler.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ParentBasedSampler = void 0;
    var api_1 = require_src();
    var core_1 = require_src3();
    var AlwaysOffSampler_1 = require_AlwaysOffSampler2();
    var AlwaysOnSampler_1 = require_AlwaysOnSampler2();
    var ParentBasedSampler = class {
      constructor(config) {
        var _a, _b, _c, _d;
        this._root = config.root;
        if (!this._root) {
          (0, core_1.globalErrorHandler)(new Error("ParentBasedSampler must have a root sampler configured"));
          this._root = new AlwaysOnSampler_1.AlwaysOnSampler();
        }
        this._remoteParentSampled = (_a = config.remoteParentSampled) !== null && _a !== void 0 ? _a : new AlwaysOnSampler_1.AlwaysOnSampler();
        this._remoteParentNotSampled = (_b = config.remoteParentNotSampled) !== null && _b !== void 0 ? _b : new AlwaysOffSampler_1.AlwaysOffSampler();
        this._localParentSampled = (_c = config.localParentSampled) !== null && _c !== void 0 ? _c : new AlwaysOnSampler_1.AlwaysOnSampler();
        this._localParentNotSampled = (_d = config.localParentNotSampled) !== null && _d !== void 0 ? _d : new AlwaysOffSampler_1.AlwaysOffSampler();
      }
      shouldSample(context, traceId, spanName, spanKind, attributes, links) {
        const parentContext = api_1.trace.getSpanContext(context);
        if (!parentContext || !(0, api_1.isSpanContextValid)(parentContext)) {
          return this._root.shouldSample(context, traceId, spanName, spanKind, attributes, links);
        }
        if (parentContext.isRemote) {
          if (parentContext.traceFlags & api_1.TraceFlags.SAMPLED) {
            return this._remoteParentSampled.shouldSample(context, traceId, spanName, spanKind, attributes, links);
          }
          return this._remoteParentNotSampled.shouldSample(context, traceId, spanName, spanKind, attributes, links);
        }
        if (parentContext.traceFlags & api_1.TraceFlags.SAMPLED) {
          return this._localParentSampled.shouldSample(context, traceId, spanName, spanKind, attributes, links);
        }
        return this._localParentNotSampled.shouldSample(context, traceId, spanName, spanKind, attributes, links);
      }
      toString() {
        return `ParentBased{root=${this._root.toString()}, remoteParentSampled=${this._remoteParentSampled.toString()}, remoteParentNotSampled=${this._remoteParentNotSampled.toString()}, localParentSampled=${this._localParentSampled.toString()}, localParentNotSampled=${this._localParentNotSampled.toString()}}`;
      }
    };
    exports.ParentBasedSampler = ParentBasedSampler;
  }
});

// node_modules/@opentelemetry/sdk-trace-base/build/src/sampler/TraceIdRatioBasedSampler.js
var require_TraceIdRatioBasedSampler2 = __commonJS({
  "node_modules/@opentelemetry/sdk-trace-base/build/src/sampler/TraceIdRatioBasedSampler.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.TraceIdRatioBasedSampler = void 0;
    var api_1 = require_src();
    var Sampler_1 = require_Sampler();
    var TraceIdRatioBasedSampler = class {
      constructor(_ratio = 0) {
        this._ratio = _ratio;
        this._ratio = this._normalize(_ratio);
        this._upperBound = Math.floor(this._ratio * 4294967295);
      }
      shouldSample(context, traceId) {
        return {
          decision: (0, api_1.isValidTraceId)(traceId) && this._accumulate(traceId) < this._upperBound ? Sampler_1.SamplingDecision.RECORD_AND_SAMPLED : Sampler_1.SamplingDecision.NOT_RECORD
        };
      }
      toString() {
        return `TraceIdRatioBased{${this._ratio}}`;
      }
      _normalize(ratio) {
        if (typeof ratio !== "number" || isNaN(ratio))
          return 0;
        return ratio >= 1 ? 1 : ratio <= 0 ? 0 : ratio;
      }
      _accumulate(traceId) {
        let accumulation = 0;
        for (let i = 0; i < traceId.length / 8; i++) {
          const pos = i * 8;
          const part = parseInt(traceId.slice(pos, pos + 8), 16);
          accumulation = (accumulation ^ part) >>> 0;
        }
        return accumulation;
      }
    };
    exports.TraceIdRatioBasedSampler = TraceIdRatioBasedSampler;
  }
});

// node_modules/@opentelemetry/sdk-trace-base/build/src/config.js
var require_config2 = __commonJS({
  "node_modules/@opentelemetry/sdk-trace-base/build/src/config.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.buildSamplerFromEnv = exports.loadDefaultConfig = void 0;
    var api_1 = require_src();
    var core_1 = require_src3();
    var AlwaysOffSampler_1 = require_AlwaysOffSampler2();
    var AlwaysOnSampler_1 = require_AlwaysOnSampler2();
    var ParentBasedSampler_1 = require_ParentBasedSampler2();
    var TraceIdRatioBasedSampler_1 = require_TraceIdRatioBasedSampler2();
    var env = (0, core_1.getEnv)();
    var FALLBACK_OTEL_TRACES_SAMPLER = core_1.TracesSamplerValues.AlwaysOn;
    var DEFAULT_RATIO = 1;
    function loadDefaultConfig() {
      return {
        sampler: buildSamplerFromEnv(env),
        forceFlushTimeoutMillis: 3e4,
        generalLimits: {
          attributeValueLengthLimit: (0, core_1.getEnv)().OTEL_ATTRIBUTE_VALUE_LENGTH_LIMIT,
          attributeCountLimit: (0, core_1.getEnv)().OTEL_ATTRIBUTE_COUNT_LIMIT
        },
        spanLimits: {
          attributeValueLengthLimit: (0, core_1.getEnv)().OTEL_SPAN_ATTRIBUTE_VALUE_LENGTH_LIMIT,
          attributeCountLimit: (0, core_1.getEnv)().OTEL_SPAN_ATTRIBUTE_COUNT_LIMIT,
          linkCountLimit: (0, core_1.getEnv)().OTEL_SPAN_LINK_COUNT_LIMIT,
          eventCountLimit: (0, core_1.getEnv)().OTEL_SPAN_EVENT_COUNT_LIMIT
        }
      };
    }
    exports.loadDefaultConfig = loadDefaultConfig;
    function buildSamplerFromEnv(environment = (0, core_1.getEnv)()) {
      switch (environment.OTEL_TRACES_SAMPLER) {
        case core_1.TracesSamplerValues.AlwaysOn:
          return new AlwaysOnSampler_1.AlwaysOnSampler();
        case core_1.TracesSamplerValues.AlwaysOff:
          return new AlwaysOffSampler_1.AlwaysOffSampler();
        case core_1.TracesSamplerValues.ParentBasedAlwaysOn:
          return new ParentBasedSampler_1.ParentBasedSampler({
            root: new AlwaysOnSampler_1.AlwaysOnSampler()
          });
        case core_1.TracesSamplerValues.ParentBasedAlwaysOff:
          return new ParentBasedSampler_1.ParentBasedSampler({
            root: new AlwaysOffSampler_1.AlwaysOffSampler()
          });
        case core_1.TracesSamplerValues.TraceIdRatio:
          return new TraceIdRatioBasedSampler_1.TraceIdRatioBasedSampler(getSamplerProbabilityFromEnv(environment));
        case core_1.TracesSamplerValues.ParentBasedTraceIdRatio:
          return new ParentBasedSampler_1.ParentBasedSampler({
            root: new TraceIdRatioBasedSampler_1.TraceIdRatioBasedSampler(getSamplerProbabilityFromEnv(environment))
          });
        default:
          api_1.diag.error(`OTEL_TRACES_SAMPLER value "${environment.OTEL_TRACES_SAMPLER} invalid, defaulting to ${FALLBACK_OTEL_TRACES_SAMPLER}".`);
          return new AlwaysOnSampler_1.AlwaysOnSampler();
      }
    }
    exports.buildSamplerFromEnv = buildSamplerFromEnv;
    function getSamplerProbabilityFromEnv(environment) {
      if (environment.OTEL_TRACES_SAMPLER_ARG === void 0 || environment.OTEL_TRACES_SAMPLER_ARG === "") {
        api_1.diag.error(`OTEL_TRACES_SAMPLER_ARG is blank, defaulting to ${DEFAULT_RATIO}.`);
        return DEFAULT_RATIO;
      }
      const probability = Number(environment.OTEL_TRACES_SAMPLER_ARG);
      if (isNaN(probability)) {
        api_1.diag.error(`OTEL_TRACES_SAMPLER_ARG=${environment.OTEL_TRACES_SAMPLER_ARG} was given, but it is invalid, defaulting to ${DEFAULT_RATIO}.`);
        return DEFAULT_RATIO;
      }
      if (probability < 0 || probability > 1) {
        api_1.diag.error(`OTEL_TRACES_SAMPLER_ARG=${environment.OTEL_TRACES_SAMPLER_ARG} was given, but it is out of range ([0..1]), defaulting to ${DEFAULT_RATIO}.`);
        return DEFAULT_RATIO;
      }
      return probability;
    }
  }
});

// node_modules/@opentelemetry/sdk-trace-base/build/src/utility.js
var require_utility = __commonJS({
  "node_modules/@opentelemetry/sdk-trace-base/build/src/utility.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.reconfigureLimits = exports.mergeConfig = void 0;
    var config_1 = require_config2();
    var core_1 = require_src3();
    function mergeConfig(userConfig) {
      const perInstanceDefaults = {
        sampler: (0, config_1.buildSamplerFromEnv)()
      };
      const DEFAULT_CONFIG = (0, config_1.loadDefaultConfig)();
      const target = Object.assign({}, DEFAULT_CONFIG, perInstanceDefaults, userConfig);
      target.generalLimits = Object.assign({}, DEFAULT_CONFIG.generalLimits, userConfig.generalLimits || {});
      target.spanLimits = Object.assign({}, DEFAULT_CONFIG.spanLimits, userConfig.spanLimits || {});
      return target;
    }
    exports.mergeConfig = mergeConfig;
    function reconfigureLimits(userConfig) {
      var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
      const spanLimits = Object.assign({}, userConfig.spanLimits);
      const parsedEnvConfig = (0, core_1.getEnvWithoutDefaults)();
      spanLimits.attributeCountLimit = (_f = (_e = (_d = (_b = (_a = userConfig.spanLimits) === null || _a === void 0 ? void 0 : _a.attributeCountLimit) !== null && _b !== void 0 ? _b : (_c = userConfig.generalLimits) === null || _c === void 0 ? void 0 : _c.attributeCountLimit) !== null && _d !== void 0 ? _d : parsedEnvConfig.OTEL_SPAN_ATTRIBUTE_COUNT_LIMIT) !== null && _e !== void 0 ? _e : parsedEnvConfig.OTEL_ATTRIBUTE_COUNT_LIMIT) !== null && _f !== void 0 ? _f : core_1.DEFAULT_ATTRIBUTE_COUNT_LIMIT;
      spanLimits.attributeValueLengthLimit = (_m = (_l = (_k = (_h = (_g = userConfig.spanLimits) === null || _g === void 0 ? void 0 : _g.attributeValueLengthLimit) !== null && _h !== void 0 ? _h : (_j = userConfig.generalLimits) === null || _j === void 0 ? void 0 : _j.attributeValueLengthLimit) !== null && _k !== void 0 ? _k : parsedEnvConfig.OTEL_SPAN_ATTRIBUTE_VALUE_LENGTH_LIMIT) !== null && _l !== void 0 ? _l : parsedEnvConfig.OTEL_ATTRIBUTE_VALUE_LENGTH_LIMIT) !== null && _m !== void 0 ? _m : core_1.DEFAULT_ATTRIBUTE_VALUE_LENGTH_LIMIT;
      return Object.assign({}, userConfig, { spanLimits });
    }
    exports.reconfigureLimits = reconfigureLimits;
  }
});

// node_modules/@opentelemetry/sdk-trace-base/build/src/export/BatchSpanProcessorBase.js
var require_BatchSpanProcessorBase = __commonJS({
  "node_modules/@opentelemetry/sdk-trace-base/build/src/export/BatchSpanProcessorBase.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.BatchSpanProcessorBase = void 0;
    var api_1 = require_src();
    var core_1 = require_src3();
    var BatchSpanProcessorBase = class {
      constructor(_exporter, config) {
        this._exporter = _exporter;
        this._finishedSpans = [];
        const env = (0, core_1.getEnv)();
        this._maxExportBatchSize = typeof (config === null || config === void 0 ? void 0 : config.maxExportBatchSize) === "number" ? config.maxExportBatchSize : env.OTEL_BSP_MAX_EXPORT_BATCH_SIZE;
        this._maxQueueSize = typeof (config === null || config === void 0 ? void 0 : config.maxQueueSize) === "number" ? config.maxQueueSize : env.OTEL_BSP_MAX_QUEUE_SIZE;
        this._scheduledDelayMillis = typeof (config === null || config === void 0 ? void 0 : config.scheduledDelayMillis) === "number" ? config.scheduledDelayMillis : env.OTEL_BSP_SCHEDULE_DELAY;
        this._exportTimeoutMillis = typeof (config === null || config === void 0 ? void 0 : config.exportTimeoutMillis) === "number" ? config.exportTimeoutMillis : env.OTEL_BSP_EXPORT_TIMEOUT;
        this._shutdownOnce = new core_1.BindOnceFuture(this._shutdown, this);
        if (this._maxExportBatchSize > this._maxQueueSize) {
          api_1.diag.warn("BatchSpanProcessor: maxExportBatchSize must be smaller or equal to maxQueueSize, setting maxExportBatchSize to match maxQueueSize");
          this._maxExportBatchSize = this._maxQueueSize;
        }
      }
      forceFlush() {
        if (this._shutdownOnce.isCalled) {
          return this._shutdownOnce.promise;
        }
        return this._flushAll();
      }
      // does nothing.
      onStart(_span, _parentContext) {
      }
      onEnd(span) {
        if (this._shutdownOnce.isCalled) {
          return;
        }
        if ((span.spanContext().traceFlags & api_1.TraceFlags.SAMPLED) === 0) {
          return;
        }
        this._addToBuffer(span);
      }
      shutdown() {
        return this._shutdownOnce.call();
      }
      _shutdown() {
        return Promise.resolve().then(() => {
          return this.onShutdown();
        }).then(() => {
          return this._flushAll();
        }).then(() => {
          return this._exporter.shutdown();
        });
      }
      /** Add a span in the buffer. */
      _addToBuffer(span) {
        if (this._finishedSpans.length >= this._maxQueueSize) {
          return;
        }
        this._finishedSpans.push(span);
        this._maybeStartTimer();
      }
      /**
       * Send all spans to the exporter respecting the batch size limit
       * This function is used only on forceFlush or shutdown,
       * for all other cases _flush should be used
       * */
      _flushAll() {
        return new Promise((resolve, reject) => {
          const promises = [];
          const count = Math.ceil(this._finishedSpans.length / this._maxExportBatchSize);
          for (let i = 0, j = count; i < j; i++) {
            promises.push(this._flushOneBatch());
          }
          Promise.all(promises).then(() => {
            resolve();
          }).catch(reject);
        });
      }
      _flushOneBatch() {
        this._clearTimer();
        if (this._finishedSpans.length === 0) {
          return Promise.resolve();
        }
        return new Promise((resolve, reject) => {
          const timer = setTimeout(() => {
            reject(new Error("Timeout"));
          }, this._exportTimeoutMillis);
          api_1.context.with((0, core_1.suppressTracing)(api_1.context.active()), () => {
            this._exporter.export(this._finishedSpans.splice(0, this._maxExportBatchSize), (result) => {
              var _a;
              clearTimeout(timer);
              if (result.code === core_1.ExportResultCode.SUCCESS) {
                resolve();
              } else {
                reject((_a = result.error) !== null && _a !== void 0 ? _a : new Error("BatchSpanProcessor: span export failed"));
              }
            });
          });
        });
      }
      _maybeStartTimer() {
        if (this._timer !== void 0)
          return;
        this._timer = setTimeout(() => {
          this._flushOneBatch().then(() => {
            if (this._finishedSpans.length > 0) {
              this._clearTimer();
              this._maybeStartTimer();
            }
          }).catch((e) => {
            (0, core_1.globalErrorHandler)(e);
          });
        }, this._scheduledDelayMillis);
        (0, core_1.unrefTimer)(this._timer);
      }
      _clearTimer() {
        if (this._timer !== void 0) {
          clearTimeout(this._timer);
          this._timer = void 0;
        }
      }
    };
    exports.BatchSpanProcessorBase = BatchSpanProcessorBase;
  }
});

// node_modules/@opentelemetry/sdk-trace-base/build/src/platform/node/export/BatchSpanProcessor.js
var require_BatchSpanProcessor = __commonJS({
  "node_modules/@opentelemetry/sdk-trace-base/build/src/platform/node/export/BatchSpanProcessor.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.BatchSpanProcessor = void 0;
    var BatchSpanProcessorBase_1 = require_BatchSpanProcessorBase();
    var BatchSpanProcessor2 = class extends BatchSpanProcessorBase_1.BatchSpanProcessorBase {
      onShutdown() {
      }
    };
    exports.BatchSpanProcessor = BatchSpanProcessor2;
  }
});

// node_modules/@opentelemetry/sdk-trace-base/build/src/platform/node/RandomIdGenerator.js
var require_RandomIdGenerator2 = __commonJS({
  "node_modules/@opentelemetry/sdk-trace-base/build/src/platform/node/RandomIdGenerator.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.RandomIdGenerator = void 0;
    var SPAN_ID_BYTES = 8;
    var TRACE_ID_BYTES = 16;
    var RandomIdGenerator = class {
      constructor() {
        this.generateTraceId = getIdGenerator(TRACE_ID_BYTES);
        this.generateSpanId = getIdGenerator(SPAN_ID_BYTES);
      }
    };
    exports.RandomIdGenerator = RandomIdGenerator;
    var SHARED_BUFFER = Buffer.allocUnsafe(TRACE_ID_BYTES);
    function getIdGenerator(bytes) {
      return function generateId() {
        for (let i = 0; i < bytes / 4; i++) {
          SHARED_BUFFER.writeUInt32BE(Math.random() * 2 ** 32 >>> 0, i * 4);
        }
        for (let i = 0; i < bytes; i++) {
          if (SHARED_BUFFER[i] > 0) {
            break;
          } else if (i === bytes - 1) {
            SHARED_BUFFER[bytes - 1] = 1;
          }
        }
        return SHARED_BUFFER.toString("hex", 0, bytes);
      };
    }
  }
});

// node_modules/@opentelemetry/sdk-trace-base/build/src/platform/node/index.js
var require_node6 = __commonJS({
  "node_modules/@opentelemetry/sdk-trace-base/build/src/platform/node/index.js"(exports) {
    "use strict";
    var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      Object.defineProperty(o, k2, { enumerable: true, get: function() {
        return m[k];
      } });
    } : function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      o[k2] = m[k];
    });
    var __exportStar = exports && exports.__exportStar || function(m, exports2) {
      for (var p in m)
        if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports2, p))
          __createBinding(exports2, m, p);
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    __exportStar(require_BatchSpanProcessor(), exports);
    __exportStar(require_RandomIdGenerator2(), exports);
  }
});

// node_modules/@opentelemetry/sdk-trace-base/build/src/platform/index.js
var require_platform5 = __commonJS({
  "node_modules/@opentelemetry/sdk-trace-base/build/src/platform/index.js"(exports) {
    "use strict";
    var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      Object.defineProperty(o, k2, { enumerable: true, get: function() {
        return m[k];
      } });
    } : function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      o[k2] = m[k];
    });
    var __exportStar = exports && exports.__exportStar || function(m, exports2) {
      for (var p in m)
        if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports2, p))
          __createBinding(exports2, m, p);
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    __exportStar(require_node6(), exports);
  }
});

// node_modules/@opentelemetry/sdk-trace-base/build/src/Tracer.js
var require_Tracer = __commonJS({
  "node_modules/@opentelemetry/sdk-trace-base/build/src/Tracer.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Tracer = void 0;
    var api2 = require_src();
    var core_1 = require_src3();
    var Span_1 = require_Span();
    var utility_1 = require_utility();
    var platform_1 = require_platform5();
    var Tracer = class {
      /**
       * Constructs a new Tracer instance.
       */
      constructor(instrumentationLibrary, config, _tracerProvider) {
        this._tracerProvider = _tracerProvider;
        const localConfig = (0, utility_1.mergeConfig)(config);
        this._sampler = localConfig.sampler;
        this._generalLimits = localConfig.generalLimits;
        this._spanLimits = localConfig.spanLimits;
        this._idGenerator = config.idGenerator || new platform_1.RandomIdGenerator();
        this.resource = _tracerProvider.resource;
        this.instrumentationLibrary = instrumentationLibrary;
      }
      /**
       * Starts a new Span or returns the default NoopSpan based on the sampling
       * decision.
       */
      startSpan(name, options = {}, context = api2.context.active()) {
        var _a, _b;
        if (options.root) {
          context = api2.trace.deleteSpan(context);
        }
        const parentSpan = api2.trace.getSpan(context);
        if ((0, core_1.isTracingSuppressed)(context)) {
          api2.diag.debug("Instrumentation suppressed, returning Noop Span");
          const nonRecordingSpan = api2.trace.wrapSpanContext(api2.INVALID_SPAN_CONTEXT);
          return nonRecordingSpan;
        }
        const parentSpanContext = parentSpan === null || parentSpan === void 0 ? void 0 : parentSpan.spanContext();
        const spanId = this._idGenerator.generateSpanId();
        let traceId;
        let traceState;
        let parentSpanId;
        if (!parentSpanContext || !api2.trace.isSpanContextValid(parentSpanContext)) {
          traceId = this._idGenerator.generateTraceId();
        } else {
          traceId = parentSpanContext.traceId;
          traceState = parentSpanContext.traceState;
          parentSpanId = parentSpanContext.spanId;
        }
        const spanKind = (_a = options.kind) !== null && _a !== void 0 ? _a : api2.SpanKind.INTERNAL;
        const links = ((_b = options.links) !== null && _b !== void 0 ? _b : []).map((link) => {
          return {
            context: link.context,
            attributes: (0, core_1.sanitizeAttributes)(link.attributes)
          };
        });
        const attributes = (0, core_1.sanitizeAttributes)(options.attributes);
        const samplingResult = this._sampler.shouldSample(context, traceId, name, spanKind, attributes, links);
        const traceFlags = samplingResult.decision === api2.SamplingDecision.RECORD_AND_SAMPLED ? api2.TraceFlags.SAMPLED : api2.TraceFlags.NONE;
        const spanContext = { traceId, spanId, traceFlags, traceState };
        if (samplingResult.decision === api2.SamplingDecision.NOT_RECORD) {
          api2.diag.debug("Recording is off, propagating context in a non-recording span");
          const nonRecordingSpan = api2.trace.wrapSpanContext(spanContext);
          return nonRecordingSpan;
        }
        const span = new Span_1.Span(this, context, name, spanContext, spanKind, parentSpanId, links, options.startTime);
        const initAttributes = (0, core_1.sanitizeAttributes)(Object.assign(attributes, samplingResult.attributes));
        span.setAttributes(initAttributes);
        return span;
      }
      startActiveSpan(name, arg2, arg3, arg4) {
        let opts;
        let ctx;
        let fn;
        if (arguments.length < 2) {
          return;
        } else if (arguments.length === 2) {
          fn = arg2;
        } else if (arguments.length === 3) {
          opts = arg2;
          fn = arg3;
        } else {
          opts = arg2;
          ctx = arg3;
          fn = arg4;
        }
        const parentContext = ctx !== null && ctx !== void 0 ? ctx : api2.context.active();
        const span = this.startSpan(name, opts, parentContext);
        const contextWithSpanSet = api2.trace.setSpan(parentContext, span);
        return api2.context.with(contextWithSpanSet, fn, void 0, span);
      }
      /** Returns the active {@link GeneralLimits}. */
      getGeneralLimits() {
        return this._generalLimits;
      }
      /** Returns the active {@link SpanLimits}. */
      getSpanLimits() {
        return this._spanLimits;
      }
      getActiveSpanProcessor() {
        return this._tracerProvider.getActiveSpanProcessor();
      }
    };
    exports.Tracer = Tracer;
  }
});

// node_modules/@opentelemetry/sdk-trace-base/build/src/MultiSpanProcessor.js
var require_MultiSpanProcessor = __commonJS({
  "node_modules/@opentelemetry/sdk-trace-base/build/src/MultiSpanProcessor.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.MultiSpanProcessor = void 0;
    var core_1 = require_src3();
    var MultiSpanProcessor = class {
      constructor(_spanProcessors) {
        this._spanProcessors = _spanProcessors;
      }
      forceFlush() {
        const promises = [];
        for (const spanProcessor2 of this._spanProcessors) {
          promises.push(spanProcessor2.forceFlush());
        }
        return new Promise((resolve) => {
          Promise.all(promises).then(() => {
            resolve();
          }).catch((error) => {
            (0, core_1.globalErrorHandler)(error || new Error("MultiSpanProcessor: forceFlush failed"));
            resolve();
          });
        });
      }
      onStart(span, context) {
        for (const spanProcessor2 of this._spanProcessors) {
          spanProcessor2.onStart(span, context);
        }
      }
      onEnd(span) {
        for (const spanProcessor2 of this._spanProcessors) {
          spanProcessor2.onEnd(span);
        }
      }
      shutdown() {
        const promises = [];
        for (const spanProcessor2 of this._spanProcessors) {
          promises.push(spanProcessor2.shutdown());
        }
        return new Promise((resolve, reject) => {
          Promise.all(promises).then(() => {
            resolve();
          }, reject);
        });
      }
    };
    exports.MultiSpanProcessor = MultiSpanProcessor;
  }
});

// node_modules/@opentelemetry/sdk-trace-base/build/src/export/NoopSpanProcessor.js
var require_NoopSpanProcessor = __commonJS({
  "node_modules/@opentelemetry/sdk-trace-base/build/src/export/NoopSpanProcessor.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.NoopSpanProcessor = void 0;
    var NoopSpanProcessor = class {
      onStart(_span, _context) {
      }
      onEnd(_span) {
      }
      shutdown() {
        return Promise.resolve();
      }
      forceFlush() {
        return Promise.resolve();
      }
    };
    exports.NoopSpanProcessor = NoopSpanProcessor;
  }
});

// node_modules/@opentelemetry/sdk-trace-base/build/src/BasicTracerProvider.js
var require_BasicTracerProvider = __commonJS({
  "node_modules/@opentelemetry/sdk-trace-base/build/src/BasicTracerProvider.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.BasicTracerProvider = exports.ForceFlushState = void 0;
    var api_1 = require_src();
    var core_1 = require_src3();
    var resources_1 = require_src8();
    var _1 = require_src9();
    var config_1 = require_config2();
    var MultiSpanProcessor_1 = require_MultiSpanProcessor();
    var NoopSpanProcessor_1 = require_NoopSpanProcessor();
    var platform_1 = require_platform5();
    var utility_1 = require_utility();
    var ForceFlushState;
    (function(ForceFlushState2) {
      ForceFlushState2[ForceFlushState2["resolved"] = 0] = "resolved";
      ForceFlushState2[ForceFlushState2["timeout"] = 1] = "timeout";
      ForceFlushState2[ForceFlushState2["error"] = 2] = "error";
      ForceFlushState2[ForceFlushState2["unresolved"] = 3] = "unresolved";
    })(ForceFlushState = exports.ForceFlushState || (exports.ForceFlushState = {}));
    var BasicTracerProvider = class {
      constructor(config = {}) {
        var _a;
        this._registeredSpanProcessors = [];
        this._tracers = /* @__PURE__ */ new Map();
        const mergedConfig = (0, core_1.merge)({}, (0, config_1.loadDefaultConfig)(), (0, utility_1.reconfigureLimits)(config));
        this.resource = (_a = mergedConfig.resource) !== null && _a !== void 0 ? _a : resources_1.Resource.empty();
        this.resource = resources_1.Resource.default().merge(this.resource);
        this._config = Object.assign({}, mergedConfig, {
          resource: this.resource
        });
        const defaultExporter = this._buildExporterFromEnv();
        if (defaultExporter !== void 0) {
          const batchProcessor = new platform_1.BatchSpanProcessor(defaultExporter);
          this.activeSpanProcessor = batchProcessor;
        } else {
          this.activeSpanProcessor = new NoopSpanProcessor_1.NoopSpanProcessor();
        }
      }
      getTracer(name, version, options) {
        const key = `${name}@${version || ""}:${(options === null || options === void 0 ? void 0 : options.schemaUrl) || ""}`;
        if (!this._tracers.has(key)) {
          this._tracers.set(key, new _1.Tracer({ name, version, schemaUrl: options === null || options === void 0 ? void 0 : options.schemaUrl }, this._config, this));
        }
        return this._tracers.get(key);
      }
      /**
       * Adds a new {@link SpanProcessor} to this tracer.
       * @param spanProcessor the new SpanProcessor to be added.
       */
      addSpanProcessor(spanProcessor2) {
        if (this._registeredSpanProcessors.length === 0) {
          this.activeSpanProcessor.shutdown().catch((err) => api_1.diag.error("Error while trying to shutdown current span processor", err));
        }
        this._registeredSpanProcessors.push(spanProcessor2);
        this.activeSpanProcessor = new MultiSpanProcessor_1.MultiSpanProcessor(this._registeredSpanProcessors);
      }
      getActiveSpanProcessor() {
        return this.activeSpanProcessor;
      }
      /**
       * Register this TracerProvider for use with the OpenTelemetry API.
       * Undefined values may be replaced with defaults, and
       * null values will be skipped.
       *
       * @param config Configuration object for SDK registration
       */
      register(config = {}) {
        api_1.trace.setGlobalTracerProvider(this);
        if (config.propagator === void 0) {
          config.propagator = this._buildPropagatorFromEnv();
        }
        if (config.contextManager) {
          api_1.context.setGlobalContextManager(config.contextManager);
        }
        if (config.propagator) {
          api_1.propagation.setGlobalPropagator(config.propagator);
        }
      }
      forceFlush() {
        const timeout = this._config.forceFlushTimeoutMillis;
        const promises = this._registeredSpanProcessors.map((spanProcessor2) => {
          return new Promise((resolve) => {
            let state;
            const timeoutInterval = setTimeout(() => {
              resolve(new Error(`Span processor did not completed within timeout period of ${timeout} ms`));
              state = ForceFlushState.timeout;
            }, timeout);
            spanProcessor2.forceFlush().then(() => {
              clearTimeout(timeoutInterval);
              if (state !== ForceFlushState.timeout) {
                state = ForceFlushState.resolved;
                resolve(state);
              }
            }).catch((error) => {
              clearTimeout(timeoutInterval);
              state = ForceFlushState.error;
              resolve(error);
            });
          });
        });
        return new Promise((resolve, reject) => {
          Promise.all(promises).then((results) => {
            const errors = results.filter((result) => result !== ForceFlushState.resolved);
            if (errors.length > 0) {
              reject(errors);
            } else {
              resolve();
            }
          }).catch((error) => reject([error]));
        });
      }
      shutdown() {
        return this.activeSpanProcessor.shutdown();
      }
      /**
       * TS cannot yet infer the type of this.constructor:
       * https://github.com/Microsoft/TypeScript/issues/3841#issuecomment-337560146
       * There is no need to override either of the getters in your child class.
       * The type of the registered component maps should be the same across all
       * classes in the inheritance tree.
       */
      _getPropagator(name) {
        var _a;
        return (_a = this.constructor._registeredPropagators.get(name)) === null || _a === void 0 ? void 0 : _a();
      }
      _getSpanExporter(name) {
        var _a;
        return (_a = this.constructor._registeredExporters.get(name)) === null || _a === void 0 ? void 0 : _a();
      }
      _buildPropagatorFromEnv() {
        const uniquePropagatorNames = Array.from(new Set((0, core_1.getEnv)().OTEL_PROPAGATORS));
        const propagators = uniquePropagatorNames.map((name) => {
          const propagator = this._getPropagator(name);
          if (!propagator) {
            api_1.diag.warn(`Propagator "${name}" requested through environment variable is unavailable.`);
          }
          return propagator;
        });
        const validPropagators = propagators.reduce((list, item) => {
          if (item) {
            list.push(item);
          }
          return list;
        }, []);
        if (validPropagators.length === 0) {
          return;
        } else if (uniquePropagatorNames.length === 1) {
          return validPropagators[0];
        } else {
          return new core_1.CompositePropagator({
            propagators: validPropagators
          });
        }
      }
      _buildExporterFromEnv() {
        const exporterName = (0, core_1.getEnv)().OTEL_TRACES_EXPORTER;
        if (exporterName === "none")
          return;
        const exporter = this._getSpanExporter(exporterName);
        if (!exporter) {
          api_1.diag.error(`Exporter "${exporterName}" requested through environment variable is unavailable.`);
        }
        return exporter;
      }
    };
    exports.BasicTracerProvider = BasicTracerProvider;
    BasicTracerProvider._registeredPropagators = /* @__PURE__ */ new Map([
      ["tracecontext", () => new core_1.W3CTraceContextPropagator()],
      ["baggage", () => new core_1.W3CBaggagePropagator()]
    ]);
    BasicTracerProvider._registeredExporters = /* @__PURE__ */ new Map();
  }
});

// node_modules/@opentelemetry/sdk-trace-base/build/src/export/ConsoleSpanExporter.js
var require_ConsoleSpanExporter = __commonJS({
  "node_modules/@opentelemetry/sdk-trace-base/build/src/export/ConsoleSpanExporter.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ConsoleSpanExporter = void 0;
    var core_1 = require_src3();
    var ConsoleSpanExporter = class {
      /**
       * Export spans.
       * @param spans
       * @param resultCallback
       */
      export(spans, resultCallback) {
        return this._sendSpans(spans, resultCallback);
      }
      /**
       * Shutdown the exporter.
       */
      shutdown() {
        this._sendSpans([]);
        return Promise.resolve();
      }
      /**
       * converts span info into more readable format
       * @param span
       */
      _exportInfo(span) {
        return {
          traceId: span.spanContext().traceId,
          parentId: span.parentSpanId,
          name: span.name,
          id: span.spanContext().spanId,
          kind: span.kind,
          timestamp: (0, core_1.hrTimeToMicroseconds)(span.startTime),
          duration: (0, core_1.hrTimeToMicroseconds)(span.duration),
          attributes: span.attributes,
          status: span.status,
          events: span.events,
          links: span.links
        };
      }
      /**
       * Showing spans in console
       * @param spans
       * @param done
       */
      _sendSpans(spans, done) {
        for (const span of spans) {
          console.dir(this._exportInfo(span), { depth: 3 });
        }
        if (done) {
          return done({ code: core_1.ExportResultCode.SUCCESS });
        }
      }
    };
    exports.ConsoleSpanExporter = ConsoleSpanExporter;
  }
});

// node_modules/@opentelemetry/sdk-trace-base/build/src/export/InMemorySpanExporter.js
var require_InMemorySpanExporter = __commonJS({
  "node_modules/@opentelemetry/sdk-trace-base/build/src/export/InMemorySpanExporter.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.InMemorySpanExporter = void 0;
    var core_1 = require_src3();
    var InMemorySpanExporter = class {
      constructor() {
        this._finishedSpans = [];
        this._stopped = false;
      }
      export(spans, resultCallback) {
        if (this._stopped)
          return resultCallback({
            code: core_1.ExportResultCode.FAILED,
            error: new Error("Exporter has been stopped")
          });
        this._finishedSpans.push(...spans);
        setTimeout(() => resultCallback({ code: core_1.ExportResultCode.SUCCESS }), 0);
      }
      shutdown() {
        this._stopped = true;
        this._finishedSpans = [];
        return Promise.resolve();
      }
      reset() {
        this._finishedSpans = [];
      }
      getFinishedSpans() {
        return this._finishedSpans;
      }
    };
    exports.InMemorySpanExporter = InMemorySpanExporter;
  }
});

// node_modules/@opentelemetry/sdk-trace-base/build/src/export/ReadableSpan.js
var require_ReadableSpan = __commonJS({
  "node_modules/@opentelemetry/sdk-trace-base/build/src/export/ReadableSpan.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
  }
});

// node_modules/@opentelemetry/sdk-trace-base/build/src/export/SimpleSpanProcessor.js
var require_SimpleSpanProcessor = __commonJS({
  "node_modules/@opentelemetry/sdk-trace-base/build/src/export/SimpleSpanProcessor.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.SimpleSpanProcessor = void 0;
    var api_1 = require_src();
    var core_1 = require_src3();
    var SimpleSpanProcessor = class {
      constructor(_exporter) {
        this._exporter = _exporter;
        this._shutdownOnce = new core_1.BindOnceFuture(this._shutdown, this);
      }
      forceFlush() {
        return Promise.resolve();
      }
      // does nothing.
      onStart(_span, _parentContext) {
      }
      onEnd(span) {
        if (this._shutdownOnce.isCalled) {
          return;
        }
        if ((span.spanContext().traceFlags & api_1.TraceFlags.SAMPLED) === 0) {
          return;
        }
        core_1.internal._export(this._exporter, [span]).then((result) => {
          var _a;
          if (result.code !== core_1.ExportResultCode.SUCCESS) {
            (0, core_1.globalErrorHandler)((_a = result.error) !== null && _a !== void 0 ? _a : new Error(`SimpleSpanProcessor: span export failed (status ${result})`));
          }
        }).catch((error) => {
          (0, core_1.globalErrorHandler)(error);
        });
      }
      shutdown() {
        return this._shutdownOnce.call();
      }
      _shutdown() {
        return this._exporter.shutdown();
      }
    };
    exports.SimpleSpanProcessor = SimpleSpanProcessor;
  }
});

// node_modules/@opentelemetry/sdk-trace-base/build/src/export/SpanExporter.js
var require_SpanExporter = __commonJS({
  "node_modules/@opentelemetry/sdk-trace-base/build/src/export/SpanExporter.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
  }
});

// node_modules/@opentelemetry/sdk-trace-base/build/src/SpanProcessor.js
var require_SpanProcessor = __commonJS({
  "node_modules/@opentelemetry/sdk-trace-base/build/src/SpanProcessor.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
  }
});

// node_modules/@opentelemetry/sdk-trace-base/build/src/TimedEvent.js
var require_TimedEvent = __commonJS({
  "node_modules/@opentelemetry/sdk-trace-base/build/src/TimedEvent.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
  }
});

// node_modules/@opentelemetry/sdk-trace-base/build/src/types.js
var require_types7 = __commonJS({
  "node_modules/@opentelemetry/sdk-trace-base/build/src/types.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
  }
});

// node_modules/@opentelemetry/sdk-trace-base/build/src/IdGenerator.js
var require_IdGenerator2 = __commonJS({
  "node_modules/@opentelemetry/sdk-trace-base/build/src/IdGenerator.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
  }
});

// node_modules/@opentelemetry/sdk-trace-base/build/src/index.js
var require_src9 = __commonJS({
  "node_modules/@opentelemetry/sdk-trace-base/build/src/index.js"(exports) {
    "use strict";
    var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      Object.defineProperty(o, k2, { enumerable: true, get: function() {
        return m[k];
      } });
    } : function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      o[k2] = m[k];
    });
    var __exportStar = exports && exports.__exportStar || function(m, exports2) {
      for (var p in m)
        if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports2, p))
          __createBinding(exports2, m, p);
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    __exportStar(require_Tracer(), exports);
    __exportStar(require_BasicTracerProvider(), exports);
    __exportStar(require_platform5(), exports);
    __exportStar(require_ConsoleSpanExporter(), exports);
    __exportStar(require_InMemorySpanExporter(), exports);
    __exportStar(require_ReadableSpan(), exports);
    __exportStar(require_SimpleSpanProcessor(), exports);
    __exportStar(require_SpanExporter(), exports);
    __exportStar(require_NoopSpanProcessor(), exports);
    __exportStar(require_AlwaysOffSampler2(), exports);
    __exportStar(require_AlwaysOnSampler2(), exports);
    __exportStar(require_ParentBasedSampler2(), exports);
    __exportStar(require_TraceIdRatioBasedSampler2(), exports);
    __exportStar(require_Sampler(), exports);
    __exportStar(require_Span(), exports);
    __exportStar(require_SpanProcessor(), exports);
    __exportStar(require_TimedEvent(), exports);
    __exportStar(require_types7(), exports);
    __exportStar(require_IdGenerator2(), exports);
  }
});

// node_modules/@opentelemetry/otlp-exporter-base/build/src/util.js
var require_util = __commonJS({
  "node_modules/@opentelemetry/otlp-exporter-base/build/src/util.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.invalidTimeout = exports.configureExporterTimeout = exports.appendRootPathToUrlIfNeeded = exports.appendResourcePathToUrl = exports.parseHeaders = void 0;
    var api_1 = require_src();
    var core_1 = require_src3();
    var DEFAULT_TRACE_TIMEOUT = 1e4;
    function parseHeaders(partialHeaders = {}) {
      const headers = {};
      Object.entries(partialHeaders).forEach(([key, value]) => {
        if (typeof value !== "undefined") {
          headers[key] = String(value);
        } else {
          api_1.diag.warn(`Header "${key}" has wrong value and will be ignored`);
        }
      });
      return headers;
    }
    exports.parseHeaders = parseHeaders;
    function appendResourcePathToUrl(url, path) {
      if (!url.endsWith("/")) {
        url = url + "/";
      }
      return url + path;
    }
    exports.appendResourcePathToUrl = appendResourcePathToUrl;
    function appendRootPathToUrlIfNeeded(url) {
      try {
        const parsedUrl = new URL(url);
        if (parsedUrl.pathname === "") {
          parsedUrl.pathname = parsedUrl.pathname + "/";
        }
        return parsedUrl.toString();
      } catch (_a) {
        api_1.diag.warn(`Could not parse export URL: '${url}'`);
        return url;
      }
    }
    exports.appendRootPathToUrlIfNeeded = appendRootPathToUrlIfNeeded;
    function configureExporterTimeout(timeoutMillis) {
      if (typeof timeoutMillis === "number") {
        if (timeoutMillis <= 0) {
          return invalidTimeout(timeoutMillis, DEFAULT_TRACE_TIMEOUT);
        }
        return timeoutMillis;
      } else {
        return getExporterTimeoutFromEnv();
      }
    }
    exports.configureExporterTimeout = configureExporterTimeout;
    function getExporterTimeoutFromEnv() {
      var _a;
      const definedTimeout = Number((_a = (0, core_1.getEnv)().OTEL_EXPORTER_OTLP_TRACES_TIMEOUT) !== null && _a !== void 0 ? _a : (0, core_1.getEnv)().OTEL_EXPORTER_OTLP_TIMEOUT);
      if (definedTimeout <= 0) {
        return invalidTimeout(definedTimeout, DEFAULT_TRACE_TIMEOUT);
      } else {
        return definedTimeout;
      }
    }
    function invalidTimeout(timeout, defaultTimeout) {
      api_1.diag.warn("Timeout must be greater than 0", timeout);
      return defaultTimeout;
    }
    exports.invalidTimeout = invalidTimeout;
  }
});

// node_modules/@opentelemetry/otlp-exporter-base/build/src/OTLPExporterBase.js
var require_OTLPExporterBase = __commonJS({
  "node_modules/@opentelemetry/otlp-exporter-base/build/src/OTLPExporterBase.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.OTLPExporterBase = void 0;
    var api_1 = require_src();
    var core_1 = require_src3();
    var util_1 = require_util();
    var OTLPExporterBase = class {
      /**
       * @param config
       */
      constructor(config = {}) {
        this._sendingPromises = [];
        this.url = this.getDefaultUrl(config);
        if (typeof config.hostname === "string") {
          this.hostname = config.hostname;
        }
        this.shutdown = this.shutdown.bind(this);
        this._shutdownOnce = new core_1.BindOnceFuture(this._shutdown, this);
        this._concurrencyLimit = typeof config.concurrencyLimit === "number" ? config.concurrencyLimit : Infinity;
        this.timeoutMillis = (0, util_1.configureExporterTimeout)(config.timeoutMillis);
        this.onInit(config);
      }
      /**
       * Export items.
       * @param items
       * @param resultCallback
       */
      export(items, resultCallback) {
        if (this._shutdownOnce.isCalled) {
          resultCallback({
            code: core_1.ExportResultCode.FAILED,
            error: new Error("Exporter has been shutdown")
          });
          return;
        }
        if (this._sendingPromises.length >= this._concurrencyLimit) {
          resultCallback({
            code: core_1.ExportResultCode.FAILED,
            error: new Error("Concurrent export limit reached")
          });
          return;
        }
        this._export(items).then(() => {
          resultCallback({ code: core_1.ExportResultCode.SUCCESS });
        }).catch((error) => {
          resultCallback({ code: core_1.ExportResultCode.FAILED, error });
        });
      }
      _export(items) {
        return new Promise((resolve, reject) => {
          try {
            api_1.diag.debug("items to be sent", items);
            this.send(items, resolve, reject);
          } catch (e) {
            reject(e);
          }
        });
      }
      /**
       * Shutdown the exporter.
       */
      shutdown() {
        return this._shutdownOnce.call();
      }
      /**
       * Called by _shutdownOnce with BindOnceFuture
       */
      _shutdown() {
        api_1.diag.debug("shutdown started");
        this.onShutdown();
        return Promise.all(this._sendingPromises).then(() => {
        });
      }
    };
    exports.OTLPExporterBase = OTLPExporterBase;
  }
});

// node_modules/@opentelemetry/otlp-exporter-base/build/src/platform/node/types.js
var require_types8 = __commonJS({
  "node_modules/@opentelemetry/otlp-exporter-base/build/src/platform/node/types.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.CompressionAlgorithm = void 0;
    var CompressionAlgorithm;
    (function(CompressionAlgorithm2) {
      CompressionAlgorithm2["NONE"] = "none";
      CompressionAlgorithm2["GZIP"] = "gzip";
    })(CompressionAlgorithm = exports.CompressionAlgorithm || (exports.CompressionAlgorithm = {}));
  }
});

// node_modules/@opentelemetry/otlp-exporter-base/build/src/types.js
var require_types9 = __commonJS({
  "node_modules/@opentelemetry/otlp-exporter-base/build/src/types.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.OTLPExporterError = void 0;
    var OTLPExporterError = class extends Error {
      constructor(message, code, data) {
        super(message);
        this.name = "OTLPExporterError";
        this.data = data;
        this.code = code;
      }
    };
    exports.OTLPExporterError = OTLPExporterError;
  }
});

// node_modules/@opentelemetry/otlp-exporter-base/build/src/platform/node/util.js
var require_util2 = __commonJS({
  "node_modules/@opentelemetry/otlp-exporter-base/build/src/platform/node/util.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.configureCompression = exports.createHttpAgent = exports.sendWithHttp = void 0;
    var url = require("url");
    var http = require("http");
    var https = require("https");
    var zlib = require("zlib");
    var stream_1 = require("stream");
    var api_1 = require_src();
    var types_1 = require_types8();
    var core_1 = require_src3();
    var types_2 = require_types9();
    function sendWithHttp(collector, data, contentType, onSuccess, onError) {
      const exporterTimeout = collector.timeoutMillis;
      const parsedUrl = new url.URL(collector.url);
      let reqIsDestroyed;
      const nodeVersion = Number(process.versions.node.split(".")[0]);
      const exporterTimer = setTimeout(() => {
        reqIsDestroyed = true;
        if (nodeVersion >= 14) {
          req.destroy();
        } else {
          req.abort();
        }
      }, exporterTimeout);
      const options = {
        hostname: parsedUrl.hostname,
        port: parsedUrl.port,
        path: parsedUrl.pathname,
        method: "POST",
        headers: Object.assign({ "Content-Type": contentType }, collector.headers),
        agent: collector.agent
      };
      const request = parsedUrl.protocol === "http:" ? http.request : https.request;
      const req = request(options, (res) => {
        let responseData = "";
        res.on("data", (chunk) => responseData += chunk);
        res.on("aborted", () => {
          if (reqIsDestroyed) {
            const err = new types_2.OTLPExporterError("Request Timeout");
            onError(err);
          }
        });
        res.on("end", () => {
          if (!reqIsDestroyed) {
            if (res.statusCode && res.statusCode < 299) {
              api_1.diag.debug(`statusCode: ${res.statusCode}`, responseData);
              onSuccess();
            } else {
              const error = new types_2.OTLPExporterError(res.statusMessage, res.statusCode, responseData);
              onError(error);
            }
            clearTimeout(exporterTimer);
          }
        });
      });
      req.on("error", (error) => {
        if (reqIsDestroyed) {
          const err = new types_2.OTLPExporterError("Request Timeout", error.code);
          onError(err);
        } else {
          clearTimeout(exporterTimer);
          onError(error);
        }
      });
      switch (collector.compression) {
        case types_1.CompressionAlgorithm.GZIP: {
          req.setHeader("Content-Encoding", "gzip");
          const dataStream = readableFromBuffer(data);
          dataStream.on("error", onError).pipe(zlib.createGzip()).on("error", onError).pipe(req);
          break;
        }
        default:
          req.end(data);
          break;
      }
    }
    exports.sendWithHttp = sendWithHttp;
    function readableFromBuffer(buff) {
      const readable = new stream_1.Readable();
      readable.push(buff);
      readable.push(null);
      return readable;
    }
    function createHttpAgent(config) {
      if (config.httpAgentOptions && config.keepAlive === false) {
        api_1.diag.warn("httpAgentOptions is used only when keepAlive is true");
        return void 0;
      }
      if (config.keepAlive === false || !config.url)
        return void 0;
      try {
        const parsedUrl = new url.URL(config.url);
        const Agent = parsedUrl.protocol === "http:" ? http.Agent : https.Agent;
        return new Agent(Object.assign({ keepAlive: true }, config.httpAgentOptions));
      } catch (err) {
        api_1.diag.error(`collector exporter failed to create http agent. err: ${err.message}`);
        return void 0;
      }
    }
    exports.createHttpAgent = createHttpAgent;
    function configureCompression(compression) {
      if (compression) {
        return compression;
      } else {
        const definedCompression = (0, core_1.getEnv)().OTEL_EXPORTER_OTLP_TRACES_COMPRESSION || (0, core_1.getEnv)().OTEL_EXPORTER_OTLP_COMPRESSION;
        return definedCompression === types_1.CompressionAlgorithm.GZIP ? types_1.CompressionAlgorithm.GZIP : types_1.CompressionAlgorithm.NONE;
      }
    }
    exports.configureCompression = configureCompression;
  }
});

// node_modules/@opentelemetry/otlp-exporter-base/build/src/platform/node/OTLPExporterNodeBase.js
var require_OTLPExporterNodeBase = __commonJS({
  "node_modules/@opentelemetry/otlp-exporter-base/build/src/platform/node/OTLPExporterNodeBase.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.OTLPExporterNodeBase = void 0;
    var OTLPExporterBase_1 = require_OTLPExporterBase();
    var util_1 = require_util();
    var util_2 = require_util2();
    var api_1 = require_src();
    var core_1 = require_src3();
    var OTLPExporterNodeBase = class extends OTLPExporterBase_1.OTLPExporterBase {
      constructor(config = {}) {
        super(config);
        this.DEFAULT_HEADERS = {};
        if (config.metadata) {
          api_1.diag.warn("Metadata cannot be set when using http");
        }
        this.headers = Object.assign(this.DEFAULT_HEADERS, (0, util_1.parseHeaders)(config.headers), core_1.baggageUtils.parseKeyPairsIntoRecord((0, core_1.getEnv)().OTEL_EXPORTER_OTLP_HEADERS));
        this.agent = (0, util_2.createHttpAgent)(config);
        this.compression = (0, util_2.configureCompression)(config.compression);
      }
      onInit(_config) {
      }
      send(objects, onSuccess, onError) {
        if (this._shutdownOnce.isCalled) {
          api_1.diag.debug("Shutdown already started. Cannot send objects");
          return;
        }
        const serviceRequest = this.convert(objects);
        const promise = new Promise((resolve, reject) => {
          (0, util_2.sendWithHttp)(this, JSON.stringify(serviceRequest), "application/json", resolve, reject);
        }).then(onSuccess, onError);
        this._sendingPromises.push(promise);
        const popPromise = () => {
          const index = this._sendingPromises.indexOf(promise);
          this._sendingPromises.splice(index, 1);
        };
        promise.then(popPromise, popPromise);
      }
      onShutdown() {
      }
    };
    exports.OTLPExporterNodeBase = OTLPExporterNodeBase;
  }
});

// node_modules/@opentelemetry/otlp-exporter-base/build/src/platform/node/index.js
var require_node7 = __commonJS({
  "node_modules/@opentelemetry/otlp-exporter-base/build/src/platform/node/index.js"(exports) {
    "use strict";
    var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      Object.defineProperty(o, k2, { enumerable: true, get: function() {
        return m[k];
      } });
    } : function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      o[k2] = m[k];
    });
    var __exportStar = exports && exports.__exportStar || function(m, exports2) {
      for (var p in m)
        if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports2, p))
          __createBinding(exports2, m, p);
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    __exportStar(require_OTLPExporterNodeBase(), exports);
    __exportStar(require_util2(), exports);
    __exportStar(require_types8(), exports);
  }
});

// node_modules/@opentelemetry/otlp-exporter-base/build/src/platform/browser/util.js
var require_util3 = __commonJS({
  "node_modules/@opentelemetry/otlp-exporter-base/build/src/platform/browser/util.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.sendWithXhr = exports.sendWithBeacon = void 0;
    var api_1 = require_src();
    var types_1 = require_types9();
    function sendWithBeacon(body, url, blobPropertyBag, onSuccess, onError) {
      if (navigator.sendBeacon(url, new Blob([body], blobPropertyBag))) {
        api_1.diag.debug("sendBeacon - can send", body);
        onSuccess();
      } else {
        const error = new types_1.OTLPExporterError(`sendBeacon - cannot send ${body}`);
        onError(error);
      }
    }
    exports.sendWithBeacon = sendWithBeacon;
    function sendWithXhr(body, url, headers, exporterTimeout, onSuccess, onError) {
      let reqIsDestroyed;
      const exporterTimer = setTimeout(() => {
        reqIsDestroyed = true;
        xhr.abort();
      }, exporterTimeout);
      const xhr = new XMLHttpRequest();
      xhr.open("POST", url);
      const defaultHeaders = {
        "Accept": "application/json",
        "Content-Type": "application/json"
      };
      Object.entries(Object.assign(Object.assign({}, defaultHeaders), headers)).forEach(([k, v]) => {
        xhr.setRequestHeader(k, v);
      });
      xhr.send(body);
      xhr.onreadystatechange = () => {
        if (xhr.readyState === XMLHttpRequest.DONE) {
          if (xhr.status >= 200 && xhr.status <= 299) {
            clearTimeout(exporterTimer);
            api_1.diag.debug("xhr success", body);
            onSuccess();
          } else if (reqIsDestroyed) {
            const error = new types_1.OTLPExporterError("Request Timeout", xhr.status);
            onError(error);
          } else {
            const error = new types_1.OTLPExporterError(`Failed to export with XHR (status: ${xhr.status})`, xhr.status);
            clearTimeout(exporterTimer);
            onError(error);
          }
        }
      };
    }
    exports.sendWithXhr = sendWithXhr;
  }
});

// node_modules/@opentelemetry/otlp-exporter-base/build/src/platform/browser/OTLPExporterBrowserBase.js
var require_OTLPExporterBrowserBase = __commonJS({
  "node_modules/@opentelemetry/otlp-exporter-base/build/src/platform/browser/OTLPExporterBrowserBase.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.OTLPExporterBrowserBase = void 0;
    var OTLPExporterBase_1 = require_OTLPExporterBase();
    var util_1 = require_util();
    var util_2 = require_util3();
    var api_1 = require_src();
    var core_1 = require_src3();
    var OTLPExporterBrowserBase = class extends OTLPExporterBase_1.OTLPExporterBase {
      /**
       * @param config
       */
      constructor(config = {}) {
        super(config);
        this._useXHR = false;
        this._useXHR = !!config.headers || typeof navigator.sendBeacon !== "function";
        if (this._useXHR) {
          this._headers = Object.assign({}, (0, util_1.parseHeaders)(config.headers), core_1.baggageUtils.parseKeyPairsIntoRecord((0, core_1.getEnv)().OTEL_EXPORTER_OTLP_HEADERS));
        } else {
          this._headers = {};
        }
      }
      onInit() {
        window.addEventListener("unload", this.shutdown);
      }
      onShutdown() {
        window.removeEventListener("unload", this.shutdown);
      }
      send(items, onSuccess, onError) {
        if (this._shutdownOnce.isCalled) {
          api_1.diag.debug("Shutdown already started. Cannot send objects");
          return;
        }
        const serviceRequest = this.convert(items);
        const body = JSON.stringify(serviceRequest);
        const promise = new Promise((resolve, reject) => {
          if (this._useXHR) {
            (0, util_2.sendWithXhr)(body, this.url, this._headers, this.timeoutMillis, resolve, reject);
          } else {
            (0, util_2.sendWithBeacon)(body, this.url, { type: "application/json" }, resolve, reject);
          }
        }).then(onSuccess, onError);
        this._sendingPromises.push(promise);
        const popPromise = () => {
          const index = this._sendingPromises.indexOf(promise);
          this._sendingPromises.splice(index, 1);
        };
        promise.then(popPromise, popPromise);
      }
    };
    exports.OTLPExporterBrowserBase = OTLPExporterBrowserBase;
  }
});

// node_modules/@opentelemetry/otlp-exporter-base/build/src/platform/browser/index.js
var require_browser2 = __commonJS({
  "node_modules/@opentelemetry/otlp-exporter-base/build/src/platform/browser/index.js"(exports) {
    "use strict";
    var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      Object.defineProperty(o, k2, { enumerable: true, get: function() {
        return m[k];
      } });
    } : function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      o[k2] = m[k];
    });
    var __exportStar = exports && exports.__exportStar || function(m, exports2) {
      for (var p in m)
        if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports2, p))
          __createBinding(exports2, m, p);
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    __exportStar(require_OTLPExporterBrowserBase(), exports);
  }
});

// node_modules/@opentelemetry/otlp-exporter-base/build/src/platform/index.js
var require_platform6 = __commonJS({
  "node_modules/@opentelemetry/otlp-exporter-base/build/src/platform/index.js"(exports) {
    "use strict";
    var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      Object.defineProperty(o, k2, { enumerable: true, get: function() {
        return m[k];
      } });
    } : function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      o[k2] = m[k];
    });
    var __exportStar = exports && exports.__exportStar || function(m, exports2) {
      for (var p in m)
        if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports2, p))
          __createBinding(exports2, m, p);
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.OTLPExporterBrowserBase = void 0;
    __exportStar(require_node7(), exports);
    var browser_1 = require_browser2();
    Object.defineProperty(exports, "OTLPExporterBrowserBase", { enumerable: true, get: function() {
      return browser_1.OTLPExporterBrowserBase;
    } });
  }
});

// node_modules/@opentelemetry/otlp-exporter-base/build/src/index.js
var require_src10 = __commonJS({
  "node_modules/@opentelemetry/otlp-exporter-base/build/src/index.js"(exports) {
    "use strict";
    var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      Object.defineProperty(o, k2, { enumerable: true, get: function() {
        return m[k];
      } });
    } : function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      o[k2] = m[k];
    });
    var __exportStar = exports && exports.__exportStar || function(m, exports2) {
      for (var p in m)
        if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports2, p))
          __createBinding(exports2, m, p);
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    __exportStar(require_OTLPExporterBase(), exports);
    __exportStar(require_platform6(), exports);
    __exportStar(require_types9(), exports);
    __exportStar(require_util(), exports);
  }
});

// node_modules/@opentelemetry/otlp-transformer/build/src/common/types.js
var require_types10 = __commonJS({
  "node_modules/@opentelemetry/otlp-transformer/build/src/common/types.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
  }
});

// node_modules/@opentelemetry/otlp-transformer/build/src/metrics/types.js
var require_types11 = __commonJS({
  "node_modules/@opentelemetry/otlp-transformer/build/src/metrics/types.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
  }
});

// node_modules/@opentelemetry/otlp-transformer/build/src/resource/types.js
var require_types12 = __commonJS({
  "node_modules/@opentelemetry/otlp-transformer/build/src/resource/types.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
  }
});

// node_modules/@opentelemetry/otlp-transformer/build/src/trace/types.js
var require_types13 = __commonJS({
  "node_modules/@opentelemetry/otlp-transformer/build/src/trace/types.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ESpanKind = void 0;
    var ESpanKind;
    (function(ESpanKind2) {
      ESpanKind2[ESpanKind2["SPAN_KIND_UNSPECIFIED"] = 0] = "SPAN_KIND_UNSPECIFIED";
      ESpanKind2[ESpanKind2["SPAN_KIND_INTERNAL"] = 1] = "SPAN_KIND_INTERNAL";
      ESpanKind2[ESpanKind2["SPAN_KIND_SERVER"] = 2] = "SPAN_KIND_SERVER";
      ESpanKind2[ESpanKind2["SPAN_KIND_CLIENT"] = 3] = "SPAN_KIND_CLIENT";
      ESpanKind2[ESpanKind2["SPAN_KIND_PRODUCER"] = 4] = "SPAN_KIND_PRODUCER";
      ESpanKind2[ESpanKind2["SPAN_KIND_CONSUMER"] = 5] = "SPAN_KIND_CONSUMER";
    })(ESpanKind = exports.ESpanKind || (exports.ESpanKind = {}));
  }
});

// node_modules/@opentelemetry/otlp-transformer/build/src/common/internal.js
var require_internal = __commonJS({
  "node_modules/@opentelemetry/otlp-transformer/build/src/common/internal.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.bufToHex = exports.hexToBuf = exports.toAnyValue = exports.toKeyValue = exports.toAttributes = void 0;
    function toAttributes(attributes) {
      return Object.keys(attributes).map((key) => toKeyValue(key, attributes[key]));
    }
    exports.toAttributes = toAttributes;
    function toKeyValue(key, value) {
      return {
        key,
        value: toAnyValue(value)
      };
    }
    exports.toKeyValue = toKeyValue;
    function toAnyValue(value) {
      const t = typeof value;
      if (t === "string")
        return { stringValue: value };
      if (t === "number") {
        if (!Number.isInteger(value))
          return { doubleValue: value };
        return { intValue: value };
      }
      if (t === "boolean")
        return { boolValue: value };
      if (value instanceof Uint8Array)
        return { bytesValue: value };
      if (Array.isArray(value))
        return { arrayValue: { values: value.map(toAnyValue) } };
      if (t === "object" && value != null)
        return { kvlistValue: { values: Object.entries(value).map(([k, v]) => toKeyValue(k, v)) } };
      return {};
    }
    exports.toAnyValue = toAnyValue;
    function hexToBuf(hex) {
      var _a;
      const ints = (_a = hex.match(/[\da-f]{2}/gi)) === null || _a === void 0 ? void 0 : _a.map((h) => parseInt(h, 16));
      return ints && new Uint8Array(ints);
    }
    exports.hexToBuf = hexToBuf;
    function i2hex(i) {
      return ("0" + i.toString(16)).slice(-2);
    }
    function bufToHex(buf) {
      if (buf == null || buf.length === 0)
        return void 0;
      return Array.from(buf).map(i2hex).join("");
    }
    exports.bufToHex = bufToHex;
  }
});

// node_modules/@opentelemetry/otlp-transformer/build/src/trace/internal.js
var require_internal2 = __commonJS({
  "node_modules/@opentelemetry/otlp-transformer/build/src/trace/internal.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.toOtlpSpanEvent = exports.toOtlpLink = exports.sdkSpanToOtlpSpan = void 0;
    var core_1 = require_src3();
    var internal_1 = require_internal();
    var core = require_src3();
    function sdkSpanToOtlpSpan(span, useHex) {
      const ctx = span.spanContext();
      const status = span.status;
      const parentSpanId = useHex ? span.parentSpanId : span.parentSpanId != null ? core.hexToBase64(span.parentSpanId) : void 0;
      return {
        traceId: useHex ? ctx.traceId : core.hexToBase64(ctx.traceId),
        spanId: useHex ? ctx.spanId : core.hexToBase64(ctx.spanId),
        parentSpanId,
        name: span.name,
        // Span kind is offset by 1 because the API does not define a value for unset
        kind: span.kind == null ? 0 : span.kind + 1,
        startTimeUnixNano: (0, core_1.hrTimeToNanoseconds)(span.startTime),
        endTimeUnixNano: (0, core_1.hrTimeToNanoseconds)(span.endTime),
        attributes: (0, internal_1.toAttributes)(span.attributes),
        droppedAttributesCount: 0,
        events: span.events.map(toOtlpSpanEvent),
        droppedEventsCount: 0,
        status: {
          // API and proto enums share the same values
          code: status.code,
          message: status.message
        },
        links: span.links.map((link) => toOtlpLink(link, useHex)),
        droppedLinksCount: 0
      };
    }
    exports.sdkSpanToOtlpSpan = sdkSpanToOtlpSpan;
    function toOtlpLink(link, useHex) {
      return {
        attributes: link.attributes ? (0, internal_1.toAttributes)(link.attributes) : [],
        spanId: useHex ? link.context.spanId : core.hexToBase64(link.context.spanId),
        traceId: useHex ? link.context.traceId : core.hexToBase64(link.context.traceId),
        droppedAttributesCount: 0
      };
    }
    exports.toOtlpLink = toOtlpLink;
    function toOtlpSpanEvent(timedEvent) {
      return {
        attributes: timedEvent.attributes ? (0, internal_1.toAttributes)(timedEvent.attributes) : [],
        name: timedEvent.name,
        timeUnixNano: (0, core_1.hrTimeToNanoseconds)(timedEvent.time),
        droppedAttributesCount: 0
      };
    }
    exports.toOtlpSpanEvent = toOtlpSpanEvent;
  }
});

// node_modules/@opentelemetry/otlp-transformer/build/src/trace/index.js
var require_trace3 = __commonJS({
  "node_modules/@opentelemetry/otlp-transformer/build/src/trace/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.createExportTraceServiceRequest = void 0;
    var internal_1 = require_internal();
    var internal_2 = require_internal2();
    function createExportTraceServiceRequest(spans, useHex) {
      return {
        resourceSpans: spanRecordsToResourceSpans(spans, useHex)
      };
    }
    exports.createExportTraceServiceRequest = createExportTraceServiceRequest;
    function createResourceMap(readableSpans) {
      const resourceMap = /* @__PURE__ */ new Map();
      for (const record of readableSpans) {
        let ilmMap = resourceMap.get(record.resource);
        if (!ilmMap) {
          ilmMap = /* @__PURE__ */ new Map();
          resourceMap.set(record.resource, ilmMap);
        }
        const instrumentationLibraryKey = `${record.instrumentationLibrary.name}@${record.instrumentationLibrary.version || ""}:${record.instrumentationLibrary.schemaUrl || ""}`;
        let records = ilmMap.get(instrumentationLibraryKey);
        if (!records) {
          records = [];
          ilmMap.set(instrumentationLibraryKey, records);
        }
        records.push(record);
      }
      return resourceMap;
    }
    function spanRecordsToResourceSpans(readableSpans, useHex) {
      const resourceMap = createResourceMap(readableSpans);
      const out = [];
      const entryIterator = resourceMap.entries();
      let entry = entryIterator.next();
      while (!entry.done) {
        const [resource, ilmMap] = entry.value;
        const scopeResourceSpans = [];
        const ilmIterator = ilmMap.values();
        let ilmEntry = ilmIterator.next();
        while (!ilmEntry.done) {
          const scopeSpans = ilmEntry.value;
          if (scopeSpans.length > 0) {
            const { name, version, schemaUrl } = scopeSpans[0].instrumentationLibrary;
            const spans = scopeSpans.map((readableSpan) => (0, internal_2.sdkSpanToOtlpSpan)(readableSpan, useHex));
            scopeResourceSpans.push({
              scope: { name, version },
              spans,
              schemaUrl
            });
          }
          ilmEntry = ilmIterator.next();
        }
        const transformedSpans = {
          resource: {
            attributes: (0, internal_1.toAttributes)(resource.attributes),
            droppedAttributesCount: 0
          },
          scopeSpans: scopeResourceSpans,
          schemaUrl: void 0
        };
        out.push(transformedSpans);
        entry = entryIterator.next();
      }
      return out;
    }
  }
});

// node_modules/@opentelemetry/sdk-metrics/build/src/export/AggregationTemporality.js
var require_AggregationTemporality = __commonJS({
  "node_modules/@opentelemetry/sdk-metrics/build/src/export/AggregationTemporality.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.AggregationTemporality = void 0;
    var AggregationTemporality;
    (function(AggregationTemporality2) {
      AggregationTemporality2[AggregationTemporality2["DELTA"] = 0] = "DELTA";
      AggregationTemporality2[AggregationTemporality2["CUMULATIVE"] = 1] = "CUMULATIVE";
    })(AggregationTemporality = exports.AggregationTemporality || (exports.AggregationTemporality = {}));
  }
});

// node_modules/@opentelemetry/sdk-metrics/build/src/export/MetricData.js
var require_MetricData = __commonJS({
  "node_modules/@opentelemetry/sdk-metrics/build/src/export/MetricData.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.DataPointType = void 0;
    var DataPointType;
    (function(DataPointType2) {
      DataPointType2[DataPointType2["HISTOGRAM"] = 0] = "HISTOGRAM";
      DataPointType2[DataPointType2["EXPONENTIAL_HISTOGRAM"] = 1] = "EXPONENTIAL_HISTOGRAM";
      DataPointType2[DataPointType2["GAUGE"] = 2] = "GAUGE";
      DataPointType2[DataPointType2["SUM"] = 3] = "SUM";
    })(DataPointType = exports.DataPointType || (exports.DataPointType = {}));
  }
});

// node_modules/@opentelemetry/sdk-metrics/build/src/utils.js
var require_utils6 = __commonJS({
  "node_modules/@opentelemetry/sdk-metrics/build/src/utils.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.setEquals = exports.FlatMap = exports.isPromiseAllSettledRejectionResult = exports.PromiseAllSettled = exports.callWithTimeout = exports.TimeoutError = exports.instrumentationScopeId = exports.hashAttributes = exports.isNotNullish = void 0;
    function isNotNullish(item) {
      return item !== void 0 && item !== null;
    }
    exports.isNotNullish = isNotNullish;
    function hashAttributes(attributes) {
      let keys = Object.keys(attributes);
      if (keys.length === 0)
        return "";
      keys = keys.sort();
      return JSON.stringify(keys.map((key) => [key, attributes[key]]));
    }
    exports.hashAttributes = hashAttributes;
    function instrumentationScopeId(instrumentationScope) {
      var _a, _b;
      return `${instrumentationScope.name}:${(_a = instrumentationScope.version) !== null && _a !== void 0 ? _a : ""}:${(_b = instrumentationScope.schemaUrl) !== null && _b !== void 0 ? _b : ""}`;
    }
    exports.instrumentationScopeId = instrumentationScopeId;
    var TimeoutError = class extends Error {
      constructor(message) {
        super(message);
        Object.setPrototypeOf(this, TimeoutError.prototype);
      }
    };
    exports.TimeoutError = TimeoutError;
    function callWithTimeout(promise, timeout) {
      let timeoutHandle;
      const timeoutPromise = new Promise(function timeoutFunction(_resolve, reject) {
        timeoutHandle = setTimeout(function timeoutHandler() {
          reject(new TimeoutError("Operation timed out."));
        }, timeout);
      });
      return Promise.race([promise, timeoutPromise]).then((result) => {
        clearTimeout(timeoutHandle);
        return result;
      }, (reason) => {
        clearTimeout(timeoutHandle);
        throw reason;
      });
    }
    exports.callWithTimeout = callWithTimeout;
    async function PromiseAllSettled(promises) {
      return Promise.all(promises.map(async (p) => {
        try {
          const ret = await p;
          return {
            status: "fulfilled",
            value: ret
          };
        } catch (e) {
          return {
            status: "rejected",
            reason: e
          };
        }
      }));
    }
    exports.PromiseAllSettled = PromiseAllSettled;
    function isPromiseAllSettledRejectionResult(it) {
      return it.status === "rejected";
    }
    exports.isPromiseAllSettledRejectionResult = isPromiseAllSettledRejectionResult;
    function FlatMap(arr, fn) {
      const result = [];
      arr.forEach((it) => {
        result.push(...fn(it));
      });
      return result;
    }
    exports.FlatMap = FlatMap;
    function setEquals(lhs, rhs) {
      if (lhs.size !== rhs.size) {
        return false;
      }
      for (const item of lhs) {
        if (!rhs.has(item)) {
          return false;
        }
      }
      return true;
    }
    exports.setEquals = setEquals;
  }
});

// node_modules/@opentelemetry/sdk-metrics/build/src/aggregator/types.js
var require_types14 = __commonJS({
  "node_modules/@opentelemetry/sdk-metrics/build/src/aggregator/types.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.AggregatorKind = void 0;
    var AggregatorKind;
    (function(AggregatorKind2) {
      AggregatorKind2[AggregatorKind2["DROP"] = 0] = "DROP";
      AggregatorKind2[AggregatorKind2["SUM"] = 1] = "SUM";
      AggregatorKind2[AggregatorKind2["LAST_VALUE"] = 2] = "LAST_VALUE";
      AggregatorKind2[AggregatorKind2["HISTOGRAM"] = 3] = "HISTOGRAM";
    })(AggregatorKind = exports.AggregatorKind || (exports.AggregatorKind = {}));
  }
});

// node_modules/@opentelemetry/sdk-metrics/build/src/aggregator/Drop.js
var require_Drop = __commonJS({
  "node_modules/@opentelemetry/sdk-metrics/build/src/aggregator/Drop.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.DropAggregator = void 0;
    var types_1 = require_types14();
    var DropAggregator = class {
      constructor() {
        this.kind = types_1.AggregatorKind.DROP;
      }
      createAccumulation() {
        return void 0;
      }
      merge(_previous, _delta) {
        return void 0;
      }
      diff(_previous, _current) {
        return void 0;
      }
      toMetricData(_descriptor, _aggregationTemporality, _accumulationByAttributes, _endTime) {
        return void 0;
      }
    };
    exports.DropAggregator = DropAggregator;
  }
});

// node_modules/@opentelemetry/sdk-metrics/build/src/InstrumentDescriptor.js
var require_InstrumentDescriptor = __commonJS({
  "node_modules/@opentelemetry/sdk-metrics/build/src/InstrumentDescriptor.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.isDescriptorCompatibleWith = exports.createInstrumentDescriptorWithView = exports.createInstrumentDescriptor = exports.InstrumentType = void 0;
    var api_1 = require_src();
    var InstrumentType;
    (function(InstrumentType2) {
      InstrumentType2["COUNTER"] = "COUNTER";
      InstrumentType2["HISTOGRAM"] = "HISTOGRAM";
      InstrumentType2["UP_DOWN_COUNTER"] = "UP_DOWN_COUNTER";
      InstrumentType2["OBSERVABLE_COUNTER"] = "OBSERVABLE_COUNTER";
      InstrumentType2["OBSERVABLE_GAUGE"] = "OBSERVABLE_GAUGE";
      InstrumentType2["OBSERVABLE_UP_DOWN_COUNTER"] = "OBSERVABLE_UP_DOWN_COUNTER";
    })(InstrumentType = exports.InstrumentType || (exports.InstrumentType = {}));
    function createInstrumentDescriptor(name, type, options) {
      var _a, _b, _c;
      return {
        name,
        type,
        description: (_a = options === null || options === void 0 ? void 0 : options.description) !== null && _a !== void 0 ? _a : "",
        unit: (_b = options === null || options === void 0 ? void 0 : options.unit) !== null && _b !== void 0 ? _b : "",
        valueType: (_c = options === null || options === void 0 ? void 0 : options.valueType) !== null && _c !== void 0 ? _c : api_1.ValueType.DOUBLE
      };
    }
    exports.createInstrumentDescriptor = createInstrumentDescriptor;
    function createInstrumentDescriptorWithView(view, instrument) {
      var _a, _b;
      return {
        name: (_a = view.name) !== null && _a !== void 0 ? _a : instrument.name,
        description: (_b = view.description) !== null && _b !== void 0 ? _b : instrument.description,
        type: instrument.type,
        unit: instrument.unit,
        valueType: instrument.valueType
      };
    }
    exports.createInstrumentDescriptorWithView = createInstrumentDescriptorWithView;
    function isDescriptorCompatibleWith(descriptor, otherDescriptor) {
      return descriptor.name === otherDescriptor.name && descriptor.unit === otherDescriptor.unit && descriptor.type === otherDescriptor.type && descriptor.valueType === otherDescriptor.valueType;
    }
    exports.isDescriptorCompatibleWith = isDescriptorCompatibleWith;
  }
});

// node_modules/@opentelemetry/sdk-metrics/build/src/aggregator/Histogram.js
var require_Histogram = __commonJS({
  "node_modules/@opentelemetry/sdk-metrics/build/src/aggregator/Histogram.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.HistogramAggregator = exports.HistogramAccumulation = void 0;
    var types_1 = require_types14();
    var MetricData_1 = require_MetricData();
    var InstrumentDescriptor_1 = require_InstrumentDescriptor();
    function createNewEmptyCheckpoint(boundaries) {
      const counts = boundaries.map(() => 0);
      counts.push(0);
      return {
        buckets: {
          boundaries,
          counts
        },
        sum: 0,
        count: 0,
        hasMinMax: false,
        min: Infinity,
        max: -Infinity
      };
    }
    var HistogramAccumulation = class {
      constructor(startTime, _boundaries, _recordMinMax = true, _current = createNewEmptyCheckpoint(_boundaries)) {
        this.startTime = startTime;
        this._boundaries = _boundaries;
        this._recordMinMax = _recordMinMax;
        this._current = _current;
      }
      record(value) {
        this._current.count += 1;
        this._current.sum += value;
        if (this._recordMinMax) {
          this._current.min = Math.min(value, this._current.min);
          this._current.max = Math.max(value, this._current.max);
          this._current.hasMinMax = true;
        }
        for (let i = 0; i < this._boundaries.length; i++) {
          if (value < this._boundaries[i]) {
            this._current.buckets.counts[i] += 1;
            return;
          }
        }
        this._current.buckets.counts[this._boundaries.length] += 1;
      }
      setStartTime(startTime) {
        this.startTime = startTime;
      }
      toPointValue() {
        return this._current;
      }
    };
    exports.HistogramAccumulation = HistogramAccumulation;
    var HistogramAggregator = class {
      /**
       * @param _boundaries upper bounds of recorded values.
       * @param _recordMinMax If set to true, min and max will be recorded. Otherwise, min and max will not be recorded.
       */
      constructor(_boundaries, _recordMinMax) {
        this._boundaries = _boundaries;
        this._recordMinMax = _recordMinMax;
        this.kind = types_1.AggregatorKind.HISTOGRAM;
      }
      createAccumulation(startTime) {
        return new HistogramAccumulation(startTime, this._boundaries, this._recordMinMax);
      }
      /**
       * Return the result of the merge of two histogram accumulations. As long as one Aggregator
       * instance produces all Accumulations with constant boundaries we don't need to worry about
       * merging accumulations with different boundaries.
       */
      merge(previous, delta) {
        const previousValue = previous.toPointValue();
        const deltaValue = delta.toPointValue();
        const previousCounts = previousValue.buckets.counts;
        const deltaCounts = deltaValue.buckets.counts;
        const mergedCounts = new Array(previousCounts.length);
        for (let idx = 0; idx < previousCounts.length; idx++) {
          mergedCounts[idx] = previousCounts[idx] + deltaCounts[idx];
        }
        let min = Infinity;
        let max = -Infinity;
        if (this._recordMinMax) {
          if (previousValue.hasMinMax && deltaValue.hasMinMax) {
            min = Math.min(previousValue.min, deltaValue.min);
            max = Math.max(previousValue.max, deltaValue.max);
          } else if (previousValue.hasMinMax) {
            min = previousValue.min;
            max = previousValue.max;
          } else if (deltaValue.hasMinMax) {
            min = deltaValue.min;
            max = deltaValue.max;
          }
        }
        return new HistogramAccumulation(previous.startTime, previousValue.buckets.boundaries, this._recordMinMax, {
          buckets: {
            boundaries: previousValue.buckets.boundaries,
            counts: mergedCounts
          },
          count: previousValue.count + deltaValue.count,
          sum: previousValue.sum + deltaValue.sum,
          hasMinMax: this._recordMinMax && (previousValue.hasMinMax || deltaValue.hasMinMax),
          min,
          max
        });
      }
      /**
       * Returns a new DELTA aggregation by comparing two cumulative measurements.
       */
      diff(previous, current) {
        const previousValue = previous.toPointValue();
        const currentValue = current.toPointValue();
        const previousCounts = previousValue.buckets.counts;
        const currentCounts = currentValue.buckets.counts;
        const diffedCounts = new Array(previousCounts.length);
        for (let idx = 0; idx < previousCounts.length; idx++) {
          diffedCounts[idx] = currentCounts[idx] - previousCounts[idx];
        }
        return new HistogramAccumulation(current.startTime, previousValue.buckets.boundaries, this._recordMinMax, {
          buckets: {
            boundaries: previousValue.buckets.boundaries,
            counts: diffedCounts
          },
          count: currentValue.count - previousValue.count,
          sum: currentValue.sum - previousValue.sum,
          hasMinMax: false,
          min: Infinity,
          max: -Infinity
        });
      }
      toMetricData(descriptor, aggregationTemporality, accumulationByAttributes, endTime) {
        return {
          descriptor,
          aggregationTemporality,
          dataPointType: MetricData_1.DataPointType.HISTOGRAM,
          dataPoints: accumulationByAttributes.map(([attributes, accumulation]) => {
            const pointValue = accumulation.toPointValue();
            const allowsNegativeValues = descriptor.type === InstrumentDescriptor_1.InstrumentType.UP_DOWN_COUNTER || descriptor.type === InstrumentDescriptor_1.InstrumentType.OBSERVABLE_GAUGE || descriptor.type === InstrumentDescriptor_1.InstrumentType.OBSERVABLE_UP_DOWN_COUNTER;
            return {
              attributes,
              startTime: accumulation.startTime,
              endTime,
              value: {
                min: pointValue.hasMinMax ? pointValue.min : void 0,
                max: pointValue.hasMinMax ? pointValue.max : void 0,
                sum: !allowsNegativeValues ? pointValue.sum : void 0,
                buckets: pointValue.buckets,
                count: pointValue.count
              }
            };
          })
        };
      }
    };
    exports.HistogramAggregator = HistogramAggregator;
  }
});

// node_modules/@opentelemetry/sdk-metrics/build/src/aggregator/LastValue.js
var require_LastValue = __commonJS({
  "node_modules/@opentelemetry/sdk-metrics/build/src/aggregator/LastValue.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.LastValueAggregator = exports.LastValueAccumulation = void 0;
    var types_1 = require_types14();
    var core_1 = require_src3();
    var MetricData_1 = require_MetricData();
    var LastValueAccumulation = class {
      constructor(startTime, _current = 0, sampleTime = [0, 0]) {
        this.startTime = startTime;
        this._current = _current;
        this.sampleTime = sampleTime;
      }
      record(value) {
        this._current = value;
        this.sampleTime = (0, core_1.hrTime)();
      }
      setStartTime(startTime) {
        this.startTime = startTime;
      }
      toPointValue() {
        return this._current;
      }
    };
    exports.LastValueAccumulation = LastValueAccumulation;
    var LastValueAggregator = class {
      constructor() {
        this.kind = types_1.AggregatorKind.LAST_VALUE;
      }
      createAccumulation(startTime) {
        return new LastValueAccumulation(startTime);
      }
      /**
       * Returns the result of the merge of the given accumulations.
       *
       * Return the newly captured (delta) accumulation for LastValueAggregator.
       */
      merge(previous, delta) {
        const latestAccumulation = (0, core_1.hrTimeToMicroseconds)(delta.sampleTime) >= (0, core_1.hrTimeToMicroseconds)(previous.sampleTime) ? delta : previous;
        return new LastValueAccumulation(previous.startTime, latestAccumulation.toPointValue(), latestAccumulation.sampleTime);
      }
      /**
       * Returns a new DELTA aggregation by comparing two cumulative measurements.
       *
       * A delta aggregation is not meaningful to LastValueAggregator, just return
       * the newly captured (delta) accumulation for LastValueAggregator.
       */
      diff(previous, current) {
        const latestAccumulation = (0, core_1.hrTimeToMicroseconds)(current.sampleTime) >= (0, core_1.hrTimeToMicroseconds)(previous.sampleTime) ? current : previous;
        return new LastValueAccumulation(current.startTime, latestAccumulation.toPointValue(), latestAccumulation.sampleTime);
      }
      toMetricData(descriptor, aggregationTemporality, accumulationByAttributes, endTime) {
        return {
          descriptor,
          aggregationTemporality,
          dataPointType: MetricData_1.DataPointType.GAUGE,
          dataPoints: accumulationByAttributes.map(([attributes, accumulation]) => {
            return {
              attributes,
              startTime: accumulation.startTime,
              endTime,
              value: accumulation.toPointValue()
            };
          })
        };
      }
    };
    exports.LastValueAggregator = LastValueAggregator;
  }
});

// node_modules/@opentelemetry/sdk-metrics/build/src/aggregator/Sum.js
var require_Sum = __commonJS({
  "node_modules/@opentelemetry/sdk-metrics/build/src/aggregator/Sum.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.SumAggregator = exports.SumAccumulation = void 0;
    var types_1 = require_types14();
    var MetricData_1 = require_MetricData();
    var SumAccumulation = class {
      constructor(startTime, monotonic, _current = 0, reset = false) {
        this.startTime = startTime;
        this.monotonic = monotonic;
        this._current = _current;
        this.reset = reset;
      }
      record(value) {
        if (this.monotonic && value < 0) {
          return;
        }
        this._current += value;
      }
      setStartTime(startTime) {
        this.startTime = startTime;
      }
      toPointValue() {
        return this._current;
      }
    };
    exports.SumAccumulation = SumAccumulation;
    var SumAggregator = class {
      constructor(monotonic) {
        this.monotonic = monotonic;
        this.kind = types_1.AggregatorKind.SUM;
      }
      createAccumulation(startTime) {
        return new SumAccumulation(startTime, this.monotonic);
      }
      /**
       * Returns the result of the merge of the given accumulations.
       */
      merge(previous, delta) {
        const prevPv = previous.toPointValue();
        const deltaPv = delta.toPointValue();
        if (delta.reset) {
          return new SumAccumulation(delta.startTime, this.monotonic, deltaPv, delta.reset);
        }
        return new SumAccumulation(previous.startTime, this.monotonic, prevPv + deltaPv);
      }
      /**
       * Returns a new DELTA aggregation by comparing two cumulative measurements.
       */
      diff(previous, current) {
        const prevPv = previous.toPointValue();
        const currPv = current.toPointValue();
        if (this.monotonic && prevPv > currPv) {
          return new SumAccumulation(current.startTime, this.monotonic, currPv, true);
        }
        return new SumAccumulation(current.startTime, this.monotonic, currPv - prevPv);
      }
      toMetricData(descriptor, aggregationTemporality, accumulationByAttributes, endTime) {
        return {
          descriptor,
          aggregationTemporality,
          dataPointType: MetricData_1.DataPointType.SUM,
          dataPoints: accumulationByAttributes.map(([attributes, accumulation]) => {
            return {
              attributes,
              startTime: accumulation.startTime,
              endTime,
              value: accumulation.toPointValue()
            };
          }),
          isMonotonic: this.monotonic
        };
      }
    };
    exports.SumAggregator = SumAggregator;
  }
});

// node_modules/@opentelemetry/sdk-metrics/build/src/aggregator/index.js
var require_aggregator = __commonJS({
  "node_modules/@opentelemetry/sdk-metrics/build/src/aggregator/index.js"(exports) {
    "use strict";
    var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      Object.defineProperty(o, k2, { enumerable: true, get: function() {
        return m[k];
      } });
    } : function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      o[k2] = m[k];
    });
    var __exportStar = exports && exports.__exportStar || function(m, exports2) {
      for (var p in m)
        if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports2, p))
          __createBinding(exports2, m, p);
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    __exportStar(require_Drop(), exports);
    __exportStar(require_Histogram(), exports);
    __exportStar(require_LastValue(), exports);
    __exportStar(require_Sum(), exports);
  }
});

// node_modules/@opentelemetry/sdk-metrics/build/src/view/Aggregation.js
var require_Aggregation = __commonJS({
  "node_modules/@opentelemetry/sdk-metrics/build/src/view/Aggregation.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.DefaultAggregation = exports.ExplicitBucketHistogramAggregation = exports.HistogramAggregation = exports.LastValueAggregation = exports.SumAggregation = exports.DropAggregation = exports.Aggregation = void 0;
    var api2 = require_src();
    var aggregator_1 = require_aggregator();
    var InstrumentDescriptor_1 = require_InstrumentDescriptor();
    var Aggregation = class {
      static Drop() {
        return DROP_AGGREGATION;
      }
      static Sum() {
        return SUM_AGGREGATION;
      }
      static LastValue() {
        return LAST_VALUE_AGGREGATION;
      }
      static Histogram() {
        return HISTOGRAM_AGGREGATION;
      }
      static Default() {
        return DEFAULT_AGGREGATION;
      }
    };
    exports.Aggregation = Aggregation;
    var DropAggregation = class extends Aggregation {
      createAggregator(_instrument) {
        return DropAggregation.DEFAULT_INSTANCE;
      }
    };
    exports.DropAggregation = DropAggregation;
    DropAggregation.DEFAULT_INSTANCE = new aggregator_1.DropAggregator();
    var SumAggregation = class extends Aggregation {
      createAggregator(instrument) {
        switch (instrument.type) {
          case InstrumentDescriptor_1.InstrumentType.COUNTER:
          case InstrumentDescriptor_1.InstrumentType.OBSERVABLE_COUNTER:
          case InstrumentDescriptor_1.InstrumentType.HISTOGRAM: {
            return SumAggregation.MONOTONIC_INSTANCE;
          }
          default: {
            return SumAggregation.NON_MONOTONIC_INSTANCE;
          }
        }
      }
    };
    exports.SumAggregation = SumAggregation;
    SumAggregation.MONOTONIC_INSTANCE = new aggregator_1.SumAggregator(true);
    SumAggregation.NON_MONOTONIC_INSTANCE = new aggregator_1.SumAggregator(false);
    var LastValueAggregation = class extends Aggregation {
      createAggregator(_instrument) {
        return LastValueAggregation.DEFAULT_INSTANCE;
      }
    };
    exports.LastValueAggregation = LastValueAggregation;
    LastValueAggregation.DEFAULT_INSTANCE = new aggregator_1.LastValueAggregator();
    var HistogramAggregation = class extends Aggregation {
      createAggregator(_instrument) {
        return HistogramAggregation.DEFAULT_INSTANCE;
      }
    };
    exports.HistogramAggregation = HistogramAggregation;
    HistogramAggregation.DEFAULT_INSTANCE = new aggregator_1.HistogramAggregator([0, 5, 10, 25, 50, 75, 100, 250, 500, 1e3], true);
    var ExplicitBucketHistogramAggregation = class extends Aggregation {
      /**
       * @param boundaries the bucket boundaries of the histogram aggregation
       * @param _recordMinMax If set to true, min and max will be recorded. Otherwise, min and max will not be recorded.
       */
      constructor(boundaries, _recordMinMax = true) {
        super();
        this._recordMinMax = _recordMinMax;
        if (boundaries === void 0 || boundaries.length === 0) {
          throw new Error("HistogramAggregator should be created with boundaries.");
        }
        boundaries = boundaries.concat();
        boundaries = boundaries.sort((a, b) => a - b);
        const minusInfinityIndex = boundaries.lastIndexOf(-Infinity);
        let infinityIndex = boundaries.indexOf(Infinity);
        if (infinityIndex === -1) {
          infinityIndex = void 0;
        }
        this._boundaries = boundaries.slice(minusInfinityIndex + 1, infinityIndex);
      }
      createAggregator(_instrument) {
        return new aggregator_1.HistogramAggregator(this._boundaries, this._recordMinMax);
      }
    };
    exports.ExplicitBucketHistogramAggregation = ExplicitBucketHistogramAggregation;
    var DefaultAggregation = class extends Aggregation {
      _resolve(instrument) {
        switch (instrument.type) {
          case InstrumentDescriptor_1.InstrumentType.COUNTER:
          case InstrumentDescriptor_1.InstrumentType.UP_DOWN_COUNTER:
          case InstrumentDescriptor_1.InstrumentType.OBSERVABLE_COUNTER:
          case InstrumentDescriptor_1.InstrumentType.OBSERVABLE_UP_DOWN_COUNTER: {
            return SUM_AGGREGATION;
          }
          case InstrumentDescriptor_1.InstrumentType.OBSERVABLE_GAUGE: {
            return LAST_VALUE_AGGREGATION;
          }
          case InstrumentDescriptor_1.InstrumentType.HISTOGRAM: {
            return HISTOGRAM_AGGREGATION;
          }
        }
        api2.diag.warn(`Unable to recognize instrument type: ${instrument.type}`);
        return DROP_AGGREGATION;
      }
      createAggregator(instrument) {
        return this._resolve(instrument).createAggregator(instrument);
      }
    };
    exports.DefaultAggregation = DefaultAggregation;
    var DROP_AGGREGATION = new DropAggregation();
    var SUM_AGGREGATION = new SumAggregation();
    var LAST_VALUE_AGGREGATION = new LastValueAggregation();
    var HISTOGRAM_AGGREGATION = new HistogramAggregation();
    var DEFAULT_AGGREGATION = new DefaultAggregation();
  }
});

// node_modules/@opentelemetry/sdk-metrics/build/src/export/AggregationSelector.js
var require_AggregationSelector = __commonJS({
  "node_modules/@opentelemetry/sdk-metrics/build/src/export/AggregationSelector.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.DEFAULT_AGGREGATION_TEMPORALITY_SELECTOR = exports.DEFAULT_AGGREGATION_SELECTOR = void 0;
    var Aggregation_1 = require_Aggregation();
    var AggregationTemporality_1 = require_AggregationTemporality();
    var DEFAULT_AGGREGATION_SELECTOR = (_instrumentType) => Aggregation_1.Aggregation.Default();
    exports.DEFAULT_AGGREGATION_SELECTOR = DEFAULT_AGGREGATION_SELECTOR;
    var DEFAULT_AGGREGATION_TEMPORALITY_SELECTOR = (_instrumentType) => AggregationTemporality_1.AggregationTemporality.CUMULATIVE;
    exports.DEFAULT_AGGREGATION_TEMPORALITY_SELECTOR = DEFAULT_AGGREGATION_TEMPORALITY_SELECTOR;
  }
});

// node_modules/@opentelemetry/sdk-metrics/build/src/export/MetricReader.js
var require_MetricReader = __commonJS({
  "node_modules/@opentelemetry/sdk-metrics/build/src/export/MetricReader.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.MetricReader = void 0;
    var api2 = require_src();
    var utils_1 = require_utils6();
    var AggregationSelector_1 = require_AggregationSelector();
    var MetricReader = class {
      constructor(options) {
        var _a, _b;
        this._shutdown = false;
        this._aggregationSelector = (_a = options === null || options === void 0 ? void 0 : options.aggregationSelector) !== null && _a !== void 0 ? _a : AggregationSelector_1.DEFAULT_AGGREGATION_SELECTOR;
        this._aggregationTemporalitySelector = (_b = options === null || options === void 0 ? void 0 : options.aggregationTemporalitySelector) !== null && _b !== void 0 ? _b : AggregationSelector_1.DEFAULT_AGGREGATION_TEMPORALITY_SELECTOR;
      }
      /**
       * Set the {@link MetricProducer} used by this instance.
       *
       * @param metricProducer
       */
      setMetricProducer(metricProducer) {
        if (this._metricProducer) {
          throw new Error("MetricReader can not be bound to a MeterProvider again.");
        }
        this._metricProducer = metricProducer;
        this.onInitialized();
      }
      /**
       * Select the {@link Aggregation} for the given {@link InstrumentType} for this
       * reader.
       */
      selectAggregation(instrumentType) {
        return this._aggregationSelector(instrumentType);
      }
      /**
       * Select the {@link AggregationTemporality} for the given
       * {@link InstrumentType} for this reader.
       */
      selectAggregationTemporality(instrumentType) {
        return this._aggregationTemporalitySelector(instrumentType);
      }
      /**
       * Handle once the SDK has initialized this {@link MetricReader}
       * Overriding this method is optional.
       */
      onInitialized() {
      }
      /**
       * Collect all metrics from the associated {@link MetricProducer}
       */
      async collect(options) {
        if (this._metricProducer === void 0) {
          throw new Error("MetricReader is not bound to a MetricProducer");
        }
        if (this._shutdown) {
          throw new Error("MetricReader is shutdown");
        }
        return this._metricProducer.collect({
          timeoutMillis: options === null || options === void 0 ? void 0 : options.timeoutMillis
        });
      }
      /**
       * Shuts down the metric reader, the promise will reject after the optional timeout or resolve after completion.
       *
       * <p> NOTE: this operation will continue even after the promise rejects due to a timeout.
       * @param options options with timeout.
       */
      async shutdown(options) {
        if (this._shutdown) {
          api2.diag.error("Cannot call shutdown twice.");
          return;
        }
        if ((options === null || options === void 0 ? void 0 : options.timeoutMillis) == null) {
          await this.onShutdown();
        } else {
          await (0, utils_1.callWithTimeout)(this.onShutdown(), options.timeoutMillis);
        }
        this._shutdown = true;
      }
      /**
       * Flushes metrics read by this reader, the promise will reject after the optional timeout or resolve after completion.
       *
       * <p> NOTE: this operation will continue even after the promise rejects due to a timeout.
       * @param options options with timeout.
       */
      async forceFlush(options) {
        if (this._shutdown) {
          api2.diag.warn("Cannot forceFlush on already shutdown MetricReader.");
          return;
        }
        if ((options === null || options === void 0 ? void 0 : options.timeoutMillis) == null) {
          await this.onForceFlush();
          return;
        }
        await (0, utils_1.callWithTimeout)(this.onForceFlush(), options.timeoutMillis);
      }
    };
    exports.MetricReader = MetricReader;
  }
});

// node_modules/@opentelemetry/sdk-metrics/build/src/export/PeriodicExportingMetricReader.js
var require_PeriodicExportingMetricReader = __commonJS({
  "node_modules/@opentelemetry/sdk-metrics/build/src/export/PeriodicExportingMetricReader.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.PeriodicExportingMetricReader = void 0;
    var api2 = require_src();
    var core_1 = require_src3();
    var MetricReader_1 = require_MetricReader();
    var utils_1 = require_utils6();
    var PeriodicExportingMetricReader = class extends MetricReader_1.MetricReader {
      constructor(options) {
        var _a, _b, _c, _d;
        super({
          aggregationSelector: (_a = options.exporter.selectAggregation) === null || _a === void 0 ? void 0 : _a.bind(options.exporter),
          aggregationTemporalitySelector: (_b = options.exporter.selectAggregationTemporality) === null || _b === void 0 ? void 0 : _b.bind(options.exporter)
        });
        if (options.exportIntervalMillis !== void 0 && options.exportIntervalMillis <= 0) {
          throw Error("exportIntervalMillis must be greater than 0");
        }
        if (options.exportTimeoutMillis !== void 0 && options.exportTimeoutMillis <= 0) {
          throw Error("exportTimeoutMillis must be greater than 0");
        }
        if (options.exportTimeoutMillis !== void 0 && options.exportIntervalMillis !== void 0 && options.exportIntervalMillis < options.exportTimeoutMillis) {
          throw Error("exportIntervalMillis must be greater than or equal to exportTimeoutMillis");
        }
        this._exportInterval = (_c = options.exportIntervalMillis) !== null && _c !== void 0 ? _c : 6e4;
        this._exportTimeout = (_d = options.exportTimeoutMillis) !== null && _d !== void 0 ? _d : 3e4;
        this._exporter = options.exporter;
      }
      async _runOnce() {
        const { resourceMetrics, errors } = await this.collect({});
        if (errors.length > 0) {
          api2.diag.error("PeriodicExportingMetricReader: metrics collection errors", ...errors);
        }
        const result = await core_1.internal._export(this._exporter, resourceMetrics);
        if (result.code !== core_1.ExportResultCode.SUCCESS) {
          throw new Error(`PeriodicExportingMetricReader: metrics export failed (error ${result.error})`);
        }
      }
      onInitialized() {
        this._interval = setInterval(async () => {
          try {
            await (0, utils_1.callWithTimeout)(this._runOnce(), this._exportTimeout);
          } catch (err) {
            if (err instanceof utils_1.TimeoutError) {
              api2.diag.error("Export took longer than %s milliseconds and timed out.", this._exportTimeout);
              return;
            }
            (0, core_1.globalErrorHandler)(err);
          }
        }, this._exportInterval);
        (0, core_1.unrefTimer)(this._interval);
      }
      async onForceFlush() {
        await this._exporter.forceFlush();
      }
      async onShutdown() {
        if (this._interval) {
          clearInterval(this._interval);
        }
        await this._exporter.shutdown();
      }
    };
    exports.PeriodicExportingMetricReader = PeriodicExportingMetricReader;
  }
});

// node_modules/@opentelemetry/sdk-metrics/build/src/export/InMemoryMetricExporter.js
var require_InMemoryMetricExporter = __commonJS({
  "node_modules/@opentelemetry/sdk-metrics/build/src/export/InMemoryMetricExporter.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.InMemoryMetricExporter = void 0;
    var core_1 = require_src3();
    var InMemoryMetricExporter = class {
      constructor(aggregationTemporality) {
        this._shutdown = false;
        this._metrics = [];
        this._aggregationTemporality = aggregationTemporality;
      }
      /**
       * @inheritedDoc
       */
      export(metrics, resultCallback) {
        if (this._shutdown) {
          setTimeout(() => resultCallback({ code: core_1.ExportResultCode.FAILED }), 0);
          return;
        }
        this._metrics.push(metrics);
        setTimeout(() => resultCallback({ code: core_1.ExportResultCode.SUCCESS }), 0);
      }
      /**
       * Returns all the collected resource metrics
       * @returns ResourceMetrics[]
       */
      getMetrics() {
        return this._metrics;
      }
      forceFlush() {
        return Promise.resolve();
      }
      reset() {
        this._metrics = [];
      }
      selectAggregationTemporality(_instrumentType) {
        return this._aggregationTemporality;
      }
      shutdown() {
        this._shutdown = true;
        return Promise.resolve();
      }
    };
    exports.InMemoryMetricExporter = InMemoryMetricExporter;
  }
});

// node_modules/@opentelemetry/sdk-metrics/build/src/export/ConsoleMetricExporter.js
var require_ConsoleMetricExporter = __commonJS({
  "node_modules/@opentelemetry/sdk-metrics/build/src/export/ConsoleMetricExporter.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ConsoleMetricExporter = void 0;
    var core_1 = require_src3();
    var AggregationTemporality_1 = require_AggregationTemporality();
    var ConsoleMetricExporter = class {
      constructor() {
        this._shutdown = false;
      }
      export(metrics, resultCallback) {
        if (this._shutdown) {
          setImmediate(resultCallback, { code: core_1.ExportResultCode.FAILED });
          return;
        }
        return ConsoleMetricExporter._sendMetrics(metrics, resultCallback);
      }
      forceFlush() {
        return Promise.resolve();
      }
      selectAggregationTemporality(_instrumentType) {
        return AggregationTemporality_1.AggregationTemporality.CUMULATIVE;
      }
      shutdown() {
        this._shutdown = true;
        return Promise.resolve();
      }
      static _sendMetrics(metrics, done) {
        for (const scopeMetrics of metrics.scopeMetrics) {
          for (const metric of scopeMetrics.metrics) {
            console.dir({
              descriptor: metric.descriptor,
              dataPointType: metric.dataPointType,
              dataPoints: metric.dataPoints
            });
          }
        }
        done({ code: core_1.ExportResultCode.SUCCESS });
      }
    };
    exports.ConsoleMetricExporter = ConsoleMetricExporter;
  }
});

// node_modules/@opentelemetry/sdk-metrics/build/src/view/ViewRegistry.js
var require_ViewRegistry = __commonJS({
  "node_modules/@opentelemetry/sdk-metrics/build/src/view/ViewRegistry.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ViewRegistry = void 0;
    var ViewRegistry = class {
      constructor() {
        this._registeredViews = [];
      }
      addView(view) {
        this._registeredViews.push(view);
      }
      findViews(instrument, meter) {
        const views = this._registeredViews.filter((registeredView) => {
          return this._matchInstrument(registeredView.instrumentSelector, instrument) && this._matchMeter(registeredView.meterSelector, meter);
        });
        return views;
      }
      _matchInstrument(selector, instrument) {
        return (selector.getType() === void 0 || instrument.type === selector.getType()) && selector.getNameFilter().match(instrument.name);
      }
      _matchMeter(selector, meter) {
        return selector.getNameFilter().match(meter.name) && (meter.version === void 0 || selector.getVersionFilter().match(meter.version)) && (meter.schemaUrl === void 0 || selector.getSchemaUrlFilter().match(meter.schemaUrl));
      }
    };
    exports.ViewRegistry = ViewRegistry;
  }
});

// node_modules/@opentelemetry/sdk-metrics/build/src/Instruments.js
var require_Instruments = __commonJS({
  "node_modules/@opentelemetry/sdk-metrics/build/src/Instruments.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.isObservableInstrument = exports.ObservableUpDownCounterInstrument = exports.ObservableGaugeInstrument = exports.ObservableCounterInstrument = exports.ObservableInstrument = exports.HistogramInstrument = exports.CounterInstrument = exports.UpDownCounterInstrument = exports.SyncInstrument = void 0;
    var api_1 = require_src();
    var core_1 = require_src3();
    var SyncInstrument = class {
      constructor(_writableMetricStorage, _descriptor) {
        this._writableMetricStorage = _writableMetricStorage;
        this._descriptor = _descriptor;
      }
      _record(value, attributes = {}, context = api_1.context.active()) {
        if (this._descriptor.valueType === api_1.ValueType.INT && !Number.isInteger(value)) {
          api_1.diag.warn(`INT value type cannot accept a floating-point value for ${this._descriptor.name}, ignoring the fractional digits.`);
          value = Math.trunc(value);
        }
        this._writableMetricStorage.record(value, attributes, context, (0, core_1.hrTime)());
      }
    };
    exports.SyncInstrument = SyncInstrument;
    var UpDownCounterInstrument = class extends SyncInstrument {
      /**
       * Increment value of counter by the input. Inputs may be negative.
       */
      add(value, attributes, ctx) {
        this._record(value, attributes, ctx);
      }
    };
    exports.UpDownCounterInstrument = UpDownCounterInstrument;
    var CounterInstrument = class extends SyncInstrument {
      /**
       * Increment value of counter by the input. Inputs may not be negative.
       */
      add(value, attributes, ctx) {
        if (value < 0) {
          api_1.diag.warn(`negative value provided to counter ${this._descriptor.name}: ${value}`);
          return;
        }
        this._record(value, attributes, ctx);
      }
    };
    exports.CounterInstrument = CounterInstrument;
    var HistogramInstrument = class extends SyncInstrument {
      /**
       * Records a measurement. Value of the measurement must not be negative.
       */
      record(value, attributes, ctx) {
        if (value < 0) {
          api_1.diag.warn(`negative value provided to histogram ${this._descriptor.name}: ${value}`);
          return;
        }
        this._record(value, attributes, ctx);
      }
    };
    exports.HistogramInstrument = HistogramInstrument;
    var ObservableInstrument = class {
      constructor(descriptor, metricStorages, _observableRegistry) {
        this._observableRegistry = _observableRegistry;
        this._descriptor = descriptor;
        this._metricStorages = metricStorages;
      }
      /**
       * @see {Observable.addCallback}
       */
      addCallback(callback) {
        this._observableRegistry.addCallback(callback, this);
      }
      /**
       * @see {Observable.removeCallback}
       */
      removeCallback(callback) {
        this._observableRegistry.removeCallback(callback, this);
      }
    };
    exports.ObservableInstrument = ObservableInstrument;
    var ObservableCounterInstrument = class extends ObservableInstrument {
    };
    exports.ObservableCounterInstrument = ObservableCounterInstrument;
    var ObservableGaugeInstrument = class extends ObservableInstrument {
    };
    exports.ObservableGaugeInstrument = ObservableGaugeInstrument;
    var ObservableUpDownCounterInstrument = class extends ObservableInstrument {
    };
    exports.ObservableUpDownCounterInstrument = ObservableUpDownCounterInstrument;
    function isObservableInstrument(it) {
      return it instanceof ObservableInstrument;
    }
    exports.isObservableInstrument = isObservableInstrument;
  }
});

// node_modules/@opentelemetry/sdk-metrics/build/src/Meter.js
var require_Meter = __commonJS({
  "node_modules/@opentelemetry/sdk-metrics/build/src/Meter.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Meter = void 0;
    var InstrumentDescriptor_1 = require_InstrumentDescriptor();
    var Instruments_1 = require_Instruments();
    var Meter = class {
      constructor(_meterSharedState) {
        this._meterSharedState = _meterSharedState;
      }
      /**
       * Create a {@link Histogram} instrument.
       */
      createHistogram(name, options) {
        const descriptor = (0, InstrumentDescriptor_1.createInstrumentDescriptor)(name, InstrumentDescriptor_1.InstrumentType.HISTOGRAM, options);
        const storage = this._meterSharedState.registerMetricStorage(descriptor);
        return new Instruments_1.HistogramInstrument(storage, descriptor);
      }
      /**
       * Create a {@link Counter} instrument.
       */
      createCounter(name, options) {
        const descriptor = (0, InstrumentDescriptor_1.createInstrumentDescriptor)(name, InstrumentDescriptor_1.InstrumentType.COUNTER, options);
        const storage = this._meterSharedState.registerMetricStorage(descriptor);
        return new Instruments_1.CounterInstrument(storage, descriptor);
      }
      /**
       * Create a {@link UpDownCounter} instrument.
       */
      createUpDownCounter(name, options) {
        const descriptor = (0, InstrumentDescriptor_1.createInstrumentDescriptor)(name, InstrumentDescriptor_1.InstrumentType.UP_DOWN_COUNTER, options);
        const storage = this._meterSharedState.registerMetricStorage(descriptor);
        return new Instruments_1.UpDownCounterInstrument(storage, descriptor);
      }
      /**
       * Create a {@link ObservableGauge} instrument.
       */
      createObservableGauge(name, options) {
        const descriptor = (0, InstrumentDescriptor_1.createInstrumentDescriptor)(name, InstrumentDescriptor_1.InstrumentType.OBSERVABLE_GAUGE, options);
        const storages = this._meterSharedState.registerAsyncMetricStorage(descriptor);
        return new Instruments_1.ObservableGaugeInstrument(descriptor, storages, this._meterSharedState.observableRegistry);
      }
      /**
       * Create a {@link ObservableCounter} instrument.
       */
      createObservableCounter(name, options) {
        const descriptor = (0, InstrumentDescriptor_1.createInstrumentDescriptor)(name, InstrumentDescriptor_1.InstrumentType.OBSERVABLE_COUNTER, options);
        const storages = this._meterSharedState.registerAsyncMetricStorage(descriptor);
        return new Instruments_1.ObservableCounterInstrument(descriptor, storages, this._meterSharedState.observableRegistry);
      }
      /**
       * Create a {@link ObservableUpDownCounter} instrument.
       */
      createObservableUpDownCounter(name, options) {
        const descriptor = (0, InstrumentDescriptor_1.createInstrumentDescriptor)(name, InstrumentDescriptor_1.InstrumentType.OBSERVABLE_UP_DOWN_COUNTER, options);
        const storages = this._meterSharedState.registerAsyncMetricStorage(descriptor);
        return new Instruments_1.ObservableUpDownCounterInstrument(descriptor, storages, this._meterSharedState.observableRegistry);
      }
      /**
       * @see {@link Meter.addBatchObservableCallback}
       */
      addBatchObservableCallback(callback, observables) {
        this._meterSharedState.observableRegistry.addBatchCallback(callback, observables);
      }
      /**
       * @see {@link Meter.removeBatchObservableCallback}
       */
      removeBatchObservableCallback(callback, observables) {
        this._meterSharedState.observableRegistry.removeBatchCallback(callback, observables);
      }
    };
    exports.Meter = Meter;
  }
});

// node_modules/@opentelemetry/sdk-metrics/build/src/state/MetricStorage.js
var require_MetricStorage = __commonJS({
  "node_modules/@opentelemetry/sdk-metrics/build/src/state/MetricStorage.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.MetricStorage = void 0;
    var InstrumentDescriptor_1 = require_InstrumentDescriptor();
    var MetricStorage = class {
      constructor(_instrumentDescriptor) {
        this._instrumentDescriptor = _instrumentDescriptor;
      }
      getInstrumentDescriptor() {
        return this._instrumentDescriptor;
      }
      updateDescription(description) {
        this._instrumentDescriptor = (0, InstrumentDescriptor_1.createInstrumentDescriptor)(this._instrumentDescriptor.name, this._instrumentDescriptor.type, {
          description,
          valueType: this._instrumentDescriptor.valueType,
          unit: this._instrumentDescriptor.unit
        });
      }
    };
    exports.MetricStorage = MetricStorage;
  }
});

// node_modules/@opentelemetry/sdk-metrics/build/src/state/HashMap.js
var require_HashMap = __commonJS({
  "node_modules/@opentelemetry/sdk-metrics/build/src/state/HashMap.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.AttributeHashMap = exports.HashMap = void 0;
    var utils_1 = require_utils6();
    var HashMap = class {
      constructor(_hash) {
        this._hash = _hash;
        this._valueMap = /* @__PURE__ */ new Map();
        this._keyMap = /* @__PURE__ */ new Map();
      }
      get(key, hashCode) {
        hashCode !== null && hashCode !== void 0 ? hashCode : hashCode = this._hash(key);
        return this._valueMap.get(hashCode);
      }
      getOrDefault(key, defaultFactory) {
        const hash = this._hash(key);
        if (this._valueMap.has(hash)) {
          return this._valueMap.get(hash);
        }
        const val = defaultFactory();
        if (!this._keyMap.has(hash)) {
          this._keyMap.set(hash, key);
        }
        this._valueMap.set(hash, val);
        return val;
      }
      set(key, value, hashCode) {
        hashCode !== null && hashCode !== void 0 ? hashCode : hashCode = this._hash(key);
        if (!this._keyMap.has(hashCode)) {
          this._keyMap.set(hashCode, key);
        }
        this._valueMap.set(hashCode, value);
      }
      has(key, hashCode) {
        hashCode !== null && hashCode !== void 0 ? hashCode : hashCode = this._hash(key);
        return this._valueMap.has(hashCode);
      }
      *keys() {
        const keyIterator = this._keyMap.entries();
        let next = keyIterator.next();
        while (next.done !== true) {
          yield [next.value[1], next.value[0]];
          next = keyIterator.next();
        }
      }
      *entries() {
        const valueIterator = this._valueMap.entries();
        let next = valueIterator.next();
        while (next.done !== true) {
          yield [this._keyMap.get(next.value[0]), next.value[1], next.value[0]];
          next = valueIterator.next();
        }
      }
      get size() {
        return this._valueMap.size;
      }
    };
    exports.HashMap = HashMap;
    var AttributeHashMap = class extends HashMap {
      constructor() {
        super(utils_1.hashAttributes);
      }
    };
    exports.AttributeHashMap = AttributeHashMap;
  }
});

// node_modules/@opentelemetry/sdk-metrics/build/src/state/DeltaMetricProcessor.js
var require_DeltaMetricProcessor = __commonJS({
  "node_modules/@opentelemetry/sdk-metrics/build/src/state/DeltaMetricProcessor.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.DeltaMetricProcessor = void 0;
    var HashMap_1 = require_HashMap();
    var DeltaMetricProcessor = class {
      constructor(_aggregator) {
        this._aggregator = _aggregator;
        this._activeCollectionStorage = new HashMap_1.AttributeHashMap();
        this._cumulativeMemoStorage = new HashMap_1.AttributeHashMap();
      }
      record(value, attributes, _context, collectionTime) {
        const accumulation = this._activeCollectionStorage.getOrDefault(attributes, () => this._aggregator.createAccumulation(collectionTime));
        accumulation === null || accumulation === void 0 ? void 0 : accumulation.record(value);
      }
      batchCumulate(measurements, collectionTime) {
        Array.from(measurements.entries()).forEach(([attributes, value, hashCode]) => {
          const accumulation = this._aggregator.createAccumulation(collectionTime);
          accumulation === null || accumulation === void 0 ? void 0 : accumulation.record(value);
          let delta = accumulation;
          if (this._cumulativeMemoStorage.has(attributes, hashCode)) {
            const previous = this._cumulativeMemoStorage.get(attributes, hashCode);
            delta = this._aggregator.diff(previous, accumulation);
          }
          this._cumulativeMemoStorage.set(attributes, accumulation, hashCode);
          this._activeCollectionStorage.set(attributes, delta, hashCode);
        });
      }
      /**
       * Returns a collection of delta metrics. Start time is the when first
       * time event collected.
       */
      collect() {
        const unreportedDelta = this._activeCollectionStorage;
        this._activeCollectionStorage = new HashMap_1.AttributeHashMap();
        return unreportedDelta;
      }
    };
    exports.DeltaMetricProcessor = DeltaMetricProcessor;
  }
});

// node_modules/@opentelemetry/sdk-metrics/build/src/state/TemporalMetricProcessor.js
var require_TemporalMetricProcessor = __commonJS({
  "node_modules/@opentelemetry/sdk-metrics/build/src/state/TemporalMetricProcessor.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.TemporalMetricProcessor = void 0;
    var AggregationTemporality_1 = require_AggregationTemporality();
    var HashMap_1 = require_HashMap();
    var TemporalMetricProcessor = class {
      constructor(_aggregator) {
        this._aggregator = _aggregator;
        this._unreportedAccumulations = /* @__PURE__ */ new Map();
        this._reportHistory = /* @__PURE__ */ new Map();
      }
      /**
       * Builds the {@link MetricData} streams to report against a specific MetricCollector.
       * @param collector The information of the MetricCollector.
       * @param collectors The registered collectors.
       * @param instrumentDescriptor The instrumentation descriptor that these metrics generated with.
       * @param currentAccumulations The current accumulation of metric data from instruments.
       * @param collectionTime The current collection timestamp.
       * @returns The {@link MetricData} points or `null`.
       */
      buildMetrics(collector, collectors, instrumentDescriptor, currentAccumulations, collectionTime) {
        this._stashAccumulations(collectors, currentAccumulations);
        const unreportedAccumulations = this._getMergedUnreportedAccumulations(collector);
        let result = unreportedAccumulations;
        let aggregationTemporality;
        if (this._reportHistory.has(collector)) {
          const last = this._reportHistory.get(collector);
          const lastCollectionTime = last.collectionTime;
          aggregationTemporality = last.aggregationTemporality;
          if (aggregationTemporality === AggregationTemporality_1.AggregationTemporality.CUMULATIVE) {
            result = TemporalMetricProcessor.merge(last.accumulations, unreportedAccumulations, this._aggregator);
          } else {
            result = TemporalMetricProcessor.calibrateStartTime(last.accumulations, unreportedAccumulations, lastCollectionTime);
          }
        } else {
          aggregationTemporality = collector.selectAggregationTemporality(instrumentDescriptor.type);
        }
        this._reportHistory.set(collector, {
          accumulations: result,
          collectionTime,
          aggregationTemporality
        });
        return this._aggregator.toMetricData(
          instrumentDescriptor,
          aggregationTemporality,
          AttributesMapToAccumulationRecords(result),
          /* endTime */
          collectionTime
        );
      }
      _stashAccumulations(collectors, currentAccumulation) {
        collectors.forEach((it) => {
          let stash = this._unreportedAccumulations.get(it);
          if (stash === void 0) {
            stash = [];
            this._unreportedAccumulations.set(it, stash);
          }
          stash.push(currentAccumulation);
        });
      }
      _getMergedUnreportedAccumulations(collector) {
        let result = new HashMap_1.AttributeHashMap();
        const unreportedList = this._unreportedAccumulations.get(collector);
        this._unreportedAccumulations.set(collector, []);
        if (unreportedList === void 0) {
          return result;
        }
        for (const it of unreportedList) {
          result = TemporalMetricProcessor.merge(result, it, this._aggregator);
        }
        return result;
      }
      static merge(last, current, aggregator) {
        const result = last;
        const iterator = current.entries();
        let next = iterator.next();
        while (next.done !== true) {
          const [key, record, hash] = next.value;
          if (last.has(key, hash)) {
            const lastAccumulation = last.get(key, hash);
            const accumulation = aggregator.merge(lastAccumulation, record);
            result.set(key, accumulation, hash);
          } else {
            result.set(key, record, hash);
          }
          next = iterator.next();
        }
        return result;
      }
      /**
       * Calibrate the reported metric streams' startTime to lastCollectionTime. Leaves
       * the new stream to be the initial observation time unchanged.
       */
      static calibrateStartTime(last, current, lastCollectionTime) {
        for (const [key, hash] of last.keys()) {
          const currentAccumulation = current.get(key, hash);
          currentAccumulation === null || currentAccumulation === void 0 ? void 0 : currentAccumulation.setStartTime(lastCollectionTime);
        }
        return current;
      }
    };
    exports.TemporalMetricProcessor = TemporalMetricProcessor;
    function AttributesMapToAccumulationRecords(map) {
      return Array.from(map.entries());
    }
  }
});

// node_modules/@opentelemetry/sdk-metrics/build/src/state/AsyncMetricStorage.js
var require_AsyncMetricStorage = __commonJS({
  "node_modules/@opentelemetry/sdk-metrics/build/src/state/AsyncMetricStorage.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.AsyncMetricStorage = void 0;
    var MetricStorage_1 = require_MetricStorage();
    var DeltaMetricProcessor_1 = require_DeltaMetricProcessor();
    var TemporalMetricProcessor_1 = require_TemporalMetricProcessor();
    var HashMap_1 = require_HashMap();
    var AsyncMetricStorage = class extends MetricStorage_1.MetricStorage {
      constructor(_instrumentDescriptor, aggregator, _attributesProcessor) {
        super(_instrumentDescriptor);
        this._attributesProcessor = _attributesProcessor;
        this._deltaMetricStorage = new DeltaMetricProcessor_1.DeltaMetricProcessor(aggregator);
        this._temporalMetricStorage = new TemporalMetricProcessor_1.TemporalMetricProcessor(aggregator);
      }
      record(measurements, observationTime) {
        const processed = new HashMap_1.AttributeHashMap();
        Array.from(measurements.entries()).forEach(([attributes, value]) => {
          processed.set(this._attributesProcessor.process(attributes), value);
        });
        this._deltaMetricStorage.batchCumulate(processed, observationTime);
      }
      /**
       * Collects the metrics from this storage. The ObservableCallback is invoked
       * during the collection.
       *
       * Note: This is a stateful operation and may reset any interval-related
       * state for the MetricCollector.
       */
      collect(collector, collectors, collectionTime) {
        const accumulations = this._deltaMetricStorage.collect();
        return this._temporalMetricStorage.buildMetrics(collector, collectors, this._instrumentDescriptor, accumulations, collectionTime);
      }
    };
    exports.AsyncMetricStorage = AsyncMetricStorage;
  }
});

// node_modules/@opentelemetry/sdk-metrics/build/src/view/RegistrationConflicts.js
var require_RegistrationConflicts = __commonJS({
  "node_modules/@opentelemetry/sdk-metrics/build/src/view/RegistrationConflicts.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getConflictResolutionRecipe = exports.getDescriptionResolutionRecipe = exports.getTypeConflictResolutionRecipe = exports.getUnitConflictResolutionRecipe = exports.getValueTypeConflictResolutionRecipe = exports.getIncompatibilityDetails = void 0;
    function getIncompatibilityDetails(existing, otherDescriptor) {
      let incompatibility = "";
      if (existing.unit !== otherDescriptor.unit) {
        incompatibility += `	- Unit '${existing.unit}' does not match '${otherDescriptor.unit}'
`;
      }
      if (existing.type !== otherDescriptor.type) {
        incompatibility += `	- Type '${existing.type}' does not match '${otherDescriptor.type}'
`;
      }
      if (existing.valueType !== otherDescriptor.valueType) {
        incompatibility += `	- Value Type '${existing.valueType}' does not match '${otherDescriptor.valueType}'
`;
      }
      if (existing.description !== otherDescriptor.description) {
        incompatibility += `	- Description '${existing.description}' does not match '${otherDescriptor.description}'
`;
      }
      return incompatibility;
    }
    exports.getIncompatibilityDetails = getIncompatibilityDetails;
    function getValueTypeConflictResolutionRecipe(existing, otherDescriptor) {
      return `	- use valueType '${existing.valueType}' on instrument creation or use an instrument name other than '${otherDescriptor.name}'`;
    }
    exports.getValueTypeConflictResolutionRecipe = getValueTypeConflictResolutionRecipe;
    function getUnitConflictResolutionRecipe(existing, otherDescriptor) {
      return `	- use unit '${existing.unit}' on instrument creation or use an instrument name other than '${otherDescriptor.name}'`;
    }
    exports.getUnitConflictResolutionRecipe = getUnitConflictResolutionRecipe;
    function getTypeConflictResolutionRecipe(existing, otherDescriptor) {
      const selector = {
        name: otherDescriptor.name,
        type: otherDescriptor.type
      };
      const selectorString = JSON.stringify(selector);
      return `	- create a new view with a name other than '${existing.name}' and InstrumentSelector '${selectorString}'`;
    }
    exports.getTypeConflictResolutionRecipe = getTypeConflictResolutionRecipe;
    function getDescriptionResolutionRecipe(existing, otherDescriptor) {
      const selector = {
        name: otherDescriptor.name,
        type: otherDescriptor.type
      };
      const selectorString = JSON.stringify(selector);
      return `	- create a new view with a name other than '${existing.name}' and InstrumentSelector '${selectorString}'
    	- OR - create a new view with the name ${existing.name} and description '${existing.description}' and InstrumentSelector ${selectorString}
    	- OR - create a new view with the name ${otherDescriptor.name} and description '${existing.description}' and InstrumentSelector ${selectorString}`;
    }
    exports.getDescriptionResolutionRecipe = getDescriptionResolutionRecipe;
    function getConflictResolutionRecipe(existing, otherDescriptor) {
      if (existing.valueType !== otherDescriptor.valueType) {
        return getValueTypeConflictResolutionRecipe(existing, otherDescriptor);
      }
      if (existing.unit !== otherDescriptor.unit) {
        return getUnitConflictResolutionRecipe(existing, otherDescriptor);
      }
      if (existing.type !== otherDescriptor.type) {
        return getTypeConflictResolutionRecipe(existing, otherDescriptor);
      }
      if (existing.description !== otherDescriptor.description) {
        return getDescriptionResolutionRecipe(existing, otherDescriptor);
      }
      return "";
    }
    exports.getConflictResolutionRecipe = getConflictResolutionRecipe;
  }
});

// node_modules/@opentelemetry/sdk-metrics/build/src/state/MetricStorageRegistry.js
var require_MetricStorageRegistry = __commonJS({
  "node_modules/@opentelemetry/sdk-metrics/build/src/state/MetricStorageRegistry.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.MetricStorageRegistry = void 0;
    var InstrumentDescriptor_1 = require_InstrumentDescriptor();
    var api2 = require_src();
    var RegistrationConflicts_1 = require_RegistrationConflicts();
    var MetricStorageRegistry = class {
      constructor() {
        this._sharedRegistry = /* @__PURE__ */ new Map();
        this._perCollectorRegistry = /* @__PURE__ */ new Map();
      }
      static create() {
        return new MetricStorageRegistry();
      }
      getStorages(collector) {
        let storages = [];
        for (const metricStorages of this._sharedRegistry.values()) {
          storages = storages.concat(metricStorages);
        }
        const perCollectorStorages = this._perCollectorRegistry.get(collector);
        if (perCollectorStorages != null) {
          for (const metricStorages of perCollectorStorages.values()) {
            storages = storages.concat(metricStorages);
          }
        }
        return storages;
      }
      register(storage) {
        this._registerStorage(storage, this._sharedRegistry);
      }
      registerForCollector(collector, storage) {
        let storageMap = this._perCollectorRegistry.get(collector);
        if (storageMap == null) {
          storageMap = /* @__PURE__ */ new Map();
          this._perCollectorRegistry.set(collector, storageMap);
        }
        this._registerStorage(storage, storageMap);
      }
      findOrUpdateCompatibleStorage(expectedDescriptor) {
        const storages = this._sharedRegistry.get(expectedDescriptor.name);
        if (storages === void 0) {
          return null;
        }
        return this._findOrUpdateCompatibleStorage(expectedDescriptor, storages);
      }
      findOrUpdateCompatibleCollectorStorage(collector, expectedDescriptor) {
        const storageMap = this._perCollectorRegistry.get(collector);
        if (storageMap === void 0) {
          return null;
        }
        const storages = this._sharedRegistry.get(expectedDescriptor.name);
        if (storages === void 0) {
          return null;
        }
        return this._findOrUpdateCompatibleStorage(expectedDescriptor, storages);
      }
      _registerStorage(storage, storageMap) {
        const descriptor = storage.getInstrumentDescriptor();
        const storages = storageMap.get(descriptor.name);
        if (storages === void 0) {
          storageMap.set(descriptor.name, [storage]);
          return;
        }
        storages.push(storage);
      }
      _findOrUpdateCompatibleStorage(expectedDescriptor, existingStorages) {
        let compatibleStorage = null;
        for (const existingStorage of existingStorages) {
          const existingDescriptor = existingStorage.getInstrumentDescriptor();
          if ((0, InstrumentDescriptor_1.isDescriptorCompatibleWith)(existingDescriptor, expectedDescriptor)) {
            if (existingDescriptor.description !== expectedDescriptor.description) {
              if (expectedDescriptor.description.length > existingDescriptor.description.length) {
                existingStorage.updateDescription(expectedDescriptor.description);
              }
              api2.diag.warn("A view or instrument with the name ", expectedDescriptor.name, " has already been registered, but has a different description and is incompatible with another registered view.\n", "Details:\n", (0, RegistrationConflicts_1.getIncompatibilityDetails)(existingDescriptor, expectedDescriptor), "The longer description will be used.\nTo resolve the conflict:", (0, RegistrationConflicts_1.getConflictResolutionRecipe)(existingDescriptor, expectedDescriptor));
            }
            compatibleStorage = existingStorage;
          } else {
            api2.diag.warn("A view or instrument with the name ", expectedDescriptor.name, " has already been registered and is incompatible with another registered view.\n", "Details:\n", (0, RegistrationConflicts_1.getIncompatibilityDetails)(existingDescriptor, expectedDescriptor), "To resolve the conflict:\n", (0, RegistrationConflicts_1.getConflictResolutionRecipe)(existingDescriptor, expectedDescriptor));
          }
        }
        return compatibleStorage;
      }
    };
    exports.MetricStorageRegistry = MetricStorageRegistry;
  }
});

// node_modules/@opentelemetry/sdk-metrics/build/src/state/MultiWritableMetricStorage.js
var require_MultiWritableMetricStorage = __commonJS({
  "node_modules/@opentelemetry/sdk-metrics/build/src/state/MultiWritableMetricStorage.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.MultiMetricStorage = void 0;
    var MultiMetricStorage = class {
      constructor(_backingStorages) {
        this._backingStorages = _backingStorages;
      }
      record(value, attributes, context, recordTime) {
        this._backingStorages.forEach((it) => {
          it.record(value, attributes, context, recordTime);
        });
      }
    };
    exports.MultiMetricStorage = MultiMetricStorage;
  }
});

// node_modules/@opentelemetry/sdk-metrics/build/src/ObservableResult.js
var require_ObservableResult = __commonJS({
  "node_modules/@opentelemetry/sdk-metrics/build/src/ObservableResult.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.BatchObservableResultImpl = exports.ObservableResultImpl = void 0;
    var api_1 = require_src();
    var HashMap_1 = require_HashMap();
    var Instruments_1 = require_Instruments();
    var ObservableResultImpl = class {
      constructor(_descriptor) {
        this._descriptor = _descriptor;
        this._buffer = new HashMap_1.AttributeHashMap();
      }
      /**
       * Observe a measurement of the value associated with the given attributes.
       */
      observe(value, attributes = {}) {
        if (this._descriptor.valueType === api_1.ValueType.INT && !Number.isInteger(value)) {
          api_1.diag.warn(`INT value type cannot accept a floating-point value for ${this._descriptor.name}, ignoring the fractional digits.`);
          value = Math.trunc(value);
        }
        this._buffer.set(attributes, value);
      }
    };
    exports.ObservableResultImpl = ObservableResultImpl;
    var BatchObservableResultImpl = class {
      constructor() {
        this._buffer = /* @__PURE__ */ new Map();
      }
      /**
       * Observe a measurement of the value associated with the given attributes.
       */
      observe(metric, value, attributes = {}) {
        if (!(0, Instruments_1.isObservableInstrument)(metric)) {
          return;
        }
        let map = this._buffer.get(metric);
        if (map == null) {
          map = new HashMap_1.AttributeHashMap();
          this._buffer.set(metric, map);
        }
        if (metric._descriptor.valueType === api_1.ValueType.INT && !Number.isInteger(value)) {
          api_1.diag.warn(`INT value type cannot accept a floating-point value for ${metric._descriptor.name}, ignoring the fractional digits.`);
          value = Math.trunc(value);
        }
        map.set(attributes, value);
      }
    };
    exports.BatchObservableResultImpl = BatchObservableResultImpl;
  }
});

// node_modules/@opentelemetry/sdk-metrics/build/src/state/ObservableRegistry.js
var require_ObservableRegistry = __commonJS({
  "node_modules/@opentelemetry/sdk-metrics/build/src/state/ObservableRegistry.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ObservableRegistry = void 0;
    var api_1 = require_src();
    var Instruments_1 = require_Instruments();
    var ObservableResult_1 = require_ObservableResult();
    var utils_1 = require_utils6();
    var ObservableRegistry = class {
      constructor() {
        this._callbacks = [];
        this._batchCallbacks = [];
      }
      addCallback(callback, instrument) {
        const idx = this._findCallback(callback, instrument);
        if (idx >= 0) {
          return;
        }
        this._callbacks.push({ callback, instrument });
      }
      removeCallback(callback, instrument) {
        const idx = this._findCallback(callback, instrument);
        if (idx < 0) {
          return;
        }
        this._callbacks.splice(idx, 1);
      }
      addBatchCallback(callback, instruments) {
        const observableInstruments = new Set(instruments.filter(Instruments_1.isObservableInstrument));
        if (observableInstruments.size === 0) {
          api_1.diag.error("BatchObservableCallback is not associated with valid instruments", instruments);
          return;
        }
        const idx = this._findBatchCallback(callback, observableInstruments);
        if (idx >= 0) {
          return;
        }
        this._batchCallbacks.push({ callback, instruments: observableInstruments });
      }
      removeBatchCallback(callback, instruments) {
        const observableInstruments = new Set(instruments.filter(Instruments_1.isObservableInstrument));
        const idx = this._findBatchCallback(callback, observableInstruments);
        if (idx < 0) {
          return;
        }
        this._batchCallbacks.splice(idx, 1);
      }
      /**
       * @returns a promise of rejected reasons for invoking callbacks.
       */
      async observe(collectionTime, timeoutMillis) {
        const callbackFutures = this._observeCallbacks(collectionTime, timeoutMillis);
        const batchCallbackFutures = this._observeBatchCallbacks(collectionTime, timeoutMillis);
        const results = await (0, utils_1.PromiseAllSettled)([...callbackFutures, ...batchCallbackFutures]);
        const rejections = results.filter(utils_1.isPromiseAllSettledRejectionResult).map((it) => it.reason);
        return rejections;
      }
      _observeCallbacks(observationTime, timeoutMillis) {
        return this._callbacks.map(async ({ callback, instrument }) => {
          const observableResult = new ObservableResult_1.ObservableResultImpl(instrument._descriptor);
          let callPromise = Promise.resolve(callback(observableResult));
          if (timeoutMillis != null) {
            callPromise = (0, utils_1.callWithTimeout)(callPromise, timeoutMillis);
          }
          await callPromise;
          instrument._metricStorages.forEach((metricStorage) => {
            metricStorage.record(observableResult._buffer, observationTime);
          });
        });
      }
      _observeBatchCallbacks(observationTime, timeoutMillis) {
        return this._batchCallbacks.map(async ({ callback, instruments }) => {
          const observableResult = new ObservableResult_1.BatchObservableResultImpl();
          let callPromise = Promise.resolve(callback(observableResult));
          if (timeoutMillis != null) {
            callPromise = (0, utils_1.callWithTimeout)(callPromise, timeoutMillis);
          }
          await callPromise;
          instruments.forEach((instrument) => {
            const buffer = observableResult._buffer.get(instrument);
            if (buffer == null) {
              return;
            }
            instrument._metricStorages.forEach((metricStorage) => {
              metricStorage.record(buffer, observationTime);
            });
          });
        });
      }
      _findCallback(callback, instrument) {
        return this._callbacks.findIndex((record) => {
          return record.callback === callback && record.instrument === instrument;
        });
      }
      _findBatchCallback(callback, instruments) {
        return this._batchCallbacks.findIndex((record) => {
          return record.callback === callback && (0, utils_1.setEquals)(record.instruments, instruments);
        });
      }
    };
    exports.ObservableRegistry = ObservableRegistry;
  }
});

// node_modules/@opentelemetry/sdk-metrics/build/src/state/SyncMetricStorage.js
var require_SyncMetricStorage = __commonJS({
  "node_modules/@opentelemetry/sdk-metrics/build/src/state/SyncMetricStorage.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.SyncMetricStorage = void 0;
    var MetricStorage_1 = require_MetricStorage();
    var DeltaMetricProcessor_1 = require_DeltaMetricProcessor();
    var TemporalMetricProcessor_1 = require_TemporalMetricProcessor();
    var SyncMetricStorage = class extends MetricStorage_1.MetricStorage {
      constructor(instrumentDescriptor, aggregator, _attributesProcessor) {
        super(instrumentDescriptor);
        this._attributesProcessor = _attributesProcessor;
        this._deltaMetricStorage = new DeltaMetricProcessor_1.DeltaMetricProcessor(aggregator);
        this._temporalMetricStorage = new TemporalMetricProcessor_1.TemporalMetricProcessor(aggregator);
      }
      record(value, attributes, context, recordTime) {
        attributes = this._attributesProcessor.process(attributes, context);
        this._deltaMetricStorage.record(value, attributes, context, recordTime);
      }
      /**
       * Collects the metrics from this storage.
       *
       * Note: This is a stateful operation and may reset any interval-related
       * state for the MetricCollector.
       */
      collect(collector, collectors, collectionTime) {
        const accumulations = this._deltaMetricStorage.collect();
        return this._temporalMetricStorage.buildMetrics(collector, collectors, this._instrumentDescriptor, accumulations, collectionTime);
      }
    };
    exports.SyncMetricStorage = SyncMetricStorage;
  }
});

// node_modules/@opentelemetry/sdk-metrics/build/src/view/AttributesProcessor.js
var require_AttributesProcessor = __commonJS({
  "node_modules/@opentelemetry/sdk-metrics/build/src/view/AttributesProcessor.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.FilteringAttributesProcessor = exports.NoopAttributesProcessor = exports.AttributesProcessor = void 0;
    var AttributesProcessor = class {
      static Noop() {
        return NOOP;
      }
    };
    exports.AttributesProcessor = AttributesProcessor;
    var NoopAttributesProcessor = class extends AttributesProcessor {
      process(incoming, _context) {
        return incoming;
      }
    };
    exports.NoopAttributesProcessor = NoopAttributesProcessor;
    var FilteringAttributesProcessor = class extends AttributesProcessor {
      constructor(_allowedAttributeNames) {
        super();
        this._allowedAttributeNames = _allowedAttributeNames;
      }
      process(incoming, _context) {
        const filteredAttributes = {};
        Object.keys(incoming).filter((attributeName) => this._allowedAttributeNames.includes(attributeName)).forEach((attributeName) => filteredAttributes[attributeName] = incoming[attributeName]);
        return filteredAttributes;
      }
    };
    exports.FilteringAttributesProcessor = FilteringAttributesProcessor;
    var NOOP = new NoopAttributesProcessor();
  }
});

// node_modules/@opentelemetry/sdk-metrics/build/src/state/MeterSharedState.js
var require_MeterSharedState = __commonJS({
  "node_modules/@opentelemetry/sdk-metrics/build/src/state/MeterSharedState.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.MeterSharedState = void 0;
    var InstrumentDescriptor_1 = require_InstrumentDescriptor();
    var Meter_1 = require_Meter();
    var utils_1 = require_utils6();
    var AsyncMetricStorage_1 = require_AsyncMetricStorage();
    var MetricStorageRegistry_1 = require_MetricStorageRegistry();
    var MultiWritableMetricStorage_1 = require_MultiWritableMetricStorage();
    var ObservableRegistry_1 = require_ObservableRegistry();
    var SyncMetricStorage_1 = require_SyncMetricStorage();
    var AttributesProcessor_1 = require_AttributesProcessor();
    var MeterSharedState = class {
      constructor(_meterProviderSharedState, _instrumentationScope) {
        this._meterProviderSharedState = _meterProviderSharedState;
        this._instrumentationScope = _instrumentationScope;
        this.metricStorageRegistry = new MetricStorageRegistry_1.MetricStorageRegistry();
        this.observableRegistry = new ObservableRegistry_1.ObservableRegistry();
        this.meter = new Meter_1.Meter(this);
      }
      registerMetricStorage(descriptor) {
        const storages = this._registerMetricStorage(descriptor, SyncMetricStorage_1.SyncMetricStorage);
        if (storages.length === 1) {
          return storages[0];
        }
        return new MultiWritableMetricStorage_1.MultiMetricStorage(storages);
      }
      registerAsyncMetricStorage(descriptor) {
        const storages = this._registerMetricStorage(descriptor, AsyncMetricStorage_1.AsyncMetricStorage);
        return storages;
      }
      /**
       * @param collector opaque handle of {@link MetricCollector} which initiated the collection.
       * @param collectionTime the HrTime at which the collection was initiated.
       * @param options options for collection.
       * @returns the list of metric data collected.
       */
      async collect(collector, collectionTime, options) {
        const errors = await this.observableRegistry.observe(collectionTime, options === null || options === void 0 ? void 0 : options.timeoutMillis);
        const metricDataList = Array.from(this.metricStorageRegistry.getStorages(collector)).map((metricStorage) => {
          return metricStorage.collect(collector, this._meterProviderSharedState.metricCollectors, collectionTime);
        }).filter(utils_1.isNotNullish);
        return {
          scopeMetrics: {
            scope: this._instrumentationScope,
            metrics: metricDataList.filter(utils_1.isNotNullish)
          },
          errors
        };
      }
      _registerMetricStorage(descriptor, MetricStorageType) {
        const views = this._meterProviderSharedState.viewRegistry.findViews(descriptor, this._instrumentationScope);
        let storages = views.map((view) => {
          const viewDescriptor = (0, InstrumentDescriptor_1.createInstrumentDescriptorWithView)(view, descriptor);
          const compatibleStorage = this.metricStorageRegistry.findOrUpdateCompatibleStorage(viewDescriptor);
          if (compatibleStorage != null) {
            return compatibleStorage;
          }
          const aggregator = view.aggregation.createAggregator(viewDescriptor);
          const viewStorage = new MetricStorageType(viewDescriptor, aggregator, view.attributesProcessor);
          this.metricStorageRegistry.register(viewStorage);
          return viewStorage;
        });
        if (storages.length === 0) {
          const perCollectorAggregations = this._meterProviderSharedState.selectAggregations(descriptor.type);
          const collectorStorages = perCollectorAggregations.map(([collector, aggregation]) => {
            const compatibleStorage = this.metricStorageRegistry.findOrUpdateCompatibleCollectorStorage(collector, descriptor);
            if (compatibleStorage != null) {
              return compatibleStorage;
            }
            const aggregator = aggregation.createAggregator(descriptor);
            const storage = new MetricStorageType(descriptor, aggregator, AttributesProcessor_1.AttributesProcessor.Noop());
            this.metricStorageRegistry.registerForCollector(collector, storage);
            return storage;
          });
          storages = storages.concat(collectorStorages);
        }
        return storages;
      }
    };
    exports.MeterSharedState = MeterSharedState;
  }
});

// node_modules/@opentelemetry/sdk-metrics/build/src/state/MeterProviderSharedState.js
var require_MeterProviderSharedState = __commonJS({
  "node_modules/@opentelemetry/sdk-metrics/build/src/state/MeterProviderSharedState.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.MeterProviderSharedState = void 0;
    var utils_1 = require_utils6();
    var ViewRegistry_1 = require_ViewRegistry();
    var MeterSharedState_1 = require_MeterSharedState();
    var MeterProviderSharedState = class {
      constructor(resource) {
        this.resource = resource;
        this.viewRegistry = new ViewRegistry_1.ViewRegistry();
        this.metricCollectors = [];
        this.meterSharedStates = /* @__PURE__ */ new Map();
      }
      getMeterSharedState(instrumentationScope) {
        const id = (0, utils_1.instrumentationScopeId)(instrumentationScope);
        let meterSharedState = this.meterSharedStates.get(id);
        if (meterSharedState == null) {
          meterSharedState = new MeterSharedState_1.MeterSharedState(this, instrumentationScope);
          this.meterSharedStates.set(id, meterSharedState);
        }
        return meterSharedState;
      }
      selectAggregations(instrumentType) {
        const result = [];
        for (const collector of this.metricCollectors) {
          result.push([collector, collector.selectAggregation(instrumentType)]);
        }
        return result;
      }
    };
    exports.MeterProviderSharedState = MeterProviderSharedState;
  }
});

// node_modules/@opentelemetry/sdk-metrics/build/src/state/MetricCollector.js
var require_MetricCollector = __commonJS({
  "node_modules/@opentelemetry/sdk-metrics/build/src/state/MetricCollector.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.MetricCollector = void 0;
    var core_1 = require_src3();
    var utils_1 = require_utils6();
    var MetricCollector = class {
      constructor(_sharedState, _metricReader) {
        this._sharedState = _sharedState;
        this._metricReader = _metricReader;
      }
      async collect(options) {
        const collectionTime = (0, core_1.hrTime)();
        const meterCollectionPromises = Array.from(this._sharedState.meterSharedStates.values()).map((meterSharedState) => meterSharedState.collect(this, collectionTime, options));
        const result = await Promise.all(meterCollectionPromises);
        return {
          resourceMetrics: {
            resource: this._sharedState.resource,
            scopeMetrics: result.map((it) => it.scopeMetrics)
          },
          errors: (0, utils_1.FlatMap)(result, (it) => it.errors)
        };
      }
      /**
       * Delegates for MetricReader.forceFlush.
       */
      async forceFlush(options) {
        await this._metricReader.forceFlush(options);
      }
      /**
       * Delegates for MetricReader.shutdown.
       */
      async shutdown(options) {
        await this._metricReader.shutdown(options);
      }
      selectAggregationTemporality(instrumentType) {
        return this._metricReader.selectAggregationTemporality(instrumentType);
      }
      selectAggregation(instrumentType) {
        return this._metricReader.selectAggregation(instrumentType);
      }
    };
    exports.MetricCollector = MetricCollector;
  }
});

// node_modules/@opentelemetry/sdk-metrics/build/src/MeterProvider.js
var require_MeterProvider = __commonJS({
  "node_modules/@opentelemetry/sdk-metrics/build/src/MeterProvider.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.MeterProvider = void 0;
    var api_1 = require_src();
    var resources_1 = require_src8();
    var MeterProviderSharedState_1 = require_MeterProviderSharedState();
    var MetricCollector_1 = require_MetricCollector();
    var MeterProvider = class {
      constructor(options) {
        var _a;
        this._shutdown = false;
        this._sharedState = new MeterProviderSharedState_1.MeterProviderSharedState((_a = options === null || options === void 0 ? void 0 : options.resource) !== null && _a !== void 0 ? _a : resources_1.Resource.empty());
        if ((options === null || options === void 0 ? void 0 : options.views) != null && options.views.length > 0) {
          for (const view of options.views) {
            this._sharedState.viewRegistry.addView(view);
          }
        }
      }
      /**
       * Get a meter with the configuration of the MeterProvider.
       */
      getMeter(name, version = "", options = {}) {
        if (this._shutdown) {
          api_1.diag.warn("A shutdown MeterProvider cannot provide a Meter");
          return (0, api_1.createNoopMeter)();
        }
        return this._sharedState.getMeterSharedState({ name, version, schemaUrl: options.schemaUrl }).meter;
      }
      /**
       * Register a {@link MetricReader} to the meter provider. After the
       * registration, the MetricReader can start metrics collection.
       *
       * @param metricReader the metric reader to be registered.
       */
      addMetricReader(metricReader) {
        const collector = new MetricCollector_1.MetricCollector(this._sharedState, metricReader);
        metricReader.setMetricProducer(collector);
        this._sharedState.metricCollectors.push(collector);
      }
      /**
       * Flush all buffered data and shut down the MeterProvider and all registered
       * MetricReaders.
       *
       * Returns a promise which is resolved when all flushes are complete.
       */
      async shutdown(options) {
        if (this._shutdown) {
          api_1.diag.warn("shutdown may only be called once per MeterProvider");
          return;
        }
        this._shutdown = true;
        await Promise.all(this._sharedState.metricCollectors.map((collector) => {
          return collector.shutdown(options);
        }));
      }
      /**
       * Notifies all registered MetricReaders to flush any buffered data.
       *
       * Returns a promise which is resolved when all flushes are complete.
       */
      async forceFlush(options) {
        if (this._shutdown) {
          api_1.diag.warn("invalid attempt to force flush after MeterProvider shutdown");
          return;
        }
        await Promise.all(this._sharedState.metricCollectors.map((collector) => {
          return collector.forceFlush(options);
        }));
      }
    };
    exports.MeterProvider = MeterProvider;
  }
});

// node_modules/@opentelemetry/sdk-metrics/build/src/view/Predicate.js
var require_Predicate = __commonJS({
  "node_modules/@opentelemetry/sdk-metrics/build/src/view/Predicate.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ExactPredicate = exports.PatternPredicate = void 0;
    var ESCAPE = /[\^$\\.+?()[\]{}|]/g;
    var PatternPredicate = class {
      constructor(pattern) {
        if (pattern === "*") {
          this._matchAll = true;
          this._regexp = /.*/;
        } else {
          this._matchAll = false;
          this._regexp = new RegExp(PatternPredicate.escapePattern(pattern));
        }
      }
      match(str) {
        if (this._matchAll) {
          return true;
        }
        return this._regexp.test(str);
      }
      static escapePattern(pattern) {
        return `^${pattern.replace(ESCAPE, "\\$&").replace("*", ".*")}$`;
      }
      static hasWildcard(pattern) {
        return pattern.includes("*");
      }
    };
    exports.PatternPredicate = PatternPredicate;
    var ExactPredicate = class {
      constructor(pattern) {
        this._matchAll = pattern === void 0;
        this._pattern = pattern;
      }
      match(str) {
        if (this._matchAll) {
          return true;
        }
        if (str === this._pattern) {
          return true;
        }
        return false;
      }
    };
    exports.ExactPredicate = ExactPredicate;
  }
});

// node_modules/@opentelemetry/sdk-metrics/build/src/view/InstrumentSelector.js
var require_InstrumentSelector = __commonJS({
  "node_modules/@opentelemetry/sdk-metrics/build/src/view/InstrumentSelector.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.InstrumentSelector = void 0;
    var Predicate_1 = require_Predicate();
    var InstrumentSelector = class {
      constructor(criteria) {
        var _a;
        this._nameFilter = new Predicate_1.PatternPredicate((_a = criteria === null || criteria === void 0 ? void 0 : criteria.name) !== null && _a !== void 0 ? _a : "*");
        this._type = criteria === null || criteria === void 0 ? void 0 : criteria.type;
      }
      getType() {
        return this._type;
      }
      getNameFilter() {
        return this._nameFilter;
      }
    };
    exports.InstrumentSelector = InstrumentSelector;
  }
});

// node_modules/@opentelemetry/sdk-metrics/build/src/view/MeterSelector.js
var require_MeterSelector = __commonJS({
  "node_modules/@opentelemetry/sdk-metrics/build/src/view/MeterSelector.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.MeterSelector = void 0;
    var Predicate_1 = require_Predicate();
    var MeterSelector = class {
      constructor(criteria) {
        this._nameFilter = new Predicate_1.ExactPredicate(criteria === null || criteria === void 0 ? void 0 : criteria.name);
        this._versionFilter = new Predicate_1.ExactPredicate(criteria === null || criteria === void 0 ? void 0 : criteria.version);
        this._schemaUrlFilter = new Predicate_1.ExactPredicate(criteria === null || criteria === void 0 ? void 0 : criteria.schemaUrl);
      }
      getNameFilter() {
        return this._nameFilter;
      }
      /**
       * TODO: semver filter? no spec yet.
       */
      getVersionFilter() {
        return this._versionFilter;
      }
      getSchemaUrlFilter() {
        return this._schemaUrlFilter;
      }
    };
    exports.MeterSelector = MeterSelector;
  }
});

// node_modules/@opentelemetry/sdk-metrics/build/src/view/View.js
var require_View = __commonJS({
  "node_modules/@opentelemetry/sdk-metrics/build/src/view/View.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.View = void 0;
    var Predicate_1 = require_Predicate();
    var AttributesProcessor_1 = require_AttributesProcessor();
    var InstrumentSelector_1 = require_InstrumentSelector();
    var MeterSelector_1 = require_MeterSelector();
    var Aggregation_1 = require_Aggregation();
    function isSelectorNotProvided(options) {
      return options.instrumentName == null && options.instrumentType == null && options.meterName == null && options.meterVersion == null && options.meterSchemaUrl == null;
    }
    var View = class {
      /**
       * Create a new {@link View} instance.
       *
       * Parameters can be categorized as two types:
       *  Instrument selection criteria: Used to describe the instrument(s) this view will be applied to.
       *  Will be treated as additive (the Instrument has to meet all the provided criteria to be selected).
       *
       *  Metric stream altering: Alter the metric stream of instruments selected by instrument selection criteria.
       *
       * @param viewOptions {@link ViewOptions} for altering the metric stream and instrument selection.
       * @param viewOptions.name
       * Alters the metric stream:
       *  This will be used as the name of the metrics stream.
       *  If not provided, the original Instrument name will be used.
       * @param viewOptions.description
       * Alters the metric stream:
       *  This will be used as the description of the metrics stream.
       *  If not provided, the original Instrument description will be used by default.
       * @param viewOptions.attributeKeys
       * Alters the metric stream:
       *  If provided, the attributes that are not in the list will be ignored.
       *  If not provided, all attribute keys will be used by default.
       * @param viewOptions.aggregation
       * Alters the metric stream:
       *  Alters the {@link Aggregation} of the metric stream.
       * @param viewOptions.instrumentName
       * Instrument selection criteria:
       *  Original name of the Instrument(s) with wildcard support.
       * @param viewOptions.instrumentType
       * Instrument selection criteria:
       *  The original type of the Instrument(s).
       * @param viewOptions.meterName
       * Instrument selection criteria:
       *  The name of the Meter. No wildcard support, name must match the meter exactly.
       * @param viewOptions.meterVersion
       * Instrument selection criteria:
       *  The version of the Meter. No wildcard support, version must match exactly.
       * @param viewOptions.meterSchemaUrl
       * Instrument selection criteria:
       *  The schema URL of the Meter. No wildcard support, schema URL must match exactly.
       *
       * @example
       * // Create a view that changes the Instrument 'my.instrument' to use to an
       * // ExplicitBucketHistogramAggregation with the boundaries [20, 30, 40]
       * new View({
       *   aggregation: new ExplicitBucketHistogramAggregation([20, 30, 40]),
       *   instrumentName: 'my.instrument'
       * })
       */
      constructor(viewOptions) {
        var _a;
        if (isSelectorNotProvided(viewOptions)) {
          throw new Error("Cannot create view with no selector arguments supplied");
        }
        if (viewOptions.name != null && ((viewOptions === null || viewOptions === void 0 ? void 0 : viewOptions.instrumentName) == null || Predicate_1.PatternPredicate.hasWildcard(viewOptions.instrumentName))) {
          throw new Error("Views with a specified name must be declared with an instrument selector that selects at most one instrument per meter.");
        }
        if (viewOptions.attributeKeys != null) {
          this.attributesProcessor = new AttributesProcessor_1.FilteringAttributesProcessor(viewOptions.attributeKeys);
        } else {
          this.attributesProcessor = AttributesProcessor_1.AttributesProcessor.Noop();
        }
        this.name = viewOptions.name;
        this.description = viewOptions.description;
        this.aggregation = (_a = viewOptions.aggregation) !== null && _a !== void 0 ? _a : Aggregation_1.Aggregation.Default();
        this.instrumentSelector = new InstrumentSelector_1.InstrumentSelector({
          name: viewOptions.instrumentName,
          type: viewOptions.instrumentType
        });
        this.meterSelector = new MeterSelector_1.MeterSelector({
          name: viewOptions.meterName,
          version: viewOptions.meterVersion,
          schemaUrl: viewOptions.meterSchemaUrl
        });
      }
    };
    exports.View = View;
  }
});

// node_modules/@opentelemetry/sdk-metrics/build/src/index.js
var require_src11 = __commonJS({
  "node_modules/@opentelemetry/sdk-metrics/build/src/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.TimeoutError = exports.View = exports.Aggregation = exports.SumAggregation = exports.LastValueAggregation = exports.HistogramAggregation = exports.DropAggregation = exports.ExplicitBucketHistogramAggregation = exports.DefaultAggregation = exports.MeterProvider = exports.InstrumentType = exports.ConsoleMetricExporter = exports.InMemoryMetricExporter = exports.PeriodicExportingMetricReader = exports.MetricReader = exports.DataPointType = exports.AggregationTemporality = void 0;
    var AggregationTemporality_1 = require_AggregationTemporality();
    Object.defineProperty(exports, "AggregationTemporality", { enumerable: true, get: function() {
      return AggregationTemporality_1.AggregationTemporality;
    } });
    var MetricData_1 = require_MetricData();
    Object.defineProperty(exports, "DataPointType", { enumerable: true, get: function() {
      return MetricData_1.DataPointType;
    } });
    var MetricReader_1 = require_MetricReader();
    Object.defineProperty(exports, "MetricReader", { enumerable: true, get: function() {
      return MetricReader_1.MetricReader;
    } });
    var PeriodicExportingMetricReader_1 = require_PeriodicExportingMetricReader();
    Object.defineProperty(exports, "PeriodicExportingMetricReader", { enumerable: true, get: function() {
      return PeriodicExportingMetricReader_1.PeriodicExportingMetricReader;
    } });
    var InMemoryMetricExporter_1 = require_InMemoryMetricExporter();
    Object.defineProperty(exports, "InMemoryMetricExporter", { enumerable: true, get: function() {
      return InMemoryMetricExporter_1.InMemoryMetricExporter;
    } });
    var ConsoleMetricExporter_1 = require_ConsoleMetricExporter();
    Object.defineProperty(exports, "ConsoleMetricExporter", { enumerable: true, get: function() {
      return ConsoleMetricExporter_1.ConsoleMetricExporter;
    } });
    var InstrumentDescriptor_1 = require_InstrumentDescriptor();
    Object.defineProperty(exports, "InstrumentType", { enumerable: true, get: function() {
      return InstrumentDescriptor_1.InstrumentType;
    } });
    var MeterProvider_1 = require_MeterProvider();
    Object.defineProperty(exports, "MeterProvider", { enumerable: true, get: function() {
      return MeterProvider_1.MeterProvider;
    } });
    var Aggregation_1 = require_Aggregation();
    Object.defineProperty(exports, "DefaultAggregation", { enumerable: true, get: function() {
      return Aggregation_1.DefaultAggregation;
    } });
    Object.defineProperty(exports, "ExplicitBucketHistogramAggregation", { enumerable: true, get: function() {
      return Aggregation_1.ExplicitBucketHistogramAggregation;
    } });
    Object.defineProperty(exports, "DropAggregation", { enumerable: true, get: function() {
      return Aggregation_1.DropAggregation;
    } });
    Object.defineProperty(exports, "HistogramAggregation", { enumerable: true, get: function() {
      return Aggregation_1.HistogramAggregation;
    } });
    Object.defineProperty(exports, "LastValueAggregation", { enumerable: true, get: function() {
      return Aggregation_1.LastValueAggregation;
    } });
    Object.defineProperty(exports, "SumAggregation", { enumerable: true, get: function() {
      return Aggregation_1.SumAggregation;
    } });
    Object.defineProperty(exports, "Aggregation", { enumerable: true, get: function() {
      return Aggregation_1.Aggregation;
    } });
    var View_1 = require_View();
    Object.defineProperty(exports, "View", { enumerable: true, get: function() {
      return View_1.View;
    } });
    var utils_1 = require_utils6();
    Object.defineProperty(exports, "TimeoutError", { enumerable: true, get: function() {
      return utils_1.TimeoutError;
    } });
  }
});

// node_modules/@opentelemetry/otlp-transformer/build/src/metrics/internal.js
var require_internal3 = __commonJS({
  "node_modules/@opentelemetry/otlp-transformer/build/src/metrics/internal.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.toMetric = exports.toScopeMetrics = exports.toResourceMetrics = void 0;
    var api_1 = require_src();
    var core_1 = require_src3();
    var sdk_metrics_1 = require_src11();
    var internal_1 = require_internal();
    function toResourceMetrics(resourceMetrics) {
      return {
        resource: {
          attributes: (0, internal_1.toAttributes)(resourceMetrics.resource.attributes),
          droppedAttributesCount: 0
        },
        schemaUrl: void 0,
        scopeMetrics: toScopeMetrics(resourceMetrics.scopeMetrics)
      };
    }
    exports.toResourceMetrics = toResourceMetrics;
    function toScopeMetrics(scopeMetrics) {
      return Array.from(scopeMetrics.map((metrics) => {
        const scopeMetrics2 = {
          scope: {
            name: metrics.scope.name,
            version: metrics.scope.version
          },
          metrics: metrics.metrics.map((metricData) => toMetric(metricData)),
          schemaUrl: metrics.scope.schemaUrl
        };
        return scopeMetrics2;
      }));
    }
    exports.toScopeMetrics = toScopeMetrics;
    function toMetric(metricData) {
      const out = {
        name: metricData.descriptor.name,
        description: metricData.descriptor.description,
        unit: metricData.descriptor.unit
      };
      const aggregationTemporality = toAggregationTemporality(metricData.aggregationTemporality);
      if (metricData.dataPointType === sdk_metrics_1.DataPointType.SUM) {
        out.sum = {
          aggregationTemporality,
          isMonotonic: metricData.isMonotonic,
          dataPoints: toSingularDataPoints(metricData)
        };
      } else if (metricData.dataPointType === sdk_metrics_1.DataPointType.GAUGE) {
        out.gauge = {
          dataPoints: toSingularDataPoints(metricData)
        };
      } else if (metricData.dataPointType === sdk_metrics_1.DataPointType.HISTOGRAM) {
        out.histogram = {
          aggregationTemporality,
          dataPoints: toHistogramDataPoints(metricData)
        };
      }
      return out;
    }
    exports.toMetric = toMetric;
    function toSingularDataPoint(dataPoint, valueType) {
      const out = {
        attributes: (0, internal_1.toAttributes)(dataPoint.attributes),
        startTimeUnixNano: (0, core_1.hrTimeToNanoseconds)(dataPoint.startTime),
        timeUnixNano: (0, core_1.hrTimeToNanoseconds)(dataPoint.endTime)
      };
      if (valueType === api_1.ValueType.INT) {
        out.asInt = dataPoint.value;
      } else if (valueType === api_1.ValueType.DOUBLE) {
        out.asDouble = dataPoint.value;
      }
      return out;
    }
    function toSingularDataPoints(metricData) {
      return metricData.dataPoints.map((dataPoint) => {
        return toSingularDataPoint(dataPoint, metricData.descriptor.valueType);
      });
    }
    function toHistogramDataPoints(metricData) {
      return metricData.dataPoints.map((dataPoint) => {
        const histogram = dataPoint.value;
        return {
          attributes: (0, internal_1.toAttributes)(dataPoint.attributes),
          bucketCounts: histogram.buckets.counts,
          explicitBounds: histogram.buckets.boundaries,
          count: histogram.count,
          sum: histogram.sum,
          min: histogram.min,
          max: histogram.max,
          startTimeUnixNano: (0, core_1.hrTimeToNanoseconds)(dataPoint.startTime),
          timeUnixNano: (0, core_1.hrTimeToNanoseconds)(dataPoint.endTime)
        };
      });
    }
    function toAggregationTemporality(temporality) {
      if (temporality === sdk_metrics_1.AggregationTemporality.DELTA) {
        return 1;
      }
      if (temporality === sdk_metrics_1.AggregationTemporality.CUMULATIVE) {
        return 2;
      }
      return 0;
    }
  }
});

// node_modules/@opentelemetry/otlp-transformer/build/src/metrics/index.js
var require_metrics2 = __commonJS({
  "node_modules/@opentelemetry/otlp-transformer/build/src/metrics/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.createExportMetricsServiceRequest = void 0;
    var internal_1 = require_internal3();
    function createExportMetricsServiceRequest(resourceMetrics) {
      return {
        resourceMetrics: resourceMetrics.map((metrics) => (0, internal_1.toResourceMetrics)(metrics))
      };
    }
    exports.createExportMetricsServiceRequest = createExportMetricsServiceRequest;
  }
});

// node_modules/@opentelemetry/otlp-transformer/build/src/index.js
var require_src12 = __commonJS({
  "node_modules/@opentelemetry/otlp-transformer/build/src/index.js"(exports) {
    "use strict";
    var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      Object.defineProperty(o, k2, { enumerable: true, get: function() {
        return m[k];
      } });
    } : function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      o[k2] = m[k];
    });
    var __exportStar = exports && exports.__exportStar || function(m, exports2) {
      for (var p in m)
        if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports2, p))
          __createBinding(exports2, m, p);
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.createExportMetricsServiceRequest = exports.createExportTraceServiceRequest = void 0;
    __exportStar(require_types10(), exports);
    __exportStar(require_types11(), exports);
    __exportStar(require_types12(), exports);
    __exportStar(require_types13(), exports);
    var trace_1 = require_trace3();
    Object.defineProperty(exports, "createExportTraceServiceRequest", { enumerable: true, get: function() {
      return trace_1.createExportTraceServiceRequest;
    } });
    var metrics_1 = require_metrics2();
    Object.defineProperty(exports, "createExportMetricsServiceRequest", { enumerable: true, get: function() {
      return metrics_1.createExportMetricsServiceRequest;
    } });
  }
});

// node_modules/@opentelemetry/exporter-trace-otlp-http/build/src/platform/node/OTLPTraceExporter.js
var require_OTLPTraceExporter = __commonJS({
  "node_modules/@opentelemetry/exporter-trace-otlp-http/build/src/platform/node/OTLPTraceExporter.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.OTLPTraceExporter = void 0;
    var core_1 = require_src3();
    var otlp_exporter_base_1 = require_src10();
    var otlp_exporter_base_2 = require_src10();
    var otlp_transformer_1 = require_src12();
    var DEFAULT_COLLECTOR_RESOURCE_PATH = "v1/traces";
    var DEFAULT_COLLECTOR_URL = `http://localhost:4318/${DEFAULT_COLLECTOR_RESOURCE_PATH}`;
    var OTLPTraceExporter2 = class extends otlp_exporter_base_1.OTLPExporterNodeBase {
      constructor(config = {}) {
        super(config);
        this.headers = Object.assign(this.headers, core_1.baggageUtils.parseKeyPairsIntoRecord((0, core_1.getEnv)().OTEL_EXPORTER_OTLP_TRACES_HEADERS));
      }
      convert(spans) {
        return (0, otlp_transformer_1.createExportTraceServiceRequest)(spans, true);
      }
      getDefaultUrl(config) {
        return typeof config.url === "string" ? config.url : (0, core_1.getEnv)().OTEL_EXPORTER_OTLP_TRACES_ENDPOINT.length > 0 ? (0, otlp_exporter_base_2.appendRootPathToUrlIfNeeded)((0, core_1.getEnv)().OTEL_EXPORTER_OTLP_TRACES_ENDPOINT) : (0, core_1.getEnv)().OTEL_EXPORTER_OTLP_ENDPOINT.length > 0 ? (0, otlp_exporter_base_2.appendResourcePathToUrl)((0, core_1.getEnv)().OTEL_EXPORTER_OTLP_ENDPOINT, DEFAULT_COLLECTOR_RESOURCE_PATH) : DEFAULT_COLLECTOR_URL;
      }
    };
    exports.OTLPTraceExporter = OTLPTraceExporter2;
  }
});

// node_modules/@opentelemetry/exporter-trace-otlp-http/build/src/platform/node/index.js
var require_node8 = __commonJS({
  "node_modules/@opentelemetry/exporter-trace-otlp-http/build/src/platform/node/index.js"(exports) {
    "use strict";
    var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      Object.defineProperty(o, k2, { enumerable: true, get: function() {
        return m[k];
      } });
    } : function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      o[k2] = m[k];
    });
    var __exportStar = exports && exports.__exportStar || function(m, exports2) {
      for (var p in m)
        if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports2, p))
          __createBinding(exports2, m, p);
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    __exportStar(require_OTLPTraceExporter(), exports);
  }
});

// node_modules/@opentelemetry/exporter-trace-otlp-http/build/src/platform/index.js
var require_platform7 = __commonJS({
  "node_modules/@opentelemetry/exporter-trace-otlp-http/build/src/platform/index.js"(exports) {
    "use strict";
    var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      Object.defineProperty(o, k2, { enumerable: true, get: function() {
        return m[k];
      } });
    } : function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      o[k2] = m[k];
    });
    var __exportStar = exports && exports.__exportStar || function(m, exports2) {
      for (var p in m)
        if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports2, p))
          __createBinding(exports2, m, p);
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    __exportStar(require_node8(), exports);
  }
});

// node_modules/@opentelemetry/exporter-trace-otlp-http/build/src/index.js
var require_src13 = __commonJS({
  "node_modules/@opentelemetry/exporter-trace-otlp-http/build/src/index.js"(exports) {
    "use strict";
    var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      Object.defineProperty(o, k2, { enumerable: true, get: function() {
        return m[k];
      } });
    } : function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      o[k2] = m[k];
    });
    var __exportStar = exports && exports.__exportStar || function(m, exports2) {
      for (var p in m)
        if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports2, p))
          __createBinding(exports2, m, p);
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    __exportStar(require_platform7(), exports);
  }
});

// node_modules/@opentelemetry/context-async-hooks/build/src/AbstractAsyncHooksContextManager.js
var require_AbstractAsyncHooksContextManager = __commonJS({
  "node_modules/@opentelemetry/context-async-hooks/build/src/AbstractAsyncHooksContextManager.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.AbstractAsyncHooksContextManager = void 0;
    var events_1 = require("events");
    var ADD_LISTENER_METHODS = [
      "addListener",
      "on",
      "once",
      "prependListener",
      "prependOnceListener"
    ];
    var AbstractAsyncHooksContextManager = class {
      constructor() {
        this._kOtListeners = Symbol("OtListeners");
        this._wrapped = false;
      }
      /**
       * Binds a the certain context or the active one to the target function and then returns the target
       * @param context A context (span) to be bind to target
       * @param target a function or event emitter. When target or one of its callbacks is called,
       *  the provided context will be used as the active context for the duration of the call.
       */
      bind(context, target) {
        if (target instanceof events_1.EventEmitter) {
          return this._bindEventEmitter(context, target);
        }
        if (typeof target === "function") {
          return this._bindFunction(context, target);
        }
        return target;
      }
      _bindFunction(context, target) {
        const manager = this;
        const contextWrapper = function(...args) {
          return manager.with(context, () => target.apply(this, args));
        };
        Object.defineProperty(contextWrapper, "length", {
          enumerable: false,
          configurable: true,
          writable: false,
          value: target.length
        });
        return contextWrapper;
      }
      /**
       * By default, EventEmitter call their callback with their context, which we do
       * not want, instead we will bind a specific context to all callbacks that
       * go through it.
       * @param context the context we want to bind
       * @param ee EventEmitter an instance of EventEmitter to patch
       */
      _bindEventEmitter(context, ee) {
        const map = this._getPatchMap(ee);
        if (map !== void 0)
          return ee;
        this._createPatchMap(ee);
        ADD_LISTENER_METHODS.forEach((methodName) => {
          if (ee[methodName] === void 0)
            return;
          ee[methodName] = this._patchAddListener(ee, ee[methodName], context);
        });
        if (typeof ee.removeListener === "function") {
          ee.removeListener = this._patchRemoveListener(ee, ee.removeListener);
        }
        if (typeof ee.off === "function") {
          ee.off = this._patchRemoveListener(ee, ee.off);
        }
        if (typeof ee.removeAllListeners === "function") {
          ee.removeAllListeners = this._patchRemoveAllListeners(ee, ee.removeAllListeners);
        }
        return ee;
      }
      /**
       * Patch methods that remove a given listener so that we match the "patched"
       * version of that listener (the one that propagate context).
       * @param ee EventEmitter instance
       * @param original reference to the patched method
       */
      _patchRemoveListener(ee, original) {
        const contextManager = this;
        return function(event, listener) {
          var _a;
          const events = (_a = contextManager._getPatchMap(ee)) === null || _a === void 0 ? void 0 : _a[event];
          if (events === void 0) {
            return original.call(this, event, listener);
          }
          const patchedListener = events.get(listener);
          return original.call(this, event, patchedListener || listener);
        };
      }
      /**
       * Patch methods that remove all listeners so we remove our
       * internal references for a given event.
       * @param ee EventEmitter instance
       * @param original reference to the patched method
       */
      _patchRemoveAllListeners(ee, original) {
        const contextManager = this;
        return function(event) {
          const map = contextManager._getPatchMap(ee);
          if (map !== void 0) {
            if (arguments.length === 0) {
              contextManager._createPatchMap(ee);
            } else if (map[event] !== void 0) {
              delete map[event];
            }
          }
          return original.apply(this, arguments);
        };
      }
      /**
       * Patch methods on an event emitter instance that can add listeners so we
       * can force them to propagate a given context.
       * @param ee EventEmitter instance
       * @param original reference to the patched method
       * @param [context] context to propagate when calling listeners
       */
      _patchAddListener(ee, original, context) {
        const contextManager = this;
        return function(event, listener) {
          if (contextManager._wrapped) {
            return original.call(this, event, listener);
          }
          let map = contextManager._getPatchMap(ee);
          if (map === void 0) {
            map = contextManager._createPatchMap(ee);
          }
          let listeners = map[event];
          if (listeners === void 0) {
            listeners = /* @__PURE__ */ new WeakMap();
            map[event] = listeners;
          }
          const patchedListener = contextManager.bind(context, listener);
          listeners.set(listener, patchedListener);
          contextManager._wrapped = true;
          try {
            return original.call(this, event, patchedListener);
          } finally {
            contextManager._wrapped = false;
          }
        };
      }
      _createPatchMap(ee) {
        const map = /* @__PURE__ */ Object.create(null);
        ee[this._kOtListeners] = map;
        return map;
      }
      _getPatchMap(ee) {
        return ee[this._kOtListeners];
      }
    };
    exports.AbstractAsyncHooksContextManager = AbstractAsyncHooksContextManager;
  }
});

// node_modules/@opentelemetry/context-async-hooks/build/src/AsyncHooksContextManager.js
var require_AsyncHooksContextManager = __commonJS({
  "node_modules/@opentelemetry/context-async-hooks/build/src/AsyncHooksContextManager.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.AsyncHooksContextManager = void 0;
    var api_1 = require_src();
    var asyncHooks = require("async_hooks");
    var AbstractAsyncHooksContextManager_1 = require_AbstractAsyncHooksContextManager();
    var AsyncHooksContextManager = class extends AbstractAsyncHooksContextManager_1.AbstractAsyncHooksContextManager {
      constructor() {
        super();
        this._contexts = /* @__PURE__ */ new Map();
        this._stack = [];
        this._asyncHook = asyncHooks.createHook({
          init: this._init.bind(this),
          before: this._before.bind(this),
          after: this._after.bind(this),
          destroy: this._destroy.bind(this),
          promiseResolve: this._destroy.bind(this)
        });
      }
      active() {
        var _a;
        return (_a = this._stack[this._stack.length - 1]) !== null && _a !== void 0 ? _a : api_1.ROOT_CONTEXT;
      }
      with(context, fn, thisArg, ...args) {
        this._enterContext(context);
        try {
          return fn.call(thisArg, ...args);
        } finally {
          this._exitContext();
        }
      }
      enable() {
        this._asyncHook.enable();
        return this;
      }
      disable() {
        this._asyncHook.disable();
        this._contexts.clear();
        this._stack = [];
        return this;
      }
      /**
       * Init hook will be called when userland create a async context, setting the
       * context as the current one if it exist.
       * @param uid id of the async context
       * @param type the resource type
       */
      _init(uid, type) {
        if (type === "TIMERWRAP")
          return;
        const context = this._stack[this._stack.length - 1];
        if (context !== void 0) {
          this._contexts.set(uid, context);
        }
      }
      /**
       * Destroy hook will be called when a given context is no longer used so we can
       * remove its attached context.
       * @param uid uid of the async context
       */
      _destroy(uid) {
        this._contexts.delete(uid);
      }
      /**
       * Before hook is called just before executing a async context.
       * @param uid uid of the async context
       */
      _before(uid) {
        const context = this._contexts.get(uid);
        if (context !== void 0) {
          this._enterContext(context);
        }
      }
      /**
       * After hook is called just after completing the execution of a async context.
       */
      _after() {
        this._exitContext();
      }
      /**
       * Set the given context as active
       */
      _enterContext(context) {
        this._stack.push(context);
      }
      /**
       * Remove the context at the root of the stack
       */
      _exitContext() {
        this._stack.pop();
      }
    };
    exports.AsyncHooksContextManager = AsyncHooksContextManager;
  }
});

// node_modules/@opentelemetry/context-async-hooks/build/src/AsyncLocalStorageContextManager.js
var require_AsyncLocalStorageContextManager = __commonJS({
  "node_modules/@opentelemetry/context-async-hooks/build/src/AsyncLocalStorageContextManager.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.AsyncLocalStorageContextManager = void 0;
    var api_1 = require_src();
    var async_hooks_1 = require("async_hooks");
    var AbstractAsyncHooksContextManager_1 = require_AbstractAsyncHooksContextManager();
    var AsyncLocalStorageContextManager = class extends AbstractAsyncHooksContextManager_1.AbstractAsyncHooksContextManager {
      constructor() {
        super();
        this._asyncLocalStorage = new async_hooks_1.AsyncLocalStorage();
      }
      active() {
        var _a;
        return (_a = this._asyncLocalStorage.getStore()) !== null && _a !== void 0 ? _a : api_1.ROOT_CONTEXT;
      }
      with(context, fn, thisArg, ...args) {
        const cb = thisArg == null ? fn : fn.bind(thisArg);
        return this._asyncLocalStorage.run(context, cb, ...args);
      }
      enable() {
        return this;
      }
      disable() {
        this._asyncLocalStorage.disable();
        return this;
      }
    };
    exports.AsyncLocalStorageContextManager = AsyncLocalStorageContextManager;
  }
});

// node_modules/@opentelemetry/context-async-hooks/build/src/index.js
var require_src14 = __commonJS({
  "node_modules/@opentelemetry/context-async-hooks/build/src/index.js"(exports) {
    "use strict";
    var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      Object.defineProperty(o, k2, { enumerable: true, get: function() {
        return m[k];
      } });
    } : function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      o[k2] = m[k];
    });
    var __exportStar = exports && exports.__exportStar || function(m, exports2) {
      for (var p in m)
        if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports2, p))
          __createBinding(exports2, m, p);
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    __exportStar(require_AsyncHooksContextManager(), exports);
    __exportStar(require_AsyncLocalStorageContextManager(), exports);
  }
});

// node_modules/@opentelemetry/propagator-b3/build/src/common.js
var require_common2 = __commonJS({
  "node_modules/@opentelemetry/propagator-b3/build/src/common.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.B3_DEBUG_FLAG_KEY = void 0;
    var api_1 = require_src();
    exports.B3_DEBUG_FLAG_KEY = (0, api_1.createContextKey)("OpenTelemetry Context Key B3 Debug Flag");
  }
});

// node_modules/@opentelemetry/propagator-b3/build/src/constants.js
var require_constants3 = __commonJS({
  "node_modules/@opentelemetry/propagator-b3/build/src/constants.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.X_B3_FLAGS = exports.X_B3_PARENT_SPAN_ID = exports.X_B3_SAMPLED = exports.X_B3_SPAN_ID = exports.X_B3_TRACE_ID = exports.B3_CONTEXT_HEADER = void 0;
    exports.B3_CONTEXT_HEADER = "b3";
    exports.X_B3_TRACE_ID = "x-b3-traceid";
    exports.X_B3_SPAN_ID = "x-b3-spanid";
    exports.X_B3_SAMPLED = "x-b3-sampled";
    exports.X_B3_PARENT_SPAN_ID = "x-b3-parentspanid";
    exports.X_B3_FLAGS = "x-b3-flags";
  }
});

// node_modules/@opentelemetry/propagator-b3/build/src/B3MultiPropagator.js
var require_B3MultiPropagator = __commonJS({
  "node_modules/@opentelemetry/propagator-b3/build/src/B3MultiPropagator.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.B3MultiPropagator = void 0;
    var api_1 = require_src();
    var core_1 = require_src3();
    var common_1 = require_common2();
    var constants_1 = require_constants3();
    var VALID_SAMPLED_VALUES = /* @__PURE__ */ new Set([true, "true", "True", "1", 1]);
    var VALID_UNSAMPLED_VALUES = /* @__PURE__ */ new Set([false, "false", "False", "0", 0]);
    function isValidSampledValue(sampled) {
      return sampled === api_1.TraceFlags.SAMPLED || sampled === api_1.TraceFlags.NONE;
    }
    function parseHeader(header) {
      return Array.isArray(header) ? header[0] : header;
    }
    function getHeaderValue(carrier, getter, key) {
      const header = getter.get(carrier, key);
      return parseHeader(header);
    }
    function getTraceId(carrier, getter) {
      const traceId = getHeaderValue(carrier, getter, constants_1.X_B3_TRACE_ID);
      if (typeof traceId === "string") {
        return traceId.padStart(32, "0");
      }
      return "";
    }
    function getSpanId(carrier, getter) {
      const spanId = getHeaderValue(carrier, getter, constants_1.X_B3_SPAN_ID);
      if (typeof spanId === "string") {
        return spanId;
      }
      return "";
    }
    function getDebug(carrier, getter) {
      const debug = getHeaderValue(carrier, getter, constants_1.X_B3_FLAGS);
      return debug === "1" ? "1" : void 0;
    }
    function getTraceFlags(carrier, getter) {
      const traceFlags = getHeaderValue(carrier, getter, constants_1.X_B3_SAMPLED);
      const debug = getDebug(carrier, getter);
      if (debug === "1" || VALID_SAMPLED_VALUES.has(traceFlags)) {
        return api_1.TraceFlags.SAMPLED;
      }
      if (traceFlags === void 0 || VALID_UNSAMPLED_VALUES.has(traceFlags)) {
        return api_1.TraceFlags.NONE;
      }
      return;
    }
    var B3MultiPropagator = class {
      inject(context, carrier, setter) {
        const spanContext = api_1.trace.getSpanContext(context);
        if (!spanContext || !(0, api_1.isSpanContextValid)(spanContext) || (0, core_1.isTracingSuppressed)(context))
          return;
        const debug = context.getValue(common_1.B3_DEBUG_FLAG_KEY);
        setter.set(carrier, constants_1.X_B3_TRACE_ID, spanContext.traceId);
        setter.set(carrier, constants_1.X_B3_SPAN_ID, spanContext.spanId);
        if (debug === "1") {
          setter.set(carrier, constants_1.X_B3_FLAGS, debug);
        } else if (spanContext.traceFlags !== void 0) {
          setter.set(carrier, constants_1.X_B3_SAMPLED, (api_1.TraceFlags.SAMPLED & spanContext.traceFlags) === api_1.TraceFlags.SAMPLED ? "1" : "0");
        }
      }
      extract(context, carrier, getter) {
        const traceId = getTraceId(carrier, getter);
        const spanId = getSpanId(carrier, getter);
        const traceFlags = getTraceFlags(carrier, getter);
        const debug = getDebug(carrier, getter);
        if ((0, api_1.isValidTraceId)(traceId) && (0, api_1.isValidSpanId)(spanId) && isValidSampledValue(traceFlags)) {
          context = context.setValue(common_1.B3_DEBUG_FLAG_KEY, debug);
          return api_1.trace.setSpanContext(context, {
            traceId,
            spanId,
            isRemote: true,
            traceFlags
          });
        }
        return context;
      }
      fields() {
        return [
          constants_1.X_B3_TRACE_ID,
          constants_1.X_B3_SPAN_ID,
          constants_1.X_B3_FLAGS,
          constants_1.X_B3_SAMPLED,
          constants_1.X_B3_PARENT_SPAN_ID
        ];
      }
    };
    exports.B3MultiPropagator = B3MultiPropagator;
  }
});

// node_modules/@opentelemetry/propagator-b3/build/src/B3SinglePropagator.js
var require_B3SinglePropagator = __commonJS({
  "node_modules/@opentelemetry/propagator-b3/build/src/B3SinglePropagator.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.B3SinglePropagator = void 0;
    var api_1 = require_src();
    var core_1 = require_src3();
    var common_1 = require_common2();
    var constants_1 = require_constants3();
    var B3_CONTEXT_REGEX = /((?:[0-9a-f]{16}){1,2})-([0-9a-f]{16})(?:-([01d](?![0-9a-f])))?(?:-([0-9a-f]{16}))?/;
    var PADDING = "0".repeat(16);
    var SAMPLED_VALUES = /* @__PURE__ */ new Set(["d", "1"]);
    var DEBUG_STATE = "d";
    function convertToTraceId128(traceId) {
      return traceId.length === 32 ? traceId : `${PADDING}${traceId}`;
    }
    function convertToTraceFlags(samplingState) {
      if (samplingState && SAMPLED_VALUES.has(samplingState)) {
        return api_1.TraceFlags.SAMPLED;
      }
      return api_1.TraceFlags.NONE;
    }
    var B3SinglePropagator = class {
      inject(context, carrier, setter) {
        const spanContext = api_1.trace.getSpanContext(context);
        if (!spanContext || !(0, api_1.isSpanContextValid)(spanContext) || (0, core_1.isTracingSuppressed)(context))
          return;
        const samplingState = context.getValue(common_1.B3_DEBUG_FLAG_KEY) || spanContext.traceFlags & 1;
        const value = `${spanContext.traceId}-${spanContext.spanId}-${samplingState}`;
        setter.set(carrier, constants_1.B3_CONTEXT_HEADER, value);
      }
      extract(context, carrier, getter) {
        const header = getter.get(carrier, constants_1.B3_CONTEXT_HEADER);
        const b3Context = Array.isArray(header) ? header[0] : header;
        if (typeof b3Context !== "string")
          return context;
        const match = b3Context.match(B3_CONTEXT_REGEX);
        if (!match)
          return context;
        const [, extractedTraceId, spanId, samplingState] = match;
        const traceId = convertToTraceId128(extractedTraceId);
        if (!(0, api_1.isValidTraceId)(traceId) || !(0, api_1.isValidSpanId)(spanId))
          return context;
        const traceFlags = convertToTraceFlags(samplingState);
        if (samplingState === DEBUG_STATE) {
          context = context.setValue(common_1.B3_DEBUG_FLAG_KEY, samplingState);
        }
        return api_1.trace.setSpanContext(context, {
          traceId,
          spanId,
          isRemote: true,
          traceFlags
        });
      }
      fields() {
        return [constants_1.B3_CONTEXT_HEADER];
      }
    };
    exports.B3SinglePropagator = B3SinglePropagator;
  }
});

// node_modules/@opentelemetry/propagator-b3/build/src/types.js
var require_types15 = __commonJS({
  "node_modules/@opentelemetry/propagator-b3/build/src/types.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.B3InjectEncoding = void 0;
    var B3InjectEncoding;
    (function(B3InjectEncoding2) {
      B3InjectEncoding2[B3InjectEncoding2["SINGLE_HEADER"] = 0] = "SINGLE_HEADER";
      B3InjectEncoding2[B3InjectEncoding2["MULTI_HEADER"] = 1] = "MULTI_HEADER";
    })(B3InjectEncoding = exports.B3InjectEncoding || (exports.B3InjectEncoding = {}));
  }
});

// node_modules/@opentelemetry/propagator-b3/build/src/B3Propagator.js
var require_B3Propagator = __commonJS({
  "node_modules/@opentelemetry/propagator-b3/build/src/B3Propagator.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.B3Propagator = void 0;
    var core_1 = require_src3();
    var B3MultiPropagator_1 = require_B3MultiPropagator();
    var B3SinglePropagator_1 = require_B3SinglePropagator();
    var constants_1 = require_constants3();
    var types_1 = require_types15();
    var B3Propagator = class {
      constructor(config = {}) {
        this._b3MultiPropagator = new B3MultiPropagator_1.B3MultiPropagator();
        this._b3SinglePropagator = new B3SinglePropagator_1.B3SinglePropagator();
        if (config.injectEncoding === types_1.B3InjectEncoding.MULTI_HEADER) {
          this._inject = this._b3MultiPropagator.inject;
          this._fields = this._b3MultiPropagator.fields();
        } else {
          this._inject = this._b3SinglePropagator.inject;
          this._fields = this._b3SinglePropagator.fields();
        }
      }
      inject(context, carrier, setter) {
        if ((0, core_1.isTracingSuppressed)(context)) {
          return;
        }
        this._inject(context, carrier, setter);
      }
      extract(context, carrier, getter) {
        const header = getter.get(carrier, constants_1.B3_CONTEXT_HEADER);
        const b3Context = Array.isArray(header) ? header[0] : header;
        if (b3Context) {
          return this._b3SinglePropagator.extract(context, carrier, getter);
        } else {
          return this._b3MultiPropagator.extract(context, carrier, getter);
        }
      }
      fields() {
        return this._fields;
      }
    };
    exports.B3Propagator = B3Propagator;
  }
});

// node_modules/@opentelemetry/propagator-b3/build/src/index.js
var require_src15 = __commonJS({
  "node_modules/@opentelemetry/propagator-b3/build/src/index.js"(exports) {
    "use strict";
    var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      Object.defineProperty(o, k2, { enumerable: true, get: function() {
        return m[k];
      } });
    } : function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      o[k2] = m[k];
    });
    var __exportStar = exports && exports.__exportStar || function(m, exports2) {
      for (var p in m)
        if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports2, p))
          __createBinding(exports2, m, p);
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    __exportStar(require_B3Propagator(), exports);
    __exportStar(require_constants3(), exports);
    __exportStar(require_types15(), exports);
  }
});

// node_modules/@opentelemetry/propagator-jaeger/build/src/JaegerPropagator.js
var require_JaegerPropagator = __commonJS({
  "node_modules/@opentelemetry/propagator-jaeger/build/src/JaegerPropagator.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.JaegerPropagator = exports.UBER_BAGGAGE_HEADER_PREFIX = exports.UBER_TRACE_ID_HEADER = void 0;
    var api_1 = require_src();
    var core_1 = require_src3();
    exports.UBER_TRACE_ID_HEADER = "uber-trace-id";
    exports.UBER_BAGGAGE_HEADER_PREFIX = "uberctx";
    var JaegerPropagator = class {
      constructor(config) {
        if (typeof config === "string") {
          this._jaegerTraceHeader = config;
          this._jaegerBaggageHeaderPrefix = exports.UBER_BAGGAGE_HEADER_PREFIX;
        } else {
          this._jaegerTraceHeader = (config === null || config === void 0 ? void 0 : config.customTraceHeader) || exports.UBER_TRACE_ID_HEADER;
          this._jaegerBaggageHeaderPrefix = (config === null || config === void 0 ? void 0 : config.customBaggageHeaderPrefix) || exports.UBER_BAGGAGE_HEADER_PREFIX;
        }
      }
      inject(context, carrier, setter) {
        const spanContext = api_1.trace.getSpanContext(context);
        const baggage = api_1.propagation.getBaggage(context);
        if (spanContext && (0, core_1.isTracingSuppressed)(context) === false) {
          const traceFlags = `0${(spanContext.traceFlags || api_1.TraceFlags.NONE).toString(16)}`;
          setter.set(carrier, this._jaegerTraceHeader, `${spanContext.traceId}:${spanContext.spanId}:0:${traceFlags}`);
        }
        if (baggage) {
          for (const [key, entry] of baggage.getAllEntries()) {
            setter.set(carrier, `${this._jaegerBaggageHeaderPrefix}-${key}`, encodeURIComponent(entry.value));
          }
        }
      }
      extract(context, carrier, getter) {
        var _a;
        const uberTraceIdHeader = getter.get(carrier, this._jaegerTraceHeader);
        const uberTraceId = Array.isArray(uberTraceIdHeader) ? uberTraceIdHeader[0] : uberTraceIdHeader;
        const baggageValues = getter.keys(carrier).filter((key) => key.startsWith(`${this._jaegerBaggageHeaderPrefix}-`)).map((key) => {
          const value = getter.get(carrier, key);
          return {
            key: key.substring(this._jaegerBaggageHeaderPrefix.length + 1),
            value: Array.isArray(value) ? value[0] : value
          };
        });
        let newContext = context;
        if (typeof uberTraceId === "string") {
          const spanContext = deserializeSpanContext(uberTraceId);
          if (spanContext) {
            newContext = api_1.trace.setSpanContext(newContext, spanContext);
          }
        }
        if (baggageValues.length === 0)
          return newContext;
        let currentBaggage = (_a = api_1.propagation.getBaggage(context)) !== null && _a !== void 0 ? _a : api_1.propagation.createBaggage();
        for (const baggageEntry of baggageValues) {
          if (baggageEntry.value === void 0)
            continue;
          currentBaggage = currentBaggage.setEntry(baggageEntry.key, {
            value: decodeURIComponent(baggageEntry.value)
          });
        }
        newContext = api_1.propagation.setBaggage(newContext, currentBaggage);
        return newContext;
      }
      fields() {
        return [this._jaegerTraceHeader];
      }
    };
    exports.JaegerPropagator = JaegerPropagator;
    function deserializeSpanContext(serializedString) {
      const headers = decodeURIComponent(serializedString).split(":");
      if (headers.length !== 4) {
        return null;
      }
      const [_traceId, _spanId, , flags] = headers;
      const traceId = _traceId.padStart(32, "0");
      const spanId = _spanId.padStart(16, "0");
      const traceFlags = flags.match(/^[0-9a-f]{1,2}$/i) ? parseInt(flags, 16) & 1 : 1;
      return { traceId, spanId, isRemote: true, traceFlags };
    }
  }
});

// node_modules/@opentelemetry/propagator-jaeger/build/src/index.js
var require_src16 = __commonJS({
  "node_modules/@opentelemetry/propagator-jaeger/build/src/index.js"(exports) {
    "use strict";
    var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      Object.defineProperty(o, k2, { enumerable: true, get: function() {
        return m[k];
      } });
    } : function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      o[k2] = m[k];
    });
    var __exportStar = exports && exports.__exportStar || function(m, exports2) {
      for (var p in m)
        if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports2, p))
          __createBinding(exports2, m, p);
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    __exportStar(require_JaegerPropagator(), exports);
  }
});

// node_modules/@opentelemetry/sdk-trace-node/build/src/NodeTracerProvider.js
var require_NodeTracerProvider = __commonJS({
  "node_modules/@opentelemetry/sdk-trace-node/build/src/NodeTracerProvider.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.NodeTracerProvider = void 0;
    var context_async_hooks_1 = require_src14();
    var propagator_b3_1 = require_src15();
    var sdk_trace_base_1 = require_src9();
    var semver = require_semver3();
    var propagator_jaeger_1 = require_src16();
    var NodeTracerProvider2 = class extends sdk_trace_base_1.BasicTracerProvider {
      constructor(config = {}) {
        super(config);
      }
      register(config = {}) {
        if (config.contextManager === void 0) {
          const ContextManager = semver.gte(process.version, "14.8.0") ? context_async_hooks_1.AsyncLocalStorageContextManager : context_async_hooks_1.AsyncHooksContextManager;
          config.contextManager = new ContextManager();
          config.contextManager.enable();
        }
        super.register(config);
      }
    };
    exports.NodeTracerProvider = NodeTracerProvider2;
    NodeTracerProvider2._registeredPropagators = new Map([
      ...sdk_trace_base_1.BasicTracerProvider._registeredPropagators,
      [
        "b3",
        () => new propagator_b3_1.B3Propagator({ injectEncoding: propagator_b3_1.B3InjectEncoding.SINGLE_HEADER })
      ],
      [
        "b3multi",
        () => new propagator_b3_1.B3Propagator({ injectEncoding: propagator_b3_1.B3InjectEncoding.MULTI_HEADER })
      ],
      ["jaeger", () => new propagator_jaeger_1.JaegerPropagator()]
    ]);
  }
});

// node_modules/@opentelemetry/sdk-trace-node/build/src/index.js
var require_src17 = __commonJS({
  "node_modules/@opentelemetry/sdk-trace-node/build/src/index.js"(exports) {
    "use strict";
    var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      Object.defineProperty(o, k2, { enumerable: true, get: function() {
        return m[k];
      } });
    } : function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      o[k2] = m[k];
    });
    var __exportStar = exports && exports.__exportStar || function(m, exports2) {
      for (var p in m)
        if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports2, p))
          __createBinding(exports2, m, p);
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    __exportStar(require_NodeTracerProvider(), exports);
    __exportStar(require_src9(), exports);
  }
});

// node_modules/@opentelemetry/api-metrics/build/src/NoopMeter.js
var require_NoopMeter2 = __commonJS({
  "node_modules/@opentelemetry/api-metrics/build/src/NoopMeter.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.NOOP_OBSERVABLE_UP_DOWN_COUNTER_METRIC = exports.NOOP_OBSERVABLE_GAUGE_METRIC = exports.NOOP_OBSERVABLE_COUNTER_METRIC = exports.NOOP_UP_DOWN_COUNTER_METRIC = exports.NOOP_HISTOGRAM_METRIC = exports.NOOP_COUNTER_METRIC = exports.NOOP_METER = exports.NoopObservableUpDownCounterMetric = exports.NoopObservableGaugeMetric = exports.NoopObservableCounterMetric = exports.NoopObservableMetric = exports.NoopHistogramMetric = exports.NoopUpDownCounterMetric = exports.NoopCounterMetric = exports.NoopMetric = exports.NoopMeter = void 0;
    var NoopMeter = class {
      constructor() {
      }
      /**
       * @see {@link Meter.createHistogram}
       */
      createHistogram(_name, _options) {
        return exports.NOOP_HISTOGRAM_METRIC;
      }
      /**
       * @see {@link Meter.createCounter}
       */
      createCounter(_name, _options) {
        return exports.NOOP_COUNTER_METRIC;
      }
      /**
       * @see {@link Meter.createUpDownCounter}
       */
      createUpDownCounter(_name, _options) {
        return exports.NOOP_UP_DOWN_COUNTER_METRIC;
      }
      /**
       * @see {@link Meter.createObservableGauge}
       */
      createObservableGauge(_name, _options) {
        return exports.NOOP_OBSERVABLE_GAUGE_METRIC;
      }
      /**
       * @see {@link Meter.createObservableCounter}
       */
      createObservableCounter(_name, _options) {
        return exports.NOOP_OBSERVABLE_COUNTER_METRIC;
      }
      /**
       * @see {@link Meter.createObservableUpDownCounter}
       */
      createObservableUpDownCounter(_name, _options) {
        return exports.NOOP_OBSERVABLE_UP_DOWN_COUNTER_METRIC;
      }
      /**
       * @see {@link Meter.addBatchObservableCallback}
       */
      addBatchObservableCallback(_callback, _observables) {
      }
      /**
       * @see {@link Meter.removeBatchObservableCallback}
       */
      removeBatchObservableCallback(_callback) {
      }
    };
    exports.NoopMeter = NoopMeter;
    var NoopMetric = class {
    };
    exports.NoopMetric = NoopMetric;
    var NoopCounterMetric = class extends NoopMetric {
      add(_value, _attributes) {
      }
    };
    exports.NoopCounterMetric = NoopCounterMetric;
    var NoopUpDownCounterMetric = class extends NoopMetric {
      add(_value, _attributes) {
      }
    };
    exports.NoopUpDownCounterMetric = NoopUpDownCounterMetric;
    var NoopHistogramMetric = class extends NoopMetric {
      record(_value, _attributes) {
      }
    };
    exports.NoopHistogramMetric = NoopHistogramMetric;
    var NoopObservableMetric = class {
      addCallback(_callback) {
      }
      removeCallback(_callback) {
      }
    };
    exports.NoopObservableMetric = NoopObservableMetric;
    var NoopObservableCounterMetric = class extends NoopObservableMetric {
    };
    exports.NoopObservableCounterMetric = NoopObservableCounterMetric;
    var NoopObservableGaugeMetric = class extends NoopObservableMetric {
    };
    exports.NoopObservableGaugeMetric = NoopObservableGaugeMetric;
    var NoopObservableUpDownCounterMetric = class extends NoopObservableMetric {
    };
    exports.NoopObservableUpDownCounterMetric = NoopObservableUpDownCounterMetric;
    exports.NOOP_METER = new NoopMeter();
    exports.NOOP_COUNTER_METRIC = new NoopCounterMetric();
    exports.NOOP_HISTOGRAM_METRIC = new NoopHistogramMetric();
    exports.NOOP_UP_DOWN_COUNTER_METRIC = new NoopUpDownCounterMetric();
    exports.NOOP_OBSERVABLE_COUNTER_METRIC = new NoopObservableCounterMetric();
    exports.NOOP_OBSERVABLE_GAUGE_METRIC = new NoopObservableGaugeMetric();
    exports.NOOP_OBSERVABLE_UP_DOWN_COUNTER_METRIC = new NoopObservableUpDownCounterMetric();
  }
});

// node_modules/@opentelemetry/api-metrics/build/src/NoopMeterProvider.js
var require_NoopMeterProvider2 = __commonJS({
  "node_modules/@opentelemetry/api-metrics/build/src/NoopMeterProvider.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.NOOP_METER_PROVIDER = exports.NoopMeterProvider = void 0;
    var NoopMeter_1 = require_NoopMeter2();
    var NoopMeterProvider = class {
      getMeter(_name, _version, _options) {
        return NoopMeter_1.NOOP_METER;
      }
    };
    exports.NoopMeterProvider = NoopMeterProvider;
    exports.NOOP_METER_PROVIDER = new NoopMeterProvider();
  }
});

// node_modules/@opentelemetry/api-metrics/build/src/types/Meter.js
var require_Meter2 = __commonJS({
  "node_modules/@opentelemetry/api-metrics/build/src/types/Meter.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
  }
});

// node_modules/@opentelemetry/api-metrics/build/src/types/MeterProvider.js
var require_MeterProvider2 = __commonJS({
  "node_modules/@opentelemetry/api-metrics/build/src/types/MeterProvider.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
  }
});

// node_modules/@opentelemetry/api-metrics/build/src/types/Metric.js
var require_Metric2 = __commonJS({
  "node_modules/@opentelemetry/api-metrics/build/src/types/Metric.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ValueType = void 0;
    var ValueType;
    (function(ValueType2) {
      ValueType2[ValueType2["INT"] = 0] = "INT";
      ValueType2[ValueType2["DOUBLE"] = 1] = "DOUBLE";
    })(ValueType = exports.ValueType || (exports.ValueType = {}));
  }
});

// node_modules/@opentelemetry/api-metrics/build/src/types/ObservableResult.js
var require_ObservableResult2 = __commonJS({
  "node_modules/@opentelemetry/api-metrics/build/src/types/ObservableResult.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
  }
});

// node_modules/@opentelemetry/api-metrics/build/src/platform/node/globalThis.js
var require_globalThis4 = __commonJS({
  "node_modules/@opentelemetry/api-metrics/build/src/platform/node/globalThis.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports._globalThis = void 0;
    exports._globalThis = typeof globalThis === "object" ? globalThis : global;
  }
});

// node_modules/@opentelemetry/api-metrics/build/src/platform/node/index.js
var require_node9 = __commonJS({
  "node_modules/@opentelemetry/api-metrics/build/src/platform/node/index.js"(exports) {
    "use strict";
    var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      Object.defineProperty(o, k2, { enumerable: true, get: function() {
        return m[k];
      } });
    } : function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      o[k2] = m[k];
    });
    var __exportStar = exports && exports.__exportStar || function(m, exports2) {
      for (var p in m)
        if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports2, p))
          __createBinding(exports2, m, p);
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    __exportStar(require_globalThis4(), exports);
  }
});

// node_modules/@opentelemetry/api-metrics/build/src/platform/index.js
var require_platform8 = __commonJS({
  "node_modules/@opentelemetry/api-metrics/build/src/platform/index.js"(exports) {
    "use strict";
    var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      Object.defineProperty(o, k2, { enumerable: true, get: function() {
        return m[k];
      } });
    } : function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      o[k2] = m[k];
    });
    var __exportStar = exports && exports.__exportStar || function(m, exports2) {
      for (var p in m)
        if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports2, p))
          __createBinding(exports2, m, p);
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    __exportStar(require_node9(), exports);
  }
});

// node_modules/@opentelemetry/api-metrics/build/src/api/global-utils.js
var require_global_utils2 = __commonJS({
  "node_modules/@opentelemetry/api-metrics/build/src/api/global-utils.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.API_BACKWARDS_COMPATIBILITY_VERSION = exports.makeGetter = exports._global = exports.GLOBAL_METRICS_API_KEY = void 0;
    var platform_1 = require_platform8();
    exports.GLOBAL_METRICS_API_KEY = Symbol.for("io.opentelemetry.js.api.metrics");
    exports._global = platform_1._globalThis;
    function makeGetter(requiredVersion, instance, fallback) {
      return (version) => version === requiredVersion ? instance : fallback;
    }
    exports.makeGetter = makeGetter;
    exports.API_BACKWARDS_COMPATIBILITY_VERSION = 4;
  }
});

// node_modules/@opentelemetry/api-metrics/build/src/api/metrics.js
var require_metrics3 = __commonJS({
  "node_modules/@opentelemetry/api-metrics/build/src/api/metrics.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.MetricsAPI = void 0;
    var NoopMeterProvider_1 = require_NoopMeterProvider2();
    var global_utils_1 = require_global_utils2();
    var MetricsAPI = class {
      /** Empty private constructor prevents end users from constructing a new instance of the API */
      constructor() {
      }
      /** Get the singleton instance of the Metrics API */
      static getInstance() {
        if (!this._instance) {
          this._instance = new MetricsAPI();
        }
        return this._instance;
      }
      /**
       * Set the current global meter. Returns the initialized global meter provider.
       */
      setGlobalMeterProvider(provider2) {
        if (global_utils_1._global[global_utils_1.GLOBAL_METRICS_API_KEY]) {
          return this.getMeterProvider();
        }
        global_utils_1._global[global_utils_1.GLOBAL_METRICS_API_KEY] = (0, global_utils_1.makeGetter)(global_utils_1.API_BACKWARDS_COMPATIBILITY_VERSION, provider2, NoopMeterProvider_1.NOOP_METER_PROVIDER);
        return provider2;
      }
      /**
       * Returns the global meter provider.
       */
      getMeterProvider() {
        var _a, _b;
        return (_b = (_a = global_utils_1._global[global_utils_1.GLOBAL_METRICS_API_KEY]) === null || _a === void 0 ? void 0 : _a.call(global_utils_1._global, global_utils_1.API_BACKWARDS_COMPATIBILITY_VERSION)) !== null && _b !== void 0 ? _b : NoopMeterProvider_1.NOOP_METER_PROVIDER;
      }
      /**
       * Returns a meter from the global meter provider.
       */
      getMeter(name, version, options) {
        return this.getMeterProvider().getMeter(name, version, options);
      }
      /** Remove the global meter provider */
      disable() {
        delete global_utils_1._global[global_utils_1.GLOBAL_METRICS_API_KEY];
      }
    };
    exports.MetricsAPI = MetricsAPI;
  }
});

// node_modules/@opentelemetry/api-metrics/build/src/index.js
var require_src18 = __commonJS({
  "node_modules/@opentelemetry/api-metrics/build/src/index.js"(exports) {
    "use strict";
    var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      Object.defineProperty(o, k2, { enumerable: true, get: function() {
        return m[k];
      } });
    } : function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      o[k2] = m[k];
    });
    var __exportStar = exports && exports.__exportStar || function(m, exports2) {
      for (var p in m)
        if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports2, p))
          __createBinding(exports2, m, p);
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.metrics = void 0;
    __exportStar(require_NoopMeter2(), exports);
    __exportStar(require_NoopMeterProvider2(), exports);
    __exportStar(require_Meter2(), exports);
    __exportStar(require_MeterProvider2(), exports);
    __exportStar(require_Metric2(), exports);
    __exportStar(require_ObservableResult2(), exports);
    var metrics_1 = require_metrics3();
    exports.metrics = metrics_1.MetricsAPI.getInstance();
  }
});

// node_modules/@opentelemetry/instrumentation-aws-lambda/node_modules/@opentelemetry/instrumentation/build/src/autoLoaderUtils.js
var require_autoLoaderUtils2 = __commonJS({
  "node_modules/@opentelemetry/instrumentation-aws-lambda/node_modules/@opentelemetry/instrumentation/build/src/autoLoaderUtils.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.disableInstrumentations = exports.enableInstrumentations = exports.parseInstrumentationOptions = void 0;
    function parseInstrumentationOptions(options = []) {
      let instrumentations = [];
      for (let i = 0, j = options.length; i < j; i++) {
        const option = options[i];
        if (Array.isArray(option)) {
          const results = parseInstrumentationOptions(option);
          instrumentations = instrumentations.concat(results.instrumentations);
        } else if (typeof option === "function") {
          instrumentations.push(new option());
        } else if (option.instrumentationName) {
          instrumentations.push(option);
        }
      }
      return { instrumentations };
    }
    exports.parseInstrumentationOptions = parseInstrumentationOptions;
    function enableInstrumentations(instrumentations, tracerProvider, meterProvider) {
      for (let i = 0, j = instrumentations.length; i < j; i++) {
        const instrumentation = instrumentations[i];
        if (tracerProvider) {
          instrumentation.setTracerProvider(tracerProvider);
        }
        if (meterProvider) {
          instrumentation.setMeterProvider(meterProvider);
        }
        if (!instrumentation.getConfig().enabled) {
          instrumentation.enable();
        }
      }
    }
    exports.enableInstrumentations = enableInstrumentations;
    function disableInstrumentations(instrumentations) {
      instrumentations.forEach((instrumentation) => instrumentation.disable());
    }
    exports.disableInstrumentations = disableInstrumentations;
  }
});

// node_modules/@opentelemetry/instrumentation-aws-lambda/node_modules/@opentelemetry/instrumentation/build/src/autoLoader.js
var require_autoLoader2 = __commonJS({
  "node_modules/@opentelemetry/instrumentation-aws-lambda/node_modules/@opentelemetry/instrumentation/build/src/autoLoader.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.registerInstrumentations = void 0;
    var api_1 = require_src();
    var api_metrics_1 = require_src18();
    var autoLoaderUtils_1 = require_autoLoaderUtils2();
    function registerInstrumentations2(options) {
      const { instrumentations } = (0, autoLoaderUtils_1.parseInstrumentationOptions)(options.instrumentations);
      const tracerProvider = options.tracerProvider || api_1.trace.getTracerProvider();
      const meterProvider = options.meterProvider || api_metrics_1.metrics.getMeterProvider();
      (0, autoLoaderUtils_1.enableInstrumentations)(instrumentations, tracerProvider, meterProvider);
      return () => {
        (0, autoLoaderUtils_1.disableInstrumentations)(instrumentations);
      };
    }
    exports.registerInstrumentations = registerInstrumentations2;
  }
});

// node_modules/@opentelemetry/instrumentation-aws-lambda/node_modules/@opentelemetry/instrumentation/build/src/instrumentation.js
var require_instrumentation3 = __commonJS({
  "node_modules/@opentelemetry/instrumentation-aws-lambda/node_modules/@opentelemetry/instrumentation/build/src/instrumentation.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.InstrumentationAbstract = void 0;
    var api_1 = require_src();
    var api_metrics_1 = require_src18();
    var shimmer = require_shimmer();
    var InstrumentationAbstract = class {
      constructor(instrumentationName, instrumentationVersion, config = {}) {
        this.instrumentationName = instrumentationName;
        this.instrumentationVersion = instrumentationVersion;
        this._wrap = shimmer.wrap;
        this._unwrap = shimmer.unwrap;
        this._massWrap = shimmer.massWrap;
        this._massUnwrap = shimmer.massUnwrap;
        this._config = Object.assign({ enabled: true }, config);
        this._diag = api_1.diag.createComponentLogger({
          namespace: instrumentationName
        });
        this._tracer = api_1.trace.getTracer(instrumentationName, instrumentationVersion);
        this._meter = api_metrics_1.metrics.getMeter(instrumentationName, instrumentationVersion);
      }
      /* Returns meter */
      get meter() {
        return this._meter;
      }
      /**
       * Sets MeterProvider to this plugin
       * @param meterProvider
       */
      setMeterProvider(meterProvider) {
        this._meter = meterProvider.getMeter(this.instrumentationName, this.instrumentationVersion);
      }
      /* Returns InstrumentationConfig */
      getConfig() {
        return this._config;
      }
      /**
       * Sets InstrumentationConfig to this plugin
       * @param InstrumentationConfig
       */
      setConfig(config = {}) {
        this._config = Object.assign({}, config);
      }
      /**
       * Sets TraceProvider to this plugin
       * @param tracerProvider
       */
      setTracerProvider(tracerProvider) {
        this._tracer = tracerProvider.getTracer(this.instrumentationName, this.instrumentationVersion);
      }
      /* Returns tracer */
      get tracer() {
        return this._tracer;
      }
    };
    exports.InstrumentationAbstract = InstrumentationAbstract;
  }
});

// node_modules/@opentelemetry/instrumentation-aws-lambda/node_modules/@opentelemetry/instrumentation/build/src/platform/node/instrumentation.js
var require_instrumentation4 = __commonJS({
  "node_modules/@opentelemetry/instrumentation-aws-lambda/node_modules/@opentelemetry/instrumentation/build/src/platform/node/instrumentation.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.InstrumentationBase = void 0;
    var path = require("path");
    var RequireInTheMiddle = require_require_in_the_middle();
    var semver_1 = require_semver3();
    var instrumentation_1 = require_instrumentation3();
    var api_1 = require_src();
    var InstrumentationBase = class extends instrumentation_1.InstrumentationAbstract {
      constructor(instrumentationName, instrumentationVersion, config = {}) {
        super(instrumentationName, instrumentationVersion, config);
        this._hooks = [];
        this._enabled = false;
        let modules = this.init();
        if (modules && !Array.isArray(modules)) {
          modules = [modules];
        }
        this._modules = modules || [];
        if (this._modules.length === 0) {
          api_1.diag.warn("No modules instrumentation has been defined, nothing will be patched");
        }
        if (this._config.enabled) {
          this.enable();
        }
      }
      _warnOnPreloadedModules() {
        this._modules.forEach((module3) => {
          const { name } = module3;
          try {
            const resolvedModule = require.resolve(name);
            if (require.cache[resolvedModule]) {
              this._diag.warn(`Module ${name} has been loaded before ${this.instrumentationName} so it might not work, please initialize it before requiring ${name}`);
            }
          } catch (_a) {
          }
        });
      }
      _extractPackageVersion(baseDir) {
        try {
          const version = require(path.join(baseDir, "package.json")).version;
          return typeof version === "string" ? version : void 0;
        } catch (error) {
          api_1.diag.warn("Failed extracting version", baseDir);
        }
        return void 0;
      }
      _onRequire(module3, exports2, name, baseDir) {
        var _a;
        if (!baseDir) {
          if (typeof module3.patch === "function") {
            module3.moduleExports = exports2;
            if (this._enabled) {
              return module3.patch(exports2);
            }
          }
          return exports2;
        }
        const version = this._extractPackageVersion(baseDir);
        module3.moduleVersion = version;
        if (module3.name === name) {
          if (isSupported(module3.supportedVersions, version, module3.includePrerelease)) {
            if (typeof module3.patch === "function") {
              module3.moduleExports = exports2;
              if (this._enabled) {
                return module3.patch(exports2, module3.moduleVersion);
              }
            }
          }
          return exports2;
        }
        const files = (_a = module3.files) !== null && _a !== void 0 ? _a : [];
        const supportedFileInstrumentations = files.filter((f) => f.name === name).filter((f) => isSupported(f.supportedVersions, version, module3.includePrerelease));
        return supportedFileInstrumentations.reduce((patchedExports, file) => {
          file.moduleExports = patchedExports;
          if (this._enabled) {
            return file.patch(patchedExports, module3.moduleVersion);
          }
          return patchedExports;
        }, exports2);
      }
      enable() {
        if (this._enabled) {
          return;
        }
        this._enabled = true;
        if (this._hooks.length > 0) {
          for (const module3 of this._modules) {
            if (typeof module3.patch === "function" && module3.moduleExports) {
              module3.patch(module3.moduleExports, module3.moduleVersion);
            }
            for (const file of module3.files) {
              if (file.moduleExports) {
                file.patch(file.moduleExports, module3.moduleVersion);
              }
            }
          }
          return;
        }
        this._warnOnPreloadedModules();
        for (const module3 of this._modules) {
          this._hooks.push(RequireInTheMiddle([module3.name], { internals: true }, (exports2, name, baseDir) => {
            return this._onRequire(module3, exports2, name, baseDir);
          }));
        }
      }
      disable() {
        if (!this._enabled) {
          return;
        }
        this._enabled = false;
        for (const module3 of this._modules) {
          if (typeof module3.unpatch === "function" && module3.moduleExports) {
            module3.unpatch(module3.moduleExports, module3.moduleVersion);
          }
          for (const file of module3.files) {
            if (file.moduleExports) {
              file.unpatch(file.moduleExports, module3.moduleVersion);
            }
          }
        }
      }
      isEnabled() {
        return this._enabled;
      }
    };
    exports.InstrumentationBase = InstrumentationBase;
    function isSupported(supportedVersions, version, includePrerelease) {
      if (typeof version === "undefined") {
        return supportedVersions.includes("*");
      }
      return supportedVersions.some((supportedVersion) => {
        return (0, semver_1.satisfies)(version, supportedVersion, { includePrerelease });
      });
    }
  }
});

// node_modules/@opentelemetry/instrumentation-aws-lambda/node_modules/@opentelemetry/instrumentation/build/src/platform/node/instrumentationNodeModuleDefinition.js
var require_instrumentationNodeModuleDefinition2 = __commonJS({
  "node_modules/@opentelemetry/instrumentation-aws-lambda/node_modules/@opentelemetry/instrumentation/build/src/platform/node/instrumentationNodeModuleDefinition.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.InstrumentationNodeModuleDefinition = void 0;
    var InstrumentationNodeModuleDefinition = class {
      constructor(name, supportedVersions, patch, unpatch, files) {
        this.name = name;
        this.supportedVersions = supportedVersions;
        this.patch = patch;
        this.unpatch = unpatch;
        this.files = files || [];
      }
    };
    exports.InstrumentationNodeModuleDefinition = InstrumentationNodeModuleDefinition;
  }
});

// node_modules/@opentelemetry/instrumentation-aws-lambda/node_modules/@opentelemetry/instrumentation/build/src/platform/node/instrumentationNodeModuleFile.js
var require_instrumentationNodeModuleFile2 = __commonJS({
  "node_modules/@opentelemetry/instrumentation-aws-lambda/node_modules/@opentelemetry/instrumentation/build/src/platform/node/instrumentationNodeModuleFile.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.InstrumentationNodeModuleFile = void 0;
    var path_1 = require("path");
    var InstrumentationNodeModuleFile = class {
      constructor(name, supportedVersions, patch, unpatch) {
        this.supportedVersions = supportedVersions;
        this.patch = patch;
        this.unpatch = unpatch;
        this.name = (0, path_1.normalize)(name);
      }
    };
    exports.InstrumentationNodeModuleFile = InstrumentationNodeModuleFile;
  }
});

// node_modules/@opentelemetry/instrumentation-aws-lambda/node_modules/@opentelemetry/instrumentation/build/src/platform/node/types.js
var require_types16 = __commonJS({
  "node_modules/@opentelemetry/instrumentation-aws-lambda/node_modules/@opentelemetry/instrumentation/build/src/platform/node/types.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
  }
});

// node_modules/@opentelemetry/instrumentation-aws-lambda/node_modules/@opentelemetry/instrumentation/build/src/platform/node/index.js
var require_node10 = __commonJS({
  "node_modules/@opentelemetry/instrumentation-aws-lambda/node_modules/@opentelemetry/instrumentation/build/src/platform/node/index.js"(exports) {
    "use strict";
    var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      Object.defineProperty(o, k2, { enumerable: true, get: function() {
        return m[k];
      } });
    } : function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      o[k2] = m[k];
    });
    var __exportStar = exports && exports.__exportStar || function(m, exports2) {
      for (var p in m)
        if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports2, p))
          __createBinding(exports2, m, p);
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    __exportStar(require_instrumentation4(), exports);
    __exportStar(require_instrumentationNodeModuleDefinition2(), exports);
    __exportStar(require_instrumentationNodeModuleFile2(), exports);
    __exportStar(require_types16(), exports);
  }
});

// node_modules/@opentelemetry/instrumentation-aws-lambda/node_modules/@opentelemetry/instrumentation/build/src/platform/index.js
var require_platform9 = __commonJS({
  "node_modules/@opentelemetry/instrumentation-aws-lambda/node_modules/@opentelemetry/instrumentation/build/src/platform/index.js"(exports) {
    "use strict";
    var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      Object.defineProperty(o, k2, { enumerable: true, get: function() {
        return m[k];
      } });
    } : function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      o[k2] = m[k];
    });
    var __exportStar = exports && exports.__exportStar || function(m, exports2) {
      for (var p in m)
        if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports2, p))
          __createBinding(exports2, m, p);
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    __exportStar(require_node10(), exports);
  }
});

// node_modules/@opentelemetry/instrumentation-aws-lambda/node_modules/@opentelemetry/instrumentation/build/src/types.js
var require_types17 = __commonJS({
  "node_modules/@opentelemetry/instrumentation-aws-lambda/node_modules/@opentelemetry/instrumentation/build/src/types.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
  }
});

// node_modules/@opentelemetry/instrumentation-aws-lambda/node_modules/@opentelemetry/instrumentation/build/src/types_internal.js
var require_types_internal2 = __commonJS({
  "node_modules/@opentelemetry/instrumentation-aws-lambda/node_modules/@opentelemetry/instrumentation/build/src/types_internal.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
  }
});

// node_modules/@opentelemetry/instrumentation-aws-lambda/node_modules/@opentelemetry/instrumentation/build/src/utils.js
var require_utils7 = __commonJS({
  "node_modules/@opentelemetry/instrumentation-aws-lambda/node_modules/@opentelemetry/instrumentation/build/src/utils.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.isWrapped = exports.safeExecuteInTheMiddleAsync = exports.safeExecuteInTheMiddle = void 0;
    function safeExecuteInTheMiddle(execute, onFinish, preventThrowingError) {
      let error;
      let result;
      try {
        result = execute();
      } catch (e) {
        error = e;
      } finally {
        onFinish(error, result);
        if (error && !preventThrowingError) {
          throw error;
        }
        return result;
      }
    }
    exports.safeExecuteInTheMiddle = safeExecuteInTheMiddle;
    async function safeExecuteInTheMiddleAsync(execute, onFinish, preventThrowingError) {
      let error;
      let result;
      try {
        result = await execute();
      } catch (e) {
        error = e;
      } finally {
        onFinish(error, result);
        if (error && !preventThrowingError) {
          throw error;
        }
        return result;
      }
    }
    exports.safeExecuteInTheMiddleAsync = safeExecuteInTheMiddleAsync;
    function isWrapped(func) {
      return typeof func === "function" && typeof func.__original === "function" && typeof func.__unwrap === "function" && func.__wrapped === true;
    }
    exports.isWrapped = isWrapped;
  }
});

// node_modules/@opentelemetry/instrumentation-aws-lambda/node_modules/@opentelemetry/instrumentation/build/src/index.js
var require_src19 = __commonJS({
  "node_modules/@opentelemetry/instrumentation-aws-lambda/node_modules/@opentelemetry/instrumentation/build/src/index.js"(exports) {
    "use strict";
    var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      Object.defineProperty(o, k2, { enumerable: true, get: function() {
        return m[k];
      } });
    } : function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      o[k2] = m[k];
    });
    var __exportStar = exports && exports.__exportStar || function(m, exports2) {
      for (var p in m)
        if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports2, p))
          __createBinding(exports2, m, p);
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    __exportStar(require_autoLoader2(), exports);
    __exportStar(require_platform9(), exports);
    __exportStar(require_types17(), exports);
    __exportStar(require_types_internal2(), exports);
    __exportStar(require_utils7(), exports);
  }
});

// node_modules/@opentelemetry/propagator-aws-xray/build/src/AWSXRayPropagator.js
var require_AWSXRayPropagator = __commonJS({
  "node_modules/@opentelemetry/propagator-aws-xray/build/src/AWSXRayPropagator.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.AWSXRayPropagator = exports.AWSXRAY_TRACE_ID_HEADER = void 0;
    var api_1 = require_src();
    exports.AWSXRAY_TRACE_ID_HEADER = "x-amzn-trace-id";
    var TRACE_HEADER_DELIMITER = ";";
    var KV_DELIMITER = "=";
    var TRACE_ID_KEY = "Root";
    var TRACE_ID_LENGTH = 35;
    var TRACE_ID_VERSION = "1";
    var TRACE_ID_DELIMITER = "-";
    var TRACE_ID_DELIMITER_INDEX_1 = 1;
    var TRACE_ID_DELIMITER_INDEX_2 = 10;
    var TRACE_ID_FIRST_PART_LENGTH = 8;
    var PARENT_ID_KEY = "Parent";
    var SAMPLED_FLAG_KEY = "Sampled";
    var IS_SAMPLED = "1";
    var NOT_SAMPLED = "0";
    var AWSXRayPropagator = class {
      inject(context, carrier, setter) {
        var _a;
        const spanContext = (_a = api_1.trace.getSpan(context)) === null || _a === void 0 ? void 0 : _a.spanContext();
        if (!spanContext || !api_1.isSpanContextValid(spanContext))
          return;
        const otTraceId = spanContext.traceId;
        const timestamp = otTraceId.substring(0, TRACE_ID_FIRST_PART_LENGTH);
        const randomNumber = otTraceId.substring(TRACE_ID_FIRST_PART_LENGTH);
        const parentId = spanContext.spanId;
        const samplingFlag = (api_1.TraceFlags.SAMPLED & spanContext.traceFlags) === api_1.TraceFlags.SAMPLED ? IS_SAMPLED : NOT_SAMPLED;
        const traceHeader = `Root=1-${timestamp}-${randomNumber};Parent=${parentId};Sampled=${samplingFlag}`;
        setter.set(carrier, exports.AWSXRAY_TRACE_ID_HEADER, traceHeader);
      }
      extract(context, carrier, getter) {
        const spanContext = this.getSpanContextFromHeader(carrier, getter);
        if (!api_1.isSpanContextValid(spanContext))
          return context;
        return api_1.trace.setSpan(context, api_1.trace.wrapSpanContext(spanContext));
      }
      fields() {
        return [exports.AWSXRAY_TRACE_ID_HEADER];
      }
      getSpanContextFromHeader(carrier, getter) {
        const traceHeader = getter.get(carrier, exports.AWSXRAY_TRACE_ID_HEADER);
        if (!traceHeader || typeof traceHeader !== "string")
          return api_1.INVALID_SPAN_CONTEXT;
        let pos = 0;
        let trimmedPart;
        let parsedTraceId = api_1.INVALID_TRACEID;
        let parsedSpanId = api_1.INVALID_SPANID;
        let parsedTraceFlags = null;
        while (pos < traceHeader.length) {
          const delimiterIndex = traceHeader.indexOf(TRACE_HEADER_DELIMITER, pos);
          if (delimiterIndex >= 0) {
            trimmedPart = traceHeader.substring(pos, delimiterIndex).trim();
            pos = delimiterIndex + 1;
          } else {
            trimmedPart = traceHeader.substring(pos).trim();
            pos = traceHeader.length;
          }
          const equalsIndex = trimmedPart.indexOf(KV_DELIMITER);
          const value = trimmedPart.substring(equalsIndex + 1);
          if (trimmedPart.startsWith(TRACE_ID_KEY)) {
            parsedTraceId = AWSXRayPropagator._parseTraceId(value);
          } else if (trimmedPart.startsWith(PARENT_ID_KEY)) {
            parsedSpanId = AWSXRayPropagator._parseSpanId(value);
          } else if (trimmedPart.startsWith(SAMPLED_FLAG_KEY)) {
            parsedTraceFlags = AWSXRayPropagator._parseTraceFlag(value);
          }
        }
        if (parsedTraceFlags === null) {
          return api_1.INVALID_SPAN_CONTEXT;
        }
        const resultSpanContext = {
          traceId: parsedTraceId,
          spanId: parsedSpanId,
          traceFlags: parsedTraceFlags,
          isRemote: true
        };
        if (!api_1.isSpanContextValid(resultSpanContext)) {
          return api_1.INVALID_SPAN_CONTEXT;
        }
        return resultSpanContext;
      }
      static _parseTraceId(xrayTraceId) {
        if (xrayTraceId.length !== TRACE_ID_LENGTH) {
          return api_1.INVALID_TRACEID;
        }
        if (!xrayTraceId.startsWith(TRACE_ID_VERSION)) {
          return api_1.INVALID_TRACEID;
        }
        if (xrayTraceId.charAt(TRACE_ID_DELIMITER_INDEX_1) !== TRACE_ID_DELIMITER || xrayTraceId.charAt(TRACE_ID_DELIMITER_INDEX_2) !== TRACE_ID_DELIMITER) {
          return api_1.INVALID_TRACEID;
        }
        const epochPart = xrayTraceId.substring(TRACE_ID_DELIMITER_INDEX_1 + 1, TRACE_ID_DELIMITER_INDEX_2);
        const uniquePart = xrayTraceId.substring(TRACE_ID_DELIMITER_INDEX_2 + 1, TRACE_ID_LENGTH);
        const resTraceId = epochPart + uniquePart;
        if (!api_1.isValidTraceId(resTraceId)) {
          return api_1.INVALID_TRACEID;
        }
        return resTraceId;
      }
      static _parseSpanId(xrayParentId) {
        return api_1.isValidSpanId(xrayParentId) ? xrayParentId : api_1.INVALID_SPANID;
      }
      static _parseTraceFlag(xraySampledFlag) {
        if (xraySampledFlag === NOT_SAMPLED) {
          return api_1.TraceFlags.NONE;
        }
        if (xraySampledFlag === IS_SAMPLED) {
          return api_1.TraceFlags.SAMPLED;
        }
        return null;
      }
    };
    exports.AWSXRayPropagator = AWSXRayPropagator;
  }
});

// node_modules/@opentelemetry/propagator-aws-xray/build/src/index.js
var require_src20 = __commonJS({
  "node_modules/@opentelemetry/propagator-aws-xray/build/src/index.js"(exports) {
    "use strict";
    var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      Object.defineProperty(o, k2, { enumerable: true, get: function() {
        return m[k];
      } });
    } : function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      o[k2] = m[k];
    });
    var __exportStar = exports && exports.__exportStar || function(m, exports2) {
      for (var p in m)
        if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports2, p))
          __createBinding(exports2, m, p);
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    __exportStar(require_AWSXRayPropagator(), exports);
  }
});

// node_modules/@opentelemetry/instrumentation-aws-lambda/build/src/version.js
var require_version4 = __commonJS({
  "node_modules/@opentelemetry/instrumentation-aws-lambda/build/src/version.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.VERSION = void 0;
    exports.VERSION = "0.34.0";
  }
});

// node_modules/@opentelemetry/instrumentation-aws-lambda/build/src/instrumentation.js
var require_instrumentation5 = __commonJS({
  "node_modules/@opentelemetry/instrumentation-aws-lambda/build/src/instrumentation.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.AwsLambdaInstrumentation = exports.traceContextEnvironmentKey = void 0;
    var path = require("path");
    var instrumentation_1 = require_src19();
    var api_1 = require_src();
    var propagator_aws_xray_1 = require_src20();
    var semantic_conventions_1 = require_src2();
    var version_1 = require_version4();
    var awsPropagator = new propagator_aws_xray_1.AWSXRayPropagator();
    var headerGetter2 = {
      keys(carrier) {
        return Object.keys(carrier);
      },
      get(carrier, key) {
        return carrier[key];
      }
    };
    exports.traceContextEnvironmentKey = "_X_AMZN_TRACE_ID";
    var AwsLambdaInstrumentation2 = class extends instrumentation_1.InstrumentationBase {
      constructor(_config = {}) {
        super("@opentelemetry/instrumentation-aws-lambda", version_1.VERSION, _config);
        this._config = _config;
      }
      setConfig(config = {}) {
        this._config = config;
      }
      init() {
        const taskRoot = process.env.LAMBDA_TASK_ROOT;
        const handlerDef = process.env._HANDLER;
        if (!taskRoot || !handlerDef) {
          return [];
        }
        const handler = path.basename(handlerDef);
        const moduleRoot = handlerDef.substr(0, handlerDef.length - handler.length);
        const [module3, functionName] = handler.split(".", 2);
        let filename = path.resolve(taskRoot, moduleRoot, module3);
        if (!filename.endsWith(".js")) {
          filename += ".js";
        }
        return [
          new instrumentation_1.InstrumentationNodeModuleDefinition(
            // NB: The patching infrastructure seems to match names backwards, this must be the filename, while
            // InstrumentationNodeModuleFile must be the module name.
            filename,
            ["*"],
            void 0,
            void 0,
            [
              new instrumentation_1.InstrumentationNodeModuleFile(module3, ["*"], (moduleExports) => {
                api_1.diag.debug("Applying patch for lambda handler");
                if (instrumentation_1.isWrapped(moduleExports[functionName])) {
                  this._unwrap(moduleExports, functionName);
                }
                this._wrap(moduleExports, functionName, this._getHandler());
                return moduleExports;
              }, (moduleExports) => {
                if (moduleExports == void 0)
                  return;
                api_1.diag.debug("Removing patch for lambda handler");
                this._unwrap(moduleExports, functionName);
              })
            ]
          )
        ];
      }
      _getHandler() {
        return (original) => {
          return this._getPatchHandler(original);
        };
      }
      _getPatchHandler(original) {
        api_1.diag.debug("patch handler function");
        const plugin = this;
        return function patchedHandler(event, context, callback) {
          const config = plugin._config;
          const parent = AwsLambdaInstrumentation2._determineParent(event, context, config.disableAwsContextPropagation === true, config.eventContextExtractor || AwsLambdaInstrumentation2._defaultEventContextExtractor);
          const name = context.functionName;
          const span = plugin.tracer.startSpan(name, {
            kind: api_1.SpanKind.SERVER,
            attributes: {
              [semantic_conventions_1.SemanticAttributes.FAAS_EXECUTION]: context.awsRequestId,
              [semantic_conventions_1.SemanticResourceAttributes.FAAS_ID]: context.invokedFunctionArn,
              [semantic_conventions_1.SemanticResourceAttributes.CLOUD_ACCOUNT_ID]: AwsLambdaInstrumentation2._extractAccountId(context.invokedFunctionArn)
            }
          }, parent);
          if (config.requestHook) {
            instrumentation_1.safeExecuteInTheMiddle(() => config.requestHook(span, { event, context }), (e) => {
              if (e)
                api_1.diag.error("aws-lambda instrumentation: requestHook error", e);
            }, true);
          }
          return api_1.context.with(api_1.trace.setSpan(parent, span), () => {
            const wrappedCallback = plugin._wrapCallback(callback, span);
            const maybePromise = instrumentation_1.safeExecuteInTheMiddle(() => original.apply(this, [event, context, wrappedCallback]), (error) => {
              if (error != null) {
                plugin._applyResponseHook(span, error);
                plugin._endSpan(span, error, () => {
                });
              }
            });
            if (typeof (maybePromise === null || maybePromise === void 0 ? void 0 : maybePromise.then) === "function") {
              return maybePromise.then((value) => {
                plugin._applyResponseHook(span, null, value);
                return new Promise((resolve) => plugin._endSpan(span, void 0, () => resolve(value)));
              }, (err) => {
                plugin._applyResponseHook(span, err);
                return new Promise((resolve, reject) => plugin._endSpan(span, err, () => reject(err)));
              });
            }
            return maybePromise;
          });
        };
      }
      setTracerProvider(tracerProvider) {
        super.setTracerProvider(tracerProvider);
        this._forceFlush = this._getForceFlush(tracerProvider);
      }
      _getForceFlush(tracerProvider) {
        if (!tracerProvider)
          return void 0;
        let currentProvider = tracerProvider;
        if (typeof currentProvider.getDelegate === "function") {
          currentProvider = currentProvider.getDelegate();
        }
        if (typeof currentProvider.forceFlush === "function") {
          return currentProvider.forceFlush.bind(currentProvider);
        }
        return void 0;
      }
      _wrapCallback(original, span) {
        const plugin = this;
        return function wrappedCallback(err, res) {
          api_1.diag.debug("executing wrapped lookup callback function");
          plugin._applyResponseHook(span, err, res);
          plugin._endSpan(span, err, () => {
            api_1.diag.debug("executing original lookup callback function");
            return original.apply(this, [err, res]);
          });
        };
      }
      _endSpan(span, err, callback) {
        if (err) {
          span.recordException(err);
        }
        let errMessage;
        if (typeof err === "string") {
          errMessage = err;
        } else if (err) {
          errMessage = err.message;
        }
        if (errMessage) {
          span.setStatus({
            code: api_1.SpanStatusCode.ERROR,
            message: errMessage
          });
        }
        span.end();
        if (this._forceFlush) {
          this._forceFlush().then(() => callback(), () => callback());
        } else {
          api_1.diag.error("Spans may not be exported for the lambda function because we are not force flushing before callback.");
          callback();
        }
      }
      _applyResponseHook(span, err, res) {
        var _a;
        if ((_a = this._config) === null || _a === void 0 ? void 0 : _a.responseHook) {
          instrumentation_1.safeExecuteInTheMiddle(() => this._config.responseHook(span, { err, res }), (e) => {
            if (e)
              api_1.diag.error("aws-lambda instrumentation: responseHook error", e);
          }, true);
        }
      }
      static _extractAccountId(arn) {
        const parts = arn.split(":");
        if (parts.length >= 5) {
          return parts[4];
        }
        return void 0;
      }
      static _defaultEventContextExtractor(event) {
        const httpHeaders = event.headers || {};
        return api_1.propagation.extract(api_1.context.active(), httpHeaders, headerGetter2);
      }
      static _determineParent(event, context, disableAwsContextPropagation, eventContextExtractor) {
        var _a, _b;
        let parent = void 0;
        if (!disableAwsContextPropagation) {
          const lambdaTraceHeader = process.env[exports.traceContextEnvironmentKey];
          if (lambdaTraceHeader) {
            parent = awsPropagator.extract(api_1.context.active(), { [propagator_aws_xray_1.AWSXRAY_TRACE_ID_HEADER]: lambdaTraceHeader }, headerGetter2);
          }
          if (parent) {
            const spanContext = (_a = api_1.trace.getSpan(parent)) === null || _a === void 0 ? void 0 : _a.spanContext();
            if (spanContext && (spanContext.traceFlags & api_1.TraceFlags.SAMPLED) === api_1.TraceFlags.SAMPLED) {
              return parent;
            }
          }
        }
        const extractedContext = instrumentation_1.safeExecuteInTheMiddle(() => eventContextExtractor(event, context), (e) => {
          if (e)
            api_1.diag.error("aws-lambda instrumentation: eventContextExtractor error", e);
        }, true);
        if ((_b = api_1.trace.getSpan(extractedContext)) === null || _b === void 0 ? void 0 : _b.spanContext()) {
          return extractedContext;
        }
        if (!parent) {
          return api_1.ROOT_CONTEXT;
        }
        return parent;
      }
    };
    exports.AwsLambdaInstrumentation = AwsLambdaInstrumentation2;
  }
});

// node_modules/@opentelemetry/instrumentation-aws-lambda/build/src/types.js
var require_types18 = __commonJS({
  "node_modules/@opentelemetry/instrumentation-aws-lambda/build/src/types.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
  }
});

// node_modules/@opentelemetry/instrumentation-aws-lambda/build/src/index.js
var require_src21 = __commonJS({
  "node_modules/@opentelemetry/instrumentation-aws-lambda/build/src/index.js"(exports) {
    "use strict";
    var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      Object.defineProperty(o, k2, { enumerable: true, get: function() {
        return m[k];
      } });
    } : function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      o[k2] = m[k];
    });
    var __exportStar = exports && exports.__exportStar || function(m, exports2) {
      for (var p in m)
        if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports2, p))
          __createBinding(exports2, m, p);
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    __exportStar(require_instrumentation5(), exports);
    __exportStar(require_types18(), exports);
  }
});

// node_modules/@opentelemetry/instrumentation-aws-sdk/build/src/enums.js
var require_enums2 = __commonJS({
  "node_modules/@opentelemetry/instrumentation-aws-sdk/build/src/enums.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.AttributeNames = void 0;
    var AttributeNames;
    (function(AttributeNames2) {
      AttributeNames2["AWS_ERROR"] = "aws.error";
      AttributeNames2["AWS_OPERATION"] = "aws.operation";
      AttributeNames2["AWS_REGION"] = "aws.region";
      AttributeNames2["AWS_SERVICE_API"] = "aws.service.api";
      AttributeNames2["AWS_SERVICE_NAME"] = "aws.service.name";
      AttributeNames2["AWS_SERVICE_IDENTIFIER"] = "aws.service.identifier";
      AttributeNames2["AWS_REQUEST_ID"] = "aws.request.id";
      AttributeNames2["AWS_REQUEST_EXTENDED_ID"] = "aws.request.extended_id";
      AttributeNames2["AWS_SIGNATURE_VERSION"] = "aws.signature.version";
    })(AttributeNames = exports.AttributeNames || (exports.AttributeNames = {}));
  }
});

// node_modules/@opentelemetry/propagation-utils/build/src/pubsub-propagation.js
var require_pubsub_propagation = __commonJS({
  "node_modules/@opentelemetry/propagation-utils/build/src/pubsub-propagation.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var api_1 = require_src();
    var START_SPAN_FUNCTION = Symbol("opentelemetry.pubsub-propagation.start_span");
    var END_SPAN_FUNCTION = Symbol("opentelemetry.pubsub-propagation.end_span");
    var patchArrayFilter = (messages, tracer, loopContext) => {
      const origFunc = messages.filter;
      const patchedFunc = function(...args) {
        const newArray = origFunc.apply(this, args);
        patchArrayForProcessSpans(newArray, tracer, loopContext);
        return newArray;
      };
      Object.defineProperty(messages, "filter", {
        enumerable: false,
        value: patchedFunc
      });
    };
    function isPromise(value) {
      var _a;
      return typeof ((_a = value) === null || _a === void 0 ? void 0 : _a.then) === "function";
    }
    var patchArrayFunction = (messages, functionName, tracer, loopContext) => {
      const origFunc = messages[functionName];
      const patchedFunc = function(...arrFuncArgs) {
        const callback = arrFuncArgs[0];
        const wrappedCallback = function(...callbackArgs) {
          var _a;
          const message = callbackArgs[0];
          const messageSpan = (_a = message === null || message === void 0 ? void 0 : message[START_SPAN_FUNCTION]) === null || _a === void 0 ? void 0 : _a.call(message);
          if (!messageSpan)
            return callback.apply(this, callbackArgs);
          const res = api_1.context.with(api_1.trace.setSpan(loopContext, messageSpan), () => {
            var _a2;
            let result;
            try {
              result = callback.apply(this, callbackArgs);
              if (isPromise(result)) {
                const endSpan = () => {
                  var _a3;
                  return (_a3 = message[END_SPAN_FUNCTION]) === null || _a3 === void 0 ? void 0 : _a3.call(message);
                };
                result.then(endSpan, endSpan);
              }
              return result;
            } finally {
              if (!isPromise(result)) {
                (_a2 = message[END_SPAN_FUNCTION]) === null || _a2 === void 0 ? void 0 : _a2.call(message);
              }
            }
          });
          if (typeof res === "object") {
            const startSpanFunction = Object.getOwnPropertyDescriptor(message, START_SPAN_FUNCTION);
            startSpanFunction && Object.defineProperty(res, START_SPAN_FUNCTION, startSpanFunction);
            const endSpanFunction = Object.getOwnPropertyDescriptor(message, END_SPAN_FUNCTION);
            endSpanFunction && Object.defineProperty(res, END_SPAN_FUNCTION, endSpanFunction);
          }
          return res;
        };
        arrFuncArgs[0] = wrappedCallback;
        const funcResult = origFunc.apply(this, arrFuncArgs);
        if (Array.isArray(funcResult))
          patchArrayForProcessSpans(funcResult, tracer, loopContext);
        return funcResult;
      };
      Object.defineProperty(messages, functionName, {
        enumerable: false,
        value: patchedFunc
      });
    };
    var patchArrayForProcessSpans = (messages, tracer, loopContext = api_1.context.active()) => {
      patchArrayFunction(messages, "forEach", tracer, loopContext);
      patchArrayFunction(messages, "map", tracer, loopContext);
      patchArrayFilter(messages, tracer, loopContext);
    };
    var startMessagingProcessSpan = (message, name, attributes, parentContext, propagatedContext, tracer, processHook) => {
      const links = [];
      const spanContext = api_1.trace.getSpanContext(propagatedContext);
      if (spanContext) {
        links.push({
          context: spanContext
        });
      }
      const spanName = `${name} process`;
      const processSpan = tracer.startSpan(spanName, {
        kind: api_1.SpanKind.CONSUMER,
        attributes: Object.assign(Object.assign({}, attributes), { ["messaging.operation"]: "process" }),
        links
      }, parentContext);
      Object.defineProperty(message, START_SPAN_FUNCTION, {
        enumerable: false,
        writable: true,
        value: () => processSpan
      });
      Object.defineProperty(message, END_SPAN_FUNCTION, {
        enumerable: false,
        writable: true,
        value: () => {
          processSpan.end();
          Object.defineProperty(message, END_SPAN_FUNCTION, {
            enumerable: false,
            writable: true,
            value: () => {
            }
          });
        }
      });
      try {
        processHook === null || processHook === void 0 ? void 0 : processHook(processSpan, message);
      } catch (err) {
        api_1.diag.error("opentelemetry-pubsub-propagation: process hook error", err);
      }
      return processSpan;
    };
    var patchMessagesArrayToStartProcessSpans = ({ messages, tracer, parentContext, messageToSpanDetails, processHook }) => {
      messages.forEach((message) => {
        const { attributes, name, parentContext: propagatedContext } = messageToSpanDetails(message);
        Object.defineProperty(message, START_SPAN_FUNCTION, {
          enumerable: false,
          writable: true,
          value: () => startMessagingProcessSpan(message, name, attributes, parentContext, propagatedContext, tracer, processHook)
        });
      });
    };
    exports.default = {
      patchMessagesArrayToStartProcessSpans,
      patchArrayForProcessSpans
    };
  }
});

// node_modules/@opentelemetry/propagation-utils/build/src/index.js
var require_src22 = __commonJS({
  "node_modules/@opentelemetry/propagation-utils/build/src/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.pubsubPropagation = void 0;
    var pubsub_propagation_1 = require_pubsub_propagation();
    Object.defineProperty(exports, "pubsubPropagation", { enumerable: true, get: function() {
      return pubsub_propagation_1.default;
    } });
  }
});

// node_modules/@opentelemetry/instrumentation-aws-sdk/build/src/services/MessageAttributes.js
var require_MessageAttributes = __commonJS({
  "node_modules/@opentelemetry/instrumentation-aws-sdk/build/src/services/MessageAttributes.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.addPropagationFieldsToAttributeNames = exports.extractPropagationContext = exports.injectPropagationContext = exports.contextGetter = exports.contextSetter = exports.MAX_MESSAGE_ATTRIBUTES = void 0;
    var api_1 = require_src();
    exports.MAX_MESSAGE_ATTRIBUTES = 10;
    var ContextSetter = class {
      set(carrier, key, value) {
        carrier[key] = {
          DataType: "String",
          StringValue: value
        };
      }
    };
    exports.contextSetter = new ContextSetter();
    var ContextGetter = class {
      keys(carrier) {
        return Object.keys(carrier);
      }
      get(carrier, key) {
        var _a, _b;
        return ((_a = carrier === null || carrier === void 0 ? void 0 : carrier[key]) === null || _a === void 0 ? void 0 : _a.StringValue) || ((_b = carrier === null || carrier === void 0 ? void 0 : carrier[key]) === null || _b === void 0 ? void 0 : _b.Value);
      }
    };
    exports.contextGetter = new ContextGetter();
    var injectPropagationContext = (attributesMap) => {
      const attributes = attributesMap !== null && attributesMap !== void 0 ? attributesMap : {};
      if (Object.keys(attributes).length + api_1.propagation.fields().length <= exports.MAX_MESSAGE_ATTRIBUTES) {
        api_1.propagation.inject(api_1.context.active(), attributes, exports.contextSetter);
      } else {
        api_1.diag.warn("aws-sdk instrumentation: cannot set context propagation on SQS/SNS message due to maximum amount of MessageAttributes");
      }
      return attributes;
    };
    exports.injectPropagationContext = injectPropagationContext;
    var extractPropagationContext = (message, sqsExtractContextPropagationFromPayload) => {
      const propagationFields = api_1.propagation.fields();
      const hasPropagationFields = Object.keys(message.MessageAttributes || []).some((attr) => propagationFields.includes(attr));
      if (hasPropagationFields) {
        return message.MessageAttributes;
      } else if (sqsExtractContextPropagationFromPayload && message.Body) {
        try {
          const payload = JSON.parse(message.Body);
          return payload.MessageAttributes;
        } catch (_a) {
          api_1.diag.debug("failed to parse SQS payload to extract context propagation, trace might be incomplete.");
        }
      }
      return void 0;
    };
    exports.extractPropagationContext = extractPropagationContext;
    var addPropagationFieldsToAttributeNames = (messageAttributeNames = [], propagationFields) => {
      return messageAttributeNames.length ? Array.from(/* @__PURE__ */ new Set([...messageAttributeNames, ...propagationFields])) : propagationFields;
    };
    exports.addPropagationFieldsToAttributeNames = addPropagationFieldsToAttributeNames;
  }
});

// node_modules/@opentelemetry/instrumentation-aws-sdk/build/src/services/sqs.js
var require_sqs = __commonJS({
  "node_modules/@opentelemetry/instrumentation-aws-sdk/build/src/services/sqs.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.SqsServiceExtension = void 0;
    var api_1 = require_src();
    var propagation_utils_1 = require_src22();
    var semantic_conventions_1 = require_src2();
    var MessageAttributes_1 = require_MessageAttributes();
    var SqsServiceExtension = class {
      constructor() {
        this.requestPostSpanHook = (request) => {
          var _a, _b, _c;
          switch (request.commandName) {
            case "SendMessage":
              {
                const origMessageAttributes = (_a = request.commandInput["MessageAttributes"]) !== null && _a !== void 0 ? _a : {};
                if (origMessageAttributes) {
                  request.commandInput["MessageAttributes"] = MessageAttributes_1.injectPropagationContext(origMessageAttributes);
                }
              }
              break;
            case "SendMessageBatch":
              {
                (_c = (_b = request.commandInput) === null || _b === void 0 ? void 0 : _b.Entries) === null || _c === void 0 ? void 0 : _c.forEach((messageParams) => {
                  var _a2;
                  messageParams.MessageAttributes = MessageAttributes_1.injectPropagationContext((_a2 = messageParams.MessageAttributes) !== null && _a2 !== void 0 ? _a2 : {});
                });
              }
              break;
          }
        };
        this.responseHook = (response, span, tracer, config) => {
          var _a, _b;
          switch (response.request.commandName) {
            case "SendMessage":
              span.setAttribute(semantic_conventions_1.SemanticAttributes.MESSAGING_MESSAGE_ID, (_a = response === null || response === void 0 ? void 0 : response.data) === null || _a === void 0 ? void 0 : _a.MessageId);
              break;
            case "SendMessageBatch":
              break;
            case "ReceiveMessage": {
              const messages = (_b = response === null || response === void 0 ? void 0 : response.data) === null || _b === void 0 ? void 0 : _b.Messages;
              if (messages) {
                const queueUrl = this.extractQueueUrl(response.request.commandInput);
                const queueName = this.extractQueueNameFromUrl(queueUrl);
                propagation_utils_1.pubsubPropagation.patchMessagesArrayToStartProcessSpans({
                  messages,
                  parentContext: api_1.trace.setSpan(api_1.context.active(), span),
                  tracer,
                  messageToSpanDetails: (message) => ({
                    name: queueName !== null && queueName !== void 0 ? queueName : "unknown",
                    parentContext: api_1.propagation.extract(api_1.ROOT_CONTEXT, MessageAttributes_1.extractPropagationContext(message, config.sqsExtractContextPropagationFromPayload), MessageAttributes_1.contextGetter),
                    attributes: {
                      [semantic_conventions_1.SemanticAttributes.MESSAGING_SYSTEM]: "aws.sqs",
                      [semantic_conventions_1.SemanticAttributes.MESSAGING_DESTINATION]: queueName,
                      [semantic_conventions_1.SemanticAttributes.MESSAGING_DESTINATION_KIND]: semantic_conventions_1.MessagingDestinationKindValues.QUEUE,
                      [semantic_conventions_1.SemanticAttributes.MESSAGING_MESSAGE_ID]: message.MessageId,
                      [semantic_conventions_1.SemanticAttributes.MESSAGING_URL]: queueUrl,
                      [semantic_conventions_1.SemanticAttributes.MESSAGING_OPERATION]: semantic_conventions_1.MessagingOperationValues.PROCESS
                    }
                  }),
                  processHook: (span2, message) => {
                    var _a2;
                    return (_a2 = config.sqsProcessHook) === null || _a2 === void 0 ? void 0 : _a2.call(config, span2, { message });
                  }
                });
                propagation_utils_1.pubsubPropagation.patchArrayForProcessSpans(messages, tracer, api_1.context.active());
              }
              break;
            }
          }
        };
        this.extractQueueUrl = (commandInput) => {
          return commandInput === null || commandInput === void 0 ? void 0 : commandInput.QueueUrl;
        };
        this.extractQueueNameFromUrl = (queueUrl) => {
          if (!queueUrl)
            return void 0;
          const segments = queueUrl.split("/");
          if (segments.length === 0)
            return void 0;
          return segments[segments.length - 1];
        };
      }
      requestPreSpanHook(request) {
        const queueUrl = this.extractQueueUrl(request.commandInput);
        const queueName = this.extractQueueNameFromUrl(queueUrl);
        let spanKind = api_1.SpanKind.CLIENT;
        let spanName;
        const spanAttributes = {
          [semantic_conventions_1.SemanticAttributes.MESSAGING_SYSTEM]: "aws.sqs",
          [semantic_conventions_1.SemanticAttributes.MESSAGING_DESTINATION_KIND]: semantic_conventions_1.MessagingDestinationKindValues.QUEUE,
          [semantic_conventions_1.SemanticAttributes.MESSAGING_DESTINATION]: queueName,
          [semantic_conventions_1.SemanticAttributes.MESSAGING_URL]: queueUrl
        };
        let isIncoming = false;
        switch (request.commandName) {
          case "ReceiveMessage":
            {
              isIncoming = true;
              spanKind = api_1.SpanKind.CONSUMER;
              spanName = `${queueName} receive`;
              spanAttributes[semantic_conventions_1.SemanticAttributes.MESSAGING_OPERATION] = semantic_conventions_1.MessagingOperationValues.RECEIVE;
              request.commandInput.MessageAttributeNames = MessageAttributes_1.addPropagationFieldsToAttributeNames(request.commandInput.MessageAttributeNames, api_1.propagation.fields());
            }
            break;
          case "SendMessage":
          case "SendMessageBatch":
            spanKind = api_1.SpanKind.PRODUCER;
            spanName = `${queueName} send`;
            break;
        }
        return {
          isIncoming,
          spanAttributes,
          spanKind,
          spanName
        };
      }
    };
    exports.SqsServiceExtension = SqsServiceExtension;
  }
});

// node_modules/@opentelemetry/instrumentation-aws-sdk/build/src/services/dynamodb.js
var require_dynamodb = __commonJS({
  "node_modules/@opentelemetry/instrumentation-aws-sdk/build/src/services/dynamodb.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.DynamodbServiceExtension = void 0;
    var api_1 = require_src();
    var semantic_conventions_1 = require_src2();
    var DynamodbServiceExtension = class {
      requestPreSpanHook(normalizedRequest) {
        var _a;
        const spanKind = api_1.SpanKind.CLIENT;
        let spanName;
        const isIncoming = false;
        const operation = normalizedRequest.commandName;
        const spanAttributes = {
          [semantic_conventions_1.SemanticAttributes.DB_SYSTEM]: semantic_conventions_1.DbSystemValues.DYNAMODB,
          [semantic_conventions_1.SemanticAttributes.DB_NAME]: (_a = normalizedRequest.commandInput) === null || _a === void 0 ? void 0 : _a.TableName,
          [semantic_conventions_1.SemanticAttributes.DB_OPERATION]: operation,
          [semantic_conventions_1.SemanticAttributes.DB_STATEMENT]: JSON.stringify(normalizedRequest.commandInput)
        };
        if (operation == "BatchGetItem") {
          spanAttributes[semantic_conventions_1.SemanticAttributes.AWS_DYNAMODB_TABLE_NAMES] = Object.keys(normalizedRequest.commandInput.RequestItems);
        }
        return {
          isIncoming,
          spanAttributes,
          spanKind,
          spanName
        };
      }
      responseHook(response, span, tracer, config) {
        var _a;
        const operation = response.request.commandName;
        if (operation === "BatchGetItem") {
          if (Array.isArray((_a = response.data) === null || _a === void 0 ? void 0 : _a.ConsumedCapacity)) {
            span.setAttribute(semantic_conventions_1.SemanticAttributes.AWS_DYNAMODB_CONSUMED_CAPACITY, response.data.ConsumedCapacity.map((x) => JSON.stringify(x)));
          }
        }
      }
    };
    exports.DynamodbServiceExtension = DynamodbServiceExtension;
  }
});

// node_modules/@opentelemetry/instrumentation-aws-sdk/build/src/services/sns.js
var require_sns = __commonJS({
  "node_modules/@opentelemetry/instrumentation-aws-sdk/build/src/services/sns.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.SnsServiceExtension = void 0;
    var api_1 = require_src();
    var semantic_conventions_1 = require_src2();
    var MessageAttributes_1 = require_MessageAttributes();
    var SnsServiceExtension = class {
      requestPreSpanHook(request) {
        let spanKind = api_1.SpanKind.CLIENT;
        let spanName = `SNS ${request.commandName}`;
        const spanAttributes = {
          [semantic_conventions_1.SemanticAttributes.MESSAGING_SYSTEM]: "aws.sns"
        };
        if (request.commandName === "Publish") {
          spanKind = api_1.SpanKind.PRODUCER;
          spanAttributes[semantic_conventions_1.SemanticAttributes.MESSAGING_DESTINATION_KIND] = semantic_conventions_1.MessagingDestinationKindValues.TOPIC;
          const { TopicArn, TargetArn, PhoneNumber } = request.commandInput;
          spanAttributes[semantic_conventions_1.SemanticAttributes.MESSAGING_DESTINATION] = this.extractDestinationName(TopicArn, TargetArn, PhoneNumber);
          spanName = `${PhoneNumber ? "phone_number" : spanAttributes[semantic_conventions_1.SemanticAttributes.MESSAGING_DESTINATION]} send`;
        }
        return {
          isIncoming: false,
          spanAttributes,
          spanKind,
          spanName
        };
      }
      requestPostSpanHook(request) {
        var _a;
        if (request.commandName === "Publish") {
          const origMessageAttributes = (_a = request.commandInput["MessageAttributes"]) !== null && _a !== void 0 ? _a : {};
          if (origMessageAttributes) {
            request.commandInput["MessageAttributes"] = MessageAttributes_1.injectPropagationContext(origMessageAttributes);
          }
        }
      }
      responseHook(response, span, tracer, config) {
      }
      extractDestinationName(topicArn, targetArn, phoneNumber) {
        if (topicArn || targetArn) {
          const arn = topicArn !== null && topicArn !== void 0 ? topicArn : targetArn;
          try {
            return arn.substr(arn.lastIndexOf(":") + 1);
          } catch (err) {
            return arn;
          }
        } else if (phoneNumber) {
          return phoneNumber;
        } else {
          return "unknown";
        }
      }
    };
    exports.SnsServiceExtension = SnsServiceExtension;
  }
});

// node_modules/@opentelemetry/instrumentation-aws-sdk/build/src/services/lambda.js
var require_lambda = __commonJS({
  "node_modules/@opentelemetry/instrumentation-aws-sdk/build/src/services/lambda.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.LambdaServiceExtension = void 0;
    var api_1 = require_src();
    var semantic_conventions_1 = require_src2();
    var api_2 = require_src();
    var LambdaCommands = class {
    };
    LambdaCommands.Invoke = "Invoke";
    var LambdaServiceExtension = class {
      constructor() {
        this.requestPostSpanHook = (request) => {
          switch (request.commandName) {
            case LambdaCommands.Invoke:
              {
                if (request.commandInput) {
                  request.commandInput.ClientContext = injectLambdaPropagationContext(request.commandInput.ClientContext);
                }
              }
              break;
          }
        };
        this.extractFunctionName = (commandInput) => {
          return commandInput === null || commandInput === void 0 ? void 0 : commandInput.FunctionName;
        };
      }
      requestPreSpanHook(request) {
        const functionName = this.extractFunctionName(request.commandInput);
        let spanAttributes = {};
        let spanName;
        switch (request.commandName) {
          case "Invoke":
            spanAttributes = {
              [semantic_conventions_1.SemanticAttributes.FAAS_INVOKED_NAME]: functionName,
              [semantic_conventions_1.SemanticAttributes.FAAS_INVOKED_PROVIDER]: "aws"
            };
            if (request.region) {
              spanAttributes[semantic_conventions_1.SemanticAttributes.FAAS_INVOKED_REGION] = request.region;
            }
            spanName = `${functionName} ${LambdaCommands.Invoke}`;
            break;
        }
        return {
          isIncoming: false,
          spanAttributes,
          spanKind: api_1.SpanKind.CLIENT,
          spanName
        };
      }
      responseHook(response, span, tracer, config) {
        switch (response.request.commandName) {
          case LambdaCommands.Invoke:
            {
              span.setAttribute(semantic_conventions_1.SemanticAttributes.FAAS_EXECUTION, response.requestId);
            }
            break;
        }
      }
    };
    exports.LambdaServiceExtension = LambdaServiceExtension;
    var injectLambdaPropagationContext = (clientContext) => {
      try {
        const propagatedContext = {};
        api_2.propagation.inject(api_2.context.active(), propagatedContext);
        const parsedClientContext = clientContext ? JSON.parse(Buffer.from(clientContext, "base64").toString("utf8")) : {};
        const updatedClientContext = Object.assign(Object.assign({}, parsedClientContext), { Custom: Object.assign(Object.assign({}, parsedClientContext.Custom), propagatedContext) });
        const encodedClientContext = Buffer.from(JSON.stringify(updatedClientContext)).toString("base64");
        if (encodedClientContext.length > 3583) {
          api_1.diag.warn("lambda instrumentation: cannot set context propagation on lambda invoke parameters due to ClientContext length limitations.");
          return clientContext;
        }
        return encodedClientContext;
      } catch (e) {
        api_1.diag.debug("lambda instrumentation: failed to set context propagation on ClientContext", e);
        return clientContext;
      }
    };
  }
});

// node_modules/@opentelemetry/instrumentation-aws-sdk/build/src/services/ServicesExtensions.js
var require_ServicesExtensions = __commonJS({
  "node_modules/@opentelemetry/instrumentation-aws-sdk/build/src/services/ServicesExtensions.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ServicesExtensions = void 0;
    var sqs_1 = require_sqs();
    var dynamodb_1 = require_dynamodb();
    var sns_1 = require_sns();
    var lambda_1 = require_lambda();
    var ServicesExtensions = class {
      constructor() {
        this.services = /* @__PURE__ */ new Map();
        this.services.set("SQS", new sqs_1.SqsServiceExtension());
        this.services.set("SNS", new sns_1.SnsServiceExtension());
        this.services.set("DynamoDB", new dynamodb_1.DynamodbServiceExtension());
        this.services.set("Lambda", new lambda_1.LambdaServiceExtension());
      }
      requestPreSpanHook(request) {
        const serviceExtension = this.services.get(request.serviceName);
        if (!serviceExtension)
          return {
            isIncoming: false
          };
        return serviceExtension.requestPreSpanHook(request);
      }
      requestPostSpanHook(request) {
        const serviceExtension = this.services.get(request.serviceName);
        if (!(serviceExtension === null || serviceExtension === void 0 ? void 0 : serviceExtension.requestPostSpanHook))
          return;
        return serviceExtension.requestPostSpanHook(request);
      }
      responseHook(response, span, tracer, config) {
        var _a;
        const serviceExtension = this.services.get(response.request.serviceName);
        (_a = serviceExtension === null || serviceExtension === void 0 ? void 0 : serviceExtension.responseHook) === null || _a === void 0 ? void 0 : _a.call(serviceExtension, response, span, tracer, config);
      }
    };
    exports.ServicesExtensions = ServicesExtensions;
  }
});

// node_modules/@opentelemetry/instrumentation-aws-sdk/build/src/services/index.js
var require_services = __commonJS({
  "node_modules/@opentelemetry/instrumentation-aws-sdk/build/src/services/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ServicesExtensions = void 0;
    var ServicesExtensions_1 = require_ServicesExtensions();
    Object.defineProperty(exports, "ServicesExtensions", { enumerable: true, get: function() {
      return ServicesExtensions_1.ServicesExtensions;
    } });
  }
});

// node_modules/@opentelemetry/instrumentation-aws-sdk/build/src/version.js
var require_version5 = __commonJS({
  "node_modules/@opentelemetry/instrumentation-aws-sdk/build/src/version.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.VERSION = void 0;
    exports.VERSION = "0.33.0";
  }
});

// node_modules/@opentelemetry/instrumentation-aws-sdk/build/src/utils.js
var require_utils8 = __commonJS({
  "node_modules/@opentelemetry/instrumentation-aws-sdk/build/src/utils.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.bindPromise = exports.extractAttributesFromNormalizedRequest = exports.normalizeV3Request = exports.normalizeV2Request = exports.removeSuffixFromStringIfExists = void 0;
    var api_1 = require_src();
    var semantic_conventions_1 = require_src2();
    var enums_1 = require_enums2();
    var toPascalCase = (str) => typeof str === "string" ? str.charAt(0).toUpperCase() + str.slice(1) : str;
    var removeSuffixFromStringIfExists = (str, suffixToRemove) => {
      const suffixLength = suffixToRemove.length;
      return (str === null || str === void 0 ? void 0 : str.slice(-suffixLength)) === suffixToRemove ? str.slice(0, str.length - suffixLength) : str;
    };
    exports.removeSuffixFromStringIfExists = removeSuffixFromStringIfExists;
    var normalizeV2Request = (awsV2Request) => {
      var _a, _b, _c;
      const service = awsV2Request === null || awsV2Request === void 0 ? void 0 : awsV2Request.service;
      return {
        serviceName: (_b = (_a = service === null || service === void 0 ? void 0 : service.api) === null || _a === void 0 ? void 0 : _a.serviceId) === null || _b === void 0 ? void 0 : _b.replace(/\s+/g, ""),
        commandName: toPascalCase(awsV2Request === null || awsV2Request === void 0 ? void 0 : awsV2Request.operation),
        commandInput: awsV2Request.params,
        region: (_c = service === null || service === void 0 ? void 0 : service.config) === null || _c === void 0 ? void 0 : _c.region
      };
    };
    exports.normalizeV2Request = normalizeV2Request;
    var normalizeV3Request = (serviceName, commandNameWithSuffix, commandInput, region) => {
      return {
        serviceName: serviceName === null || serviceName === void 0 ? void 0 : serviceName.replace(/\s+/g, ""),
        commandName: exports.removeSuffixFromStringIfExists(commandNameWithSuffix, "Command"),
        commandInput,
        region
      };
    };
    exports.normalizeV3Request = normalizeV3Request;
    var extractAttributesFromNormalizedRequest = (normalizedRequest) => {
      return {
        [semantic_conventions_1.SemanticAttributes.RPC_SYSTEM]: "aws-api",
        [semantic_conventions_1.SemanticAttributes.RPC_METHOD]: normalizedRequest.commandName,
        [semantic_conventions_1.SemanticAttributes.RPC_SERVICE]: normalizedRequest.serviceName,
        [enums_1.AttributeNames.AWS_REGION]: normalizedRequest.region
      };
    };
    exports.extractAttributesFromNormalizedRequest = extractAttributesFromNormalizedRequest;
    var bindPromise = (target, contextForCallbacks, rebindCount = 1) => {
      const origThen = target.then;
      target.then = function(onFulfilled, onRejected) {
        const newOnFulfilled = api_1.context.bind(contextForCallbacks, onFulfilled);
        const newOnRejected = api_1.context.bind(contextForCallbacks, onRejected);
        const patchedPromise = origThen.call(this, newOnFulfilled, newOnRejected);
        return rebindCount > 1 ? exports.bindPromise(patchedPromise, contextForCallbacks, rebindCount - 1) : patchedPromise;
      };
      return target;
    };
    exports.bindPromise = bindPromise;
  }
});

// node_modules/@opentelemetry/instrumentation-aws-sdk/build/src/aws-sdk.js
var require_aws_sdk = __commonJS({
  "node_modules/@opentelemetry/instrumentation-aws-sdk/build/src/aws-sdk.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.AwsInstrumentation = void 0;
    var api_1 = require_src();
    var core_1 = require_src3();
    var enums_1 = require_enums2();
    var services_1 = require_services();
    var version_1 = require_version5();
    var instrumentation_1 = require_src6();
    var utils_1 = require_utils8();
    var semantic_conventions_1 = require_src2();
    var V3_CLIENT_CONFIG_KEY = Symbol("opentelemetry.instrumentation.aws-sdk.client.config");
    var REQUEST_SPAN_KEY = Symbol("opentelemetry.instrumentation.aws-sdk.span");
    var AwsInstrumentation2 = class extends instrumentation_1.InstrumentationBase {
      constructor(config = {}) {
        super("@opentelemetry/instrumentation-aws-sdk", version_1.VERSION, Object.assign({}, config));
        this.servicesExtensions = new services_1.ServicesExtensions();
      }
      setConfig(config = {}) {
        this._config = Object.assign({}, config);
      }
      init() {
        const v3MiddlewareStackFileOldVersions = new instrumentation_1.InstrumentationNodeModuleFile("@aws-sdk/middleware-stack/dist/cjs/MiddlewareStack.js", [">=3.1.0 <3.35.0"], this.patchV3ConstructStack.bind(this), this.unpatchV3ConstructStack.bind(this));
        const v3MiddlewareStackFileNewVersions = new instrumentation_1.InstrumentationNodeModuleFile("@aws-sdk/middleware-stack/dist-cjs/MiddlewareStack.js", [">=3.35.0"], this.patchV3ConstructStack.bind(this), this.unpatchV3ConstructStack.bind(this));
        const v3MiddlewareStack = new instrumentation_1.InstrumentationNodeModuleDefinition("@aws-sdk/middleware-stack", ["^3.1.0"], void 0, void 0, [
          v3MiddlewareStackFileOldVersions,
          v3MiddlewareStackFileNewVersions
        ]);
        const v3SmithyClient = new instrumentation_1.InstrumentationNodeModuleDefinition("@aws-sdk/smithy-client", ["^3.1.0"], this.patchV3SmithyClient.bind(this), this.unpatchV3SmithyClient.bind(this));
        const v2Request = new instrumentation_1.InstrumentationNodeModuleFile("aws-sdk/lib/core.js", ["^2.308.0"], this.patchV2.bind(this), this.unpatchV2.bind(this));
        const v2Module = new instrumentation_1.InstrumentationNodeModuleDefinition("aws-sdk", ["^2.308.0"], void 0, void 0, [v2Request]);
        return [v2Module, v3MiddlewareStack, v3SmithyClient];
      }
      patchV3ConstructStack(moduleExports, moduleVersion) {
        api_1.diag.debug("aws-sdk instrumentation: applying patch to aws-sdk v3 constructStack");
        this._wrap(moduleExports, "constructStack", this._getV3ConstructStackPatch.bind(this, moduleVersion));
        return moduleExports;
      }
      unpatchV3ConstructStack(moduleExports) {
        api_1.diag.debug("aws-sdk instrumentation: applying unpatch to aws-sdk v3 constructStack");
        this._unwrap(moduleExports, "constructStack");
        return moduleExports;
      }
      patchV3SmithyClient(moduleExports) {
        api_1.diag.debug("aws-sdk instrumentation: applying patch to aws-sdk v3 client send");
        this._wrap(moduleExports.Client.prototype, "send", this._getV3SmithyClientSendPatch.bind(this));
        return moduleExports;
      }
      unpatchV3SmithyClient(moduleExports) {
        api_1.diag.debug("aws-sdk instrumentation: applying patch to aws-sdk v3 constructStack");
        this._unwrap(moduleExports.Client.prototype, "send");
        return moduleExports;
      }
      patchV2(moduleExports, moduleVersion) {
        api_1.diag.debug(`aws-sdk instrumentation: applying patch to ${AwsInstrumentation2.component}`);
        this.unpatchV2(moduleExports);
        this._wrap(moduleExports === null || moduleExports === void 0 ? void 0 : moduleExports.Request.prototype, "send", this._getRequestSendPatch.bind(this, moduleVersion));
        this._wrap(moduleExports === null || moduleExports === void 0 ? void 0 : moduleExports.Request.prototype, "promise", this._getRequestPromisePatch.bind(this, moduleVersion));
        return moduleExports;
      }
      unpatchV2(moduleExports) {
        if (instrumentation_1.isWrapped(moduleExports === null || moduleExports === void 0 ? void 0 : moduleExports.Request.prototype.send)) {
          this._unwrap(moduleExports.Request.prototype, "send");
        }
        if (instrumentation_1.isWrapped(moduleExports === null || moduleExports === void 0 ? void 0 : moduleExports.Request.prototype.promise)) {
          this._unwrap(moduleExports.Request.prototype, "promise");
        }
      }
      _startAwsV3Span(normalizedRequest, metadata) {
        var _a, _b;
        const name = (_a = metadata.spanName) !== null && _a !== void 0 ? _a : `${normalizedRequest.serviceName}.${normalizedRequest.commandName}`;
        const newSpan = this.tracer.startSpan(name, {
          kind: (_b = metadata.spanKind) !== null && _b !== void 0 ? _b : api_1.SpanKind.CLIENT,
          attributes: Object.assign(Object.assign({}, utils_1.extractAttributesFromNormalizedRequest(normalizedRequest)), metadata.spanAttributes)
        });
        return newSpan;
      }
      _startAwsV2Span(request, metadata, normalizedRequest) {
        var _a, _b, _c, _d, _e;
        const operation = request.operation;
        const service = request.service;
        const serviceIdentifier = service === null || service === void 0 ? void 0 : service.serviceIdentifier;
        const name = (_a = metadata.spanName) !== null && _a !== void 0 ? _a : `${normalizedRequest.serviceName}.${normalizedRequest.commandName}`;
        const newSpan = this.tracer.startSpan(name, {
          kind: (_b = metadata.spanKind) !== null && _b !== void 0 ? _b : api_1.SpanKind.CLIENT,
          attributes: Object.assign(Object.assign({ [enums_1.AttributeNames.AWS_OPERATION]: operation, [enums_1.AttributeNames.AWS_SIGNATURE_VERSION]: (_c = service === null || service === void 0 ? void 0 : service.config) === null || _c === void 0 ? void 0 : _c.signatureVersion, [enums_1.AttributeNames.AWS_SERVICE_API]: (_d = service === null || service === void 0 ? void 0 : service.api) === null || _d === void 0 ? void 0 : _d.className, [enums_1.AttributeNames.AWS_SERVICE_IDENTIFIER]: serviceIdentifier, [enums_1.AttributeNames.AWS_SERVICE_NAME]: (_e = service === null || service === void 0 ? void 0 : service.api) === null || _e === void 0 ? void 0 : _e.abbreviation }, utils_1.extractAttributesFromNormalizedRequest(normalizedRequest)), metadata.spanAttributes)
        });
        return newSpan;
      }
      _callUserPreRequestHook(span, request, moduleVersion) {
        var _a;
        if ((_a = this._config) === null || _a === void 0 ? void 0 : _a.preRequestHook) {
          const requestInfo = {
            moduleVersion,
            request
          };
          instrumentation_1.safeExecuteInTheMiddle(() => this._config.preRequestHook(span, requestInfo), (e) => {
            if (e)
              api_1.diag.error(`${AwsInstrumentation2.component} instrumentation: preRequestHook error`, e);
          }, true);
        }
      }
      _callUserResponseHook(span, response) {
        var _a;
        const responseHook = (_a = this._config) === null || _a === void 0 ? void 0 : _a.responseHook;
        if (!responseHook)
          return;
        const responseInfo = {
          response
        };
        instrumentation_1.safeExecuteInTheMiddle(() => responseHook(span, responseInfo), (e) => {
          if (e)
            api_1.diag.error(`${AwsInstrumentation2.component} instrumentation: responseHook error`, e);
        }, true);
      }
      _registerV2CompletedEvent(span, v2Request, normalizedRequest, completedEventContext) {
        const self2 = this;
        v2Request.on("complete", (response) => {
          api_1.context.with(completedEventContext, () => {
            var _a;
            if (!v2Request[REQUEST_SPAN_KEY]) {
              return;
            }
            delete v2Request[REQUEST_SPAN_KEY];
            const requestId = response.requestId;
            const normalizedResponse = {
              data: response.data,
              request: normalizedRequest,
              requestId
            };
            self2._callUserResponseHook(span, normalizedResponse);
            if (response.error) {
              span.setAttribute(enums_1.AttributeNames.AWS_ERROR, response.error);
            } else {
              this.servicesExtensions.responseHook(normalizedResponse, span, self2.tracer, self2._config);
            }
            span.setAttribute(enums_1.AttributeNames.AWS_REQUEST_ID, requestId);
            const httpStatusCode = (_a = response.httpResponse) === null || _a === void 0 ? void 0 : _a.statusCode;
            if (httpStatusCode) {
              span.setAttribute(semantic_conventions_1.SemanticAttributes.HTTP_STATUS_CODE, httpStatusCode);
            }
            span.end();
          });
        });
      }
      _getV3ConstructStackPatch(moduleVersion, original) {
        const self2 = this;
        return function constructStack(...args) {
          const stack = original.apply(this, args);
          self2.patchV3MiddlewareStack(moduleVersion, stack);
          return stack;
        };
      }
      _getV3SmithyClientSendPatch(original) {
        return function send(command, ...args) {
          command[V3_CLIENT_CONFIG_KEY] = this.config;
          return original.apply(this, [command, ...args]);
        };
      }
      patchV3MiddlewareStack(moduleVersion, middlewareStackToPatch) {
        if (!instrumentation_1.isWrapped(middlewareStackToPatch.resolve)) {
          this._wrap(middlewareStackToPatch, "resolve", this._getV3MiddlewareStackResolvePatch.bind(this, moduleVersion));
        }
        this._wrap(middlewareStackToPatch, "clone", this._getV3MiddlewareStackClonePatch.bind(this, moduleVersion));
        this._wrap(middlewareStackToPatch, "concat", this._getV3MiddlewareStackClonePatch.bind(this, moduleVersion));
      }
      _getV3MiddlewareStackClonePatch(moduleVersion, original) {
        const self2 = this;
        return function(...args) {
          const newStack = original.apply(this, args);
          self2.patchV3MiddlewareStack(moduleVersion, newStack);
          return newStack;
        };
      }
      _getV3MiddlewareStackResolvePatch(moduleVersion, original) {
        const self2 = this;
        return function(_handler, awsExecutionContext) {
          const origHandler = original.call(this, _handler, awsExecutionContext);
          const patchedHandler = function(command) {
            var _a, _b, _c, _d;
            const clientConfig = command[V3_CLIENT_CONFIG_KEY];
            const regionPromise = (_a = clientConfig === null || clientConfig === void 0 ? void 0 : clientConfig.region) === null || _a === void 0 ? void 0 : _a.call(clientConfig);
            const serviceName = (_b = clientConfig === null || clientConfig === void 0 ? void 0 : clientConfig.serviceId) !== null && _b !== void 0 ? _b : utils_1.removeSuffixFromStringIfExists(awsExecutionContext.clientName, "Client");
            const commandName = (_c = awsExecutionContext.commandName) !== null && _c !== void 0 ? _c : (_d = command.constructor) === null || _d === void 0 ? void 0 : _d.name;
            const normalizedRequest = utils_1.normalizeV3Request(serviceName, commandName, command.input, void 0);
            const requestMetadata = self2.servicesExtensions.requestPreSpanHook(normalizedRequest);
            const span = self2._startAwsV3Span(normalizedRequest, requestMetadata);
            const activeContextWithSpan = api_1.trace.setSpan(api_1.context.active(), span);
            const handlerPromise = new Promise((resolve, reject) => {
              Promise.resolve(regionPromise).then((resolvedRegion) => {
                normalizedRequest.region = resolvedRegion;
                span.setAttribute(enums_1.AttributeNames.AWS_REGION, resolvedRegion);
              }).catch((e) => {
                api_1.diag.debug(`${AwsInstrumentation2.component} instrumentation: failed to extract region from async function`, e);
              }).finally(() => {
                self2._callUserPreRequestHook(span, normalizedRequest, moduleVersion);
                const resultPromise = api_1.context.with(activeContextWithSpan, () => {
                  self2.servicesExtensions.requestPostSpanHook(normalizedRequest);
                  return self2._callOriginalFunction(() => origHandler.call(this, command));
                });
                const promiseWithResponseLogic = resultPromise.then((response) => {
                  var _a2, _b2, _c2, _d2, _e, _f;
                  const requestId = (_b2 = (_a2 = response.output) === null || _a2 === void 0 ? void 0 : _a2.$metadata) === null || _b2 === void 0 ? void 0 : _b2.requestId;
                  if (requestId) {
                    span.setAttribute(enums_1.AttributeNames.AWS_REQUEST_ID, requestId);
                  }
                  const httpStatusCode = (_d2 = (_c2 = response.output) === null || _c2 === void 0 ? void 0 : _c2.$metadata) === null || _d2 === void 0 ? void 0 : _d2.httpStatusCode;
                  if (httpStatusCode) {
                    span.setAttribute(semantic_conventions_1.SemanticAttributes.HTTP_STATUS_CODE, httpStatusCode);
                  }
                  const extendedRequestId = (_f = (_e = response.output) === null || _e === void 0 ? void 0 : _e.$metadata) === null || _f === void 0 ? void 0 : _f.extendedRequestId;
                  if (extendedRequestId) {
                    span.setAttribute(enums_1.AttributeNames.AWS_REQUEST_EXTENDED_ID, extendedRequestId);
                  }
                  const normalizedResponse = {
                    data: response.output,
                    request: normalizedRequest,
                    requestId
                  };
                  self2.servicesExtensions.responseHook(normalizedResponse, span, self2.tracer, self2._config);
                  self2._callUserResponseHook(span, normalizedResponse);
                  return response;
                }).catch((err) => {
                  const requestId = err === null || err === void 0 ? void 0 : err.RequestId;
                  if (requestId) {
                    span.setAttribute(enums_1.AttributeNames.AWS_REQUEST_ID, requestId);
                  }
                  const extendedRequestId = err === null || err === void 0 ? void 0 : err.extendedRequestId;
                  if (extendedRequestId) {
                    span.setAttribute(enums_1.AttributeNames.AWS_REQUEST_EXTENDED_ID, extendedRequestId);
                  }
                  span.setStatus({
                    code: api_1.SpanStatusCode.ERROR,
                    message: err.message
                  });
                  span.recordException(err);
                  throw err;
                }).finally(() => {
                  span.end();
                });
                promiseWithResponseLogic.then((res) => {
                  resolve(res);
                }).catch((err) => reject(err));
              });
            });
            return requestMetadata.isIncoming ? utils_1.bindPromise(handlerPromise, activeContextWithSpan, 2) : handlerPromise;
          };
          return patchedHandler;
        };
      }
      _getRequestSendPatch(moduleVersion, original) {
        const self2 = this;
        return function(callback) {
          if (this[REQUEST_SPAN_KEY]) {
            return original.call(this, callback);
          }
          const normalizedRequest = utils_1.normalizeV2Request(this);
          const requestMetadata = self2.servicesExtensions.requestPreSpanHook(normalizedRequest);
          const span = self2._startAwsV2Span(this, requestMetadata, normalizedRequest);
          this[REQUEST_SPAN_KEY] = span;
          const activeContextWithSpan = api_1.trace.setSpan(api_1.context.active(), span);
          const callbackWithContext = api_1.context.bind(activeContextWithSpan, callback);
          self2._callUserPreRequestHook(span, normalizedRequest, moduleVersion);
          self2._registerV2CompletedEvent(span, this, normalizedRequest, activeContextWithSpan);
          return api_1.context.with(activeContextWithSpan, () => {
            self2.servicesExtensions.requestPostSpanHook(normalizedRequest);
            return self2._callOriginalFunction(() => original.call(this, callbackWithContext));
          });
        };
      }
      _getRequestPromisePatch(moduleVersion, original) {
        const self2 = this;
        return function(...args) {
          if (this[REQUEST_SPAN_KEY]) {
            return original.apply(this, args);
          }
          const normalizedRequest = utils_1.normalizeV2Request(this);
          const requestMetadata = self2.servicesExtensions.requestPreSpanHook(normalizedRequest);
          const span = self2._startAwsV2Span(this, requestMetadata, normalizedRequest);
          this[REQUEST_SPAN_KEY] = span;
          const activeContextWithSpan = api_1.trace.setSpan(api_1.context.active(), span);
          self2._callUserPreRequestHook(span, normalizedRequest, moduleVersion);
          self2._registerV2CompletedEvent(span, this, normalizedRequest, activeContextWithSpan);
          const origPromise = api_1.context.with(activeContextWithSpan, () => {
            self2.servicesExtensions.requestPostSpanHook(normalizedRequest);
            return self2._callOriginalFunction(() => original.call(this, arguments));
          });
          return requestMetadata.isIncoming ? utils_1.bindPromise(origPromise, activeContextWithSpan) : origPromise;
        };
      }
      _callOriginalFunction(originalFunction) {
        var _a;
        if ((_a = this._config) === null || _a === void 0 ? void 0 : _a.suppressInternalInstrumentation) {
          return api_1.context.with(core_1.suppressTracing(api_1.context.active()), originalFunction);
        } else {
          return originalFunction();
        }
      }
    };
    exports.AwsInstrumentation = AwsInstrumentation2;
    AwsInstrumentation2.component = "aws-sdk";
  }
});

// node_modules/@opentelemetry/instrumentation-aws-sdk/build/src/types.js
var require_types19 = __commonJS({
  "node_modules/@opentelemetry/instrumentation-aws-sdk/build/src/types.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
  }
});

// node_modules/@opentelemetry/instrumentation-aws-sdk/build/src/index.js
var require_src23 = __commonJS({
  "node_modules/@opentelemetry/instrumentation-aws-sdk/build/src/index.js"(exports) {
    "use strict";
    var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      Object.defineProperty(o, k2, { enumerable: true, get: function() {
        return m[k];
      } });
    } : function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      o[k2] = m[k];
    });
    var __exportStar = exports && exports.__exportStar || function(m, exports2) {
      for (var p in m)
        if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports2, p))
          __createBinding(exports2, m, p);
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    __exportStar(require_aws_sdk(), exports);
    __exportStar(require_types19(), exports);
  }
});

// src/tracer.ts
var import_instrumentation_http = __toESM(require_src7());
var import_resources = __toESM(require_src8());

// src/utils.ts
function flattenObject(ob, prefix = "", result = {}) {
  if (prefix && typeof ob === "object" && ob !== null && Object.keys(ob).length === 0) {
    result[prefix] = Array.isArray(ob) ? [] : {};
    return result;
  }
  prefix = prefix ? `${prefix}.` : "";
  for (const i in ob) {
    if (Object.prototype.hasOwnProperty.call(ob, i)) {
      if (typeof ob[i] === "object" && ob[i] !== null) {
        flattenObject(ob[i], prefix + i, result);
      } else {
        result[prefix + i] = ob[i];
      }
    }
  }
  return result;
}

// src/tracer.ts
var api = require_src();
var { BatchSpanProcessor } = require_src9();
var {
  OTLPTraceExporter
} = require_src13();
var { NodeTracerProvider } = require_src17();
var { registerInstrumentations } = require_src6();
var {
  AwsLambdaInstrumentation
} = require_src21();
var {
  AwsInstrumentation
} = require_src23();
var provider = new NodeTracerProvider({
  resource: new import_resources.Resource({
    "service.name": process.env.BASELIME_SERVICE_NAME
  })
});
var spanProcessor = new BatchSpanProcessor(
  new OTLPTraceExporter({
    url: "https://otel.baselime.cc/v1",
    headers: {
      "x-api-key": process.env.BASELIME_OTEL_KEY
    }
  })
);
provider.addSpanProcessor(spanProcessor);
provider.register();
function detectService(event) {
  var _a, _b;
  if ((_a = event.requestContext) == null ? void 0 : _a.apiId) {
    return "api";
  }
  if (event.Records && ((_b = event.Records[0]) == null ? void 0 : _b.EventSource) === "aws:sns") {
    return "sns";
  }
}
var headerGetter = {
  keys(carrier) {
    return Object.keys(carrier);
  },
  get(carrier, key) {
    return carrier[key];
  }
};
var snsGetter = {
  keys(carrier) {
    return Object.keys(carrier);
  },
  get(carrier, key) {
    var _a;
    console.log(carrier, key);
    return (_a = carrier[key]) == null ? void 0 : _a.Value;
  }
};
registerInstrumentations({
  instrumentations: [
    new AwsInstrumentation({ suppressInternalInstrumentation: true }),
    new import_instrumentation_http.HttpInstrumentation({}),
    new AwsLambdaInstrumentation({
      disableAwsContextPropagation: true,
      requestHook: (span, { event, context }) => {
        span.setAttribute("faas.name", context.functionName);
        span.setAttributes(flattenObject(event, "faas.event"));
      },
      responseHook: (span, { err, res }) => {
        if (err instanceof Error)
          span.setAttribute("faas.error", err.message);
        if (res)
          span.setAttributes(flattenObject(res, "faas.res"));
      },
      eventContextExtractor: (event) => {
        switch (detectService(event)) {
          case "api":
            const httpHeaders = event.headers || {};
            return api.propagation.extract(api.context.active(), httpHeaders, headerGetter);
          case "sns":
            return api.propagation.extract(api.context.active(), event.Records[0].Sns.MessageAttributes, snsGetter);
        }
        return api.propagation.extract(api.context.active(), {}, headerGetter);
      }
    })
  ]
});
