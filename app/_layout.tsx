import "~/global.css";

import {
  DarkTheme,
  DefaultTheme,
  Theme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import * as React from "react";
import { Platform, View } from "react-native";
import { NAV_THEME } from "~/lib/constants";
import { useColorScheme } from "~/lib/useColorScheme";
import { PortalHost } from "@rn-primitives/portal";
import { ThemeToggle } from "~/components/ThemeToggle";
import { setAndroidNavigationBar } from "~/lib/android-navigation-bar";
import { cn } from "~/lib/utils";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const LIGHT_THEME: Theme = {
  ...DefaultTheme,
  colors: NAV_THEME.light,
};
const DARK_THEME: Theme = {
  ...DarkTheme,
  colors: NAV_THEME.dark,
};

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export default function RootLayout() {
  const hasMounted = React.useRef(false);
  const { colorScheme, isDarkColorScheme } = useColorScheme();
  const [isColorSchemeLoaded, setIsColorSchemeLoaded] = React.useState(false);

  useIsomorphicLayoutEffect(() => {
    if (hasMounted.current) {
      return;
    }

    if (Platform.OS === "web") {
      // Adds the background color to the html element to prevent white background on overscroll.
      document.documentElement.classList.add("bg-background");
    }
    setAndroidNavigationBar(colorScheme);
    setIsColorSchemeLoaded(true);
    hasMounted.current = true;
  }, []);

  if (!isColorSchemeLoaded) {
    return null;
  }
  const rootClassName = isDarkColorScheme ? "dark" : "";

  const queryClient = new QueryClient();

  return (
    <View className={cn(rootClassName)} style={{ flex: 1 }}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider value={isDarkColorScheme ? DARK_THEME : LIGHT_THEME}>
          <StatusBar style={isDarkColorScheme ? "light" : "dark"} />
          <Stack>
            {/* Add this Stack.Screen for your (tabs) layout */}
            {/* The name should match the directory name */}
            {/* headerShown: false prevents the root stack from adding a header for this route */}
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

            {/* Add other Stack.Screen components for any other routes not in (tabs) */}

            {/* e.g., <Stack.Screen name="modal" options={{ presentation: 'modal' }} /> */}
          </Stack>
          <PortalHost />
        </ThemeProvider>
      </QueryClientProvider>
    </View>
  );
}

const useIsomorphicLayoutEffect =
  Platform.OS === "web" && typeof window === "undefined"
    ? React.useEffect
    : React.useLayoutEffect;
