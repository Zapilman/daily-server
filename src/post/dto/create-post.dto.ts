import { MaxLength, IsString } from 'class-validator';
import { FileResponse } from 'src/files/dto/file.response';

export class CreatePostDto {
  @IsString()
  title: string;

  @IsString()
  text: string;

  @MaxLength(20)
  preText: string;

  @MaxLength(20, {
    each: true,
  })
  tags: string[];

  mainPhoto?: FileResponse;
}
