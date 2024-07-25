import jwt = require('jsonwebtoken')

const JWT_SECRET =
  Math.random().toString(36).substring(2, 15) +
  Math.random().toString(36).substring(2, 15) +
  Math.random().toString(36).substring(2, 15)

type JWTPayload = {}

export const create = (payload: JWTPayload): string => {
  return jwt.sign({ payload }, JWT_SECRET, {
    expiresIn: '1d',
  })
}

export const verify = (token: string): JWTPayload => {
  const decoded = jwt.verify(token, JWT_SECRET)
  return (decoded as { payload: JWTPayload }).payload
}
