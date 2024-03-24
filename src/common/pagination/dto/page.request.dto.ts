import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { IsInt, Max, Min } from 'class-validator'

export class PageRequestDto {
  @ApiProperty({ required: false })
  @IsInt()
  @Type(() => Number)
  @Min(1)
  public page?: number | null = 1

  @ApiProperty({ required: false })
  @IsInt()
  @Type(() => Number)
  @Min(1)
  @Max(100)
  public size?: number | null = 10

  public getSkip() {
    return (this.page - 1) * this.size
  }

  public getTake() {
    return this.size
  }

  public getPages(total: number) {
    return Math.ceil(total / this.size)
  }

  public getPrevPage() {
    return this.page > 1 ? this.page - 1 : null
  }

  public getNextPage(total: number) {
    return total > this.getSkip() + this.size ? this.page + 1 : null
  }
}
