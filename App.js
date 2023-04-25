import Main from "./src/components/Main";
import { NativeRouter } from "react-router-native";
import { StatusBar } from "expo-status-bar";
import store from "./src/redux/store";
import { Provider } from "react-redux";
import { StripeProvider } from "@stripe/stripe-react-native";

export default function App() {
  return (
    <StripeProvider publishableKey="pk_test_51My0xcEfYxNbjr9ynwLm1ZMXJa20yzHU9FTVr8SxVzEpHVEHdsvsq7HoAsaayV9EkkqYGZ68a18vnYuAuEiZlVva00dqsr0OA2">
      <Provider store={store}>
        <StatusBar style="light" />
        <NativeRouter>
          <Main />
        </NativeRouter>
      </Provider>
    </StripeProvider>
  );
}
