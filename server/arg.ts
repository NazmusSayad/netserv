import NoArg from 'noarg'

const app = NoArg.create('app', {
  description:
    'This tool helps to upload, download and serve files within local network',
  options: {},
  config: {},
}).on(() => {
  app.renderHelp()
})

export default app
