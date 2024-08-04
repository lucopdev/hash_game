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
const zod_1 = __importDefault(require("zod"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
dotenv_1.default.config();
(0, connectDB_1.default)();
const getAllUsers = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield connectDB_1.prisma.user.findMany();
    if (!users) {
        return res.status(404).json({ message: 'User not found.' });
    }
    const userResponse = users.map((user) => {
        return {
            username: user.username,
            created_at: user.createdAt,
        };
    });
    return res.status(200).json(userResponse);
});
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const createUserSchema = zod_1.default.object({
            username: zod_1.default.string(),
            password: zod_1.default.string().min(6, { message: 'Password must be 6 or more characters long.' }),
        });
        const { username, password } = createUserSchema.parse(req.body);
        const cryptedPassword = yield bcryptjs_1.default.hash(password, 10);
        const newUser = {
            data: {
                username: username,
                password: cryptedPassword,
            },
        };
        const user = yield connectDB_1.prisma.user.create(newUser);
        const userResponse = {
            id: user.id,
            username: user.username,
            user_score: user.user_score,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
        };
        if (!user) {
            return res.status(400).json({ status: 'ERROR', message: 'User couldn"t be registered' });
        }
        return res.status(200).json({ status: 'SUCCESSFUL', data: userResponse });
    }
    catch (error) {
        return res.status(500).json({ status: 'ERROR', error });
    }
});
exports.default = {
    getAllUsers,
    createUser,
};
//# sourceMappingURL=UserController.js.map