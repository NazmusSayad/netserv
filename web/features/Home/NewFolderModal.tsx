import { useState } from 'react'
import { Button, TextField } from '@mui/material'
import SimpleModal from '../../components/SimpleModal'
import { useApi } from '@/api/react'
import { LoadingSuspense } from '@/components/Loading'
import { useLocation } from 'react-router-dom'

export default function NewFolderModal() {
  const isNewFolderModalOpen = $useStore(
    (state) => state.homeui.status.newFolderModal
  )

  function handleClose() {
    $actions.homeui.setState({ newFolderModal: false })
  }

  return (
    <SimpleModal
      header={'New Folder'}
      open={isNewFolderModalOpen}
      containerClassName={'w-[min(36rem,97%)] rounded-lg'}
      close={handleClose}
    >
      <LoadingSuspense>
        <ModalInternal close={handleClose} />
      </LoadingSuspense>
    </SimpleModal>
  )
}

function ModalInternal({ close }) {
  const api = useApi()
  const [textValue, setTextValue] = useState('')
  const location = useLocation()

  async function handleCreate() {
    const res = await api.post<{ data: InfoChildDirServer }>(
      '/api/new-folder' + location.pathname,
      { name: textValue }
    )

    if (res.ok) {
      $actions.homeui.createDir(res.data!)
      close()
    }
  }

  return (
    <>
      <div className={'pt-6 pb-4'}>
        <TextField
          fullWidth
          placeholder={'New Folder Name'}
          value={textValue}
          onChange={(e) => setTextValue(e.target.value)}
        />
      </div>

      <div className={'flex justify-between items-center'}>
        <p className={'text-red-400'}>{api.response?.error}</p>
        <Button disabled={api.loading} onClick={handleCreate}>
          Create
        </Button>
      </div>
    </>
  )
}
