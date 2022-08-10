import React from "react";
import { Text, View } from "react-native";
import { useRoute } from "@react-navigation/native";

function DetailScreen() {
  const {
    params: { title, description },
  } = useRoute();
  return (
    <View>
      <Text className="text-xl font-bold">Title : {title} </Text>
      <Text className="text-m text-gray-400">Description : {description} </Text>
    </View>
  );
}

export default DetailScreen;
