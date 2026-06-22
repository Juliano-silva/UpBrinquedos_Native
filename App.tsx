import React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, ActivityIndicator } from "react-native";
import BottomTabs from "./components/layout/ui/BottomTabs";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { CartProvider, useCart } from "./components/db/CartContext";
import Header from "./components/layout/ui/Header";
import FormularioAluguel from "./components/pages/Formulario";

function AppContent() {
  const { rentalData, isRentalLoading } = useCart();

  if (isRentalLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#1e3a8a" />
        <StatusBar style="auto" />
      </View>
    );
  }

  if (!rentalData) {
    return (
      <>
        <FormularioAluguel />
        <StatusBar style="auto" />
      </>
    );
  }

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <View style={styles.appContainer}>
          <Header />
          <View style={styles.contentContainer}>
            <BottomTabs />
          </View>
        </View>
        <StatusBar style="auto" />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default function App() {
  return (
    <CartProvider>
      <AppContent />
    </CartProvider>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    backgroundColor: "#FCF9F2",
  },
  contentContainer: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FCF9F2",
  },
});
