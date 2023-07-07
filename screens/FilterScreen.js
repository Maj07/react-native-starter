import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from "react-native";
import React, { useLayoutEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { ChevronLeftIcon, TrashIcon } from "react-native-heroicons/outline";
import SortBy from "../components/Filter/SortBy";
import ColorFilter from "../components/Filter/ColorFilter";
import BrandFilter from "../components/Filter/BrandFilter";
import PriceFilter from "../components/Filter/PriceFilter";
import { useDispatch } from "react-redux";
import { resetFilters } from "../store/features/products/productsSlice";

const FilterScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "Filter",
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.goBack()} className="p-2">
          <ChevronLeftIcon color="black" size="30" />
        </TouchableOpacity>
      ),
    });
  }, []);

  const clearFilters = () => {
    dispatch(resetFilters());
  };

  return (
    <SafeAreaView className="bg-slate-100">
      <TouchableOpacity
        className="w-full p-2 pt-4"
        onPress={() => clearFilters()}
      >
        <Text className="text-xs text-right font-semibold">
          Clear all filters
          <TrashIcon
            color="black"
            size="18"
            style={{ marginLeft: 8 }}
          ></TrashIcon>
        </Text>
      </TouchableOpacity>
      <View className="h-full">
        <ScrollView>
          <SortBy />
          <ColorFilter />
          <BrandFilter />
          <PriceFilter />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default FilterScreen;
