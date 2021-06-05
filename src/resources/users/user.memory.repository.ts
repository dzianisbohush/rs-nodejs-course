import { User } from './user.model';

let USERS: User[] = [];

/**
 * Getting all users
 *
 * @category Resources / User
 * @returns {Promise<Array>} all users list
 */
export const getAll = async (): Promise<User[]> => USERS;

/**
 * Adding new user
 *
 * @category Resources / User
 * @param {User} user - new user data
 * @returns {Promise<User>} created user
 */
export const createUser = async (user: Partial<User>): Promise<User> => {
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
export const getUserById = async (id: string): Promise<User | null> => {
  const foundUser = USERS.find(user => user.id === id);

  return foundUser || null;
};

/**
 * Updating user data
 *
 * @category Resources / User
 * @param {string} id - id of user
 * @param {Partial<User>} updatedUserData - new user data
 * @returns {Promise<User>} updated user info
 */
export const updateUser = async (id: string, updatedUserData: Partial<User>): Promise<User | null> => {
  let updatedUser;

  USERS = USERS.map(user => {
    if (user.id === id) {
      updatedUser = { ...user, ...updatedUserData };

      return updatedUser;
    }

    return user;
  });

  return updatedUser || null;
};

/**
 * Deleting user by id
 *
 * @category Resources / User
 * @param {string} id - id of user
 * @returns {Promise<void>}
 */
export const deleteUserById = async (id: string): Promise<void> => {
  const index = USERS.findIndex(user => user.id === id);

  if (index !== -1) {
    USERS.splice(index, 1);
  }
};
