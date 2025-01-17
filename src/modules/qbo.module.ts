import { Module } from '@nestjs/common';
import { QboFactory } from '../factories/qbo.factory.ts';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [ConfigModule], // Ensure the ConfigModule is imported for env vars
  providers: [
    QboFactory,
    {
      provide: 'CONSUMER_KEY', // Can be injected into QboFactory
      useValue: '',
    },
    {
      provide: 'CONSUMER_SECRET',
      useValue: '',
    },
  ],
  exports: [QboFactory],
})
export class QboModule {}
