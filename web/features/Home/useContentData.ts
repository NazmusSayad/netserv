import useEffectExceptOnMount from 'use-effect-except-on-mount'
import { createSuspense, useApi } from '@/api/react'
import useLocations from './useLocations'
import { useNavigate } from 'react-router-dom'
import { useMemo } from 'react'
import { sortByKey } from '@/utils'

const useSuspense = createSuspense()
export function useFetchContentData() {
  const navigate = useNavigate()
  const locations = useLocations()

  useSuspense(
    { method: 'GET', url: 'api/dir' + locations.pathname },
    ([response]) => setCurrentDir(response as any)
  )

  useEffectExceptOnMount(() => {
    setCurrentDir(api.get('api/dir' + locations.pathname) as any)
  }, [locations.paths])

  useEffectExceptOnMount(() => {
    if (locations.state !== 'refresh') return
    navigate(locations.pathname, { state: null, replace: true })
    setCurrentDir(api.get('api/dir' + locations.pathname) as any)
  }, [locations.state])

  const api = useApi({ suspense: true })
}

async function setCurrentDir(
  response: Promise<{ ok: boolean; data: { dir: any } }>
) {
  $actions.homeui.setState({ refreshButtonAnimation: true })
  const dir = (await response).data.dir
  dir && $actions.homeui.setState({ currentDir: dir })
  $actions.homeui.setState({ refreshButtonAnimation: false })
}

export function useGetContentData() {
  const sortBy = $useStore((state) => state.homeui.config.sortBy)
  const sortByMode = $useStore((state) => state.homeui.config.sortByMode)
  const currentDir = $useStore((state) => state.homeui.status.currentDir)
  const searchText = $useStore((state) => state.homeui.status.searchText)

  const sortedDirs = useMemo(() => {
    if (!currentDir) return []
    const dirs = Object.values(currentDir.childDirs)
    const searchTextLower = searchText.toLowerCase()

    const searchedDirs = searchText
      ? Object.values(currentDir.childDirs).filter((dir) =>
          dir.name.toLowerCase().includes(searchTextLower)
        )
      : dirs

    return sortByKey(
      searchedDirs,
      sortBy === 'size' ? 'name' : sortBy,
      sortBy === 'size' ? 'asc' : sortByMode
    )
  }, [currentDir, sortBy, sortByMode, searchText])

  const sortedFiles = useMemo(() => {
    if (!currentDir) return []
    const files = Object.values(currentDir.childFiles)
    const searchTextLower = searchText.toLowerCase()

    const searchedFiles = searchText
      ? files.filter((file) =>
          file.name.toLowerCase().includes(searchTextLower)
        )
      : files

    return sortByKey(searchedFiles, sortBy, sortByMode)
  }, [currentDir, sortBy, sortByMode, searchText])

  const optimizedDir = useMemo(
    () => ({ ...currentDir, sortedDirs, sortedFiles }),
    [sortedDirs, sortedFiles]
  )

  return [optimizedDir, sortBy, sortByMode, searchText] as const
}
