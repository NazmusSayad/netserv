export default function useFileDrop(
  addFile: (path: string, file: File) => void
) {
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    const droppedItems = Array.from(e.dataTransfer.items)

    droppedItems.forEach((item) => {
      const entry = item.webkitGetAsEntry()
      if (entry) {
        if (entry.isFile) {
          const file = item.getAsFile()
          if (file) addFile(file.name, file)
        } else if (entry.isDirectory) {
          readDirectory(entry, entry.name).then((folderFiles) => {
            folderFiles.forEach(({ path, file }) => addFile(path, file))
          })
        }
      }
    })
  }

  const readDirectory = (
    entry: any,
    path: string
  ): Promise<{ path: string; file: File }[]> => {
    return new Promise((resolve) => {
      const reader = entry.createReader()
      reader.readEntries((entries: any[]) => {
        const entryPromises = entries.map((entry) => {
          if (entry.isFile) {
            return new Promise<{ path: string; file: File }>((fileResolve) => {
              entry.file((file: File) => {
                fileResolve({ path: `${path}/${file.name}`, file })
              })
            })
          } else if (entry.isDirectory) {
            return readDirectory(entry, `${path}/${entry.name}`)
          }
          return Promise.resolve([]) // Return an empty array if entry is neither file nor directory
        })

        Promise.all(entryPromises).then((results) => {
          resolve(results.flat())
        })
      })
    })
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
  }

  return { handleDrop, handleDragOver } as const
}
