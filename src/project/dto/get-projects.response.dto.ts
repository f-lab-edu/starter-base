import { PageResponseDto } from 'src/common/pagination'
import { ProjectSummaryDto } from './project-summary.dto'

export class GetProjectsResponseDto extends PageResponseDto<ProjectSummaryDto> {}
