import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';

export class CartApiStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const mainLambda = new lambda.Function(this, 'CartApiHandler', {
      runtime: lambda.Runtime.NODEJS_20_X,
      handler: 'main.handler',
      code: lambda.Code.fromAsset('../dist'),
      memorySize: 256,
      timeout: cdk.Duration.seconds(30),
      environment: {
        LOG_LEVEL: 'DEBUG',
        NODE_ENV: 'development',
        DB_HOST: process.env.DB_HOST!,
        DB_PORT: process.env.DB_PORT!,
        DB_USER: process.env.DB_USERNAME!,
        DB_PASSWORD: process.env.DB_PASSWORD!,
        DB_NAME: process.env.DB_NAME!,
      },
    });

    const api = new apigateway.LambdaRestApi(this, 'CartApi', {
      handler: mainLambda,
      proxy: true,
      deployOptions: {
        stageName: 'dev',
      },
    });
  }
}
