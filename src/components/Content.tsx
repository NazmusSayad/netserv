import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import useEffectExceptOnMount from 'use-effect-except-on-mount'

import { createSuspense, useApi } from '@/api/react'
import Wrapper from '@/layouts/Wrapper'
import ContentDir from './ContentDir'
import ContentFile from './ContentFile'
import { ApiResponse } from '@/types/data'

export default function Content() {
  const data = useLocationData()

  return (
    <Wrapper>
      {data ? (
        data.type === 'dir' ? (
          <ContentDir dir={data} />
        ) : (
          <ContentFile file={data} />
        )
      ) : (
        'Nothing'
      )}
    </Wrapper>
  )
}

const useSuspense = createSuspense()
function useLocationData() {
  const location = useLocation()

  const [data] = useSuspense({ url: location.pathname })
  const [state, setState] = useState(data.data)
  const api = useApi({ suspense: true })

  useEffectExceptOnMount(() => {
    api.get(location.pathname).then(({ data, ok }) => {
      setState(data)
    })
  }, [location.pathname])

  return state as ApiResponse | undefined
}
