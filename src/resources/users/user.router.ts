import express from 'express';
import { StatusCodes } from 'http-status-codes';
import { User } from './user.model';
import * as usersService from './user.service';
import { unAssignUserId } from '../tasks/task.service';

const router = express.Router();

/**
 * GET All users
 */
router.route('/').get(async (_, res) => {
  const users = await usersService.getAll();
  // map user fields to exclude secret fields like "password"
  res.json(users.map(User.toResponse));
});

/**
 * Adding (POST) a new user
 */
router.route('/').post(async (req, res) => {
  const user = await usersService.createUser(req.body);

  if (user) {
    res.status(StatusCodes.CREATED).send(User.toResponse(user));
  } else {
    res.status(StatusCodes.BAD_REQUEST).end('User is not created');
  }
});

/**
 * GET user by id
 */
router.route('/:userId').get(async (req, res) => {
  let user;
  const { userId } = req.params;

  if (userId) {
    user = await usersService.getUserById(userId);
  }

  if (user) {
    res.status(StatusCodes.OK).send(User.toResponse(user));
  } else {
    res.status(StatusCodes.NOT_FOUND).end('User not found');
  }
});

/**
 * Update (PUT) user data
 */
router.route('/:userId').put(async (req, res) => {
  let updatedUserData;
  const { userId } = req.params;

  if (userId) {
    updatedUserData = await usersService.updateUser(userId, req.body);
  }

  if (updatedUserData) {
    res.status(StatusCodes.OK).send(User.toResponse(updatedUserData));
  } else {
    res.status(StatusCodes.NOT_FOUND).end('User not updated');
  }
});

/**
 * Delete user by id
 */
router.route('/:userId').delete(async (req, res) => {
  try {
    const { userId } = req.params;

    if (userId) {
      // deleting user
      await usersService.deleteUserById(userId);

      // setting userId to null for deleted users tasks
      unAssignUserId(userId);
    }

    res.status(StatusCodes.NO_CONTENT).send('The user has been deleted');
  } catch (e) {
    res.status(StatusCodes.NOT_FOUND).end('User is not deleted');
  }
});

export default router;
