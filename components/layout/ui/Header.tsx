import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useCart } from "../../db/CartContext";

export default function Header() {
  const navigation = useNavigation<any>();
  const { cartItems } = useCart();

  const handleNavigate = (screen: string) => {
    try {
      navigation.navigate(screen);
    } catch (error) {
      console.warn("Navegação falhou:", error);
    }
  };

  const handleAboutUs = () => {
    Alert.alert(
      "Sobre Nós",
      "UP Brinquedos - A diversão da sua festa! Aluguel de pula-pula e brinquedos infantis com o melhor atendimento."
    );
  };

  return (
    <View style={styles.header}>
      <View style={styles.headerContent}>
        {/* Logo Section */}
        <TouchableOpacity style={styles.logoContainer} onPress={() => handleNavigate("Catalogo")}>
          <Text style={styles.logoText}>UP BRINQUEDOS</Text>
          <Text style={styles.logoSubText}>A DIVERSÃO DA SUA FESTA</Text>
        </TouchableOpacity>

        {/* Navigation Menu */}
        <View style={styles.navIcons}>
          <TouchableOpacity style={styles.navIcon} onPress={() => handleNavigate("Catalogo")}>
            <Ionicons name="home-outline" size={22} color="#1e3a8a" />
            <Text style={styles.navIconText}>Home</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.navIcon} onPress={handleAboutUs}>
            <Ionicons name="information-circle-outline" size={22} color="#1e3a8a" />
            <Text style={styles.navIconText}>Sobre nós</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.navIcon} onPress={() => handleNavigate("gerencia")}>
            <Ionicons name="person-outline" size={22} color="#1e3a8a" />
            <Text style={styles.navIconText}>Gerencia</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.navIcon, styles.cartIconContainer]}
            onPress={() => handleNavigate("Carrinho")}
          >
            <Ionicons name="cart-outline" size={22} color="#1e3a8a" />
            {cartItems.length > 0 && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{cartItems.length}</Text>
              </View>
            )}
            <Text style={styles.navIconText}>Carrinho</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#fcd34d',
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#f59e0b',
    width: '100%',
    zIndex: 1000,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    maxWidth: 1200,
    width: '100%',
    alignSelf: 'center',
  },
  logoContainer: {
    justifyContent: 'center',
  },
  logoText: {
    fontSize: 20,
    fontWeight: '900',
    color: '#1e3a8a',
    letterSpacing: 0.5,
  },
  logoSubText: {
    fontSize: 9,
    fontWeight: 'bold',
    color: '#ef4444',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginTop: 1,
  },
  navIcons: {
    flexDirection: 'row',
    gap: 20,
    alignItems: 'center',
  },
  navIcon: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
  },
  cartIconContainer: {
    position: 'relative',
  },
  navIconText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#1e3a8a',
    marginTop: 3,
  },
  badge: {
    position: 'absolute',
    top: -6,
    right: -2,
    backgroundColor: '#ec4899',
    borderRadius: 9,
    minWidth: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
    paddingHorizontal: 3,
  },
  badgeText: {
    color: '#ffffff',
    fontSize: 9,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
