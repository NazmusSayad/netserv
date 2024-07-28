import {
  MdClose,
  MdDeleteOutline,
  MdOutlineDownload,
  MdDriveFileRenameOutline,
} from 'react-icons/md'
import { useEffect, useMemo } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { IconButton, Modal } from '@mui/material'
import { createSuspense, getFsUrl } from '@/api/react'
import PreviewFile from './PreviewFile'
import { LoadingSuspense } from '@/components/Loading'
import { downloadUsingDOM } from '@/utils/dom'

const PreviewModal = () => {
  const location = useLocation()

  const fileNameExistsInQuery = useMemo(() => {
    return location.search.includes('file=')
  }, [location.search])!

  return (
    <Modal open={!!fileNameExistsInQuery}>
      <PreviewModalCore />
    </Modal>
  )
}

function PreviewModalCore() {
  const location = useLocation()
  const navigate = useNavigate()
  const currentFile = $useStore((state) => state.homeui.status.currentFile)

  useEffect(
    () => () => {
      $store.homeui.setState({ currentFile: null })
    },
    []
  )

  return (
    <div
      className="h-full w-full grid outline-none"
      onClick={() => navigate(location.pathname)}
    >
      <div
        className={$tw(
          'overflow-hidden bg-zinc-800 m-auto size-full transition-all shadow-zinc-400 max-w-5xl grid auto-rows-[auto_1fr]',
          'sm:{rounded-lg h-[90%] w-[90%]}'
        )}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className={
            'flex justify-between py-2 px-4 border-b border-stone-600 items-center'
          }
        >
          <div>
            <IconButton disabled={!currentFile}>
              <MdDriveFileRenameOutline />
            </IconButton>
            <IconButton
              disabled={!currentFile}
              onClick={() => {
                downloadUsingDOM(
                  getFsUrl(location.pathname, currentFile?.name!)
                )
              }}
            >
              <MdOutlineDownload />
            </IconButton>
            <IconButton disabled={!currentFile} className={'text-red-500'}>
              <MdDeleteOutline color={'#ef4444'} />
            </IconButton>
          </div>

          <div>
            <IconButton onClick={() => navigate(location.pathname)}>
              <MdClose />
            </IconButton>
          </div>
        </div>

        <div className={'overflow-x-hidden overflow-y-auto'}>
          <LoadingSuspense text={'Loading file...'}>
            <div className={'px-4 pb-4 pt-2 min-h-full grid'}>
              <PreviewFetchData currentFile={currentFile} />
            </div>
          </LoadingSuspense>
        </div>
      </div>
    </div>
  )
}

const useSuspense = createSuspense()
function PreviewFetchData({ currentFile }) {
  const location = useLocation()

  const fileName = useMemo(() => {
    // FIXME: This is not perfect fix this
    const [, name] = location.search.match(/file=(.+)/) ?? []
    return name
  }, [])

  useSuspense(
    { url: 'api/file/' + location.pathname + '/' + fileName },
    ([file]) => {
      file.ok && $store.homeui.setState({ currentFile: file.data.file })
    }
  )

  return currentFile ? <PreviewFile /> : 'No File Found!'
}

export default PreviewModal
