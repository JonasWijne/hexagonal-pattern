import {
    Controller,
    Get,
    UseGuards,
    Req,
    Post,
    Body,
    BadRequestException,
    Res,
    UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './strategies/local.strategy';
import { JwtAuthGuard } from './strategies/jwt.strategy';
import { RegisterRequestDto } from './dtos/register-local.request';
import { UserService } from '../user/user.service';
import { Response } from 'express';
import { URLSearchParams } from 'url';
import { GoogleAuthGuard } from './strategies/google.strategy';
import { AzureAdAuthGuard } from './strategies/azure-ad.strategy';

@Controller('auth')
export class AuthController {
    constructor(private readonly _authService: AuthService, private readonly _userService: UserService) {}

    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Req() req) {
        return this._authService.login(req.user);
    }

    @Post('register')
    async register(@Body() body: RegisterRequestDto) {
        let user = await this._userService.getByEmail(body.username);
        if (user) throw new BadRequestException('User already exist');
        user = await this._authService.register(body.username, body.password, body.firstName, body.lastName);
        return {
            id: user.id,
        };
    }

    @Get('refresh')
    async refreshAccessToken(@Req() req) {
        const refreshToken = req.params.token;
        const userId = req.params.user_id;

        if (!refreshToken || !userId) throw new UnauthorizedException();
        const user = await this._userService.getById(userId);
        if (!user) throw new UnauthorizedException();

        return await this._authService.refreshTokens(refreshToken, user);
    }

    @UseGuards(JwtAuthGuard)
    @Get('me')
    getProfile(@Req() req) {
        return req.user;
    }

    @Get('google')
    @UseGuards(GoogleAuthGuard)
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    async googleAuth() {}

    @Get('google/redirect')
    @UseGuards(GoogleAuthGuard)
    async googleAuthRedirect(@Req() req, @Res() res: Response) {
        const result = await this._authService.login(req.user);
        const params = new URLSearchParams();
        params.append('access_token', result.accessToken);
        params.append('refresh_token', result.refreshToken);
        res.redirect('/callback?' + params.toString());
    }

    @Get('azure-ad')
    @UseGuards(AzureAdAuthGuard)
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    async azureAdAuth() {}

    @Get('azure-ad/redirect')
    @UseGuards(AzureAdAuthGuard)
    async azureAdRedirect(@Req() req) {
        return await this._authService.login(req.user);
    }
}
