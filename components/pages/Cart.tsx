import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useCart } from "../db/CartContext";

export default function Cart() {
  const { cartItems, removeFromCart, clearCart } = useCart();
  const navigation = useNavigation<any>();

  const total = cartItems.reduce((sum, item) => sum + item.price, 0);

  const handleRemoveItem = (id: string) => {
    removeFromCart(id);
  };

  const handleClearCart = () => {
    clearCart();
  };

  const handleProceed = () => {
    console.log("Prosseguir para aluguel");
  };

  return (
    <ScrollView style={styles.container}>
      {/* Main Content */}
      <View style={styles.mainContent}>
        {/* Title and Clear Button */}
        <View style={styles.titleRow}>
          <Text style={styles.pageTitle}>Carrinho</Text>
          {cartItems.length > 0 && (
            <TouchableOpacity
              onPress={handleClearCart}
              style={styles.clearButton}
            >
              <Ionicons name="trash-outline" size={20} color="#1e3a5f" />
              <Text style={styles.clearButtonText}>Limpar Carrinho</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Cart Items or Empty Card */}
        {cartItems.length > 0 ? (
          <View style={styles.cartList}>
            {cartItems.map((item) => (
              <View key={item.id} style={styles.cartCard}>
                <View style={styles.cartCardLeft}>
                  {/* Product Image */}
                  <Image
                    source={item.image}
                    style={styles.productImage}
                    resizeMode="cover"
                  />

                  {/* Product Info */}
                  <View style={styles.productInfo}>
                    <Text style={styles.productName}>{item.name}</Text>
                    <Text style={styles.productPriceDay}>
                      R$ {item.pricePerDay}/dia
                    </Text>
                    <View style={styles.dateRow}>
                      <Ionicons
                        name="calendar-outline"
                        size={16}
                        color="#8ba6d1"
                      />
                      <Text style={styles.dateText}>
                        {item.startDate} até {item.endDate} ({item.days} dia)
                      </Text>
                    </View>
                  </View>
                </View>

                <View style={styles.cartCardRight}>
                  <View style={styles.subtotalContainer}>
                    <Text style={styles.subtotalLabel}>Subtotal</Text>
                    <Text style={styles.subtotalValue}>
                      R$ {item.price.toFixed(2)}
                    </Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => handleRemoveItem(item.id)}
                    style={styles.removeButton}
                  >
                    <Text style={styles.removeButtonText}>Remover</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        ) : (
          <View style={styles.emptyCartCard}>
            <Text style={styles.emptyCartText}>Seu carrinho está vazio</Text>
            <TouchableOpacity
              style={styles.emptyCartButton}
              onPress={() => navigation.navigate("Catalogo")}
            >
              <Text style={styles.emptyCartButtonText}>Ver Brinquedos</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Total Section & Proceed Button */}
        {cartItems.length > 0 && (
          <View style={styles.totalCard}>
            <Text style={styles.totalLabel}>Total do Carrinho</Text>
            <Text style={styles.totalValue}>R$ {total.toFixed(2)}</Text>

            <TouchableOpacity
              onPress={handleProceed}
              style={styles.proceedButton}
            >
              <Text style={styles.proceedButtonText}>
                Prosseguir para Aluguel
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FCF9F2",
  },
  mainContent: {
    paddingHorizontal: 24,
    paddingVertical: 40,
    width: "100%",
    maxWidth: 1024,
    alignSelf: "center",
  },
  titleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  pageTitle: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#1e3a5f",
  },
  clearButton: {
    backgroundColor: "#fcd34d",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  clearButtonText: {
    fontWeight: "bold",
    color: "#1e3a5f",
  },
  cartList: {
    gap: 16,
    marginBottom: 24,
  },
  cartCard: {
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  cartCardLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  productImage: {
    width: 96,
    height: 96,
    borderRadius: 12,
  },
  productInfo: {
    justifyContent: "center",
  },
  productName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1e3a5f",
    marginBottom: 4,
  },
  productPriceDay: {
    fontSize: 14,
    color: "#6b7280",
    marginBottom: 8,
  },
  dateRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  dateText: {
    fontSize: 13,
    color: "#8ba6d1",
    fontWeight: "500",
  },
  cartCardRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  subtotalContainer: {
    alignItems: "flex-end",
  },
  subtotalLabel: {
    color: "#6b7280",
    fontSize: 14,
    marginBottom: 4,
  },
  subtotalValue: {
    color: "#ef4444",
    fontWeight: "bold",
    fontSize: 20,
  },
  removeButton: {
    backgroundColor: "#ef4444",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    justifyContent: "center",
    marginLeft: 8,
  },
  removeButtonText: {
    color: "#ffffff",
    fontWeight: "bold",
    fontSize: 14,
  },
  emptyCartCard: {
    backgroundColor: "#ffffff48",
    borderRadius: 16,
    paddingVertical: 48,
    paddingHorizontal: 24,
    alignItems: "center",
    justifyContent: "center",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 1, height: 3 },
    shadowOpacity: 0.2,
    width: "100%",
    maxWidth: 600,
    alignSelf: "center",
    marginTop: 20,
  },
  emptyCartText: {
    fontSize: 16,
    color: "#64748b",
    marginBottom: 20,
    textAlign: "center",
    fontWeight: "500",
  },
  emptyCartButton: {
    backgroundColor: "#fcd34d",
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    marginVertical: 20,
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
  },
  emptyCartButtonText: {
    color: "#1e3a8a",
    fontWeight: "bold",
    fontSize: 16,
  },
  totalCard: {
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 24,
    marginTop: 16,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  totalLabel: {
    textAlign: "center",
    color: "#6b7280",
    fontSize: 14,
    marginBottom: 8,
    fontWeight: "500",
  },
  totalValue: {
    textAlign: "center",
    fontSize: 40,
    fontWeight: "bold",
    color: "#10b981",
    marginBottom: 24,
  },
  proceedButton: {
    backgroundColor: "#ef4444",
    paddingVertical: 16,
    borderRadius: 12,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  proceedButtonText: {
    color: "#ffffff",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 18,
  },
});
