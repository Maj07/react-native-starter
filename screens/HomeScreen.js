import React, { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  Text,
  SafeAreaView,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import {
  ShoppingBagIcon,
  AdjustmentsIcon,
} from "react-native-heroicons/outline";
import { useSelector, useDispatch } from "react-redux";

import { getProducts } from "../api";
import { nbItemsInCart } from "../store/features/cart/cartSlice";
import {
  selectNbOfFilters,
  selectProducts,
  setProducts,
} from "../store/features/products/productsSlice";

const HomeScreen = () => {
  const products = useSelector(selectProducts);
  const itemsInCart = useSelector(nbItemsInCart);
  const filterItems = useSelector(selectNbOfFilters);
  const dispatch = useDispatch();
  const { navigate } = useNavigation();

  useEffect(() => {
    async function getData() {
      const datas = await getProducts();
      dispatch(setProducts(datas));
    }
    getData();
  }, []);

  const goToDetails = (item) => navigate("Detail", item);
  const goToCart = () => navigate("Cart");
  const goToFilter = () => navigate("Filter");

  return (
    <SafeAreaView className="bg-white">
      <View className="relative flex-row justify-between px-5 py-2">
        <Text className="uppercase text-xl font-bold">Sneakershop</Text>
        <TouchableOpacity onPress={goToCart}>
          <ShoppingBagIcon color="black" size="32" strokeWidth={1.5} />

          {!!itemsInCart && (
            <View className="absolute bg-red-400 px-1 rounded-full bottom-0 right-0">
              <Text className="text-white text-xs font-bold">
                {itemsInCart}
              </Text>
            </View>
          )}
        </TouchableOpacity>
      </View>
      <View className="flex-row justify-between px-5 py-2 mb-2">
        <Text className="text-lg font-bold">Products</Text>
        <View className="flex-row justify-between">
          <TouchableOpacity
            className="relative border border-slate-400 p-1"
            onPress={goToFilter}
          >
            <AdjustmentsIcon color="black" size="30" strokeWidth="1.5" />
            {!!filterItems && (
              <View className="absolute bg-slate-900 px-1 rounded-full -bottom-1 -right-1">
                <Text className="text-white text-xs font-bold">
                  {filterItems}
                </Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView className="h-full bg-white">
        <View className="flex flex-row flex-wrap justify-between pb-32 px-0.5">
          {products.map((item) => (
            <TouchableOpacity key={item.id} onPress={() => goToDetails(item)}>
              <View className="flex w-48 h-60 pb-4 bg-white">
                <View className="flex-1 bg-slate-200">
                  <Image
                    className="flex-1"
                    resizeMode="cover"
                    source={{
                      uri:
                        item.imageUrl +
                        "?imwidth=1080&filter=packshot&imformat=jpeg",
                    }}
                  ></Image>
                </View>
                <View className="p-1">
                  <Text className="uppercase text-s font-bold">
                    {item.model}
                  </Text>
                  <Text className="capitalize">{item.brand}</Text>
                  <Text className="text-xs text-slate-500 mt-1">
                    {item.price} €
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}

          {products.length === 0 && <Text>No results</Text>}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
