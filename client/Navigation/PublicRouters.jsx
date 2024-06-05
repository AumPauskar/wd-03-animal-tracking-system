import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import Onboarding from "../Screens/Onboarding/Onboarding";
import SignInScreen from "../Screens/Auth/SignInScreen";
import SignUpScreen from "../Screens/Auth/SignUpScreen";
import MainMap from "../Screens/main/MainMap";
import BottomNavigation from "./BottomNavigation";
import AnimalList from "../Screens/main/AnimalList";
import SelectedAnimal from "../Screens/main/mainComponents/SelectedAnimal";
import CreateGroup from "../Screens/main/CreateGroup";
import GroupSelection from "../Screens/main/mainComponents/GroupSelection";
import DisplayMembers from "../Screens/main/mainComponents/DisplayMembers";
import PredictMap from "../Screens/main/PredictMap";

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

        <Stack.Screen
          name="mainMap"
          component={MainMapWithBottomNavigation}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="animalList"
          component={AnimalLists}
          options={{ headerShown: false }}
        />

      <Stack.Screen
          name="selectedAnimal"
          component={SelectedAnimal}
          options={{ headerShown: true }}
        />
              <Stack.Screen
          name="createGroup"
          component={CreatingGroup}
          options={{ headerShown: false }}
        />
              <Stack.Screen
          name="groupSelection"
          component={GroupSelection}
          options={{ headerShown: true }}
        />
                  <Stack.Screen
          name="displayMembers"
          component={DisplayMembers}
          options={{ headerShown: false }}
        />
           <Stack.Screen
          name="predictMap"
          component={PredictMap}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const AnimalLists = () => {
  return (
    <>
      <AnimalList />
      <BottomNavigation />
    </>
  );
};

const MainMapWithBottomNavigation = () => {
  return (
    <>
      <MainMap />
      <BottomNavigation />
    </>
  );
};

const CreatingGroup = () => {
  return (
    <>
      <CreateGroup />
      <BottomNavigation />
    </>
  );
};



export default PublicRouters;
