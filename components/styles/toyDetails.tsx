import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f0df",
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
    backgroundColor: "#f5d328",
    borderBottomWidth: 2,
    borderColor: "#2b160d",
  },

  backBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },

  backText: {
    fontWeight: "700",
    color: "#2b160d",
  },

  carousel: {
    height: 300,
    backgroundColor: "#ff4d55",
  },

  image: {
    width: 350,
    height: 300,
    resizeMode: "contain",
  },

  title: {
    fontSize: 28,
    fontWeight: "900",
    color: "#2b160d",
    margin: 16,
  },

  description: {
    fontSize: 14,
    color: "#6b5b52",
    marginHorizontal: 16,
    marginBottom: 20,
    lineHeight: 20,
  },

  box: {
    backgroundColor: "#fff",
    marginHorizontal: 16,
    padding: 14,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: "#2b160d",
    marginBottom: 10,
  },

  label: {
    fontSize: 11,
    fontWeight: "800",
    color: "#8b7d74",
    textTransform: "uppercase",
  },

  value: {
    fontSize: 16,
    fontWeight: "800",
    color: "#2b160d",
    marginTop: 4,
  },

  priceBox: {
    margin: 16,
    padding: 18,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "#2b160d",
    backgroundColor: "#fff",
  },

  priceLabel: {
    fontSize: 12,
    fontWeight: "800",
    color: "#8d8178",
  },

  price: {
    fontSize: 32,
    fontWeight: "900",
    color: "#2b160d",
    marginTop: 4,
  },

  button: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ff5861",
    margin: 16,
    padding: 16,
    borderRadius: 999,
    gap: 8,
  },

  buttonText: {
    color: "#fff",
    fontWeight: "800",
    fontSize: 16,
  },
});