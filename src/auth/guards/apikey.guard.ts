import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Request } from 'express';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from '../decorator/public.decorator';


@Injectable()
export class ApikeyGuard implements CanActivate {

  //inyectar el reflector para poder acceder a los metadatos y poder DESproteger los endpoints.
  constructor(private reflector: Reflector) {}

  //metodo que se ejecuta antes de entrar a un endpoint. Y retorna un booleano
  canActivate( context: ExecutionContext ): boolean | Promise<boolean> | Observable<boolean> {
    //console.log('context', context);

    const isPublic = this.reflector.get<boolean>(/* 'isPublic' */ IS_PUBLIC_KEY, context.getHandler()); //obtener el valor del metadato - a suu vez podria tilizar en ves de --> isPublic(q es el nombre q le puse en el decorador); EL IS_PUBLIC_KEY q es el nombre de la variable q está en el decorador personalizado
    const request = context.switchToHttp().getRequest<Request>(); //<Request> es el tipado de la peticion 
    const authHeader = request.header('Auth'); //obtener el header de la peticion
    //si auth es igual a 123, entonces se puede acceder al endpoint
    const isAuth = authHeader === '123';

    //si el endpoint es publico, entonces se puede acceder sin auth
    if(isPublic) {
      return true;
    }

    if (!isAuth) {
      throw new UnauthorizedException('No tienes autorización');
    }
    return isAuth;
  }

}
