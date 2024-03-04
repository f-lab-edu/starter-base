import { NestFactory } from '@nestjs/core'
import { ValidationPipe } from '@nestjs/common'
import * as cookieParser from 'cookie-parser'

import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.enableCors({
    // TODO: 배포된 프론트엔드 url, 프론트엔드가 로컬로 개발 시 사용하는 localhost url
    origin: '*',
    credentials: true,
    exposedHeaders: ['Content-Disposition'],
  })
  app.useGlobalPipes(new ValidationPipe({ transform: true }))
  app.use(cookieParser())

  await app.listen(8000)
}
bootstrap()
