import React, { useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { registerForPushNotificationsAsync } from 'expo-notifications';

const App = () => {
  useEffect(() => {
    (async () => {
      const token = await registerForPushNotificationsAsync();
      console.log('Expo Push Token:', token.data);
    })();
  }, []);

  return (
    <View style={styles.container}>
      <Text>Check the console for Expo Push Token.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
