import { ApiProperty } from '@nestjs/swagger'

export class UploadFileResponseDto {
  @ApiProperty()
  public filename: string
}
