import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UserErrorMessages } from './constants/auth.messages';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UsePipes(new ValidationPipe())
  @Post('register')
  async register(@Body() dto: CreateUserDto) {
    const oldUser = await this.authService.findUser(dto.email);
    if (oldUser) {
      throw new BadRequestException(UserErrorMessages.USER_ALREADY_EXISTS);
    }

    return this.authService.create(dto);
  }

  @HttpCode(200)
  @UsePipes(new ValidationPipe())
  @Post('login')
  async login(@Body() dto: CreateUserDto) {
    const { email } = await this.authService.validateUser(
      dto.email,
      dto.password,
    );
    return this.authService.login(email);
  }
}
