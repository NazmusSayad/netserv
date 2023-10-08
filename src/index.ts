import express from 'express'
import listen from './listen'
import { getDir, getPort, logger } from './utils'
import serveIndex from 'serve-index'

const root = getDir(process.argv, process.cwd())
const port = getPort(process.argv, 80)

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
listen(app, port).then(() => {
  console.log()
  console.log('\x1b[32m\x1b[1mRoot:\x1b[0m', '\x1b[32m' + root, '\x1b[0m')
  console.log()
})
