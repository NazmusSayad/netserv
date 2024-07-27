import { Handler } from 'express'

export function handler<D extends Record<string, Handler>>(arg: D) {
  return arg as Record<keyof D, any>
}
