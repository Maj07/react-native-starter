import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { useEffect } from "react";
import Slider from "@react-native-community/slider";

const Filter = ({ filter, defaultValue, onValueChange = () => {} }) => {
  const { id, name, type, options } = filter;
  const [selectedOptions, setSelectedOptions] = useState({});

  useEffect(() => {
    defaultValue && setSelectedOptions(defaultValue);
  }, [defaultValue]);

  const handleFilterChange = (option) => {
    let currentOptions = { ...selectedOptions };

    if (currentOptions[option?.id]) {
      delete currentOptions[option?.id];
    } else {
      if (type === "radio") {
        // reset all options
        currentOptions = {};
      }
      //set new option
      currentOptions[option?.id] = option;
    }

    setSelectedOptions(currentOptions);
    onValueChange(currentOptions);
  };

  return (
    <View className="p-2 pb-5 bg-white mt-2 mx-2 rounded" key={id}>
      <Text className="text-md font-bold">{name}</Text>
      <View className="flex-row flex-wrap w-full justify-center mt-2">
        {options &&
          options?.map((option) => (
            <TouchableOpacity
              className={`py-3 px-2 border border-slate-500 w-auto m-1 ${
                selectedOptions[option?.id] && "bg-black"
              }`}
              key={option.id}
              onPress={() => handleFilterChange(option)}
            >
              <Text
                className={`text-center ${
                  selectedOptions[option?.id] && "text-white font-semibold"
                }`}
              >
                {option.name}
              </Text>
            </TouchableOpacity>
          ))}

        {type === "slider" && (
          <View className="w-full text-center">
            <Text className="text-center text-md font-bold">
              {defaultValue} €
            </Text>
            <Slider
              style={{ width: "100%", height: 80 }}
              minimumValue={0}
              value={defaultValue}
              step={10}
              maximumValue={200}
              minimumTrackTintColor="#000000"
              maximumTrackTintColor="#e3e3e3"
              onValueChange={onValueChange}
            />
          </View>
        )}
      </View>
    </View>
  );
};

export default Filter;
