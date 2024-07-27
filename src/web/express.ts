import cors = require('cors')
import morgan = require('morgan')
import express = require('express')
import cookie = require('cookie-parser')

const app = express()

app.use(cors({ origin: /.*/, credentials: true }))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'))
app.use(cookie())
app.use(express.json())

// app.use((_, __, next) => setTimeout(next, 1000))

export default app
