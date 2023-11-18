import { UserEmail } from 'src/decorators/user-email.decorator';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
  UseGuards,
  HttpCode,
} from '@nestjs/common';
import { PostModel } from './post.model';
import { CreatePostDto } from './dto/create-post.dto';
import { PostService } from './post.service';
import { JwtAuthGuard } from 'src/auth/quards/jwt.quard';
import { IdValidationPipe } from 'src/pipes/mongo-id.pipe';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe())
  @Post()
  async create(@Body() dto: CreatePostDto, @UserEmail() email: string) {
    return this.postService.create(dto);
  }

  @HttpCode(200)
  @Get(':id')
  async get(@Param('id', IdValidationPipe) id: string) {
    return this.postService.findPostById(id);
  }

  @Get()
  async getAll() {
    return this.postService.getAllPosts();
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return id;
  }

  @Patch(':id')
  async patch(@Param('id') id: string, @Body() dto: PostModel) {
    return id;
  }
}
