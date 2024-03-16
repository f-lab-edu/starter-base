import { Body, Controller, Post } from '@nestjs/common'
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger'
import { UsersService } from './users.service'
import { CreateUserRequestDto, CreateUserResponseDto } from './dto'

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiCreatedResponse({ type: CreateUserRequestDto })
  async createUser(@Body() dto: CreateUserRequestDto): Promise<CreateUserResponseDto> {
    return await this.usersService.createUser(dto)
  }
}
