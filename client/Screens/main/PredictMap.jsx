import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MapView, { Marker } from 'react-native-maps';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useState , useEffect} from 'react';

const PredictMap = () => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [newAnimalName, setNewAnimalName] = useState("");
  const [userData, setUserData] = useState(null); // State to store user data
  const [authToken, setAuthToken] = useState(null); // State to store authToken
  const [animalData, setAnimalData] = useState([]); // State to store fetched animal data
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true); // State to manage loading
  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const authToken = await AsyncStorage.getItem("authToken");
      const userdata = await AsyncStorage.getItem("userData");
      if (!authToken) {
        Alert.alert(
          "Authentication Error",
          "Authentication token not found. Please sign in again."
        );
        return;
      }
      const userDataString = await AsyncStorage.getItem("userData");
      const userDat = JSON.parse(userDataString);
      console.log(userDat);
      setUserData(userDat)
      setAuthToken(authToken);

      const response = await fetch(
        "https://animal-tracking.onrender.com/api/v1/animals/users",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log("Data received:", data);
        setAnimalData(data);
      } else {
        console.error("Failed to fetch data:", response.statusText);
        Alert.alert("Failed to fetch data. Please try again later.");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      Alert.alert("An error occurred while fetching user data.");
    } finally {
      setLoading(false); // Stop loading once the data is fetched
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
          style={styles.map}
          initialRegion={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          <Marker
            coordinate={{ latitude: 37.78825, longitude: -122.4324 }}
            title={"My Marker"}
            description={"Some description"}
          />
        </MapView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'black',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 60,
    backgroundColor: '#000',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    zIndex: 1,
  },
  backButton: {
    position: 'absolute',
    left: 10,
    top: 20,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  map: {
    flex: 1,
    marginTop: 60,
  },
});

export default PredictMap;
