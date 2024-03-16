import { DocumentBuilder } from '@nestjs/swagger'

export const config = new DocumentBuilder()
  .setTitle('Starter Base')
  .setDescription('Starter Base API Document')
  .setVersion('1.0')
  .build()
