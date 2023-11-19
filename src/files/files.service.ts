import { Injectable } from '@nestjs/common';
import { format } from 'date-fns';
import { path } from 'app-root-path';
import { ensureDir, writeFile } from 'fs-extra';
import { FileResponse } from './dto/file.response';
import * as sharp from 'sharp';
import { TFile } from './file.types';
import { log } from 'console';

@Injectable()
export class FilesService {
  async uploadFile(file: TFile): Promise<FileResponse[]> {
    const filesArr: TFile[] = [file];
    if (file.mimetype.includes('image')) {
      const buffer = await this.convertToWebp(file.buffer);
      filesArr.push({
        ...file,
        buffer,
        originalname: `${file.originalname.split('.')[0]}.webp`,
      });
    }
    return this.saveFiles(filesArr);
  }

  async saveFiles(files: TFile[]): Promise<FileResponse[]> {
    const dateFolder = format(new Date(), 'yyyy-MM-dd');
    const uploadFolder = `${path}/uploads/${dateFolder}`;

    await ensureDir(uploadFolder);

    const response: FileResponse[] = [];
    for (const file of files) {
      await writeFile(`${uploadFolder}/${file.originalname}`, file.buffer);

      response.push({
        url: `${dateFolder}/${file.originalname}`,
        name: file.originalname,
      });
    }

    log(response);

    return response;
  }

  async convertToWebp(file: Buffer): Promise<Buffer> {
    return sharp(file).webp().toBuffer();
  }
}
