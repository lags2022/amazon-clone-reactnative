import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import db from "../../firebase_db";
import { collection, query, orderBy, getDocs } from "firebase/firestore";
import auth from "@react-native-firebase/auth";
import moment from "moment";
import Order from "./Order";

function Orders() {
  const [orders, setOrders] = useState(null);
  const [user, setUser] = useState(null);

  const getOrders = async () => {
    const ordersCollection = collection(db, "users", user.email, "orders");
    const orderQuery = query(ordersCollection, orderBy("timestamp", "desc"));
    const stripeOrders = await getDocs(orderQuery);

    console.log(stripeOrders);

    const ordersData = await Promise.all(
      stripeOrders.docs.map(async (order) => ({
        id: order.id,
        amount: order.data().amount,
        amountShipping: order.data().amount_shipping,
        images: order.data().images,
        timestamp: moment(order.data().timestamp.toDate()).unix(),
        items: order.data().images,
      }))
    );
  };

  getOrders();

  useEffect(() => {
    const getOrders = async () => {
      const ordersCollection = collection(db, "users", user.email, "orders");
      const orderQuery = query(ordersCollection, orderBy("timestamp", "desc"));
      const stripeOrders = await getDocs(orderQuery);

      const ordersData = await Promise.all(
        stripeOrders.docs.map(async (order) => ({
          id: order.id,
          amount: order.data().amount,
          amountShipping: order.data().amount_shipping,
          images: order.data().images,
          timestamp: moment(order.data().timestamp.toDate()).unix(),
          items: order.data().images,
        }))
      );
      setOrders(ordersData);
    };

    user && getOrders();
  }, [user]);

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(
      (user) => user && setUser(user)
    );
    return subscriber;
  }, []);

  return (
    <View>
      <Text>Your Orders</Text>
      {!user ? (
        <Text>Please sign in to see your orders</Text>
      ) : (
        <Text> Orders</Text>
      )}
      {/* {orders.length} */}
      {orders?.map((order) => {
        <Order {...order} />;
      })}
    </View>
  );
}

export default Orders;
