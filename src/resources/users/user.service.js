import * as usersRepository from './user.memory.repository.js';

export const getAll = () => usersRepository.getAll();

export const createUser = user => usersRepository.createUser(user);

export const getUserById = id => usersRepository.getUserById(id);

export const updateUser = (id, updatedUser) => usersRepository.updateUser(id, updatedUser);

export const deleteUserById = id => usersRepository.deleteUserById(id);

