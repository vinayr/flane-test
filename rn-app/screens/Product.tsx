import React from 'react';
import { SafeAreaView, StyleSheet, View, Button } from 'react-native';
import { RootStackScreenProps } from '../types';

export default function Product({ navigation }: RootStackScreenProps<'Product'>) {
  const onPress = () => {
    navigation.navigate('Cart');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Button title="Add To Cart" onPress={onPress} />
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
