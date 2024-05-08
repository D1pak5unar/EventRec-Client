import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, Text, TextInput, FlatList, Linking } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import * as Location from 'expo-location';
import Colors from '../../Utils/Colors';

const API_KEY = 'b32tvrPhPO2fpj3B2Ykfu37pJziPavWD';

export default function MapScreen() {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [events, setEvents] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEvent, setSelectedEvent] = useState(null);
  const mapRef = useRef(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setCurrentLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });

      fetchNearbyEvents(location.coords.latitude, location.coords.longitude);
    })();
  }, []);

  const fetchNearbyEvents = async (latitude, longitude, query = '') => {
    try {
      const response = await fetch(
        `https://app.ticketmaster.com/discovery/v2/events.json?latitudeFilter=${latitude}&longitudeFilter=${longitude}&keyword=${query}&apikey=${API_KEY}`
      );
      const data = await response.json();

      if (data && data._embedded && data._embedded.events) {
        setEvents(data._embedded.events);
      } else {
        setEvents([]);
      }
    } catch (error) {
      console.error('Error fetching events:', error);
      setEvents([]);
    }
  };

  const handleSearch = () => {
    if (currentLocation) {
      fetchNearbyEvents(
        currentLocation.latitude,
        currentLocation.longitude,
        searchQuery
      );
    }
  };

  const handleEventPress = (event) => {
    const { latitude, longitude } = event._embedded.venues[0].location;
    mapRef.current.animateToRegion({
      latitude,
      longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    });
    setSelectedEvent(event);
  };

  const getDirections = () => {
    if (selectedEvent) {
      const { latitude, longitude } = selectedEvent._embedded.venues[0].location;
      const destination = `${latitude},${longitude}`;
      const startingLocation = `${currentLocation.latitude},${currentLocation.longitude}`;
      const url = `https://www.google.com/maps/dir/?api=1&destination=${destination}&origin=${startingLocation}`;

      Linking.openURL(url);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search events"
          value={searchQuery}
          onChangeText={setSearchQuery}
          onSubmitEditing={handleSearch}
        />
      </View>
      {currentLocation ? (
        <MapView
          ref={mapRef}
          style={styles.map}
          initialRegion={{
            latitude: currentLocation.latitude,
            longitude: currentLocation.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          <Marker coordinate={currentLocation} />
          {events.map((event) => (
            <Marker
              key={event.id}
              coordinate={{
                latitude: event._embedded.venues[0].location.latitude,
                longitude: event._embedded.venues[0].location.longitude,
              }}
              title={event.name}
              description={event._embedded.venues[0].name}
            >
              <Callout onPress={() => handleEventPress(event)}>
                <Text>{event.name}</Text>
              </Callout>
            </Marker>
          ))}
        </MapView>
      ) : (
        <Text>{errorMsg || 'Loading...'}</Text>
      )}
      <FlatList
        data={events}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Text style={styles.eventItem} onPress={() => handleEventPress(item)}>
            {item.name}
          </Text>
        )}
        style={styles.eventsList}
      />
      {selectedEvent && (
        <View style={styles.directionsContainer}>
          <Text style={styles.directionsText}>Get directions to:</Text>
          <Text style={styles.eventName}>{selectedEvent.name}</Text>
          <Text
            style={styles.directionsButton}
            onPress={getDirections}
          >
            Get Directions
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  searchContainer: {
    padding: 10,
    backgroundColor: '#f0f0f0',
  },
  searchInput: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    
  },
  map: {
    flex:30,
  },
  eventsList: {
    height: 100,
  },
  eventItem: {
    padding: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  directionsContainer: {
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 25,
    backgroundColor:Colors.LIGHT_GRAY
  },
  directionsText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  eventName: {
    fontSize: 14,
    marginBottom: 10,
  },
  directionsButton: {
    backgroundColor: '#007AFF',
    color: '#fff',
    padding: 10,
    borderRadius: 5,
    textAlign: 'center',
  },
});