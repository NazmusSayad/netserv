import * as os from 'os'
import { Express } from 'express'

export default async function listen(app: Express, port: number) {
  const interfaces = Object.entries(os.networkInterfaces())
  const interfacesWithIPV4: {
    name: string
    host: string
  }[] = []

  interfaces.forEach(([name, addresses = []]) => {
    const ipv4 = addresses.find((address) => address.family === 'IPv4')
    if (!ipv4) return
    const result = { name, host: ipv4.address }

    if (ipv4.internal) {
      interfacesWithIPV4.unshift({ ...result, name: 'localhost' })
    } else interfacesWithIPV4.push(result)
  })

  const promises = interfacesWithIPV4.map(({ name, host }) => {
    return new Promise<{ name: string; host: string; port: number }>((res) => {
      app.listen(port, host, () => {
        res({ name, host, port })
      })
    })
  })

  const response = await Promise.all(promises)

  console.log('\x1b[34mServer started at:\x1b[0m')
  response.forEach(({ name, host, port }) => {
    console.log('\x1b[90m' + name + '\x1b[0m')
    console.log(`\x1b[33mhttp://${host}:${port}\x1b[0m`)
  })
}
