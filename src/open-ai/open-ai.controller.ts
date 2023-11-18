import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { OpenAiService } from './open-ai.service';

@Controller('open-ai')
export class OpenAiController {
  constructor(private readonly openAiService: OpenAiService) {}
  @HttpCode(200)
  @Post()
  async get(@Body() { message }: { message: string }) {
    return this.openAiService.getAIAnswer(message);
  }
}
