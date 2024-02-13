import path from 'path'
import qrcode from 'qrcode'
import Express from 'express'
import NoArg, { t } from 'noarg'

import app from './express'
import address from './address'
import { getInfoFactoryController } from './controller'

const arg = new NoArg(
  'app',

  {
    listArgument: {
      name: 'src',
      minLength: 0,
      maxLength: 1,
    },

    options: {
      port: t.number().default(80).description('Port to start the server'),
      host: t
        .string()
        .default(address())
        .description('Host to start the server'),
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

    app.listen(options.port, options.host, async () => {
      const url = `http://${options.host}:${options.port}`
      const result = await qrcode.toString(url, {
        type: 'terminal',
        small: true,
      })

      console.log(`Server started: ${url}\n`)
      console.log(result)
    })
  }
)

arg.run()
