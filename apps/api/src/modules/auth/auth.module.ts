import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { FlagsmithModule } from '../flagsmith/flagsmith.module';
import { UserModule } from '../user/user.module';
import { jwtSecret } from './auth.constants';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthTasks } from './auth.tasks';
import { registerAzureAdStrategy } from './strategies/azure-ad.strategy';
import { registerGoogleStrategy } from './strategies/google.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';

@Module({
    imports: [
        UserModule,
        FlagsmithModule,
        JwtModule.register({
            secret: jwtSecret,
        }),
    ],
    controllers: [AuthController],
    providers: [AuthService, registerGoogleStrategy, registerAzureAdStrategy, LocalStrategy, JwtStrategy, AuthTasks],
})
export class AuthModule {}
