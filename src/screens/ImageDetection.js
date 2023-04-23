import React, { useState, useEffect } from 'react';
import { StyleSheet,Button, Image, View,Dimensions,ScrollView,Platform,Text} from 'react-native';
import {Video} from 'expo-av';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import axios from 'axios';
import TextComp from "../components/TextComp";
import ButtonComp from "../components/Button";
import {
  Appbar,
  useTheme,
  Dialog,
  ActivityIndicator,
} from "react-native-paper";
const { width, height } = Dimensions.get("window");

// ImageDetection takes navigation as a parameter, which is used to navigate between screens.

export default function ImageDetection({navigation}){
  
  
  // The useState hook is used to declare two states: image and Err. image holds the image string,
  // which is fetched from the user's device gallery using the ImagePicker module. Err holds the error message that
  // will be displayed on the screen based on the status of the image detection process.
  const [image, setImage] = useState(null);
  const [Err,setErr]=useState("Please Upload an Image");




  // The pickImage function is called when the user presses the "Pick an Image" button. This function launches the 
  // device's image gallery, allowing the user to select an image. Once an image is selected, the image 
  // string is extracted from the result object and stored in the image state. The axios module is then used to send an 
  // HTTP POST request to an external API endpoint with the imgsource parameter set to the image string. 
  // The response from the API is then stored in the image state, and the error message is set based on the status of the API call.

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true,
    });

    let imagebase64=result.base64
    setImage(imagebase64);
    if(!imagebase64)  return;

    setErr("Processing");
    console.log("Uploaded");

    axios.post('https://6196-103-159-214-186.ngrok-free.app/', {
        'imgsource':imagebase64})
        .then(function (response) {
            setImage(response.data);
            setErr("Done You may Try again")
            console.log("Success");
        })
        .catch(function (error) {
            setErr("Unexpected Error Please Try Again")
            console.log(error);
        });
  };

  const theme = useTheme();
  return( 
   
    // The user interface is defined using the View component from React Native. The component includes a header, 
    // a title, a button to upload the image, an image container to display the uploaded image, and a text element 
    // to display the error message.

    // The component also uses the useTheme hook from React Native Paper to get the current theme and apply it to 
    // the user interface elements. Various styles are defined using the StyleSheet module from React Native to style 
    // the user interface elements.

    <View style={styles.container}>
        <Appbar.Header style={{ backgroundColor: "#FEFEFD", height: 50 }}>
          <Appbar.Action
            icon="keyboard-backspace"
            style={{ marginRight: "auto" }}
            onPress={() => {
              navigation.navigate("Home");
            }}
          />
        </Appbar.Header>
        <View style={styles.sectionContainer}>
            
            <TextComp
              textValue={"Image Detection \n"}
        
              nestedTextStyle={[styles.subtitleStyle, { fontWeight: "400" }]}
              style={[
                styles.subtitleStyle,
                { fontWeight: "200", fontSize: 25, color: "black" },
              ]}
            />
          </View>
         
          <View style={styles.btnContainer}>
            <ButtonComp
              
              onClick={pickImage}
              buttonType="contained"
              extraStyle={{
                backgroundColor: theme.colors.secondary,
                width: "40%",
                margin: "auto",
                height: 60,
                justifyContent: "center",
                borderRadius: 20,
                marginTop : 0.9*(height),
              }}
              btnTextColor="white"
              buttonValue={ "Pick an Image" }
            />
            
          </View>
      <View style={styles.sectionContainer1}>
      {image &&<Image source={{uri:`data:image/png;base64,${image}`}} style={styles.qrcodeBox}/>}
      <Text>{Err}</Text>
      </View>
  </View>
  );
} 

const styles = StyleSheet.create({
  container: { flex: 1 },
  sectionContainer: {
    flex: 0.2,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  headingStyle: { fontSize: 18, marginVertical: 10, fontWeight: "700" },
  subtitleStyle: {
    textAlign: "center",
    color: "#707070",
    fontSize: 12,
  },
  btnContainer: {
    flex: 0.29,
    justifyContent: "center",
    alignItems: "center",
  },
  btn: {
    width: "80%",
    margin: "auto",
    height: 60,
    justifyContent: "center",
    borderRadius: 20,
  },
  qrcodeBox: {
    alignItems: "center",
    justifyContent: "center",
    height: 0.37*(height),
    width: 0.8*(width),
    overflow: "hidden",
    borderRadius: 15,
    marginLeft: 0.1*(width), 
    marginRight: 0.1*(width),
   // marginTop: 0.6*(height),
  },
  sectionContainer1: {
    flex: 0.2,
    justifyContent: "flex-end",
    alignItems: "center", 
   // marginTop: 0.8*(height),
  },
});
