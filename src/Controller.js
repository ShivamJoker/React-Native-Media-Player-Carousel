import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableHighlight,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

export default function Controller({ goNext, goPrv }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => goPrv()}>
        <MaterialIcons name="skip-previous" size={45} color="black" />
      </TouchableOpacity>

      <MaterialIcons name="pause" size={45} color="black" />
      <TouchableOpacity onPress={() => goNext()}>
        <MaterialIcons name="skip-next" size={45} color="black" />
      </TouchableOpacity>
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
