import { useApi } from '@/api/react'
import SimpleModal from '@/components/SimpleModal'
import { formatBytesToUnit } from '@/utils'
import { Button, IconButton } from '@mui/material'
import { useEffect, useState } from 'react'
import { MdFolderOpen, MdFileOpen, MdUpload, MdClose } from 'react-icons/md'
import { useLocation, useNavigate } from 'react-router-dom'
import { RiRefreshLine } from 'react-icons/ri'
import useFileDrop from './useFileDrop'
import { RiDragDropLine } from 'react-icons/ri'

export default function UploadModal() {
  const navigate = useNavigate()
  const location = useLocation()
  const [files, setFiles] = useState<FilesProp['files']>([])
  const [currentLoading, setCurrentLoading] = useState<string>('')
  const isUploadModalOpen = $useStore(
    (state) => state.homeui.status.uploadModal
  )

  useEffect(() => {
    if (!isUploadModalOpen) {
      navigate(location.pathname, { replace: true, state: 'refresh' })
    }
  }, [isUploadModalOpen])

  return (
    <SimpleModal
      disableContentPadding
      open={isUploadModalOpen}
      close={() => $actions.homeui.setState({ uploadModal: false })}
      header={
        <p>
          {Object.keys(files).length > 0
            ? `${Object.keys(files).length} ${
                Object.keys(files).length > 1 ? 'items' : 'item'
              } selected`
            : 'Choose files or folders to upload'}

          {currentLoading && ' - Uploading...'}
        </p>
      }
      containerClassName={
        'w-full h-full sm:{w-[min(36rem,97%)] h-[min(36rem,97%)] rounded-lg}'
      }
    >
      <UploadModalCore
        files={files}
        currentLoading={currentLoading}
        setCurrentLoading={setCurrentLoading}
        addFile={(path, file) => {
          setFiles((prev) => {
            if (prev.find((f) => f.path === path)) return prev
            return [...prev, { path, file }]
          })
        }}
        removeFile={(path) => {
          setFiles((prev) => {
            return prev.filter((f) => f.path !== path)
          })
        }}
        setError={(path, error) => {
          setFiles((prev) => {
            return prev.map((f) => {
              if (f.path === path) return { ...f, error, force: false }
              return f
            })
          })
        }}
        forceUpload={(path) => {
          setFiles((prev) => {
            return prev.map((f) => {
              if (f.path === path)
                return { ...f, force: true, error: undefined }
              return f
            })
          })
        }}
      />
    </SimpleModal>
  )
}

function UploadModalCore({
  files,
  addFile,
  setError,
  removeFile,
  forceUpload,
  currentLoading,
  setCurrentLoading,
}: FilesProp & {
  currentLoading: string
  setCurrentLoading: (path: string) => void
}) {
  const api = useApi()
  const location = useLocation()
  const fileDrop = useFileDrop(addFile)

  async function startUpload() {
    let hasError = false

    for (const { path, file, force } of files) {
      setCurrentLoading(path)
      const formData = new FormData()
      formData.append('path', path)
      formData.append('file', file)
      formData.append('force', force ? 'true' : 'false')

      const res = await await api.post(
        '/api/upload' + location.pathname,
        formData
      )

      setCurrentLoading('')
      if (res.ok) removeFile(path)
      else {
        setError(path, res.error)
        hasError = true
      }
    }

    hasError || $actions.homeui.setState({ uploadModal: false })
  }

  return (
    <div
      onDrop={fileDrop.handleDrop}
      onDragOver={fileDrop.handleDragOver}
      className={'grid auto-rows-[1fr_auto] h-full'}
    >
      <div className={'overflow-auto py-2'}>
        {files.map(({ path, file, error, force }, index) => (
          <div
            key={index}
            className={'flex justify-between items-center pr-1 px-4 mb-1 gap-2'}
          >
            <div
              title={error}
              className={$tw(
                'flex justify-between items-center w-full',
                !!error && 'text-red-500 line-through',
                force && 'text-blue-500'
              )}
            >
              <p>{path}</p>
              <p>{formatBytesToUnit(file.size)}</p>
            </div>

            <div className={'flex items-center'}>
              {error && (
                <Button size={'small'} onClick={() => forceUpload(path)}>
                  Force
                </Button>
              )}

              <IconButton
                size={'small'}
                onClick={() => removeFile(path)}
                disabled={path === currentLoading}
              >
                {path === currentLoading ? (
                  <RiRefreshLine className={'animate-spin text-gray-200'} />
                ) : (
                  <MdClose className={'text-red-500'} />
                )}
              </IconButton>
            </div>
          </div>
        ))}

        {files.length === 0 && (
          <div className={'flex flex-col items-center h-full w-full'}>
            <div className={'w-full m-auto text-center'}>
              <div className={'mb-6'}>
                <RiDragDropLine className={'size-[30%] m-auto text-white/30'} />
              </div>

              <p className={'text-white/70'}>
                Drag and drop files or folders here
              </p>
            </div>
          </div>
        )}
      </div>

      <ModalBottomActions
        addFile={addFile}
        startUpload={startUpload}
        currentLoading={currentLoading}
      />
    </div>
  )
}

function ModalBottomActions({
  addFile,
  startUpload,
  currentLoading,
}: Pick<FilesProp, 'addFile'> & {
  startUpload: () => void
  currentLoading: string
}) {
  return (
    <div className={'flex justify-between items-center py-2 px-4'}>
      <div>
        <InputFile addFile={addFile} disabled={Boolean(currentLoading)} />
        <InputFolder addFile={addFile} disabled={Boolean(currentLoading)} />
      </div>

      <div>
        <Button
          disabled={Boolean(currentLoading)}
          variant={'outlined'}
          onClick={startUpload}
          startIcon={<MdUpload style={{ marginTop: '-0.1rem' }} />}
        >
          Start Upload
        </Button>
      </div>
    </div>
  )
}

function InputFolder({
  addFile,
  disabled,
}: Pick<FilesProp, 'addFile'> & { disabled?: boolean; hidden?: boolean }) {
  return (
    <>
      <input
        hidden
        multiple
        type="file"
        {...{ directory: '', webkitdirectory: '', mozdirectory: '' }}
        onChange={(e) => {
          const files = [...e.target.files!]
          files.forEach((file) =>
            addFile(file.webkitRelativePath ?? file.name, file)
          )
          e.target.value = ''
        }}
      />

      <Button
        disabled={disabled}
        startIcon={<MdFolderOpen style={{ marginTop: '-0.1rem' }} />}
        onClick={(e: any) => e.target.previousElementSibling.click()}
      >
        Choose Folders
      </Button>
    </>
  )
}

function InputFile({
  addFile,
  disabled,
}: Pick<FilesProp, 'addFile'> & { disabled?: boolean }) {
  return (
    <>
      <input
        hidden
        multiple
        type="file"
        onChange={(e) => {
          const files = [...e.target.files!]
          files.forEach((file) => addFile(file.name, file))
          e.target.value = ''
        }}
      />

      <Button
        disabled={disabled}
        startIcon={<MdFileOpen style={{ marginTop: '-0.1rem' }} />}
        onClick={(e: any) => e.target.previousElementSibling.click()}
      >
        Choose Files
      </Button>
    </>
  )
}

type FilesProp = {
  files: { path: string; file: File; error?: string; force?: boolean }[]
  setError: (path: string, error: string) => void
  addFile: (path: string, file: File) => void
  forceUpload: (path: string) => void
  removeFile: (path: string) => void
}
