import Main from "./src/components/Main";
import { NativeRouter } from "react-router-native";
import { StatusBar } from "expo-status-bar";
import store from "./src/redux/store";
import { Provider } from "react-redux";

export default function App() {
  return (
    <Provider store={store}>
      <StatusBar style="light" />
      <NativeRouter>
        <Main />
      </NativeRouter>
    </Provider>
  );
}
