"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const connectDB_1 = __importStar(require("../lib/connectDB"));
const token_1 = __importDefault(require("../utils/token"));
const zod_1 = __importDefault(require("zod"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
dotenv_1.default.config();
(0, connectDB_1.default)();
const postLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const createUserSchema = zod_1.default.object({
            username: zod_1.default.string(),
            password: zod_1.default.string(),
        });
        const { username, password } = createUserSchema.parse(req.body);
        const user = yield connectDB_1.prisma.user.findFirstOrThrow({ where: { username } });
        if (!user) {
            return res.status(404).json({ message: `${username} doesn't exist.` });
        }
        if (password) {
            const isPasswordTrue = yield bcryptjs_1.default.compare(password, user.password);
            if (isPasswordTrue) {
                const secretKey = process.env.SECRET || 'secret';
                const token = (0, token_1.default)(username, secretKey);
                process.env.TOKEN = token;
                return res
                    .status(200)
                    .json({ status: 'SUCCESSFUL', message: `User ${username} is logged.`, token });
            }
        }
        else {
            return res.status(400).json({ status: 'ERROR', message: 'password is missing' });
        }
    }
    catch (error) {
        return res.status(500).json({ status: 'ERROR', error });
    }
});
exports.default = {
    postLogin,
};
//# sourceMappingURL=LoginController.js.map