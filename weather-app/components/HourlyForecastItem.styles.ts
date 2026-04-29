import { StyleSheet } from "react-native";

const onSurface = "#0b1c30";
const onSurfaceMuted = "#4a6580";
const onSurfaceFaint = "#8aa0b5";
const primaryContainer = "#003366";
const accentSky = "#d6e6f7";
const onPrimary = "#ffffff";

export const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    // Subtle sky-blue tint for all hourly items
    backgroundColor: accentSky,
    borderRadius: 50,
    paddingVertical: 14,
    paddingHorizontal: 12,
    minWidth: 62,
    gap: 6,
    shadowColor: primaryContainer,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
  },
  // "Now" = solid navy
  nowContainer: {
    backgroundColor: primaryContainer,
  },
  hour: {
    fontSize: 11,
    color: onSurfaceMuted,
    fontWeight: "600",
    letterSpacing: 0.3,
    textTransform: "uppercase",
  },
  nowText: { color: "rgba(255,255,255,0.8)" },
  emoji: { fontSize: 20 },
  temp: {
    fontSize: 15,
    fontWeight: "700",
    color: primaryContainer,
  },
  nowTempText: { color: onPrimary },
  rain: {
    fontSize: 10,
    color: onSurfaceMuted,
    fontWeight: "500",
  },
  nowRainText: { color: "rgba(255,255,255,0.65)" },
});
