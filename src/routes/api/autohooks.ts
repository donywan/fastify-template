import { FastifyInstance } from "fastify";

// Use bearer-token plugin to verify token
export default async function (fastify: FastifyInstance, options: any) {
    // 添加请求钩子
    fastify.addHook('onRequest', async (request, reply) => {
    })
}