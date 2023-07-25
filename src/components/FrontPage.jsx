import { TouchableOpacity, Text, View, Image } from "react-native";
// import Constants from "expo-constants";
import { StatusBar } from "expo-status-bar";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import auth from "@react-native-firebase/auth";
import { useState, useEffect } from "react";

GoogleSignin.configure({
  webClientId:
    "972184727106-mo09ref0lhnt25i0q87jtub1vc2qvqki.apps.googleusercontent.com",
});

const FrontPage = ({ setShow }) => {
  const [loading, setLoading] = useState(false);
  const [initializing, setInitialing] = useState(true);

  const handleUserLogin = async () => {
    setLoading(true);
    await GoogleSignin.hasPlayServices({
      showPlayServicesUpdateDialog: true,
    });

    const { idToken } = await GoogleSignin.signIn();

    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    return auth()
      .signInWithCredential(googleCredential)
      .then(() => setShow(false))
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  };

  const handleUserStateChanged = (us) => {
    if (us) setShow(false);
    if (initializing) setInitialing(false);
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(handleUserStateChanged);
    return subscriber;
  }, []);

  if (initializing) return null; //esto me parece que es como un loading

  return (
    <>
      <StatusBar style="dark" />
      <View
        style={{
          backgroundColor: "white",
          // paddingTop: Constants.statusBarHeight + 10,
        }}
        className="relative w-full h-full"
      >
        <View className="h-4/6">
          <Image
            source={require("../../assets/firstpage.gif")}
            className="h-full"
          />
        </View>
        <View className="flex justify-center items-center space-y-6">
          <Text className="text-4xl text-blue-600 font-bold">
            Welcome to IShop
          </Text>
          <View className="space-y-4">
            <TouchableOpacity
              className="bg-blue-600 px-4 py-2 m-auto w-32 text-center rounded-xl"
              disabled={loading}
              onPress={() => setShow(false)}
            >
              <Text className="text-white font-bold text-center text-lg">
                Get Started
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="bg-blue-600 px-4 py-2 m-auto w-32 text-center rounded-xl"
              disabled={loading}
              onPress={handleUserLogin}
            >
              <Text className="text-white font-bold text-center text-lg">
                Sign In
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </>
  );
};

export default FrontPage;
