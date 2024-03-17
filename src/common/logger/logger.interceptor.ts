import { CallHandler, ExecutionContext, Logger, NestInterceptor } from '@nestjs/common'
import { Observable, tap } from 'rxjs'

export class LoggerInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, call$: CallHandler): Observable<any> {
    const { method, url } = context.switchToHttp().getRequest()

    const now = Date.now()
    return call$.handle().pipe(
      tap({
        next: () => {
          Logger.log(`${method} ${url} +${Date.now() - now}ms`, context.getClass().name)
        },
        error: (error) => {
          Logger.error(`${method} ${url} +${Date.now() - now}ms ${error}`, context.getClass().name)
        },
      }),
    )
  }
}
