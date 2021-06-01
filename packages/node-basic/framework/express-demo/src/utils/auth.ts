import { secrets } from '../config';
import jwt from 'jsonwebtoken';

export const newToken = (user: any) => {
  return jwt.sign({ id: user.id }, secrets.jwt, {
    expiresIn: secrets.jwtExp,
  });
};
export const verifyToken = (token: string) => {
  return new Promise<{ id: string }>((resolve, reject) => {
    jwt.verify(token, secrets.jwt, (err, payload) => {
      if (err) return reject(err);
      resolve(payload as any);
    });
  });
};
