import { MaxLength, isString } from 'class-validator';

export class CreatePostDto {
  title: string;
  mainPhoto: string;
  text: string;

  @MaxLength(20)
  preText: string;

  @MaxLength(20, {
    each: true,
  })
  tags: string[];
}
