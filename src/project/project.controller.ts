import { Body, Controller, Post, UseGuards, Req, Get, Query } from '@nestjs/common'
import { CreateProjectRequestDto, CreateProjectResponseDto, GetProjectsResponseDto } from './dto'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'
import { Request } from 'express'
import { ProjectService } from './project.service'
import { PageRequestDto } from 'src/pagination/dto'

@Controller('project')
@UseGuards(JwtAuthGuard)
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Post()
  async createProject(@Body() dto: CreateProjectRequestDto, @Req() req: Request): Promise<CreateProjectResponseDto> {
    return await this.projectService.createProject(dto, req.user.userId)
  }

  @Get()
  async getProjects(@Query() dto: PageRequestDto): Promise<GetProjectsResponseDto> {
    return await this.projectService.getProjects(dto)
  }
}
