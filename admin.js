import * as React from "react";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { StyleSheet, Alert, BackHandler } from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";

import AdminMaintainerList from "./adminMaintainerList";
import AdminReservoir from "./adminReservoirs";
import AdminProfile from "./adminProfile";
import AdminHome from "./adminHome";
import Ionicons from "react-native-vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 8,
    // alignItems: "center", // Centered horizontally
  },
  baseText: {
    fontWeight: "bold",
    fontSize: 24,
  },
  innerText: {
    color: "red",
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "600",
    color: Colors.white,
  },
  card: {
    height: 200,
    width: "100%",
    marginTop: 8,
    backgroundColor: "white",
    padding: 9,
  },
});

const Tab = createBottomTabNavigator();
export default function Main({ navigation }) {
  // React.useEffect(
  //   () =>
  //     navigation.addListener("beforeRemove", (e) => {
  //       // Prevent default behavior of leaving the screen
  //       e.preventDefault();

  //       // Prompt the user before leaving the screen
  //       Alert.alert(
  //         "Discard changes?",
  //         "Are you sure to discard them and leave the screen?",
  //         [
  //           { text: "Don't leave", style: "cancel", onPress: () => {} },
  //           {
  //             text: "Exit",
  //             style: "destructive",
  //             // If the user confirmed, then we dispatch the action we blocked earlier
  //             // This will continue the action that had triggered the removal of the screen
  //             onPress: () => {
  //               AsyncStorage.removeItem(
  //                 "@storage_Key",
  //                 navigation.navigate("Login")
  //               );
  //             },
  //           },
  //         ]
  //       );
  //     }),
  //   [navigation]
  // );

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Reservoirs") {
            iconName = focused ? "library" : "library-outline";
          } else if (route.name === "Maintainers") {
            iconName = focused ? "people" : "people-outline";
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
      <Tab.Screen name="Home" component={AdminHome} />
      <Tab.Screen name="Reservoirs" component={AdminReservoir} />
      <Tab.Screen name="Maintainers" component={AdminMaintainerList} />
      <Tab.Screen name="Profile" component={AdminProfile} options />
    </Tab.Navigator>
  );
}
