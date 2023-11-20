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
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { PostModel } from './post.model';
import { CreatePostDto } from './dto/create-post.dto';
import { PostService } from './post.service';
import { JwtAuthGuard } from 'src/auth/quards/jwt.quard';
import { IdValidationPipe } from 'src/pipes/mongo-id.pipe';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileSizeValidationPipe } from 'src/pipes/file-size.pipe';
import { FilesService } from 'src/files/files.service';
import { log } from 'console';

@Controller('post')
export class PostController {
  constructor(
    private readonly postService: PostService,
    private readonly fileService: FilesService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe())
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async create(
    @UploadedFile(FileSizeValidationPipe) file: Express.Multer.File,
    @Body() dto: CreatePostDto,
    @UserEmail() email: string,
  ) {
    log(file);
    const mainPhoto = await this.fileService.uploadFile(file);
    return this.postService.create({ ...dto, mainPhoto: mainPhoto[0] });
  }

  @HttpCode(200)
  @Get('test')
  async test() {
    return 'hello, this is test';
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
