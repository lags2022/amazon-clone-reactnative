import React, { useEffect, useState } from "react";
import { Text, View, FlatList } from "react-native";
import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";
import moment from "moment";
import Order from "./Order";

function Orders() {
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);

  const getOrders = async () => {
    try {
      const ordersData = await firestore()
        .collection("users")
        .doc(user.email)
        .collection("orders")
        .orderBy("timestamp", "desc")
        .get();

      const orders = await Promise.all(
        ordersData.docs.map(async (order) => ({
          id: order.id,
          amount: order.data().amount,
          amountShipping: order.data().amount_shipping,
          images: order.data().images,
          timestamp: moment(order.data().timestamp.toDate()).unix(),
          items: order.data().images,
        }))
      );

      setOrders(orders);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    user && getOrders();
  }, [user]);

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(
      (user) => user && setUser(user)
    );
    return subscriber;
  }, []);

  return (
    <>
      <View>
        <Text>Your Orders</Text>

        {user ? (
          <Text>Orders {orders.length}</Text>
        ) : (
          <Text>Please sign in to see your orders</Text>
        )}
      </View>
      <FlatList
        data={orders}
        ItemSeparatorComponent={<Text> </Text>}
        renderItem={({ item: order }) => <Order {...order} />}
      />
    </>
  );
}

export default Orders;
