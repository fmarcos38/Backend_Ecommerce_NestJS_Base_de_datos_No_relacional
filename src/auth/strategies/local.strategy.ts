import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local"; //esta es la estrategia q utiliza passport para autenticar
import { AuthService } from "../services/auth.service";

/*--esta clase es como un servicio pero para la estrategia local--*/

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local'){
    constructor(private authService: AuthService){
        super(
            {
                usernameField: 'email', //estos son los campos q va a recibir el login (cambio el nombre de username a email)
                passwordField: 'password'
            }
        );
    }

    //metodo q se ejecuta cuando se llama a la estrategia local
    async validate(email: string, password: string){
        const user = await this.authService.validateUser(email, password);
        if(!user) throw new UnauthorizedException('Usuario o contraseña incorrecta');
        return user;
    }
}