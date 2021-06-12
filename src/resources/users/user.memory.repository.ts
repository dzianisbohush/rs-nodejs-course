import { User } from './user.model';

let USERS: User[] = [];

export const getAll = async (): Promise<User[]> => USERS;

export const createUser = async (user: Partial<User>): Promise<User> => {
  const createdUser = new User(user);
  USERS.push(createdUser);

  return createdUser;
};

export const getUserById = async (id: string): Promise<User | null> => {
  const foundUser = USERS.find(user => user.id === id);

  return foundUser || null;
};

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

export const deleteUserById = async (id: string): Promise<void> => {
  const index = USERS.findIndex(user => user.id === id);

  if (index !== -1) {
    USERS.splice(index, 1);
  }
};
