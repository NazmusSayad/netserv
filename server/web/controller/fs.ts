import * as fs from 'fs'
import * as path from 'path'
import { createGenerator, WebAppOptions } from '../config'
import { getInfoDir, getInfoFile } from '../getInfo'

export default createGenerator(function (config: WebAppOptions) {
  return {
    fsGetDir(req, res) {
      const targetPath = path.join(config.root, req.path)
      const stats = fs.statSync(targetPath, { throwIfNoEntry: false })
      return res.json({
        dir: stats?.isDirectory() ? getInfoDir(targetPath) : null,
      })
    },

    fsGetFile(req, res) {
      const targetPath = path.join(config.root, req.path)
      const stats = fs.statSync(targetPath, { throwIfNoEntry: false })
      return res.json({
        file: stats?.isFile() ? getInfoFile(targetPath) : null,
      })
    },

    rename(req, res) {
      const targetPath = path.join(config.root, req.path)
      const newPath = path.join(config.root, req.body.newPath)
      fs.renameSync(targetPath, newPath)
      res.json({ success: true })
    },

    delete(req, res) {
      const targetPath = path.join(config.root, req.path)
      fs.unlinkSync(targetPath)
      res.json({ success: true })
    },
  }
})
