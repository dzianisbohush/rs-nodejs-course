const User = require('./user.model')

let USERS = []

/**
 * Getting all users
 *
 * @category Resources / User
 * @returns {Promise<Array>} all users list
 */
const getAll = async () => USERS

/**
 * Adding new user
 *
 * @category Resources / User
 * @param {User} user - new user data
 * @returns {Promise<User>} created user
 */
const createUser = async user => {
  const createdUser = new User(user);
  USERS.push(createdUser);

  return createdUser;
};

/**
 * Getting user by id
 *
 * @category Resources / User
 * @param {string} id - id of  user
 * @returns {Promise<User>} user with particular id
 */
const getUserById = async id => USERS.find(user => user.id === id)

/**
 * Updating user data
 *
 * @category Resources / User
 * @param {string} id - id of user
 * @param {Partial<User>} updatedUserData - new user data
 * @returns {Promise<User>} updated user info
 */
const updateUser = async (id, updatedUserData) => {
  let updatedUser = null

  USERS = USERS.map(user => {
    if(user.id  === id) {
      updatedUser = {...user, ...updatedUserData}

     return updatedUser
    }

    return user
  })

  return updatedUser
};

/**
 * Deleting user by id
 *
 * @category Resources / User
 * @param {string} id - id of user
 * @returns {Promise<void>}
 */
const deleteUserById = async (id) => {
  const index = USERS.findIndex(user => user.id === id);

  if(index !== -1) {
    USERS.splice(index, 1)
  }
};

module.exports = {
  getAll,
  createUser,
  getUserById,
  updateUser,
  deleteUserById,
  USERS
};
