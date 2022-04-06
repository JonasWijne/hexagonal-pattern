import { Strategy } from 'passport-local';
import { AuthGuard, PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {}

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private _authService: AuthService) {
        super();
    }

    async validate(username: string, password: string): Promise<any> {
        console.log('pasw', password);
        try {
            return await this._authService.validate(username, password);
        } catch (ex) {
            throw new UnauthorizedException(ex);
        }
    }
}
