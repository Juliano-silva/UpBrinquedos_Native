import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function Header() {
  return (
    <View style={styles.header}>
      <View style={styles.headerContent}>
        <Text style={styles.logoText}>UP BRINQUEDOS</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#fcd34d",
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#f59e0b",
    width: "100%",
    zIndex: 1000,
  },
  headerContent: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    maxWidth: 1200,
    width: "100%",
    alignSelf: "center",
  },
  logoText: {
    fontSize: 20,
    fontWeight: "900",
    color: "#1e3a8a",
    letterSpacing: 0.5,
    textTransform: "uppercase",
    marginTop: 1,
  },
});
