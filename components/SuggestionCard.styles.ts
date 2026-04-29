import { StyleSheet } from "react-native";

const onSurface = "#0b1c30";
const onSurfaceMuted = "#4a6580";
const primaryContainer = "#003366";

export const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: "#ffffff",
    borderRadius: 18,
    padding: 16,
    marginBottom: 10,
    gap: 14,
    shadowColor: primaryContainer,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.07,
    shadowRadius: 16,
    elevation: 3,
  },
  // Navy-tinted rounded emoji bg
  emojiWrapper: {
    width: 44,
    height: 44,
    borderRadius: 13,
    backgroundColor: "rgba(0,51,102,0.09)",
    justifyContent: "center",
    alignItems: "center",
    flexShrink: 0,
  },
  emoji: { fontSize: 22 },
  textBlock: { flex: 1 },
  // Title in navy blue
  title: {
    fontSize: 14,
    fontWeight: "700",
    color: primaryContainer,
    marginBottom: 3,
    letterSpacing: 0.1,
  },
  message: {
    fontSize: 13,
    color: onSurfaceMuted,
    lineHeight: 18,
  },
});
