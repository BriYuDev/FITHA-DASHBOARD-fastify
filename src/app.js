import Fastify from 'fastify'
import faststatic from '@fastify/static'
import routes from './routes/routes.js'
import path from 'node:path'
import fastifyView from '@fastify/view'
import fastifyCors from '@fastify/cors'
import ejs from 'ejs'
import fastMulti from '@fastify/multipart'


async function init(){
  const __dirname = import.meta.dirname;

  const fastify = Fastify({
    logger: true
  })

  await fastify.register(fastifyCors, { origin: true })

  await fastify.register(fastMulti)

  await fastify.register(fastifyView, {
    engine: {
      ejs
    },
    root: path.join(__dirname, "views"),
    viewExt: "ejs",
  })

  await fastify.register(faststatic, {
    root: path.join(__dirname, "static"),
    prefix: "/static/"
  })

  await fastify.register(routes)

  return fastify
}

export default { init };