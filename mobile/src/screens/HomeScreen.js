import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useColorScheme,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import React, { useState, useEffect } from "react";
import theme from "../util/theme";
import { Header } from "react-native-elements";
import { Entypo, Octicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import AsyncStorage from "@react-native-async-storage/async-storage";

const HomeScreen = ({ navigation, route }) => {
  const signOut = async () => {
    try {
      await AsyncStorage.removeItem("userToken");
      navigation.navigate("LoginScreen");
    } catch {
      return false;
    }
  };

  useEffect(() => {
    const fetchUsername = async () => {
      const email = await AsyncStorage.getItem("userEmail");
      if (email) {
        fetch(`http://10.84.90.79:8080/api/user/username?email=${email}`)
          .then((response) => response.text()) 
          .then((text) => {
            console.log("Raw response:", text);
            return JSON.parse(text);
          })
          .then((data) => {
            setUsername(data.username);
          })
          .catch((error) => {
            console.error("Error fetching username:", error);
          });
      }
    };

    fetchUsername();
  }, []);

  const scheme = useColorScheme();
  const color = theme(scheme);
  const [timeOfDay, setTimeOfDay] = useState("");
  const [username, setUsername] = useState("");
  
  useEffect(() => {
    const hour = new Date().getHours();
    setTimeOfDay(
      hour < 12 ? "Good Morning" : hour < 18 ? "Good Afternoon" : "Good Evening"
    );
  });

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: color.background }]}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <Header
        leftComponent={
          <TouchableOpacity
            onPress={() => {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
              navigation.toggleDrawer();
            }}
          >
            <Octicons name="three-bars" size={26} color={color.text} />
          </TouchableOpacity>
        }
        containerStyle={{
          backgroundColor: "transparent", // To match the LinearGradient
          borderBottomWidth: 0, // Remove default border at the bottom
        }}
      />
      <View style={styles.header}>
        <View style={styles.textContainer}>
          <Text style={[styles.greeting, { color: color.text }]}>
            Hello {username}
          </Text>
          <Text style={[styles.name, { color: "gray" }]}>{timeOfDay}!</Text>
        </View>
      </View>
      <TouchableOpacity
        style={{
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "white",
        }}
        onPress={signOut}
      >
        <Text>Sign Out</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "10%",
    padding: 20,
  },
  textContainer: {
    flexDirection: "column",
    alignItems: "flex-start",
  },
  greeting: {
    fontSize: 26,
    fontWeight: "400",
  },
  name: {
    marginTop: 10,
    fontSize: 16,
  },
});
