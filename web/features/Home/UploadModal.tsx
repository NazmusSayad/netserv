import { Modal } from '@mui/material'

export default function UploadModal() {
  const isUploadModalOpen = $useStore(
    (state) => state.homeui.status.uploadModal
  )

  return (
    <Modal open={isUploadModalOpen}>
      <h1>Test</h1>
    </Modal>
  )
}
