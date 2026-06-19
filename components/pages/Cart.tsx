import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useCart } from "../db/CartContext";

import {styles} from "../styles/Cart"

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
