import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { useCart } from "../../db/CartContext";

import Home from "../../pages/Home";
import Gerencia from "../../pages/Gerencia";
import Cart from "../../pages/Cart";
import About from "../../pages/About";

const Tab = createBottomTabNavigator();

function CustomTabBar({ state, descriptors, navigation }: any) {
  const { cartItems } = useCart();
  const currentRoute = state.routes[state.index].name;

  const handleNavigate = (routeName: string) => {
    navigation.navigate(routeName);
  };

  const getTabStyle = (routeName: string) => {
    const isActive = currentRoute === routeName;
    return {
      color: isActive ? "#ef4444" : "#9ca3af",
      iconName: getIconName(routeName, isActive),
    };
  };

  const getIconName = (routeName: string, isActive: boolean): any => {
    switch (routeName) {
      case "Catalogo":
        return isActive ? "home" : "home-outline";
      case "Sobre":
        return isActive ? "information-circle" : "information-circle-outline";
      case "gerencia":
        return isActive ? "person" : "person-outline";
      case "Carrinho":
        return isActive ? "cart" : "cart-outline";
      default:
        return "help-outline";
    }
  };

  return (
    <View style={styles.tabBar}>
      {/* Home Button */}
      <TouchableOpacity
        style={styles.tabButton}
        onPress={() => handleNavigate("Catalogo")}
      >
        <Ionicons
          name={getTabStyle("Catalogo").iconName}
          size={24}
          color={getTabStyle("Catalogo").color}
        />
        <Text
          style={[
            styles.tabLabel,
            { color: getTabStyle("Catalogo").color },
            currentRoute === "Catalogo" && styles.tabLabelActive,
          ]}
        >
          Home
        </Text>
      </TouchableOpacity>

      {/* About Button */}
      <TouchableOpacity
        style={styles.tabButton}
        onPress={() => handleNavigate("Sobre")}
      >
        <Ionicons
          name={getTabStyle("Sobre").iconName}
          size={24}
          color={getTabStyle("Sobre").color}
        />
        <Text
          style={[
            styles.tabLabel,
            { color: getTabStyle("Sobre").color },
            currentRoute === "Sobre" && styles.tabLabelActive,
          ]}
        >
          Sobre nós
        </Text>
      </TouchableOpacity>

      {/* Management Button */}
      <TouchableOpacity
        style={styles.tabButton}
        onPress={() => handleNavigate("gerencia")}
      >
        <Ionicons
          name={getTabStyle("gerencia").iconName}
          size={24}
          color={getTabStyle("gerencia").color}
        />
        <Text
          style={[
            styles.tabLabel,
            { color: getTabStyle("gerencia").color },
            currentRoute === "gerencia" && styles.tabLabelActive,
          ]}
        >
          Gerência
        </Text>
      </TouchableOpacity>

      {/* Cart Button */}
      <TouchableOpacity
        style={styles.tabButton}
        onPress={() => handleNavigate("Carrinho")}
      >
        <View style={styles.cartContainer}>
          <Ionicons
            name={getTabStyle("Carrinho").iconName}
            size={24}
            color={getTabStyle("Carrinho").color}
          />
          {cartItems.length > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{cartItems.length}</Text>
            </View>
          )}
        </View>
        <Text
          style={[
            styles.tabLabel,
            { color: getTabStyle("Carrinho").color },
            currentRoute === "Carrinho" && styles.tabLabelActive,
          ]}
        >
          Carrinho
        </Text>
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
    borderTopColor: "#e5e7eb80",
    paddingHorizontal: 12,
    paddingVertical: 10,
    justifyContent: "space-around",
    alignItems: "center",
    height: 70,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 8,
  },
  tabButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 8,
    marginHorizontal: 4,
  },
  tabLabel: {
    fontSize: 11,
    fontWeight: "500",
    marginTop: 4,
  },
  tabLabelActive: {
    fontWeight: "700",
  },
  cartContainer: {
    position: "relative",
    alignItems: "center",
  },
  badge: {
    position: "absolute",
    top: -6,
    right: -8,
    backgroundColor: "#ef4444",
    borderRadius: 9,
    minWidth: 18,
    height: 18,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 3,
  },
  badgeText: {
    color: "#ffffff",
    fontSize: 10,
    fontWeight: "bold",
  },
});
