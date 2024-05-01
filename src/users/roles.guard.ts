import { BadRequestException, CanActivate, ExecutionContext, Injectable, SetMetadata } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { UserRole } from '@prisma/client'
import { JwtDto } from '../auth/dto'
import { ProjectService } from '../project/project.service'

const ROLES_KEY = 'roles' as const
export const Roles = (roles: (UserRole | 'CREATOR')[]) => SetMetadata(ROLES_KEY, roles)

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector, private readonly projectService: ProjectService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles: Parameters<typeof Roles>[0] = this.reflector.getAllAndOverride(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ])

    if (!roles?.length) {
      return true
    }

    const request = context.switchToHttp().getRequest<{ params: { projectId: string }; user: JwtDto }>()
    const user = request.user

    if (!user) {
      throw new BadRequestException('Access is available after login')
    }

    if (!roles.includes('CREATOR')) {
      return roles.includes(user.userRole)
    }

    const projectId = Number(request.params.projectId)
    const isCreator = await this.projectService.checkIsCreator({ projectId, userId: user.userId })

    if (!roles.filter((r) => r !== 'CREATOR').length) return isCreator
    return isCreator && roles.filter((r) => r !== 'CREATOR').includes(user.userRole)
  }
}
