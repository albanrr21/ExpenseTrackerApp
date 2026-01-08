import React from "react";
import { View, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import DismissKeyboardView from "../components/DismissKeyboardView";
import ExpenseList from "../components/ExpenseList";
import LoadingIndicator from "../components/LoadingIndicator";
import { useExpenses } from "../context/ExpenseContext";
import GradientBackground from "../components/GradientBackground";

const HistoryScreen = () => {
  const { isLoading } = useExpenses();
  return (
    <GradientBackground>
      <SafeAreaView style={styles.screen} edges={["left", "right", "top"]}>
        <DismissKeyboardView style={{ flex: 1 }}>
          <View style={styles.screenContent}>
            {isLoading ? <LoadingIndicator /> : <ExpenseList />}
          </View>
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

export default HistoryScreen;
