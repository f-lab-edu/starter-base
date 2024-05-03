import { Body, Controller, Get, Param, ParseIntPipe, Post, Req, UseGuards } from '@nestjs/common'
import { JwtAuthGuard } from '../auth/jwt-auth.guard'
import { SponsorshipService } from './sponsorship.service'
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger'
import { CreateSponsorshipRequestDto, CreateSponsorshipResponseDto, SponsorshipResponseDto } from './dto'
import { Request } from 'express'

@ApiTags('sponsorship')
@Controller()
export class SponsorshipController {
  constructor(private readonly sponsorshipService: SponsorshipService) {}

  /**
   * 후원 신청
   */
  @Post('/project/:projectId/sponsorship')
  @UseGuards(JwtAuthGuard)
  @ApiCreatedResponse({ type: CreateSponsorshipResponseDto })
  async createSponsorship(
    @Param('projectId', ParseIntPipe) projectId: number,
    @Body() dto: CreateSponsorshipRequestDto,
    @Req() req: Request,
  ): Promise<CreateSponsorshipResponseDto> {
    return await this.sponsorshipService.createSponsorship(projectId, dto, req.user.userId)
  }

  /**
   * 후원 상세 조회
   */
  @Get('/sponsorship/:sponsorshipId')
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ type: SponsorshipResponseDto })
  async getSponsorship(@Param('sponsorshipId', ParseIntPipe) sponsorshipId: number): Promise<SponsorshipResponseDto> {
    return await this.sponsorshipService.getSponsorshipById(sponsorshipId)
  }
}
