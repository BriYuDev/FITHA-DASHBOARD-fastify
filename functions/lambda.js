import awsLambdaFastify from '@fastify/aws-lambda';

import { init } from '../src/app.js';

const proxy = awsLambdaFastify(init())

console.log(proxy);

export default { proxy };