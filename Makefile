# Makefile for React Native app with Expo

# Define variables
PROJECT_NAME := EventRecommender
EXPO_CLI := npx expo
BUILD_DIR := build

# Define targets
.PHONY: all install start build clean

all: install

# Install dependencies
install:
    @echo "Installing dependencies..."
    $(EXPO_CLI) install

# Start the Expo development server
start:
    @echo "Starting Expo development server..."
    $(EXPO_CLI) npm run start

# Build the app for production
build:
    @echo "Building the app for production..."
    $(EXPO_CLI) build

# Clean up build artifacts
clean:
    @echo "Cleaning up build artifacts..."
    rm -rf $(BUILD_DIR)


