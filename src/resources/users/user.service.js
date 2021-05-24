const usersRepository = require('./user.memory.repository');

const getAll = () => usersRepository.getAll();

const createUser = user => usersRepository.createUser(user);

const getUserById = id => usersRepository.getUserById(id);

const updateUser = (id, updatedUser) => usersRepository.updateUser(id, updatedUser);

const deleteUserById = id => usersRepository.deleteUserById(id);

module.exports = { getAll, getUserById, createUser, updateUser, deleteUserById };
