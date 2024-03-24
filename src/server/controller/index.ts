import path from 'path'
import * as fs from 'fs'
import { Request, Response } from 'express'
import { DirInfo, FileInfo } from '@/types/data'

function checkIfHasAccess(dirPath: string) {
  try {
    fs.statSync(dirPath)
    return true
  } catch {
    return false
  }
}

export function getInfoFactoryController(basePath: string) {
  function getFileInfo(srcPath: string): FileInfo {
    const stats = fs.statSync(srcPath)

    return {
      name: path.basename(srcPath),
      ext: path.extname(srcPath).slice(1),
      url: path.relative(basePath, srcPath),
      size: stats.size,
      modifiedAt: stats.mtime,
      createdAt: stats.birthtime,
    }
  }

  function getDirInfo(srcPath: string): DirInfo {
    const dirInfo = fs.readdirSync(srcPath).map((a) => path.join(srcPath, a))

    const files: FileInfo[] = []
    const directories: string[] = []

    dirInfo.forEach((item) => {
      const hasAccess = checkIfHasAccess(item)
      const stats = hasAccess && fs.statSync(item)

      if (stats && stats.isDirectory()) {
        return directories.push(path.basename(item))
      }

      if (stats && stats.isFile()) {
        return files.push(getFileInfo(item))
      }
    })

    return { directories, files }
  }

  return {
    async get(req: Request, res: Response) {
      const currentPath = path.join(basePath, decodeURI(req.url))
      if (!fs.existsSync(currentPath)) {
        return res.status(404).json({
          error: 'File not found!',
        })
      }

      const type = fs.statSync(currentPath).isDirectory() ? 'dir' : 'file'
      const info =
        type === 'dir' ? getDirInfo(currentPath) : getFileInfo(currentPath)
      res.json({ type, ...info })
    },

    async post(req: Request, res: Response) {
      const currentPath = path.join(basePath, decodeURI(req.url))
      const formDataFiles = [
        ...((req.files ?? []) as unknown as Express.Multer.File[]),
      ]

      for (const element of formDataFiles) {
        const filePath = path.join(currentPath, element.fieldname)
        const fileDirName = path.dirname(filePath)
        if (!fs.existsSync(fileDirName)) {
          fs.mkdirSync(fileDirName, { recursive: true })
        }

        fs.writeFileSync(filePath, element.buffer)
      }

      res.json({ message: 'File uploaded successfully!' })
    },

    async delete(req: Request, res: Response) {
      const currentPath = path.join(basePath, decodeURI(req.url))
      fs.unlinkSync(currentPath)
      res.json({ message: 'File deleted successfully!' })
    },
  }
}
