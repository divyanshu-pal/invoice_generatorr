import { Request } from 'express';
import { IUser } from './models/User'; // Adjust the path according to your project structure

declare global {
    namespace Express {
      interface Request {
        user?: IUser;
      }
    }
  }