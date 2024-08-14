import { t } from 'noarg'
import * as os from 'os'
import * as path from 'path'
import * as qrcode from 'qrcode'
import * as express from 'express'
import extrass, { catchError } from 'extrass'
import arg from '../arg'
import app from './express'
import {
  apiRouter,
  authRouter,
  createSuperApiRoute,
  staticRouter,
} from './router'
import generateFsController from './controller/fs'
import generateAuthController from './controller/auth'
import multer = require('multer')

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
    // options.password = 'pass'
    const config = {
      ...options,
      root: path.resolve(root),
      authEnabled: !!options.password,
    }

    console.log(config, '\n')

    const authController = catchError(generateAuthController(config))
    const fsController = catchError(generateFsController(config))
    const multerParser = multer({ storage: multer.memoryStorage() })

    // Setup auth router
    if (config.authEnabled) authRouter.post('/login', authController.login)
    authRouter.get('/init', authController.init)
    app.use('/auth', authRouter)

    // Setup Static Router and root route fallback
    app.use('/@', staticRouter)
    app.get('/', (_, res) => res.redirect('/@'))

    // Enable auth middleware
    app.use(authController.checkAuthMiddleware)

    // Setup API router
    createSuperApiRoute('/dir', 'get', fsController.fsGetDir)
    createSuperApiRoute('/file', 'get', fsController.fsGetFile)
    createSuperApiRoute('/rename', 'post', fsController.rename)
    createSuperApiRoute('/delete', 'post', fsController.delete)
    createSuperApiRoute('/new-folder', 'post', fsController.newFolder)
    createSuperApiRoute(
      '/upload',
      'post',
      multerParser.single('file'),
      fsController.upload
    )

    app.use('/api', apiRouter)
    app.use(
      '/fs',
      express.static(path.resolve(root), {
        index: false,
        dotfiles: 'allow',
      })
    )

    function listen(name: string, port: number, host: string) {
      app.listen(port, host, async () => {
        const url = `http://${host}:${port}`

        // Text output
        console.log(
          `${'\x1b[0m\x1b[34m\x1b[1m'}Server name: \x1b[0m\x1b[34m${name}\x1b[0m`
        )
        console.log(`URL: \x1b[32m${url}\x1b[0m`)

        // QR code output
        if (config.qr) {
          const qrCodeText = await qrcode.toString(url, {
            type: 'terminal',
            small: true,
          })
          console.log(qrCodeText)
        }
      })
    }

    extrass(app)
    if (config.host) {
      listen('Custom Address', config.port, config.host)
    } else if (config.host) {
      listen('Custom Host', config.port, config.host)
    } else {
      const networkEntries = Object.entries(os.networkInterfaces())
      for (const [key, addresses] of networkEntries) {
        const ipv4 = addresses?.find((x) => x.family === 'IPv4')
        ipv4 && listen(key, config.port, ipv4?.address)
      }
    }
  }
)
