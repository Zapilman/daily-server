import { Module } from '@nestjs/common';
import { FilesController } from './files.controller';
import { FilesService } from './files.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { path } from 'app-root-path';
import { API_PREFIX, STATIC_PREFIX } from 'src/_core/constants';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: `${path}/uploads`,
      serveRoot: `/${API_PREFIX}/${STATIC_PREFIX}`,
    }),
  ],
  controllers: [FilesController],
  providers: [FilesService],
  exports: [FilesService],
})
export class FilesModule {}
