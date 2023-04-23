import React, { useContext } from "react";
import { View, Text, Image, Dimensions } from "react-native";
import SwipeButton from "rn-swipe-button";
import SwipableBtnIcon from "../../assets/swipableBtn.png";
import ContextRapper from "../helper/context";
import { useTheme } from "react-native-paper";

const { height, width } = Dimensions.get("window");

const SwipeBtn = ({ navigation }) => {
  const theme = useTheme();
  const contextApi = useContext(ContextRapper);
  const HomeButton = () => {
    return (
      <View style={{ height: "100%", backgroundColor: theme.colors.primary }}>
        <Image
          style={{ width: 60, height: 70 }}
          source={require("../../assets/swipableBtn.png")}
        />
      </View>
    );
  };
  return (
    <SwipeButton
      width="90%"
      enableReverseSwipe
      onSwipeSuccess={() => {
        navigation.replace("Home");
      }}
      containerStyles={{ borderRadius: 15 }}
      height={50}
      railFillBackgroundColor={theme.colors.primary}
      disabledRailBackgroundColor="false"
      railBorderColor={theme.colors.primary}
      railBackgroundColor={theme.colors.primary}
      railFillBorderColor={theme.colors.primary}
      title="Slide to home"
      titleColor="white"
      titleFontSize={width < 400 ? 14 : 20}
      shouldResetAfterSuccess={true}
      thumbIconBackgroundColor={theme.colors.primary}
      thumbIconBorderColor={theme.colors.primary}
      thumbIconComponent={HomeButton}
    />
  );
};

export default SwipeBtn;
