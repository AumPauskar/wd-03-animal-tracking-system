import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import Onboarding from "../Screens/Onboarding/Onboarding";
import SignInScreen from "../Screens/Auth/SignInScreen";
import SignUpScreen from "../Screens/Auth/SignUpScreen";


const Stack = createStackNavigator();

const PublicRouters = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="gettingstarted">
        <Stack.Screen
          name="onBoarding"
          component={Onboarding}
          options={{ headerShown: false }}
        />
        
        <Stack.Screen
          name="signInScreen"
          component={SignInScreen}
          options={{ headerShown: false }}
        />

           
<Stack.Screen
          name="signUpScreen"
          component={SignUpScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default PublicRouters;
