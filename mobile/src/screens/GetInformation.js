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

const GetInformation = ({ navigation, route }) => {
  const { userEmail } = route.params;
  console.log("user email", userEmail);
  const scheme = useColorScheme();
  const color = theme(scheme);
  const [username, setUsername] = useState("");

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
        <TouchableOpacity
          onPress={() => navigation.navigate("HomeScreen", { userEmail })}
        >
          <AntDesign name="arrowright" size={32} color={color.text} />
        </TouchableOpacity>
      </View>
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
    justifyContent: "space-between",
  },
  lottie: {
    width: 50,
    height: 50,
    marginTop: "10%",
    alignSelf: "auto",
  },
});
