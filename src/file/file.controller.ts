import {
  Controller,
  Get,
  HttpStatus,
  Param,
  ParseFilePipeBuilder,
  Post,
  Res,
  StreamableFile,
  UploadedFile,
  UseInterceptors,
  UseGuards,
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { Response } from 'express'
import { createReadStream } from 'fs'
import { join } from 'path'
import { UploadFileResponseDto } from './dto'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'

@Controller('file')
export class FileController {
  constructor() {}

  /**
   * 이미지 업로드 api
   * @param file 업로드할 파일. 현재 image만 허용
   */
  @Post('upload')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({ fileType: 'image/*' })
        .addMaxSizeValidator({ maxSize: 1024 * 1024 * 8 }) // 8MB
        .build({ errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY }),
    )
    file: Express.Multer.File,
  ): UploadFileResponseDto {
    return { filename: file.filename }
  }

  /**
   * 파일 조회 api
   * @param filename 조회할 파일명
   */
  @Get(':filename')
  getFile(@Param('filename') filename: string, @Res({ passthrough: true }) res: Response): StreamableFile {
    const filePath = join(process.cwd(), 'upload', filename)
    const fileStream = createReadStream(filePath)

    res.set({
      'Content-Disposition': `attachment; filename=${filename}`,
    })

    return new StreamableFile(fileStream)
  }
}
