import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useRoute } from '@react-navigation/native';

const EventDetails = () => {
  const route = useRoute();
  const { event } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>{event.name}</Text>
      <Text style={styles.details}>{event.details}</Text>
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
    marginBottom: 20
  },
  details: {
    fontSize: 18,
    textAlign: 'center'
  }
});

export default EventDetails;
