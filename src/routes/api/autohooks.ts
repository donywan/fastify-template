export default async function (fastify: any, options: any) {
    fastify.addHook('onRequest', async (request: any, reply: any) => {
        // TODO Use bearer token
        return reply.send({ message: 'Bearer token is required' });
    })
}