import { ApiProperty } from '@nestjs/swagger'

export class UpdateProjectRequestDto {
  @ApiProperty({ required: false })
  title?: string

  @ApiProperty({ required: false })
  summary?: string

  @ApiProperty({ required: false })
  description?: string

  @ApiProperty({ required: false })
  thumbnail_url?: string

  @ApiProperty({ required: false })
  target_amount?: bigint

  @ApiProperty({ required: false })
  category_id?: number
}
