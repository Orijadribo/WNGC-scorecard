import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import TabNavigation from './App/Navigations/TabNavigation';
import StackNavigation from './App/Navigations/StackNavigation';

export default function App() {
  // Regular: require('./assets/Fonts/NunitoSans_7pt-Regular.ttf'),
  //   ExtraBold: require('./assets/Fonts/NunitoSans_7pt-ExtraBold.ttf'),
  //   Medium: require('./assets/Fonts/NunitoSans_7pt-Medium.ttf'),
  //   SemiBold: require('./assets/Fonts/NunitoSans_7pt-SemiBold.ttf'),
  //   Bold: require('./assets/Fonts/NunitoSans_7pt-Bold.ttf'),
  return (
    // <View style={styles.container}>
    <NavigationContainer>
      <StackNavigation />
    </NavigationContainer>
    // </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
