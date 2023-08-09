import React, { useEffect } from 'react';
import { SafeAreaView, StyleSheet, Text, View, Button } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import notifee from '@notifee/react-native';

function App() {
  useEffect(() => {
    const onMessageReceived = async (message: any) => {
      console.log('onMessageReceived', message);
    };

    const saveToken = async () => {
      await messaging().registerDeviceForRemoteMessages();
      const token = await messaging().getToken();
      console.log('TOKEN', token);
    };

    messaging().onMessage(onMessageReceived);
    messaging().setBackgroundMessageHandler(onMessageReceived);
    saveToken();
  }, []);

  async function onDisplayNotification() {
    // Request permissions (required for iOS)
    await notifee.requestPermission();

    // Create a channel (required for Android)
    const channelId = await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
    });

    // Display a notification
    const notificationId = await notifee.displayNotification({
      title: 'Notification Title',
      body: 'Main body content of the notification',
      android: {
        channelId,
        // pressAction is needed if you want the notification to open the app when pressed
        pressAction: {
          id: 'default',
        },
      },
    });

    await new Promise((r) => setTimeout(r, 4000));

    await notifee.cancelNotification(notificationId);

    // await notifee.displayNotification({
    //   id: '123',
    //   title: 'Updated Notification Title',
    //   body: 'Updated main body content of the notification',
    //   android: {
    //     channelId,
    //   },
    // });
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text>Hello World</Text>
      <View>
        <Button
          title="Display Notification"
          onPress={() => onDisplayNotification()}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;
