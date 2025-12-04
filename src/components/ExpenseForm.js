import React, { useState } from "react";
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TouchableOpacity,
  Keyboard,
  Alert,
  FlatList,
} from "react-native";
import { useExpenses } from "../context/ExpenseContext";
import { theme } from "../constants/theme";

// Define categories for the buttons (excluding 'all' since it's an input form)
const categories = Object.keys(theme.colors.categories);

const ExpenseForm = () => {
  const { addExpense } = useExpenses();
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  // Initialize category to the first one in the list
  const [category, setCategory] = useState(categories[0]);

  const handleAmountChange = (text) => {
    // 1. Remove non-numeric/non-decimal characters
    let cleanedText = text.replace(/[^0-9.,]/g, "");
    // 2. Replace all commas with dots (universal separator)
    cleanedText = cleanedText.replace(/,/g, ".");
    // 3. Ensure only one dot exists
    const parts = cleanedText.split(".");
    if (parts.length > 2) {
      cleanedText = parts[0] + "." + parts.slice(1).join("");
    }
    setAmount(cleanedText);
  };

  const handleSubmit = () => {
    const finalAmount = parseFloat(amount);

    if (!title || !amount) {
      Alert.alert("Missing Fields", "Please enter both a title and an amount.");
      return;
    }

    if (isNaN(finalAmount) || finalAmount <= 0) {
      Alert.alert(
        "Invalid Amount",
        "Please enter a valid number greater than 0. Check your decimal input."
      );
      return;
    }

    addExpense({
      title,
      amount: finalAmount,
      category,
    });

    // Clear inputs and reset category to default
    setTitle("");
    setAmount("");
    setCategory(categories[0]);
    Keyboard.dismiss();
  };

  // Render function for the category chips
  const renderCategoryChip = ({ item }) => {
    const isActive = category === item;
    const chipColor = theme.colors.categories[item];

    return (
      <TouchableOpacity
        style={[
          styles.chip,
          { borderColor: chipColor },
          isActive && { backgroundColor: chipColor, ...theme.glow(chipColor) },
        ]}
        onPress={() => setCategory(item)}>
        <Text
          style={[
            styles.chipText,
            isActive
              ? { color: theme.colors.background }
              : { color: chipColor },
          ]}>
          {item.toUpperCase()}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>NEW TRANSACTION</Text>

      <TextInput
        style={styles.input}
        placeholder='What did you buy?'
        placeholderTextColor={theme.colors.textSecondary}
        value={title}
        onChangeText={setTitle}
      />

      <TextInput
        style={styles.input}
        placeholder='Amount (e.g., 5.99)'
        placeholderTextColor={theme.colors.textSecondary}
        value={amount}
        onChangeText={handleAmountChange}
        keyboardType='numeric'
      />

      {/* Category Selection Row */}
      <View style={styles.categoryRow}>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={categories}
          keyExtractor={(item) => item}
          renderItem={renderCategoryChip}
          contentContainerStyle={styles.categoryList}
        />
      </View>

      <TouchableOpacity
        style={[styles.button, theme.glow(theme.colors.primary)]}
        onPress={handleSubmit}>
        <Text style={styles.buttonText}>ADD EXPENSE</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.surface,
    padding: 20,
    borderRadius: 20,
    ...theme.glass,
  },
  header: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 15,
    color: theme.colors.textSecondary,
    letterSpacing: 1,
  },
  input: {
    backgroundColor: "rgba(255,255,255,0.05)",
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
    fontSize: 16,
    color: theme.colors.textPrimary,
  },
  // --- New Styles for Chips ---
  categoryRow: {
    marginBottom: 20,
  },
  categoryList: {
    paddingRight: 10, // Ensure last chip is visible
  },
  chip: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1.5,
    marginRight: 10,
    backgroundColor: "transparent",
  },
  chipText: {
    fontWeight: "bold",
    fontSize: 11,
    letterSpacing: 0.5,
  },
  // -----------------------------
  button: {
    backgroundColor: theme.colors.primary,
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
  },
  buttonText: {
    color: theme.colors.background,
    fontWeight: "900",
    fontSize: 16,
    letterSpacing: 1,
  },
});

export default ExpenseForm;
