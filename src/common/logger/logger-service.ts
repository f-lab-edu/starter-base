import * as winston from 'winston'
import { WinstonModule, utilities as nestWinstonModuleUtilities } from 'nest-winston'

const instance = winston.createLogger({
  transports: [
    new winston.transports.Console({
      level: process.env.NODE_ENV === 'prod' ? 'info' : 'debug',
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.ms(),
        nestWinstonModuleUtilities.format.nestLike('StarterBase', {
          colors: true,
          prettyPrint: true,
        }),
      ),
    }),
  ],
})

export const LoggerService = WinstonModule.createLogger({
  instance,
})
