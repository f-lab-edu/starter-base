import { Body, Controller, Post } from '@nestjs/common'
import { UsersService } from './users.service'
import { CreateUserRequestDto, CreateUserResponseDto } from './dto'

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async createUser(@Body() dto: CreateUserRequestDto): Promise<CreateUserResponseDto> {
    return await this.usersService.createUser(dto)
  }
}
