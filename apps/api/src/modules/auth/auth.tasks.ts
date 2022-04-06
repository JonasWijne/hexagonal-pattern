import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { AuthService } from './auth.service';

@Injectable()
export class AuthTasks {
    constructor(private readonly _authService: AuthService) {}

    @Cron('0 1 * * *')
    async handleCron() {
        await this._authService.cleanTokens();
    }
}
