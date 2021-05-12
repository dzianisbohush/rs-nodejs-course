let {USERS} = require('./UsersData')
const User = require('./user.model')

const getAll = async () => USERS

const createUser = async user => {
  const createdUser = new User(user);
  USERS.push(createdUser);
  return createdUser;
};

const getUserById = async id => USERS.find(user => user.id === id)

const updateUser = async (id, updatedUserData) => {
  USERS = USERS.map(user => {
    if(user.id  === id) {
     return {...user, ...updatedUserData}
    }

    return user
  })

  return USERS.find(user => user.id === id);
};

const deleteUserById = async () => {};

module.exports = {
  getAll,
  createUser,
  getUserById,
  updateUser,
  deleteUserById
};
