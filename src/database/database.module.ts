import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../resources/user/user.entity';

//@todo add env
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'кщще',
      database: 'dbnest',
      entities: [User],
      synchronize: true,
    }),
  ],
})
export class DatabaseModule {}
