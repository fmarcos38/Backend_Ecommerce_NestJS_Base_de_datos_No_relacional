import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { AuthService } from '../services/auth.service';
import { User } from 'src/Users/entities/user.entity';

@Controller('auth')
export class AuthController {
    constructor(private authSerice: AuthService){}

    @UseGuards(AuthGuard('local')) //local es el nombre de la estrategia, en este punto ES el gurad el q hace toda la logica del login
    @Post('login')
    login(@Req() req: Request){
        const user = req.user as User; //el user lo devuelve el guard y lo tipeo como User
        return this.authSerice.generateJWT(user);
    }
}


/*
endpoint: http://localhost:3000/auth/login
method: POST
body:
{
    "username":"flor@flor.com",
    "password":"123456"
}

*/