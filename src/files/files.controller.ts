import {
  Controller,
  HttpCode,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileResponse } from './dto/file.response';
import { FilesService } from './files.service';
import { FileSizeValidationPipe } from 'src/pipes/file-size.pipe';

@Controller('files')
export class FilesController {
  constructor(private readonly fileService: FilesService) {}
  @Post('upload')
  @UseInterceptors(FileInterceptor('files'))
  async uploadFiles(
    @UploadedFile(FileSizeValidationPipe) files: Express.Multer.File,
  ): Promise<FileResponse[]> {
    console.log(files);
    return this.fileService.saveFiles([files]);
  }
}
