import { Global, Module } from '@nestjs/common';
import { OpenAiService } from './open-ai.service';
import { OpenAiController } from './open-ai.controller';
import { ConfigModule } from '@nestjs/config';

@Global()
@Module({
  providers: [OpenAiService],
  controllers: [OpenAiController],
  imports: [ConfigModule],
  exports: [OpenAiService],
})
export class OpenAiModule {}
