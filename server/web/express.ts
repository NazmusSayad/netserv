import * as cors from 'cors'
import * as morgan from 'morgan'
import * as express from 'express'
import { createExtrass } from 'extrass'
import cookie = require('cookie-parser')

export const customExtrass = createExtrass({})
export const app = express()

app.use(cors({ origin: /.*/, credentials: true }))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'))
app.use(cookie())
app.use(express.json())
