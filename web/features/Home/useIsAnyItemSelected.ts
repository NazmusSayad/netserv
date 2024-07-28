import { useMemo } from 'react'

export default function () {
  const currentDir = $useStore((state) => state.homeui.status.currentDir)

  return useMemo(() => {
    if (!currentDir) return false

    for (const key in currentDir.childDirs) {
      const value = currentDir.childDirs[key]
      if (value.selected) return true
    }

    for (const key in currentDir.childFiles) {
      const value = currentDir.childFiles[key]
      if (value.selected) return true
    }

    return false
  }, [currentDir])
}
