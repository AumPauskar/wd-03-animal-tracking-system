import React, { useState, useCallback } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import {
  Ionicons,
  MaterialCommunityIcons,
  FontAwesome5,
} from "@expo/vector-icons";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const BottomNavigation = () => {
  const [activeTab, setActiveTab] = useState("Home");
  const navigation = useNavigation();

  const tabs = [
    {
      name: "Home",
      icon: "home",
      library: Ionicons,
      screen: "mainMap",
      index: 1,
    },
    {
      name: "Add",
      icon: "plus",
      library: MaterialCommunityIcons,
      screen: "animalList",
      index: 2,
    },
    {
      name: "Search",
      icon: "search",
      library: Ionicons,
      screen: "animalList",
      index: 3,
    },
   
    {
      name: "Logout",
      icon: "sign-out-alt",
      library: FontAwesome5,
      screen: "onBoarding",
      index: 4,
    },
  ];

  useFocusEffect(
    useCallback(() => {
      const getActiveTab = async () => {
        try {
          const storedIndex = await AsyncStorage.getItem("activeTabIndex");
          if (storedIndex !== null) {
            const activeTabObj = tabs.find(
              (tab) => tab.index === parseInt(storedIndex)
            );
            if (activeTabObj) setActiveTab(activeTabObj.name);
          }
        } catch (error) {
          console.error("Failed to fetch the data from storage", error);
        }
      };

      getActiveTab();
    }, [])
  );

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("authToken");
      await AsyncStorage.removeItem("userData");
      navigation.navigate("onBoarding");
    } catch (error) {
      console.error("Failed to remove authToken from storage", error);
    }
  };

  const handleTabPress = async (tabName, screenName, tabIndex) => {
    if (tabName === "Logout") {
      Alert.alert(
        "Logout",
        "Are you sure you want to logout?",
        [
          {
            text: "Cancel",
            style: "cancel",
          },
          { text: "OK", onPress: () => handleLogout() },
        ],
        { cancelable: false }
      );
    } else {
      try {
        await AsyncStorage.setItem("activeTabIndex", tabIndex.toString());
        setActiveTab(tabName);
        navigation.navigate(screenName);
      } catch (error) {
        console.error("Failed to save the data to storage", error);
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.bottomNav}>
        {tabs.map((tab) => {
          const isActive = activeTab === tab.name;
          const IconComponent = tab.library;

          return (
            <TouchableOpacity
              key={tab.name}
              style={[
                styles.tabButton,
                isActive ? styles.activeTabButton : null,
              ]}
              onPress={() => handleTabPress(tab.name, tab.screen, tab.index)}
            >
              <IconComponent
                name={tab.icon}
                size={24}
                color={isActive ? "#FF0000" : "gray"} // Red color for active tab
              />
              <Text
                style={[
                  styles.tabText,
                  { color: isActive ? "#FF0000" : "gray" }, // Red color for active tab
                ]}
              >
                {tab.name}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#e0e0e0",
    paddingVertical: 10,
    paddingHorizontal: 5,
    height: 70,
    elevation: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  tabButton: {
    alignItems: "center",
    justifyContent: "center",
    flexGrow: 1,
  },
  activeTabButton: {
    // Remove the active tab styling
  },
  tabText: {
    fontSize: 12,
    marginTop: 4,
    fontWeight: "600",
  },
});

export default BottomNavigation;
