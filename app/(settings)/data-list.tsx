import { FlatList, StyleSheet, View } from "react-native";

import { Layout } from "@/constants/Layout";
import DataItem from "@/components/DataItem";

import { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";

import { ThemedButton } from "@/components/ThemedButton";
import Entypo from "@expo/vector-icons/Entypo";

export interface DataListProps {
  title: string;
  data: any[];
  updateValue: (value: any) => void;
  selectedValue?: string;
}

export default function DataListScreen({
  title,
  data,
  updateValue,
  selectedValue,
}: DataListProps) {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerTitle: title,
      headerLeft: () => (
        <ThemedButton
          type="transparent"
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Entypo name="chevron-thin-left" size={24} color="black" />
        </ThemedButton>
      ),
    });
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={(itemData) => {
          const item = itemData.item;
          return (
            <DataItem
              title={item}
              onPress={() => updateValue(item)}
              checked={item === selectedValue}
            />
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: Layout.padding,
  },
});
