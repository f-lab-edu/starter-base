import * as winston from 'winston'
import 'winston-daily-rotate-file'
import { WinstonModule, utilities as nestWinstonModuleUtilities } from 'nest-winston'

const fileLogDir = `${process.cwd()}/logs`
const fileLogFormat = winston.format.combine(
  winston.format.timestamp(),
  winston.format.ms(),
  winston.format.label({ label: 'StarterBase' }),
  winston.format.printf(({ level, message, label, timestamp }) => {
    return `${timestamp} [${label}] ${level}: ${message}`
  }),
)
const consoleLogFormat = winston.format.combine(
  winston.format.timestamp(),
  winston.format.ms(),
  nestWinstonModuleUtilities.format.nestLike('StarterBase', {
    colors: true,
    prettyPrint: true,
  }),
)

const instance = winston.createLogger({
  level: 'debug',
  transports: [
    new winston.transports.Console({
      // level: process.env.NODE_ENV === 'prod' ? 'info' : 'debug',
      format: consoleLogFormat,
    }),
    new winston.transports.DailyRotateFile({
      level: 'info',
      filename: 'starter-base-web-%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '7d',
      dirname: `${fileLogDir}/info`,
      format: fileLogFormat,
    }),
    new winston.transports.DailyRotateFile({
      level: 'error',
      filename: 'starter-base-web-%DATE%.error.log',
      datePattern: 'YYYY-MM-DD',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '7d',
      dirname: `${fileLogDir}/error`,
      format: fileLogFormat,
    }),
  ],
  exceptionHandlers: [
    new winston.transports.DailyRotateFile({
      level: 'error',
      filename: `starter-base-web-%DATE%.exception.log`,
      datePattern: 'YYYY-MM-DD',
      zippedArchive: true,
      maxFiles: '7d',
      dirname: `${fileLogDir}/exception`,
      format: fileLogFormat,
    }),
  ],
})

export const LoggerService = WinstonModule.createLogger({
  instance,
})
