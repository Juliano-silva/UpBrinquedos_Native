import React from 'react';

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView
} from 'react-native';


export default function DashboardScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>

        {/* Painel */}

        <View style={styles.headerCard}>
          <Text style={styles.title}>
            Painel de Controle
          </Text>

          <Text style={styles.subtitle}>
            Gerencie sua frota de brinquedos e operações de aluguel.
          </Text>

          <TouchableOpacity style={styles.adminButton}>
            <Text style={styles.adminText}>
              Administrador
            </Text>
          </TouchableOpacity>
        </View>

        {/* Card Principal */}

        <View style={styles.card}>

          <View style={styles.iconBox}>
            <Text style={styles.icon}>🚀</Text>
          </View>

          <Text style={styles.cardTitle}>
            Gerenciar Brinquedos
          </Text>

          <Text style={styles.cardDescription}>
            Adicione novos brinquedos, edite fotos, valores e controle o estoque em tempo real.
          </Text>

          <TouchableOpacity
            style={styles.accessButton}
            onPress={() =>
              navigation.navigate('GerenciarBrinquedos')
            }
          >
            <Text style={styles.accessText}>
              Acessar Gerenciamento →
            </Text>
          </TouchableOpacity>

        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#F7F7F7'
  },

  headerCard: {
    backgroundColor: '#FFF',
    margin: 16,
    borderRadius: 20,
    padding: 24,
    elevation: 4
  },

  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center'
  },

  subtitle: {
    marginTop: 10,
    textAlign: 'center',
    color: '#666'
  },

  adminButton: {
    marginTop: 20,
    alignSelf: 'center',
    backgroundColor: '#EFEFEF',
    paddingHorizontal: 25,
    paddingVertical: 12,
    borderRadius: 30
  },

  adminText: {
    fontWeight: '600'
  },

  card: {
    backgroundColor: '#FFF',
    margin: 16,
    borderRadius: 20,
    padding: 24,
    elevation: 4
  },

  iconBox: {
    width: 70,
    height: 70,
    backgroundColor: '#2563EB',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center'
  },

  icon: {
    fontSize: 35
  },

  cardTitle: {
    marginTop: 20,
    fontSize: 24,
    fontWeight: 'bold'
  },

  cardDescription: {
    marginTop: 10,
    color: '#666',
    lineHeight: 22
  },

  accessButton: {
    marginTop: 25,
    borderTopWidth: 1,
    borderTopColor: '#EEE',
    paddingTop: 20
  },

  accessText: {
    color: '#2563EB',
    fontSize: 16,
    fontWeight: 'bold'
  }
});
