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
import Toast from "react-native-toast-message";
import * as AppleAuthentication from "expo-apple-authentication";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LoginScreen = ({ navigation }) => {
  const scheme = useColorScheme();
  const color = theme(scheme);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const SecureLogin = () => {
    fetch("http://172.16.21.86:8000/api/login", {
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
        if (!response.ok) throw new Error("Login failed");
        return response.json();
      })
      .then((data) => {
        console.log("Success:", data);
        AsyncStorage.setItem("userToken", data.token);
        navigation.navigate("HomeScreen", { userEmail: data.email });
      })
      .catch((error) => {
        console.error("Error:", error);
        setErrorMessage("Login failed. Please check your credentials.");
      });
  };

  const handleGoToRegister = () => {
    navigation.navigate("RegisterScreen")
  }
 
  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: color.background }]}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.greetingContainer}>
        <Text style={[styles.helloText, { color: color.text }]}>Welcome</Text>
        <Text style={styles.thereText}>back!</Text>
        <Text style={[styles.introText, { color: color.text }]}>
          Sign in and stay organized.
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
        <TouchableOpacity
          style={[styles.loginButton, { backgroundColor: color.button }]}
          onPress={SecureLogin}
        >
          <Text style={[styles.loginButtonText, { color: color.buttonText }]}>
            Login
          </Text>
        </TouchableOpacity>
      </View>

      {/* <TouchableOpacity style = {{alignSelf: 'center', marginVertical: 20,}}onPress={handlePasswordReset}>
        <Text style={[styles.registerText]}>
          Forgot Password? <Text style={[styles.boldText, {fontWeight: 'bold', color: color.text}]}>Tap here</Text>
        </Text>
      </TouchableOpacity> */}

      <TouchableOpacity style = {{marginTop: '10%'}} onPress={handleGoToRegister}>
        <Text style={[styles.registerText]}>
          Don't have an account?{" "}
          <Text style={[styles.registerHereText, { color: color.text }]}>
            Register here
          </Text>
        </Text>
      </TouchableOpacity>

      <Toast />
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

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
  loginButton: {
    borderRadius: 20,
    padding: 20,
    width: "70%",
    alignItems: "center",
    alignSelf: "center",
  },
  loginButtonText: {
    fontSize: 18,
  },
  registerText: {
    color: "#585858",
    textAlign: "center",
  },
});