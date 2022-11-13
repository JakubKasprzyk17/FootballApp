import { StyleSheet, Text, View } from "react-native";
import React from "react";

const SmallTeam = ({ item }) => {
  return (
    <View style={styles.container}>
      <Image source={{ uri: item.flag }} />
      <Text>{item.name_en}</Text>
      <Text>{item.group}</Text>
    </View>
  );
};

export default SmallTeam;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.darkBlue,
    borderRadius: 10,
    padding: 10,
    marginHorizontal: 10,
    marginVertical: 5,
    width: "100%",
  },
});
