import ReactHTTP from 'react-net-kit'
const url = (import.meta as any).env.DEV
  ? 'http://localhost:8000/'
  : location.origin + '/'

const reactHTTP = ReactHTTP({
  baseURL: url,
  withCredentials: true,

  formatData(res) {
    return res.data
  },

  formatError(err: any) {
    return (
      err.response?.data?.error || err.response?.data?.message || err.message
    )
  },
})

export function getFsUrl(pathname: string, name: string) {
  const names = [...pathname.split('/'), name].filter(Boolean)
  return [url + 'fs', encodeURIComponent(names.join('/'))].join('/')
}

export const { useApi, useApiOnce, createSuspense } = reactHTTP
export default reactHTTP
