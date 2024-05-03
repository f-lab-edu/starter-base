import { ApiProperty } from '@nestjs/swagger'
import { ArrayMinSize, IsArray, IsNumber, Min, ValidateNested } from 'class-validator'
import { Type } from 'class-transformer'

class CreateSponsorshipReword {
  @ApiProperty()
  @IsNumber()
  @Type(() => Number)
  project_reword_id: number

  @ApiProperty()
  @IsNumber()
  @Type(() => Number)
  @Min(1)
  count: number
}

export class CreateSponsorshipRequestDto {
  @ApiProperty({ isArray: true, type: CreateSponsorshipReword })
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => CreateSponsorshipReword)
  rewords: CreateSponsorshipReword[]
}
