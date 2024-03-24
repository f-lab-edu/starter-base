import { ApiProperty } from '@nestjs/swagger'
import { IsString, MaxLength, MinLength } from 'class-validator'

export class CreateCategoryRequestDto {
  @ApiProperty()
  @MinLength(1)
  @MaxLength(12)
  @IsString()
  name: string
}
