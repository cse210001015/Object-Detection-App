import { StyleSheet } from "react-native";
import React from "react";
// import { Button } from "react-native-paper";
import { Button, Text } from "react-native-paper";
const ButtonComp = ({
  onClick,
  buttonType,
  buttonIcon,
  isDisable,
  textColor,
  extraStyle,
  buttonValue,
  extraStyleText,
  btnTextColor,
 // isloading,
}) => {
  return (
    <>
      <Button
      //  loading={isloading}
        icon={buttonIcon !== "" ? buttonIcon : ""}
        mode={buttonType}
        onPress={onClick}
        style={extraStyle}
        disabled={isDisable}
        textColor={textColor}
      >
        <Text
          style={[
            extraStyleText,
            { width: "100%", height: "100%", color: btnTextColor },
          ]}
        >
          {buttonValue}
        </Text>
      </Button>
    </>
  );
};

export default ButtonComp;

const styles = StyleSheet.create({});
