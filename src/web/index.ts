import { t } from 'noarg'
import os = require('os')
import extrass, { catchError } from 'extrass'
import express = require('express')
import qrcode = require('qrcode')
import path = require('path')
import arg from '../arg'
import app from './express'
import generateController from './generate-controller'
import { apiRouter, authRouter, staticRouter } from './router'

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
      password: t.string(),
      host: t.string(),
      port: t.number().default(8000),
      qr: t.boolean().default(true),
    },
  },
  ([root = '.'], options) => {
    console.log({ root, options }, '\n')
    // options.password = 'pass'

    const authEnabled = !!options.password
    const controllers = catchError(generateController({ root, ...options }))

    // Setup auth router
    {
      if (authEnabled) authRouter.post('/login', controllers.login)
      authRouter.get('/init', controllers.init)
      app.use('/auth', authRouter)
    }

    // Setup Static Router and root route fallback
    {
      app.use('/@', staticRouter)
      app.get('/', (req, res, next) => {
        res.redirect('/@')
        next()
      })
    }

    // Enable auth middleware
    app.use(controllers.checkAuthMiddleware)

    // Setup API router
    {
      app.use('/api', apiRouter)
      app.use('/drive', express.static(path.resolve(root), { index: false }))
    }

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

    extrass(app)
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
