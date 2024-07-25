import { t } from 'noarg'
import os = require('os')
import qrcode = require('qrcode')
import arg from '../arg'
import app from './express'
import { generateApp } from './app'

arg.create(
  'web',
  {
    description: 'Creates a http server',
    listArgument: {
      name: 'Target Dir',
      description: 'The directory to serve',
      type: t.string(),
      maxLength: 1,
    },
    options: {
      host: t.string(),
      port: t.number().default(8000),
      password: t.string(),
      qr: t.boolean().default(true),
    },
  },
  ([root = '.'], options) => {
    console.log({ root, options }, '\n')
    options.password = 'pass'

    generateApp({ root, ...options })

    function listen(name: string, port: number, host: string) {
      app.listen(port, host, async () => {
        const url = `http://${host}:${port}`

        // Text output
        console.log(
          `${'\x1b[0m\x1b[34m\x1b[1m'}Server name: \x1b[0m\x1b[34m${name}\x1b[0m`
        )
        console.log(`URL: \x1b[32m${url}\x1b[0m`)

        // QR code output
        if (options.qr) {
          const qrCodeText = await qrcode.toString(url, {
            type: 'terminal',
            small: true,
          })
          console.log(qrCodeText)
        }
      })
    }

    if (options.host) {
      listen('Custom Address', options.port, options.host)
    } else if (options.host) {
      listen('Custom Host', options.port, options.host)
    } else {
      const networkEntries = Object.entries(os.networkInterfaces())
      for (const [key, addresses] of networkEntries) {
        const ipv4 = addresses?.find((x) => x.family === 'IPv4')
        ipv4 && listen(key, options.port, ipv4?.address)
      }
    }
  }
)
