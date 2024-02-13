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

  return async (req: Request, res: Response) => {
    const currentPath = path.join(basePath, req.url)
    if (!fs.existsSync(currentPath)) {
      return res.status(404).json({
        error: 'File not found!',
      })
    }

    const type = fs.statSync(currentPath).isDirectory() ? 'dir' : 'file'
    const info =
      type === 'dir' ? getDirInfo(currentPath) : getFileInfo(currentPath)
    res.json({ type, ...info })
  }
}
