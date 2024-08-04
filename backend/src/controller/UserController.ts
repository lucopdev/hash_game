import dotenv from 'dotenv';
import { Request, Response } from 'express';
import connectDB, { prisma } from '../lib/connectDB';
import InewUser from '../interfaces/InewUser';
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
      email: user.email,
      username: user.username,
      created_at: user.createdAt,
    };
  });

  return res.status(200).json(userResponse);
};

const createUser = async (req: Request, res: Response): Promise<Response> => {
  try {
    const createUserSchema = z.object({
      email: z.string().email({ message: 'invalid e-mail' }),
      username: z.string().min(6, { message: 'Username must have 6 to 10 characters.' }).max(10),
      password: z.string().min(8, { message: 'Password must have 8 or more characters.' }),
    });

    const { email, username, password } = createUserSchema.parse(req.body);
    const cryptedPassword = await bcrypt.hash(password, 10);

    const newUser: InewUser = {
      data: {
        email: email,
        username: username,
        password: cryptedPassword,
      },
    };

    const userFound = await prisma.user.findFirst({
      where: { OR: [{ email: newUser.data.email }, { username: newUser.data.username }] },
    });

    if (userFound?.email === newUser.data.email) {
      return res
        .status(400)
        .json({ status: 'ERROR', error: { issues: [{ message: 'Email already registered' }] } });
    } else if (userFound?.username === newUser.data.username) {
      return res
        .status(400)
        .json({ status: 'ERROR', error: { issues: [{ message: 'Username already registered' }] } });
    }

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
