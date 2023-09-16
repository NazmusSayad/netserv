import * as path from 'path'
import express from 'express'
import listen from './listen'
import { logger } from './utils'
import serveIndex from 'serve-index'

const root = path.resolve(process.argv[2] || process.cwd())

const app = express()
app.use(
  logger,
  express.static(root),
  serveIndex(root, {
    icons: true,
    view: 'details',
  })
)

console.clear()
listen(app, 80).then(() => {
  console.log()
  console.log('\x1b[32m\x1b[1mRoot:\x1b[0m', '\x1b[32m' + root, '\x1b[0m')
  console.log()
})
