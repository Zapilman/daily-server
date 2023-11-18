import { Module } from '@nestjs/common';
import { PostController } from './post.controller';
import { TypegooseModule } from 'nestjs-typegoose';
import { PostModel } from './post.model';
import { PostService } from './post.service';

@Module({
  controllers: [PostController],
  providers: [PostService],
  exports: [PostService],
  imports: [
    TypegooseModule.forFeature([
      {
        typegooseClass: PostModel,
        schemaOptions: {
          collection: 'Post',
        },
      },
    ]),
  ],
})
export class PostModule {}
