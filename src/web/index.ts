import { t } from 'noarg'
import * as os from 'os'
import * as path from 'path'
import * as express from 'express'
import arg from '../arg'
import app from './app'
import * as qrcode from 'qrcode'
import apiRouter from './api-router'

const WEB_APP_DIR = path.join(__dirname, '../../dist-web')

arg.create(
  'web',
  {
    description: 'Creates a http server',
    options: {
      host: t.string(),
      root: t.string().default('.'),
      port: t.number().default(8000),
      password: t.string(),
      qr: t.boolean().default(true),
    },
  },
  (_, options) => {
    console.log({ options }, '\n')

    app.get('/', (req, res, next) => {
      res.redirect('/@')
      next()
    })

    app.use('/api', apiRouter)

    app.use(
      '/@',
      (req, res, next) => {
        next()
      },
      express.static(WEB_APP_DIR, { maxAge: 1 }),
      (_, res) => res.sendFile(path.join(WEB_APP_DIR, '/index.html'))
    )

    /***************************************
     ***** FANCY Listening... IGNORE!! *****
     ***************************************/
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
