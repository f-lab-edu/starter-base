import { Module } from '@nestjs/common'
import { FileController } from './file.controller'
import { MulterModule } from '@nestjs/platform-express'
import { diskStorage } from 'multer'
import { extname } from 'path'
import { v4 as uuidv4 } from 'uuid'

@Module({
  imports: [
    MulterModule.register({
      storage: diskStorage({
        // TODO: 배포 시엔 파일서버 경로 지정
        destination: './upload',
        filename(_, file, callback): void {
          return callback(null, `${uuidv4()}${extname(file.originalname)}`)
        },
      }),
      limits: {
        fileSize: 1024 * 1024 * 1024, // 1GB
        files: 1,
      },
    }),
  ],
  controllers: [FileController],
})
export class FileModule {}
