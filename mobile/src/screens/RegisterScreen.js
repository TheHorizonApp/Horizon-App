import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  useColorScheme,
} from "react-native";
import theme from "../util/theme";
import { Header } from "react-native-elements";
import { Entypo } from "@expo/vector-icons";
import Toast from "react-native-toast-message";

const RegisterScreen = ({ navigation }) => {
  const scheme = useColorScheme();
  const color = theme(scheme);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const SecureSignup = () => {
    fetch("http://172.16.21.86:8000/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((response) => {
        if (response.ok) {
          console.log("response", response)
          return response.json();
        } else {
          throw new Error("Failed to register. Please try again.");
        }
      })
      .then((data) => {
        console.log("data", data)
        navigation.navigate("GetInformation", { userEmail: data.email });
      })
      .catch((error) => {
        console.error("Error:", error);
        Toast.show({
          type: "error",
          position: "bottom",
          text1: "Error",
          text2: error.message,
          visibilityTime: 4000,
          autoHide: true,
          topOffset: 30,
          bottomOffset: 40,
          style: { backgroundColor: color.button },
          text2Style: { color: color.buttonText },
        });
      });
  };

  const handleGoToLogin = () => {
    navigation.navigate("LoginScreen")
  }
  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: color.background }]}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.greetingContainer}>
        <Text style={[styles.helloText, { color: color.text }]}>Hello</Text>
        <Text style={styles.thereText}>there!</Text>
        <Text style={[styles.introText, { color: color.text }]}>
          Sign up and stay on track.
        </Text>
      </View>

      <View style={{ justifyContent: "center" }}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#636363"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#636363"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          placeholderTextColor="#636363"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
        />
        <TouchableOpacity
          style={[styles.registerButton, { backgroundColor: color.button }]}
          onPress={SecureSignup}
        >
          <Text
            style={[styles.registerButtonText, { color: color.buttonText }]}
          >
            Register
          </Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={handleGoToLogin}>
        <Text style={styles.loginText}>
          Already have an account?{" "}
          <Text style={[styles.loginHereText, { color: color.text }]}>
            Login here
          </Text>
        </Text>
      </TouchableOpacity>
      <Toast />
    </KeyboardAvoidingView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  greetingContainer: {
    alignSelf: "flex-start",
    marginLeft: 10,
    marginBottom: 20,
  },
  helloText: {
    fontSize: 42,
  },
  thereText: {
    fontSize: 35,
    color: "#625F5F",
  },
  introText: {
    marginVertical: 20,
  },
  input: {
    padding: 20,
    width: "95%",
    borderColor: "#C0C0C0",
    borderWidth: 3,
    borderRadius: 20,
    marginBottom: 20,
    paddingLeft: 10,
    color: "gray",
    alignSelf: "center",
  },
  registerButton: {
    borderRadius: 20,
    padding: 25,
    width: "85%",
    alignItems: "center",
    alignSelf: "center",
  },
  registerButtonText: {
    fontSize: 18,
  },
  loginText: {
    marginTop: 30,
    color: "#585858",
    textAlign: "center",
  },
});
