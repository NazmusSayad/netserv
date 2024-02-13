import Express from 'express'
import cors from 'cors'

const app = Express()

app.use(cors({ origin: /.*/ }))
app.use(Express.json())

export default app
