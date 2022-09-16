import { createLogger, transports } from 'winston'

const logger = createLogger({
  transports: [
    new transports.Console({
      level: 'info',
    }),
    new transports.File({
      filename: 'logs/error.log',
      level: 'error',
    }),
    new transports.File({
      level: 'warn',
      filename: 'logs/warn.log',
    }),
  ],
})

export default logger
