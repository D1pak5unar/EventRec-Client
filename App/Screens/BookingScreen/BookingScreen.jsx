import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const events = [
  { id: 1, name: 'St. Louis Cardinals vs. Chicago Cubs', date: 'May 5, 2024', time: '7:05 PM', details: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vestibulum cursus augue id tincidunt.' },
  { id: 2, name: 'St. Louis Blues vs. Nashville Predators', date: 'May 6, 2024', time: '8:00 PM', details: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vestibulum cursus augue id tincidunt.' },
  { id: 3, name: 'St. Louis FC vs. Kansas City Rangers', date: 'May 7, 2024', time: '3:00 PM', details: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vestibulum cursus augue id tincidunt.' }
];

const BookingScreen = () => {
  const navigation = useNavigation();

  const handleEventPress = (event) => {
    // Navigate to another screen and pass event details
    navigation.navigate('EventDetails', { event });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Upcoming Sports Events in St. Louis</Text>
      {events.map(event => (
        <TouchableOpacity key={event.id} style={styles.eventContainer} onPress={() => handleEventPress(event)}>
          <Text style={styles.eventName}>{event.name}</Text>
          <Text style={styles.eventDateTime}>{event.date} at {event.time}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    padding: 20
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 50
  },
  eventContainer: {
    backgroundColor: '#ffffff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    width: '100%'
  },
  eventName: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  eventDateTime: {
    fontSize: 16,
    color: '#666666'
  }
});

export default BookingScreen;
