import {
  Controller,
  Get,
  HttpStatus,
  Param,
  ParseFilePipeBuilder,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { Response } from 'express'
import { createReadStream } from 'fs'
import { join } from 'path'

@Controller('file')
export class FileController {
  constructor() {}

  /**
   * 이미지 업로드 api
   * @param file 업로드할 파일. 현재 image만 허용
   */
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({ fileType: 'image/*' })
        .build({ errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY }),
    )
    file: Express.Multer.File,
  ) {
    return { filename: file.filename }
  }

  /**
   * 파일 조회 api
   * @param filename 조회할 파일명
   */
  @Get(':filename')
  getFile(@Param('filename') filename: string, @Res() res: Response) {
    const filePath = join(process.cwd(), 'upload', filename)
    const fileStream = createReadStream(filePath)

    res.set({
      'Content-Type': 'application/octet-stream',
      'Content-Disposition': `attachment; filename=${filename}`,
    })

    fileStream.on('error', (error) => {
      // TODO: 정형화된 Logger 형식 사용
      console.error(error)
      res.status(HttpStatus.NOT_FOUND).send('File not found')
    })

    fileStream.pipe(res)
  }
}
