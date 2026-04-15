import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.12)",
    borderRadius: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    minWidth: 64,
    gap: 4,
  },
  nowContainer: {
    backgroundColor: "rgba(255,255,255,0.28)",
  },
  hour: {
    fontSize: 12,
    color: "rgba(255,255,255,0.75)",
    fontWeight: "600",
  },
  nowText: {
    color: "#fff",
  },
  temp: {
    fontSize: 16,
    fontWeight: "700",
    color: "rgba(255,255,255,0.9)",
  },
  rain: {
    fontSize: 10,
    color: "rgba(255,255,255,0.7)",
  },
});
