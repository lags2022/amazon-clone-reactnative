import { Text, FlatList, Button, Alert, View } from "react-native";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectItems, selectTotal } from "../redux/slice/basketSlice";
import { useDispatch } from "react-redux";
import { removeFromBasket } from "../redux/slice/basketSlice";
import RepositoryItem from "./RepositoryItem";
import auth from "@react-native-firebase/auth";
import { useStripe } from "@stripe/stripe-react-native";

function Checkout() {
  const dispatch = useDispatch();
  const items = useSelector(selectItems);
  const total = useSelector(selectTotal);
  const [autenticated, setAutenticated] = useState(false);
  const [user, setUser] = useState(null);

  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const [loading, setLoading] = useState(false);

  const fetchPaymentSheetParams = async () => {
    try {
      const response = await fetch(
        "https://amazon-clone-lags2022.vercel.app/api/rncreate-checkout-session",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            total,
            items,
            email: user.email,
          }),
        }
      );
      const { paymentIntent, ephemeralKey, customer } = await response.json();

      return {
        paymentIntent,
        ephemeralKey,
        customer,
      };
    } catch (error) {
      console.log(error);
    }
  };

  const initializePaymentSheet = async () => {
    const { paymentIntent, ephemeralKey, customer } =
      await fetchPaymentSheetParams();

    const { error } = await initPaymentSheet({
      merchantDisplayName: "Amazon Clone Inc",
      customerId: customer,
      customerEphemeralKeySecret: ephemeralKey,
      paymentIntentClientSecret: paymentIntent,
      // Set `allowsDelayedPaymentMethods` to true if your business can handle payment
      //methods that complete payment after a delay, like SEPA Debit and Sofort.
      allowsDelayedPaymentMethods: false,
      defaultBillingDetails: {
        name: user.displayName,
      },
    });
    if (!error) {
      setLoading(true);
    }
  };

  const openPaymentSheet = async () => {
    const { error } = await presentPaymentSheet();

    if (error) {
      Alert.alert(`Error code: ${error.code}`, error.message);
    } else {
      Alert.alert("Success", "Your order is confirmed!");
    }
  };

  useEffect(() => {
    user && initializePaymentSheet();
  }, [user]);

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        setAutenticated(true);
      } else setAutenticated(false);
    });
    return subscriber;
  }, []);

  if (!items.length) return <Text>Basket is empty</Text>;

  return (
    <>
      <FlatList
        data={items}
        ItemSeparatorComponent={<Text> </Text>}
        renderItem={({ item }) => (
          <RepositoryItem {...item}>
            <Button
              title="Remove from to Basket"
              onPress={() => dispatch(removeFromBasket(item.id))}
            />
          </RepositoryItem>
        )}
      />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          padding: 10,
          backgroundColor: "#9CA3AF",
        }}
      >
        <Text>Next Day Delivery $5.55</Text>
        <Text>Total ${total}</Text>
      </View>
      <Button
        disabled={!autenticated || !loading}
        title={!autenticated ? "Sign in to Checkout" : "Proceed to Checkout"}
        onPress={openPaymentSheet}
      />
    </>
  );
}

export default Checkout;
