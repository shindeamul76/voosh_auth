"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const development_logger_lib_1 = require("./development-logger-lib");
const production_logger_lib_1 = require("./production-logger-lib");
let logger = null;
if (process.env.NODE_ENV !== 'production') {
    logger = (0, production_logger_lib_1.prodLogger)();
}
if (process.env.NODE_ENV === 'development') {
    logger = (0, development_logger_lib_1.devLogger)();
}
exports.default = logger;
