import { HttpException, Injectable } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { ReviewModel } from './model/review.model';
import { DocumentType, ModelType } from '@typegoose/typegoose/lib/types';
import { Types } from 'mongoose';
import { InjectModel } from 'nestjs-typegoose';
import { OpenAiService } from 'src/open-ai/open-ai.service';
import { PostService } from 'src/post/post.service';

@Injectable()
export class ReviewService {
  constructor(
    @InjectModel(ReviewModel)
    private readonly reviewModel: ModelType<ReviewModel>,
    private readonly openAI: OpenAiService,
    private readonly postService: PostService,
  ) {}
  async create(
    createReviewDto: CreateReviewDto,
  ): Promise<DocumentType<ReviewModel>> {
    return this.reviewModel.create(createReviewDto);
  }

  async createWithAI(postId: string) {
    const posts = await this.postService.findPostById(postId);
    if (!posts.length) {
      throw new HttpException('POST NO FOUND', 403);
    }
    const message = `Придумай небольшой коментарий к этому тексту: ${posts[0].text}`;
    const commentText = await this.openAI.getAIAnswer(message);
    return this.create({ text: commentText || 'good post', postId });
  }

  async createForRandomWithAI() {
    const post = await this.postService.findRandom();
    if (!post) {
      throw new HttpException('POST NO FOUND', 403);
    }
    return this.createWithAI(String(post._id));
  }

  findByPostId(postId: string): Promise<DocumentType<ReviewModel>[]> {
    return this.reviewModel.find({ postId: new Types.ObjectId(postId) }).exec();
  }

  findOne(id: number) {
    return `This action returns a #${id} review`;
  }

  update(id: string, updateReviewDto: UpdateReviewDto) {
    return this.reviewModel
      .findByIdAndUpdate(id, updateReviewDto, {
        new: true,
      })
      .exec();
  }

  remove(id: string): Promise<DocumentType<ReviewModel> | null> {
    return this.reviewModel.findByIdAndDelete(id).exec();
  }
}
