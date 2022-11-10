import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Main from "./admin";
import LoginScreen from "./login";
import MaintainerHome from "./maintainerHome";
import { SecondActivity } from "./updateDataModel";
import MaintainerAssignedReservoir from "./maintainerAssignedReservoir";

const Stack = createNativeStackNavigator();
const RootStack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName="Login"
      >
        <Stack.Screen name="Main" component={Main} />
        <Stack.Screen name="MaintainerHome" component={MaintainerHome} />
        <Stack.Screen name="Login" component={LoginScreen} />

        <Stack.Screen
          name="ReservoirModel"
          component={MaintainerAssignedReservoir}
          options={{
            title: "My home",
            headerStyle: {
              backgroundColor: "#f4511e",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />

        <RootStack.Group screenOptions={{ presentation: "modal" }}>
          <RootStack.Screen name="Details" component={SecondActivity} />
        </RootStack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

//ch@cho	wrdcnr
