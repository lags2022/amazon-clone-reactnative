import React, { useState, useEffect } from "react";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { View, Text, Button } from "react-native";
import auth from "@react-native-firebase/auth";

GoogleSignin.configure({
  webClientId:
    "972184727106-mo09ref0lhnt25i0q87jtub1vc2qvqki.apps.googleusercontent.com",
});

async function onGoogleButtonPress() {
  // Check if your device supports Google Play
  await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
  // Get the users ID token
  const { idToken } = await GoogleSignin.signIn();

  // Create a Google credential with the token
  const googleCredential = auth.GoogleAuthProvider.credential(idToken);

  // Sign-in the user with the credential
  return auth().signInWithCredential(googleCredential);
}

function Login() {
  const [user, setUser] = useState();
  const [initializing, setInitialing] = useState(true);

  const handleUserStateChanged = (us) => {
    setUser(us);
    if (initializing) setInitialing(false);
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(handleUserStateChanged);
    return subscriber; //para cuando se desmonte , ya no se subscriba a la autenticacion
  }, []);

  if (initializing) return null;

  return (
    <>
      <Button
        title="Google Sign-In"
        onPress={() =>
          onGoogleButtonPress()
            .then(() => console.log("Signed in with Google!"))
            .catch((error) => console.log(error))
        }
      />
      <View>
        <Text>{user ? `Welcome ${user.email}` : "Login"}</Text>
      </View>
    </>
  );
}

export default Login;
