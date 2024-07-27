import { useMemo } from 'react'
import { useLocation } from 'react-router-dom'

export default function useLocations() {
  const location = useLocation()

  const locationRawList = useMemo(
    () => location.pathname.split('/').filter((path) => path),
    [location.pathname]
  )

  const locationPaths = useMemo(
    () => locationRawList,
    [locationRawList.join('/')]
  )

  const oneLevelBackLocation = useMemo(() => {
    return locationPaths.slice(0, -1).join('/')
  }, [locationPaths.join('/')])

  return {
    ...location,
    paths: locationPaths,
    upPath: oneLevelBackLocation,
  }
}
