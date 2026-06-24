import React from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { INFLATABLE_TOYS } from "../../assets/toys";

import { styles } from "../styles/About"

const { width } = Dimensions.get("window");
const isWeb = width > 768;

export default function About() {
  const randomToy = React.useMemo(() => {
    const randomIndex = Math.floor(Math.random() * INFLATABLE_TOYS.length);
    return INFLATABLE_TOYS[randomIndex];
  }, []);

  const aboutText = `Somos uma empresa dedicada a oferecer uma ampla variedade de brinquedos para crianças de todas as idades. Nosso objetivo é proporcionar diversão e segurança em cada aluguel, atendendo a festas de aniversário, eventos e ocasiões especiais com excelência e compromisso.
  Na UP Brinquedos, acreditamos que a alegria e diversão são as essenciais para o desenvolvimento infantil. Por isso, selecionamos cuidadosamente nossos brinquedos infláveis, todos conforme as normas de segurança, para garantir momentos de alegria com segurança e tranquilidade.

  Nossa missão é transformar cada festa em um evento inesquecível, oferecendo brinquedos de alta qualidade, atendimento personalizado e serviços que superam as expectativas dos nossos clientes. Estamos comprometidos em proporcionar uma experiência positiva para nosso cliente, garantindo a satisfação de todos com excelência e profissionalismo em cada entrega.

  Além disso, nossa equipe está sempre pronta para auxiliar na escolha do brinquedo mais adequado ao espaço e ao perfil dos participantes, garantindo que o aluguel seja um sucesso e todos se divirtam ao máximo.

  Na UP Brinquedos, estamos empenhados em oferecer os melhores brinquedos com segurança e eficiência para nossos clientes, garantindo a satisfação em cada entrega e em cada festa.`;

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      <View style={[styles.contentWrapper, isWeb && styles.contentWrapperWeb]}>
        {/* Imagem do Brinquedo */}
        <View
          style={[styles.imageContainer, isWeb && styles.imageContainerWeb]}
        >
          <Image
            source={randomToy.image}
            style={styles.image}
            resizeMode="cover"
          />
        </View>

        {/* Texto */}
        <LinearGradient
          colors={["#ef4444", "#b91c1c"]}
          style={[styles.textContainer, isWeb && styles.textContainerWeb]}
        >
          <Text style={styles.title}>Quem Somos?</Text>
          <Text style={styles.text}>{aboutText}</Text>

          {/* Contato e Horário */}
          <View style={styles.infoBox}>
            <View style={styles.infoTitleRow}>
              <Ionicons name="call-outline" size={18} color="#EF5350" />
              <Text style={styles.infoLabel}>Contato</Text>
            </View>
            <Text style={styles.infoText}>(11) 1234-5678</Text>
          </View>

          <View style={styles.infoBox}>
            <View style={styles.infoTitleRow}>
              <Ionicons name="time-outline" size={18} color="#EF5350" />
              <Text style={styles.infoLabel}>Horário de Funcionamento</Text>
            </View>
            <Text style={styles.infoText}>Segunda a Sexta, das 9h às 18h</Text>
          </View>
        </LinearGradient>
      </View>
    </ScrollView>
  );
}
