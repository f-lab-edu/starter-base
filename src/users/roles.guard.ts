import { CanActivate, ExecutionContext, Injectable, mixin, Type } from '@nestjs/common'
import { UserRole } from '@prisma/client'
import { JwtDto } from '../auth/dto'

export const RolesGuard = (...roles: UserRole[]): Type<CanActivate> => {
  @Injectable()
  class RolesGuardMixin implements CanActivate {
    canActivate(context: ExecutionContext): boolean {
      if (!roles) {
        return true
      }
      const request = context.switchToHttp().getRequest()
      const user: JwtDto = request.user

      return user && roles.includes(user.userRole)
    }
  }

  return mixin(RolesGuardMixin)
}
