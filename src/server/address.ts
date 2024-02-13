import { networkInterfaces } from 'os'

export default function () {
  const netMap = networkInterfaces()
  for (let key in netMap) {
    const list = netMap[key] ?? []

    for (let item of list) {
      if (item.family === 'IPv4' && !item.internal) return item.address
    }
  }

  return 'localhost'
}
