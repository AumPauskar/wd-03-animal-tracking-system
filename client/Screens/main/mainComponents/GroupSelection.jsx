import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  Modal,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from '@react-navigation/native';
import { useCallback } from "react";

const GroupSelection = () => {
  const [animalData, setAnimalData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [groupName, setGroupName] = useState("");
  const [selectedAnimals, setSelectedAnimals] = useState([]);
  const [userData, setuserData] = useState(null)
  const navigation = useNavigation();

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const authToken = await AsyncStorage.getItem("authToken");
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
      setuserData(userDat)

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
    }
  };

  const filteredAnimalData = animalData.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAnimalSelect = (animal) => {
    if (selectedAnimals.includes(animal)) {
      setSelectedAnimals(selectedAnimals.filter((item) => item !== animal));
    } else {
      setSelectedAnimals([...selectedAnimals, animal]);
    }
  };
  
  
  const handleCreateGroup = async () => {
    try {
      const selectedAnimalIds = selectedAnimals.map(animal => animal._id);
      console.log("Selected Animal IDs:", selectedAnimalIds);
      console.log("Group Name:", groupName);
  
      const authToken = await AsyncStorage.getItem("authToken");
      if (!authToken) {
        Alert.alert(
          "Authentication Error",
          "Authentication token not found. Please sign in again."
        );
        return;
      }

      console.log(userData._id)
  
      const requestBody = {
        name: groupName,
        userId: userData._id, // Replace with actual user ID
        allowedDist: 50, // Replace with the desired allowed distance
        animals: selectedAnimalIds,
      };
  
      const response = await fetch("https://animal-tracking.onrender.com/api/v1/groups", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${authToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });
  
      if (response.ok) {
        // Reset modal state
        setModalVisible(false);
        setGroupName("");
        Alert.alert("Group Created", `Group "${groupName}" has been created.`);
        
        // Navigate back to the previous screen
        navigation.goBack(); // Assuming 'navigation' prop is passed from the parent component
      } else {
        console.error("Failed to create group:", response.statusText);
        Alert.alert("Failed to create group. Please try again later.");
      }
    } catch (error) {
      console.error("Error creating group:", error);
      Alert.alert("An error occurred while creating the group.");
    }
  };
  

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
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
      <ScrollView style={styles.scrollView}>
        {filteredAnimalData.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.itemContainer,
              selectedAnimals.includes(item) && styles.selectedItemContainer,
            ]}
            onPress={() => handleAnimalSelect(item)}
          >
            <Text style={styles.itemText}>{item.name}</Text>
            <Text style={styles.lastSeenText}>last seen 1 second ago</Text>
            {selectedAnimals.includes(item) && (
              <Ionicons name="checkmark-circle" size={24} color="#32CD32" />
            )}
          </TouchableOpacity>
        ))}
      </ScrollView>
      {selectedAnimals.length >= 2 && (
        <TouchableOpacity
          style={styles.confirmButton}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.confirmButtonText}>Create Group</Text>
        </TouchableOpacity>
      )}

      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContent}>
            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              style={styles.closeButton}
            >
              <Ionicons name="close" size={24} color="black" />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Enter Group Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Group Name"
              value={groupName}
              onChangeText={setGroupName}
            />
            <TouchableOpacity
              style={styles.createButton}
              onPress={handleCreateGroup}
            >
              <Text style={styles.createButtonText}>Create Group</Text>
            </TouchableOpacity>
          </View>
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
    marginHorizontal: 20,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 10,
    fontSize: 16,
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 20,
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderRadius: 10,
    backgroundColor: "#f9f9f9",
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#eee",
  },
  selectedItemContainer: {
    backgroundColor: "#d0f0d0", // Slight green highlight for selected items
  },
  itemText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  lastSeenText: {
    color: "gray",
    fontSize: 14,
  },
  confirmButton: {
    backgroundColor: "#32CD32",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    margin: 20,
  },
  confirmButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    width:"80%",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  input: {
    width: "100%",
    padding: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    marginBottom: 20,
  },
  createButton: {
    backgroundColor: "#32CD32",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    width: "100%",
  },
  createButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
  },
});

export default GroupSelection;

