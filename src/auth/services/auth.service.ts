import { Injectable } from '@nestjs/common';
import { UserService } from 'src/Users/services/user.service';
import * as bcCrypt from 'bcrypt';
import { User } from 'src/Users/entities/user.entity';
import { access } from 'fs';
import { JwtService } from '@nestjs/jwt';
import { TokenPayload } from '../model/token.model';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService
    ) {}

    //metodo q me comprueba user y pass con respecto a la DB
    async validateUser(email: string, pass: string){
        const user: User = await this.userService.findOneByEmail(email);
        if (!user) { return "Password incorrecto"; }

        //desencripto el pass y lo comparo con el de la bd
        const isMatch = await bcCrypt.compare(pass, user.password);
        if (!isMatch) { return "Password incorrecto"; }
        
        //si todo sale bien retorno el usuario
        return user;
    }

    //metodo para generar el token
    generateJWT(user: User){
        const payload: TokenPayload = { sub: user.id, role: user.role };
        return {
            access_token: this.jwtService.sign(payload),
            user,
        }
    }
}

