const Fastify = require('fastify')
const path = require('node:path')
const ejs = require('ejs')


function init(){
  console.log(path.dirname("."))

  const fastify = Fastify({
    logger: true
  })

  fastify.register(require('@fastify/cors'), { origin: true })

  fastify.register(require('@fastify/multipart'))

  fastify.register(require('@fastify/view'), {
    engine: {
      ejs
    },
    root: path.join(__dirname, "views"),
    viewExt: "ejs",
  })

  fastify.register(require('@fastify/static'), {
    root: path.join(__dirname, "static"),
    prefix: "/static/"
  })

  fastify.register(require('./routes/routes.js'))

  return fastify
}

module.exports = init;