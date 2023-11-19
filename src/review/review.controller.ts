import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
  HttpCode,
} from '@nestjs/common';
import { ReviewService } from './review.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { IdValidationPipe } from 'src/pipes/mongo-id.pipe';
import { Cron, CronExpression } from '@nestjs/schedule';

@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Post()
  create(@Body() createReviewDto: CreateReviewDto) {
    return this.reviewService.create(createReviewDto);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Get(':id')
  createWithAI(@Param('id', IdValidationPipe) id: string) {
    return this.reviewService.createWithAI(id);
  }

  @Cron(CronExpression.EVERY_DAY_AT_1AM)
  createForRandomPostWithAI() {
    return this.reviewService.createForRandomWithAI();
  }

  @Get()
  findByPostId(@Body() postId: string) {
    return this.reviewService.findByPostId(postId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reviewService.findOne(+id);
  }

  @UsePipes(new ValidationPipe())
  @Patch(':id')
  update(
    @Param('id', IdValidationPipe) id: string,
    @Body() updateReviewDto: UpdateReviewDto,
  ) {
    return this.reviewService.update(id, updateReviewDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.reviewService.remove(id);
  }
}
