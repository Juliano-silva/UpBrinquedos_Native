import { StyleSheet, Dimensions, Platform } from "react-native";

const { width, height } = Dimensions.get("window");

// Funções de escala
const scale = (size: number) => (width / 375) * size;
const verticalScale = (size: number) => (height / 812) * size;
const moderateScale = (size: number, factor = 0.5) =>
  size + (scale(size) - size) * factor;

// Verifica se é tablet ou tela grande
const isTablet = width >= 768;
const isLargeScreen = width >= 1024;

// Número de colunas para a grade de brinquedos
const getColumns = () => {
  if (width < 600) return 1;
  if (width < 900) return 2;
  return 3;
};

// Largura dos cards de destaque (proporcional)
const featuredCardWidth = Math.min(width * 0.7, isTablet ? 350 : 300);

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8faff",
  },

  // === HERO BANNER ===
  heroBanner: {
    paddingTop: verticalScale(24),
    paddingBottom: verticalScale(32),
    paddingHorizontal: moderateScale(20),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  heroContent: {
    flex: 1,
  },
  heroBadge: {
    backgroundColor: "rgba(255,255,255,0.2)",
    borderRadius: moderateScale(20),
    paddingHorizontal: moderateScale(12),
    paddingVertical: verticalScale(4),
    alignSelf: "flex-start",
    marginBottom: verticalScale(12),
  },
  heroBadgeText: {
    color: "#fff",
    fontSize: moderateScale(11),
    fontWeight: "600",
    letterSpacing: 0.5,
  },
  heroTitle: {
    fontSize: moderateScale(isLargeScreen ? 38 : isTablet ? 32 : 26, 0.3),
    fontWeight: "900",
    color: "#fff",
    lineHeight: moderateScale(isLargeScreen ? 44 : isTablet ? 38 : 32, 0.3),
    marginBottom: verticalScale(8),
    letterSpacing: -0.5,
  },
  heroSubtitle: {
    fontSize: moderateScale(isTablet ? 14 : 12),
    color: "rgba(255,255,255,0.85)",
    lineHeight: moderateScale(isTablet ? 20 : 18),
    marginBottom: verticalScale(20),
  },
  heroStats: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.15)",
    borderRadius: moderateScale(12),
    padding: moderateScale(12),
  },
  statItem: {
    alignItems: "center",
    flex: 1,
  },
  statNumber: {
    fontSize: moderateScale(isTablet ? 16 : 14),
    fontWeight: "800",
    color: "#fff",
  },
  statLabel: {
    fontSize: moderateScale(isTablet ? 11 : 10),
    color: "rgba(255,255,255,0.75)",
    marginTop: verticalScale(2),
  },
  statDivider: {
    width: 1,
    height: verticalScale(24),
    backgroundColor: "rgba(255,255,255,0.3)",
  },
  heroBalloons: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: moderateScale(8),
  },
  balloonEmoji: {
    fontSize: moderateScale(isTablet ? 40 : 32),
  },

  // === SEARCH ===
  searchWrapper: {
    paddingHorizontal: moderateScale(16),
    paddingVertical: verticalScale(14),
    backgroundColor: "#f8faff",
  },
  searchSection: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingHorizontal: moderateScale(14),
    paddingVertical: verticalScale(12),
    borderRadius: moderateScale(14),
    borderWidth: 1.5,
    borderColor: "#e5e7eb",
    shadowColor: "#1e3a8a",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: moderateScale(8),
    elevation: 2,
  },
  searchFocused: {
    borderColor: "#3b6fd4",
    shadowOpacity: 0.12,
  },
  searchInput: {
    flex: 1,
    marginLeft: moderateScale(10),
    fontSize: moderateScale(isTablet ? 16 : 14),
    color: "#111827",
    fontWeight: "500",
  },

  // === CATEGORIES ===
  categoriesScroll: {
    marginBottom: verticalScale(4),
  },
  categoriesContent: {
    paddingHorizontal: moderateScale(16),
    paddingBottom: verticalScale(8),
  },
  categoryButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: moderateScale(14),
    paddingVertical: verticalScale(8),
    borderRadius: moderateScale(20),
    backgroundColor: "#fff",
    borderWidth: 1.5,
    borderColor: "#e5e7eb",
    marginRight: moderateScale(8),
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: moderateScale(4),
    elevation: 1,
  },
  categoryButtonActive: {
    backgroundColor: "#1e3a8a",
    borderColor: "#1e3a8a",
  },
  categoryIcon: {
    fontSize: moderateScale(isTablet ? 16 : 14),
    marginRight: moderateScale(5),
  },
  categoryText: {
    fontSize: moderateScale(isTablet ? 14 : 12),
    color: "#4b5563",
    fontWeight: "600",
  },
  categoryTextActive: {
    color: "#fff",
  },

  // === SECTIONS ===
  section: {
    marginTop: verticalScale(20),
    paddingHorizontal: moderateScale(16),
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "baseline",
    justifyContent: "space-between",
    marginBottom: verticalScale(14),
  },
  sectionTitle: {
    fontSize: moderateScale(isTablet ? 20 : 17, 0.2),
    fontWeight: "800",
    color: "#111827",
    letterSpacing: -0.3,
  },
  sectionSubtitle: {
    fontSize: moderateScale(isTablet ? 14 : 12),
    color: "#9ca3af",
    fontWeight: "500",
  },

  // === FEATURED ===
  featuredScroll: {
    paddingRight: moderateScale(4),
  },
  featuredCard: {
    width: featuredCardWidth,
    height: isTablet ? verticalScale(240) : verticalScale(190),
    borderRadius: moderateScale(18),
    overflow: "hidden",
    marginRight: moderateScale(12),
    shadowColor: "#1e3a8a",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.18,
    shadowRadius: moderateScale(12),
    elevation: 6,
  },
  featuredImage: {
    width: "100%",
    height: "100%",
  },
  featuredGradient: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: "65%",
    padding: moderateScale(14),
    justifyContent: "flex-end",
  },
  featuredBadge: {
    backgroundColor: "#f97316",
    borderRadius: moderateScale(10),
    paddingHorizontal: moderateScale(8),
    paddingVertical: verticalScale(3),
    alignSelf: "flex-start",
    marginBottom: verticalScale(6),
  },
  featuredBadgeText: {
    color: "#fff",
    fontSize: moderateScale(10),
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  featuredName: {
    color: "#fff",
    fontSize: moderateScale(isTablet ? 18 : 15),
    fontWeight: "800",
    marginBottom: verticalScale(6),
    lineHeight: moderateScale(22),
  },
  featuredFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  featuredPrice: {
    color: "#fbbf24",
    fontSize: moderateScale(isTablet ? 16 : 14),
    fontWeight: "800",
  },
  featuredPeople: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.2)",
    borderRadius: moderateScale(10),
    paddingHorizontal: moderateScale(7),
    paddingVertical: verticalScale(3),
  },
  featuredPeopleText: {
    color: "#fff",
    fontSize: moderateScale(isTablet ? 12 : 11),
    fontWeight: "600",
  },

  // === TOY CARDS GRID ===
  toysGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  toyCard: {
    width: width < 600 ? "100%" : width < 900 ? "48%" : "32%",
    backgroundColor: "#fff",
    borderRadius: moderateScale(16),
    overflow: "hidden",
    marginBottom: verticalScale(14),
    shadowColor: "#1e3a8a",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: moderateScale(10),
    elevation: 3,
  },
  toyImageContainer: {
    position: "relative",
  },
  toyImage: {
    width: "100%",
    height: isTablet ? verticalScale(200) : verticalScale(130),
    backgroundColor: "#f0f4ff",
  },
  toyIconBadge: {
    position: "absolute",
    top: moderateScale(8),
    right: moderateScale(8),
    backgroundColor: "rgba(255,255,255,0.95)",
    borderRadius: moderateScale(12),
    width: moderateScale(30),
    height: moderateScale(30),
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: moderateScale(4),
    elevation: 2,
  },
  toyIconText: {
    fontSize: moderateScale(15),
  },
  toyInfo: {
    padding: moderateScale(11),
  },
  toyName: {
    fontSize: moderateScale(isTablet ? 15 : 13),
    fontWeight: "700",
    color: "#111827",
    marginBottom: verticalScale(4),
    lineHeight: moderateScale(18),
  },
  toyDescription: {
    fontSize: moderateScale(isTablet ? 12 : 11),
    color: "#6b7280",
    lineHeight: moderateScale(16),
    marginBottom: verticalScale(7),
  },
  toyMeta: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: verticalScale(10),
  },
  toyMetaText: {
    fontSize: moderateScale(isTablet ? 11 : 10),
    color: "#6b7280",
    fontWeight: "500",
  },
  toyFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  toyPriceLabel: {
    fontSize: moderateScale(9),
    color: "#9ca3af",
    textTransform: "uppercase",
    letterSpacing: 0.3,
  },
  toyPrice: {
    fontSize: moderateScale(isTablet ? 17 : 15),
    fontWeight: "800",
    color: "#1e3a8a",
    lineHeight: moderateScale(20),
  },
  toyPriceDay: {
    fontSize: moderateScale(9),
    color: "#6b7280",
    fontWeight: "500",
  },
  addButton: {
    borderRadius: moderateScale(12),
    overflow: "hidden",
  },
  addButtonGradient: {
    width: moderateScale(34),
    height: moderateScale(34),
    alignItems: "center",
    justifyContent: "center",
    borderRadius: moderateScale(12),
  },

  // === EMPTY STATE ===
  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: verticalScale(50),
    paddingHorizontal: moderateScale(24),
  },
  emptyEmoji: {
    fontSize: moderateScale(52),
    marginBottom: verticalScale(12),
  },
  emptyTitle: {
    fontSize: moderateScale(16),
    fontWeight: "700",
    color: "#374151",
    marginBottom: verticalScale(6),
  },
  emptySubtitle: {
    fontSize: moderateScale(13),
    color: "#9ca3af",
    textAlign: "center",
    lineHeight: moderateScale(19),
    marginBottom: verticalScale(20),
  },
  clearFilterButton: {
    backgroundColor: "#1e3a8a",
    borderRadius: moderateScale(12),
    paddingHorizontal: moderateScale(20),
    paddingVertical: verticalScale(10),
  },
  clearFilterText: {
    color: "#fff",
    fontSize: moderateScale(13),
    fontWeight: "700",
  },

  // === MODAL ===
  modalOverlay: {
    flex: 1,
    justifyContent: "flex-end",
  },
  modalBackdrop: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.55)",
  },
  modalContent: {
    backgroundColor: "#f8faff",
    borderTopLeftRadius: moderateScale(28),
    borderTopRightRadius: moderateScale(28),
    maxHeight: "92%",
    overflow: "hidden",
  },
  modalImageContainer: {
    position: "relative",
    height: isTablet ? height * 0.4 : height * 0.35,
  },
  modalImage: {
    width: "100%",
    height: "100%",
  },
  modalImageGradient: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: "60%",
  },
  modalCloseButton: {
    position: "absolute",
    top: moderateScale(14),
    right: moderateScale(14),
    backgroundColor: "rgba(0,0,0,0.45)",
    borderRadius: moderateScale(20),
    width: moderateScale(36),
    height: moderateScale(36),
    alignItems: "center",
    justifyContent: "center",
  },
  modalTitleContainer: {
    position: "absolute",
    bottom: moderateScale(14),
    left: moderateScale(16),
    right: moderateScale(16),
  },
  modalTitle: {
    fontSize: moderateScale(isTablet ? 24 : 20),
    fontWeight: "800",
    color: "#fff",
    marginBottom: verticalScale(6),
    lineHeight: moderateScale(28),
  },
  modalPriceBadge: {
    backgroundColor: "#f97316",
    borderRadius: moderateScale(10),
    paddingHorizontal: moderateScale(10),
    paddingVertical: verticalScale(4),
    alignSelf: "flex-start",
  },
  modalPriceBadgeText: {
    color: "#fff",
    fontSize: moderateScale(13),
    fontWeight: "800",
  },
  modalBody: {
    paddingHorizontal: moderateScale(16),
    paddingTop: verticalScale(16),
  },
  modalDescription: {
    fontSize: moderateScale(isTablet ? 15 : 14),
    color: "#374151",
    lineHeight: moderateScale(22),
    marginBottom: verticalScale(16),
  },
  detailsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: verticalScale(20),
  },
  detailChip: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: moderateScale(10),
    paddingHorizontal: moderateScale(10),
    paddingVertical: verticalScale(7),
    borderWidth: 1,
    borderColor: "#e0e7ff",
    marginRight: moderateScale(8),
    marginBottom: verticalScale(8),
  },
  detailChipText: {
    fontSize: moderateScale(isTablet ? 12 : 11),
    color: "#374151",
    fontWeight: "600",
  },
  calendarSection: {
    marginBottom: verticalScale(8),
  },
  calendarStepHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: verticalScale(10),
  },
  stepDot: {
    width: moderateScale(22),
    height: moderateScale(22),
    borderRadius: moderateScale(11),
    backgroundColor: "#e5e7eb",
    alignItems: "center",
    justifyContent: "center",
  },
  stepDotDone: {
    backgroundColor: "#22c55e",
  },
  stepDotText: {
    fontSize: moderateScale(11),
    fontWeight: "800",
    color: "#fff",
  },
  calendarStepText: {
    fontSize: moderateScale(isTablet ? 14 : 13),
    fontWeight: "600",
    color: "#374151",
    flex: 1,
  },
  resetDatesButton: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
    marginTop: verticalScale(10),
    paddingVertical: verticalScale(6),
    paddingHorizontal: moderateScale(12),
  },
  resetDatesText: {
    fontSize: moderateScale(12),
    color: "#6b7280",
    fontWeight: "600",
  },
  summaryCard: {
    borderRadius: moderateScale(16),
    padding: moderateScale(16),
    marginTop: verticalScale(14),
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  summaryLabel: {
    fontSize: moderateScale(11),
    color: "rgba(255,255,255,0.7)",
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginBottom: verticalScale(3),
  },
  summaryValue: {
    fontSize: moderateScale(13),
    color: "#fff",
    fontWeight: "700",
  },
  summaryDays: {
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.18)",
    borderRadius: moderateScale(10),
    paddingHorizontal: moderateScale(14),
    paddingVertical: verticalScale(8),
  },
  summaryDaysNumber: {
    fontSize: moderateScale(22),
    fontWeight: "900",
    color: "#fbbf24",
  },
  summaryDaysLabel: {
    fontSize: moderateScale(10),
    color: "rgba(255,255,255,0.8)",
    fontWeight: "600",
  },
  summaryDivider: {
    height: 1,
    backgroundColor: "rgba(255,255,255,0.2)",
    marginVertical: verticalScale(12),
  },
  summaryTotalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  summaryTotalLabel: {
    fontSize: moderateScale(13),
    color: "rgba(255,255,255,0.85)",
    fontWeight: "600",
  },
  summaryTotalValue: {
    fontSize: moderateScale(22),
    fontWeight: "900",
    color: "#fbbf24",
  },
  modalFooter: {
    paddingHorizontal: moderateScale(16),
    paddingVertical: verticalScale(16),
    backgroundColor: "#f8faff",
    borderTopWidth: 1,
    borderTopColor: "#e5e7eb",
  },
  addToCartButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: verticalScale(16),
    borderRadius: moderateScale(16),
  },
  addToCartButtonText: {
    fontSize: moderateScale(isTablet ? 18 : 16),
    fontWeight: "800",
    color: "#fff",
    letterSpacing: 0.3,
  },
});