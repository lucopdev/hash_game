import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
dotenv.config();

export default function generateToken(email: string, privateKey: string) {
  const token = jwt.sign({ email }, privateKey, {
    algorithm: 'HS256',
    expiresIn: '1m',
  });
  
  process.env.TOKEN = token;

  return token;
}
