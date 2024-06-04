import React from "react";
import { StyleSheet, View } from "react-native";
import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import PublicRouters from "./Navigation/PublicRouters";

export default function App() {
  return (
    <>
      <StatusBar backgroundColor="black" translucent={false} style="dark" />
      <View style={styles.container}>
        <PublicRouters />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
