import awsLambdaFastify from '@fastify/aws-lambda';
import app from '../src/app.js'; // Assuming your Fastify app is in app.js

export default async handler() =>{
    const response = await app();

    

    return new Response(response)
}