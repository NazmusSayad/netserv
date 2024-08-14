import * as fs from 'fs'
import * as path from 'path'
import { createGenerator, WebAppOptions } from '../config'
import { getInfoDir, getInfoDirBasic, getInfoFile } from '../getInfo'

export default createGenerator(function (config: WebAppOptions) {
  return {
    fsGetDir(req, res) {
      const targetPath = path.join(config.root, decodeURIComponent(req.path))
      const stats = fs.statSync(targetPath, { throwIfNoEntry: false })
      return res.json({
        dir: stats?.isDirectory() ? getInfoDir(targetPath) : null,
      })
    },

    fsGetFile(req, res) {
      const targetPath = path.join(config.root, decodeURIComponent(req.path))
      const stats = fs.statSync(targetPath, { throwIfNoEntry: false })
      return res.json({
        file: stats?.isFile() ? getInfoFile(targetPath) : null,
      })
    },

    rename(req, res) {
      const targetPath = path.join(config.root, decodeURIComponent(req.path))
      const newPath = path.join(path.dirname(targetPath), req.body.newName)

      fs.renameSync(targetPath, newPath)
      res.json({ success: true })
    },

    delete(req, res) {
      const targetPath = path.join(config.root, decodeURIComponent(req.path))
      const files = req.body?.names?.map((name: string) =>
        path.join(targetPath, name)
      )

      for (const file of files) {
        const stats = fs.statSync(file, { throwIfNoEntry: false })
        if (!stats) continue

        if (stats.isFile()) fs.unlinkSync(file)
        else fs.rmSync(file, { recursive: true, force: true })
      }

      res.json({ success: true })
    },

    upload(req, res) {
      const filePath = path.join(
        config.root,
        decodeURIComponent(req.path),
        req.body.path
      )

      if (req.body.force === 'false' && fs.existsSync(filePath)) {
        return res.status(400).json({ error: 'File already exists' })
      }

      const fileDirPath = path.dirname(filePath)
      if (!fs.existsSync(fileDirPath)) {
        fs.mkdirSync(fileDirPath, { recursive: true })
      }

      fs.writeFileSync(filePath, req.file!.buffer)
      res.json({ success: true })
    },

    newFolder(req, res) {
      try {
        const newFolderPath = path.join(config.root, req.url, req.body.name)
        fs.mkdirSync(newFolderPath)
        res.json(getInfoDirBasic(newFolderPath))
      } catch (err: any) {
        res.status(400).json({
          error: err.message?.split(',')[0] ?? 'Failed to create folder',
        })
      }
    },
  }
})
