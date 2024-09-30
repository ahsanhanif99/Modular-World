import React, { useEffect, useRef, useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
SafeAreaView,
  View,
  StyleSheet,
  Text,
  Image,
  ActivityIndicator,
  LogBox,
  BackHandler,
  
} from "react-native";
import { WebView } from "react-native-webview";

import AppNavigator from "./src/navigation/AppNavigator";

const App = () => {
  LogBox.ignoreAllLogs();
  const [checkIstrue, setCheckTrue] = useState(null);
  const [checkScreen, setCheckScreen] = useState(false);
  const [showWebView, setShowWebView] = useState(false);
  const webViewRef = useRef(null);

  useEffect(() => {
    checkWhichLoading();
  }, []);

  const checkWhichLoading = () => {
    setShowWebView(true);
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch("https://filmomonny.com/Api/visionaries.php", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log("Ress0-0->", result?.status);
        setCheckTrue(result?.status);
        // setCheckTrue(false)
        setCheckScreen(true);
      })
      .catch((error) => console.log("error", error));
  };
  const renderContent = () => {
    if (checkScreen) {
      if (checkIstrue) {
        return (
          <SafeAreaView style={styles.body}>
            <StatusBar style="dark" barStyle={"dark-content"} />
            <WebView
              style={styles.webview}
              ref={webViewRef}
              source={{ uri: "https://visionaries-all.s3.ap-northeast-3.amazonaws.com/app/Visionaries+X.html" }}
              mixedContentMode="compatibility"
              // startInLoadingState
              javaScriptEnabled={true}
              domStorageEnabled={true}
              setBuiltInZoomControls={false}
              allowFileAccess={true}
            />
          </SafeAreaView>
        );
      } else {
        return <AppNavigator />
      }
    } else {
      return (
        <View style={styles.centeredView}>
          <ActivityIndicator size={"small"} color={"#000"} />
        </View>
      );
    }
  };

  return renderContent();
};

export default App;

const styles = StyleSheet.create({
  body: {
    flex: 1,
    height: "100%",
    width: "100%",
  },
  webview: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  activityIndicatorStyle: {
    flex: 1,
    position: "absolute",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: "auto",
    marginBottom: "auto",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    justifyContent: "center",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

