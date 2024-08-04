"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const UserController_1 = __importDefault(require("./controller/UserController"));
const LoginController_1 = __importDefault(require("./controller/LoginController"));
const AuthController_1 = __importDefault(require("./controller/AuthController"));
const corsConfig_1 = __importDefault(require("./utils/corsConfig"));
const app = (0, express_1.default)();
exports.app = app;
app.use(express_1.default.json());
app.use(corsConfig_1.default);
app.get('/', (_req, res) => {
    res.send({ API: 'up!' });
});
// Add um middleware de autenticação
app.post('/register', UserController_1.default.createUser);
app.post('/login', LoginController_1.default.postLogin);
app.post('/api/auth', AuthController_1.default.tokenComparison);
app.get('/api/users', UserController_1.default.getAllUsers);
//# sourceMappingURL=app.js.map