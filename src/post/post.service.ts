import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { PostModel } from './post.model';
import { DocumentType, ModelType } from '@typegoose/typegoose/lib/types';
import { CreatePostDto } from './dto/create-post.dto';
import { Types } from 'mongoose';
import { countTimeToRead } from './utils/countTimeToRead';

@Injectable()
export class PostService {
  constructor(
    @InjectModel(PostModel) private readonly postModel: ModelType<PostModel>,
  ) {}

  async create(
    createReviewDto: CreatePostDto,
  ): Promise<DocumentType<PostModel>> {
    return this.postModel.create({
      ...createReviewDto,
      minutesToRead: countTimeToRead(createReviewDto.text),
    });
  }

  async findRandom(): Promise<DocumentType<PostModel> | null> {
    const count = await this.postModel.countDocuments();
    const random = Math.floor(Math.random() * count);
    return this.postModel.findOne().skip(random).exec();
  }

  async findPostById(id: string): Promise<PostModel | null> {
    const posts: PostModel[] = await this.postModel
      .aggregate([
        {
          $match: {
            _id: new Types.ObjectId(id),
          },
        },
        {
          $sort: {
            _id: 1,
          },
        },
        {
          $lookup: {
            from: 'Review',
            localField: '_id',
            foreignField: 'postId',
            as: 'review',
          },
        },
      ])
      .exec();
    return posts.length > 0 ? posts[0] : null;
  }

  async getAllPosts() {
    return this.postModel.find({}).skip(0).limit(10).exec();
  }
}
