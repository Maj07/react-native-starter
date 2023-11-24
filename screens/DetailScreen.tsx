import React from 'react';
import { Image, Text, View, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { ChevronLeftIcon } from 'react-native-heroicons/outline';

import { Product } from '@models/Product';

function DetailScreen() {
  const { params: product } = useRoute();
  const { goBack } = useNavigation();
  const { brand, model, description, price, imageUrl } = product as Product;

  return (
    <View className="relative bg-slate-100">
      <Image
        className="h-1/2 bg-slate-500"
        resizeMode="center"
        source={{
          uri: imageUrl + '?imwidth=1080&filter=packshot&imformat=jpeg',
        }}
      />
      <TouchableOpacity
        onPress={() => goBack()}
        className="absolute top-16 left-5 p-1 border border-white bg-white rounded-full"
      >
        <ChevronLeftIcon
          color="black"
          size="30"
        />
      </TouchableOpacity>
      <View className="w-full h-1/2 shadow shadow-slate-300 bg-white pt-5 px-5 rounded-t-2xl">
        <Text className="uppercase text-2xl font-bold text-center">{model}</Text>
        <Text className="uppercase text-md font-semibold text-center text-slate-800">{brand}</Text>
        <Text className="text-xs text-gray-400 mt-2">{description}</Text>

        <Text className="text font-semibold mt-3">Choose your size</Text>
        <View className="flex-row flex-wrap w-full justify-center mt-2" />
        <View className="flex-row justify-between items-center mt-4 pt-3 border-t border-slate-200">
          <View>
            <Text className="uppercase text-xs font-bold text-gray-400">Price</Text>
            <Text className="font-bold text-lg">{price} €</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

export default DetailScreen;
