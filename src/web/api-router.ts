import * as express from 'express'

const apiRouter = express.Router()

apiRouter.get('/init', (req, res) => {
  res.send('Hello')
})

export default apiRouter
