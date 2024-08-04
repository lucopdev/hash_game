"use strict";
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
exports.prisma = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const client_1 = require("@prisma/client");
dotenv_1.default.config();
exports.prisma = global.prisma || new client_1.PrismaClient({ log: ['info'] });
if (process.env.NODE_ENV !== 'production') {
    global.prisma = exports.prisma;
}
function connectDB() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield exports.prisma.$connect();
            console.log('? Database connected successfully');
        }
        catch (error) {
            console.log(error);
            yield exports.prisma.$disconnect();
            process.exit(1);
        }
        finally {
            yield exports.prisma.$disconnect();
        }
    });
}
exports.default = connectDB;
//# sourceMappingURL=connectDB.js.map