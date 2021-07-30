import { User } from 'src/user/user.interface';

export interface AuthType {
  usuario: User;
  token: string;
}
