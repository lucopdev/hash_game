import cors from 'cors';

export const corsOptions = {
  origin: [
    'http://hash.silvergames.com.br:40000',
    'http://hash.silvergames.com.br:40001',
    'http://localhost:40000',
    'http://localhost:40001',
  ],
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

export default cors(corsOptions);
