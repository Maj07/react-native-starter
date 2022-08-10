import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Text, SafeAreaView, View, Button } from "react-native";
import { ChevronRightIcon } from "react-native-heroicons/outline";
import { useSelector, useDispatch } from "react-redux";

import {
  selectCartItems,
  addToCart,
  removeFromCart,
} from "../store/features/cart/cartSlice";
const HomeScreen = () => {
  const items = useSelector(selectCartItems);
  const dispatch = useDispatch();
  const { navigate } = useNavigation();

  return (
    <SafeAreaView>
      <Text className="text-blue-500 text-center font-bold">HomeScreen</Text>
      <View>
        <Text>You have {items.length} items in cart</Text>
        {items.map((item, index) => (
          <View key={index}>
            <Text>
              {index + 1}. {item?.title}
            </Text>
          </View>
        ))}
        <Button
          onPress={() => dispatch(addToCart({ title: "item" }))}
          title="Add Item"
        />
        <Button onPress={() => dispatch(removeFromCart())} title="Remove all" />
        <Button
          onPress={() =>
            navigate("Detail", {
              title: "test",
              description: "Some description here",
            })
          }
          title="Go to Detail"
        />
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
