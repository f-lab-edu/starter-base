import { IsEmail, IsString, IsStrongPassword, MaxLength } from 'class-validator'

export class CreateUserRequestDto {
  @MaxLength(12)
  @IsString()
  public username: string

  @MaxLength(254)
  @IsEmail()
  @IsString()
  public email: string

  @IsString()
  @MaxLength(16)
  @IsStrongPassword({ minLength: 8, minLowercase: 1, minUppercase: 0, minNumbers: 1, minSymbols: 1 })
  public password: string
}
