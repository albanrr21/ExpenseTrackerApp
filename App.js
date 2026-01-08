import React from "react";
import { StyleSheet, StatusBar } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import {
  NavigationContainer,
  DarkTheme as NavigationDarkTheme,
} from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import { ExpenseProvider } from "./src/context/ExpenseContext";
import DashboardScreen from "./src/screens/DashboardScreen";
import AddExpenseScreen from "./src/screens/AddExpenseScreen";
import HistoryScreen from "./src/screens/HistoryScreen";
import { theme } from "./src/constants/theme";

const Tab = createBottomTabNavigator();

const CustomTheme = {
  ...NavigationDarkTheme,
  colors: {
    ...NavigationDarkTheme.colors,
    background: theme.colors.background,
    card: theme.colors.surface,
    text: theme.colors.textPrimary,
    primary: theme.colors.primary,
    border: "rgba(255, 255, 255, 0.1)",
  },
};

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
});
