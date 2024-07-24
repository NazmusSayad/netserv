import * as path from 'path'
import * as express from 'express'
import * as morgan from 'morgan'

const app = express()

app.use(morgan(':method :url :status :res[content-length] - :response-time ms'))

export default app
