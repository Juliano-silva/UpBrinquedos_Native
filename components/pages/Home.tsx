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

