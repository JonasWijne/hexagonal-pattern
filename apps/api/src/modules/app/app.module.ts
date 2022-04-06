import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from '../auth/auth.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from 'nestjs-prisma';
import { UserModule } from '../user/user.module';
import { ScheduleModule } from '@nestjs/schedule';
import { FlagsmithModule } from '../flagsmith/flagsmith.module';

@Module({
    imports: [
        ConfigModule.forRoot({}),
        PrismaModule.forRoot({ isGlobal: true }),
        ScheduleModule.forRoot(),
        UserModule,
        AuthModule,
        FlagsmithModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
