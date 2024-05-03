import { ApiProperty } from '@nestjs/swagger'

export class CreateSponsorshipResponseDto {
  @ApiProperty()
  sponsorship_id: number

  @ApiProperty()
  project_id: number

  @ApiProperty()
  user_id: number

  @ApiProperty()
  amount: number

  @ApiProperty()
  created_at: Date
}
