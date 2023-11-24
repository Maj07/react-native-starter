import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { Text, SafeAreaView, View, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import { getProducts } from '@api/index';
import { selectProducts, setProducts } from '@store/features/products/productsSlice';
import { Product } from '@models/Product';
import { RootStackParamList } from '@models/Router';

const HomeScreen = () => {
  const products: Product[] = useSelector(selectProducts);
  const dispatch = useDispatch();
  const { navigate } = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  useEffect(() => {
    async function getData() {
      const datas = await getProducts();
      dispatch(setProducts(datas));
    }
    getData();
  }, []);

  const goToDetails = (item: Product) => navigate('Detail', item);

  return (
    <SafeAreaView className="bg-white">
      <View className="relative flex-row justify-between px-5 py-2">
        <Text className="uppercase text-xl font-bold">App Name</Text>
      </View>
      <View className="flex-row justify-between px-5 py-2 mb-2">
        <Text className="text-lg font-bold">Products</Text>
      </View>
      <ScrollView className="h-full bg-white">
        <View className="flex flex-row flex-wrap justify-between pb-32 px-0.5">
          {products.map((item) => (
            <TouchableOpacity
              key={item.id}
              onPress={() => goToDetails(item)}
            >
              <View className="flex w-48 h-60 pb-4 bg-white">
                <View className="flex-1 bg-slate-200">
                  <Image
                    className="flex-1"
                    resizeMode="cover"
                    source={{
                      uri: item.imageUrl + '?imwidth=1080&filter=packshot&imformat=jpeg',
                    }}
                  />
                </View>
                <View className="p-1">
                  <Text className="uppercase text-s font-bold">{item.model}</Text>
                  <Text className="capitalize">{item.brand}</Text>
                  <Text className="text-xs text-slate-500 mt-1">{item.price} €</Text>
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
