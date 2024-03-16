/**
 * @param prev_page 이전 페이지
 * @param next_page 다음 페이지
 * @param total 리스트 데이터의 전체 개수
 * @param pages 전체 페이지 번호
 * @param page 현재 페이지 번호
 * @param size 페이지 크기
 */
export class PageResponseDto<T> {
  prev_page?: number | null
  next_page?: number | null
  total?: number
  pages?: number
  page?: number
  size?: number
  items: T[]
}
