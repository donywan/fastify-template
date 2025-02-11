import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";

// Exclude request
const excludeRoutes = [
    '^/admin/login',
]
export default async function (fastify: FastifyInstance, options: any) {
    fastify.addHook('onRequest', async (request: FastifyRequest, reply: FastifyReply) => {
        const matched = excludeRoutes.filter((route) => {
            return request.url.match(route)
        })
        if (matched.length > 0) {
            return;
        }
        // Intercept all requests to verify Token
        const token = request.headers['authorization'];
        if (!token) {
            reply.code(401).send({ message: 'Token is required' });
            return;
        }
        try {
            await request.jwtVerify();
        } catch (error) {
            fastify.log.error(error);
            reply.code(401).send({ message: 'Token is invalid' });
        }
    })
}

