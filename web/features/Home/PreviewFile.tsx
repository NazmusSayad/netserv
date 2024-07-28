import { makeFileUrl } from '@/api/react'
import fileSupport from '@/config/file-support'
import { useStore } from '@/store'
import { Button } from '@mui/material'
import { useMemo } from 'react'
import { useLocation } from 'react-router-dom'
import { FcDownload } from 'react-icons/fc'

const PreviewFile = () => {
  const file = useStore((state) => state.homeui.status.currentFile)!

  const location = useLocation()
  const fsFileUrl = useMemo(
    () => makeFileUrl(location.pathname, file.name),
    [file.name, location.pathname]
  )

  const ViewComponent = useMemo(
    () => fileSupport(file.ext)?.ViewComponent,
    [file]
  )

  return ViewComponent ? (
    <ViewComponent url={fsFileUrl} />
  ) : (
    <PreviewNotSupported url={fsFileUrl} />
  )
}

const PreviewNotSupported = ({ url }: { url: string }) => {
  return (
    <div className={'grid h-[90%] place-content-center text-center gap-2'}>
      <p className={'text-lg text-red-200'}>Preview not supported for this type of file</p>

      <p className={'text-sm opacity-65'}>Please download this file to view locally</p>
      <Button
        variant="contained"
        startIcon={<FcDownload />}
        onClick={() => {
          console.log(url)
        }}
      >
        Download
      </Button>
    </div>
  )
}

export default PreviewFile
