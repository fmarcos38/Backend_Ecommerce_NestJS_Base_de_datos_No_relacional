import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { UserModule } from 'src/Users/user.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategies/local.strategy';
import { AuthController } from './controllers/auth.controller';
import { JwtModule } from '@nestjs/jwt';
import config  from '../config';
import { ConfigType } from '@nestjs/config';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({ //con este modulo el secret lo lee desde aca
          secret: 'marcos',
          signOptions: {
            expiresIn: '10d',
          },
    }),
    //con este modulo el secret lo lee desde el config
    /* JwtModule.registerAsync({
      inject: [config.KEY],
      useFactory: (configiService: ConfigType<typeof config>) => {
        return {
          secret: configiService.mongo.jwtSecret,
          signOptions: {
            expiresIn: '10d',
          },
        };
      }
    }), */
  ], //me traigo el userModule --> para usar sus metodos desde el authService
  providers: [AuthService, LocalStrategy],
  controllers: [AuthController]
})
export class AuthModule {}
