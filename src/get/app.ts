import fs = require('fs')
import path = require('path')
import express = require('express')
import * as jwt from './jwt'

const app = express()
const uploadDir = path.join(__dirname, 'uploads')

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true })
}

app.get('/token/:size', (req, res) => {
  res.json({
    token: jwt.create({ ip: req.ip!, size: +req.params.size }),
    message: 'Token will expire in 3 seconds',
  })
})

app.post('/upload', (req, res, next) => {
  if (!req.headers['content-type']?.includes('multipart/form-data')) {
    return res.status(400).end()
  }

  if (!req.headers.authorization) {
    return res.status(401).end()
  }

  const token = req.headers.authorization
  const payload = jwt.verify(token)

  if (payload.ip !== req.ip) {
    return res.status(403).end()
  }

  if (payload.size !== +req.headers['content-length']!) {
    return res.status(400).end()
  }

  next()
})

export default app
