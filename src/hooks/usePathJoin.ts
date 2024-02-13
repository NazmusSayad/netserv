import { useLocation } from 'react-router-dom'

export default function usePathJoin() {
  const location = useLocation()

  return function (...args: string[]) {
    return `${
      location.pathname.endsWith('/')
        ? location.pathname
        : location.pathname + '/'
    }${args.join('/')}`
  }
}
