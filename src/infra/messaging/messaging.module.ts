import { SendNotification } from '@application/use-cases/send-notification';
import { DatabaseModule } from '@infra/database/database.module';
import { KafkaConsumerService } from '@infra/messaging/kafka/kafka-consumer.service';
import { Module } from '@nestjs/common';
import { KafkaNotificationsController } from './kafka/controllers/kafka-notifications.controller';

@Module({
  imports: [DatabaseModule],
  providers: [KafkaConsumerService, SendNotification],
  controllers: [KafkaNotificationsController],
})
export class MessagingModule {}
