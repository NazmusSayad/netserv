import { t } from 'noarg'
import app from '../arg'
import send from '.'

app.create(
  'send',
  {
    description: 'This sends file to the server',
    arguments: [
      {
        name: 'host',
        type: t.string(),
        description: 'Host of the server',
      },
      {
        name: 'port',
        type: t.number(),
        description: 'Port of the server',
      },
    ],
    listArgument: {
      name: 'target',
      type: t.string(),
      description: 'Path to the file or folder',
    },

    options: {
      code: t.number(),
    },
  },
  ([host, port, ...targets], options) => {
    send({
      host,
      port,
      targets,
      code: options.code,
    })
  }
)
