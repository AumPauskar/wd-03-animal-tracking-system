import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCallback } from "react";
import Skeleton1 from "../../Constants/Loaders/Skleton1";

const CreateGroup = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const nav = useNavigation();
  const [userData, setUserData] = useState(null);
  const [authToken, setAuthToken] = useState(null);
  const [groupData, setGroupData] = useState([]);
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      fetchUserData();
    }, [fetchUserData])
  );
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

      const response = await fetch(
        "https://animal-tracking.onrender.com/api/v1/groups/user",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
    //   setLoading(true);

      if (response.ok) {
        setGroupData(data);
      } else {
        console.error("Failed to fetch data:", response.statusText);
        Alert.alert("Failed to fetch data. Please try again later.");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      Alert.alert("An error occurred while fetching user data.");
    } finally {
      setLoading(false);
    }
  };

  const filteredGroups = groupData.filter((group) =>
    group.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleChatPress = (group) => {
    console.log("Selected Group:", group);
    const imageUrl = generateFakeProfilePictureUrl(); // Generate image URL
    nav.navigate("displayMembers", { group, imageUrl }); // Pass group and image URL to 'displayMembers' screen
  };

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

  const renderGroupList = () => {
    return filteredGroups.map((group, index) => (
      <TouchableOpacity
        key={index}
        style={styles.chatItem}
        onPress={() => handleChatPress(group)}
      >
        <Image
          source={{ uri: generateFakeProfilePictureUrl() }}
          style={styles.avatar}
        />
        <View style={styles.groupDetails}>
          <View style={styles.nameAndDist}>
            <Text style={styles.chatName}>{group.name}</Text>
            <Text style={styles.allowedDist}>
              Allowed Dist: {group.allowedDist}
            </Text>
          </View>
          <View style={styles.dot} />
        </View>
      </TouchableOpacity>
    ));
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        {/* You can replace Skeleton1 with your skeleton loader component */}
        <Skeleton1 />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <Text style={styles.header}>Groups</Text>
      <View style={styles.circleContainer}>
        <View style={styles.circle}>
          <Text style={styles.circleText}>{groupData.length} active</Text>
          <Text style={styles.circleSubText}>Groups</Text>
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
      <ScrollView style={styles.scrollView}>
        <View style={styles.chatListContainer}>
          {/* Render the filtered group list */}
          {renderGroupList()}
        </View>
      </ScrollView>
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => nav.navigate("groupSelection")}
      >
        <Ionicons name="add" size={30} color="white" />
      </TouchableOpacity>
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
    borderColor: "#9370DB",
    borderRadius: 75,
    width: 150,
    height: 150,
  },
  circleText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#9370DB",
  },
  circleSubText: {
    fontSize: 12,
    color: "gray",
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
  },
  chatListContainer: {
    paddingHorizontal: 20,
    marginTop: 10,
  },
  chatItem: {
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
  groupDetails: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  nameAndDist: {
    flex: 1,
  },
  chatName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  allowedDist: {
    fontSize: 12,
    color: "gray",
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "green",
    marginLeft: 10,
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
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default CreateGroup;
