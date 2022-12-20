import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { ServerKafka } from '@nestjs/microservices';

@Injectable()
export class KafkaConsumerService
  extends ServerKafka
  implements OnModuleDestroy
{
  constructor() {
    super({
      client: {
        clientId: 'notifications',
        brokers: ['set-aphid-10292-us1-kafka.upstash.io:9092'],
        sasl: {
          mechanism: 'scram-sha-256',
          username:
            'c2V0LWFwaGlkLTEwMjkyJOxptt974DxqT6O3nSS3IkAHATD61EcEfoIgOuSKeTQ',
          password:
            'N77UYd6AnHfl74z3_j32usluWKZsmVvRTGkzPLhE1O7zNlq1stcm7XI0z48Xt7s58jq3Lw==',
        },
        ssl: true,
      },
    });
  }

  async onModuleDestroy() {
    await this.close();
  }
}
