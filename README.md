# Event Recommender App

## Group Name:
[Event Recommender Dev Group]

## Team Members:
- [Dipak Sunar]
- [Sean Clewis]

## High Level Design:

### Server:
A client server architecture, where server gathers the events where client(mobile app) lets server know the preferences and location of the user. The server will then recommend the user with the events they might want to join/visit.

To run the server, first run python3 create_database.py to set up the database. you will get a users.db file in your directory

Next run the server, python3 server.py

The server accepts request from the client and will perform the appropriate actions based on the data recieved

A test client file has been created to simulate sending data to server

All python3 client.py or python3 client.py -h to bring up the help menu that displays all flags and commands available

All the commands in the help menu are fully functional. The help menu will show you the flags available, how to run the commands, and the flags required per command. 

The server accepts the commands sent to the client via JSON data. After reciving a command the server will display the address from the client that requested the command as well as the command and the JSON data sent. The server will then send JSON data back to the client. The content varies per command, However, the general format is a status which indicates if the request succeeded or failed and a message from the server. 

The server sets up a socket using local host on port 9000. IT then proceeds to bind, listen, then accept any requests from clients. 

### Client:


For the client side, follows are the details:
- It is developed using React Native for the front end with expo framework.
- When user signs in, it uses Clerk for user authentication using Gmail.
- Hygraph is used to fetch content from a content repository using an GraphQL API.
- Uses React Navigation Library for tab navigation.
- Uses Google Fonts for custom fonts.
- Expo Go app is used to text the development until published to App Store or Google Play Store.
- Uses Ticket Master's API to populate events on the Map navigation page. 

## Problems Encountered and Solutions:(Client Side)

### Problem 1:
Which language or platform to use for development:
I want into a issue of not knowing anything about app development to meet the requirement listed in the assignments. I started with wanting to use Swift since I have some prior knowledge. That was unfruitful. Quickly switched to Java and Cotlin and ran into same issue of leaerning curve and developmental challenges. It was hard to find resources to learn those languages as well. Finally I settled with React Native and expo framework to develop the entire client side of the project. This was also challenge since I have never used Java Script. After a lot of tutorials, trials and errors. The finished product is the result.

### Problem 2:
Hardware issues:
I started the project in Macbook Laptop. Quicklt ran into environment setup issues. I was not able to install any dependencies needed for the development. I tried resolving the issue but did not have a lot of time just to fix the issue since grading was based on development and not fixing and resolving the issue. 

I used iMac for the entire development. I ran into multiple issues installing dependencies here as well but I was able to resolve issues with a lot of Google search and reading articles on the errors. One veryhelpful tips I found was if I get error installing dependencies, install it manually via cmd and use the option --force. 

## Libraries Used:
- [React Native Library]: Used built-in-primitive libraries like
   ```javescript
  <View> <Text> <TextInput> <FlatList> <OnPress> etc.


