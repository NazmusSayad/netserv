import morgan from 'morgan'

export function bytesToSize(bytes: number): string {
  if (bytes === 0) return '[0]'
  if (Number.isNaN(bytes)) return '[Unknown]'

  const sizes = ['B', 'KB', 'MB', 'GB', 'TB']
  const i = Math.floor(Math.log(bytes) / Math.log(1024))
  const size = (bytes / Math.pow(1024, i)).toFixed(2)

  return `[${size}${sizes[i]}]`
}

export const logger = morgan(function (tokens, req, res) {
  const sizeInBytes = Number(tokens.res(req, res, 'content-length'))
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    bytesToSize(sizeInBytes),
    '@' + tokens['response-time'](req, res) + 'ms',
  ].join(' ')
})

export function getPort(args: string[], fallback: number) {
  const portFlag = args.indexOf('--port')
  const port = Number(args[portFlag + 1])
  if (Number.isInteger(port)) return port
  return fallback
}
