import React, { useState, useEffect, useRef } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MapView, { Marker, Circle } from "react-native-maps";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const PredictMap = () => {
  const navigation = useNavigation();
  const mapRef = useRef(null); // Ref for MapView component
  const [animalData, setAnimalData] = useState(null); // State to store fetched animal data
  const [loading, setLoading] = useState(true); // State to manage loading

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const response = await fetch(
        "https://path-prediction.onrender.com/predict",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const markerData = await response.json();
      setAnimalData(markerData);
      setLoading(false);

      // Zoom to the predicted location after fetching data
      zoomToPredictedLocation(markerData.predicted_location);
    } catch (error) {
      console.error("Error fetching user data:", error);
      // Handle error
    }
  };

  const zoomToPredictedLocation = (coordinates) => {
    if (mapRef.current && coordinates) {
      const region = {
        latitude: coordinates[0],
        longitude: coordinates[1],
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      };
      mapRef.current.animateToRegion(region, 1000);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <Text style={styles.headerText}>Inactive Status Prediction</Text>
        </View>
        <MapView
          ref={mapRef}
          style={styles.map}
          initialRegion={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          {/* Existing Marker */}
          <Marker
            coordinate={{ latitude: 37.78825, longitude: -122.4324 }}
            title={"My Marker"}
            description={"Some description"}
          />

          {/* New Marker for predicted location */}
          {animalData && animalData.predicted_location && (
            <>
              <Marker
                coordinate={{
                  latitude: animalData.predicted_location[0],
                  longitude: animalData.predicted_location[1],
                }}
                title={"Predicted Location"}
                description={"Predicted Location radius "}
                pinColor={"green"} // Optionally, set a different color for the pin
              />
              <Circle
                center={{
                  latitude: animalData.predicted_location[0],
                  longitude: animalData.predicted_location[1],
                }}
                radius={1000} // Radius in meters (1 km)
                strokeColor={"#F00"} // Outline color
                fillColor={"rgba(255, 0, 0, 0.1)"} // Fill color with opacity
              />
            </>
          )}
        </MapView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "black",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 60,
    backgroundColor: "#000",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    zIndex: 1,
  },
  backButton: {
    position: "absolute",
    left: 10,
    top: 20,
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
  },
  map: {
    flex: 1,
    marginTop: 60,
  },
});

export default PredictMap;
