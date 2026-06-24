import React from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import {styles} from "../styles/toy-details.style"

type Toy = {
  id: string;
  name: string;
  description: string;
  pricePerDay: number;
  maxPeople: number;
  ageMin?: number;
};

type Props = {
  toy: Toy;
  onAddToCart: () => void;
  onBack: () => void;
};

  export default function ToyDetails({ toy, onAddToCart, onBack }: Props) {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={onBack} style={styles.backBtn}>
            <Ionicons name="chevron-back" size={22} color="#2b160d" />
          <Text style={styles.backText}>Voltar</Text>
        </TouchableOpacity>

        <TouchableOpacity>
          <Ionicons name="heart-outline" size={24} color="#2b160d" />
        </TouchableOpacity>
      </View>
      
      <Text style={styles.title}>{toy.name}</Text>

      <Text style={styles.description}>{toy.description}</Text>

      <View style={styles.box}>
        <Text style={styles.label}>Idade mínima</Text>
        <Text style={styles.value}>{toy.ageMin ?? 3} anos</Text>
      </View>

      <View style={styles.box}>
        <Text style={styles.label}>Capacidade</Text>
        <Text style={styles.value}>{toy.maxPeople} pessoas</Text>
      </View>

      <View style={styles.priceBox}>
        <Text style={styles.priceLabel}>DIÁRIA</Text>
        <Text style={styles.price}>
          R$ {toy.pricePerDay.toFixed(2)}
        </Text>
      </View>

      <TouchableOpacity style={styles.button} onPress={onAddToCart}>
        <Ionicons name="cart" size={20} color="#fff" />
        <Text style={styles.buttonText}>Adicionar ao Carrinho</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
