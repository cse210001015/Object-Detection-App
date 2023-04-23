import { SafeAreaView, StyleSheet, View } from "react-native";
import React from "react";
import TextComp from "../components/TextComp";
import SwipeBtn from "../components/swipeBtn";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Dimensions } from "react-native";
import Home from "./Home";

const AboutUs = ({ navigation }) => {
  const screenData = Dimensions.get("screen");
  const [fontSize, setfontSize] = React.useState(16);

  React.useEffect(() => {
    if (screenData.width <= 360) {
      setfontSize(16);
    } else if (screenData.width > 360 && screenData.width <= 400) {
      setfontSize(16);
    } else if (screenData.width > 400 && screenData.width <= 600) {
      setfontSize(19);
    }
  }, []);
  return (
    <SafeAreaProvider>
      <View
        style={{
          marginTop: 60,
          marginBottom: 10,
          justifyContent: "center",
          paddingHorizontal: 10,
        }}
      >
        <TextComp
          textValue="About Us"
          style={{ fontWeight: "800", fontSize: fontSize }}
        />
      </View>
      <SafeAreaView style={{ flexGrow: 1, paddingHorizontal: 10 }}>
        <View style={{ flex: 0.1, justifyContent: "center" }}>
          <TextComp
            textValue="Object Detection App"
            style={{
              fontWeight: "800",
              fontSize: fontSize,
              marginVertical: 10,
            }}
          />
        </View>
        <View style={{ flex: 0.3 }}>
          <TextComp
            textValue="About our App: Our Object Detection App takes a video/image input from a user and from the given input it detects the objects and also draws bounding boxes across it and returns the modified input."
            style={{ fontSize: fontSize -2, lineHeight: 24 }}
          />
        </View>
        <View style={{ flex: 0.5, justifyContent: "center" }}>
          <View
            style={{
              height: 50,
              maxHeight: 60,
              width: "100%",
              backgroundColor: "#e0e0e0",
              borderRadius: 10,
              paddingHorizontal: 10,
              justifyContent: "center",
              marginBottom: 15,
            }}
          >
            <TextComp
              textValue="Team Members"
              style={{
                fontWeight: "800",
                fontSize: fontSize,
                marginVertical: 10,
              }}
            />
          </View>
          <View
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                width: "100%",
                height: "21%",
              }}
            >
              <View
                style={{
                  alignItems: "center",
                  width: "20%",
                  justifyContent: "flex-end",
                }}
              >
                <View
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: 50,
                    backgroundColor: "#6A3EFE",
                  }}
                ></View>
                <View
                  style={{
                    height: "40%",
                    borderLeftWidth: 3,
                  //  borderStyle: "dotted",
                  }}
                ></View>
              </View>
              <View>
                <TextComp
                  textValue="M Surya Karthikeya"
                  style={{ fontWeight: "800", fontSize: fontSize - 4 }}
                />
                <TextComp
                  textValue="210001041"
                  style={{ fontWeight: "300", fontSize: fontSize - 4 }}
                />
              </View>
            </View>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                width: "100%",
                height: "21%",
              }}
            >
              <View
                style={{
                  alignItems: "center",
                  width: "20%",
                  justifyContent: "flex-end",
                }}
              >
                <View
                  style={{
                    height: "40%",
                    borderLeftWidth: 3,
                 //   borderStyle: "dotted",
                  }}
                ></View>
                <View
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: 50,
                    backgroundColor: "#6A3EFE",
                  }}
                ></View>
                <View
                  style={{
                    height: "40%",
                    borderLeftWidth: 3,
                 //   borderStyle: "dotted",
                  }}
                ></View>
              </View>
              <View>
                <TextComp
                  textValue="G Aakash"
                  style={{ fontWeight: "800", fontSize: fontSize - 4 }}
                />
                <TextComp
                  textValue="210001015"
                  style={{ fontWeight: "300", fontSize: fontSize - 4 }}
                />
              </View>
            </View>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                width: "100%",
                height: "21%",
              }}
            >
              <View
                style={{
                  alignItems: "center",
                  width: "20%",
                  justifyContent: "flex-end",
                }}
              >
                <View
                  style={{
                    height: "40%",
                    borderLeftWidth: 3,
                  //  borderStyle: "dotted",
                  }}
                ></View>
                <View
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: 50,
                    backgroundColor: "#6A3EFE",
                  }}
                ></View>
                <View
                  style={{
                    height: "40%",
                    borderLeftWidth: 3,
                   // borderStyle: "dotted",
                  }}
                ></View>
              </View>
              <View>
                <TextComp
                  textValue="Gourav Ahlawat"
                  style={{ fontWeight: "800", fontSize: fontSize - 4 }}
                />
                <TextComp
                  textValue="210001019"
                  style={{ fontWeight: "300", fontSize: fontSize - 4 }}
                />
              </View>
            </View>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                width: "100%",
                height: "21%",
              }}
            >
              <View
                style={{
                  alignItems: "center",
                  width: "20%",
                  justifyContent: "flex-start",
                }}
              >
            
              </View>
            </View>
          </View>
          <View style={{ height: 40 }}>
            <TextComp
              textValue="Supervised By: Dr.Puneet Gupta"
              style={{
                fontWeight: "300",
                fontSize: fontSize - 4,
                textAlign: "center",
              }}
            />
          </View>
        </View>
        <View
          style={{ flex: 0.2, alignItems: "center", justifyContent: "center" }}
        >
          <SwipeBtn navigation={navigation} />
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default AboutUs;

const styles = StyleSheet.create({});
