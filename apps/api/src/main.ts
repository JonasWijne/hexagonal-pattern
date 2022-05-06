import { INestApplication, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { PrismaService } from 'nestjs-prisma';
import { AppModule } from './modules/app/app.module';

function setupServer(app: INestApplication) {
    app.setGlobalPrefix('api');

    // enable shutdown hook
    const prismaService: PrismaService = app.get(PrismaService);
    prismaService.enableShutdownHooks(app);

    app.useGlobalPipes(new ValidationPipe());
}

async function bootstrapProd() {
    const app = await NestFactory.create(AppModule);
    setupServer(app);
    await app.listen(3001);
}

async function bootstrap() {
    const viteNodeApp = await NestFactory.create(AppModule);
    setupServer(viteNodeApp);
    return viteNodeApp;
}

if (import.meta.env.PROD) {
    bootstrapProd();
}

export const viteNodeApp = bootstrap();
