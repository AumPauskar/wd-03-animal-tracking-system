import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from "@react-native-async-storage/async-storage";

const DisplayMembers = () => {
  const route = useRoute();
  const { group, imageUrl } = route.params;
  const navigation = useNavigation();

  const handleBackPress = () => {
    navigation.goBack();
  };

  const [animalData, setAnimalData] = useState([]); // State to store fetched animal data

  useEffect(() => {
    fetchAnimalData();
  }, []);

  const fetchAnimalData = async () => {
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
        `https://animal-tracking.onrender.com/api/v1/groups/${group._id}/animals`,
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
        console.log(data)
        setAnimalData(data.content.animals);
      } else {
        console.error("Failed to fetch data:", response.statusText);
        Alert.alert("Failed to fetch data. Please try again later.");
      }
    } catch (error) {
      console.error("Error fetching animal data:", error);
      Alert.alert("An error occurred while fetching animal data.");
    }
  };

  return (
    <LinearGradient
      colors={['#FFC0CB', '#87CEEB']}
      style={styles.linearGradient}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
          <View style={styles.content}>
            <Image source={{ uri: imageUrl }} style={styles.avatar} />
            <Text style={styles.groupName}>{group.name}</Text>
            <Text style={styles.allowedDist}>Allowed Distance: {group.allowedDist}</Text>
            <Text style={styles.membersTitle}>Group Members</Text>
            <ScrollView style={styles.membersContainer}>
              {animalData.map((animal, index) => (
                <View style={styles.memberItem} key={index}>
                  <Image source={{ uri: imageUrl }} style={styles.memberAvatar} />
                  <Text style={styles.memberName}>{animal.name}</Text>
                </View>
              ))}
            </ScrollView>
          </View>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 20,
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    zIndex: 1,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: 60,
  },
  avatar: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
    borderWidth: 3,
    borderColor: '#fff',
  },
  groupName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
    textAlign: 'center',
  },
  allowedDist: {
    fontSize: 18,
    color: '#fff',
    marginBottom: 20,
    textAlign: 'center',
  },
  membersTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
    textAlign: 'center',
  },
  membersContainer: {
    flex: 1,
    width: '100%',
    marginTop: 10,
  },
  memberItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 10,
    padding: 10,
  },
  memberAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
    borderWidth: 2,
    borderColor: '#fff',
  },
  memberName: {
    fontSize: 16,
    color: '#fff',
  },
});

export default DisplayMembers;