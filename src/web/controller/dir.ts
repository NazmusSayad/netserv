import { Handler } from 'express'

export const getInfo: Handler = (req, res) => {
  res.json({ info: 'info' })
}
