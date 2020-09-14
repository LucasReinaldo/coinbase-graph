import React from "react";
import { StyleSheet, View } from "react-native";
import Icon from "./Icon";
import { StyleGuide } from "../components";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: StyleGuide.spacing * 2,
    backgroundColor: StyleGuide.palette.background,
    flexDirection: "row",
    justifyContent: "space-evenly",
    flexWrap: "wrap"
  }
});

export const episodes = [
  {
    id: "CoinbasePro",
    name: "Coinbase Pro",
    icon: require("../../assets/icons/coinbase-pro.png")
  }
];

export default () => {
  return (
    <View style={styles.container}>
      {episodes.map(episode => (
        <Icon key={episode.id} {...episode} />
      ))}
    </View>
  );
};
