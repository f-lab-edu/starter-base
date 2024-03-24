import { ApiProperty } from '@nestjs/swagger'

/**
 * @param prev_page 이전 페이지
 * @param next_page 다음 페이지
 * @param total 리스트 데이터의 전체 개수
 * @param pages 전체 페이지 번호
 * @param page 현재 페이지 번호
 * @param size 페이지 크기
 */
export class PageResponseDto<T> {
  @ApiProperty({ nullable: true })
  prev_page: number | null

  @ApiProperty({ nullable: true })
  next_page: number | null

  @ApiProperty()
  total: number

  @ApiProperty()
  pages: number

  @ApiProperty()
  page: number

  @ApiProperty()
  size: number

  @ApiProperty()
  items: T[]
}
