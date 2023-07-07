import React, { useState } from "react";
import { Image, Text, View, TouchableOpacity } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
  ChevronLeftIcon,
  ShoppingBagIcon,
} from "react-native-heroicons/outline";
import { useDispatch, useSelector } from "react-redux";
import {
  itemExistInCart,
  nbItemsInCart,
  setItemToCart,
} from "../store/features/cart/cartSlice";

const SIZES = Array(12)
  .fill(0)
  .map((_, index) => index + 36);

function DetailScreen() {
  const dispatch = useDispatch();
  const { params: product } = useRoute();
  const { navigate, goBack } = useNavigation();
  const [selectedSize, setSelectedSize] = useState(null);
  const { brand, model, description, price, imageUrl } = product;
  const itemsInCart = useSelector(nbItemsInCart);
  const productInCart = useSelector(itemExistInCart(product?.id));

  const addToCart = () =>
    dispatch(setItemToCart({ ...product, size: selectedSize }));

  return (
    <View className="relative bg-slate-100">
      <Image
        className="h-1/2 bg-slate-500"
        resizeMode="center"
        source={{
          uri: imageUrl + "?imwidth=1080&filter=packshot&imformat=jpeg",
        }}
      />
      <TouchableOpacity
        onPress={() => goBack()}
        className="absolute top-16 left-5 p-1 border border-white bg-white rounded-full"
      >
        <ChevronLeftIcon color="black" size="30" />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigate("Cart")}
        className="absolute top-16 right-5 p-2 border border-white bg-white rounded-full"
      >
        <ShoppingBagIcon color="black" size="26" />
        {!!itemsInCart && (
          <View className="absolute bg-red-400 px-1 rounded-full bottom-0.5 right-1">
            <Text className="text-white text-xs font-bold">{itemsInCart}</Text>
          </View>
        )}
      </TouchableOpacity>
      <View className="w-full h-1/2 shadow shadow-slate-300 bg-white pt-5 px-5 rounded-t-2xl">
        <Text className="uppercase text-2xl font-bold text-center">
          {model}
        </Text>
        <Text className="uppercase text-md font-semibold text-center text-slate-800">
          {brand}
        </Text>
        <Text className="text-xs text-gray-400 mt-2">{description}</Text>

        <Text className="text font-semibold mt-3">Choose your size</Text>
        <View className="flex-row flex-wrap w-full justify-center mt-2">
          {SIZES.map((index) => (
            <TouchableOpacity
              className={`py-3 border border-slate-500 w-14 m-1  ${
                selectedSize === index && "bg-black"
              }`}
              key={index}
              onPress={() => setSelectedSize(index)}
            >
              <Text
                className={`text-center font-semibold ${
                  selectedSize === index && "text-white font-extrabold"
                }`}
              >
                {index}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        <View className="flex-row justify-between items-center mt-4 pt-3 border-t border-slate-200">
          <View>
            <Text className="uppercase text-xs font-bold text-gray-400">
              Price
            </Text>
            <Text className="font-bold text-lg">{price} €</Text>
          </View>
          <TouchableOpacity
            className={`py-3 px-10 bg-red-400 mt-4 ${
              productInCart && "bg-slate-300"
            }`}
            onPress={() => !productInCart && addToCart()}
          >
            <Text className="text-white font-extrabold text-sm uppercase">
              Add to cart
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

export default DetailScreen;
