import { DatabaseModule } from '@infra/database/database.module';
import { MessagingModule } from '@infra/messaging/messaging.module';
import { Module } from '@nestjs/common';
import { HttpModule } from './infra/http/http.module';

@Module({
  imports: [HttpModule, DatabaseModule, MessagingModule],
})
export class AppModule {}
