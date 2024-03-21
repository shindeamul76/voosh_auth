"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.devLogger = void 0;
const winston_1 = require("winston");
const { combine, timestamp, printf } = winston_1.format;
const myFormat = printf(({ level, message, timestamp }) => {
    return `[${level}] ${timestamp} : ${message}`;
});
const devLogger = () => {
    return (0, winston_1.createLogger)({
        level: 'info',
        format: combine(winston_1.format.colorize(), timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), myFormat),
        transports: [
            new winston_1.transports.Console(),
            new winston_1.transports.File({ filename: 'error.log', level: 'error' }),
            new winston_1.transports.File({ filename: 'combined.log' }),
        ],
    });
};
exports.devLogger = devLogger;
