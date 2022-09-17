import { createLogger, format, transports } from 'winston'

const logger = createLogger({
  format: format.combine(
    format.simple(),
    format.timestamp(),
    format.printf(info => `[${info.timestamp}] ${info.level}: ${info.message}`)
  ),
  transports: [
    new transports.Console({
      level: 'info'
    }),
    new transports.File({
      filename: 'logs/error.log',
      level: 'error'
    }),
    new transports.File({
      level: 'warn',
      filename: 'logs/warn.log'
    })
  ]
})

export default logger
