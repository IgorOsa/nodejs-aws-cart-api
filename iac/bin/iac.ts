#!/usr/bin/env node
import * as path from 'node:path';
import * as dotenv from 'dotenv';
import * as cdk from 'aws-cdk-lib';
import { CartApiStack } from '../lib/cart-api-stack';

dotenv.config({ path: path.join(__dirname, '../../.env') });

const app = new cdk.App();
new CartApiStack(app, 'CartApiStack', {
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION,
  },
});
