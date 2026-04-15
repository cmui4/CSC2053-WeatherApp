import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: "rgba(255,255,255,0.15)",
    borderRadius: 16,
    borderLeftWidth: 4,
    padding: 14,
    marginBottom: 10,
    gap: 12,
  },
  emoji: {
    fontSize: 26,
    lineHeight: 32,
  },
  textBlock: {
    flex: 1,
  },
  title: {
    fontSize: 15,
    fontWeight: "700",
    color: "#fff",
    marginBottom: 2,
  },
  message: {
    fontSize: 13,
    color: "rgba(255,255,255,0.85)",
    lineHeight: 18,
  },
});
