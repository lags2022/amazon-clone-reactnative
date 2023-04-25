import { Text, FlatList, Button } from "react-native";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectItems } from "../redux/slice/basketSlice";
import { useDispatch } from "react-redux";
import { removeFromBasket } from "../redux/slice/basketSlice";
import RepositoryItem from "./RepositoryItem";
import auth from "@react-native-firebase/auth";

function Checkout() {
  const dispatch = useDispatch();
  const items = useSelector(selectItems);
  const [autenticated, setAutenticated] = useState(false);

  const createCheckoutSession = () => {
    console.log("comprastes");
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged((user) => {
      user ? setAutenticated(true) : setAutenticated(false);
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
      <Button
        disabled={!autenticated}
        onPress={createCheckoutSession}
        title={!autenticated ? "Sign in to Checkout" : "Proceed to Checkout"}
      />
    </>
  );
}

export default Checkout;
