import React, { useEffect } from 'react';
import { SafeAreaView, StyleSheet, View, Button } from 'react-native';
import { RootStackScreenProps } from '../types';
import config from '../config';
import Api from '../api';

export default function Home({ navigation }: RootStackScreenProps<'Home'>) {
  useEffect(() => {
    const params = { topic: config.events.SIGN_UP };
    Api.subscribe(config.user.id, params);
  }, []);

  const onPress = () => {
    navigation.navigate('Product');
    const params = { topic: config.events.SIGN_UP };
    Api.unsubscribe(config.user.id, params);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Button title="Sign Up" onPress={onPress} />
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
