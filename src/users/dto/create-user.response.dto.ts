import { UserRole } from '@prisma/client'

export class CreateUserResponseDto {
  id: number
  nickname: string
  email: string
  role: UserRole
}
