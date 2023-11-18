import { Module } from '@nestjs/common';
import { ReviewService } from './review.service';
import { ReviewController } from './review.controller';
import { TypegooseModule } from 'nestjs-typegoose';
import { ReviewModel } from './model/review.model';
import { OpenAiModule } from 'src/open-ai/open-ai.module';
import { PostService } from 'src/post/post.service';
import { PostModule } from 'src/post/post.module';

@Module({
  controllers: [ReviewController],
  providers: [ReviewService],
  imports: [
    TypegooseModule.forFeature([
      {
        typegooseClass: ReviewModel,
        schemaOptions: {
          collection: 'Review',
        },
      },
    ]),
    OpenAiModule,
    PostModule,
  ],
})
export class ReviewModule {}
