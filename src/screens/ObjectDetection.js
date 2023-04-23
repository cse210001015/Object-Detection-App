import React, { useState, useEffect } from 'react';
import { StyleSheet,Button, Image, View,Dimensions,ScrollView,Platform,Text} from 'react-native';
import {Video} from 'expo-av';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { io } from "socket.io-client";
import { BehaviorSubject } from 'rxjs';
import TextComp from "../components/TextComp";
import ButtonComp from "../components/Button";
import {
  Appbar,
  useTheme,
  Dialog,
  ActivityIndicator,
} from "react-native-paper";
const { width, height } = Dimensions.get("window");

const socket = io("https://57ec-103-159-214-186.ngrok-free.app/");
let uri$=new BehaviorSubject(null);
let process$=new BehaviorSubject("Please Wait Connecting to Server");

let content='';
let content_complete='';

let ask=()=>{
  socket.emit('ask','How Much?');
};

socket.on('connect', () => {
  content='';
  content_complete='';
  process$.next("Please choose a video");
  console.log('Connected to server.');
});
  
// When the connect event is emitted, the process$ variable is set to "Please choose a video".
// When the disconnect event is emitted, a message is logged to the console. When the reconnect 
// event is emitted, the ask function is called to initiate a socket connection and send a message to the server.

socket.on('disconnect', () => {
  console.log('Disconnected from server.');
});

socket.on('reconnect',()=>{
  console.log("Reconnecting::");
  ask();
});

socket.on('length',(data)=>{
  if(content.length==0){
    let c=0; //Do nothing
  }
  else if(data==content.length){
    content='';
  socket.emit('done','Success');
  }
  else if((content.length-data)>931388){
    let s=content.substring(data,data+931388);
    socket.emit('file',s);
    ask();
  }
  else{
    socket.emit('file',content.substring(data,content.length));
    ask();
  }
});

// The video is broken into chunks and sent to backend using socket.io which establishes a two way connection

socket.on('file_complete',(data)=>{
  content_complete+=data;
  console.log("File Received: "+data.length);
});

// When the file_complete event is emitted, the received data is added to the content_complete variable, and
//  a message is logged to the console.



const handle_done=async ()=>{
  if(content_complete.length==0)  return;
  console.log(content_complete.length);
  let filepath=FileSystem.documentDirectory+'video.mp4';
  let result=await FileSystem.writeAsStringAsync(filepath,content_complete,{encoding:'base64'});
  uri$.next(filepath);
  process$.next("Done You may choose another video if you wish");
  content_complete='';
}

// The handle_done function is called when the done_file event is emitted. It checks if the 
// content_complete variable is empty, in which case nothing happens. Otherwise, the content_complete
// variable is saved to a file using the FileSystem.writeAsStringAsync method.
// The file URI is then stored in the uri$ variable.

socket.on('done_file',handle_done);

// function component ImageDetection that returns the UI for the video detection screen.
//  It starts by importing necessary modules and setting up some constants and variables.


export default function ImageDetection({navigation}){
  let [video,setVideo]=useState("");
  const [process,SetProcess]=useState(null);

  useEffect(()=>{
    const subscription=uri$.subscribe(newValue=>{
      setVideo(newValue);
    });
    return ()=>{
      subscription.unsubscribe();
    };
  },[]);

  useEffect(()=>{
    const subscription=process$.subscribe(newValue=>{
      SetProcess(newValue);
    });
    return ()=>{
      subscription.unsubscribe();
    };
  },[]);

  // The useState and useEffect hooks are used to manage state and lifecycle events in the component. 
  // useState is used to manage the state of the video and process variables, while useEffect is used 
  // to subscribe to the uri$ and process$ observables.

  const pickvideo= async ()=>{
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      videoExportPreset: ImagePicker.VideoExportPreset.H264_640x480,
      UIImagePickerControllerType: ImagePicker.IFrame1280x720,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0,
      base64: true,
      exif:true
    });
    let videouri=result.assets[0].uri;
    console.log(videouri);
    // SetVideo(videouri);
    uri$.next(videouri);
    process$.next("Processing...");

    if (videouri) {
      // let info=await FileSystem.getInfoAsync(videouri);
      // console.log(info);
      content=await FileSystem.readAsStringAsync(videouri,options={encoding:'base64'});
      console.log(content.length);
      ask();
    }
  }
 
  // The pickvideo function is called when the user selects a video from their device. It uses
  //  the ImagePicker.launchImageLibraryAsync method to open the device's image gallery and select
  // a video. The ask function is then called to initiate a socket connection and send a message to the server.


  const theme = useTheme();
  return( 
   
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
              textValue={"Video Detection \n"}
        
              nestedTextStyle={[styles.subtitleStyle, { fontWeight: "400" }]}
              style={[
                styles.subtitleStyle,
                { fontWeight: "200", fontSize: 25, color: "black" },
              ]}
            />
          </View>
         
          <View style={styles.btnContainer}>
            <ButtonComp
              
              onClick={pickvideo}
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
              buttonValue={ "pick a video" }
            />
            
          </View>
      <View style={styles.sectionContainer1}>
      {video &&<Video source={{uri:video}} style={styles.qrcodeBox} useNativeControls/>}
      {process && <Text>{process}</Text>}
      </View>
  </View>
  );
} 

// Finally, the ImageDetection component returns the UI for the video detection screen. It uses
//  the Appbar, TextComp, ButtonComp, Video, and ActivityIndicator components to display the UI.

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
