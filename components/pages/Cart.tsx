import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface CartItem {
  id: string;
  name: string;
  price: number;
  pricePerDay: string;
  startDate: string;
  endDate: string;
  days: number;
  image: any;
}

export default function Cart() {
  const cartItems: CartItem[] = [
    {
      id: "1",
      name: "Pula Pula Infantil",
      price: 150.0,
      pricePerDay: "150.00",
      startDate: "15/06/2026",
      endDate: "16/06/2026",
      days: 1,
      image: require("../../assets/icon.png"),
    },
  ];

  const total = cartItems.reduce((sum, item) => sum + item.price, 0);

  const handleRemoveItem = (id: string) => {
    console.log("Remover item:", id);
  };

  const handleClearCart = () => {
    console.log("Limpar carrinho");
  };

  const handleProceed = () => {
    console.log("Prosseguir para aluguel");
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <View>
            <Text style={styles.logoText}>
              UP BRINQUEDOS
            </Text>
            <Text style={styles.logoSubText}>
              A DIVERSÃO DA SUA FESTA
            </Text>
          </View>
          <View style={styles.navIcons}>
            <TouchableOpacity style={styles.navIcon}>
              <Ionicons name="home-outline" size={24} color="#1e3a8a" />
              <Text style={styles.navIconText}>Home</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.navIcon}>
              <Ionicons name="information-circle-outline" size={24} color="#1e3a8a" />
              <Text style={styles.navIconText}>Sobre nós</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.navIcon}>
              <Ionicons name="person-outline" size={24} color="#1e3a8a" />
              <Text style={styles.navIconText}>Gerencia</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.navIcon, styles.cartIconContainer]}>
              <Ionicons name="cart-outline" size={24} color="#1e3a8a" />
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{cartItems.length}</Text>
              </View>
              <Text style={styles.navIconText}>Carrinho</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Main Content */}
      <View style={styles.mainContent}>
        {/* Title and Clear Button */}
        <View style={styles.titleRow}>
          <Text style={styles.pageTitle}>Carrinho</Text>
          <TouchableOpacity onPress={handleClearCart} style={styles.clearButton}>
            <Ionicons name="trash-outline" size={20} color="#1e3a5f" />
            <Text style={styles.clearButtonText}>Limpar Carrinho</Text>
          </TouchableOpacity>
        </View>

        {/* Cart Items */}
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
                      <Ionicons name="calendar-outline" size={16} color="#8ba6d1" />
                      <Text style={styles.dateText}>
                        {item.startDate} até {item.endDate} ({item.days} dia)
                      </Text>
                    </View>
                  </View>
                </View>

                {/* Subtotal & Remove */}
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
          <View style={styles.emptyCart}>
            <Ionicons name="cart-outline" size={48} color="gray" />
            <Text style={styles.emptyCartText}>
              Seu carrinho está vazio
            </Text>
          </View>
        )}

        {/* Total Section & Proceed Button */}
        {cartItems.length > 0 && (
          <View style={styles.totalCard}>
            <Text style={styles.totalLabel}>
              Total do Carrinho
            </Text>
            <Text style={styles.totalValue}>
              R$ {total.toFixed(2)}
            </Text>
            
            <TouchableOpacity onPress={handleProceed} style={styles.proceedButton}>
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
    backgroundColor: '#FCF9F2',
  },
  header: {
    backgroundColor: '#fcd34d',
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logoText: {
    fontSize: 20,
    fontWeight: '900',
    color: '#1e3a8a',
  },
  logoSubText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#ef4444',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  navIcons: {
    flexDirection: 'row',
    gap: 24,
  },
  navIcon: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  cartIconContainer: {
    position: 'relative',
  },
  navIconText: {
    fontSize: 12,
    color: '#1e3a8a',
    marginTop: 4,
  },
  badge: {
    position: 'absolute',
    top: -8,
    right: -8,
    backgroundColor: '#ec4899',
    borderRadius: 12,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  badgeText: {
    color: '#ffffff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  mainContent: {
    paddingHorizontal: 24,
    paddingVertical: 40,
    width: '100%',
    maxWidth: 1024,
    alignSelf: 'center',
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  pageTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#1e3a5f',
  },
  clearButton: {
    backgroundColor: '#fcd34d',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  clearButtonText: {
    fontWeight: 'bold',
    color: '#1e3a5f',
  },
  cartList: {
    gap: 16,
    marginBottom: 24,
  },
  cartCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  cartCardLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  productImage: {
    width: 96,
    height: 96,
    borderRadius: 12,
  },
  productInfo: {
    justifyContent: 'center',
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1e3a5f',
    marginBottom: 4,
  },
  productPriceDay: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 8,
  },
  dateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  dateText: {
    fontSize: 13,
    color: '#8ba6d1',
    fontWeight: '500',
  },
  cartCardRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  subtotalContainer: {
    alignItems: 'flex-end',
  },
  subtotalLabel: {
    color: '#6b7280',
    fontSize: 14,
    marginBottom: 4,
  },
  subtotalValue: {
    color: '#ef4444',
    fontWeight: 'bold',
    fontSize: 20,
  },
  removeButton: {
    backgroundColor: '#ef4444',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    justifyContent: 'center',
    marginLeft: 8,
  },
  removeButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  emptyCart: {
    paddingVertical: 48,
    alignItems: 'center',
  },
  emptyCartText: {
    color: '#6b7280',
    marginTop: 16,
    textAlign: 'center',
  },
  totalCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 24,
    marginTop: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  totalLabel: {
    textAlign: 'center',
    color: '#6b7280',
    fontSize: 14,
    marginBottom: 8,
    fontWeight: '500',
  },
  totalValue: {
    textAlign: 'center',
    fontSize: 40,
    fontWeight: 'bold',
    color: '#10b981',
    marginBottom: 24,
  },
  proceedButton: {
    backgroundColor: '#ef4444',
    paddingVertical: 16,
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  proceedButtonText: {
    color: '#ffffff',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18,
  },
});