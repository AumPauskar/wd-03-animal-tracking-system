import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const MainMap = () => {
  const [animals, setAnimals] = useState([
    { id: 1, latitude: 37.78825, longitude: -122.4324, color: 'red' },
    { id: 2, latitude: 37.78875, longitude: -122.4328, color: 'blue' },
    { id: 3, latitude: 37.78835, longitude: -122.4330, color: 'green' },
    { id: 4, latitude: 37.78795, longitude: -122.4325, color: 'orange' },
    { id: 5, latitude: 37.78755, longitude: -122.4322, color: 'purple' },
    // Add more animals here as needed
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      const destination = { latitude: 37.78028, longitude: -122.40550 }; // Destination point
      setAnimals(prevAnimals => (
        prevAnimals.map(animal => ({
          ...animal,
          // Move each animal towards the destination point
          latitude: moveTowardDestination(animal.latitude, destination.latitude),
          longitude: moveTowardDestination(animal.longitude, destination.longitude)
        }))
      ));
    }, 200);

    return () => clearInterval(interval);
  }, []);

  // Function to calculate the next position of the animal towards the destination
  const moveTowardDestination = (current, destination) => {
    const step = (destination - current) / 100; // Adjust this value for speed
    return current + step;
  };

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
            pinColor={animal.color}
          />
        ))}
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
});

export default MainMap;