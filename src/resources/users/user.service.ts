import * as usersRepository from './user.memory.repository';
import { User } from './user.model';

export const getAll = () => usersRepository.getAll();

export const createUser = (user: Partial<User>) => usersRepository.createUser(user);

export const getUserById = (id: string) => usersRepository.getUserById(id);

export const updateUser = (id: string, updatedUser: Partial<User>) => usersRepository.updateUser(id, updatedUser);

export const deleteUserById = (id: string) => usersRepository.deleteUserById(id);

