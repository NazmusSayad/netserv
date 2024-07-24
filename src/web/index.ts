import * as express from 'express'
import { t } from 'noarg'
import arg from '../arg'
import app from './app'
import path = require('path')

const WEB_APP_DIR = path.join(__dirname, '../../dist-web')

arg.create(
  'web',
  {
    description: 'Creates a http server',
    options: {
      host: t.string(),
      port: t.number(),
      root: t.string().default('.'),
    },
  },
  (_, options) => {
    console.log({ options })

    app.use('/@', express.static(WEB_APP_DIR), (_, res) =>
      res.sendFile(path.join(WEB_APP_DIR, '/index.html'))
    )

    app.use((_, res) => res.redirect('/@'))
    app.get('', (_, res) => res.redirect('/@'))

    app.listen(8000)
  }
)
