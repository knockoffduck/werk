// app/modal.tsx
import { View, Text, Button } from "react-native";
import { Link, Stack, useRouter } from "expo-router";

export default function ActiveWorkout() {
  const router = useRouter();

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
      }}
    >
      {/* Configure the header for this modal screen */}
      <Stack.Screen
        options={{
          headerShown: true, // Show a header for the modal
          title: "Modal View", // Set a title for the modal header
          presentation: "modal", // This is the key option for the slide-up effect
          // You can add other header options here, like buttons
          // headerLeft: () => ( /* Custom header left button (e.g., close) */ )
          // headerRight: () => ( /* Custom header right button */ )
        }}
      />

      <Text style={{ fontSize: 20 }}>This is a modal!</Text>
      <Button onPress={() => router.back()} title="Dismiss" />
      {/* Alternatively, use a Link to go back which triggers the modal dismissal */}
      {/* <Link href="../" asChild><Button title="Dismiss with Link" /></Link> */}
    </View>
  );
}
