import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
} from "react-native";
import { Calendar } from "react-native-calendars";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useCart } from "../db/CartContext";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

import {styles} from "../styles/Formulario"

export default function FormularioAluguel() {
  const { saveRentalData } = useCart();
  
  const [inicio, setInicio] = useState<string | null>(null);
  const [fim, setFim] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);

  const [form, setForm] = useState({
    municipio: "",
    bairro: "",
    rua: "",
    numero: "",
    complemento: "",
    cep: "",
  });

  const handleDayPress = (day: any) => {
    if (!inicio || (inicio && fim)) {
      setInicio(day.dateString);
      setFim(null);
      setShowForm(false);
    } else {
      if (new Date(day.dateString) >= new Date(inicio)) {
        setFim(day.dateString);
        setShowForm(true);
      } else {
        Alert.alert("Atenção", "A data final deve ser após a data inicial");
      }
    }
  };

  const handleResetDates = () => {
    setInicio(null);
    setFim(null);
    setShowForm(false);
  };

  const handleSubmit = async () => {
    if (!inicio || !fim) {
      Alert.alert("Erro", "Selecione um período válido");
      return;
    }

    if (!form.municipio || !form.bairro || !form.rua || !form.numero || !form.cep) {
      Alert.alert("Atenção", "Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    const payload = {
      dataInicial: inicio,
      dataFinal: fim,
      municipio: form.municipio,
      bairro: form.bairro,
      rua: form.rua,
      numero: form.numero,
      complemento: form.complemento,
      cep: form.cep,
    };

    try {
      await saveRentalData(payload);
      Alert.alert("Sucesso 🎉", "Informações salvas! Bem-vindo ao nosso catálogo.");
    } catch (error) {
      console.error(error);
      Alert.alert("Erro", "Não foi possível salvar as informações.");
    }
  };

  const totalDays =
    inicio && fim
      ? (() => {
          const start = new Date(inicio + "T00:00:00");
          const end = new Date(fim + "T00:00:00");
          const diff = end.getTime() - start.getTime();
          return diff === 0 ? 1 : Math.ceil(diff / (1000 * 60 * 60 * 24));
        })()
      : 0;

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Top Banner */}
      <LinearGradient
        colors={["#1e3a8a", "#3b6fd4"]}
        style={styles.heroBanner}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <Text style={styles.heroTitle}>UP BRINQUEDOS</Text>
        <Text style={styles.heroSubtitle}>Vamos planejar a sua festa! 🎈</Text>
      </LinearGradient>

      <View style={styles.content}>
        {/* Step Indicator */}
        <View style={styles.stepHeader}>
          <View style={[styles.stepDot, (inicio && fim) && styles.stepDotDone]}>
            <Ionicons name={(inicio && fim) ? "checkmark" : "calendar-outline"} size={14} color="#fff" />
          </View>
          <Text style={styles.stepTitle}>Passo 1: Selecione o período</Text>
        </View>

        {/* Calendar Card */}
        <View style={styles.card}>
          <Calendar
            onDayPress={handleDayPress}
            minDate={new Date(Date.now() + 86400000).toISOString().split("T")[0]}
            maxDate={new Date(Date.now() + 90 * 86400000).toISOString().split("T")[0]}
            markingType="period"
            markedDates={{
              ...(inicio && {
                [inicio]: {
                  startingDay: true,
                  color: "#3b6fd4",
                  textColor: "#fff",
                },
              }),
              ...(fim && {
                [fim]: {
                  endingDay: true,
                  color: "#3b6fd4",
                  textColor: "#fff",
                },
              }),
              ...(inicio &&
                fim &&
                getDatesInRange(inicio, fim).reduce(
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

          {(inicio || fim) && (
            <TouchableOpacity style={styles.resetDatesButton} onPress={handleResetDates}>
              <Ionicons name="refresh" size={14} color="#ef4444" />
              <Text style={styles.resetDatesText}>Limpar datas selecionadas</Text>
            </TouchableOpacity>
          )}

          {inicio && fim && (
            <View style={styles.periodSummary}>
              <Ionicons name="time" size={20} color="#1e3a8a" />
              <View style={styles.periodSummaryTextContainer}>
                <Text style={styles.periodSummaryTitle}>Período Escolhido</Text>
                <Text style={styles.periodSummaryDates}>
                  {formatDate(inicio)} até {formatDate(fim)} ({totalDays} {totalDays === 1 ? "dia" : "dias"})
                </Text>
              </View>
            </View>
          )}
        </View>

        {/* Step 2: Address */}
        {showForm && (
          <View style={styles.formSection}>
            <View style={styles.stepHeader}>
              <View style={styles.stepDot}>
                <Ionicons name="location-outline" size={14} color="#fff" />
              </View>
              <Text style={styles.stepTitle}>Passo 2: Endereço de Entrega</Text>
            </View>

            <View style={styles.card}>
              <Text style={styles.formInstruction}>
                Preencha o local do evento para verificar brinquedos disponíveis na sua região.
              </Text>

              {/* CEP Input */}
              <View style={styles.inputContainer}>
                <Ionicons name="mail-open-outline" size={20} color="#9ca3af" style={styles.inputIcon} />
                <TextInput
                  placeholder="CEP (obrigatório)"
                  placeholderTextColor="#9ca3af"
                  keyboardType="numeric"
                  value={form.cep}
                  maxLength={9}
                  onChangeText={(text) => {
                    // Simple formatting: 00000-000
                    const formatted = text
                      .replace(/\D/g, "")
                      .replace(/^(\d{5})(\d)/, "$1-$2");
                    setForm({ ...form, cep: formatted });
                  }}
                  style={styles.input}
                />
              </View>

              {/* Municipio Input */}
              <View style={styles.inputContainer}>
                <Ionicons name="business-outline" size={20} color="#9ca3af" style={styles.inputIcon} />
                <TextInput
                  placeholder="Município / Cidade (obrigatório)"
                  placeholderTextColor="#9ca3af"
                  value={form.municipio}
                  onChangeText={(text) => setForm({ ...form, municipio: text })}
                  style={styles.input}
                />
              </View>

              {/* Bairro Input */}
              <View style={styles.inputContainer}>
                <Ionicons name="map-outline" size={20} color="#9ca3af" style={styles.inputIcon} />
                <TextInput
                  placeholder="Bairro (obrigatório)"
                  placeholderTextColor="#9ca3af"
                  value={form.bairro}
                  onChangeText={(text) => setForm({ ...form, bairro: text })}
                  style={styles.input}
                />
              </View>

              {/* Rua Input */}
              <View style={styles.inputContainer}>
                <Ionicons name="navigate-outline" size={20} color="#9ca3af" style={styles.inputIcon} />
                <TextInput
                  placeholder="Rua / Avenida (obrigatório)"
                  placeholderTextColor="#9ca3af"
                  value={form.rua}
                  onChangeText={(text) => setForm({ ...form, rua: text })}
                  style={styles.input}
                />
              </View>

              {/* Row for Numero and Complemento */}
              <View style={styles.rowInputs}>
                <View style={[styles.inputContainer, { flex: 1, marginRight: 8 }]}>
                  <Ionicons name="home-outline" size={20} color="#9ca3af" style={styles.inputIcon} />
                  <TextInput
                    placeholder="Número"
                    placeholderTextColor="#9ca3af"
                    keyboardType="numeric"
                    value={form.numero}
                    onChangeText={(text) => setForm({ ...form, numero: text })}
                    style={styles.input}
                  />
                </View>

                <View style={[styles.inputContainer, { flex: 1.5 }]}>
                  <Ionicons name="document-text-outline" size={20} color="#9ca3af" style={styles.inputIcon} />
                  <TextInput
                    placeholder="Complemento (Apto, etc)"
                    placeholderTextColor="#9ca3af"
                    value={form.complemento}
                    onChangeText={(text) => setForm({ ...form, complemento: text })}
                    style={styles.input}
                  />
                </View>
              </View>

              {/* Submit CTA Button */}
              <TouchableOpacity onPress={handleSubmit} activeOpacity={0.8} style={styles.submitButtonWrapper}>
                <LinearGradient
                  colors={["#f97316", "#ef4444"]}
                  style={styles.submitButton}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                >
                  <Text style={styles.submitButtonText}>Visualizar Catálogo 🚀</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
      <View style={{ height: 40 }} />
    </ScrollView>
  );
}
