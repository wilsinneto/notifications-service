import { makeNotification } from '@test/factories/notification-factory';
import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications-repository';
import { GetRecipientNotifications } from './get-recipient-notifications';

describe('Get recipients notifications', () => {
  it('should be able to recipient notifications', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const getRecipientNotifications = new GetRecipientNotifications(
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

    const { notifications } = await getRecipientNotifications.execute({
      recipientId: recipientIdOne,
    });

    expect(notifications).toHaveLength(2);
    expect(notifications).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ recipientId: recipientIdOne }),
        expect.objectContaining({ recipientId: recipientIdOne }),
      ]),
    );
  });
});
