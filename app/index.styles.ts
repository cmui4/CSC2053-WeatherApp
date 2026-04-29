import { StyleSheet } from "react-native";

// Design tokens — "The Academic Curator"
export const tokens = {
  primary: "#001e40",
  primaryContainer: "#003366",
  primaryLight: "#1a6bbf",
  primaryFaint: "rgba(0,51,102,0.08)",
  primarySubtle: "rgba(0,51,102,0.14)",
  surface: "#eef2f7",
  surfaceContainerLow: "#e2eaf4",
  surfaceContainerLowest: "#ffffff",
  onSurface: "#0b1c30",
  onSurfaceMuted: "#4a6580",
  onSurfaceFaint: "#8aa0b5",
  onPrimary: "#ffffff",
  accentSky: "#d6e6f7",

  displayLg: 80,
  titleLg: 22,
  titleSm: 15,
  labelMd: 13,
  labelSm: 11,

  screenPadding: 20,
  sectionGap: 32,
  cardPadding: 16,
  cardRadius: 20,
};

export const styles = StyleSheet.create({
  flex: { flex: 1 },
  background: {
    flex: 1,
    backgroundColor: tokens.surface,
  },
  scroll: {
    paddingTop: 56,
    paddingHorizontal: tokens.screenPadding,
    paddingBottom: 48,
  },

  // Loading / Error
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 12,
    backgroundColor: tokens.surface,
  },
  loadingText: {
    color: tokens.onSurfaceMuted,
    fontSize: tokens.labelMd,
    marginTop: 8,
  },
  errorEmoji: { fontSize: 48 },
  errorTitle: { color: tokens.onSurface, fontSize: tokens.titleLg, fontWeight: "700" },
  errorMessage: {
    color: tokens.onSurfaceMuted,
    fontSize: tokens.labelMd,
    textAlign: "center",
    paddingHorizontal: 32,
  },

  // Search
  searchRow: { flexDirection: "row", gap: 8, marginBottom: 20 },
  searchInput: {
    flex: 1,
    backgroundColor: tokens.surfaceContainerLowest,
    borderRadius: 14,
    paddingVertical: 11,
    paddingHorizontal: 14,
    color: tokens.onSurface,
    fontSize: tokens.titleSm,
    borderWidth: 1,
    borderColor: "rgba(0,51,102,0.12)",
  },
  searchButton: {
    backgroundColor: tokens.primaryContainer,
    borderRadius: 14,
    paddingVertical: 11,
    paddingHorizontal: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  searchButtonText: {
    color: tokens.onPrimary,
    fontSize: tokens.titleSm,
    fontWeight: "700",
    letterSpacing: 0.2,
  },
  searchError: { color: "#c0392b", fontSize: tokens.labelMd, marginBottom: 10 },

  // Location header
  locationHeaderRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    marginBottom: 8,
    gap: 12,
  },
  // Navy filled chip
  locationChip: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: tokens.primaryContainer,
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 50,
    gap: 6,
    shadowColor: tokens.primaryContainer,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.28,
    shadowRadius: 10,
    elevation: 4,
  },
  locationPin: { fontSize: 12 },
  city: {
    color: tokens.onPrimary,
    fontSize: tokens.labelMd,
    fontWeight: "700",
    letterSpacing: 0.8,
    textTransform: "uppercase",
  },
  // Sky-blue share pill
  shareButton: {
    paddingVertical: 7,
    paddingHorizontal: 14,
    backgroundColor: tokens.accentSky,
    borderRadius: 50,
  },
  shareButtonText: {
    color: tokens.primaryContainer,
    fontSize: tokens.labelMd,
    fontWeight: "700",
  },

  // Hero
  heroBlock: { marginTop: 24, marginBottom: 28, paddingLeft: 4 },
  temperature: {
    color: tokens.onSurface,
    fontSize: tokens.displayLg,
    fontWeight: "200",
    lineHeight: 86,
    letterSpacing: -3,
  },
  temperatureUnit: {
    color: tokens.primaryContainer,
    fontSize: 36,
    fontWeight: "300",
  },
  // Condition label in navy blue
  condition: {
    color: tokens.primaryContainer,
    fontSize: 28,
    fontWeight: "600",
    marginTop: 2,
    letterSpacing: -0.5,
  },
  weatherDescription: {
    color: tokens.onSurfaceMuted,
    fontSize: tokens.labelMd,
    marginTop: 8,
    lineHeight: 19,
    maxWidth: 260,
  },

  // Stat grid
  statGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginBottom: tokens.sectionGap,
  },
  statCard: {
    width: "47.5%",
    backgroundColor: tokens.surfaceContainerLowest,
    borderRadius: tokens.cardRadius,
    padding: tokens.cardPadding,
    gap: 6,
    shadowColor: tokens.primaryContainer,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 3,
  },
  // Navy blue filled stat card variant
  statCardAccent: {
    backgroundColor: tokens.primaryContainer,
  },
  statLabel: {
    color: tokens.onSurfaceFaint,
    fontSize: tokens.labelSm,
    fontWeight: "700",
    letterSpacing: 1.2,
    textTransform: "uppercase",
  },
  statLabelOnBlue: { color: "rgba(255,255,255,0.55)" },
  statValue: {
    color: tokens.onSurface,
    fontSize: 26,
    fontWeight: "700",
    letterSpacing: -0.5,
  },
  statValueOnBlue: { color: tokens.onPrimary },
  statUnit: { color: tokens.onSurfaceMuted, fontSize: tokens.labelMd, fontWeight: "400" },
  statUnitOnBlue: { color: "rgba(255,255,255,0.65)" },
  statSubtitle: { color: tokens.onSurfaceMuted, fontSize: tokens.labelSm, marginTop: 2 },
  statSubtitleOnBlue: { color: "rgba(255,255,255,0.55)" },
  statBarTrack: {
    height: 3,
    backgroundColor: tokens.surfaceContainerLow,
    borderRadius: 2,
    marginTop: 6,
    overflow: "hidden",
  },
  statBarTrackOnBlue: { backgroundColor: "rgba(255,255,255,0.18)" },
  statBarFill: {
    height: 3,
    backgroundColor: tokens.primaryContainer,
    borderRadius: 2,
  },
  statBarFillOnBlue: { backgroundColor: "rgba(255,255,255,0.75)" },

  // Section header
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline",
    marginBottom: 14,
  },
  sectionTitle: {
    color: tokens.onSurface,
    fontSize: tokens.titleSm,
    fontWeight: "800",
    letterSpacing: 1.5,
    textTransform: "uppercase",
  },
  sectionMeta: {
    color: tokens.primaryLight,
    fontSize: tokens.labelSm,
    fontWeight: "600",
  },
  section: { marginBottom: tokens.sectionGap },
  forecastRow: { gap: 8, paddingRight: 4 },

  // 7-day list card
  forecastListCard: {
    backgroundColor: tokens.surfaceContainerLowest,
    borderRadius: tokens.cardRadius,
    overflow: "hidden",
    shadowColor: tokens.primaryContainer,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 3,
  },

  credit: {
    color: tokens.onSurfaceFaint,
    fontSize: tokens.labelSm,
    textAlign: "center",
    marginTop: 8,
  },
  locationRow: { flex: 1, flexDirection: "row", alignItems: "center", gap: 6 },
});
