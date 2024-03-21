import { useEffect, useRef, useState } from 'react'
import css from './Upload.module.scss'
import UploadIcon from '@/assets/icons/upload.svg'
import CrossIcon from '@/assets/icons/cross.svg'
import { useApi } from '@/api/react'
import { useLocation } from 'react-router-dom'

export default function Upload() {
  const api = useApi()
  const location = useLocation()
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [fileMap, setFileMap] = useState<Record<string, File>>({})
  const dialogRef = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    if (isModalVisible) dialogRef.current!.showModal()
    else dialogRef.current!.close()
  }, [isModalVisible])

  function handleFileInput(e: React.ChangeEvent<HTMLInputElement>) {
    const target = e.target as HTMLInputElement & {
      files: FileList
    }

    const fileObj = {} as Record<string, File>
    for (const element of target.files) {
      fileObj[element.webkitRelativePath || element.name] = element
    }

    setFileMap((prev) => ({ ...prev, ...fileObj }))
    e.target.value = ''
  }

  function handleDeleteFiles(...files: string[]) {
    setFileMap((prev) => {
      const newFileMap = { ...prev }
      for (const file of files) {
        delete newFileMap[file]
      }
      return newFileMap
    })
  }

  async function handleSubmit() {
    if (Object.keys(fileMap).length === 0) return

    const formData = new FormData()
    for (const [key, file] of Object.entries(fileMap)) {
      formData.append(key, file)
    }

    const result = await api.post(location.pathname, formData)
    console.log(result)
  }

  return (
    <>
      <button className={css.Upload}>
        <UploadIcon onClick={() => setIsModalVisible((b) => !b)} />
      </button>

      <dialog ref={dialogRef} className={css.Dialog}>
        <div
          className={css.backdrop}
          onClick={() => setIsModalVisible(false)}
        />

        <div className={css.content}>
          <div className={css.header}>
            <div className={css.wrapper}>
              <h2>Upload</h2>
              <button onClick={() => setIsModalVisible(false)}>Close</button>
            </div>
          </div>

          <div className={css.body}>
            <div className={css.wrapper}>
              <FilesList
                base=""
                fileMap={fileMap}
                onDelete={handleDeleteFiles}
              />
            </div>
          </div>

          <div className={css.footer}>
            <div className={css.wrapper}>
              <div className={css.contentSelectBtnGroup}>
                <div>
                  <input
                    hidden
                    multiple
                    type="file"
                    onInput={handleFileInput}
                  />
                  <button
                    onClick={({ target }: any) =>
                      target.previousElementSibling.click()
                    }
                  >
                    Files
                  </button>
                </div>

                <div>
                  <input
                    hidden
                    multiple
                    type="file"
                    onInput={handleFileInput}
                    {...{ webkitdirectory: '', directory: '' }}
                  />
                  <button
                    onClick={({ target }: any) =>
                      target.previousElementSibling.click()
                    }
                  >
                    Folders
                  </button>
                </div>
              </div>

              <div>
                <button onClick={handleSubmit}>Upload</button>
              </div>
            </div>
          </div>
        </div>
      </dialog>
    </>
  )
}

function FilesList({
  fileMap,
  base,
  onDelete,
}: {
  fileMap: Record<string, File>
  base: string
  onDelete: (...file: string[]) => void
}) {
  const baseFiles = {} as Record<string, File>
  const childFiles = {} as Record<string, Record<string, File>>

  for (const [key, file] of Object.entries(fileMap)) {
    if (key.includes('/')) {
      const [child, ...rest] = key.split('/')
      childFiles[child] ??= {}
      childFiles[child][rest.join('/')] = file
    } else {
      baseFiles[key] = file
    }
  }

  return (
    <ul className={css.filesList}>
      {[
        ...Object.entries(childFiles).map(([key, fileMap]) => (
          <li key={key} style={{ marginBottom: '1rem' }}>
            <div className={css.liFile}>
              <div className={css.text}>
                <span>{key}</span>
              </div>

              <button
                className={css.removeBtn}
                onClick={() => {
                  onDelete(
                    ...Object.keys(fileMap).map((fileName) =>
                      joinFilePath(base, key, fileName)
                    )
                  )
                }}
              >
                <CrossIcon />
              </button>
            </div>

            <div style={{ height: '1rem' }} />
            <FilesList
              key={key}
              fileMap={fileMap}
              onDelete={onDelete}
              base={joinFilePath(base, key)}
            />
          </li>
        )),

        ...Object.entries(baseFiles).map(([key, file]) => (
          <li key={key}>
            <div className={css.liFile}>
              <div className={css.text}>
                <span>{key}</span>
                <span className={css.textSize}>{file.size} bytes</span>
              </div>

              <button
                className={css.removeBtn}
                onClick={() => onDelete(joinFilePath(base, key))}
              >
                <CrossIcon />
              </button>
            </div>
          </li>
        )),
      ]}
    </ul>
  )
}

function joinFilePath(...args: string[]) {
  return args.filter(Boolean).join('/')
}
