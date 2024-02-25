import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Settings = () => {

  const signOut = async () => {
    try {
      await AsyncStorage.removeItem("userToken");
      navigation.navigate("LoginScreen");
    } catch {
      return false;
    }
  };
  
  return (
    <View>
      <TouchableOpacity
        style={{ justifyContent: "center", alignItems: "center", flex: 0.5 }}
        onPress={signOut}
      >
        <Text>Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Settings;

const styles = StyleSheet.create({});
