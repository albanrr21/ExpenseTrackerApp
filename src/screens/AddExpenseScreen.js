import React from "react";
import { StyleSheet, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import DismissKeyboardView from "../components/DismissKeyboardView";
import ExpenseForm from "../components/ExpenseForm";
import GradientBackground from "../components/GradientBackground";

const AddExpenseScreen = () => {
  return (
    <GradientBackground>
      <SafeAreaView style={styles.screen} edges={["left", "right", "top"]}>
        <DismissKeyboardView style={styles.screenContent}>
          <ScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            keyboardShouldPersistTaps='always'>
            <ExpenseForm />
          </ScrollView>
        </DismissKeyboardView>
      </SafeAreaView>
    </GradientBackground>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "transparent",
  },
  screenContent: {
    flex: 1,
    paddingHorizontal: 10,
  },
});

export default AddExpenseScreen;
