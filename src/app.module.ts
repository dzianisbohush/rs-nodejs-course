import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './resources/user/user.module';
import { BoardModule } from './resources/board/board.module';
import { TaskModule } from './resources/task/task.module';
import { AuthModule } from './auth/auth.module';
import { CommonConfigModule } from './common/common-config.module';

@Module({
  imports: [
    DatabaseModule,
    UserModule,
    BoardModule,
    TaskModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    CommonConfigModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
