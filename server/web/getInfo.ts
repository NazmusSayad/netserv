import * as fs from 'fs'
import * as path from 'path'

export function getInfoDirBasic(target: string): InfoChildDirServer {
  const stats = fs.statSync(target)

  return {
    type: 'dir',
    name: path.basename(target),
    createdAt: stats.birthtime,
    modifiedAt: stats.mtime,
  }
}

export function getInfoDir(target: string): InfoDirServer {
  const children = fs.readdirSync(target)

  const childDirs: InfoDirServer['childDirs'] = {}
  const childFiles: InfoDirServer['childFiles'] = {}

  children.forEach((name) => {
    if (name.startsWith('$RECYCLE.BIN')) return

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

export function getInfoFile(target: string): InfoDetailedFile {
  const stats = fs.statSync(target)

  return {
    type: 'file',
    name: path.basename(target),
    ext: path.extname(target).slice(1) || path.basename(target).slice(1),
    size: stats.size,
    createdAt: stats.birthtime,
    modifiedAt: stats.mtime,
  }
}
