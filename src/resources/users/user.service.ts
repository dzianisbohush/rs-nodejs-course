import {usersRepository} from './user.memory.repository';
import { IUser } from './user.model';

export const getAll = () => usersRepository.getAll();

export const createUser = (user: Partial<IUser>) => usersRepository.createUser(user);

export const getUserById = (id: string) => usersRepository.getUserById(id);

export const updateUser = (id: string, updatedUser: Partial<IUser>) => usersRepository.updateUser(id, updatedUser);

export const deleteUserById = (id: string) => usersRepository.deleteUserById(id);

