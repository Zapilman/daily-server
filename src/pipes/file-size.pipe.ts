import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

@Injectable()
export class FileSizeValidationPipe implements PipeTransform {
  transform(file: Express.Multer.File, metadata: ArgumentMetadata) {
    const oneKb = 1024;
    const oneMb = oneKb * 1024;
    if (file.size > oneMb * 6) {
      throw new HttpException('File too big', HttpStatus.PAYLOAD_TOO_LARGE);
    }

    return file;
  }
}
