import ReactHTTP from 'react-net-kit'
const url = (import.meta as any).env.DEV
  ? 'http://192.168.0.100:80'
  : location.origin

function getApiUrl() {
  return url + '/api'
}

export function getDriveUrl(src: string) {
  return url + '/drive/' + src
}

const reactHTTP = ReactHTTP({
  baseURL: getApiUrl(),
  formatData(res) {
    return res.data
  },

  formatError(err: any) {
    return err.response?.data?.error
  },
})

export const { useApi, useApiOnce, createSuspense } = reactHTTP
export default reactHTTP
