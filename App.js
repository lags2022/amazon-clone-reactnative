import Main from "./src/components/Main";
import { NativeRouter } from "react-router-native";
import { StatusBar } from "expo-status-bar";
import store from "./src/redux/store";
import { Provider } from "react-redux";
import { StripeProvider } from "@stripe/stripe-react-native";

const PUBLIC_KEY_STRIPE = process.env.EXPO_PUBLIC_KEY_STRIPE;

export default function App() {
  return (
    <StripeProvider publishableKey={PUBLIC_KEY_STRIPE}>
      <Provider store={store}>
        <StatusBar style="light" />
        <NativeRouter>
          <Main />
        </NativeRouter>
      </Provider>
    </StripeProvider>
  );
}
