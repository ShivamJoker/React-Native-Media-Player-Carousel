import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

export default function Controller({ goNext, goPrv }) {
  return (
    <View style={styles.container}>
      <MaterialIcons
        name="skip-previous"
        onPress={() => goPrv()}
        size={24}
        color="black"
      />
      <MaterialIcons name="pause" size={24} color="black" />
      <MaterialIcons
        name="skip-next"
        size={24}
        color="black"
        onPress={() => goNext()}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
});
