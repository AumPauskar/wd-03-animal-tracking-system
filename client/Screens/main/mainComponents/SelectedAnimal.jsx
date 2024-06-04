import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, Animated } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';

const SelectedAnimal = ({ route }) => {
  const { animalData } = route.params;

  const fadeInAnim = React.useRef(new Animated.Value(0)).current;
  const [showHistory, setShowHistory] = useState(false);

  useEffect(() => {
    Animated.timing(fadeInAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start(() => {
      setShowHistory(true);
    });
  }, [fadeInAnim]);

  // Static historical data
  const historicalData = [
    { id: "1", date: "2024-06-01", activity: "Active Full day" },
    { id: "2", date: "2024-05-30", activity: "Active Full day" },
    { id: "3", date: "2024-05-28", activity: "Active Full day" },
    { id: "4", date: "2024-05-28", activity: "Active Full day" },
    { id: "5", date: "2024-05-28", activity: "Active Full day" },
    { id: "6", date: "2024-05-28", activity: "Active Full day" },
  ];

  return (
    <LinearGradient
      colors={['#F0F8FF', '#87CEEB', '#FFFFFF']}      
      style={styles.container}
    >
      <Animated.View style={[styles.innerContainer, { opacity: fadeInAnim }]}>
        <View style={styles.imageContainer}>
          <Image
            source={{
              uri: "https://png.pngtree.com/png-vector/20220616/ourmid/pngtree-vector-of-cow-head-design-on-white-background-png-image_5049060.png",
            }}
            style={styles.image}
            resizeMode="cover"
          />
        </View>
        <View style={styles.detailsContainer}>
          <Text style={styles.type}>Type: Cow</Text>
          <Text style={styles.name}>{animalData.name}</Text>
          <Text style={styles.status}>Active</Text>
          <Text style={styles.lastSeen}>Last seen 1 second ago</Text>
          <View style={styles.historySeparator} />
          <Text style={styles.historyTitle}>Historical Data:</Text>
          {showHistory && (
            <View style={styles.historyContainer}>
              {historicalData.map((item, index) => (
                <View key={item.id} style={styles.historyItem}>
                  <View style={styles.historyDot} />
                  <View style={styles.historyContent}>
                    <Text style={styles.historyDate}>{item.date}</Text>
                    <Text style={styles.historyActivity}>{item.activity}</Text>
                  </View>
                  {index !== historicalData.length - 1 && <View style={styles.historyLine} />}
                </View>
              ))}
            </View>
          )}
        </View>
      </Animated.View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    flex: 1,
    alignItems: "center",
    paddingTop: 20,
  },
  imageContainer: {
    width: 150,
    height: 150,
    borderRadius: 75,
    overflow: "hidden",
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 8,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  detailsContainer: {
    alignItems: "center",
    paddingHorizontal: 20,
  },
  type: {
    fontSize: 18,
    marginBottom: 5,
    color: "#222",
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#222",
  },
  status: {
    fontSize: 18,
    marginBottom: 5,
    color: "#4CAF50", // Green color for active status
  },
  lastSeen: {
    fontSize: 16,
    marginBottom: 10,
    color: "#555",
  },
  historyTitle: {
    fontSize: 15,
    marginBottom: 40,
    color: "#222",
    fontWeight: "bold",
    textAlign: "center",
  },
  historyContainer: {
    width: "100%",
    alignItems: "center",
  },
  historyItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    position: "relative",
  },
  historyDot: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "#4CAF50", // Green color for history dot
    marginRight: 10,
  },
  historyContent: {
    flex: 1,
  },
  historyDate: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#222",
  },
  historyActivity: {
    fontSize: 14,
    color: "#666",
  },
  historyLine: {
    position: "absolute",
    top: 20,
    left: 9,
    width: 2,
    height: "100%",
    backgroundColor: "#4CAF50", // Green color for history line
  },
  historySeparator: {
    height: 20,
  },
});

export default SelectedAnimal;
