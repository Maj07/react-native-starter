import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import React, { useLayoutEffect, useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import { XCircleIcon } from "react-native-heroicons/solid";
import { useDispatch, useSelector } from "react-redux";

import {
  removeItemFromCart,
  selectCartItems,
} from "../store/features/cart/cartSlice";

const DELIVERY_FEE = 9.99;
const numToLocaleStr = (num) =>
  isNaN(num) ? 0 : Number(num).toFixed(2).toLocaleString();

const CartScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const items = useSelector(selectCartItems);
  const [subTotal, setSubTotal] = useState(0);

  const removeItem = (id) => {
    dispatch(removeItemFromCart(id));
  };

  useEffect(() => {
    const res = items.reduce((acc, item) => {
      return item.price + acc;
    }, 0);
    setSubTotal(res);
  }, [items]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "Your Cart",
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.goBack()} className="p-2">
          <ChevronLeftIcon color="black" size="30" />
        </TouchableOpacity>
      ),
    });
  }, []);

  return (
    <View className="h-full bg-white">
      <View className="h-2/3 bg-slate-100">
        <ScrollView>
          {items.length > 0 &&
            items.map((item) => (
              <TouchableOpacity
                key={item.id}
                className="relative flex-row my-1 ml-2 mr-3 p-2 rounded-lg bg-white"
                onPress={() => navigation.navigate("Detail", item)}
              >
                <Image
                  className="w-24 mr-3"
                  resizeMode="cover"
                  source={{
                    uri:
                      item.imageUrl +
                      "?imwidth=1080&filter=packshot&imformat=jpeg",
                  }}
                />
                <View className="flex-1 py-4">
                  <Text className="uppercase text-s font-bold">
                    {item.model}
                  </Text>
                  <Text className="capitalize">{item.brand}</Text>
                  {item.size && (
                    <Text className="mt-2 uppercase text-xs text-slate-400">
                      Size {item.size}
                    </Text>
                  )}
                </View>
                <View className="justify-center">
                  <Text className="font-medium">{item.price} €</Text>
                </View>

                <TouchableOpacity
                  className="absolute right-1 top-1 "
                  onPress={() => removeItem(item.id)}
                >
                  <XCircleIcon color={"gray"} size="22" />
                </TouchableOpacity>
              </TouchableOpacity>
            ))}

          {items.length === 0 && (
            <View>
              <Text>Your bag is Empty</Text>
            </View>
          )}
        </ScrollView>
      </View>
      <View className="h-1/3 w-full shadow shadow-slate-400 bg-white pt-5 px-5 rounded-t-2xl">
        <View className="flex-row justify-between mt-4s">
          <Text className="text-sm text-gray-500">Subtotal</Text>
          <Text className="text-sm text-gray-700">
            {numToLocaleStr(subTotal)} €
          </Text>
        </View>
        <View className="flex-row justify-between mt-2 pb-4 border-b border-slate-300">
          <Text className="text-sm text-gray-500">Delivery fee</Text>
          <Text className="text-sm text-gray-700">
            {numToLocaleStr(DELIVERY_FEE)} €
          </Text>
        </View>
        <View className="flex-row justify-between mt-4">
          <Text className="text-sm  font-extrabold uppercase">Total</Text>
          <Text className="text-sm font-extrabold">
            {numToLocaleStr(subTotal + DELIVERY_FEE)} €
          </Text>
        </View>
        <TouchableOpacity className="py-5 px-10 bg-red-400 mt-8">
          <Text className="text-white font-extrabold text-sm uppercase text-center">
            Proceed to Payment
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CartScreen;
