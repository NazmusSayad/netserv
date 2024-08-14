import { Handler } from 'express'
import * as path from 'path'
export const WEB_APP_DIR = path.join(__dirname, '../../web')
console.log({ WEB_APP_DIR })

export type WebAppOptions = {
  root: string
  port: number
  password?: string
  host?: string
  qr: boolean
  writable: boolean
  authEnabled: boolean
}

export function createGenerator<
  Fn extends (config: WebAppOptions) => Record<string, Handler>
>(fn: Fn) {
  return fn
}
