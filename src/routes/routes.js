const GetRoot = require("../controller/root.controller.js");
const { PostRoot, GetImgBase64 } = require("../controller/img.controller.js");

function routes (fastify, options) {
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
}

module.exports = routes;