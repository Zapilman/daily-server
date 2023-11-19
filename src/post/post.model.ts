import { prop } from '@typegoose/typegoose';
import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';
import { FileResponse } from 'src/files/dto/file.response';

class PostPhoto implements FileResponse {
  @prop()
  url: string;

  @prop()
  name: string;
}

export interface PostModel extends Base {}
export class PostModel extends TimeStamps {
  @prop({ required: true })
  title: string;

  @prop({ type: () => PostPhoto, _id: false })
  mainPhoto: PostPhoto;

  @prop()
  text: string;
  @prop()
  preText: string;
  @prop()
  minutesToRead: number;

  @prop({ type: () => [String] })
  tags: string[];
}
