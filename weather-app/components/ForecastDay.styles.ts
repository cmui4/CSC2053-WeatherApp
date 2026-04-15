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
  todayContainer: {
    backgroundColor: "rgba(255,255,255,0.28)",
  },
  day: {
    fontSize: 12,
    color: "rgba(255,255,255,0.75)",
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  todayText: {
    color: "#fff",
  },
  emoji: {
    fontSize: 22,
  },
  rain: {
    fontSize: 10,
    color: "rgba(255,255,255,0.7)",
  },
  temp: {
    fontSize: 16,
    fontWeight: "700",
    color: "rgba(255,255,255,0.9)",
  },
  minTemp: {
    fontSize: 13,
    color: "rgba(255,255,255,0.5)",
  },
});
