import { createDefaultLogger, ServerlessAdapter } from '@h4ad/serverless-adapter';
import { ApiGatewayV2Adapter } from '@h4ad/serverless-adapter/lib/adapters/aws';
import { FastifyFramework } from '@h4ad/serverless-adapter/lib/frameworks/fastify';
import { AwsStreamHandler } from '@h4ad/serverless-adapter/lib/handlers/aws';
import { DummyResolver } from '@h4ad/serverless-adapter/lib/resolvers/dummy/index.js';
import { CorsFramework } from '@h4ad/serverless-adapter/frameworks/cors';
import { fastify } from './app.js';

const fastifyFramework = new FastifyFramework
const options = { origin: true };

const framework = new CorsFramework(fastifyFramework, options);

export const handler = ServerlessAdapter.new(fastify)
  .setFramework(framework)
  .setHandler(new AwsStreamHandler())
  .setResolver(new DummyResolver())
  // disable debug mode to not produce too much logs
//   .setLogger(createDefaultLogger({ level: 'debug' }))
  .addAdapter(new ApiGatewayV2Adapter())
  .build();