import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import notifee from '@notifee/react-native';
import messaging from '@react-native-firebase/messaging';

const onMessageReceived = async (message: any) => {
  console.log('onMessageReceived', message);

  // Create a channel (required for Android)
  const channelId = await notifee.createChannel({
    id: 'default',
    name: 'Default Channel',
  });

  await notifee.displayNotification({
    title: message.data.title,
    body: message.data.body,
    android: {
      channelId,
      // pressAction is needed if you want the notification to open the app when pressed
      pressAction: {
        id: 'default',
      },
    },
  });
};

messaging().onMessage(onMessageReceived);
messaging().setBackgroundMessageHandler(onMessageReceived);

// To hide 'no background event handler' warning
notifee.onBackgroundEvent(async () => {});

AppRegistry.registerComponent(appName, () => App);
