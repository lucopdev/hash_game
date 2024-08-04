import express from 'express';
import { Application } from 'express';
import { UserController, LoginController } from './controller/Index';

import corsConfig from './utils/corsConfig';
import authToken from './middleware/authToken';

const app: Application = express();

app.use(express.json());
app.use(corsConfig);

app.get('/', (_req, res) => {
  res.send({ API: 'up!' });
});

// Add um middleware de autenticação
app.post('/register', UserController.createUser);
app.post('/login', LoginController.postLogin);
app.get('/api/users', authToken, UserController.getAllUsers);

export { app };
