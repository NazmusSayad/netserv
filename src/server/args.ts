import path from 'path'
import qrcode from 'qrcode'
import Express from 'express'
import NoArg, { t } from 'noarg'

import app from './express'
import { getInfoFactoryController } from './controller'
import { networkInterfaces } from 'os'

const arg = new NoArg(
  'app',

  {
    listArgument: {
      name: 'src',
      minLength: 0,
      maxLength: 1,
    },

    options: {
      host: t.string().description('Server host'),
      port: t.number().description('Server port').default(80),
      addresses: t
        .array(t.string())
        .aliases('a')
        .description('A list of server addresses to listen'),
    },
  },

  ([src], options) => {
    const root = path.resolve(src ?? '.')

    app.use('/api', getInfoFactoryController(root))
    app.use(
      '/drive',
      Express.static(root, {
        index: false,
        dotfiles: 'allow',
      })
    )

    app.use(
      '/@',
      Express.static(path.join(__dirname, '../../public')),
      Express.static(path.join(__dirname, '../../dist-app')),
      (req, res) => {
        res.sendFile(path.join(__dirname, '../../dist-app/index.html'))
      }
    )

    app.use((_, res) => res.redirect('/@'))

    function listen(name: string, port: number, host: string) {
      app.listen(port, host, async () => {
        const url = `http://${host}:${port}`
        const result = await qrcode.toString(url, {
          type: 'terminal',
          small: true,
        })

        console.log(
          `${'\x1b[0m\x1b[34m\x1b[1m'}Server name: \x1b[0m\x1b[34m${name}\x1b[0m`
        )
        console.log(`Address: \x1b[32m${url}\x1b[0m`)
        console.log(result)
      })
    }

    if (options.addresses) {
      options.addresses.forEach((address) => {
        const [host, port] = address.split(':')
        listen('Custom Address', Number(port), host)
      })
    } else if (options.host) {
      listen('Custom Host', options.port, options.host)
    } else {
      const networkEntries = Object.entries(networkInterfaces()).reverse()
      for (const [key, addresses] of networkEntries) {
        const ipv4 = addresses?.find((x) => x.family === 'IPv4')
        ipv4 && listen(key, options.port, ipv4?.address)
      }
    }
  }
)

arg.run()
