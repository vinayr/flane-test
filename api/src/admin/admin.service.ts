import { Injectable } from '@nestjs/common';
import admin from 'firebase-admin';
import { TopicSubscriptionDto } from './dto/topic-subscription.dto';
import { TopicNotificationDto } from './dto/topic-notification.dto';

admin.initializeApp({
  credential: admin.credential.applicationDefault(),
});

@Injectable()
export class AdminService {
  async subscribeToTopic(data: TopicSubscriptionDto) {
    try {
      await admin.messaging().subscribeToTopic(data.deviceToken, data.topic);
    } catch (e) {
      console.log('subscribeToTopic error', e);
    }
  }

  async unsubscribeFromTopic(data: TopicSubscriptionDto) {
    try {
      await admin.messaging().unsubscribeFromTopic(data.deviceToken, data.topic);
    } catch (e) {
      console.log('unsubscribeFromTopic error', e);
    }
  }

  async sendMessageToTopic(data: TopicNotificationDto) {
    const message = {
      data: {
        title: data.title,
        body: data.body,
      },
      topic: data.topic,
    };

    console.log('sending notification', message);

    try {
      await admin.messaging().send(message);
    } catch (e) {
      console.log('sendMessageToTopic error', e);
    }
  }
}
