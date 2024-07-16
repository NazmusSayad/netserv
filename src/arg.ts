import NoArg, { t } from 'noarg'

export default NoArg.create(
  'app',
  {
    description:
      'This tool helps to upload, download and serve files within local network',
    options: {
      config: t.string().global(),
    },
    config: {},
  },
  (args, options) => {}
)
