// 定义路由组前缀
export const autoPrefix = '/org';
export default async function routes(fastify: any, options: any) {
    fastify.get('/get', async (request: any, reply: any) => {
        return { hello: 'api org' }
    })
}
