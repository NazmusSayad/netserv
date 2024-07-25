import os = require('os')
import { t } from 'noarg'
import arg from '../arg'
import server from './server'

arg.create(
  'ftp',
  {
    options: {
      host: t.string().aliases('h'),
      port: t.number().aliases('p').default(2221),
      username: t.string().aliases('user'),
      password: t.string().aliases('pass'),
      root: t.string().default('.'),
    },
  },
  (_, options) => {
    console.log({ options })

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
          (network) => network.family === 'IPv4'
        )

        if (network) startServer(network.address)
      }
    }
  }
)
