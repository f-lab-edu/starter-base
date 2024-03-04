import { IsString, MaxLength, MinLength } from 'class-validator'

export class CreateCategoryRequestDto {
  @MinLength(1)
  @MaxLength(12)
  @IsString()
  name: string
}
