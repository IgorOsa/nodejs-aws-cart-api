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
      environment: {
        LOG_LEVEL: 'DEBUG',
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
