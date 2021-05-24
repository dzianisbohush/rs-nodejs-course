import express from 'express';
import { User } from './user.model.js';
import * as usersService from './user.service.js';
import { unAssignUserId } from '../tasks/task.service.js';

const router = express.Router();

/**
 * GET All users
 */
router.route('/').get(async (req, res) => {
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
    res.status(201).send(User.toResponse(user));
  } else {
    res.status(400).end('User is not created');
  }
});

/**
 * GET user by id
 */
router.route('/:id').get(async (req, res) => {
  const user = await usersService.getUserById(req.params.id);

  if (user) {
    res.status(200).send(User.toResponse(user));
  } else {
    res.status(404).end('User not found');
  }
});

/**
 * Update (PUT) user data
 */
router.route('/:id').put(async (req, res) => {
  const updatedUserData = await usersService.updateUser(req.params.id, req.body);

  if (updatedUserData) {
    res.status(200).send(User.toResponse(updatedUserData));
  } else {
    res.status(404).end('User not updated');
  }
});

/**
 * Delete user by id
 */
router.route('/:id').delete(async (req, res) => {
  try {
    const userId = req.params.id;

    // deleting user
    await usersService.deleteUserById(userId);

    // setting userId to null for deleted users tasks
    unAssignUserId(userId);

    res.status(204).send('The user has been deleted');
  } catch (e) {
    res.status(404).end('User is not deleted');
  }
});

export default router;
