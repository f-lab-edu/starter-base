import { UserRole } from '@prisma/client'

export class JwtDto {
  userId: number
  userRole: UserRole
}
