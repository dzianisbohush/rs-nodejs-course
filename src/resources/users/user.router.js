const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');

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
    res.status(200).send(User.toResponse(user));
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
  }
  else {
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
  }
  else {
    res.status(404).end('User not updated');
  }
});

/**
 * Delete user by id
 */
router.route('/:id').delete(async () => {
  // @todo When DELETEs User, all Tasks where User is assignee should be updated to put
  //  userId = null.
});

module.exports = router;
