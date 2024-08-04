import dotenv from 'dotenv';
import { Request, Response, NextFunction } from 'express';
import connectDB, { prisma } from '../lib/connectDB';

dotenv.config();
connectDB();

// authMiddleware.ts

dotenv.config();

const tokenComparisonMiddleware = (req: Request, res: Response, next: NextFunction): any => {
  const { token } = req.body;
  console.log(token);

  try {
    // TENHO QUE LER O TOKEN COM A FUNÇÃO DE DECODIFICAÇÃO E COMPARAR SE EXISTE ALGUÉM COM O PAYLOAD DO TOKEN.

    // const isTokenValid = process.env.TOKEN === token;
    
    // if (!isTokenValid)
    //   return res.status(404).json({ status: 'ERROR', message: 'Token is NOT valid.' });

    return res.status(200).json({ status: 'SUCCESSFUL', message: 'Token is valid.' });
  } catch (error) {
    return res.status(500).json({ status: 'ERROR', error });
  } finally {
    next(); // Chame next() para passar para o próximo middleware ou rota
  }
};

export default tokenComparisonMiddleware;
