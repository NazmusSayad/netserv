import { useApi } from '@/api/react'
import SimpleModal from '@/components/SimpleModal'
import { formatBytesToUnit } from '@/utils'
import { Button, IconButton } from '@mui/material'
import { useEffect, useState } from 'react'
import { MdFolderOpen, MdFileOpen, MdUpload, MdClose } from 'react-icons/md'
import { useLocation, useNavigate } from 'react-router-dom'
import { RiRefreshLine } from 'react-icons/ri'

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
      />
    </SimpleModal>
  )
}

function UploadModalCore({
  files,
  addFile,
  removeFile,
  currentLoading,
  setCurrentLoading,
}: FilesProp & {
  currentLoading: string
  setCurrentLoading: (path: string) => void
}) {
  const api = useApi()
  const location = useLocation()

  async function startUpload() {
    for (const { path, file } of files) {
      setCurrentLoading(path)
      const formData = new FormData()
      formData.append('path', path)
      formData.append('file', file)
      await api.post('/api/upload' + location.pathname, formData)
      removeFile(path)
      setCurrentLoading('')
    }

    $actions.homeui.setState({ uploadModal: false })
  }

  return (
    <div className={'grid auto-rows-[1fr_auto] h-full'}>
      <div className={'overflow-auto py-2'}>
        {files.map(({ path, file }, index) => (
          <div
            key={index}
            className={'flex justify-between items-center pr-1 px-4 mb-1 gap-2'}
          >
            <div className={'flex justify-between items-center w-full'}>
              <p>{path || file.name}</p>
              <p>{formatBytesToUnit(file.size)}</p>
            </div>

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
        ))}
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
          disabled={Boolean(currentLoading)}
          startIcon={<MdFolderOpen style={{ marginTop: '-0.1rem' }} />}
          onClick={(e: any) => e.target.previousElementSibling.click()}
        >
          Choose Folders
        </Button>

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
          disabled={Boolean(currentLoading)}
          startIcon={<MdFileOpen style={{ marginTop: '-0.1rem' }} />}
          onClick={(e: any) => e.target.previousElementSibling.click()}
        >
          Choose Files
        </Button>
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

type FilesProp = {
  files: { path: string; file: File }[]
  addFile: (path: string, file: File) => void
  removeFile: (path: string) => void
}
