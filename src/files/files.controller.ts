import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileResponse } from './dto/file.response';
import { FilesService } from './files.service';
import { FileSizeValidationPipe } from 'src/pipes/file-size.pipe';
import { TFile } from './file.types';

@Controller('files')
export class FilesController {
  constructor(private readonly fileService: FilesService) {}
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFiles(
    @UploadedFile(FileSizeValidationPipe) file: Express.Multer.File,
  ): Promise<FileResponse[]> {
    const filesArr: TFile[] = [file];
    if (file.mimetype.includes('image')) {
      const buffer = await this.fileService.convertToWebp(file.buffer);
      filesArr.push({
        ...file,
        buffer,
        originalname: `${file.originalname.split('.')[0]}.webp`,
      });
    }
    return this.fileService.saveFiles(filesArr);
  }
}
