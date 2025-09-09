import * as os from 'os'
import arg from '../arg'
import server from './server'
import NoArg from 'noarg'

arg
  .create('ftp', {
    flags: {
      host: NoArg.string().aliases('h'),
      port: NoArg.number().aliases('p').default(2221),
      username: NoArg.string().aliases('user'),
      password: NoArg.string().aliases('pass'),
      root: NoArg.string().default('.'),
    },
  })
  .on((_, options) => {
    if (options.username && !options.password) {
      throw new Error('Password is required if username is provided')
    }

    if (!options.username && options.password) {
      throw new Error('Username is required if password is provided')
    }

    function startServer(host: string) {
      const config = {
        host,
        port: options.port,
        root: options.root,
        username: options.username,
        password: options.password,
      }

      server(config).catch(async () => {
        console.error('Retrying in 1 second...')
        await new Promise((resolve) => setTimeout(resolve, 1000))
        startServer(host)
      })
    }

    if (options.host) {
      const host = options.host
      startServer(host)
    } else {
      const networks = os.networkInterfaces()
      for (const name in networks) {
        const network = networks[name]?.find(
          (network: any) => network.family === 'IPv4'
        )

        if (network) {
          const host = network.address
          startServer(host)
        }
      }
    }
  })
