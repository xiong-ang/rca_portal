import { Role } from './role';

export class User {
  id: number;
  username: string;
  password: string;
  userName: string; // Not use.
  role: Role;
  token?: string;
}
