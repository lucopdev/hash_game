import dotenv from 'dotenv';
import { Request, Response } from 'express';
import connectDB, { prisma } from '../lib/connectDB';

dotenv.config();
connectDB();

const tokenComparison = async (req: Request, res: Response): Promise<Response> => {
  const { token } = req.body;

  try {
    const isTokenValid = process.env.TOKEN === token;

    if (!isTokenValid)
      return res.status(404).json({ status: 'ERROR', message: 'Token is NOT valid.' });

    return res.status(200).json({ status: 'SUCCESSFUL', message: 'Token is valid.' });
  } catch (error) {
    return res.status(500).json({ status: 'ERROR', error });
  }
};

export default {
  tokenComparison,
};
