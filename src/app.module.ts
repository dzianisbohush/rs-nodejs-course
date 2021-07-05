import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// import { configService } from './config/config.service';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './resources/user/user.module';
import { BoardModule } from './resources/board/board.module';
import { TaskModule } from './resources/task/task.module';

@Module({
  imports: [DatabaseModule, UserModule, BoardModule, TaskModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
