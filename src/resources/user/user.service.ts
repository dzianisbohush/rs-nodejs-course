import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  getAll() {
    return this.userRepository.createQueryBuilder().getMany();
  }

  async createUser(user: CreateUserDto) {
    const {
      identifiers,
    } = await this.userRepository
      .createQueryBuilder()
      .insert()
      .into(User)
      .values([user])
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
      .update(User)
      .set(updatedUserData)
      .where('id = :id', { id })
      .execute();

    return this.getUserById(id);
  }

  deleteUserById(id: string) {
    return this.userRepository
      .createQueryBuilder()
      .delete()
      .from(User)
      .where('id = :id', { id })
      .execute();
  }

  toResponse({ id, name, login }: User) {
    return { id, name, login };
  }
}
