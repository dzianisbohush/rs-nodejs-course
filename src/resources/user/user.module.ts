import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserEntity } from './user.entity';
import { TaskModule } from '../task/task.module';

@Module({
  controllers: [UserController],
  imports: [TypeOrmModule.forFeature([UserEntity]), TaskModule],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
