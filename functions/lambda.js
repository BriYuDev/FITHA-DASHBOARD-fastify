
const awsLambdaFastify = require('@fastify/aws-lambda');
const init = require('../src/app.js')

const proxy = awsLambdaFastify(init())

exports.handler = proxy;