import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Modal,
  TextInput,
  TouchableOpacity,
  Animated,
  Alert,
  Image,
  ScrollView,
  ActivityIndicator
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import Skeleton1 from "../../Constants/Loaders/Skleton1";

const AnimalList = () => {
  const nav = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [newAnimalName, setNewAnimalName] = useState("");
  const [animation] = useState(new Animated.Value(0));
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

  const filteredAnimalData = animalData.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddAnimal = async () => {
    try {
      console.log(userData)
      console.log(newAnimalName)
      console.log(userData._id)
      const response = await fetch("https://animal-tracking.onrender.com/api/v1/animals", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${authToken}`,

          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: newAnimalName,
          userId: userData._id,
          animalTypeId: "665f5b70eb0bdc7de27ec473",
        }),
      });

      const data = await response.json();
      console.log(data)
  
      if (response.ok) {
        console.log("Animal added successfully.");
        fetchUserData();
      } else {
        console.error("Failed to add animal:", response.statusText);
        Alert.alert("Failed to add animal. Please try again later.");
      }
    } catch (error) {
      console.error("Error adding animal:", error);
      Alert.alert("An error occurred while adding the animal.");
    }
  
    // Hide the modal
    setModalVisible(false);
  };

  const handleAnimalPress = (animal) => {
    console.log("Selected Animal:", animal);
    nav.navigate("selectedAnimal", { animalData: animal });
  };

  const toggleModal = () => {
    if (modalVisible) {
      Animated.timing(animation, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start(() => setModalVisible(false));
    } else {
      setModalVisible(true);
      Animated.timing(animation, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  };

  const modalScale = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0.8, 1],
  });

  const modalOpacity = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  // Function to generate random profile picture URLs
  const generateFakeProfilePictureUrl = () => {
    const images = [
      "https://w7.pngwing.com/pngs/708/923/png-transparent-goat-animal-farm-vector-thumbnail.png",
      "https://w7.pngwing.com/pngs/565/912/png-transparent-rabbit-animal-hare-silhouette-nature-vector-thumbnail.png",
      "https://w7.pngwing.com/pngs/1013/110/png-transparent-pointer-dog-doggy-outline-animal-coat-shape-vector-thumbnail.png",
      "https://w7.pngwing.com/pngs/422/566/png-transparent-the-horse-konik-animal-is-the-stroke-shape-shadow-the-silhouette-figure-vector-thumbnail.png",
      "https://w7.pngwing.com/pngs/862/672/png-transparent-cat-kitty-head-domestic-animal-matou-feline-vector-thumbnail.png",
    ];
    const randomIndex = Math.floor(Math.random() * images.length);
    return images[randomIndex];
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      {loading ? (
        <Skeleton1 />
      ) : (
        <>
              <Text style={styles.header}>Tags</Text>

          <View style={styles.circleContainer}>
            <View style={styles.circle}>
              <Text style={styles.circleText}>
                {filteredAnimalData.length} active
              </Text>
              <Text style={styles.circleSubText}>70% spent</Text>
            </View>
          </View>
          <View style={styles.searchContainer}>
            <Ionicons
              name="search"
              size={24}
              color="black"
              style={styles.searchIcon}
            />
            <TextInput
              style={styles.searchInput}
              placeholder="Search by name..."
              value={searchTerm}
              onChangeText={setSearchTerm}
            />
          </View>
          <ScrollView style={styles.listContainer}>
            {filteredAnimalData.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={styles.itemContainer}
                onPress={() => handleAnimalPress(item)}
              >
                <Image
                  source={{ uri: generateFakeProfilePictureUrl() }}
                  style={styles.avatar}
                />
                <View style={styles.textContainer}>
                  <View style={[styles.statusIndicator, item.active ? styles.active : styles.inactive]} />
                  <Text style={styles.itemText}>{item.name}</Text>
                  <Text style={styles.lastSeenText}>{item.active ? 'last seen 1 second ago' : 'Inactive'}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </>
      )}
      <TouchableOpacity style={styles.addButton} onPress={toggleModal}>
        <Ionicons
          name={modalVisible ? "close" : "add"}
          size={30}
          color="white"
        />
      </TouchableOpacity>
      <Modal
        transparent={true}
        visible={modalVisible}
        animationType="none"
        onRequestClose={toggleModal}
      >
        <View style={styles.modalContainer}>
          <Animated.View
            style={[
              styles.modalContent,
              { transform: [{ scale: modalScale }], opacity: modalOpacity },
            ]}
          >
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Add New Animal</Text>
              <TouchableOpacity
                onPress={toggleModal}
                style={styles.closeButton}
              >
                <Ionicons name="close" size={24} color="black" />
              </TouchableOpacity>
            </View>
            <TextInput
              style={styles.input}
              placeholder="Animal Name"
              value={newAnimalName}
              onChangeText={setNewAnimalName}
            />
            <TouchableOpacity
              style={styles.submitButton}
              onPress={handleAddAnimal}
            >
              <Text style={styles.submitButtonText}>Add Animal</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  circleContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  circle: {
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#32CD32",
    borderRadius: 75,
    width: 150,
    height: 150,
  },
  circleText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#32CD32",
  },
  circleSubText: {
    fontSize: 12,
    color: "gray",
  },
  listContainer: {
    flex: 1,
    paddingHorizontal: 20,
    marginTop: 10,
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  textContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  statusIndicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  active: {
    backgroundColor: "#32CD32",
  },
  inactive: {
    backgroundColor: "red", // Change this line to set the inactive state color to red
  },
  itemText: {
    flex: 1,
    fontSize: 16,
  },
  lastSeenText: {
    color: "gray",
    fontSize: 14,
  },
  addButton: {
    position: "absolute",
    right: 20,
    bottom: 20,
    backgroundColor: "#32CD32",
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: "white",
    borderRadius: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    width: "100%",
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "black",
  },
  closeButton: {
    backgroundColor: "transparent",
  },
  input: {
    width: "100%",
    padding: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    marginBottom: 20,
    backgroundColor: "white",
  },
  submitButton: {
    backgroundColor: "#32CD32",
    padding: 15,
    borderRadius: 10,
    width: "100%",
    alignItems: "center",
    marginTop: 10,
  },
  submitButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 10,
    backgroundColor: "#F0F0F0",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginHorizontal: 20, // Added margin for better spacing from edges
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 10,
    fontSize: 16, // Increased font size for better visibility
  },
});

export default AnimalList;
                 
