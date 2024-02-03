import { IsString } from 'class-validator'

export class LoginRequestDto {
  @IsString()
  public email: string

  @IsString()
  public password: string
}
