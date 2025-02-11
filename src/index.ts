import fastify, { FastifyReply, FastifyRequest } from 'fastify'
import cors from '@fastify/cors'
import fastifyAutoload from '@fastify/autoload'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import fastifyJwt from '@fastify/jwt'

const loggerOptions = {
  development: {
    transport: {
      target: 'pino-pretty',
      options: {
        translateTime: 'HH:MM:ss Z',
        ignore: 'pid,hostname'
      }
    },
    serializers: {
      req(request: FastifyRequest) {
        return {
          method: request.method,
          url: request.url,
          headers: request.headers,
          hostname: request.hostname,
          remoteAddress: request.ip,
          remotePort: request.socket.remotePort
        }
      },
    }
  },
  production: {
    file: 'logs/app.log',
    redact: ['req.headers.authorization'],
    level: 'info',
    timestamp: () => `,"time":"${new Date(Date.now()).toLocaleString()}"`,
    serializers: {
      req(request: FastifyRequest) {
        return {
          method: request.method,
          url: request.url,
          headers: request.headers,
          hostname: request.hostname,
          remoteAddress: request.ip,
          remotePort: request.socket.remotePort
        }
      },
    }
  },
}
const e: string = process.env.NODE_ENV as string

const server = fastify({
  logger: e === 'production' ? loggerOptions.production : loggerOptions.development
})

// system plugin
server.register(cors)
server.register(fastifyJwt, { secret: 'your-secret-key' });

// Autoloan plugin, the route address is `prefix + autoPrefix + routeName`
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// admin api
server.register(fastifyAutoload,
  {
    dir: join(__dirname, 'routes/admin'),
    options: { prefix: '/admin' },
    autoHooks: true,
    cascadeHooks: true,
    overwriteHooks: true,
  }
)
// public api
server.register(fastifyAutoload,
  {
    dir: join(__dirname, 'routes/api'),
    options: { prefix: '/api' },
    autoHooks: true,
    cascadeHooks: true,
    overwriteHooks: true,
  }
)
server.get('/', async (request: FastifyRequest, reply: FastifyReply) => { return { hello: 'fastify' } })

const start = async () => {
  try {
    await server.listen({ port: 3000 })
  } catch (err) {
    server.log.error(err)
    process.exit(1)
  }
}

start()
