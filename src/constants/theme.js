export const theme = {
  colors: {
    background: "#121212", // Deep dark background
    surface: "#1E1E1E", // Slightly lighter for cards
    primary: "#00E5FF", // Neon Cyan/Blue for main actions
    secondary: "#D500F9", // Neon Purple for accents
    textPrimary: "#FFFFFF",
    textSecondary: "#B0B0B0",
    success: "#00E676", // Neon Green
    danger: "#FF1744", // Neon Red
    // Category Colors (Neon Palette)
    categories: {
      food: "#FF1744", // Neon Red
      transport: "#00E5FF", // Neon Cyan
      entertainment: "#D500F9", // Neon Purple
      shopping: "#FFEA00", // Neon Yellow
      bills: "#FF9100", // Neon Orange
    },
  },
  // Common styles for a "glassmorphism" feel
  glass: {
    backgroundColor: "rgba(30, 30, 30, 0.8)",
    borderColor: "rgba(255, 255, 255, 0.1)",
    borderWidth: 1,
  },
  glow: (color) => ({
    shadowColor: color,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 10,
    elevation: 5,
  }),
};
