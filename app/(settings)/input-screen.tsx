import { ThemedText } from "@/components/ThemedText";
import { Layout } from "@/constants/Layout";
import { useNavigation, useRoute } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useCallback, useEffect, useState } from "react";
import { TextInput, View, StyleSheet } from "react-native";
import { DataListParamList } from "../(tabs)/settings-navigator";
import { ThemedButton } from "@/components/ThemedButton";
import Entypo from "@expo/vector-icons/Entypo";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { setAdvancedParam } from "@/store/settingsSlice";

import { RouteProp } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import { useAppDispatch } from "@/store/store";

const InputScreen = () => {
  const navigation = useNavigation<StackNavigationProp<DataListParamList>>();
  const route: RouteProp<{
    params: {
      id: string;
      title: string;
      description: string;
      min: number;
      max: number;
      type: string;
      initialValue: number;
    };
  }> = useRoute();

  const { id, title, description, min, max, type, initialValue } = route.params;

  const [value, setValue] = useState(`${initialValue}`);
  const [errorText, setErrorText] = useState("");
  const [saveDisabled, setSaveDisabled] = useState(false);

  const dispatch = useAppDispatch();

  const updateValue = useCallback(async (value: any) => {
    try {
      await AsyncStorage.setItem(id, value);
      dispatch(setAdvancedParam({ id, value }));
      navigation.navigate("AdvancedSettingsScreen");
    } catch (err) {
      console.log(err);
    }
  }, []);

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
      headerRight: () => (
        <ThemedButton
          type="transparent"
          disabled={saveDisabled}
          onPress={() => {
            updateValue(value);
          }}
        >
          <AntDesign name="save" size={24} color="black" />
        </ThemedButton>
      ),
    });
  }, [saveDisabled]);

  const getPlaceholder = () => {
    if (min != null && max != null) {
      return `from ${min} to ${max}`;
    }
    return "";
  };

  const onTextChanged = (text: any) => {
    setValue(text);

    let error: string | undefined = "";
    let disabled: boolean | undefined = false;

    if (text == undefined || text == null || text == "") {
      error = "Please enter a value.";
      disabled = true;
    }

    if (type === "number" || type === "integer") {
      if (isNaN(text)) {
        error = "Input is not a number.";
        disabled = true;
      }

      if (
        max !== undefined &&
        min !== undefined &&
        (text < min || text > max)
      ) {
        error = "Value out of bounds.";
        disabled = true;
      }

      if (type === "integer" && text % 1 !== 0) {
        error = "Input is not an integer.";
        disabled = true;
      }
    }

    setErrorText(error);
    setSaveDisabled(disabled);
  };

  return (
    <View style={styles.container}>
      <ThemedText type="subtitleHeader">{description}</ThemedText>

      <TextInput
        style={styles.textInput}
        placeholder={`Enter a value ${getPlaceholder()}`}
        value={value}
        onChangeText={(text: string) => onTextChanged(text)}
      />

      <ThemedText type="danger">{errorText}</ThemedText>
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
