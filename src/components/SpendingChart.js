import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useExpenses } from "../context/ExpenseContext";
import { theme } from "../constants/theme";

const SpendingChart = () => {
  const { expenses } = useExpenses();

  const categoryTotals = expenses.reduce((acc, curr) => {
    acc[curr.category] = (acc[curr.category] || 0) + curr.amount;
    return acc;
  }, {});

  const totalSpending = Object.values(categoryTotals).reduce(
    (a, b) => a + b,
    0
  );

  const chartData = Object.keys(categoryTotals)
    .map((cat) => ({
      category: cat,
      amount: categoryTotals[cat],
      percentage:
        totalSpending > 0 ? (categoryTotals[cat] / totalSpending) * 100 : 0,
      color: theme.colors.categories[cat] || theme.colors.textSecondary,
    }))
    .sort((a, b) => b.amount - a.amount);

  if (totalSpending === 0) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>MY SPENDING</Text>
      {chartData.map((item) => (
        <View key={item.category} style={styles.row}>
          <View style={styles.labelContainer}>
            <Text style={[styles.label, { color: item.color }]}>
              {item.category.toUpperCase()}
            </Text>
          </View>

          <View style={styles.barBackground}>
            <View
              style={[
                styles.bar,
                { width: `${item.percentage}%`, backgroundColor: item.color },
                theme.glow(item.color), // Add glowing effect
              ]}
            />
          </View>

          {/* FIX: Changed toFixed(0) to toFixed(2) */}
          <Text style={styles.amount}>${item.amount.toFixed(2)}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: theme.colors.surface,
    borderRadius: 20,
    ...theme.glass, // Add glassmorphism effect
  },
  title: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 15,
    color: theme.colors.textSecondary,
    letterSpacing: 1,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  labelContainer: {
    width: 100,
  },
  label: {
    fontWeight: "bold",
    fontSize: 12,
    letterSpacing: 0.5,
  },
  barBackground: {
    flex: 1,
    height: 8,
    backgroundColor: "rgba(255,255,255,0.1)", // Semi-transparent track
    borderRadius: 4,
    marginHorizontal: 10,
    overflow: "hidden",
  },
  bar: {
    height: "100%",
    borderRadius: 4,
  },
  amount: {
    width: 60,
    fontSize: 12,
    fontWeight: "bold",
    textAlign: "right",
    color: theme.colors.textPrimary,
  },
});

export default SpendingChart;
