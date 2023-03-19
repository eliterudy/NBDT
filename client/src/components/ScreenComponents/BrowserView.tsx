import { View } from "react-native";
import React from "react";
import { WebView } from "react-native-webview";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../config/types";
import { RouteProp } from "@react-navigation/native";

type Props = {
  route: RouteProp<RootStackParamList, "BrowserView">;
  navigation: StackNavigationProp<RootStackParamList, "BrowserView">;
};

const BrowserView = ({ route, navigation }: Props) => {
  const uri = route.params.uri.toString();
  return (
    <View style={{ flex: 1 }}>
      <WebView source={{ uri: uri }} style={{ flex: 1 }} />
    </View>
  );
};

export default BrowserView;
