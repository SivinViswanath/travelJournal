import { JwtPayload } from 'jsonwebtoken';
import { Request } from 'express';

export interface AuthRequest extends Request {
  user: JwtPayload & { userId: string };
}
