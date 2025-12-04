import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
  ScrollView,
} from "react-native";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { useExpenses } from "../context/ExpenseContext";
import { theme } from "../constants/theme";

const categories = ["all", ...Object.keys(theme.colors.categories)];
const categoryKeys = Object.keys(theme.colors.categories);

const ExpenseList = () => {
  const { expenses, deleteExpense, updateExpense } = useExpenses(); // Get updateExpense
  const [filter, setFilter] = useState("all");

  // New States for Editing
  const [editingId, setEditingId] = useState(null);
  const [editingExpense, setEditingExpense] = useState({});

  const filteredExpenses =
    filter === "all" ? expenses : expenses.filter((e) => e.category === filter);

  const listTotal = filteredExpenses.reduce(
    (sum, item) => sum + item.amount,
    0
  );

  // --- EDITING LOGIC ---

  const startEdit = (expense) => {
    setEditingId(expense.id);
    setEditingExpense({
      title: expense.title,
      amount: expense.amount.toString(), // Convert to string for TextInput
      category: expense.category,
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditingExpense({});
  };

  const handleAmountChange = (text) => {
    let cleanedText = text.replace(/[^0-9.,]/g, "");
    cleanedText = cleanedText.replace(/,/g, ".");
    const parts = cleanedText.split(".");
    if (parts.length > 2) {
      cleanedText = parts[0] + "." + parts.slice(1).join("");
    }
    setEditingExpense((prev) => ({ ...prev, amount: cleanedText }));
  };

  const saveEdit = () => {
    const finalAmount = parseFloat(editingExpense.amount);

    if (!editingExpense.title || isNaN(finalAmount) || finalAmount <= 0) {
      Alert.alert(
        "Invalid Input",
        "Please enter a valid title and amount greater than 0."
      );
      return;
    }

    updateExpense(editingId, {
      title: editingExpense.title,
      amount: finalAmount,
      category: editingExpense.category,
    });
    cancelEdit();
  };

  // --- RENDERING ACTIONS ---

  const renderRightActions = (id) => {
    return (
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => deleteExpense(id)}>
        <Text style={styles.deleteText}>DELETE</Text>
      </TouchableOpacity>
    );
  };

  const renderItem = ({ item }) => {
    const catColor = theme.colors.categories[item.category];

    if (editingId === item.id) {
      // Render Edit Form
      return (
        <View style={[styles.card, styles.editCard]}>
          <TextInput
            style={styles.editInput}
            value={editingExpense.title}
            onChangeText={(text) =>
              setEditingExpense((prev) => ({ ...prev, title: text }))
            }
            placeholder='Title'
            placeholderTextColor={theme.colors.textSecondary}
          />
          <TextInput
            style={[styles.editInput, { marginBottom: 15 }]}
            value={editingExpense.amount}
            onChangeText={handleAmountChange}
            keyboardType='numeric'
            placeholder='Amount'
            placeholderTextColor={theme.colors.textSecondary}
          />

          {/* Category Chips for Editing */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.editCategoryRow}>
            {categoryKeys.map((cat) => {
              const isActive = editingExpense.category === cat;
              const chipColor = theme.colors.categories[cat];
              return (
                <TouchableOpacity
                  key={cat}
                  style={[
                    styles.editChip,
                    { borderColor: chipColor },
                    isActive && {
                      backgroundColor: chipColor,
                      ...theme.glow(chipColor),
                    },
                  ]}
                  onPress={() =>
                    setEditingExpense((prev) => ({ ...prev, category: cat }))
                  }>
                  <Text
                    style={[
                      styles.chipText,
                      isActive
                        ? { color: theme.colors.background }
                        : { color: chipColor },
                    ]}>
                    {cat.toUpperCase()}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>

          {/* Save/Cancel Buttons */}
          <View style={styles.editButtonRow}>
            <TouchableOpacity style={styles.cancelButton} onPress={cancelEdit}>
              <Text style={styles.cancelText}>CANCEL</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.saveButton, theme.glow(theme.colors.success)]}
              onPress={saveEdit}>
              <Text style={styles.saveText}>SAVE</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    }

    // Render Display Card
    return (
      <Swipeable renderRightActions={() => renderRightActions(item.id)}>
        <TouchableOpacity style={styles.card} onPress={() => startEdit(item)}>
          <View
            style={[
              styles.categoryIndicator,
              { backgroundColor: catColor, ...theme.glow(catColor) },
            ]}
          />
          <View style={styles.cardContent}>
            <View>
              <Text style={styles.cardTitle}>{item.title}</Text>
              <Text style={[styles.cardCategory, { color: catColor }]}>
                {item.category.toUpperCase()}
              </Text>
            </View>
            <View>
              <Text style={styles.cardAmount}>-${item.amount.toFixed(2)}</Text>
              <Text style={styles.cardDate}>
                {new Date(item.date).toLocaleDateString()}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </Swipeable>
    );
  };

  return (
    <View style={styles.container}>
      {/* Category Filter Chips */}
      <View style={styles.filterContainer}>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={categories}
          keyExtractor={(item) => item}
          renderItem={({ item }) => {
            const isActive = filter === item;
            const activeColor =
              theme.colors.categories[item] || theme.colors.primary;
            return (
              <TouchableOpacity
                style={[
                  styles.chip,
                  isActive && {
                    backgroundColor: activeColor,
                    ...theme.glow(activeColor),
                    borderColor: activeColor,
                  },
                ]}
                onPress={() => setFilter(item)}>
                <Text
                  style={[
                    styles.chipText,
                    isActive && { color: theme.colors.background },
                  ]}>
                  {item.toUpperCase()}
                </Text>
              </TouchableOpacity>
            );
          }}
        />
      </View>

      {/* Total Display */}
      <View style={styles.totalContainer}>
        <Text style={styles.totalLabel}>
          TOTAL {filter !== "all" ? `(${filter.toUpperCase()})` : ""}
        </Text>
        <Text style={styles.totalAmount}>${listTotal.toFixed(2)}</Text>
      </View>

      {/* Expense List */}
      <FlatList
        data={filteredExpenses}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  filterContainer: {
    paddingVertical: 10,
  },
  chip: {
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 25,
    backgroundColor: "rgba(255,255,255,0.05)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
    marginRight: 10,
  },
  chipText: {
    color: theme.colors.textSecondary,
    fontWeight: "bold",
    fontSize: 12,
    letterSpacing: 1,
  },
  totalContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 15,
    alignItems: "center",
  },
  totalLabel: {
    fontSize: 14,
    color: theme.colors.textSecondary,
    fontWeight: "bold",
    letterSpacing: 1,
  },
  totalAmount: {
    fontSize: 24,
    fontWeight: "900",
    color: theme.colors.textPrimary,
    textShadowColor: theme.colors.primary,
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  listContent: {
    paddingBottom: 20,
  },
  // --- CARD DISPLAY STYLES ---
  card: {
    backgroundColor: theme.colors.surface,
    marginVertical: 10,
    marginHorizontal: 10,
    borderRadius: 15,
    flexDirection: "row",
    ...theme.glass,
  },
  categoryIndicator: {
    width: 4,
  },
  cardContent: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 12,
    alignItems: "center",
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: theme.colors.textPrimary,
  },
  cardCategory: {
    fontSize: 10,
    marginTop: 4,
    fontWeight: "bold",
    letterSpacing: 1,
  },
  cardAmount: {
    fontSize: 16,
    fontWeight: "bold",
    color: theme.colors.danger,
    textAlign: "right",
  },
  cardDate: {
    fontSize: 10,
    color: theme.colors.textSecondary,
    marginTop: 4,
    textAlign: "right",
  },
  deleteButton: {
    alignSelf: "center",
    backgroundColor: theme.colors.danger,
    justifyContent: "center",
    alignItems: "center",
    width: 80,
    height: "70%",
    borderRadius: 15,
    marginLeft: 10,
  },
  deleteText: {
    color: theme.colors.textPrimary,
    fontWeight: "bold",
    fontSize: 12,
  },
  // --- EDIT CARD STYLES ---
  editCard: {
    padding: 15,
    flexDirection: "column",
  },
  editInput: {
    backgroundColor: "rgba(255,255,255,0.05)",
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
    fontSize: 14,
    color: theme.colors.textPrimary,
  },
  editCategoryRow: {
    marginBottom: 15,
  },
  editChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1.5,
    marginRight: 8,
    backgroundColor: "transparent",
  },
  editButtonRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 10,
  },
  cancelButton: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 8,
    marginRight: 10,
    backgroundColor: theme.colors.surface,
    borderWidth: 1,
    borderColor: theme.colors.textSecondary,
  },
  cancelText: {
    color: theme.colors.textSecondary,
    fontWeight: "bold",
    fontSize: 12,
  },
  saveButton: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: theme.colors.success,
  },
  saveText: {
    color: theme.colors.background,
    fontWeight: "900",
    fontSize: 12,
  },
});

export default ExpenseList;
