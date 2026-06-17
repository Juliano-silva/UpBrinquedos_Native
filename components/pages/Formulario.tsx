import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert, ScrollView } from "react-native";
import { Calendar } from "react-native-calendars";

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

      const range = `${inicio} até ${day.dateString}`;
      console.log("Intervalo selecionado:", range);

      // equivalente ao localStorage
      // RN usa AsyncStorage (opcional)
    }
  };

  const handleSubmit = () => {
    if (!inicio || !fim) {
      Alert.alert("Erro", "Selecione um período válido");
      return;
    }

    const payload = {
      inicio,
      fim,
      ...form,
    };

    console.log("Enviando:", payload);

    // aqui você faria fetch POST
  };

  return (
    <ScrollView style={{ padding: 20 }}>
      <Text style={{ marginTop: 20, fontWeight: "bold" }}>
        Selecione o período que deseja alugar:
      </Text>

      <Calendar
        onDayPress={handleDayPress}
        minDate={new Date(Date.now() + 86400000).toISOString().split("T")[0]}
        maxDate={
          new Date(Date.now() + 78 * 86400000).toISOString().split("T")[0]
        }
        markingType={"period"}
        markedDates={{
          ...(inicio && {
            [inicio]: {
              startingDay: true,
              color: "#50cebb",
              textColor: "white",
            },
          }),
          ...(fim && {
            [fim]: { endingDay: true, color: "#50cebb", textColor: "white" },
          }),
        }}
      />

      <Text>Preencha os dados para ver os brinquedos disponíveis:</Text>

      {showForm && (
        <View style={{ marginTop: 20 }}>
          <Text style={{ fontSize: 18 }}>Endereço de Entrega</Text>

          <TextInput
            placeholder="Município"
            value={form.municipio}
            onChangeText={(t) => setForm({ ...form, municipio: t })}
            style={{ borderWidth: 1, marginBottom: 10 }}
          />

          <TextInput
            placeholder="Bairro"
            value={form.bairro}
            onChangeText={(t) => setForm({ ...form, bairro: t })}
            style={{ borderWidth: 1, marginBottom: 10 }}
          />

          <TextInput
            placeholder="Rua"
            value={form.rua}
            onChangeText={(t) => setForm({ ...form, rua: t })}
            style={{ borderWidth: 1, marginBottom: 10 }}
          />

          <TextInput
            placeholder="Número"
            value={form.numero}
            onChangeText={(t) => setForm({ ...form, numero: t })}
            keyboardType="numeric"
            style={{ borderWidth: 1, marginBottom: 10 }}
          />

          <TextInput
            placeholder="Complemento"
            value={form.complemento}
            onChangeText={(t) => setForm({ ...form, complemento: t })}
            style={{ borderWidth: 1, marginBottom: 10 }}
          />

          <TextInput
            placeholder="CEP"
            value={form.cep}
            onChangeText={(t) => setForm({ ...form, cep: t })}
            style={{ borderWidth: 1, marginBottom: 10 }}
          />

          <Button title="Prosseguir 🚀" onPress={handleSubmit} />
        </View>
      )}
    </ScrollView>
  );
}
