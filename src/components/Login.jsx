import React, { useState, useEffect } from "react";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { View, Text, Button, Image } from "react-native";
import auth from "@react-native-firebase/auth";

GoogleSignin.configure({
  webClientId:
    "972184727106-mo09ref0lhnt25i0q87jtub1vc2qvqki.apps.googleusercontent.com",
});

function Login() {
  const [user, setUser] = useState(null);
  const [initializing, setInitialing] = useState(true);

  const handleUserLogin = async () => {
    // Check if your device supports Google Play
    await GoogleSignin.hasPlayServices({
      showPlayServicesUpdateDialog: true,
    });
    // Get the users ID token
    const { idToken } = await GoogleSignin.signIn();

    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    // Sign-in the user with the credential
    return auth()
      .signInWithCredential(googleCredential)
      .then(() => console.log("Login in Google"))
      .catch((error) => console.log(error));
  };

  const handleUserStateChanged = (us) => {
    setUser(us);
    if (initializing) setInitialing(false);
  };
  console.log(user);

  const handleUserLogout = async () => {
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      await auth().signOut();
      setUser(null);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(handleUserStateChanged);
    return subscriber; //para cuando se desmonte , ya no se subscriba a la autenticacion
  }, []);

  if (initializing) return null;//esto me parece que es como un loading

  return (
    <View className="flex-1 m-3">
      {user ? (
        <>
          <View className="w-1/2 mx-auto">
            <Button title="Logout" onPress={handleUserLogout} />
          </View>
          <View style={{ alignItems: "center" }}>
            <Text className="text-white font-bold my-3 text-base">{`Welcome ${user.displayName}`}</Text>
            <Image
              style={{ width: 50, height: 50 }}
              source={{ uri: user.photoURL }}
            />
          </View>
        </>
      ) : (
        <View className="w-1/2 mx-auto">
          <Button title="Google Sign-In" onPress={handleUserLogin} />
        </View>
      )}
    </View>
  );
}

export default Login;
