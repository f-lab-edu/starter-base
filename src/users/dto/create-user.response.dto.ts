import { ApiProperty } from '@nestjs/swagger'
import { UserRole } from '@prisma/client'

export class CreateUserResponseDto {
  @ApiProperty()
  id: number

  @ApiProperty()
  nickname: string

  @ApiProperty()
  email: string

  @ApiProperty({ enum: UserRole })
  role: UserRole
}
