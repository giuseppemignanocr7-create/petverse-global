import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { ExpressAdapter } from '@nestjs/platform-express';
import express from 'express';
import { AppModule } from '../src/app.module';
import { HttpExceptionFilter } from '../src/common/filters/http-exception.filter';
import { TransformInterceptor } from '../src/common/interceptors/transform.interceptor';

const server = express();

let cachedApp: any;
let bootstrapError: any = null;

async function bootstrap() {
  if (cachedApp) return cachedApp;
  if (bootstrapError) throw bootstrapError;

  try {
    const app = await NestFactory.create(AppModule, new ExpressAdapter(server), {
      logger: ['error', 'warn'],
    });

    app.enableCors({
      origin: '*',
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
      credentials: true,
    });

    app.setGlobalPrefix('api/v1');

    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
        transformOptions: { enableImplicitConversion: true },
      }),
    );

    app.useGlobalFilters(new HttpExceptionFilter());
    app.useGlobalInterceptors(new TransformInterceptor());

    await app.init();
    cachedApp = server;
    return server;
  } catch (error) {
    bootstrapError = error;
    throw error;
  }
}

export default async (req: any, res: any) => {
  try {
    const app = await bootstrap();
    app(req, res);
  } catch (error: any) {
    console.error('Bootstrap error:', error);
    res.status(500).json({
      error: 'Server bootstrap failed',
      message: error.message,
      stack: process.env.NODE_ENV !== 'production' ? error.stack : undefined,
    });
  }
};
