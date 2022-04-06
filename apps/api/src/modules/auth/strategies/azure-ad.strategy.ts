import { Injectable } from '@nestjs/common';
import { AuthGuard, PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-azure-ad-oauth2';
import { decode } from 'jsonwebtoken';
import { AuthService } from '../auth.service';
import { FlagsmithService } from '../../flagsmith/flagsmith.service';

@Injectable()
export class AzureAdAuthGuard extends AuthGuard('azure-ad') {}

@Injectable()
export class AzureAdStrategy extends PassportStrategy(Strategy, 'azure-ad') {
    constructor(private readonly azureAdStrategyConfig, private _authService: AuthService) {
        super(azureAdStrategyConfig);
    }

    async validate(
        accessToken: string,
        refreshToken: string,
        profile: any,
        done: (err?: string | Error | null, user?: Express.User, info?: any) => void
    ): Promise<any> {
        if (!accessToken) return;

        try {
            const payload = decode(accessToken) as any;
            const email = payload.email;
            const id = payload.oid;
            const firstName = payload.given_name;
            const familyName = payload.family_name;
            let user = await this._authService.getUserByEmail(email);
            if (!user) {
                user = await this._authService.registerAzureAdUser(email, id, firstName, familyName);
            }
            done(null, user);
        } catch (ex) {
            done(ex, null);
        }
    }
}

export const registerAzureAdStrategy = {
    provide: AzureAdStrategy,
    useFactory: async (flagsmithService: FlagsmithService, authService: AuthService) => {
        const enabled = await flagsmithService.isAzureAdAuthEnabled();
        if (!enabled) return {};
        const config = await flagsmithService.getAzureAdAuthConfig();
        return new AzureAdStrategy(config, authService);
    },
    inject: [FlagsmithService, AuthService],
};
