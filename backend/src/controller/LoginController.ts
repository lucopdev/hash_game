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
      email: z.string(),
      password: z.string(),
    });

    const { email, password } = createUserSchema.parse(req.body);

    const user = await prisma.user.findFirstOrThrow({ where: { email: email } });

    if (!user) {
      return res.status(404).json({ message: `${email} doesn't exist.` });
    }

    if (password) {
      const isPasswordTrue = await bcrypt.compare(password, user.password);
      if (isPasswordTrue) {
        const secretKey: string = process.env.SECRET || 'secret';
        const token = generateToken(email, secretKey);

        process.env.TOKEN = token;

        return res.status(200).json({
          status: 'SUCCESSFUL',
          message: `User ${email} is logged.`,
          token,
          username: user.username,
        });
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
