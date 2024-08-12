import { Button } from '@mui/material'
import { VscTrash } from 'react-icons/vsc'
import { useMemo } from 'react'
import { useApi } from '@/api/react'

export default function HeaderActionSelected() {
  const api = useApi()
  const selectedNames = useGetSelectedNames()

  async function handleDelete() {
    const res = await api.post('/api/delete', { names: selectedNames })
    if (!res.ok) return console.log(res)
    $actions.homeui.deleteItems(selectedNames)
  }

  return (
    <>
      <Button
        size="small"
        color="inherit"
        startIcon={<VscTrash />}
        onClick={handleDelete}
      >
        Delete
      </Button>
    </>
  )
}

function useGetSelectedNames() {
  const { childDirs, childFiles } = $useStore(
    (state) => state.homeui.status.currentDir
  )!
  return useMemo(() => {
    const names: string[] = []

    for (const key in childDirs) {
      if (childDirs[key].selected) names.push(key)
    }

    for (const key in childFiles) {
      if (childFiles[key].selected) names.push(key)
    }

    return names
  }, [childDirs, childFiles])
}
