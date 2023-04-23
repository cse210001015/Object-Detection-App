# Object Detection App Documentation

# Frontend

## Introduction

This app is built using React Native Expo and enables users to detect objects in images or videos using an object detection algorithm. The app provides a user interface that allows users to interact with the app and view the detected objects.

## Installation

To install the app, follow these steps:

Run one of the backend servers:

https://colab.research.google.com/drive/1QX1DsIdsJfnIfzDnh-ysDYIfIlna37UV?usp=sharing

https://github.com/cse210001015/Object-Detection-App/tree/main/Backend

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

# Backend Node js

## Introduction

This Node.js backend is built using the Express framework and is responsible for performing object detection on the input data received from the React Native Expo app. The backend uses the TensorFlow Object Detection API to detect objects in images and videos and returns the results to the app in a specified format.

## Installation

To install the backend do the following steps

Clone the repository from GitHub: https://github.com/cse210001015/Object-Detection-App-Backend

Navigate to the project directory using a terminal window.

Run the following command to install the necessary dependencies:

npm install

Start the backend using the following command:

node index.js

The backend is now running and listening for incoming requests from the app.

##  Object Detection Algorithm

The backend uses the TensorFlow Object Detection API to detect objects in images and videos. The API provides pre-trained models for object detection that can be fine-tuned or used directly for specific use cases. The backend loads the model and performs object detection on the input data, returning the results in the specified output format. The model used is coco ssd which has an apache licence.

## Custom Algorithm

Convert the tensorflow model to tfjs and use load graph model to load the custom model and use it for inferences.

## Troubleshooting

If you encounter any issues while using the backend, try the following troubleshooting steps:

Ensure that you have the latest version of the backend installed.

Check that the app is sending valid input data in the request body.

Ensure that the input data is in a supported format.

Check that the pre-trained model is loaded and functioning correctly.

Check that the output format is correctly specified in the app request.

# Backend Python documentation

You can go the link and run all the code cells. The last cell will generate a ngrok link. Put this link in the frontend in ImageDetection.js in axios.post and in ObjectDetectionpy.js in new Websocket as link/ws.

Now you may run the frontend to run the app allow the last cell to keep running as long as you want to use the app.

To use a custom model for detection load the model using torch.load() and pass it along with path to detect_img and detect_video.

## Algorithm

The code uses yolov7.

Paper:https://arxiv.org/abs/2207.02696. 

Github Link:https://github.com/WongKinYiu/yolov7.

License:GNU General Public License v3.0.
