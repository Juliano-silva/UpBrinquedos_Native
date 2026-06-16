import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import BottomTabs from './components/layout/ui/BottomTabs';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { CartProvider } from './components/db/CartContext';
import Header from './components/layout/ui/Header';

export default function App() {
  return (
    <CartProvider>
      <SafeAreaProvider>
        <NavigationContainer>
          <View style={styles.appContainer}>
            <Header />
            <View style={styles.contentContainer}>
              <BottomTabs />
            </View>
          </View>
        </NavigationContainer>
      </SafeAreaProvider>
    </CartProvider>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    backgroundColor: '#FCF9F2',
  },
  contentContainer: {
    flex: 1,
  },
});
