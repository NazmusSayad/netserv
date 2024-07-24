import * as express from 'express'
import * as morgan from 'morgan'
import * as cors from 'cors'

const app = express()

app.use(cors({ origin: /.*/ }))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'))


export default app
