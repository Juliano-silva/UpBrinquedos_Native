import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import BottomTabs from './components/layout/ui/BottomTabs';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { CartProvider } from './components/db/CartContext';
import Header from './components/layout/ui/Header';
import FormularioAluguel from './components/pages/Formulario';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from 'react';



export default function App() {
  const [alugel, setAluguel] = useState(Boolean)

  useEffect(() => {
    const verificar = async () => {
      try {
        const dados = await AsyncStorage.getItem("@dados_aluguel");

        if (dados) {
          setAluguel(false);
        } else {
          setAluguel(true); 
        }
      } catch (error) {
        console.error(error);
      }
    }
    verificar()
  })

  

  if (alugel) {
    return <FormularioAluguel />;
  } else {
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
