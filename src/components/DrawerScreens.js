import { StyleSheet, View, ImageBackground, Dimensions } from "react-native";
import React from "react";
import {
  DrawerItemList,
  DrawerContentScrollView,
} from "@react-navigation/drawer";
import { IconButton } from "react-native-paper";

const { height, width } = Dimensions.get("window");

const DrawerScreens = (props) => {
  return (
    <View>
      <ImageBackground
        resizeMode="cover"
        source={require("../../assets/images/drawerBgImage.png")}
      >
        <View style={styles.overLay}></View>
        <View style={{ height: "20%" }}></View>
        <View
          style={{
            width: "100%",
            height: "60%",
          }}
        >
          <DrawerContentScrollView>
            <DrawerItemList {...props} />
          </DrawerContentScrollView>
          <View
            style={{ width: "100%", display: "flex", alignItems: "center" }}
          >
            <IconButton
              icon="close"
              iconColor="white"
              // size={height <= 600 ? 30 : 50}
              size={30}
              onPress={() => props.navigation.closeDrawer()}
            />
          </View>
        </View>
        <View style={{ height: "20%" }}></View>
      </ImageBackground>
    </View>
  );
};

export default DrawerScreens;

const styles = StyleSheet.create({
  overLay: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "black",
    opacity: 0.6,
    zIndex: -1,
  },
  btnContainer: {
    flex: 0.3,
    alignItems: "center",
  },
});
