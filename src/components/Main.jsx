import React from "react";
import { View, Text, Button } from "react-native";
import RepositoryList from "./RepositoryList";
import AppBar from "./AppBar";
import { Routes, Route, Navigate } from "react-router-native";
import Login from "./Login";
import Checkout from "./Checkout";
import Orders from "./Orders";
import { useState } from "react";
import FrontPage from "./FrontPage";

export default function Main() {
  const [show, setShow] = useState(true);

  return (
    <View style={{ flex: 1 }} className="bg-black">
      {!show ? (
        <>
          <AppBar />
          <Routes>
            <Route path="/" exact element={<RepositoryList />} />
            <Route path="/signin" exact element={<Login />} />
            <Route path="/orders" exact element={<Orders />} />
            <Route path="/checkout" exact element={<Checkout />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </>
      ) : (
        <FrontPage setShow={setShow} />
      )}
    </View>
  );
}
