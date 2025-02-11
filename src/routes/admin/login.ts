export const autoPrefix = '';
export default async function routes(fastify: any, options: any) {
    fastify.get('/login', async (request: any, reply: any) => {
        reply.jwtSign({
            id: 1,
            name: 'admin',
            role: 'admin'
        }, function (err: any, token: any) {
            return reply.send(err || { 'token': token })
        })
    })
}