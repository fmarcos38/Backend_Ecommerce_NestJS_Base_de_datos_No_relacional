import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { UserModule } from 'src/Users/user.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategies/local.strategy';
import { AuthController } from './controllers/auth.controller';

@Module({
  imports: [UserModule, PassportModule], //me traigo el userModule --> para usar sus metodos desde el authService
  providers: [AuthService, LocalStrategy], controllers: [AuthController]
})
export class AuthModule {}
