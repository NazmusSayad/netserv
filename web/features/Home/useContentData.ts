import useEffectExceptOnMount from 'use-effect-except-on-mount'
import { createSuspense, useApi } from '@/api/react'
import useLocations from './useLocations'
import { actions } from '@/store'
import { useNavigate } from 'react-router-dom'

const useSuspense = createSuspense()
export default function () {
  const navigate = useNavigate()
  const locations = useLocations()

  useSuspense(
    { method: 'GET', url: 'api/dir' + locations.pathname },
    ([response]) => setCurrentDir(response as any)
  )

  useEffectExceptOnMount(() => {
    ;(async () => {
      actions.homeui.setState({ refreshButtonAnimation: true })
      setCurrentDir((await api.get('api/dir' + locations.pathname)) as any)
      actions.homeui.setState({ refreshButtonAnimation: false })
    })()
  }, [locations.paths])

  useEffectExceptOnMount(() => {
    if (locations.state !== 'refresh') return
    navigate(locations.pathname, { state: null, replace: true })
    ;(async () => {
      actions.homeui.setState({ refreshButtonAnimation: true })
      setCurrentDir((await api.get('api/dir' + locations.pathname)) as any)
      actions.homeui.setState({ refreshButtonAnimation: false })
    })()
  }, [locations.state])

  const api = useApi({ suspense: true })
}

export function setCurrentDir({
  data,
}: {
  ok: boolean
  data?: { dir: InfoDirWeb }
}) {
  data?.dir && actions.homeui.setState({ currentDir: data.dir })
}

export function setCurrentFile({
  data,
}: {
  ok: boolean
  data?: { file: InfoDetailedFile }
}) {
  data?.file && actions.homeui.setState({ currentFile: data.file })
}
