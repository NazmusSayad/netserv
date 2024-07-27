import * as jwt from 'jsonwebtoken'

const JWT_SECRET =
  Math.random().toString(36).substring(2, 15) +
  Math.random().toString(36).substring(2, 15) +
  Math.random().toString(36).substring(2, 15)

type JWTPayload = {
  ip: string
  size: number
}

export const create = (payload: JWTPayload): string => {
  return jwt.sign({ payload }, JWT_SECRET, {
    expiresIn: '3s',
  })
}

export const verify = (token: string): JWTPayload => {
  const decoded = jwt.verify(token, JWT_SECRET)
  return (decoded as { payload: JWTPayload }).payload
}
