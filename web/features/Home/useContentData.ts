import useEffectExceptOnMount from 'use-effect-except-on-mount'
import { createSuspense, useApi } from '@/api/react'
import { actions } from '@/store'
import useLocations from './useLocations'
import { useEffect } from 'react'

const useSuspense = createSuspense()
export default function () {
  const locations = useLocations()

  useSuspense(
    { method: 'GET', url: '/api/dir' + locations.pathname },
    ([response]) => setCurrentDir(response as any)
  )

  useEffectExceptOnMount(() => {
    ;(async () => {
      actions.homeui.setState({ refreshButtonAnimation: true })
      setCurrentDir((await api.get('/api/dir' + locations.pathname)) as any)
      actions.homeui.setState({ refreshButtonAnimation: false })
    })()
  }, [locations.paths])

  useEffect(() => {
    console.log('Change me')
  }, [locations.search])

  const api = useApi({ suspense: true })
}

export function setCurrentDir({
  data,
}: {
  ok: boolean
  data?: { dir: InfoDir }
}) {
  data?.dir && actions.homeui.setState({ currentDir: data.dir })
}

export function setCurrentFile({
  data,
}: {
  ok: boolean
  data?: { file: InfoFile }
}) {
  data?.file && actions.homeui.setState({ currentFile: data.file })
}
