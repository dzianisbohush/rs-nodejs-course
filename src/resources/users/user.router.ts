import express from 'express';
import { StatusCodes, getReasonPhrase } from 'http-status-codes';
import { User } from './user.model';
import * as usersService from './user.service';
import { unAssignUserId } from '../tasks/task.service';
import { ErrorWithStatus } from '../../common/ErrorWithStatus';

const router = express.Router();

/**
 * GET All users
 */
router.route('/').get(async (_req, res, next) => {
  try {
    const users = await usersService.getAll();
    // map user fields to exclude secret fields like "password"
    res.json(users.map(User.toResponse));
  } catch (err) {
    next(err);
  }
});

/**
 * Adding (POST) a new user
 */
router.route('/').post(async (req, res, next) => {
  try {
    const user = await usersService.createUser(req.body);

    if (user) {
      res.status(StatusCodes.CREATED).send(User.toResponse(user));
    } else {
      next(new ErrorWithStatus(getReasonPhrase(StatusCodes.NOT_FOUND), StatusCodes.NOT_FOUND));
    }
  } catch (err) {
    next(err);
  }
});

/**
 * GET user by id
 */
router.route('/:userId').get(async (req, res, next) => {
  try {
    let user;
    const { userId } = req.params;

    if (userId) {
      user = await usersService.getUserById(userId);
    }

    if (user) {
      res.status(StatusCodes.OK).send(User.toResponse(user));
    } else {
      next(new ErrorWithStatus(getReasonPhrase(StatusCodes.NOT_FOUND), StatusCodes.NOT_FOUND));
    }
  } catch (err) {
    next(err);
  }
});

/**
 * Update (PUT) user data
 */
router.route('/:userId').put(async (req, res, next) => {
  try {
    let updatedUserData;
    const { userId } = req.params;

    if (userId) {
      updatedUserData = await usersService.updateUser(userId, req.body);
    }

    if (updatedUserData) {
      res.status(StatusCodes.OK).send(User.toResponse(updatedUserData));
    } else {
      next(new ErrorWithStatus(getReasonPhrase(StatusCodes.NOT_FOUND), StatusCodes.NOT_FOUND));
    }
  } catch (err) {
    next(err);
  }
});

/**
 * Delete user by id
 */
router.route('/:userId').delete(async (req, res, next) => {
  try {
    const { userId } = req.params;

    if (userId) {
      // deleting user
      await usersService.deleteUserById(userId);

      // setting userId to null for deleted users tasks
      unAssignUserId(userId);
    }

    res.status(StatusCodes.NO_CONTENT).send(getReasonPhrase(StatusCodes.NO_CONTENT));
  } catch (err) {
    next(err);
  }
});

export default router;
