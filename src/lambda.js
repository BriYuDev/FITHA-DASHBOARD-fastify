
const awsLambdaFastify = require('@fastify/aws-lambda');
const init = require('./app.js')

const proxy = awsLambdaFastify(init())

exports.handler = proxy;