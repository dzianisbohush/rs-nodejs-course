import express from 'express';
import { StatusCodes, getReasonPhrase } from 'http-status-codes';
import * as usersService from '../users/user.service';
import { ErrorWithStatus } from '../../common/ErrorWithStatus';
import { createJWTtoken } from './authentication';

const router = express.Router();

/**
 * Login (POST) a user
 */
router.route('/').post(async (req, res, next) => {
  try {
    const user = await usersService.getUserByLogin(req.body.login);
    if (user && req.body.login && req.body.password) {
      const token = await createJWTtoken(req.body.password, user);

      if (token) {
        return res.status(200).send({ token });
      }

     return next(new ErrorWithStatus(getReasonPhrase(StatusCodes.FORBIDDEN), StatusCodes.FORBIDDEN));
    }
   return  next(new ErrorWithStatus(getReasonPhrase(StatusCodes.UNAUTHORIZED), StatusCodes.UNAUTHORIZED));
  } catch (err) {
    next(err);
  }
});

export default router;
