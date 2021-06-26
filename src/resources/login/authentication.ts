import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Response, Request, NextFunction } from 'express';
import { StatusCodes, getReasonPhrase } from 'http-status-codes';
import { CONFIG } from '../../common/config';
import { IUser } from '../users/user.model';
import { ErrorWithStatus } from '../../common/ErrorWithStatus';

const { JWT_SECRET_KEY } = CONFIG;

export const createJWTtoken = async (bodyPassword: string, user: IUser) => {
  const isPasswordMatching = await bcrypt.compare(bodyPassword, user.password);
  if (isPasswordMatching && JWT_SECRET_KEY) {
    return jwt.sign(
      {
        userId: user.id,
        login: user.login
      },
      JWT_SECRET_KEY,
      {
        expiresIn: '4h'
      }
    );
  }

  return null;
};

export const authMiddleware = (req: Request, _res: Response, next: NextFunction) => {
  const { authorization } = req.headers;

  if (authorization) {
    const token = authorization.split(' ')[1];

    if (token && JWT_SECRET_KEY) {
      jwt.verify(token, JWT_SECRET_KEY, (err) => {
        if (err) {
          return next(new ErrorWithStatus(getReasonPhrase(StatusCodes.UNAUTHORIZED), StatusCodes.UNAUTHORIZED));
        }

        return next();
      });
    }
  } else {
    next(new ErrorWithStatus(getReasonPhrase(StatusCodes.UNAUTHORIZED), StatusCodes.UNAUTHORIZED));
  }
};
