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
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { INFLATABLE_TOYS, Toy } from "../../assets/toys";
import { useCart } from "../db/CartContext";
import { Calendar } from "react-native-calendars";
import { LinearGradient } from "expo-linear-gradient";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const CARD_WIDTH = (SCREEN_WIDTH - 48) / 2;

export default function Home() {
  const { addToCart } = useCart();
  const [selectedToy, setSelectedToy] = useState<Toy | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectingStart, setSelectingStart] = useState(true);
  const [startDate, setStartDate] = useState<string | null>(null);
  const [endDate, setEndDate] = useState<string | null>(null);
  const [searchText, setSearchText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchFocused, setSearchFocused] = useState(false);

  const categories = [
    { label: "Todos", icon: "🎉" },
    { label: "Castelo", icon: "🏰" },
    { label: "Piscina", icon: "🏊" },
    { label: "Escorregador", icon: "🎢" },
    { label: "Trampolim", icon: "⬆️" },
    { label: "Casa", icon: "🐧" },
    { label: "Acessório", icon: "🪜" },
  ];

  const featuredToys = INFLATABLE_TOYS.filter((toy) => toy.featured);

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
      setEndDate(null);
      setSelectingStart(false);
    } else {
      if (new Date(day.dateString) >= new Date(startDate!)) {
        setEndDate(day.dateString);
      } else {
        Alert.alert("Atenção", "A data final deve ser após a data inicial");
      }
    }
  };

  const handleAddToCart = () => {
    if (!selectedToy || !startDate || !endDate) {
      Alert.alert("Atenção", "Selecione as datas de aluguel");
      return;
    }

    const start = new Date(startDate);
    const end = new Date(endDate);
    const days = Math.ceil(
      (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)
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
    Alert.alert("Adicionado! 🎉", `${selectedToy.name} foi adicionado ao carrinho com sucesso!`);
    closeModal();
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedToy(null);
    setStartDate(null);
    setEndDate(null);
    setSelectingStart(true);
  };

  const openToy = (toy: Toy) => {
    setSelectedToy(toy);
    setModalVisible(true);
  };

  const totalDays =
    startDate && endDate
      ? Math.ceil(
          (new Date(endDate).getTime() - new Date(startDate).getTime()) /
            (1000 * 60 * 60 * 24)
        )
      : 0;

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
    >
      {/* Hero Banner */}
      <LinearGradient
        colors={["#1e3a8a", "#3b6fd4", "#60a5fa"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.heroBanner}
      >
        <View style={styles.heroContent}>
          <View style={styles.heroBadge}>
            <Text style={styles.heroBadgeText}>🎈 Aluguel de Infláveis</Text>
          </View>
          <Text style={styles.heroTitle}>Diversão que{"\n"}vai até você!</Text>
          <Text style={styles.heroSubtitle}>
            Mais de 8 brinquedos disponíveis para tornar sua festa inesquecível
          </Text>
          <View style={styles.heroStats}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>8+</Text>
              <Text style={styles.statLabel}>Brinquedos</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>⭐ 5.0</Text>
              <Text style={styles.statLabel}>Avaliação</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>100+</Text>
              <Text style={styles.statLabel}>Festas</Text>
            </View>
          </View>
        </View>
        <View style={styles.heroBalloons}>
          <Text style={styles.balloonEmoji}>🎈</Text>
          <Text style={[styles.balloonEmoji, { marginTop: 20, fontSize: 28 }]}>🎊</Text>
          <Text style={[styles.balloonEmoji, { marginTop: -10 }]}>🎈</Text>
        </View>
      </LinearGradient>

      {/* Search Bar */}
      <View style={styles.searchWrapper}>
        <View style={[styles.searchSection, searchFocused && styles.searchFocused]}>
          <Ionicons name="search" size={20} color={searchFocused ? "#3b6fd4" : "#9ca3af"} />
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar brinquedo..."
            value={searchText}
            onChangeText={setSearchText}
            placeholderTextColor="#9ca3af"
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
          />
          {searchText.length > 0 && (
            <TouchableOpacity onPress={() => setSearchText("")}>
              <Ionicons name="close-circle" size={20} color="#9ca3af" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Categories */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.categoriesScroll}
        contentContainerStyle={styles.categoriesContent}
      >
        {categories.map((cat) => (
          <TouchableOpacity
            key={cat.label}
            style={[
              styles.categoryButton,
              (selectedCategory === cat.label || (cat.label === "Todos" && !selectedCategory)) &&
                styles.categoryButtonActive,
            ]}
            onPress={() =>
              setSelectedCategory(
                cat.label === "Todos"
                  ? null
                  : cat.label === selectedCategory
                  ? null
                  : cat.label
              )
            }
            activeOpacity={0.8}
          >
            <Text style={styles.categoryIcon}>{cat.icon}</Text>
            <Text
              style={[
                styles.categoryText,
                (selectedCategory === cat.label || (cat.label === "Todos" && !selectedCategory)) &&
                  styles.categoryTextActive,
              ]}
            >
              {cat.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Featured Section */}
      {!searchText && !selectedCategory && (
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>⭐ Destaques</Text>
            <Text style={styles.sectionSubtitle}>Os favoritos da galera</Text>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.featuredScroll}
          >
            {featuredToys.map((toy) => (
              <TouchableOpacity
                key={toy.id}
                style={styles.featuredCard}
                onPress={() => openToy(toy)}
                activeOpacity={0.9}
              >
                <Image source={toy.image} style={styles.featuredImage} resizeMode="cover" />
                <LinearGradient
                  colors={["transparent", "rgba(0,0,0,0.85)"]}
                  style={styles.featuredGradient}
                >
                  <View style={styles.featuredBadge}>
                    <Text style={styles.featuredBadgeText}>Destaque</Text>
                  </View>
                  <Text style={styles.featuredName}>{toy.name}</Text>
                  <View style={styles.featuredFooter}>
                    <Text style={styles.featuredPrice}>R$ {toy.pricePerDay}/dia</Text>
                    <View style={styles.featuredPeople}>
                      <Ionicons name="people" size={12} color="#fff" />
                      <Text style={styles.featuredPeopleText}>até {toy.maxPeople}</Text>
                    </View>
                  </View>
                </LinearGradient>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}

      {/* All Toys Section */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>
            {selectedCategory ? `${selectedCategory}s` : "🎪 Catálogo Completo"}
          </Text>
          <Text style={styles.sectionSubtitle}>
            {filteredToys.length} disponíve{filteredToys.length === 1 ? "l" : "is"}
          </Text>
        </View>

        {filteredToys.length > 0 ? (
          <View style={styles.toysGrid}>
            {filteredToys.map((toy) => (
              <TouchableOpacity
                key={toy.id}
                style={styles.toyCard}
                onPress={() => openToy(toy)}
                activeOpacity={0.9}
              >
                <View style={styles.toyImageContainer}>
                  <Image source={toy.image} style={styles.toyImage} resizeMode="cover" />
                  <View style={styles.toyIconBadge}>
                    <Text style={styles.toyIconText}>{toy.categoryIcon}</Text>
                  </View>
                </View>

                <View style={styles.toyInfo}>
                  <Text style={styles.toyName} numberOfLines={2}>
                    {toy.name}
                  </Text>
                  <Text style={styles.toyDescription} numberOfLines={2}>
                    {toy.description}
                  </Text>

                  <View style={styles.toyMeta}>
                    <Ionicons name="people-outline" size={11} color="#6b7280" />
                    <Text style={[styles.toyMetaText, { marginLeft: 4 }]}>Até {toy.maxPeople} pessoas</Text>
                  </View>

                  <View style={styles.toyFooter}>
                    <View>
                      <Text style={styles.toyPriceLabel}>a partir de</Text>
                      <Text style={styles.toyPrice}>R$ {toy.pricePerDay}</Text>
                      <Text style={styles.toyPriceDay}>/dia</Text>
                    </View>
                    <TouchableOpacity
                      style={styles.addButton}
                      onPress={() => openToy(toy)}
                      activeOpacity={0.8}
                    >
                      <LinearGradient
                        colors={["#f97316", "#ef4444"]}
                        style={styles.addButtonGradient}
                      >
                        <Ionicons name="add" size={20} color="#fff" />
                      </LinearGradient>
                    </TouchableOpacity>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        ) : (
          <View style={styles.emptyState}>
            <Text style={styles.emptyEmoji}>🔍</Text>
            <Text style={styles.emptyTitle}>Nenhum brinquedo encontrado</Text>
            <Text style={styles.emptySubtitle}>
              Tente buscar com outro termo ou categoria
            </Text>
            <TouchableOpacity
              style={styles.clearFilterButton}
              onPress={() => { setSearchText(""); setSelectedCategory(null); }}
            >
              <Text style={styles.clearFilterText}>Limpar filtros</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      {/* Bottom Padding */}
      <View style={{ height: 24 }} />

      {/* Detail & Date Modal */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="slide"
        onRequestClose={closeModal}
      >
        <View style={styles.modalOverlay}>
          <TouchableOpacity style={styles.modalBackdrop} onPress={closeModal} />
          <View style={styles.modalContent}>
            {/* Modal Header Image */}
            <View style={styles.modalImageContainer}>
              <Image
                source={selectedToy?.image}
                style={styles.modalImage}
                resizeMode="cover"
              />
              <LinearGradient
                colors={["transparent", "rgba(0,0,0,0.7)"]}
                style={styles.modalImageGradient}
              />
              <TouchableOpacity style={styles.modalCloseButton} onPress={closeModal}>
                <Ionicons name="close" size={22} color="#fff" />
              </TouchableOpacity>
              <View style={styles.modalTitleContainer}>
                <Text style={styles.modalTitle}>{selectedToy?.name}</Text>
                <View style={styles.modalPriceBadge}>
                  <Text style={styles.modalPriceBadgeText}>
                    R$ {selectedToy?.pricePerDay}/dia
                  </Text>
                </View>
              </View>
            </View>

            <ScrollView style={styles.modalBody} showsVerticalScrollIndicator={false}>
              {/* Description */}
              <Text style={styles.modalDescription}>{selectedToy?.description}</Text>

              {/* Details Grid */}
              <View style={styles.detailsGrid}>
                <View style={styles.detailChip}>
                  <Ionicons name="people" size={14} color="#3b6fd4" />
                  <Text style={styles.detailChipText}>Até {selectedToy?.maxPeople} pessoas</Text>
                </View>
                <View style={styles.detailChip}>
                  <Ionicons name="resize" size={14} color="#3b6fd4" />
                  <Text style={styles.detailChipText}>{selectedToy?.dimensions}</Text>
                </View>
                <View style={styles.detailChip}>
                  <Ionicons name="color-palette" size={14} color="#3b6fd4" />
                  <Text style={styles.detailChipText}>{selectedToy?.color}</Text>
                </View>
                <View style={styles.detailChip}>
                  <Ionicons name="pricetag" size={14} color="#3b6fd4" />
                  <Text style={styles.detailChipText}>{selectedToy?.category}</Text>
                </View>
              </View>

              {/* Calendar Section */}
              <View style={styles.calendarSection}>
                <View style={styles.calendarStepHeader}>
                  <View style={[styles.stepDot, !selectingStart && styles.stepDotDone]}>
                    <Text style={styles.stepDotText}>1</Text>
                  </View>
                  <Text style={styles.calendarStepText}>
                    {selectingStart ? "Escolha a data de INÍCIO" : "✅ Data inicial: " + (startDate ? formatDate(startDate) : "")}
                  </Text>
                </View>
                {!selectingStart && (
                  <View style={styles.calendarStepHeader}>
                    <View style={[styles.stepDot, !!endDate && styles.stepDotDone]}>
                      <Text style={styles.stepDotText}>2</Text>
                    </View>
                    <Text style={styles.calendarStepText}>
                      {endDate ? "✅ Data final: " + formatDate(endDate) : "Escolha a data de FIM"}
                    </Text>
                  </View>
                )}

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
                        color: "#3b6fd4",
                        textColor: "#fff",
                      },
                    }),
                    ...(endDate && {
                      [endDate]: {
                        endingDay: true,
                        color: "#3b6fd4",
                        textColor: "#fff",
                      },
                    }),
                    ...(startDate &&
                      endDate &&
                      getDatesInRange(startDate, endDate).reduce(
                        (acc, date) => ({
                          ...acc,
                          [date]: {
                            color: "#c7d9f7",
                            textColor: "#1e3a8a",
                          },
                        }),
                        {}
                      )),
                  }}
                  theme={{
                    backgroundColor: "#fff",
                    calendarBackground: "#fff",
                    textSectionTitleColor: "#1e3a8a",
                    selectedDayBackgroundColor: "#3b6fd4",
                    selectedDayTextColor: "#fff",
                    todayTextColor: "#f97316",
                    dayTextColor: "#374151",
                    arrowColor: "#3b6fd4",
                    monthTextColor: "#1e3a8a",
                    textDayFontWeight: "500",
                    textMonthFontWeight: "700",
                    textDayHeaderFontWeight: "600",
                  }}
                />

                {/* Reset dates */}
                {(startDate || endDate) && (
                  <TouchableOpacity
                    style={styles.resetDatesButton}
                    onPress={() => {
                      setStartDate(null);
                      setEndDate(null);
                      setSelectingStart(true);
                    }}
                  >
                    <Ionicons name="refresh" size={14} color="#6b7280" />
                    <Text style={styles.resetDatesText}>Redefinir datas</Text>
                  </TouchableOpacity>
                )}

                {/* Summary */}
                {startDate && endDate && (
                  <LinearGradient
                    colors={["#1e3a8a", "#3b6fd4"]}
                    style={styles.summaryCard}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                  >
                    <View style={styles.summaryRow}>
                      <View>
                        <Text style={styles.summaryLabel}>Período</Text>
                        <Text style={styles.summaryValue}>
                          {formatDate(startDate)} → {formatDate(endDate)}
                        </Text>
                      </View>
                      <View style={styles.summaryDays}>
                        <Text style={styles.summaryDaysNumber}>{totalDays}</Text>
                        <Text style={styles.summaryDaysLabel}>dias</Text>
                      </View>
                    </View>
                    <View style={styles.summaryDivider} />
                    <View style={styles.summaryTotalRow}>
                      <Text style={styles.summaryTotalLabel}>Total do Aluguel</Text>
                      <Text style={styles.summaryTotalValue}>
                        R$ {(selectedToy!.pricePerDay * totalDays).toFixed(2)}
                      </Text>
                    </View>
                  </LinearGradient>
                )}
              </View>

              <View style={{ height: 16 }} />
            </ScrollView>

            {/* CTA Button */}
            <View style={styles.modalFooter}>
              <TouchableOpacity
                onPress={handleAddToCart}
                disabled={!startDate || !endDate}
                activeOpacity={0.8}
              >
                <LinearGradient
                  colors={
                    startDate && endDate
                      ? ["#f97316", "#ef4444"]
                      : ["#d1d5db", "#9ca3af"]
                  }
                  style={styles.addToCartButton}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                >
                  <Ionicons name="cart" size={22} color="#fff" />
                  <Text style={styles.addToCartButtonText}>
                    {startDate && endDate
                      ? `Adicionar — R$ ${(selectedToy!.pricePerDay * totalDays).toFixed(2)}`
                      : "Selecione as datas"}
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
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
    backgroundColor: "#f8faff",
  },

  // === HERO BANNER ===
  heroBanner: {
    paddingTop: 24,
    paddingBottom: 32,
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  heroContent: {
    flex: 1,
  },
  heroBadge: {
    backgroundColor: "rgba(255,255,255,0.2)",
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 4,
    alignSelf: "flex-start",
    marginBottom: 12,
  },
  heroBadgeText: {
    color: "#fff",
    fontSize: 11,
    fontWeight: "600",
    letterSpacing: 0.5,
  },
  heroTitle: {
    fontSize: 26,
    fontWeight: "900",
    color: "#fff",
    lineHeight: 32,
    marginBottom: 8,
    letterSpacing: -0.5,
  },
  heroSubtitle: {
    fontSize: 12,
    color: "rgba(255,255,255,0.85)",
    lineHeight: 18,
    marginBottom: 20,
  },
  heroStats: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.15)",
    borderRadius: 12,
    padding: 12,
  },
  statItem: {
    alignItems: "center",
    flex: 1,
  },
  statNumber: {
    fontSize: 14,
    fontWeight: "800",
    color: "#fff",
  },
  statLabel: {
    fontSize: 10,
    color: "rgba(255,255,255,0.75)",
    marginTop: 2,
  },
  statDivider: {
    width: 1,
    height: 24,
    backgroundColor: "rgba(255,255,255,0.3)",
  },
  heroBalloons: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 8,
  },
  balloonEmoji: {
    fontSize: 32,
  },

  // === SEARCH ===
  searchWrapper: {
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: "#f8faff",
  },
  searchSection: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: "#e5e7eb",
    shadowColor: "#1e3a8a",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  searchFocused: {
    borderColor: "#3b6fd4",
    shadowOpacity: 0.12,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 14,
    color: "#111827",
    fontWeight: "500",
  },

  // === CATEGORIES ===
  categoriesScroll: {
    marginBottom: 4,
  },
  categoriesContent: {
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
  categoryButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "#fff",
    borderWidth: 1.5,
    borderColor: "#e5e7eb",
    marginRight: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 1,
  },
  categoryButtonActive: {
    backgroundColor: "#1e3a8a",
    borderColor: "#1e3a8a",
  },
  categoryIcon: {
    fontSize: 14,
    marginRight: 5,
  },
  categoryText: {
    fontSize: 12,
    color: "#4b5563",
    fontWeight: "600",
  },
  categoryTextActive: {
    color: "#fff",
  },

  // === SECTIONS ===
  section: {
    marginTop: 20,
    paddingHorizontal: 16,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "baseline",
    justifyContent: "space-between",
    marginBottom: 14,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: "800",
    color: "#111827",
    letterSpacing: -0.3,
  },
  sectionSubtitle: {
    fontSize: 12,
    color: "#9ca3af",
    fontWeight: "500",
  },

  // === FEATURED ===
  featuredScroll: {
    paddingRight: 4,
  },
  featuredCard: {
    width: SCREEN_WIDTH * 0.68,
    height: 190,
    borderRadius: 18,
    overflow: "hidden",
    marginRight: 12,
    shadowColor: "#1e3a8a",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.18,
    shadowRadius: 12,
    elevation: 6,
  },
  featuredImage: {
    width: "100%",
    height: "100%",
  },
  featuredGradient: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: "65%",
    padding: 14,
    justifyContent: "flex-end",
  },
  featuredBadge: {
    backgroundColor: "#f97316",
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 3,
    alignSelf: "flex-start",
    marginBottom: 6,
  },
  featuredBadgeText: {
    color: "#fff",
    fontSize: 10,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  featuredName: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "800",
    marginBottom: 6,
    lineHeight: 20,
  },
  featuredFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  featuredPrice: {
    color: "#fbbf24",
    fontSize: 14,
    fontWeight: "800",
  },
  featuredPeople: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.2)",
    borderRadius: 10,
    paddingHorizontal: 7,
    paddingVertical: 3,
  },
  featuredPeopleText: {
    color: "#fff",
    fontSize: 11,
    fontWeight: "600",
  },

  // === TOY CARDS GRID ===
  toysGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  toyCard: {
    width: CARD_WIDTH,
    backgroundColor: "#fff",
    borderRadius: 16,
    overflow: "hidden",
    marginBottom: 14,
    shadowColor: "#1e3a8a",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 3,
  },
  toyImageContainer: {
    position: "relative",
  },
  toyImage: {
    width: "100%",
    height: 130,
    backgroundColor: "#f0f4ff",
  },
  toyIconBadge: {
    position: "absolute",
    top: 8,
    right: 8,
    backgroundColor: "rgba(255,255,255,0.95)",
    borderRadius: 12,
    width: 30,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  toyIconText: {
    fontSize: 15,
  },
  toyInfo: {
    padding: 11,
  },
  toyName: {
    fontSize: 13,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 4,
    lineHeight: 17,
  },
  toyDescription: {
    fontSize: 11,
    color: "#6b7280",
    lineHeight: 15,
    marginBottom: 7,
  },
  toyMeta: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  toyMetaText: {
    fontSize: 10,
    color: "#6b7280",
    fontWeight: "500",
  },
  toyFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  toyPriceLabel: {
    fontSize: 9,
    color: "#9ca3af",
    textTransform: "uppercase",
    letterSpacing: 0.3,
  },
  toyPrice: {
    fontSize: 15,
    fontWeight: "800",
    color: "#1e3a8a",
    lineHeight: 19,
  },
  toyPriceDay: {
    fontSize: 9,
    color: "#6b7280",
    fontWeight: "500",
  },
  addButton: {
    borderRadius: 12,
    overflow: "hidden",
  },
  addButtonGradient: {
    width: 34,
    height: 34,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
  },

  // === EMPTY STATE ===
  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 50,
    paddingHorizontal: 24,
  },
  emptyEmoji: {
    fontSize: 52,
    marginBottom: 12,
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#374151",
    marginBottom: 6,
  },
  emptySubtitle: {
    fontSize: 13,
    color: "#9ca3af",
    textAlign: "center",
    lineHeight: 19,
    marginBottom: 20,
  },
  clearFilterButton: {
    backgroundColor: "#1e3a8a",
    borderRadius: 12,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  clearFilterText: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "700",
  },

  // === MODAL ===
  modalOverlay: {
    flex: 1,
    justifyContent: "flex-end",
  },
  modalBackdrop: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.55)",
  },
  modalContent: {
    backgroundColor: "#f8faff",
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    maxHeight: "92%",
    overflow: "hidden",
  },
  modalImageContainer: {
    position: "relative",
    height: 220,
  },
  modalImage: {
    width: "100%",
    height: "100%",
  },
  modalImageGradient: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: "60%",
  },
  modalCloseButton: {
    position: "absolute",
    top: 14,
    right: 14,
    backgroundColor: "rgba(0,0,0,0.45)",
    borderRadius: 20,
    width: 36,
    height: 36,
    alignItems: "center",
    justifyContent: "center",
  },
  modalTitleContainer: {
    position: "absolute",
    bottom: 14,
    left: 16,
    right: 16,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: "#fff",
    marginBottom: 6,
    lineHeight: 24,
  },
  modalPriceBadge: {
    backgroundColor: "#f97316",
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 4,
    alignSelf: "flex-start",
  },
  modalPriceBadgeText: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "800",
  },
  modalBody: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  modalDescription: {
    fontSize: 14,
    color: "#374151",
    lineHeight: 21,
    marginBottom: 16,
  },
  detailsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 20,
  },
  detailChip: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderWidth: 1,
    borderColor: "#e0e7ff",
    marginRight: 8,
    marginBottom: 8,
  },
  detailChipText: {
    fontSize: 11,
    color: "#374151",
    fontWeight: "600",
  },
  calendarSection: {
    marginBottom: 8,
  },
  calendarStepHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  stepDot: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: "#e5e7eb",
    alignItems: "center",
    justifyContent: "center",
  },
  stepDotDone: {
    backgroundColor: "#22c55e",
  },
  stepDotText: {
    fontSize: 11,
    fontWeight: "800",
    color: "#fff",
  },
  calendarStepText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#374151",
    flex: 1,
  },
  resetDatesButton: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
    marginTop: 10,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  resetDatesText: {
    fontSize: 12,
    color: "#6b7280",
    fontWeight: "600",
  },
  summaryCard: {
    borderRadius: 16,
    padding: 16,
    marginTop: 14,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  summaryLabel: {
    fontSize: 11,
    color: "rgba(255,255,255,0.7)",
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginBottom: 3,
  },
  summaryValue: {
    fontSize: 13,
    color: "#fff",
    fontWeight: "700",
  },
  summaryDays: {
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.18)",
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  summaryDaysNumber: {
    fontSize: 22,
    fontWeight: "900",
    color: "#fbbf24",
  },
  summaryDaysLabel: {
    fontSize: 10,
    color: "rgba(255,255,255,0.8)",
    fontWeight: "600",
  },
  summaryDivider: {
    height: 1,
    backgroundColor: "rgba(255,255,255,0.2)",
    marginVertical: 12,
  },
  summaryTotalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  summaryTotalLabel: {
    fontSize: 13,
    color: "rgba(255,255,255,0.85)",
    fontWeight: "600",
  },
  summaryTotalValue: {
    fontSize: 22,
    fontWeight: "900",
    color: "#fbbf24",
  },
  modalFooter: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: "#f8faff",
    borderTopWidth: 1,
    borderTopColor: "#e5e7eb",
  },
  addToCartButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    borderRadius: 16,
  },
  addToCartButtonText: {
    fontSize: 16,
    fontWeight: "800",
    color: "#fff",
    letterSpacing: 0.3,
  },
});
