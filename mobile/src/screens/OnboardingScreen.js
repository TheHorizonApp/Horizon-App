import React, { useState, useRef, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
  Dimensions,
  useColorScheme,
} from "react-native";
import AnimatedDots from "../components/AnimatedDots";
import * as Haptics from "expo-haptics";
import theme from "../util/theme";
import { Entypo } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LottieView from "lottie-react-native";
import Onboarding1 from "../assets/onboarding1.json";
import Onboarding2 from "../assets/onboarding2.json";
import Onboarding3 from "../assets/onboarding3.json";

const { width } = Dimensions.get("window");

const OnboardingScreen = ({ navigation }) => {
  const scheme = useColorScheme();
  const color = theme(scheme);

  const onboardingData = [
    {
      title: "Here, we get work done.",
      description:
        "Efficiently organize your schedule with our integrated calendar.",
      animation: Onboarding1,
    },
    {
      title: "Collaborate with Others",
      description: "Create and share your notes with others.",
      animation: Onboarding2,
    },
    {
      title: "Stay Organized",
      description: "Set and get reminded on upcoming deadlines.",
      animation: Onboarding3,
    },
  ];

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const userToken = await AsyncStorage.getItem("userToken");
      if (userToken) {
        navigation.navigate("HomeDrawer", { userToken: userToken });
      } else {
        navigation.navigate("OnboardingScreen");
      }
    } catch (error) {
      console.error("AsyncStorage error:", error);
    }
  };

  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef();
  const renderItem = ({ item, index }) => (
    <View
      style={[
        styles.slide,
        {
          backgroundColor: color.background,
          width: width,
        },
      ]}
    >
      <Text style={[styles.title, { color: color.text }]}>{item.title}</Text>
      <Text style={[styles.description, { color: color.text }]}>
        {item.description}
      </Text>
      <LottieView
        autoPlay
        loop={true}
        style={index === 1 ? styles.lottieLarge : styles.lottie}
        source={item.animation}
      />
    </View>
  );
  return (
    <View style={[styles.container, { backgroundColor: color.background }]}>
      <TouchableOpacity
        style={{ flexDirection: "row-reverse", marginTop: "15%", right: 30 }}
        onPress={() => {
          navigation.navigate("RegisterScreen");
        }}
      >
        <Text style={{ color: "gray", fontWeight: "400", fontSize: 16 }}>
          Skip
        </Text>
      </TouchableOpacity>
      <FlatList
        data={onboardingData}
        renderItem={renderItem}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={(e) => {
          const index = Math.round(
            e.nativeEvent.contentOffset.x /
              e.nativeEvent.layoutMeasurement.width
          );
          setCurrentIndex(index);
          Haptics.selectionAsync();
        }}
        ref={flatListRef}
      />
      <View
        style={{
          bottom: 50,
          width: "95%",
          alignItems: "center",
          justifyContent: "space-between",
          flexDirection: "row",
        }}
      >
        <AnimatedDots
          activeIndex={currentIndex}
          count={onboardingData.length}
        />
        <TouchableOpacity
          onPress={() => {
            if (currentIndex < onboardingData.length - 1) {
              flatListRef.current.scrollToIndex({ index: currentIndex + 1 });
            } else {
              Haptics.notificationAsync(
                Haptics.NotificationFeedbackType.Success
              );
              navigation.navigate("RegisterScreen");
            }
          }}
        >
          <Entypo
            name="chevron-with-circle-right"
            size={50}
            color={color.text}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default OnboardingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    margin: 0,
    padding: 0,
  },
  slide: {
    width: "100%",
    flex: 1,
  },
  image: {
    width: 500,
    height: 300,
    bottom: 60,
    resizeMode: "contain",
  },
  title: {
    fontSize: 42,
    fontWeight: "bold",
    bottom: 50,
    marginTop: "25%",
    marginHorizontal: 20,
    width: "80%",
  },
  description: {
    fontSize: 14,
    marginHorizontal: 20,
    bottom: 40,
    width: "85%",
    fontWeight: "300",
  },
  button: {
    padding: 25,
    position: "absolute",
    bottom: 80,
    borderRadius: 20,
    width: "60%",

    borderWidth: 3,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  lottie: {
    alignSelf: "center",
    width: 500,
    height: 500,
  },
  lottieLarge: {
    alignSelf: "center",
    width: 650, 
    height: 500, 
  },
});
