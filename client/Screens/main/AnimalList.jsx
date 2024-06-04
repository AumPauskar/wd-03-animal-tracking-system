import React, { useState } from 'react';
import { View, Text, StyleSheet, StatusBar, Modal, TextInput, TouchableOpacity, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

const animals = [
  { id: '1', name: 'Animal 1', status: 'active', lastSeen: '' },
  { id: '2', name: 'Animal 2', status: 'active', lastSeen: '' },
  { id: '3', name: 'Animal 3', status: 'active', lastSeen: '' },
  { id: '4', name: 'Animal 4', status: '', lastSeen: '1m ago' },
  { id: '5', name: 'Animal 5', status: '', lastSeen: '5m ago' },
  { id: '6', name: 'Animal 6', status: '', lastSeen: '7m ago' },
];

const AnimalList = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [newAnimalName, setNewAnimalName] = useState('');
  const [newAnimalStatus, setNewAnimalStatus] = useState('');
  const [animation] = useState(new Animated.Value(0));

  const handleAddAnimal = () => {
    // Handle adding the new animal
    setModalVisible(false);
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

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <Text style={styles.header}>Tags</Text>
      <View style={styles.circleContainer}>
        <View style={styles.circle}>
          <Text style={styles.circleText}>6 tags active</Text>
          <Text style={styles.circleSubText}>70% spent</Text>
        </View>
      </View>
      <View style={styles.listContainer}>
        {animals.map((item) => (
          <View key={item.id} style={styles.itemContainer}>
            <View style={[styles.statusIndicator, item.status === 'active' ? styles.active : styles.inactive]} />
            <Text style={styles.itemText}>{item.name}</Text>
            {item.lastSeen ? (
              <Text style={styles.lastSeenText}>last seen {item.lastSeen} ago</Text>
            ) : (
              <Text style={styles.activeText}>active</Text>
            )}
          </View>
        ))}
      </View>
      <TouchableOpacity style={styles.addButton} onPress={toggleModal}>
        <Ionicons name={modalVisible ? "close" : "add"} size={30} color="white" />
      </TouchableOpacity>
      <Modal
        transparent={true}
        visible={modalVisible}
        animationType="none"
        onRequestClose={toggleModal}
      >
        <View style={styles.modalContainer}>
          <Animated.View style={[styles.modalContent, { transform: [{ scale: modalScale }], opacity: modalOpacity }]}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Add New Animal</Text>
              <TouchableOpacity onPress={toggleModal} style={styles.closeButton}>
                <Ionicons name="close" size={24} color="black" />
              </TouchableOpacity>
            </View>
            <TextInput
              style={styles.input}
              placeholder="Animal Name"
              value={newAnimalName}
              onChangeText={setNewAnimalName}
            />
            <TextInput
              style={styles.input}
              placeholder="Status"
              value={newAnimalStatus}
              onChangeText={setNewAnimalStatus}
            />
            <TouchableOpacity style={styles.submitButton} onPress={handleAddAnimal}>
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
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  circleContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  circle: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#32CD32',
    borderRadius: 75,
    width: 150,
    height: 150,
  },
  circleText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#32CD32',
  },
  circleSubText: {
    fontSize: 12,
    color: 'gray',
  },
  listContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  statusIndicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  active: {
    backgroundColor: '#32CD32',
  },
  inactive: {
    backgroundColor: 'gray',
  },
  itemText: {
    flex: 1,
    fontSize: 16,
  },
  activeText: {
    color: '#32CD32',
    fontSize: 14,
  },
  lastSeenText: {
    color: 'gray',
    fontSize: 14,
  },
  addButton: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    backgroundColor: '#32CD32',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
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
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    width: '100%',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
  },
  closeButton: {
    backgroundColor: 'transparent',
  },
  input: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    marginBottom: 20,
    backgroundColor: 'white',
  },
  submitButton: {
    backgroundColor: '#32CD32',
    padding: 15,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
    marginTop: 10,
  },
  submitButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default AnimalList;
