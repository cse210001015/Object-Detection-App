// importing several modules, including StyleSheet, Text, View, Image, Pressable, Dimensions, 
// and BackHandler from "react-native". Also, it imports components like Appbar, useTheme,
//  Surface, Snackbar, IconButton from "react-native-paper".

import {
    StyleSheet,
    Text,
    View,
    Image,
    Pressable,
    Dimensions,
    BackHandler,
  } from "react-native";
  import React, { useContext, useEffect, useState, useRef } from "react";
  import {
    Appbar,
    useTheme,
    Surface,
    Snackbar,
    IconButton,
  } from "react-native-paper";
  import ContextRapper from "../helper/context";
  /////////////COMPONENTS ////////////
  import Button from "../components/Button";
  import TextComp from "../components/TextComp";
  import ImageDetection from "../screens/ImageDetection";
  import ObjectDetection from "../screens/ObjectDetection";
  // import * as Device from "expo-device";
  import { NavigationContainer, useNavigation } from '@react-navigation/native';
  import { createNativeStackNavigator } from '@react-navigation/native-stack';
  
  // import * as Notifications from "expo-notifications";
  
  const { height, width } = Dimensions.get("window");
  
   
  
  // "Home" component returns a View component

  // The returned View component consists of an Appbar.Header component with a 
  // menu icon and a bell icon. The header is followed by a body container that 
  // contains a text container with a button, a heading, and options selection cards.
  // The options selection cards are created dynamically using the "map" function and
  // each card consists of an image and a text. When a card is pressed, the "conversionScreen"
  // function is called, and the screen is navigated accordingly. Finally, a footer is added
  // at the bottom of the screen with a text displaying the name of the app. 

  const Home = () => {
   
  
    ///////////////////// SNACKBAR ................
  
    // const [visible, setVisible] = React.useState(false);
  
    // const url = "https://server-three-weld.vercel.app/";
    // const [expoPushToken, setExpoPushToken] = useState("");
    // const [notification, setNotification] = useState(false);
    // const [allNotifications, setallNotifications] = useState([]);
    // const [allCoupouns, setallCoupouns] = useState([]);
    // const notificationListener = useRef();
  
   
    ///////////////////// REACT ANTIVE PAPER //////////////
    const theme = useTheme();
  
    ///////////////////////////////////// CARDS DATA/////////////////////// 


     // "data" contains two cards to select an image and a video for object detection, 
    // which contains the name, image, and the name of the target screen to navigate to.
    // Then it defines a conversionScreen function to navigate to the appropriate target screen.

    const data = [
      {
        name: (
          <TextComp style={styles.cardText} textValue={`Video \nDetection`} />
        ),
        image: (
          <Image
            style={styles.imageStyle}
            source={require("../../assets/images/objectDetection.png")}
          />
        ),
        gotoScreen: "ObjectDetection",
      },
     
      {
        name: (
          <TextComp style={styles.cardText} textValue={`Image detection`} />
        ),
        image: (
          <Image
            style={styles.imageStyle}
            source={require("../../assets/images/qrCode.png")}
          />
        ),
        gotoScreen: "ImageDetection",
      },
      {
        name: (
          <TextComp style={styles.cardText} textValue={`Video \nDetection py`} />
        ),
        image: (
          <Image
            style={styles.imageStyle}
            source={require("../../assets/images/objectDetection.png")}
          />
        ),
        gotoScreen: "ObjectDetectionpy",
      },
    ]
    ///////////////////////// SCREEN SETUP **CONVERSION SCREENS ** //////////////
    const navigation = useNavigation();
    const conversionScreen = (e) => {
          if(e==1){
            navigation.navigate("ImageDetection");
          }
          else if(e==0){ 
            navigation.navigate("ObjectDetection");
          }
          else{
            navigation.navigate("ObjectDetectionpy")
          }
      };
  
    return (
        <View style={styles.container}>
        <Appbar.Header style={{ backgroundColor: "#FEFEFD" }}>
          <Appbar.Action
            icon="menu"
            style={{ marginRight: "auto" }}
            onPress={() => {
              navigation.openDrawer();
            }}
          /> 
          <IconButton
            fontSize={16}
            icon="bell-outline"
            
            isVisible={true}
          />
        </Appbar.Header>
        <View style={styles.bodyContainer}>
          <View style={styles.textContainer}>
          <View>
            <Button
              buttonIcon="google-maps"
              buttonValue="Indian Institute of Technology Indore"
              extraStyleText={{
                fontSize: 11,
                fontFamily: "JakartaSans-Regular",
              }}
              
            />
          </View>
        
                
            <View style={styles.heading}>
              <Text>
                <Text style={styles.spanElement}>Select </Text>
                <Text style={styles.headingElement}>Your Method</Text>
              </Text>
            </View>
          </View>
          {/* ///////////////////// OPTIONS SELECTION CARDS //////////////// */}
          <View
            style={{
              justifyContent: "center",
            }}
            >
            {data.map((printCArds, index) => {
              return (
                <Pressable
                  style={styles.buttonContainer}
                  key={index}
                  onPress={() => {
                    conversionScreen(index);
                  }}
                >
                  <Surface
                    elevation={2}
                    style={{
                      paddingHorizontal: 10,
                      paddingVertical: 10,
                      backgroundColor: "white",
                      borderRadius: 20,
                      height: height <= 600 ? "100%" : 120,
                      maxHeight: 150,
                    }}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        height: "100%",
                        width: "100%",
                      }}
                    >
                      <View
                        style={{
                          backgroundColor: "#FD0C63",
                          width: "40%",
                          // height: "100%",
                          borderRadius: 15,
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        {printCArds.image}
                      </View>
                      <View
                        style={{
                          width: "70%",
                          paddingLeft: 30,
                          justifyContent: "center",
                        }}
                      >
                        {printCArds.name}
                      </View>
                    </View>
                  </Surface>
                </Pressable>
              );
            })}
          </View>
          <View
            style={{
              height: "20%",
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: 20, fontFamily: "JakartaSans-Regular" , color : "#FD0C63",  fontWeight: "700"}}>
            Object Detection App
          </Text>
          </View>
        </View>
        
      </View>
    );
  };
  
  export default Home;
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 0,
      margin: 0,
    },
  
    bodyContainer: { height: "100%", justifyContent: "space-around" },
    heading: {
      justifyContent: "center",
      alignItems: "center",
    },
    textContainer: {
      height: "10%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    spanElement: {
      color: "#080C15",
      fontSize: 25,
      fontFamily: "JakartaSans-Regular",
    },
    headingElement: {
      color: "#080C15",
      fontWeight: "800",
      fontSize: 25,
      fontFamily: "JakartaSans-Regular",
    },
    buttonContainer: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: 120,
      paddingHorizontal: "10%",
      marginVertical: 10,
    },
  
    cardText: {
      color: "#080C15",
      fontSize: 22,
      fontWeight: "700",
      fontFamily: "JakartaSans-Regular",
    },
  });
  