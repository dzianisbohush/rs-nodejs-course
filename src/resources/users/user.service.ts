import {usersRepository} from './user.repository';
import { IUser } from './user.model';

export const getAll = () => usersRepository.getAll();

export const createUser = (user: Partial<IUser>) => usersRepository.createUser(user);

export const getUserById = (id: string) => usersRepository.getUserById(id);

export const updateUser = (id: string, updatedUser: Partial<IUser>) => usersRepository.updateUser(id, updatedUser);

export const deleteUserById = (id: string) => usersRepository.deleteUserById(id);

export const getUserByLogin = (login: string) => usersRepository.getUserByLogin(login)

export const createAdminUser = async () => {
  const adminUser = await getUserByLogin("admin")

  if(!adminUser){
    await createUser({name: 'admin', login: "admin", password: "admin"})
  }
}

