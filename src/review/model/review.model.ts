import { prop } from '@typegoose/typegoose';
import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';
import { Types } from 'mongoose';

export interface ReviewModel extends Base {}
export class ReviewModel extends TimeStamps {
  @prop()
  text: string;

  @prop()
  postId: Types.ObjectId;
}
