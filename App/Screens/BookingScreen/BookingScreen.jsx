import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import * as Location from 'expo-location';

const TicketDetails = () => {
    const [locationName, setLocationName] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [userInput, setUserInput] = useState('');
    const [userMessages, setUserMessages] = useState([]);
    const [updateTime, setUpdateTime] = useState(300);

    // Function to get the user's location name
    const getLocationName = async (latitude, longitude) => {
        try {
            let location = await Location.reverseGeocodeAsync({ latitude, longitude });
            setLocationName(location[0].name);
        } catch (error) {
            console.error(error);
            setErrorMsg('Error getting location name');
        }
    };

    // Function to get the user's location
    const getLocation = async () => {
        try {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            getLocationName(location.coords.latitude, location.coords.longitude);
        } catch (error) {
            console.error(error);
            setErrorMsg('Error getting location');
        }
    };

    // Update user's location every 5 minutes
    useEffect(() => {
        getLocation();
        const interval = setInterval(() => {
            getLocation();
        }, 5 * 60 * 1000);

        return () => clearInterval(interval);
    }, []);

    // Update timer every second
    useEffect(() => {
        const interval = setInterval(() => {
            setUpdateTime((prevUpdateTime) => prevUpdateTime - 1);
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    // Function to handle user input
    const handleInputChange = (text) => {
        setUserInput(text);
    };

    // Function to handle sending message to server (placeholder)
    const handleSendMessage = () => {
        // Placeholder for sending message to server
        console.log('Message sent:', userInput);
        setUserMessages([...userMessages, userInput]);
        setUserInput('');
    };

    // Convert seconds to mm:ss format
    const formatTime = (timeInSeconds) => {
        const minutes = Math.floor(timeInSeconds / 60);
        const seconds = timeInSeconds % 60;
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    return (
        <View style={styles.container}>
            {/* Display user's location name */}
            {errorMsg ? <Text>{errorMsg}</Text> : locationName ? (
                <Text style={styles.location}>{`Location: ${locationName}`}</Text>
            ) : (
                <Text>Loading location...</Text>
            )}

            {/* Display timer */}
            <Text style={styles.timer}>{`Updating every 5 minutes: ${formatTime(updateTime)}`}</Text>

            {/* TextInput for user input */}
            <TextInput
                style={styles.input}
                placeholder="Enter your preferences..."
                onChangeText={handleInputChange}
                value={userInput}
            />

            {/* Display user messages */}
            {userMessages.map((message, index) => (
                <Text key={index}>{message}</Text>
            ))}

            {/* Button to send message to server */}
            <Button title="Send it to server" onPress={handleSendMessage} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: -200,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    location: {
        marginBottom: 20,
        fontSize: 16,
    },
    timer: {
        marginBottom: 20,
        fontSize: 16,
    },
    input: {
        marginBottom: 20,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        width: '100%',
    },
});

export default TicketDetails;
