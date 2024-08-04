import { User } from '@prisma/client';

export default interface IpromiseResponse {
  status: number;
  message: string;
  data: User;
}
