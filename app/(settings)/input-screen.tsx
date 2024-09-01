import { ThemedText } from "@/components/ThemedText";
import { Layout } from "@/constants/Layout";
import { useNavigation, useRoute } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useCallback, useEffect, useState } from "react";
import { TextInput, View, StyleSheet } from "react-native";
import { DataListParamList } from "../(tabs)/settings-navigator";
import { ThemedButton } from "@/components/ThemedButton";
import Entypo from "@expo/vector-icons/Entypo";

import { RouteProp } from "@react-navigation/native";

const InputScreen = () => {
  const navigation = useNavigation<StackNavigationProp<DataListParamList>>();
  const route: RouteProp<{
    params: {
      title: string;
      description: string;
      min: number;
      max: number;
      type: string;
      intialValue: number;
    };
  }> = useRoute();

  const { title, description, min, max, type, intialValue } = route.params;

  const [value, setValue] = useState(`${intialValue}`);

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

  const getPlaceholder = () => {
    if (min != null && max != null) {
      return `from ${min} to ${max}`;
    }
    return "";
  };

  const onTextChanged = useCallback((text: any) => {
    if (type === 'number' || type === 'integer') {
        if (isNaN(text)) {
            console.log("Not a number");
            return;
        }

        if (max && min) {
            if (text < min && text > max) {
                console.log("Value out of bounds");
                return;
            }
        }

        if (type === 'integer' && text % 1 !== 0) {
            console.log("Not an integer");
            return;
        }
    }

    setValue(text)
  }, [])

  return (
    <View style={styles.container}>
      <ThemedText type="subtitleHeader">{description}</ThemedText>

      <TextInput
        style={styles.textInput}
        placeholder={`Enter a value ${getPlaceholder()}`}
        value={value !== 'undefined'? value : ''}
        onChangeText={onTextChanged}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: Layout.padding,
  },
  textInput: {
    fontFamily: "WorkSans-Regular",
    borderWidth: 0.5,
    borderRadius: 5,
    marginVertical: 10,
    height: 45,
    padding: Layout.padding,
  },
});

export default InputScreen;
