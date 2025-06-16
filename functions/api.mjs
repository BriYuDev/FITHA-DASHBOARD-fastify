import 'fastify'
import awsLambdaFastify from '@fastify/aws-lambda'
import 'node:path'
import 'ejs'
import '@fastify/cors'
import '@fastify/multipart'
import '@fastify/view'
import '@fastify/static'
import srcFile from '../src'
import staticFile from'../src/static'
import viewsFile from '../src/views'

import handler from '../src/lambda.js'
import init from '../src/app.js'

const proxy = awsLambdaFastify(init())

exports.handler = proxy;