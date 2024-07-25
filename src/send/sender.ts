import axios from 'axios'
import fs = require('fs')
import FormData = require('form-data')
import ProgressBar from '../utils/progress-bar'

export type SendConfig = {
  host: string
  port: number
  targets: string[]
  code?: number
}

export default async function (config: SendConfig) {
  const address = 'http://' + config.host + ':' + config.port
  config.targets = ['E:\\ISO\\kali-linux-2024.2-live-everything-amd64.iso']

  const formData = new FormData()
  for (const target of config.targets) {
    const fileStream = fs.createReadStream(target)
    formData.append('file', fileStream)
  }

  const totalSize: number = await new Promise((resolve, reject) => {
    formData.getLength((err, len) => {
      if (err) {
        reject(err)
      } else {
        resolve(len)
      }
    })
  })

  const token = await axios.get(address + '/token/' + totalSize)
  const progressBar = ProgressBar(totalSize)

  const axiosConfig = {
    headers: { ...formData.getHeaders(), Authorization: token.data.token },
    onUploadProgress: (progressEvent: any) => {
      const percentage = progressBar.update(progressEvent.loaded)

      if (percentage === 100) {
        progressBar.update(totalSize)
        progressBar.stop()
        console.log(
          'Upload complete, waiting for the server to process the file...'
        )
      }
    },
  }

  await axios.post(address + '/upload', formData, axiosConfig)
  console.log('Upload complete')
}
