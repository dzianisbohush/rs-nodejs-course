import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { CommonConfigModule } from '../common/common-config.module';
import { CommonConfigService } from '../common/common-config.service';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [CommonConfigModule],
      inject: [CommonConfigService],
      useFactory: async (
        commonConfigService: CommonConfigService,
      ): Promise<TypeOrmModuleOptions> => commonConfigService.OrmConfig,
    }),
  ],
})
export class DatabaseModule {}
