import { GetRoot } from "../controller/root.controller.js";
import { PostRoot, GetImgBase64 } from "../controller/img.controller.js";

export default async function routes(fastify, options) {
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