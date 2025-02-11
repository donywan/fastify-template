import { FastifyInstance } from "fastify";

export const autoPrefix = '/user';
async function routes(fastify: FastifyInstance, options: any) {
    fastify.get('/', async (request: any, reply: any) => {
        return { hello: 'api user' }
    })

    fastify.post('/', async (request: any, reply: any) => {
       const user = request.body;
       return user;
    });
}

export default routes;