import * as path from 'path'
import * as express from 'express'

const app = express()

app.use(express.static(path.resolve('dist-web')))

export default app
