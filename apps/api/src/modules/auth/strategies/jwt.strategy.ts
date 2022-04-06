import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthGuard, PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { jwtSecret } from '../auth.constants';
import { UserService } from '../../user/user.service';
import { IJwt } from '../dtos/jwt';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private _userService: UserService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: jwtSecret,
        });
    }

    async validate(payload: IJwt) {
        console.log(payload);
        if (!payload?.userId) return;
        return await this._userService.getById(payload.userId);
    }
}
