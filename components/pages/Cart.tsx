import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface CartItem {
  id: string;
  name: string;
  price: number;
  pricePerDay: string;
  startDate: string;
  endDate: string;
  days: number;
  image: string;
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
    <ScrollView className="flex-1 bg-[#FCF9F2]">
      {/* Header */}
      <View className="bg-[#fcd34d] px-6 py-4">
        <View className="flex-row justify-between items-center">
          <View>
            <Text className="text-xl font-black text-[#1e3a8a]">
              UP BRINQUEDOS
            </Text>
            <Text className="text-[10px] font-bold text-red-500 uppercase tracking-wider">
              A DIVERSÃO DA SUA FESTA
            </Text>
          </View>
          <View className="flex-row gap-6">
            <TouchableOpacity className="flex-col items-center">
              <Ionicons name="home-outline" size={24} color="#1e3a8a" />
              <Text className="text-xs text-[#1e3a8a] mt-1">Home</Text>
            </TouchableOpacity>
            <TouchableOpacity className="flex-col items-center">
              <Ionicons name="information-circle-outline" size={24} color="#1e3a8a" />
              <Text className="text-xs text-[#1e3a8a] mt-1">Sobre nós</Text>
            </TouchableOpacity>
            <TouchableOpacity className="flex-col items-center">
              <Ionicons name="person-outline" size={24} color="#1e3a8a" />
              <Text className="text-xs text-[#1e3a8a] mt-1">Gerencia</Text>
            </TouchableOpacity>
            <TouchableOpacity className="flex-col items-center relative">
              <Ionicons name="cart-outline" size={24} color="#1e3a8a" />
              <View className="absolute -top-2 -right-2 bg-pink-500 rounded-full w-5 h-5 justify-center items-center">
                <Text className="text-white text-[10px] font-bold">
                  {cartItems.length}
                </Text>
              </View>
              <Text className="text-xs text-[#1e3a8a] mt-1">Carrinho</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Main Content */}
      <View className="px-6 py-10 max-w-5xl mx-auto w-full">
        {/* Title and Clear Button */}
        <View className="flex-row justify-between items-center mb-6">
          <Text className="text-3xl font-bold text-[#1e3a5f]">Carrinho</Text>
          <TouchableOpacity
            onPress={handleClearCart}
            className="bg-[#fcd34d] px-4 py-3 rounded-lg flex-row items-center gap-2 shadow-sm"
          >
            <Ionicons name="trash-outline" size={20} color="#1e3a5f" />
            <Text className="font-bold text-[#1e3a5f]">Limpar Carrinho</Text>
          </TouchableOpacity>
        </View>

        {/* Cart Items */}
        {cartItems.length > 0 ? (
          <View className="gap-4 mb-6">
            {cartItems.map((item) => (
              <View
                key={item.id}
                className="bg-white rounded-2xl p-5 shadow-sm flex-row items-center justify-between"
              >
                <View className="flex-row items-center gap-4">
                  {/* Product Image */}
                  <Image
                    source={item.image}
                    className="w-24 h-24 rounded-xl"
                    resizeMode="cover"
                  />

                  {/* Product Info */}
                  <View className="justify-center">
                    <Text className="text-[18px] font-bold text-[#1e3a5f] mb-1">
                      {item.name}
                    </Text>
                    <Text className="text-sm text-gray-500 mb-2">
                      R$ {item.pricePerDay}/dia
                    </Text>
                    <View className="flex-row items-center gap-2">
                      <Ionicons name="calendar-outline" size={16} color="#8ba6d1" />
                      <Text className="text-[13px] text-[#8ba6d1] font-medium">
                        {item.startDate} até {item.endDate} ({item.days} dia)
                      </Text>
                    </View>
                  </View>
                </View>

                {/* Subtotal & Remove */}
                <View className="flex-row items-center gap-4">
                  <View className="items-end">
                    <Text className="text-gray-500 text-sm mb-1">Subtotal</Text>
                    <Text className="text-[#ef4444] font-bold text-xl">
                      R$ {item.price.toFixed(2)}
                    </Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => handleRemoveItem(item.id)}
                    className="bg-[#ef4444] px-5 py-3 rounded-lg justify-center ml-2"
                  >
                    <Text className="text-white font-bold text-sm">
                      Remover
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        ) : (
          <View className="py-12 items-center">
            <Ionicons name="cart-outline" size={48} color="gray" />
            <Text className="text-gray-500 mt-4 text-center">
              Seu carrinho está vazio
            </Text>
          </View>
        )}

        {/* Total Section & Proceed Button */}
        {cartItems.length > 0 && (
          <View className="bg-white rounded-2xl p-6 shadow-sm mt-4">
            <Text className="text-center text-gray-500 text-sm mb-2 font-medium">
              Total do Carrinho
            </Text>
            <Text className="text-center text-[40px] font-bold text-[#10b981] mb-6">
              R$ {total.toFixed(2)}
            </Text>
            
            <TouchableOpacity
              onPress={handleProceed}
              className="bg-[#ef4444] py-4 rounded-xl shadow-sm"
            >
              <Text className="text-white text-center font-bold text-lg">
                Prosseguir para Aluguel
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </ScrollView>
  );
}