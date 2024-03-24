import { ApiProperty } from '@nestjs/swagger'
import { Transform, Type } from 'class-transformer'
import { IsNumber, IsOptional, IsString } from 'class-validator'

export class CreateProjectRequestDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  public title?: string

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  public summary?: string

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  public description?: string

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  public thumbnail_url?: string

  @ApiProperty({ required: false })
  @IsOptional()
  @Transform((val) => BigInt(val.value))
  public target_amount?: bigint

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  public category_id?: number
}
