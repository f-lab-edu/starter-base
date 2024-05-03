import { ApiProperty } from '@nestjs/swagger'
import { ArrayMinSize, IsArray, IsNumber, Min, ValidateNested } from 'class-validator'
import { Type } from 'class-transformer'

class SponsorshipReword {
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
  @ApiProperty({ isArray: true, type: SponsorshipReword })
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => SponsorshipReword)
  rewords: SponsorshipReword[]
}
