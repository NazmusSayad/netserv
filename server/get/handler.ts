import * as fs from 'fs'
import * as path from 'path'
import * as busboy from 'busboy'
import { Request, Response } from 'express'
import { GetConfig } from './server-starter'
import ProgressBar from '../utils/progress-bar'

export function upload(config: GetConfig) {
  return async (req: Request, res: Response) => {
    const bb = busboy({ headers: req.headers })

    const totalSize = parseInt(req.headers['content-length'] ?? '0', 10) || 0
    const progressBar = ProgressBar(totalSize)
    let uploadedSize = 0

    bb.on('file', (name, file, info) => {
      const saveTo = path.join(config.output, path.basename(info.filename))
      file.pipe(fs.createWriteStream(saveTo))

      file.on('data', (data) => {
        uploadedSize += data.length
        progressBar.update(uploadedSize)
      })

      file.on('end', () => {})
    })

    bb.on('close', () => {
      res.end()
      progressBar.update(totalSize)
      progressBar.stop()
    })

    req.pipe(bb)
  }
}
