import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import OnboardingScreen from "./src/screens/OnboardingScreen";
import LoginScreen from "./src/screens/LoginScreen";
import RegisterScreen from "./src/screens/RegisterScreen";
import HomeScreen from "./src/screens/HomeScreen";
import GetInformation from "./src/screens/GetInformation";
import Settings from "./src/screens/Settings";
import { View, Text, useColorScheme } from "react-native";
import theme from "./src/util/theme";
import { MaterialIcons } from '@expo/vector-icons'

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function DrawerNavigator() {

  const scheme = useColorScheme();
  const color = theme(scheme)

  return (
    <Drawer.Navigator initialRouteName="HomeScreen" screenOptions={{}}>
      <Drawer.Screen
        options={{
          headerShown: false,
          drawerLabel: () => (
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <MaterialIcons name="home" size={24} color={color.text} />
              <Text style={{ color: color.text, marginLeft: 10, fontSize: 16 }}>
                Home
              </Text>
            </View>
          ),
        }}
        name="HomeScreen"
        component={HomeScreen}
      />
    </Drawer.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          options={{ headerShown: false }}
          name="OnboardingScreen"
          component={OnboardingScreen}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="LoginScreen"
          component={LoginScreen}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="RegisterScreen"
          component={RegisterScreen}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="HomeDrawer"
          component={DrawerNavigator}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="GetInformation"
          component={GetInformation}
        />
        <Stack.Screen
          options={{
            headerShown: false,
            presentation: "modal",
            animation: "slide_from_bottom",
          }}
          name="Settings"
          component={Settings}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
