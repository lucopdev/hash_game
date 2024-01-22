import dotenv from 'dotenv';
import { Request, Response } from 'express';
import connectDB, { prisma } from '../lib/connectDB';
import INewUser from '../interfaces/INewUser';
import z from 'zod';
import bcrypt from 'bcryptjs';

dotenv.config();
connectDB();

const getAllUsers = async (_req: Request, res: Response): Promise<Response> => {
  const users = await prisma.user.findMany();
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
};

const createUser = async (req: Request, res: Response): Promise<Response> => {
  try {
    const createUserSchema = z.object({
      username: z.string(),
      password: z.string().min(6, { message: 'Password must be 6 or more characters long.' }),
    });

    const { username, password } = createUserSchema.parse(req.body);
    const cryptedPassword = await bcrypt.hash(password, 10);

    const newUser: INewUser = {
      data: {
        username: username,
        password: cryptedPassword,
      },
    };

    const user = await prisma.user.create(newUser);
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
  } catch (error) {
    return res.status(500).json({ status: 'ERROR', error });
  }
};

export default {
  getAllUsers,
  createUser,
};
