import React from "react";
import {
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
  Keyboard,
  TouchableWithoutFeedback,
  ScrollView,
  StatusBar,
} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import {
  NavigationContainer,
  DarkTheme as NavigationDarkTheme,
} from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

import { ExpenseProvider, useExpenses } from "./src/context/ExpenseContext";
import ExpenseForm from "./src/components/ExpenseForm";
import ExpenseList from "./src/components/ExpenseList";
import SpendingChart from "./src/components/SpendingChart";
import { theme } from "./src/constants/theme";

const Tab = createBottomTabNavigator();

const CustomTheme = {
  ...NavigationDarkTheme, // Start with React Navigation's default Dark Theme structure
  colors: {
    ...NavigationDarkTheme.colors,
    // Override with our futuristic colors
    background: theme.colors.background,
    card: theme.colors.surface,
    text: theme.colors.textPrimary,
    primary: theme.colors.primary, // Used by navigators for active elements
    border: "rgba(255, 255, 255, 0.1)",
  },
  // By spreading NavigationDarkTheme, we ensure internal properties like 'medium'
  // which relate to default fonts are defined, solving the TypeError.
};

// 1. Helper Component for Keyboard Dismiss
const DismissKeyboardView = ({ children, style }) => (
  <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
    <View style={style}>{children}</View>
  </TouchableWithoutFeedback>
);

// Helper Component for Loading State
const LoadingIndicator = () => (
  <View style={styles.loadingContainer}>
    <ActivityIndicator size='large' color={theme.colors.primary} />
    <Text style={styles.loadingText}>Loading data...</Text>
  </View>
);

// 2. Screen Components (wrapped for clean navigation)

function DashboardScreen() {
  const { isLoading } = useExpenses();
  return (
    <SafeAreaView style={styles.screen} edges={["left", "right", "top"]}>
      {isLoading ? <LoadingIndicator /> : <SpendingChart />}
    </SafeAreaView>
  );
}

function AddExpenseScreen() {
  return (
    <SafeAreaView style={styles.screen} edges={["left", "right", "top"]}>
      <DismissKeyboardView style={styles.screenContent}>
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps='always'>
          <ExpenseForm />
        </ScrollView>
      </DismissKeyboardView>
    </SafeAreaView>
  );
}

function HistoryScreen() {
  const { isLoading } = useExpenses();
  return (
    <SafeAreaView style={styles.screen} edges={["left", "right", "top"]}>
      <DismissKeyboardView style={{ flex: 1 }}>
        <View style={styles.screenContent}>
          {isLoading ? <LoadingIndicator /> : <ExpenseList />}
        </View>
      </DismissKeyboardView>
    </SafeAreaView>
  );
}

// 3. Main App Component
function AppTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.textSecondary,
        tabBarStyle: {
          backgroundColor: theme.colors.surface,
          borderTopWidth: 1,
          borderTopColor: "rgba(255, 255, 255, 0.1)",
          paddingBottom: 5,
          height: 60,
        },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === "Dashboard") {
            iconName = focused ? "stats-chart" : "stats-chart-outline";
          } else if (route.name === "Add") {
            iconName = focused ? "add-circle" : "add-circle-outline";
          } else if (route.name === "History") {
            iconName = focused ? "list" : "list-outline";
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}>
      <Tab.Screen name='Dashboard' component={DashboardScreen} />
      <Tab.Screen name='Add' component={AddExpenseScreen} />
      <Tab.Screen name='History' component={HistoryScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <GestureHandlerRootView style={styles.container}>
      <StatusBar barStyle='light-content' />
      <ExpenseProvider>
        <NavigationContainer theme={CustomTheme}>
          <AppTabs />
        </NavigationContainer>
      </ExpenseProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  screen: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  screenContent: {
    flex: 1,
    paddingHorizontal: 10,
  },
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
