import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
  Modal,
  TextInput,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { INFLATABLE_TOYS, Toy } from "../../assets/toys";
import { useCart } from "../db/CartContext";
import { Calendar } from "react-native-calendars";

export default function Home() {
  const { addToCart } = useCart();
  const [selectedToy, setSelectedToy] = useState<Toy | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectingStart, setSelectingStart] = useState(true);
  const [startDate, setStartDate] = useState<string | null>(null);
  const [endDate, setEndDate] = useState<string | null>(null);
  const [searchText, setSearchText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = [
    "Todos",
    "Castelo",
    "Piscina",
    "Escorregador",
    "Trampolim",
    "Casa",
    "Acessório",
  ];

  const filteredToys = INFLATABLE_TOYS.filter((toy) => {
    const matchesSearch = toy.name
      .toLowerCase()
      .includes(searchText.toLowerCase());
    const matchesCategory =
      !selectedCategory ||
      selectedCategory === "Todos" ||
      toy.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleDayPress = (day: any) => {
    if (selectingStart) {
      setStartDate(day.dateString);
      setSelectingStart(false);
    } else {
      if (new Date(day.dateString) >= new Date(startDate!)) {
        setEndDate(day.dateString);
      } else {
        Alert.alert("Erro", "A data final deve ser após a data inicial");
      }
    }
  };

  const handleAddToCart = () => {
    if (!selectedToy || !startDate || !endDate) {
      Alert.alert("Erro", "Selecione as datas de aluguel");
      return;
    }

    const start = new Date(startDate);
    const end = new Date(endDate);
    const days = Math.ceil(
      (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24),
    );

    const cartItem = {
      id: `${selectedToy.id}-${Date.now()}`,
      name: selectedToy.name,
      price: selectedToy.pricePerDay * days,
      pricePerDay: selectedToy.pricePerDay.toString(),
      startDate,
      endDate,
      days,
      image: selectedToy.image,
    };

    addToCart(cartItem);
    Alert.alert("Sucesso", `${selectedToy.name} adicionado ao carrinho! 🎉`);
    closeModal();
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedToy(null);
    setStartDate(null);
    setEndDate(null);
    setSelectingStart(true);
  };

  return (
    <ScrollView style={styles.container}>
      {/* Search Bar */}
      <View style={styles.searchSection}>
        <Ionicons name="search" size={20} color="#8ba6d1" />
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar brinquedo..."
          value={searchText}
          onChangeText={setSearchText}
          placeholderTextColor="#ccc"
        />
      </View>

      {/* Categories */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.categoriesScroll}
      >
        {categories.map((category) => (
          <TouchableOpacity
            key={category}
            style={[
              styles.categoryButton,
              selectedCategory === category && styles.categoryButtonActive,
            ]}
            onPress={() =>
              setSelectedCategory(
                category === selectedCategory ? null : category,
              )
            }
          >
            <Text
              style={[
                styles.categoryText,
                selectedCategory === category && styles.categoryTextActive,
              ]}
            >
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Toys Grid */}
      <View style={styles.toysGrid}>
        {filteredToys.length > 0 ? (
          filteredToys.map((toy) => (
            <TouchableOpacity
              key={toy.id}
              style={styles.toyCard}
              onPress={() => {
                setSelectedToy(toy);
                setModalVisible(true);
              }}
            >
              <Image source={toy.image} style={styles.toyImage} />

              <View style={styles.toyInfo}>
                <Text style={styles.toyName} numberOfLines={2}>
                  {toy.name}
                </Text>
                <Text style={styles.toyDescription} numberOfLines={1}>
                  {toy.description}
                </Text>

                <View style={styles.toyFooter}>
                  <View>
                    <Text style={styles.toyPrice}>
                      R$ {toy.pricePerDay}/dia
                    </Text>
                    <Text style={styles.toyCapacity}>
                      Até {toy.maxPeople} pessoas
                    </Text>
                  </View>

                  <TouchableOpacity
                    style={styles.addButton}
                    onPress={() => {
                      setSelectedToy(toy);
                      setModalVisible(true);
                    }}
                  >
                    <Ionicons name="add-circle" size={28} color="#FF6B6B" />
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>
          ))
        ) : (
          <View style={styles.emptyState}>
            <Ionicons name="sad-outline" size={48} color="#ccc" />
            <Text style={styles.emptyText}>Nenhum brinquedo encontrado</Text>
          </View>
        )}
      </View>

      {/* Date Selection Modal */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="slide"
        onRequestClose={closeModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <TouchableOpacity onPress={closeModal}>
                <Ionicons name="close" size={28} color="#1e3a5f" />
              </TouchableOpacity>
              <Text style={styles.modalTitle}>{selectedToy?.name}</Text>
              <View style={{ width: 28 }} />
            </View>

            <ScrollView style={styles.modalBody}>
              <Image
                source={selectedToy?.image}
                style={styles.modalImage}
                resizeMode="contain"
              />

              <View style={styles.toyDetailsContainer}>
                <Text style={styles.detailsTitle}>Detalhes do Brinquedo</Text>

                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Descrição:</Text>
                  <Text style={styles.detailValue}>
                    {selectedToy?.description}
                  </Text>
                </View>

                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Capacidade:</Text>
                  <Text style={styles.detailValue}>
                    Até {selectedToy?.maxPeople} pessoas
                  </Text>
                </View>

                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Dimensões:</Text>
                  <Text style={styles.detailValue}>
                    {selectedToy?.dimensions}
                  </Text>
                </View>

                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Cor:</Text>
                  <Text style={styles.detailValue}>{selectedToy?.color}</Text>
                </View>

                <View style={styles.priceContainer}>
                  <Text style={styles.priceLabel}>Valor do Aluguel:</Text>
                  <Text style={styles.priceValue}>
                    R$ {selectedToy?.pricePerDay}/dia
                  </Text>
                </View>
              </View>

              <View style={styles.calendarSection}>
                <Text style={styles.calendarTitle}>
                  {selectingStart
                    ? "Selecione a data de INÍCIO"
                    : "Selecione a data de FIM"}
                </Text>

                <Calendar
                  onDayPress={handleDayPress}
                  minDate={
                    new Date(Date.now() + 86400000).toISOString().split("T")[0]
                  }
                  maxDate={
                    new Date(Date.now() + 90 * 86400000)
                      .toISOString()
                      .split("T")[0]
                  }
                  markingType="period"
                  markedDates={{
                    ...(startDate && {
                      [startDate]: {
                        startingDay: true,
                        color: "#FF6B6B",
                        textColor: "#fff",
                      },
                    }),
                    ...(endDate && {
                      [endDate]: {
                        endingDay: true,
                        color: "#FF6B6B",
                        textColor: "#fff",
                      },
                    }),
                    ...(startDate &&
                      endDate &&
                      getDatesInRange(startDate, endDate).reduce(
                        (acc, date) => ({
                          ...acc,
                          [date]: {
                            color: "#FFD6D6",
                            textColor: "#333",
                          },
                        }),
                        {},
                      )),
                  }}
                />

                {startDate && endDate && (
                  <View style={styles.datesSummary}>
                    <Text style={styles.datesSummaryText}>
                      📅 De {formatDate(startDate)} até {formatDate(endDate)}
                    </Text>
                    <Text style={styles.daysText}>
                      {Math.ceil(
                        (new Date(endDate).getTime() -
                          new Date(startDate).getTime()) /
                          (1000 * 60 * 60 * 24),
                      )}{" "}
                      dia(s)
                    </Text>
                    <Text style={styles.totalPrice}>
                      Total: R${" "}
                      {(
                        selectedToy!.pricePerDay *
                        Math.ceil(
                          (new Date(endDate).getTime() -
                            new Date(startDate).getTime()) /
                            (1000 * 60 * 60 * 24),
                        )
                      ).toFixed(2)}
                    </Text>
                  </View>
                )}
              </View>
            </ScrollView>

            <TouchableOpacity
              style={[
                styles.addToCartButton,
                (!startDate || !endDate) && styles.buttonDisabled,
              ]}
              onPress={handleAddToCart}
              disabled={!startDate || !endDate}
            >
              <Ionicons name="cart" size={24} color="#fff" />
              <Text style={styles.addToCartButtonText}>
                Adicionar ao Carrinho
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

function formatDate(dateString: string): string {
  const date = new Date(dateString + "T00:00:00");
  return date.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

function getDatesInRange(startDate: string, endDate: string): string[] {
  const dates: string[] = [];
  const currentDate = new Date(startDate + "T00:00:00");
  const end = new Date(endDate + "T00:00:00");

  while (currentDate < end) {
    currentDate.setDate(currentDate.getDate() + 1);
    const dateStr = currentDate.toISOString().split("T")[0];
    if (dateStr !== endDate) {
      dates.push(dateStr);
    }
  }

  return dates;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FCF9F2",
    paddingBottom: 20,
  },
  searchSection: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    marginHorizontal: 16,
    marginVertical: 16,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E6F4FE",
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 14,
    color: "#333",
  },
  categoriesScroll: {
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  categoryButton: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    marginRight: 8,
    borderRadius: 20,
    backgroundColor: "#E6F4FE",
    borderWidth: 1,
    borderColor: "#8ba6d1",
  },
  categoryButtonActive: {
    backgroundColor: "#1e3a5f",
    borderColor: "#1e3a5f",
  },
  categoryText: {
    fontSize: 12,
    color: "#1e3a5f",
    fontWeight: "600",
  },
  categoryTextActive: {
    color: "#fff",
  },
  toysGrid: {
    paddingHorizontal: 12,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  toyCard: {
    width: "48%",
    backgroundColor: "#fff",
    borderRadius: 12,
    marginBottom: 16,
    overflow: "hidden",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  toyImage: {
    width: "100%",
    height: 120,
    backgroundColor: "#E6F4FE",
  },
  toyInfo: {
    padding: 12,
  },
  toyName: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1e3a5f",
    marginBottom: 4,
  },
  toyDescription: {
    fontSize: 11,
    color: "#666",
    marginBottom: 8,
  },
  toyFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  toyPrice: {
    fontSize: 13,
    fontWeight: "700",
    color: "#FF6B6B",
  },
  toyCapacity: {
    fontSize: 10,
    color: "#8ba6d1",
    marginTop: 2,
  },
  addButton: {
    padding: 4,
  },
  emptyState: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 40,
  },
  emptyText: {
    fontSize: 14,
    color: "#999",
    marginTop: 8,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    flex: 1,
    backgroundColor: "#FCF9F2",
    marginTop: 40,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#E6F4FE",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1e3a5f",
    flex: 1,
    textAlign: "center",
    marginHorizontal: 8,
  },
  modalBody: {
    flex: 1,
    paddingHorizontal: 16,
  },
  modalImage: {
    width: "100%",
    height: 200,
    marginVertical: 12,
    borderRadius: 12,
  },
  toyDetailsContainer: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
  },
  detailsTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#1e3a5f",
    marginBottom: 12,
  },
  detailRow: {
    marginBottom: 10,
  },
  detailLabel: {
    fontSize: 12,
    fontWeight: "600",
    color: "#666",
  },
  detailValue: {
    fontSize: 12,
    color: "#333",
    marginTop: 2,
  },
  priceContainer: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "#E6F4FE",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  priceLabel: {
    fontSize: 13,
    fontWeight: "600",
    color: "#333",
  },
  priceValue: {
    fontSize: 16,
    fontWeight: "700",
    color: "#FF6B6B",
  },
  calendarSection: {
    marginBottom: 20,
  },
  calendarTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#1e3a5f",
    marginBottom: 12,
  },
  datesSummary: {
    backgroundColor: "#E6F4FE",
    borderRadius: 12,
    padding: 12,
    marginTop: 12,
  },
  datesSummaryText: {
    fontSize: 12,
    color: "#333",
    fontWeight: "600",
  },
  daysText: {
    fontSize: 12,
    color: "#666",
    marginTop: 4,
  },
  totalPrice: {
    fontSize: 14,
    fontWeight: "700",
    color: "#FF6B6B",
    marginTop: 6,
  },
  addToCartButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FF6B6B",
    marginHorizontal: 16,
    marginBottom: 16,
    paddingVertical: 14,
    borderRadius: 12,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  addToCartButtonText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#fff",
    marginLeft: 8,
  },
});
