import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { ROLES_KEY } from '../decorator/roles.decorator';
import { TokenPayload } from '../model/token.model';
import { Role } from '../model/roles.model';

@Injectable()
export class RolesGuard implements CanActivate {
  
  constructor(private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    //aca obtengo el array de roles q le pase al decorator
    const roles: Role[] = this.reflector.get(ROLES_KEY, context.getHandler()); //['admin']

    const request = context.switchToHttp().getRequest(); //obtengo el request
    //del request obtengo el user
    const user = request.user as TokenPayload; //{sub: 1, role: 'admin'}
    //console.log("userData: ", user);
    
    //no se si eatá bien utilizar some y no find comparando q sea admin el rol
    //const isAuth = roles.map(role => role === user.role);
    if (user.role !== 'admin') {
      throw new UnauthorizedException('no tienes permiso');
    } 
    return true;
  } 
}
