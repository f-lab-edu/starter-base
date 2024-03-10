import { CallHandler, ExecutionContext, Logger, NestInterceptor } from '@nestjs/common'
import { Observable, tap } from 'rxjs'

export class LoggerInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, call$: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest()
    const method = req.method
    const url = req.url

    const now = Date.now()
    return call$.handle().pipe(
      tap({
        next: () => {
          Logger.debug(`${method} ${url} +${Date.now() - now}ms`, context.getClass().name)
        },
        error: (error) => {
          Logger.debug(`${method} ${url} +${Date.now() - now}ms ${error}`, context.getClass().name)
        },
      }),
    )
  }
}
