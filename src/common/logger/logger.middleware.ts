import { Injectable, Logger, NestMiddleware } from '@nestjs/common'
import { NextFunction, Request, Response } from 'express'

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(request: Request, response: Response, next: NextFunction): void {
    const { ip, method, originalUrl } = request

    response.on('finish', () => {
      const { statusCode } = response
      Logger.log(`${method} ${originalUrl} ${statusCode} ${ip}`, LoggerMiddleware.name)
    })
    next()
  }
}
