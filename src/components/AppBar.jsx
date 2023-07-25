import { View, Text, StyleSheet, TouchableWithoutFeedback } from "react-native";
import StyledText from "./StyledText";
import theme from "../services/theme";
import Constants from "expo-constants";
import { Link, useLocation } from "react-router-native";
import { selectItems } from "../redux/slice/basketSlice";
import { useSelector } from "react-redux";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons/faCartShopping";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.appBar.primary,
    paddingTop: Constants.statusBarHeight + 10,
    paddingLeft: 10,
    flexDirection: "row",
    justifyContent: "space-between",
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
      <StyledText className="text-lg" fontWeight="bold" style={textStyles}>
        {children}
      </StyledText>
    </Link>
  );
};

function AppBar() {
  const items = useSelector(selectItems);

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row" }}>
        <AppBarTab active to="/">
          Products
        </AppBarTab>
        <AppBarTab active to="/signin">
          Profile
        </AppBarTab>
        <AppBarTab active to="/orders">
          Orders
        </AppBarTab>
      </View>
      <AppBarTab active to="/checkout">
        <Text>{items.length}</Text>
        <FontAwesomeIcon color="white" size={20} icon={faCartShopping} />
      </AppBarTab>
    </View>
  );
}

export default AppBar;
