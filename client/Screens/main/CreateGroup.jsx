import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
const CreateGroup = () => {
  const [searchTerm, setSearchTerm] = useState("");
const nav = useNavigation()
  const handleChatPress = (chat) => {
    console.log("Selected Chat:", chat);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <Text style={styles.header}>Chats</Text>
      <View style={styles.circleContainer}>
        <View style={styles.circle}>
          <Text style={styles.circleText}>5 active</Text>
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
      <View style={styles.chatListContainer}>
        {/* The chat interface */}
        {chatData.map((chat, index) => (
          <View key={index} style={styles.chatItem}>
            <Image source={{ uri: chat.avatar }} style={styles.avatar} />
            <View style={styles.chatContent}>
              <Text style={styles.chatName}>{chat.name}</Text>
              <Text style={styles.chatMessage}>{chat.message}</Text>
              <Text style={styles.chatDate}>{chat.date}</Text>
            </View>
            <View style={styles.chatActions}>
              <TouchableOpacity style={styles.chatActionButton}>
                <Ionicons name="chatbox-outline" size={24} color="black" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.chatActionButton}>
                <Ionicons name="call-outline" size={24} color="black" />
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>
      <TouchableOpacity style={styles.addButton}
      
      onPress={()=>nav.navigate('groupSelection')}
      >
        <Ionicons name="add" size={30} color="white" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const chatData = [
  {
    avatar: "https://randomuser.me/api/portraits/women/1.jpg",
    name: "Lillian Lilly",
    message: "Which character do you like in Harry Potter?",
    date: "Aug 21, 2019",
  },
  {
    avatar: "https://randomuser.me/api/portraits/women/2.jpg",
    name: "Dorothy",
    message: "Sometimes, not really",
    date: "Aug 21, 2019",
  },
  {
    avatar: "https://randomuser.me/api/portraits/men/3.jpg",
    name: "Benjamin Zoe",
    message: "Good Morning, Have a nice day 😊",
    date: "Jul 29, 2019",
  },
  {
    avatar: "https://randomuser.me/api/portraits/women/4.jpg",
    name: "Virginia Ashuva",
    message: "Hey there! What's up?",
    date: "Sep 15, 2019",
  },
  {
    avatar: "https://randomuser.me/api/portraits/men/5.jpg",
    name: "Arnakhar Calvin",
    message: "I am on the way, Where are you?",
    date: "Sep 15, 2019",
  },
];

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
  chatContent: {
    flex: 1,
  },
  chatName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  chatMessage: {
    fontSize: 14,
    color: "gray",
  },
  chatDate: {
    fontSize: 12,
    color: "gray",
  },
  chatActions: {
    flexDirection: "row",
  },
  chatActionButton: {
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
});

export default CreateGroup;
