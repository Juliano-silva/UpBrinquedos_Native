import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  Linking,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useCart } from "../db/CartContext";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";

export default function Gerencia() {
  const { rentalData, clearRentalData, cartItems } = useCart();

  const handleResetData = () => {
    Alert.alert(
      "Alterar Endereço / Período?",
      "Isso redefinirá suas datas e endereço de entrega. Seus brinquedos no carrinho também serão limpos para garantir a disponibilidade no novo período. Deseja continuar?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Sim, Alterar",
          style: "destructive",
          onPress: async () => {
            try {
              await clearRentalData();
            } catch (e) {
              console.error("Erro ao limpar dados:", e);
            }
          },
        },
      ],
    );
  };

  const menuItems = [
    { icon: "help-circle-outline", title: "Dúvidas Frequentes", route: "faq" },
    {
      icon: "shield-checkmark-outline",
      title: "Políticas de Segurança",
      route: "safety",
    },
    {
      icon: "document-text-outline",
      title: "Termos de Serviço",
      route: "terms",
    },
    { icon: "logo-whatsapp", title: "Falar com Suporte", route: "support" },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Profile Header */}
      <View style={styles.header}>
        <LinearGradient
          colors={["#1e3a8a", "#3b6fd4"]}
          style={styles.avatarGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <Ionicons name="person" size={32} color="#fff" />
        </LinearGradient>
        <View style={styles.headerInfo}>
          <Text style={styles.userName}>Sessão de Festa</Text>
          <Text style={styles.userRole}>Reserva de Infláveis</Text>
        </View>
      </View>

      <View style={styles.content}>
        {/* Current Rental Info */}
        <Text style={styles.sectionTitle}>Resumo da Programação</Text>

        {rentalData ? (
          <View style={styles.card}>
            {/* Address */}
            <View style={styles.infoRow}>
              <View style={styles.iconWrapperBlue}>
                <Ionicons name="location" size={18} color="#1e3a8a" />
              </View>
              <View style={styles.infoTextContainer}>
                <Text style={styles.infoLabel}>Local da Entrega</Text>
                <Text style={styles.infoValue}>
                  {rentalData.rua}, {rentalData.numero}{" "}
                  {rentalData.complemento ? `(${rentalData.complemento})` : ""}
                </Text>
                <Text style={styles.infoSubValue}>
                  {rentalData.bairro} — {rentalData.municipio} | CEP:{" "}
                  {rentalData.cep}
                </Text>
              </View>
            </View>

            <View style={styles.divider} />

            {/* Dates */}
            <View style={styles.infoRow}>
              <View style={styles.iconWrapperGreen}>
                <Ionicons name="calendar" size={18} color="#10b981" />
              </View>
              <View style={styles.infoTextContainer}>
                <Text style={styles.infoLabel}>Período de Aluguel</Text>
                <Text style={styles.infoValue}>
                  De {formatDate(rentalData.dataInicial)} até{" "}
                  {formatDate(rentalData.dataFinal)}
                </Text>
              </View>
            </View>

            <View style={styles.divider} />

            {/* Cart Items Status */}
            <View style={styles.infoRow}>
              <View style={styles.iconWrapperOrange}>
                <Ionicons name="cart" size={18} color="#f97316" />
              </View>
              <View style={styles.infoTextContainer}>
                <Text style={styles.infoLabel}>Carrinho de Compras</Text>
                <Text style={styles.infoValue}>
                  {cartItems.length} brinquedo
                  {cartItems.length === 1 ? " selecionado" : "s selecionados"}
                </Text>
              </View>
            </View>

            <TouchableOpacity
              style={styles.resetButton}
              onPress={handleResetData}
            >
              <Ionicons name="create-outline" size={18} color="#ef4444" />
              <Text style={styles.resetButtonText}>
                Alterar Endereço / Período
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.cardEmpty}>
            <Text style={styles.cardEmptyText}>
              Nenhum período de aluguel programado.
            </Text>
          </View>
        )}

        {/* Menu Options */}
        <Text style={styles.sectionTitle}>Mais Opções</Text>
        <View style={styles.menuCard}>
          {menuItems.map((item, index) => (
            <React.Fragment key={item.route}>
              <TouchableOpacity
                style={styles.menuItem}
                onPress={() => {
                  if (item.route === "support") {
                    Linking.openURL(
                      "https://wa.me/5547996831521?text=Olá! Preciso de ajuda com meu aluguel.",
                    );
                  } else {
                    Alert.alert(
                      item.title,
                      `Esta é uma funcionalidade simulada para: ${item.title}`,
                    );
                  }
                }}
              >
                <View style={styles.menuItemLeft}>
                  <Ionicons
                    name={item.icon as any}
                    size={20}
                    color="#4b5563"
                    style={{ marginRight: 12 }}
                  />
                  <Text style={styles.menuItemTitle}>{item.title}</Text>
                </View>
                <Ionicons name="chevron-forward" size={16} color="#9ca3af" />
              </TouchableOpacity>
              {index < menuItems.length - 1 && (
                <View style={styles.menuDivider} />
              )}
            </React.Fragment>
          ))}
        </View>

        {/* App Version Info */}
        <Text style={styles.versionText}>
          Versão do App: 1.0.0 (UpBrinquedos)
        </Text>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8faff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb80",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.02,
    shadowRadius: 6,
    elevation: 2,
  },
  avatarGradient: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  headerInfo: {
    marginLeft: 16,
  },
  userName: {
    fontSize: 18,
    fontWeight: "900",
    color: "#1e3a8a",
  },
  userRole: {
    fontSize: 12,
    color: "#6b7280",
    fontWeight: "500",
    marginTop: 2,
  },
  content: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: "800",
    color: "#1e3a8a",
    marginTop: 16,
    marginBottom: 10,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 18,
    padding: 16,
    shadowColor: "#1e3a8a",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    marginBottom: 16,
  },
  cardEmpty: {
    backgroundColor: "#ffffff",
    borderRadius: 18,
    padding: 24,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#e5e7eb",
    marginBottom: 16,
  },
  cardEmptyText: {
    fontSize: 13,
    color: "#9ca3af",
    fontWeight: "600",
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    paddingVertical: 4,
  },
  iconWrapperBlue: {
    width: 32,
    height: 32,
    borderRadius: 10,
    backgroundColor: "#eff6ff",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  iconWrapperGreen: {
    width: 32,
    height: 32,
    borderRadius: 10,
    backgroundColor: "#ecfdf5",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  iconWrapperOrange: {
    width: 32,
    height: 32,
    borderRadius: 10,
    backgroundColor: "#fff7ed",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  infoTextContainer: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 11,
    color: "#6b7280",
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 0.3,
  },
  infoValue: {
    fontSize: 13,
    fontWeight: "700",
    color: "#1f2937",
    marginTop: 2,
    lineHeight: 18,
  },
  infoSubValue: {
    fontSize: 12,
    color: "#6b7280",
    marginTop: 2,
  },
  divider: {
    height: 1,
    backgroundColor: "#f3f4f6",
    marginVertical: 12,
  },
  resetButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fef2f2",
    borderWidth: 1.5,
    borderColor: "#fee2e2",
    borderRadius: 12,
    paddingVertical: 12,
    marginTop: 16,
  },
  resetButtonText: {
    color: "#ef4444",
    fontWeight: "800",
    fontSize: 13,
    marginLeft: 6,
  },
  menuCard: {
    backgroundColor: "#ffffff",
    borderRadius: 18,
    paddingHorizontal: 16,
    shadowColor: "#1e3a8a",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    marginBottom: 20,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 14,
  },
  menuItemLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  menuItemTitle: {
    fontSize: 13,
    fontWeight: "700",
    color: "#374151",
  },
  menuDivider: {
    height: 1,
    backgroundColor: "#f3f4f6",
  },
  versionText: {
    textAlign: "center",
    fontSize: 11,
    color: "#9ca3af",
    fontWeight: "600",
    marginTop: 10,
  },
});
