import { Transform, Type } from 'class-transformer'
import { IsNumber, IsOptional, IsString } from 'class-validator'

export class CreateProjectRequestDto {
  @IsOptional()
  @IsString()
  public title?: string

  @IsOptional()
  @IsString()
  public summary?: string

  @IsOptional()
  @IsString()
  public description?: string

  @IsOptional()
  @IsString()
  public thumbnail_url?: string

  @IsOptional()
  @Transform((val) => BigInt(val.value))
  public target_amount?: bigint

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  public category_id?: number
}
