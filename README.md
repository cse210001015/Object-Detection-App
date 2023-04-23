# Object Detection App Documentation

## Introduction

This app is built using React Native Expo and enables users to detect objects in images or videos using an object detection algorithm. The app provides a user interface that allows users to interact with the app and view the detected objects.

## Installation

To install the app, follow these steps:

Run one of the backend servers:

https://colab.research.google.com/drive/1QX1DsIdsJfnIfzDnh-ysDYIfIlna37UV?usp=sharing

https://github.com/cse210001015/Object-Detection-App-Backend

Then run the backend to get a public url of ngrok.

Replace the url for post request/socket connection in the frontend with this url in 3 files:ImageDetection.js,ObjectDetection.js,ObjectDetectionpy.js.

Clone the repository from GitHub: https://github.com/cse210001015/Object-Detection-App-Frontend

Navigate to the project directory using a terminal window.

Run the following command to install the necessary dependencies:

npm install

Start the app using the following command:

npx expo start

Open the Expo app on your mobile device and scan the QR code displayed in the terminal window.

## User Interface

The app provides the following user interface elements:

Image and Video Input: Users can input an image or a video to detect objects using the camera or selecting it from the gallery.

## Supported Input Formats

The app can handle the following image and video formats:

Image Formats: JPEG, PNG

Video Formats: MP4, MOV

## Output Formats

The app provides the following output formats:

Visualizations: A visualization of the detected objects overlaid on the input image or video.

## Troubleshooting

If you encounter any issues while using the app, try the following troubleshooting steps:

Ensure that you have the latest version of the app installed.

Check that your device is connected to the internet.

Ensure that the input image or video is in a supported format.
