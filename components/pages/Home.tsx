import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
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
import ToyDetails from "./toyDetails";

import {styles} from "../styles/Home"


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

    const start = new Date(startDate + "T00:00:00");
    const end = new Date(endDate + "T00:00:00");
    const diff = end.getTime() - start.getTime();
    const days = diff === 0 ? 1 : Math.ceil(diff / (1000 * 60 * 60 * 24));

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
      ? (() => {
          const start = new Date(startDate + "T00:00:00");
          const end = new Date(endDate + "T00:00:00");
          const diff = end.getTime() - start.getTime();
          return diff === 0 ? 1 : Math.ceil(diff / (1000 * 60 * 60 * 24));
        })()
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
        {selectedToy && (
          <ToyDetails
            toy={selectedToy}
            onAddToCart={handleAddToCart}
            onBack={() => setSelectedToy(null)}
          />
        )}
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

