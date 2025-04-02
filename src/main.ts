import { NestFactory } from '@nestjs/core';
import serverlessExpress from '@codegenie/serverless-express';
import helmet from 'helmet';

import { AppModule } from './app.module';
import { Callback, Context, Handler } from 'aws-lambda';

let server: Handler;

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

export const handler: Handler = async (
  event: any,
  context: Context,
  callback: Callback,
) => {
  server = server ?? (await bootstrap());
  return server(event, context, callback);
};
