// AnimatedButton.tsx
import React, { useRef, forwardRef, ReactNode } from "react";
import {
  Pressable,
  Animated,
  GestureResponderEvent,
  StyleProp,
  ViewStyle,
  PressableProps, // Import PressableProps
  View, // Import View for ref typing if needed, though Pressable ref is better
} from "react-native";

// Define props specifically for AnimatedButton
// Extend PressableProps but override/specify types we handle differently
interface AnimatedButtonProps
  extends Omit<
    PressableProps,
    "children" | "style" | "onPressIn" | "onPressOut"
  > {
  children: ReactNode; // Ensure children is ReactNode, not the function type
  style?: StyleProp<ViewStyle>; // Style for the Animated.View container
  className?: string; // className for the Animated.View container (NativeWind)
  onPress?: PressableProps["onPress"]; // Keep standard onPress
  onPressIn?: PressableProps["onPressIn"]; // Allow passing onPressIn
  onPressOut?: PressableProps["onPressOut"]; // Allow passing onPressOut
}

const AnimatedButton = forwardRef<View, AnimatedButtonProps>( // Ref typically targets the touchable element (Pressable/View)
  (
    {
      children,
      style,
      className, // Destructure className for Animated.View

      ...pressableProps // Gather remaining props for Pressable
    },
    ref, // Forwarded ref
  ) => {
    // Apply the animated scale transformation

    // Combine incoming style with animated style
    // Order matters: animatedStyle should usually come last to override transforms

    return (
      <Pressable
        ref={ref as React.Ref<View>} // Cast ref if needed, Pressable uses View internally
        {...pressableProps} // Spread other Pressable-specific props (accessibility, hitSlop, etc.)
      >
        {/* Apply styles/className and animation to Animated.View */}
        <Animated.View className={className}>{children}</Animated.View>
      </Pressable>
    );
  },
);

// Add display name for better debugging
AnimatedButton.displayName = "AnimatedButton";

export default AnimatedButton;
