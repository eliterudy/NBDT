import { View } from "react-native";
import React from "react";
import { WebView } from "react-native-webview";
const BrowserView = ({ route, navigation }) => {
  const { uri } = route.params;
  return (
    <View style={{ flex: 1 }}>
      <WebView source={{ uri: uri }} style={{ flex: 1 }} />
    </View>
  );
};

export default BrowserView;
