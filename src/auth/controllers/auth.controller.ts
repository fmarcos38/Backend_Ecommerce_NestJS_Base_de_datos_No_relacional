import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

@Controller('auth')
export class AuthController {

    @UseGuards(AuthGuard('local')) //local es el nombre de la estrategia, en este punto ES el gurad el q hace toda la logica del login
    @Post('login')
    login(@Req() req: Request){
        return req.user;
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