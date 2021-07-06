import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { UserModule } from '../resources/user/user.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { JwtStrategy } from './jwt.strategy';

// const { JWT_SECRET_KEY } = process.env;

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      //@todo get from env
      secret: 'secret-key',
      signOptions: { expiresIn: '4h' },
    }),
  ],
  providers: [AuthService, JwtStrategy, LocalStrategy],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}
