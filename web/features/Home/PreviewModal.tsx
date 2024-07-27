import { Suspense, useMemo } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Modal } from '@mui/material'
import { createSuspense } from '@/api/react'
import { actions } from '@/store'
import PreviewFile from './PreviewFile'

const PreviewModal = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const fileSearchParam = useMemo(() => {
    if (location.search.includes('file=')) {
      return 'abc'
    }
  }, [location.search])

  return (
    <Modal open={!!fileSearchParam}>
      <div
        className="h-full w-full grid outline-none"
        onClick={(e) => navigate(location.pathname)}
      >
        <div
          className={$tw(
            'overflow-hidden bg-zinc-800 m-auto size-full transition-all shadow-zinc-400 max-w-5xl grid auto-rows-[auto_1fr]',
            'sm:{rounded-lg h-[90%] w-[90%]}'
          )}
          onClick={(e) => e.stopPropagation()}
        >
          <div className={'flex justify-between py-2 px-4'}>
            <div>Left</div>
            <div>Right</div>
          </div>

          <div className={'bg-red-500 overflow-x-hidden overflow-y-auto py-2 px-4'}>
            <Suspense fallback={<h1>Loading......</h1>}>
              <PreviewModalCore />
            </Suspense>
          </div>
        </div>
      </div>
    </Modal>
  )
}

const useSuspense = createSuspense()
function PreviewModalCore() {
  const location = useLocation()
  useSuspense(
    { url: '/api/file/' + location.pathname + '/index.js' },
    ([{ data }]) => {
      actions.homeui.setState({ currentFile: data.file })
    }
  )

  return <PreviewFile />
}

export default PreviewModal
