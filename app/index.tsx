import { NavigationContainer } from "@react-navigation/native"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { SafeAreaProvider } from "react-native-safe-area-context"
import { Provider as PaperProvider } from "react-native-paper"
import { Camera, Gallery, Styles, Profile } from "@/screens"
import { Home } from "@/screens/home"
import { ResultScreen } from "@/screens/result"
import { Ionicons } from "@expo/vector-icons"
import { ThemeProvider } from "@/components/theme-provider"

const Tab = createBottomTabNavigator()
const Stack = createNativeStackNavigator()

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName

          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline"
          } else if (route.name === "Camera") {
            iconName = focused ? "camera" : "camera-outline"
          } else if (route.name === "Gallery") {
            iconName = focused ? "images" : "images-outline"
          } else if (route.name === "Styles") {
            iconName = focused ? "cut" : "cut-outline"
          } else if (route.name === "Profile") {
            iconName = focused ? "person" : "person-outline"
          }

          return <Ionicons name={iconName} size={size} color={color} />
        },
        tabBarActiveTintColor: "#6366f1",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen name="Home" component={Home} options={{ headerShown: false }} />
      <Tab.Screen name="Camera" component={Camera} options={{ headerShown: false }} />
      <Tab.Screen name="Gallery" component={Gallery} options={{ headerShown: false }} />
      <Tab.Screen name="Styles" component={Styles} options={{ headerShown: false }} />
      <Tab.Screen name="Profile" component={Profile} options={{ headerShown: false }} />
    </Tab.Navigator>
  )
}

export default function App() {
  return (
    <SafeAreaProvider>
      <PaperProvider>
        <ThemeProvider>
          <NavigationContainer>
            <Stack.Navigator>
              <Stack.Screen name="Main" component={MainTabs} options={{ headerShown: false }} />
              <Stack.Screen
                name="Result"
                component={ResultScreen}
                options={{
                  title: "Your New Style",
                  headerBackTitle: "Back",
                }}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </ThemeProvider>
      </PaperProvider>
    </SafeAreaProvider>
  )
}

