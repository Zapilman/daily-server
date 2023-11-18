import { ModuleMetadata } from '@nestjs/common';

export interface IOpenAiOptionsOptions {
  apiKey: string;
  organization: string;
}

export interface IOpenAIModuleAsyncOptions
  extends Pick<ModuleMetadata, 'imports'> {
  useFactory: (
    ...args: any[]
  ) => Promise<IOpenAiOptionsOptions> | IOpenAiOptionsOptions;
  inject?: any[];
}
