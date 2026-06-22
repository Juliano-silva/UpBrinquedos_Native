import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
  StyleSheet,
  Dimensions,
} from "react-native";
import { Calendar } from "react-native-calendars";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useCart } from "../db/CartContext";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

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
  heroBanner: {
    paddingTop: 50,
    paddingBottom: 35,
    paddingHorizontal: 24,
    alignItems: "center",
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  heroTitle: {
    fontSize: 26,
    fontWeight: "900",
    color: "#fff",
    letterSpacing: 1,
  },
  heroSubtitle: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.85)",
    marginTop: 6,
    fontWeight: "600",
  },
  content: {
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  stepHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    marginTop: 10,
  },
  stepDot: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: "#3b6fd4",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  stepDotDone: {
    backgroundColor: "#22c55e",
  },
  stepTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1e3a8a",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 16,
    shadowColor: "#1e3a8a",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 3,
    marginBottom: 16,
  },
  resetDatesButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    marginTop: 14,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  resetDatesText: {
    fontSize: 12,
    color: "#ef4444",
    fontWeight: "600",
    marginLeft: 4,
  },
  periodSummary: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f0f4ff",
    borderRadius: 12,
    padding: 12,
    marginTop: 14,
    borderLeftWidth: 4,
    borderLeftColor: "#3b6fd4",
  },
  periodSummaryTextContainer: {
    marginLeft: 10,
  },
  periodSummaryTitle: {
    fontSize: 12,
    fontWeight: "700",
    color: "#1e3a8a",
  },
  periodSummaryDates: {
    fontSize: 13,
    color: "#374151",
    fontWeight: "600",
    marginTop: 2,
  },
  formSection: {
    marginTop: 10,
  },
  formInstruction: {
    fontSize: 13,
    color: "#6b7280",
    marginBottom: 16,
    lineHeight: 18,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1.5,
    borderColor: "#e5e7eb",
    borderRadius: 12,
    marginBottom: 12,
    backgroundColor: "#f9fafb",
    paddingHorizontal: 12,
  },
  inputIcon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 14,
    color: "#1f2937",
    fontWeight: "500",
  },
  rowInputs: {
    flexDirection: "row",
  },
  submitButtonWrapper: {
    marginTop: 8,
    borderRadius: 14,
    overflow: "hidden",
  },
  submitButton: {
    paddingVertical: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: "800",
    color: "#fff",
  },
});