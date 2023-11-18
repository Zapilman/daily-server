import { HttpException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { OpenAI } from 'openai';

@Injectable()
export class OpenAiService {
  private readonly openAI: OpenAI;
  constructor(private readonly configService: ConfigService) {
    this.openAI = new OpenAI({
      apiKey: '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',
      organization: 'org-Ca6fWxr7nnHTPFx8PRfOdnkc',
    });
  }

  async getAIAnswer(message: string) {
    try {
      const chatCompletion = await this.openAI.chat.completions.create({
        messages: [{ role: 'user', content: message }],
        model: 'gpt-3.5-turbo',
      });
      return chatCompletion.choices[0].message.content;
    } catch (e) {
      throw new HttpException('AI exception', 404);
    }
  }
}
