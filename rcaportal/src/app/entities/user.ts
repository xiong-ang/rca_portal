import { Role } from './role';

export class User {
  id: number;
  email: string;
  password: string;
  userName: string;
  role: Role;
  token?: string;
}
