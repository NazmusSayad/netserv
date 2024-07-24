import { t } from 'noarg'
import * as path from 'path'
import * as express from 'express'
import arg from '../arg'
import app from './app'

const WEB_APP_DIR = path.join(__dirname, '../../dist-web')
const staticRouter = express.Router()
staticRouter.use((_, __, next) => {
  console.count('I am from static router...')
  next()
})
staticRouter.use(express.static(WEB_APP_DIR), (_, res) =>
  res.sendFile(path.join(WEB_APP_DIR, '/index.html'))
)

arg.create(
  'web',
  {
    description: 'Creates a http server',
    options: {
      root: t.string().default('.'),
      host: t.string(),
      port: t.number(),
      password: t.string(),
    },
  },
  (_, options) => {
    console.log({ options })

    app.use('/', (_, res) => {
      res.redirect('/@')
      console.log('Hello')
      res.end()
    })

    app.use('/@', staticRouter)
    app.listen(8000)
  }
)
