import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';
import * as ec2 from 'aws-cdk-lib/aws-ec2';

export class CartApiStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const vpc = ec2.Vpc.fromLookup(this, 'Vpc', { isDefault: true });

    const securityGroup = ec2.SecurityGroup.fromSecurityGroupId(
      this,
      'LambdaRDSSecurityGroup',
      process.env.LAMBDA_RDS_SECURITY_GROUP_ID ||
        (() => {
          throw new Error('LAMBDA_RDS_SECURITY_GROUP_ID is not defined');
        })(),
    );

    const mainLambda = new lambda.Function(this, 'CartApiHandler', {
      runtime: lambda.Runtime.NODEJS_20_X,
      handler: 'main.handler',
      code: lambda.Code.fromAsset('../dist'),
      memorySize: 256,
      timeout: cdk.Duration.seconds(30),
      vpc,
      securityGroups: [securityGroup],
      allowPublicSubnet: true,
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

    const { url } = mainLambda.addFunctionUrl({
      authType: lambda.FunctionUrlAuthType.NONE,
      cors: {
        allowedOrigins: ['*'],
        allowedMethods: [
          lambda.HttpMethod.GET,
          lambda.HttpMethod.DELETE,
          lambda.HttpMethod.PUT,
        ],
        allowedHeaders: ['*'],
      },
    });

    const api = new apigateway.LambdaRestApi(this, 'CartApi', {
      handler: mainLambda,
      proxy: true,
      deployOptions: {
        stageName: 'dev',
      },
      defaultCorsPreflightOptions: {
        allowOrigins: apigateway.Cors.ALL_ORIGINS,
        allowMethods: apigateway.Cors.ALL_METHODS,
        allowHeaders: apigateway.Cors.DEFAULT_HEADERS,
        allowCredentials: true,
      },
    });

    new cdk.CfnOutput(this, 'FunctionUrl', { value: url });
  }
}
