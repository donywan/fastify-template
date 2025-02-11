import fastifyJwt from "@fastify/jwt";
import { FastifyInstance, FastifyRequest } from "fastify";
import fp from 'fastify-plugin';

// 排除请求
const excludeRoutes = [
    '^/api/.*',
    '^/admin/login',
]
export default async function(fastify: FastifyInstance, options: any)  {
// export default fp(async (fastify: FastifyInstance, options: any) => {
    // 注册JWT
    fastify.register(fastifyJwt, { secret: 'your-secret-key' });
    // 添加请求钩子
    fastify.addHook('onRequest', async (request, reply) => {
        // const matched = excludeRoutes.filter((route) => {
        //     return request.url.match(route)
        // })
        // if (matched.length > 0) {
        //     return;
        // }
        // 拦截所有请求进行验证Token
        const token = request.headers['authorization'];
        if (!token) {
            reply.code(401).send({ message: 'Token is required' });
            return;
        }
        // 验证Token的逻辑，例如解析Token并检查有效性
        try {
            await request.jwtVerify();
        } catch (error) {
            fastify.log.error(error);
            reply.code(401).send({ message: 'Token is invalid' });
        }
    })
}
// )

