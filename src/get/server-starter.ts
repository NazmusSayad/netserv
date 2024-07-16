import * as os from 'os'
import * as portfinder from 'portfinder'
import app from './app'
import { upload } from './handler'

export type GetConfig = {
  output: string
  code?: number
}

export default async function (config: GetConfig) {
  console.log('get', config)

  app.post('/upload', upload(config))

  const networks = os.networkInterfaces()
  const activeNetworks: { port: number; host: string }[] = []

  for (const name in networks) {
    const network = networks[name]?.find((network) => network.family === 'IPv4')
    if (!network) continue

    const port = await portfinder.getPortPromise({
      host: network.address,
      startPort: 8080,
    })

    await new Promise((resolve) => {
      app.listen(port, network.address, () => {
        activeNetworks.push({ port, host: network.address })
        resolve(null)
      })
    })
  }

  console.log(activeNetworks)
}
