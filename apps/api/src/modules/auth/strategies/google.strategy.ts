import { Injectable } from '@nestjs/common';
import { AuthGuard, PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { FlagsmithService } from '../../flagsmith/flagsmith.service';
import { AuthService } from '../auth.service';

@Injectable()
export class GoogleAuthGuard extends AuthGuard('google') {}

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
    constructor(private readonly googleStrategyConfig, private _authService: AuthService) {
        super(googleStrategyConfig);
    }

    async validate(accessToken: string, refreshToken: string, profile: any, done: VerifyCallback) {
        try {
            const { name, emails, id } = profile;
            const email = emails[0].value;
            let user = await this._authService.getUserByEmail(email);
            if (!user) {
                user = await this._authService.registerGoogleUser(email, id, name.givenName, name.familyName);
            }
            done(null, user);
        } catch (ex) {
            done(ex, null);
        }
    }
}

export const registerGoogleStrategy = {
    provide: GoogleStrategy,
    useFactory: async (flagsmithService: FlagsmithService, authService: AuthService) => {
        const enabled = await flagsmithService.isGoogleAuthEnabled();
        if (!enabled) return {};
        const config = await flagsmithService.getGoogleAuthConfig();
        return new GoogleStrategy(config, authService);
    },
    inject: [FlagsmithService, AuthService],
};
