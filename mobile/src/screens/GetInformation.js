import {
  StyleSheet,
  Text,
  View,
  useColorScheme,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
  Platform,
} from "react-native";
import React, { useState } from "react";
import theme from "../util/theme";
import Check from "../assets/username-check.json";
import { AntDesign } from "@expo/vector-icons";
import LottieView from "lottie-react-native";
import Toast from "react-native-toast-message";

const GetInformation = ({ navigation, route }) => {
  const { userEmail } = route.params;
  const scheme = useColorScheme();
  const color = theme(scheme);
  const [username, setUsername] = useState("");

  const updateUsername = async () => {
    if (!username.trim()) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Please enter a username.",
      });
      return;
    }

    try {
      const response = await fetch(
        "http://10.84.90.79:8000/api/user/update-username",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: userEmail,
            username: username,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        Toast.show({
          type: "success",
          text1: "Success",
          text2: "Username updated successfully.",
          position: "bottom",
        });
        navigation.navigate("HomeDrawer", { userEmail });
      } else {
        Toast.show({
          type: "error",
          text1: "Error",
          text2: data.message || "Failed to update username.",
          position: "bottom",
        });
      }
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "An error occurred while updating the username.",
        position: "bottom"
      });
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={[styles.container, { backgroundColor: color.background }]}
    >
      <View style={{ bottom: "10%" }}>
        <Text style={[styles.title, { color: color.text }]}>
          Choose a Username!
        </Text>
        <Text style={[styles.subTitle, { color: color.text }]}>
          This is how other users will find you
        </Text>
      </View>
      <View style={styles.usernameInputRow}>
        <TextInput
          style={[styles.input, { color: color.text }]}
          placeholder="Username"
          placeholderTextColor="gray"
          value={username}
          onChangeText={setUsername}
        />
        {username && (
          <LottieView
            autoPlay
            loop={false}
            style={styles.lottie}
            source={Check}
          />
        )}
      </View>
      <View style={styles.footer}>
        <TouchableOpacity onPress={updateUsername}>
          <AntDesign name="arrowright" size={32} color={color.text} />
        </TouchableOpacity>
      </View>
      <Toast />
    </KeyboardAvoidingView>
  );
};

export default GetInformation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    alignItems: "flex-start",
  },
  title: {
    fontWeight: "600",
    fontSize: 24,
  },
  subTitle: {
    marginTop: 5,
  },
  input: {
    marginTop: "10%",
    fontSize: 24,
  },
  footer: {
    position: "absolute",
    bottom: 70,
    right: 20,
  },
  usernameInputRow: {
    flexDirection: "row",
    alignItems: "center", 
    justifyContent: "space-between",
    width: "100%", 
  },

  input: {
    flex: 1, 
    marginRight: 10,
    marginTop: "10%",
    fontSize: 24,
  },

  lottie: {
    width: 50,
    height: 50,
    marginTop: '10%'
  },

});
