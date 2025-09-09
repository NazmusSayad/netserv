import * as fs from 'fs'
import * as path from 'path'
import * as bunyan from 'bunyan'
import { FtpSrv } from 'ftp-srv'
import EventEmitter = require('events')

type FTPConfig = {
  host: string
  port: number
  root: string
  username?: string
  password?: string
}

export default async function (config: FTPConfig) {
  const url = `ftp://${config.host}:${config.port}`
  const ftpServer = new FtpSrv({
    url,
    anonymous: !(config.username || config.password),
    log: bunyan.createLogger({ name: 'ftp-server', level: 'fatal' }),
  })

  try {
    await ftpServer.listen()
    console.log(`FTP server running at: ${url}`)
  } catch (err) {
    console.log(`FTP server failed to start at: ${url}`)

    ftpServer.removeAllListeners()
    ftpServer.close()

    throw err
  }

  ftpServer.on(
    'login',
    ({ connection: _, username, password }, resolve, reject) => {
      const rootDir = path.resolve(config.root || '.')
      if (!fs.existsSync(rootDir)) {
        console.error(`Directory ${rootDir} does not exist`)
        return process.exit(0)
      }

      if (config.username && config.password) {
        if (username !== config.username || password !== config.password) {
          return reject(new Error('Invalid username or password'))
        }
      }

      resolve({ root: rootDir })
    }
  )
}
