import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Request } from 'express';


@Injectable()
export class ApikeyGuard implements CanActivate {

  //metodo que se ejecuta antes de entrar a un endpoint. Y retorna un booleano
  canActivate( context: ExecutionContext ): boolean | Promise<boolean> | Observable<boolean> {
    //console.log('context', context);
    const request = context.switchToHttp().getRequest<Request>(); //<Request> es el tipado de la peticion 
    const authHeader = request.header('Auth'); //obtener el header de la peticion
    //si auth es igual a 123, entonces se puede acceder al endpoint
    const isAuth = authHeader === '123';
    if (!isAuth) {
      throw new UnauthorizedException('No tienes autorización');
    }
    return isAuth;
  }
  
}
