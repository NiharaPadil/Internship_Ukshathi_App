import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack
      initialRouteName="index"
      screenOptions={{
        headerShown: false, // Hide the header for all screens by default
      }}
    >
      {/* Define screens here */}
      {/* <Stack.Screen name="index" options={{ title: "index" }} /> */}
      {/* <Stack.Screen name="MainSignup" options={{ title: "Sign Up" }} />*/}
      {/*<Stack.Screen name="home" options={{ title: "Home" }} /> */}
    </Stack>
  );
}
