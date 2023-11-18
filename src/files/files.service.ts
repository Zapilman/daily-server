import { Injectable } from '@nestjs/common';
import { format } from 'date-fns';
import { path } from 'app-root-path';
import { ensureDir, writeFile } from 'fs-extra';
import { FileResponse } from './dto/file.response';

@Injectable()
export class FilesService {
  async saveFiles(files: Express.Multer.File[]): Promise<FileResponse[]> {
    const dateFolder = format(new Date(), 'yyyy-MM-dd');
    const uploadFolder = `${path}/uploads/${dateFolder}`;

    await ensureDir(uploadFolder);

    const response: FileResponse[] = [];
    for (const file of files) {
      await writeFile(
        `${uploadFolder}/${file.filename || file.originalname}`,
        file.buffer,
      );

      response.push({
        url: `${dateFolder}/${file.originalname}`,
        name: file.originalname,
      });
    }

    return response;
  }
}
