import React, { useState, useEffect } from 'react';
import { Alert, StyleSheet, View, Image } from 'react-native';
import MapView, { Marker, Circle } from 'react-native-maps';
import * as Notifications from 'expo-notifications';
import { useNavigation } from '@react-navigation/native';

const goatImageUrl = "https://w7.pngwing.com/pngs/708/923/png-transparent-goat-animal-farm-vector-thumbnail.png";

// Request permissions
async function requestPermissions() {
  const { status } = await Notifications.requestPermissionsAsync();
  if (status !== 'granted') {
    alert('No notification permissions!');
    return false;
  }
  return true;
}

// Set a handler for notifications
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

const MainMap = () => {
  const nav = useNavigation();
  const [animals, setAnimals] = useState([
    { id: 1, latitude: 37.78825, longitude: -122.4324, color: 'red' },
    { id: 2, latitude: 37.78835, longitude: -122.4326, color: 'blue' },
    { id: 3, latitude: 37.78845, longitude: -122.4328, color: 'green' },
    { id: 4, latitude: 37.78855, longitude: -122.4330, color: 'orange' },
    { id: 5, latitude: 37.78865, longitude: -122.4332, color: 'purple' },
    // Add more animals here as needed
  ]);

  const initialCenter = { latitude: 37.78845, longitude: -122.4330 }; // Initial center
  const initialRadius = 500; // Initial radius in meters
  const stepSize = 0.0001; // Adjust this value to control the step size

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimals(prevAnimals => (
        prevAnimals.map(animal => ({
          ...animal,
          // Move each animal forward in the straight line
          longitude: animal.longitude + stepSize
        }))
      ));
    }, 200);

    return () => clearInterval(interval);
  }, []);

  // Function to calculate the center of the first four markers
  const calculateCenter = () => {
    let sumLat = 0;
    let sumLng = 0;

    animals.slice(0, 4).forEach(animal => {
      sumLat += animal.latitude;
      sumLng += animal.longitude;
    });

    const center = {
      latitude: sumLat / 4,
      longitude: sumLng / 4,
    };

    return center;
  };

  // Calculate the current center based on the first four markers
  const center = calculateCenter();

  // Check if marker with id 5 moves outside the circle after 5 seconds
  useEffect(() => {
    setTimeout(() => {
      setAnimals(prevAnimals => (
        prevAnimals.map(animal => {
          if (animal.id === 5) {
            return {
              ...animal,
              longitude: animal.longitude + 0.01 // Move marker 5 outside the circle
            };
          }
          return animal;
        })
      ));
    }, 9000);
  }, []);
  
  const [markerOutsideCircle, setMarkerOutsideCircle] = useState(false); // Flag to track if marker is outside the circle
  useEffect(() => {
    if (!markerOutsideCircle) {
      const isOutsideCircle = animals.some(animal => {
        if (animal.id === 5) {
          const distance = Math.sqrt(
            Math.pow(animal.latitude - center.latitude, 2) +
            Math.pow(animal.longitude - center.longitude, 2)
          );
          return distance > initialRadius / 111300; // 1 degree latitude is approximately 111300 meters
        }
        return false;
      });
  
      if (isOutsideCircle) {
        console.log("Marker 5 is outside the radius circle");
        // Alert.alert(
        //     "Animal 5 is outside",
        //     "",
        //     [
        //       {
        //         text: "OK",
        //         onPress: () => {
        //           nav.navigate('animalList');
        //         }
        //       }
        //     ],
        //     { cancelable: false }
        //   );    
          
          setMarkerOutsideCircle(true); // Set the flag to true to prevent further console logs

        // Schedule a notification
        Notifications.scheduleNotificationAsync({
          content: {
            title: "Warning!",
            body: 'Animal 5 is outside the radius circle.',
          },
          trigger: null,
        });
      }
    }
  }, [animals, center, initialRadius, markerOutsideCircle]);

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {animals.map(animal => (
          <Marker
            key={animal.id}
            coordinate={{ latitude: animal.latitude, longitude: animal.longitude }}
            title={`Animal ${animal.id}`}
            description={`This is animal ${animal.id}`}
          >
            <Image
              source={{ uri: goatImageUrl }}
              style={styles.markerImage}
            />
          </Marker>
        ))}
        <Circle
          center={center}
          radius={initialRadius} // Use the initial radius
          strokeColor={'red'} // Red color for the stroke
          fillColor={'rgba(255,0,0,0.1)'} // Adjust the color and opacity of the fill
        />
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  markerImage: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: '#fff',
  },
});

export default MainMap;
