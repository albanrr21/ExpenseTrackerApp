import React from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useExpenses } from "../context/ExpenseContext";
import SpendingChart from "../components/SpendingChart";
import LoadingIndicator from "../components/LoadingIndicator";
import GradientBackground from "../components/GradientBackground";

const DashboardScreen = () => {
  const { isLoading } = useExpenses();
  return (
    <GradientBackground>
      <SafeAreaView style={styles.screen} edges={["left", "right", "top"]}>
        {isLoading ? <LoadingIndicator /> : <SpendingChart />}
      </SafeAreaView>
    </GradientBackground>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "transparent",
  },
});

export default DashboardScreen;
