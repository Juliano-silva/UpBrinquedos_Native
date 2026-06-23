import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
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