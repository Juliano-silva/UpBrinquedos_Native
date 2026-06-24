import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FCF9F2",
  },
  contentContainer: {
    flexGrow: 1,
    minHeight: "100%",
  },
  contentWrapper: {
    flex: 1,
    flexDirection: "column",
    minHeight: "100%",
  },
  contentWrapperWeb: {
    flexDirection: "row",
    alignItems: "stretch",
  },
  imageContainer: {
    flex: 2.5,
    width: "100%",
    backgroundColor: "#f0f0f0",
    overflow: "hidden",
    minHeight: 600,
    resizeMode: "cover",
  },
  imageContainerWeb: {
    width: "50%",
    flex: 1,
    backgroundColor: "#f0f0f0",
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  textContainer: {
    flex: 0.5,
    padding: 20,
    backgroundColor: "#EF5350",
  },
  textContainerWeb: {
    width: "50%",
    flex: 1,
    padding: 40,
    justifyContent: "flex-start",
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
    color: "#ffffff",
    marginBottom: 16,
  },
  text: {
    fontSize: 14,
    lineHeight: 22,
    color: "#ffffff",
    textAlign: "justify",
    marginBottom: 20,
  },
  infoBox: {
    backgroundColor: "#ffffff",
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
  },
  infoLabel: {
    fontSize: 16,
    fontWeight: "700",
    color: "#EF5350",
    marginBottom: 6,
  },
  infoText: {
    fontSize: 14,
    color: "#333333",
    lineHeight: 20,
  },
});
