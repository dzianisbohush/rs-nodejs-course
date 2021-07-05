import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>,
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
      .into(UserEntity)
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

  toResponse({ id, name, login }: UserEntity) {
    return { id, name, login };
  }
}
