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
      server({
        host,
        port: options.port,
        root: options.root,
        username: options.username,
        password: options.password,
      })
    }

    if (options.host) {
      startServer(options.host)
    } else {
      const networks = os.networkInterfaces()
      for (const name in networks) {
        const network = networks[name]?.find(
          (network: any) => network.family === 'IPv4'
        )

        if (network) startServer(network.address)
      }
    }
  })
