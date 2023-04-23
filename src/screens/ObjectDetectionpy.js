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
export default App = ({navigation}) => {
  const [videosrc,SetVideo]=useState(null);
  const [ws,setWs]=useState(null);
  const [process,SetProcess]=useState('Please Connect to The Server before picking a video');

  const handle_done=async (file)=>{
    file=file.substring(2,file.length-1)
    let filepath=FileSystem.documentDirectory+'video.mp4';
    let result=await FileSystem.writeAsStringAsync(filepath,file,{encoding:'base64'});
    SetVideo(filepath);
    SetProcess("Done You may Upload Another Video");
  };

  const connectToWebSocket = () => {
    const socket = new WebSocket('https://cf3b-34-68-252-10.ngrok.io/ws');
    let video=''
    socket.onmessage = (event) => {
      if(event.data=="Connected"){
        SetProcess("Connected Please Choose a Video")
        console.log(event.data);
      }
      else if(event.data=="End"){
        handle_done(video);
        video=''
      }
      else{
        video+=event.data;
        console.log(event.data.length);
      }
    };
    setWs(socket);
  };

  const send_file=(content)=>{
    while(content.length>931388){
      let s=content.substring(0,931388);
      ws.send(s);
      content=content.substring(931388,content.length);
    }
    if(content.length>0)    ws.send(content);
    ws.send("End");
  };

  const pickvideo=async ()=>{
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
    SetVideo(videouri);
    SetProcess("Processing Please Wait")

    if (videouri) {
      content=await FileSystem.readAsStringAsync(videouri,options={encoding:'base64'});
      console.log(content.length);
      send_file(content);
    }
  };


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
              textValue={"Video Detectionpy \n"}
        
              nestedTextStyle={[styles.subtitleStyle, { fontWeight: "400" }]}
              style={[
                styles.subtitleStyle,
                { fontWeight: "200", fontSize: 25, color: "black" },
              ]}
            />
          </View>
          <View>
          <View style={styles.btnContainer}>
            <ButtonComp
              
              onClick={connectToWebSocket}
              buttonType="contained"
              extraStyle={{
                backgroundColor: theme.colors.secondary,
                width: "80%",
                margin: "auto",
                height: 60,
                justifyContent: "center",
                borderRadius: 20,
                marginTop : 0.9*(height),
              }}
              btnTextColor="white"
              buttonValue={ "Connect to server" }
            />
            
          </View>
           <View style={styles.btnContainer2}>
            <ButtonComp
              
              onClick={pickvideo}
              buttonType="contained"
              extraStyle={{
                backgroundColor: theme.colors.secondary,
                width: "80%",
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
          </View>
          
      <View style={styles.sectionContainer1}>
      {videosrc && <Video source={{ uri: videosrc }} style={{ width: 300, height: 300 }} useNativeControls resizeMode="contain"/>}
      </View>
       <Text style={styles.lowerText}>{process}</Text>

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
    marginRight: 200,
  },
  btnContainer2: {
    flex: 0.29,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 200
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
   // marginTop: 0.9*(height),
  },
  sectionContainer1: {
    flex: 0.2,
    justifyContent: "flex-end",
    alignItems: "center", 
   marginTop: 0.25*(height),
  },
  lowerText:{
    width: "100%",
    position: "absolute",
    bottom: 180,
    left: "auto", 
    right: "auto",
    textAlign: "center"
  }
});

//   return(
//     <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//        <View style={styles.btnContainer}>
//             <ButtonComp
              
//               onClick={connectToWebSocket}
//               buttonType="contained"
//               extraStyle={{
//                 backgroundColor: theme.colors.secondary,
//                 width: "40%",
//                 margin: "auto",
//                 height: 60,
//                 justifyContent: "center",
//                 borderRadius: 20,
//                 marginTop : 0.9*(height),
//               }}
//               btnTextColor="white"
//               buttonValue={ "Connect to server" }
//             />
            
//           </View>
//       <View style={styles.btnContainer}>
//             <ButtonComp
              
//               onClick={pickvideo}
//               buttonType="contained"
//               extraStyle={{
//                 backgroundColor: theme.colors.secondary,
//                 width: "40%",
//                 margin: "auto",
//                 height: 60,
//                 justifyContent: "center",
//                 borderRadius: 20,
//                 marginTop : 0.9*(height),
//               }}
//               btnTextColor="white"
//               buttonValue={ "pick a video" }
//             />
            
//           </View>
//       <View style={styles.sectionContainer1}>
//       {videosrc && <Video source={{ uri: videosrc }} style={styles.qrcodeBox} useNativeControls resizeMode="contain"/>}
//       </View>
//       <Text>{process}</Text>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: { flex: 1 },
//   sectionContainer: {
//     flex: 0.2,
//     justifyContent: "flex-end",
//     alignItems: "center",
//   },
//   headingStyle: { fontSize: 18, marginVertical: 10, fontWeight: "700" },
//   subtitleStyle: {
//     textAlign: "center",
//     color: "#707070",
//     fontSize: 12,
//   },
//   btnContainer: {
//     flex: 0.29,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   btn: {
//     width: "80%",
//     margin: "auto",
//     height: 60,
//     justifyContent: "center",
//     borderRadius: 20,
//   },
//   qrcodeBox: {
//     alignItems: "center",
//     justifyContent: "center",
//     height: 0.37*(height),
//     width: 0.8*(width),
//     overflow: "hidden",
//     borderRadius: 15,
//     marginLeft: 0.1*(width), 
//     marginRight: 0.1*(width),
//    // marginTop: 0.6*(height),
//   },
//   sectionContainer1: {
//     flex: 0.2,
//     justifyContent: "flex-end",
//     alignItems: "center", 
//    // marginTop: 0.8*(height),
//   },
// });