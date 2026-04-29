import { StyleSheet } from "react-native";

const onSurface = "#0b1c30";
const onSurfaceMuted = "#4a6580";
const onSurfaceFaint = "#8aa0b5";
const primaryContainer = "#003366";

export const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 18,
  },
  rowDivider: {
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0,51,102,0.07)",
  },
  // Today row: soft blue tint background
  todayRow: {
    backgroundColor: "rgba(0,51,102,0.06)",
  },

  day: {
    fontSize: 15,
    color: onSurfaceMuted,
    fontWeight: "500",
    width: 44,
  },
  todayDayText: {
    color: primaryContainer,
    fontWeight: "800",
  },

  conditionBlock: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
    paddingHorizontal: 4,
  },
  emoji: { fontSize: 18 },
  conditionLabel: {
    fontSize: 14,
    color: onSurfaceMuted,
    fontWeight: "400",
  },

  // Rain probability in blue
  rain: {
    fontSize: 11,
    color: primaryContainer,
    fontWeight: "700",
    marginRight: 8,
  },

  tempBlock: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  // Max temp in navy
  maxTemp: {
    fontSize: 15,
    fontWeight: "700",
    color: primaryContainer,
    minWidth: 34,
    textAlign: "right",
  },
  minTemp: {
    fontSize: 15,
    fontWeight: "400",
    color: onSurfaceFaint,
    minWidth: 30,
    textAlign: "right",
  },
});
