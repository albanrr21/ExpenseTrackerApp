import React from "react";
import { View, ActivityIndicator, Text, StyleSheet } from "react-native";
import { theme } from "../constants/theme";

const LoadingIndicator = () => (
  <View style={styles.loadingContainer}>
    <ActivityIndicator size='large' color={theme.colors.primary} />
    <Text style={styles.loadingText}>Loading data...</Text>
  </View>
);

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    color: theme.colors.textSecondary,
    marginTop: 10,
  },
});

export default LoadingIndicator;
