import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  Alert,
  ScrollView,
  StyleSheet,
} from "react-native";
import { Calendar } from "react-native-calendars";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function FormularioAluguel() {
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
      setFim(day.dateString);
      setShowForm(true);
    }
  };

  const handleSubmit = async () => {
    if (!inicio || !fim) {
      Alert.alert("Erro", "Selecione um período válido");
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
      await AsyncStorage.setItem(
        "@dados_aluguel",
        JSON.stringify(payload)
      );

      console.log("Dados salvos:", payload);

      Alert.alert(
        "Sucesso 🎉",
        "Informações salvas com sucesso!"
      );

      location.reload()
    } catch (error) {
      console.error(error);
      Alert.alert(
        "Erro",
        "Não foi possível salvar as informações."
      );
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>
        📅 Selecione o período que deseja alugar
      </Text>

      <Calendar
        onDayPress={handleDayPress}
        minDate={
          new Date(Date.now() + 86400000)
            .toISOString()
            .split("T")[0]
        }
        maxDate={
          new Date(Date.now() + 78 * 86400000)
            .toISOString()
            .split("T")[0]
        }
        markingType="period"
        markedDates={{
          ...(inicio && {
            [inicio]: {
              startingDay: true,
              color: "#2563eb",
              textColor: "white",
            },
          }),
          ...(fim && {
            [fim]: {
              endingDay: true,
              color: "#2563eb",
              textColor: "white",
            },
          }),
        }}
      />

      {inicio && fim && (
        <View style={styles.periodBox}>
          <Text style={styles.periodText}>
            📆 Período selecionado
          </Text>
          <Text style={styles.periodValue}>
            {inicio} até {fim}
          </Text>
        </View>
      )}

      <Text style={styles.subtitle}>
        Preencha os dados para visualizar os brinquedos disponíveis
      </Text>

      {showForm && (
        <View style={styles.formContainer}>
          <Text style={styles.formTitle}>
            🚚 Endereço de Entrega
          </Text>

          <TextInput
            placeholder="Município"
            placeholderTextColor="#888"
            value={form.municipio}
            onChangeText={(text) =>
              setForm({ ...form, municipio: text })
            }
            style={styles.input}
          />

          <TextInput
            placeholder="Bairro"
            placeholderTextColor="#888"
            value={form.bairro}
            onChangeText={(text) =>
              setForm({ ...form, bairro: text })
            }
            style={styles.input}
          />

          <TextInput
            placeholder="Rua"
            placeholderTextColor="#888"
            value={form.rua}
            onChangeText={(text) =>
              setForm({ ...form, rua: text })
            }
            style={styles.input}
          />

          <TextInput
            placeholder="Número"
            placeholderTextColor="#888"
            keyboardType="numeric"
            value={form.numero}
            onChangeText={(text) =>
              setForm({ ...form, numero: text })
            }
            style={styles.input}
          />

          <TextInput
            placeholder="Complemento"
            placeholderTextColor="#888"
            value={form.complemento}
            onChangeText={(text) =>
              setForm({ ...form, complemento: text })
            }
            style={styles.input}
          />

          <TextInput
            placeholder="CEP"
            placeholderTextColor="#888"
            keyboardType="numeric"
            value={form.cep}
            onChangeText={(text) =>
              setForm({ ...form, cep: text })
            }
            style={styles.input}
          />

          <View style={styles.buttonContainer}>
            <Button
              title="Prosseguir 🚀"
              onPress={handleSubmit}
            />
          </View>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f7fb",
    padding: 20,
  },

  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 20,
    textAlign: "center",
  },

  subtitle: {
    marginTop: 25,
    marginBottom: 10,
    fontSize: 15,
    color: "#4b5563",
    textAlign: "center",
  },

  periodBox: {
    marginTop: 20,
    backgroundColor: "#dbeafe",
    borderRadius: 12,
    padding: 15,
    borderLeftWidth: 5,
    borderLeftColor: "#2563eb",
  },

  periodText: {
    fontSize: 14,
    color: "#1e40af",
    fontWeight: "600",
  },

  periodValue: {
    marginTop: 5,
    fontSize: 16,
    color: "#111827",
    fontWeight: "700",
  },

  formContainer: {
    marginTop: 25,
    backgroundColor: "#ffffff",
    borderRadius: 15,
    padding: 20,
    elevation: 4,
  },

  formTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 15,
    color: "#111827",
  },

  input: {
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 12,
    marginBottom: 12,
    backgroundColor: "#fff",
    fontSize: 15,
  },

  buttonContainer: {
    marginTop: 10,
    borderRadius: 10,
    overflow: "hidden",
  },
});