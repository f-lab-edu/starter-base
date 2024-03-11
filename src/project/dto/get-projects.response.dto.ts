import { PageResponseDto } from 'src/pagination/dto'
import { ProjectSummaryDto } from './project-summary.dto'

export class GetProjectsResponseDto extends PageResponseDto<ProjectSummaryDto> {}
