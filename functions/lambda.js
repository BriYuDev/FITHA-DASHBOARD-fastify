import awsLambdaFastify from '@fastify/aws-lambda';

import { init } from '../src/app.js';

const proxy = awsLambdaFastify(init())

exports.handler = proxy;