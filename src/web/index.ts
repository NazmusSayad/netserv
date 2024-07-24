import * as express from 'express'
import { t } from 'noarg'
import arg from '../arg'
import app from './app'
import path = require('path')

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

    app.use(
      '/@',
      express.static(path.join(__dirname, '../../dist-web'), {
        cacheControl: false,
      })
    )

    app.use((_, res) => res.redirect('/@'))
    app.get('', (_, res) => res.redirect('/@'))

    app.listen(8000)
  }
)
