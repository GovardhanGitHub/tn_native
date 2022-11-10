import * as React from "react";
import { Text, View, Button } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { SafeAreaView, StyleSheet, FlatList } from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Card from "./card";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import MaintainerAssignedReservoir, {
  SecondActivity,
} from "./maintainerAssignedReservoir";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaintainerProfile from "./maintainerProfile";

const Tab = createBottomTabNavigator();
export default function MaintainerHome() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Reservoir") {
            iconName = focused ? "library" : "library-outline";
          } else if (route.name === "Profile") {
            iconName = focused ? "person-circle" : "person-circle-outline";
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "blue",
        tabBarInactiveTintColor: "black",
      })}
    >
      <Tab.Screen name="Reservoir" component={MaintainerAssignedReservoir} />
      <Tab.Screen name="Profile" component={MaintainerProfile} />
    </Tab.Navigator>
  );
}
