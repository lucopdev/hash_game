"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.corsOptions = void 0;
const cors_1 = __importDefault(require("cors"));
exports.corsOptions = {
    origin: ['http://hash.silvergames.com.br:40000', 'http://hash.silvergames.com.br:40001'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: [
        'Access-Control-Allow-Headers',
        'X-Requested-With',
        'X-Access-Token',
        'Content-Type',
        'Host',
        'Accept',
        'Connection',
        'Cache-Control',
    ],
    credentials: true,
    optionsSuccessStatus: 200,
};
exports.default = (0, cors_1.default)(exports.corsOptions);
//# sourceMappingURL=corsConfig.js.map