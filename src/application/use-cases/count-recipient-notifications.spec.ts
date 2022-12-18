import { makeNotification } from '@test/factories/notification-factory';
import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications-repository';
import { CountRecipientNotifications } from './count-recipient-notifications';

describe('Counter recipients notifications', () => {
  it('should be able to count recipient notification', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const countRecipientNotifications = new CountRecipientNotifications(
      notificationsRepository,
    );

    const recipientIdOne = 'example-recipient-id-one';

    await notificationsRepository.create(
      makeNotification({
        recipientId: recipientIdOne,
      }),
    );

    await notificationsRepository.create(
      makeNotification({
        recipientId: recipientIdOne,
      }),
    );

    await notificationsRepository.create(
      makeNotification({
        recipientId: 'another-example',
      }),
    );

    const { count } = await countRecipientNotifications.execute({
      recipientId: recipientIdOne,
    });

    expect(count).toBe(2);
  });
});
