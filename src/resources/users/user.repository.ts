import { EntityRepository, Repository, getConnection } from 'typeorm';
import bcrypt from 'bcrypt';
import { IUser, User } from './user.model';
import { CONFIG } from '../../common/config';

const { HASH_SALT } = CONFIG;


@EntityRepository(User)
class UsersRepository extends Repository<User> {
  getAll() {
    return this.createQueryBuilder().getMany();
  }

  hashUserPassword(password: string) {
    if (HASH_SALT) {
      return bcrypt.hashSync(password, +HASH_SALT);
    }
    return '';
  }

  async createUser(user: Partial<IUser>) {
    const userWithHashedPassword = {
      ...user,
      password: this.hashUserPassword(user.password as string)
    };

    const { identifiers } = await this.createQueryBuilder()
      .insert()
      .into(User)
      .values([userWithHashedPassword])
      .execute();

    return this.getUserById(identifiers[0]?.['id']);
  }

  getUserById(id: string) {
    return this.createQueryBuilder('user')
      .where('user.id = :id', { id })
      .getOne();
  }

  getUserByLogin(login: string) {
    return this.createQueryBuilder('user')
      .where('user.login = :login', { login })
      .getOne();
  }

  async updateUser(id: string, updatedUser: Partial<IUser>) {
    await this.createQueryBuilder()
      .update(User)
      .set(updatedUser)
      .where('id = :id', { id })
      .execute();

    return this.getUserById(id);
  }

  deleteUserById(id: string) {
    return this.createQueryBuilder()
      .delete()
      .from(User)
      .where('id = :id', { id })
      .execute();
  }

  toResponse({id, name, login}: IUser) {
    return {id, name, login}
  }
}

export const usersRepository = getConnection().getCustomRepository(UsersRepository);
