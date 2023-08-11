import React, { useEffect } from 'react';
import { SafeAreaView, StyleSheet, View, Text, Button } from 'react-native';
import { RootStackScreenProps } from '../types';
import config from '../config';
import Api from '../api';

export default function ThankYou({ navigation }: RootStackScreenProps<'ThankYou'>) {
  useEffect(() => {
    const params = { topic: config.events.WRITE_REVIEW };
    Api.subscribe(config.user.id, params);
  }, []);

  const onPress = () => {
    navigation.navigate('Home');
    const params = { topic: config.events.WRITE_REVIEW };
    Api.unsubscribe(config.user.id, params);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.text}>Thank You!!</Text>
        <Button title="Back To Home" onPress={onPress} />
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
  text: {
    textAlign: 'center',
    fontSize: 20,
    marginBottom: 20,
  },
});
