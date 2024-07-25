import fs = require('fs')
import path = require('path')
import bunyan = require('bunyan')
import { FtpSrv } from 'ftp-srv'

type FTPConfig = {
  host: string
  port: number
  root: string
  username?: string
  password?: string
}

export default function (config: FTPConfig) {
  const url = `ftp://${config.host}:${config.port}`
  const ftpServer = new FtpSrv(url, {
    anonymous: !(config.username || config.password),
    log: bunyan.createLogger({ name: 'ftp-server', level: 'fatal' }),
  })

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

  ftpServer.listen().then(() => {
    console.log(`FTP server running at: ${url}`)
  })
}
