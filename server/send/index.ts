import NoArg from 'noarg'
import arg from '../arg'
import send from './sender'

arg
  .create('send', {
    description: 'This sends file to the server',
    arguments: [
      {
        name: 'host',
        type: NoArg.string(),
        description: 'Host of the server',
      },
      {
        name: 'port',
        type: NoArg.number(),
        description: 'Port of the server',
      },
    ],

    listArgument: {
      name: 'target',
      type: NoArg.string(),
      description: 'Path to the file or folder',
    },

    flags: {
      code: NoArg.number(),
    },
  })
  .on(([host, port, targets], options) => {
    send({
      host,
      port,
      targets,
      code: options.code,
    })
  })
