import * as path from 'path'
import * as express from 'express'
import { WEB_APP_DIR } from './config'

export const apiRouter = express.Router()
export const authRouter = express.Router()
export const staticRouter = express.Router()

staticRouter.use(express.static(WEB_APP_DIR, { maxAge: 1 }), (_, res) =>
  res.sendFile(path.join(WEB_APP_DIR, '/index.html'))
)

export function createSuperApiRoute(
  path: string,
  method: 'get' | 'post',
  handler: express.Handler
) {
  const router = express.Router()
  router[method]('*', handler)
  apiRouter.use(path, router)
}
