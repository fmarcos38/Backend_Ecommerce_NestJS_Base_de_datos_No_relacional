import { Injectable, Inject } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';

import { Strategy, ExtractJwt } from 'passport-jwt';
import config from '../../config';
import { TokenPayload } from '../model/token.model';

//esta clase es un servicio
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor(/* @Inject(config.KEY) configService: ConfigType<typeof config> */) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),//desde donde saco el token
            ignoreExpiration: false, //si el token expiro o no
            secretOrKey: 'marcos',//configService.mongo.jwtSecret, //el secret
        });
    }

    //aca valido el token
    validate(payload: TokenPayload) {
        return payload;
    }
}