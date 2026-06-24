import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Linking,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useCart } from "../db/CartContext";
import { LinearGradient } from "expo-linear-gradient";
import {styles} from "../styles/cart.style"


const WHATSAPP_PHONE = "5547996831521";

export default function Cart() {
  const { cartItems, removeFromCart, clearCart, rentalData } = useCart();
  const navigation = useNavigation<any>();

  const total = cartItems.reduce((sum, item) => sum + item.price, 0);

  const handleRemoveItem = (id: string) => {
    removeFromCart(id);
  };

  const handleClearCart = () => {
    clearCart();
  };

  const handleProceed = () => {
    if (!rentalData || cartItems.length === 0) return;

    // Formatar a lista de brinquedos
    const itemsList = cartItems
      .map(
        (item) =>
          `• *${item.name}*\n  Período: ${formatDate(item.startDate)} até ${formatDate(item.endDate)} (${item.days} ${item.days === 1 ? "dia" : "dias"})\n  Preço: R$ ${item.price.toFixed(2)}`,
      )
      .join("\n\n");

    // Formatar o endereço
    const address = `${rentalData.rua}, nº ${rentalData.numero}${
      rentalData.complemento ? " - " + rentalData.complemento : ""
    }\nBairro: ${rentalData.bairro}\nCidade: ${rentalData.municipio}\nCEP: ${rentalData.cep}`;

    // Montar a mensagem completa do pedido
    const message =
      `Olá! Gostaria de confirmar a simulação de aluguel:\n\n` +
      `*BRINQUEDOS SOLICITADOS:*\n${itemsList}\n\n` +
      `*ENDEREÇO DE ENTREGA:*\n${address}\n\n` +
      `*PERÍODO DE USO GERAL:*\nDe ${formatDate(rentalData.dataInicial)} até ${formatDate(rentalData.dataFinal)}\n\n` +
      `*TOTAL DO ALUGUEL:* R$ ${total.toFixed(2)}`;

    const url = `whatsapp://send?phone=${WHATSAPP_PHONE}&text=${encodeURIComponent(message)}`;
    const fallbackUrl = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(message)}`;

    Linking.canOpenURL(url)
      .then((supported) => {
        if (supported) {
          Linking.openURL(url);
        } else {
          Linking.openURL(fallbackUrl);
        }
      })
      .catch((err) => {
        console.error("Erro ao abrir o WhatsApp:", err);
        Linking.openURL(fallbackUrl);
      });
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
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
              <Ionicons name="trash-outline" size={16} color="#ef4444" />
              <Text style={styles.clearButtonText}>Limpar Tudo</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Delivery Address Summary */}
        {rentalData && (
          <View style={styles.addressCard}>
            <View style={styles.addressHeader}>
              <Ionicons name="location-outline" size={18} color="#1e3a8a" />
              <Text style={styles.addressTitle}>Endereço de Entrega</Text>
            </View>
            <Text style={styles.addressText}>
              {rentalData.rua}, nº {rentalData.numero}{" "}
              {rentalData.complemento ? `(${rentalData.complemento})` : ""}
            </Text>
            <Text style={styles.addressSubtext}>
              {rentalData.bairro} — {rentalData.municipio} | CEP:{" "}
              {rentalData.cep}
            </Text>
            <View style={styles.addressPeriod}>
              <Ionicons name="calendar-outline" size={14} color="#6b7280" />
              <Text style={styles.addressPeriodText}>
                Período reservado: {formatDate(rentalData.dataInicial)} até{" "}
                {formatDate(rentalData.dataFinal)}
              </Text>
            </View>
          </View>
        )}

        {/* Cart Items or Empty Card */}
        {cartItems.length > 0 ? (
          <View style={styles.cartList}>
            {cartItems.map((item) => (
              <View key={item.id} style={styles.cartCard}>
                <View style={styles.cartCardTop}>
                  {/* Product Image */}
                  <Image
                    source={item.image}
                    style={styles.productImage}
                    resizeMode="cover"
                  />

                  {/* Product Info */}
                  <View style={styles.productInfo}>
                    <Text style={styles.productName} numberOfLines={2}>
                      {item.name}
                    </Text>
                    <Text style={styles.productPriceDay}>
                      R$ {item.pricePerDay}/dia
                    </Text>
                    <View style={styles.dateRow}>
                      <Ionicons
                        name="calendar-outline"
                        size={14}
                        color="#3b6fd4"
                      />
                      <Text style={styles.dateText}>
                        {formatDate(item.startDate)} até{" "}
                        {formatDate(item.endDate)} ({item.days}{" "}
                        {item.days === 1 ? "dia" : "dias"})
                      </Text>
                    </View>
                  </View>
                </View>

                <View style={styles.divider} />

                <View style={styles.cartCardBottom}>
                  <View style={styles.subtotalContainer}>
                    <Text style={styles.subtotalLabel}>Subtotal: </Text>
                    <Text style={styles.subtotalValue}>
                      R$ {item.price.toFixed(2)}
                    </Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => handleRemoveItem(item.id)}
                    style={styles.removeButton}
                  >
                    <Ionicons name="trash-outline" size={14} color="#ef4444" />
                    <Text style={styles.removeButtonText}>Remover</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        ) : (
          <View style={styles.emptyCartCard}>
            <Ionicons name="cart-outline" size={64} color="#9ca3af" />
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
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Total do Aluguel</Text>
              <Text style={styles.totalValue}>R$ {total.toFixed(2)}</Text>
            </View>

            <TouchableOpacity
              onPress={handleProceed}
              activeOpacity={0.8}
              style={styles.proceedButtonWrapper}
            >
              <LinearGradient
                colors={["#22c55e", "#16a34a"]}
                style={styles.proceedButton}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              >
                <Ionicons
                  name="logo-whatsapp"
                  size={20}
                  color="#fff"
                  style={{ marginRight: 8 }}
                />
                <Text style={styles.proceedButtonText}>
                  Finalizar no WhatsApp
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        )}
      </View>
      <View style={{ height: 30 }} />
    </ScrollView>
  );
}

function formatDate(dateString: string): string {
  const date = new Date(dateString + "T00:00:00");
  return date.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
  });
}