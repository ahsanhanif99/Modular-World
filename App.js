import React, { useRef, useState, useEffect } from "react";
import { WebView } from "react-native-webview";
import { StatusBar } from "expo-status-bar";
import {
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  BackHandler,
  ActivityIndicator,
  Image,
  Linking,
} from "react-native";
import * as SplashScreen from "expo-splash-screen";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const webViewRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isPageLoading, setIsPageLoading] = useState(false); // Track every page load

  const handleBackButton = () => {
    if (webViewRef.current) {
      webViewRef.current.goBack();
      return true;
    }
    return false;
  };

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", handleBackButton);
    return () => {
      BackHandler.removeEventListener("hardwareBackPress", handleBackButton);
    };
  }, []);

  const handleWebViewLoad = async () => {
    setIsLoading(false);
    await SplashScreen.hideAsync();
  };

  const handleShouldStartLoadWithRequest = (event) => {
    const googleAuthUrls = [
      "https://accounts.google.com",
      "https://accounts.google.com/signin/oauth",
    ];

    if (googleAuthUrls.some((url) => event.url.startsWith(url))) {
      Linking.openURL(event.url);
      return false;
    }

    return true;
  };

  return (
    <SafeAreaView style={styles.body}>
      <StatusBar style="light" barStyle={"light-content"} />

      {/* Activity Indicator for every page load */}
      {isPageLoading && (
        <ActivityIndicator
          size="large"
          color="#144477"
          style={styles.loadingOverlay}
        />
      )}

      <WebView
        style={styles.webview}
        ref={webViewRef}
        source={{ uri: "https://www.modularworld.tv/" }}
        onLoadStart={() => setIsPageLoading(true)} // Show loading when page starts
        onLoadEnd={() => setIsPageLoading(false)} // Hide loading when page ends
        onLoad={handleWebViewLoad}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        mixedContentMode="compatibility"
        onShouldStartLoadWithRequest={handleShouldStartLoadWithRequest}
      />

      <TouchableOpacity style={styles.backButton} onPress={handleBackButton}>
        <Image source={require("./assets/nav3.webp")} style={styles.backImage} />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  body: {
    backgroundColor: "#144477",
    flex: 1,
    paddingTop: 25,
  },
  webview: {
    backgroundColor: "#144477",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  loadingOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.3)", // Semi-transparent background
    zIndex: 2,
  },
  backButton: {
    position: "absolute",
    bottom: 100,
    right: 15,
    minWidth: 60,
  },
  backImage: {
    width: 70,
    height: 20,
    resizeMode: "contain",
  },
});
