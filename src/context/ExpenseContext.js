import React, { createContext, useState, useContext, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY = "@ExpenseTracker:expenses";
const ExpenseContext = createContext();

export const ExpenseProvider = ({ children }) => {
  const [expenses, setExpenses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // 1. Load Expenses on Mount
  useEffect(() => {
    const loadExpenses = async () => {
      try {
        const storedExpenses = await AsyncStorage.getItem(STORAGE_KEY);
        if (storedExpenses !== null) {
          setExpenses(JSON.parse(storedExpenses));
        }
      } catch (e) {
        console.error("Failed to load expenses from storage", e);
      } finally {
        setIsLoading(false);
      }
    };
    loadExpenses();
  }, []);

  // 2. Save Expenses whenever the state changes
  useEffect(() => {
    const saveExpenses = async () => {
      try {
        if (!isLoading) {
          // Prevent saving empty state during initial load
          await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(expenses));
        }
      } catch (e) {
        console.error("Failed to save expenses to storage", e);
      }
    };
    saveExpenses();
  }, [expenses, isLoading]);

  const addExpense = (expense) => {
    const newExpense = {
      ...expense,
      id: Date.now().toString(),
      date: expense.date || new Date().toISOString(),
    };
    setExpenses((prev) => [newExpense, ...prev]);
  };

  const deleteExpense = (id) => {
    setExpenses((prev) => prev.filter((expense) => expense.id !== id));
  };

  const updateExpense = (id, updatedData) => {
    setExpenses((prev) =>
      prev.map((expense) =>
        expense.id === id ? { ...expense, ...updatedData } : expense
      )
    );
  };

  return (
    <ExpenseContext.Provider
      value={{ expenses, addExpense, deleteExpense, updateExpense, isLoading }}>
      {children}
    </ExpenseContext.Provider>
  );
};

export const useExpenses = () => useContext(ExpenseContext);
