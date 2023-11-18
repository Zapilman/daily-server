import { prop } from '@typegoose/typegoose';
import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';

export interface PostModel extends Base {}
export class PostModel extends TimeStamps {
  @prop({ required: true })
  title: string;
  @prop()
  mainPhoto: string;
  @prop()
  text: string;
  @prop()
  preText: string;
  @prop()
  minutesToRead: number;

  @prop({ type: () => [String] })
  tags: string[];
}
