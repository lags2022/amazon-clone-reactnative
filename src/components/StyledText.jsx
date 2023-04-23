import { Text, StyleSheet } from "react-native";
import theme from "../services/theme";

const styles = StyleSheet.create({
  text: {
    color: theme.colors.textPrimary,
    fontSize: theme.fontSizes.body,
    fontFamily: theme.fonts.main,
    fontWeight: theme.fontWeights.normal,
  },

  colorPrimary: {
    color: theme.colors.textPrimary,
  },

  colorSecondary: {
    color: theme.colors.textSecondary,
  },

  bold: {
    fontWeight: theme.fontWeights.bold,
  },
  subHeading: {
    fontSize: theme.fontSizes.subHeading,
  },
});

function StyledText({
  children,
  color,
  fontWeight,
  fontSize,
  style,
  ...restOfPops
}) {
  const textStyles = [
    styles.text,
    color === "primary" && styles.colorPrimary,
    color === "secondary" && styles.colorSecondary,
    fontWeight === "bold" && styles.bold,
    fontSize === "subheading" && styles.subHeading,
    style,
  ];

  return (
    <Text style={textStyles} {...restOfPops}>
      {children}
    </Text>
  );
}

export default StyledText;
