import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserModel } from './user.model';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { InjectModel } from 'nestjs-typegoose';
import { compare, genSalt, hash } from 'bcryptjs';
import { CreateUserDto } from './dto/create-user.dto';
import { UserErrorMessages } from './constants/auth.messages';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(UserModel)
    private readonly authModel: ModelType<UserModel>,
    private readonly jwtService: JwtService,
  ) {}

  async create(dto: CreateUserDto) {
    const salt = await genSalt(10);
    const newUser = new this.authModel({
      ...dto,
      passwordHash: await hash(dto.password, salt),
    });
    return newUser.save();
  }

  async findUser(email: string) {
    return this.authModel.findOne({ email }).exec();
  }

  async validateUser(
    email: string,
    password: string,
  ): Promise<Record<string, string>> {
    const user = await this.findUser(email);
    if (!user) {
      throw new UnauthorizedException(UserErrorMessages.USER_NOT_FOUND);
    }
    const isCorrectPassword = await compare(password, user.passwordHash);
    if (!isCorrectPassword) {
      throw new UnauthorizedException(UserErrorMessages.WRONG_USER_PASSWORD);
    }

    return { pass: user.passwordHash };
  }

  async login(pass: string) {
    const payload = { pass };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
