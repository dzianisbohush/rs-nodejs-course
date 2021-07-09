import { Injectable } from '@nestjs/common';
import bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  getAll() {
    return this.userRepository.createQueryBuilder().getMany();
  }

  async createUser(user: CreateUserDto) {
    const userWithHashedPassword = {
      ...user,
      password: this.hashUserPassword(user.password as string),
    };

    const {
      identifiers,
    } = await this.userRepository
      .createQueryBuilder()
      .insert()
      .into(UserEntity)
      .values([userWithHashedPassword])
      .execute();

    return this.getUserById(identifiers[0]?.['id']);
  }

  getUserById(id: string) {
    return this.userRepository
      .createQueryBuilder('user')
      .where('user.id = :id', { id })
      .getOne();
  }

  async updateUser(id: string, updatedUserData: UpdateUserDto) {
    await this.userRepository
      .createQueryBuilder()
      .update(UserEntity)
      .set(updatedUserData)
      .where('id = :id', { id })
      .execute();

    return this.getUserById(id);
  }

  deleteUserById(id: string) {
    return this.userRepository
      .createQueryBuilder()
      .delete()
      .from(UserEntity)
      .where('id = :id', { id })
      .execute();
  }

  getUserByLogin(login: string) {
    return this.userRepository
      .createQueryBuilder('user')
      .where('user.login = :login', { login })
      .getOne();
  }

  hashUserPassword(password: string) {
    const { HASH_SALT } = process.env;

    if (HASH_SALT) {
      return bcrypt.hashSync(password, +HASH_SALT);
    }
    return '';
  }

  async createAdminUser() {
    const adminUser = await this.getUserByLogin('admin');

    if (!adminUser) {
      this.createUser({
        name: 'admin',
        login: 'admin',
        password: 'admin',
      });
    }
  }

  toResponse({ id, name, login }: UserEntity) {
    return { id, name, login };
  }
}
