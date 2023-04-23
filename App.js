import "react-native-gesture-handler";
import * as React from "react";

import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ImageDetection from "./src/screens/ImageDetection";
import ObjectDetection from "./src/screens/ObjectDetection";
import ObjectDetectionpy from "./src/screens/ObjectDetectionpy";
import Home from "./src/screens/Home"
const Stack = createNativeStackNavigator();
import { createDrawerNavigator } from "@react-navigation/drawer";
import DrawerScreens from "./src/components/DrawerScreens";
import AboutUs from "./src/screens/AboutUs";
import { useFonts } from "expo-font";



// The DrawerContent() function defines the content of the drawer navigator and returns a 
// Drawer.Navigator component with two screens - HomePage and About Us. The NavigationContainer 
// component wraps the stack navigator and provides the navigation context for the app.

const Drawer = createDrawerNavigator();
function DrawerContent(props) {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          width: "100%",
        },
        drawerActiveTintColor: "transparent",
        drawerLabelStyle: {
          color: "white",
          textAlign: "center",
          left: "5%",
          fontFamily: "JakartaSans-Regular",
        },
      }}
      initialRouteName="Home"
      drawerContent={(props) => {
        return <DrawerScreens {...props} />;
      }}
    >
      <Drawer.Screen name="HomePage" component={Home} />
      <Drawer.Screen name="About Us" component={AboutUs} />
    </Drawer.Navigator>
  );
} 

// The App() function is the main component of the app and defines the overall structure of 
// the UI. The useFonts() hook is used to load custom fonts and the fontsLoaded variable is 
// used to check if the fonts have been loaded before rendering the app.


export default function App() {
  const [fontsLoaded] = useFonts({
    "JakartaSans-Regular": require("./assets/fonts/static/PlusJakartaSans-Bold.ttf"),
  });
  if (!fontsLoaded) {
    return;
  }
  console.log(fontsLoaded); 
  return (
    
    <NavigationContainer> 
      {/* The Stack.Navigator component wraps all the screens and sets the headerShown prop to false to hide the 
header. The Stack.Group component is used to group the screens together. The Stack.Screen components define 
the screens of the app and their corresponding components, such as Home, ObjectDetection, and ImageDetection. */}
        <Stack.Navigator
         screenOptions={{ headerShown: false }}
         > 
         <Stack.Group>
         <Stack.Screen name="Home" component={DrawerContent} options={() => {     null;   }}     /> 
         <Stack.Screen name="ObjectDetection" component={ObjectDetection} options={{ title: "none" }} /> 
         <Stack.Screen  name="ImageDetection" component={ImageDetection} options={{ title: "none" }} /> 
         <Stack.Screen name="ObjectDetectionpy" component={ObjectDetectionpy} options={{ title: "none" }} /> 
       </Stack.Group>
        </Stack.Navigator>
    </NavigationContainer>
  );
}