import { t } from 'noarg'
import arg from '../arg'
import app from './app'

arg.create(
  'web',
  {
    description: 'Creates a http server',
    options: {
      host: t.string(),
      port: t.number(),
      root: t.string().default('.'),
    },
  },
  (_, options) => {
    console.log({ options })

    app.listen(8000)
  }
)
