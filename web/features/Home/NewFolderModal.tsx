import { Modal } from '@mui/material'

export default function NewFolderModal() {
  const isNewFolderModalOpen = $useStore(
    (state) => state.homeui.status.newFolderModal
  )

  return (
    <Modal open={isNewFolderModalOpen}>
      <h1>Test</h1>
    </Modal>
  )
}
