import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { UserService } from 'src/Users/services/user.service';
import { UserModule } from 'src/Users/user.module';

@Module({
  imports: [UserModule], //me traigo el userModule --> para usar sus metodos desde el authService
  providers: [AuthService]
})
export class AuthModule {}
