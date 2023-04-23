import { StyleSheet, Text, View } from "react-native";
import React from "react";

const TextComp = ({ textValue, style, nestedText, nestedTextStyle }) => {
  return (
    <Text style={style}>
      {textValue}
      {nestedText !== undefined ? (
        <Text style={nestedTextStyle}>{nestedText}</Text>
      ) : null}
    </Text>
  );
};

export default TextComp;
