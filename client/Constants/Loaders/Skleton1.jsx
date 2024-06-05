import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated } from 'react-native';

const Skeleton1 = () => {
  const fadeAnim = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 0.3,
          duration: 800,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [fadeAnim]);

  const renderSkeletonItem = (index) => (
    <View key={index} style={styles.itemContainer}>
      <Animated.View style={[styles.avatar, { opacity: fadeAnim }]} />
      <View style={styles.textContainer}>
        <Animated.View style={[styles.statusIndicator, { opacity: fadeAnim }]} />
        <Animated.View style={[styles.itemText, { opacity: fadeAnim }]} />
        <Animated.View style={[styles.lastSeenText, { opacity: fadeAnim }]} />
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Animated.View style={[styles.circle, { opacity: fadeAnim }]} />
        <Animated.View style={[styles.circleText, { opacity: fadeAnim }]} />
        <Animated.View style={[styles.circleSubText, { opacity: fadeAnim }]} />
      </View>

      <View style={styles.searchContainer}>
        <Animated.View style={[styles.searchIcon, { opacity: fadeAnim }]} />
        <Animated.View style={[styles.searchInput, { opacity: fadeAnim }]} />
      </View>

      {[...Array(6)].map((_, index) => renderSkeletonItem(index))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop:60,
    flex: 1,
    width:'100%',
    backgroundColor: '#fff',
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  circle: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: '#E0E0E0',
    marginBottom: 10,
  },
  circleText: {
    width: 80,
    height: 20,
    borderRadius: 4,
    backgroundColor: '#E0E0E0',
    marginBottom: 4,
  },
  circleSubText: {
    width: 60,
    height: 16,
    borderRadius: 4,
    backgroundColor: '#E0E0E0',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 10,
    backgroundColor: '#F0F0F0',
    borderRadius: 10,
    marginHorizontal: 20,
  },
  searchIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#E0E0E0',
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    height: 40,
    borderRadius: 4,
    backgroundColor: '#E0E0E0',
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E0E0E0',
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
  },
  statusIndicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#E0E0E0',
    marginBottom: 4,
  },
  itemText: {
    width: '70%',
    height: 16,
    borderRadius: 4,
    backgroundColor: '#E0E0E0',
    marginBottom: 4,
  },
  lastSeenText: {
    width: '50%',
    height: 14,
    borderRadius: 4,
    backgroundColor: '#E0E0E0',
  },
});

export default Skeleton1;
