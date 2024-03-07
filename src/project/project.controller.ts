import { Body, Controller, Post, UseGuards, Req, ValidationPipe } from '@nestjs/common'
import { CreateProjectRequestDto } from './dto'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'
import { Request } from 'express'
import { ProjectService } from './project.service'

@Controller('project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async createProject(@Body() dto: CreateProjectRequestDto, @Req() req: Request) {
    await this.projectService.createProject(dto, req.user.userId)
  }
}
