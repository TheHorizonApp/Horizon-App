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
import { Entypo, FontAwesome5 } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DateList from "../components/DateList";
import GroupList from "../components/GroupList";

const HomeScreen = ({ navigation, route }) => {
  const signOut = async () => {
    try {
      await AsyncStorage.removeItem("userToken");
      navigation.navigate("LoginScreen");
    } catch {
      return false;
    }
  };
  const [selectedDate, setSelectedDate] = useState(formatDate(new Date()));
  function formatDate(date) {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = ("0" + (d.getMonth() + 1)).slice(-2);
    const day = ("0" + d.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  }
  useEffect(() => {
    const fetchUsername = async () => {
      const email = await AsyncStorage.getItem("userEmail");
      if (email) {
        fetch(`http://10.84.90.79:8000/api/user/username?email=${email}`)
          .then((response) => response.text())
          .then((text) => {
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
              navigation.toggleDrawer();
            }}
          >
            <Entypo name="menu" size={26} color={color.text} />
          </TouchableOpacity>
        }
        rightComponent={
          <TouchableOpacity style = {{right: 5}}>
        <FontAwesome5 name="user-circle" size={32} color={color.text} />
        </TouchableOpacity>
        }
        containerStyle={{
          backgroundColor: "transparent",
          borderBottomWidth: 0,
        }}
      />
      <View style={styles.header}>
        <View style={styles.textContainer}>
          <Text style={[styles.greeting, { color: color.text }]}>
            Hello {username}
          </Text>
          {/* <Text style={[styles.name, { color: "gray" }]}>{timeOfDay}!</Text> */}
        </View>
      </View>
      {/* <DateList onDateSelect={(date) => setSelectedDate(date)} /> */}
      {/* <TouchableOpacity
        style={{ justifyContent: "center", alignItems: "center", flex: 0.5 }}
        onPress={signOut}
      >
        <Text>Sign Out</Text>
      </TouchableOpacity> */}
      <GroupList />
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
    padding: 20,
  },
  textContainer: {
    flexDirection: "column",
    alignItems: "flex-start",
  },
  greeting: {
    fontSize: 32,
    fontWeight: "400",
  },
  name: {
    marginTop: 10,
    fontSize: 16,
  },
});
