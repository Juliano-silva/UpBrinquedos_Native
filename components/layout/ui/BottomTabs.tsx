import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, View, Text, TouchableOpacity, Alert } from "react-native";
import { useCart } from "../../db/CartContext";

import Home from "../../pages/Home";
import Gerencia from "../../pages/Gerencia";
import Cart from "../../pages/Cart";
import About from "../../pages/About";

const Tab = createBottomTabNavigator();

function CustomTabBar({ state, descriptors, navigation }: any) {
  const { cartItems } = useCart();

  const handleAboutUs = () => {
    navigation.navigate("Sobre");
  };

  return (
    <View style={styles.tabBar}>
      {/* Home Button */}
      <TouchableOpacity
        style={styles.tabButton}
        onPress={() => navigation.navigate("Catalogo")}
      >
        <Ionicons name="home-outline" size={24} color="#1e3a8a" />
        <Text style={styles.tabLabel}>Home</Text>
      </TouchableOpacity>

      {/* About Button */}
      <TouchableOpacity style={styles.tabButton} onPress={handleAboutUs}>
        <Ionicons name="information-circle-outline" size={24} color="#1e3a8a" />
        <Text style={styles.tabLabel}>Sobre nós</Text>
      </TouchableOpacity>

      {/* Management Button */}
      <TouchableOpacity
        style={styles.tabButton}
        onPress={() => navigation.navigate("gerencia")}
      >
        <Ionicons name="person-outline" size={24} color="#1e3a8a" />
        <Text style={styles.tabLabel}>Gerencia</Text>
      </TouchableOpacity>

      {/* Cart Button */}
      <TouchableOpacity
        style={styles.tabButton}
        onPress={() => navigation.navigate("Carrinho")}
      >
        <View style={styles.cartContainer}>
          <Ionicons name="cart-outline" size={24} color="#1e3a8a" />
          {cartItems.length > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{cartItems.length}</Text>
            </View>
          )}
        </View>
        <Text style={styles.tabLabel}>Carrinho</Text>
      </TouchableOpacity>
    </View>
  );
}

export default function Tabs() {
  return (
    <Tab.Navigator
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen name="Catalogo" component={Home} />

      <Tab.Screen name="Sobre" component={About} />

      <Tab.Screen name="gerencia" component={Gerencia} />

      <Tab.Screen name="Carrinho" component={Cart} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: "row",
    backgroundColor: "#ffffff",
    borderTopWidth: 1,
    borderTopColor: "#e5e7eb75",
    paddingHorizontal: 12,
    paddingVertical: 10,
    justifyContent: "space-around",
    alignItems: "center",
    height: 70,
  },
  tabButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: "#2c69c4",
    borderRadius: 8,
    marginHorizontal: 4,
    backgroundColor: "#f9fafb",
  },
  tabLabel: {
    fontSize: 12,
    fontWeight: "600",
    color: "#1e3a8a",
    marginTop: 4,
  },
  cartContainer: {
    position: "relative",
    alignItems: "center",
  },
  badge: {
    position: "absolute",
    top: -6,
    right: -8,
    backgroundColor: "#ec4848",
    borderRadius: 9,
    minWidth: 18,
    height: 18,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 3,
  },
  badgeText: {
    color: "#0e0a0a",
    fontSize: 10,
    fontWeight: "bold",
  },
});
