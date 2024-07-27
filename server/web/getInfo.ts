import * as fs from 'fs'
import * as path from 'path'

function getInfoDirBasic(target: string): InfoBasicDir {
  const stats = fs.statSync(target)

  return {
    type: 'dir',
    name: path.basename(target),
    createdAt: stats.birthtime,
    modifiedAt: stats.mtime,
  }
}

export function getInfoDir(target: string): InfoDir {
  const children = fs.readdirSync(target)

  const childDirs: Record<string, InfoBasicDir> = {}
  const childFiles: Record<string, InfoBasicFile> = {}

  children.forEach((name) => {
    const childPath = path.join(target, name)
    const stats = fs.statSync(childPath)
    if (stats.isDirectory()) {
      childDirs[name] = getInfoDirBasic(childPath)
    } else {
      childFiles[name] = getInfoFile(childPath)
    }
  })

  return { ...getInfoDirBasic(target), childDirs, childFiles }
}

export function getInfoFile(target: string): InfoFile {
  const stats = fs.statSync(target)

  return {
    type: 'file',
    name: path.basename(target),
    size: stats.size,
    createdAt: stats.birthtime,
    modifiedAt: stats.mtime,
  }
}
