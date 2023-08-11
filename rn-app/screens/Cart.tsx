import React, { useEffect } from 'react';
import { SafeAreaView, StyleSheet, View, Button } from 'react-native';
import { RootStackScreenProps } from '../types';
import config from '../config';
import Api from '../api';

export default function Cart({ navigation }: RootStackScreenProps<'Cart'>) {
  useEffect(() => {
    const params = { topic: config.events.ADD_TO_CART };
    Api.subscribe(config.user.id, params);
  }, []);

  const onPress = () => {
    navigation.navigate('ThankYou');
    const params = { topic: config.events.ADD_TO_CART };
    Api.unsubscribe(config.user.id, params);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Button title="Buy Products" onPress={onPress} />
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
