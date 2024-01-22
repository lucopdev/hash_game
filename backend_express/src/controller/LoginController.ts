import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { Request, Response } from 'express';
import connectDB, { prisma } from '../lib/connectDB';
import generateToken from '../utils/token';
import z from 'zod';
import bcrypt from 'bcryptjs';

dotenv.config();
connectDB();

const postLogin = async (req: Request, res: Response) => {
  try {
    const createUserSchema = z.object({
      username: z.string(),
      password: z.string(),
    });

    const { username, password } = createUserSchema.parse(req.body);

    const user = await prisma.user.findFirstOrThrow({ where: { username } });
    if (!user) {
      return res.status(404).json({ message: `${username} doesn't exist.` });
    }

    if (password) {
      const isPasswordTrue = await bcrypt.compare(password, user.password);
      if (isPasswordTrue) {
        const secretKey: string = process.env.SECRET || 'secret';
        const token = generateToken(username, secretKey);

        process.env.TOKEN = token;

        return res
          .status(200)
          .json({ status: 'SUCCESSFUL', message: `User ${username} is logged.`, token });
      }
    } else {
      return res.status(400).json({ status: 'ERROR', message: 'password is missing' });
    }
  } catch (error) {
    return res.status(500).json({ status: 'ERROR', error });
  }
};

export default {
  postLogin,
};
