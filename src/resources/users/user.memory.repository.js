const User = require('./user.model')

let USERS = []

const getAll = async () => USERS

const createUser = async user => {
  const createdUser = new User(user);
  USERS.push(createdUser);
  return createdUser;
};

const getUserById = async id => USERS.find(user => user.id === id)

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
