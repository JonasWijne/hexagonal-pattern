import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { PrismaService } from 'nestjs-prisma';
import { AppModule } from './modules/app/app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.setGlobalPrefix('api');

    // enable shutdown hook
    const prismaService: PrismaService = app.get(PrismaService);
    prismaService.enableShutdownHooks(app);

    app.useGlobalPipes(new ValidationPipe());
    await app.listen(3001);
}
bootstrap();
