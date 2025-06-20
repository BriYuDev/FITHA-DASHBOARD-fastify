const Fastify = require('fastify')
const path = require('node:path')
const ejs = require('ejs')
const GetRoot = require("./controller/root.controller.js");
const { PostRoot, GetImgBase64 } = require("./controller/img.controller.js");

const rootPath = path.dirname(__dirname)

function init(){

  const fastify = Fastify({
    logger: true
  })

  fastify.register(require('@fastify/cors'), { origin: true })

  fastify.register(require('@fastify/multipart'))

  fastify.register(require('@fastify/view'), {
    engine: {
      ejs
    },
    root: path.join(rootPath, 'src/views'),
    viewExt: "ejs",
  })

  fastify.register(require('@fastify/static'), {
    root: path.join(rootPath, 'src/static'),
    prefix: "/static/"
  })

   fastify.route({
        method : "GET",
        url : "/",
        handler : GetRoot
    });

    fastify.route({
        method : "POST",
        url : "/v1/img",
        handler : PostRoot
    });

    fastify.route({
        method : "GET",
        url : "/v1/img",
        handler : GetImgBase64
    });

  return fastify
}

module.exports = init;