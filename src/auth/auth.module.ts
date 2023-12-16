import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { UserModule } from 'src/Users/user.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategies/local.strategy';
import { AuthController } from './controllers/auth.controller';
import { JwtModule } from '@nestjs/jwt';
import config  from '../config';

@Module({
  imports: [
    UserModule,
    PassportModule,
    /* JwtModule.register({ //con este modulo el secret lo lee desde aca
          secret: 'pepe',
          signOptions: {
            expiresIn: '10d',
          },
    }), */
    //con este modulo el secret lo lee desde el config
    JwtModule.registerAsync({
      useFactory: () => {
        return {
          secret: config().mongo.jwtSecret,
          signOptions: {
            expiresIn: '10d',
          },
        };
      }
    }),
  ], //me traigo el userModule --> para usar sus metodos desde el authService
  providers: [AuthService, LocalStrategy, ], 
  controllers: [AuthController]
})
export class AuthModule {}
