import { View, Text, Dimensions, StyleSheet } from "react-native";
import React from "react";
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from "react-native-maps";
import { COLORS, FONTS } from "../../constants";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../config/types";

type Props = {
  route: RouteProp<RootStackParamList, "MapsView">;
  navigation: StackNavigationProp<RootStackParamList, "MapsView">;
};

const MapsView = ({ route, navigation }: Props) => {
  const data = route.params.data;
  function renderActivityCard() {
    return (
      <View style={{ flex: 1, padding: 10 }}>
        <View
          style={{
            justifyContent: "space-around",
          }}
        >
          <Text style={{ ...FONTS.h3 }}>{data.name}</Text>
          <Text
            style={{
              color: COLORS.gray,
              ...FONTS.body5,
              paddingRight: 50,
            }}
          >
            {data.address}
          </Text>

          <Text style={{ color: COLORS.gray, ...FONTS.body5 }}>
            {data.phone}
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        showsUserLocation={true}
        region={{
          latitude: 41.6358,
          longitude: -70.9263,
          latitudeDelta: 0.005,
          longitudeDelta: 0.02,
        }}
      >
        <Marker
          coordinate={{
            latitude: data.coordinates[0],
            longitude: data.coordinates[1],
          }}
        >
          <Callout>{renderActivityCard()}</Callout>
        </Marker>
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.35,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

export default MapsView;
