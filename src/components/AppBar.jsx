import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";
import StyledText from "./StyledText";
import theme from "../services/theme";
import Constants from "expo-constants";
import { Link, useLocation } from "react-router-native";

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.appBar.primary,
    paddingTop: Constants.statusBarHeight + 10,
    paddingLeft: 10,
    flexDirection: "row",
  },
  text: {
    color: theme.appBar.textSecondary,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  active: {
    color: theme.appBar.textPrimary,
  },
});

const AppBarTab = ({ children, to }) => {
  const { pathname } = useLocation();
  const active = pathname === to;

  const textStyles = [styles.text, active && styles.active];

  return (
    <Link to={to} component={TouchableWithoutFeedback}>
      <StyledText fontWeight="bold" style={textStyles}>
        {children}
      </StyledText>
    </Link>
  );
};

function AppBar() {
  return (
    <View style={styles.container}>
      <AppBarTab active to="/">
        Products
      </AppBarTab>
      <AppBarTab active to="/signin">
        Sign In
      </AppBarTab>
    </View>
  );
}

export default AppBar;
