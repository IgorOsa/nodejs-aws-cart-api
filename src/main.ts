import { NestFactory } from '@nestjs/core';
import serverlessExpress from '@codegenie/serverless-express';
import helmet from 'helmet';

import { AppModule } from './app.module';
import { Callback, Context, Handler } from 'aws-lambda';
import { ConfigService } from '@nestjs/config';

let server: Handler;
export let handler: Handler;

if (process.env.NODE_ENV === 'local') {
  async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const configService = app.get(ConfigService);
    const port = configService.get('APP_PORT') || 4000;
    app.enableCors({
      origin: (req, callback) => callback(null, true),
    });
    app.use(helmet());
    await app.listen(port, () => {
      console.log('App is running on %s port', port);
    });
  }
  bootstrap();
} else {
  async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    await app.init();

    app.enableCors({
      origin: (req, callback) => callback(null, true),
    });
    app.use(helmet());

    const expressApp = app.getHttpAdapter().getInstance();

    return serverlessExpress({ app: expressApp });
  }

  handler = async (event: any, context: Context, callback: Callback) => {
    console.log('Event:', { event });
    server = server ?? (await bootstrap());
    return server(event, context, callback);
  };
}
