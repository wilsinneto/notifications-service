const { randomUUID } = require('crypto');
const { Kafka } = require('kafkajs');

async function bootstrap() {
  const kafka = new Kafka({
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
  });

  const producer = kafka.producer();

  await producer.connect();

  await producer.send({
    topic: 'notifications.send-notification',
    messages: [
      {
        value: JSON.stringify({
          content: 'Nova solicitação de amizade',
          category: 'social',
          recipientId: randomUUID(),
        }),
      },
    ],
  });

  await producer.disconnect();
}

bootstrap();
