import { Injectable } from '@nestjs/common';
import { UserService } from 'src/Users/services/user.service';
import * as bcCrypt from 'bcrypt';
import { User } from 'src/Users/entities/user.entity';

@Injectable()
export class AuthService {
    constructor(private userService: UserService) {
        // Remove the unnecessary super() call
    }

    async validateUser(email: string, pass: string){
        const user: User = await this.userService.findOneByEmail(email);
        if (!user) { return "Password incorrecto"; }

        //desencripto el pass y lo comparo con el de la bd
        const isMatch = await bcCrypt.compare(pass, user.password);
        if (!isMatch) { return "Password incorrecto"; }
        
        //si todo sale bien retorno el usuario
        return user;
    }
}

