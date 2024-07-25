import path = require('path')
import express = require('express')
import { WEB_APP_DIR } from './config'

export const authRouter = express.Router()

export const staticRouter = express.Router()
staticRouter.use(express.static(WEB_APP_DIR, { maxAge: 1 }), (_, res) =>
  res.sendFile(path.join(WEB_APP_DIR, '/index.html'))
)
