import fastify, { FastifyInstance, FastifyListenOptions } from 'fastify'
import { FunctionParser } from './parser'

type RegisterOptions = {
  types?: Record<string, string | string[]>,
  route?: string
}

export class Tinie {
  private readonly _server: FastifyInstance

  constructor() {
    this._server = fastify()
  }

  get server(): FastifyInstance {
    return this._server
  }

  async listen(options: FastifyListenOptions = { port: 3000 }): Promise<void> {
    await this._server.listen(options, (err, address) => {
      if (err) {
        console.error(err)
        process.exit(1)
      }
      console.log(`Tinie server listening at ${address}`)
    })
  }

  register(
    func: Function,
    options: RegisterOptions = {}
  ): void {
    const parsed = new FunctionParser(func)

    this._server.route({
      method: 'POST',
      url: `/${options.route ?? parsed.name}`,
      handler: async (request, reply) => {
        let params = []

        try {
          const body: Record<string, any> = request.body ?? {}

          params = parsed.params.map((param) => {
            if (param.required && body[param.name] === undefined) {
              throw new Error(`Missing required parameter ${param.name}`)
            }

            if (
              options.types?.[param.name]
              && body[param.name] !== undefined
            ) {
              const types = Array.isArray(options.types?.[param.name])
                ? options.types?.[param.name]
                : [options.types?.[param.name]]

              if (!types.includes(typeof body[param.name])) {
                throw new Error(`Invalid type for parameter ${param.name}`)
              }
            }

            return body[param.name]
          })
        } catch (e) {
          return reply
            .status(400)
            .send({
              error: e.message,
            })
        }

        const result = parsed.isAsync
          ? await func(...params)
          : func(...params)

        return reply
          .status(200)
          .send({
            result,
          })
      },
    })
  }
}

export default Tinie
