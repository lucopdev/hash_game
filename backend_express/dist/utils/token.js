"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
dotenv_1.default.config();
function generateToken(username, privateKey) {
    const token = jsonwebtoken_1.default.sign({ username }, privateKey, {
        algorithm: 'HS256',
        expiresIn: '1m',
    });
    process.env.TOKEN = token;
    return token;
}
exports.default = generateToken;
//# sourceMappingURL=token.js.map