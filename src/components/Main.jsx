import React from "react";
import { View } from "react-native";
import RepositoryList from "./RepositoryList";
import AppBar from "./AppBar";
import { Routes, Route, Navigate } from "react-router-native";
import Login from "./Login";
import Checkout from "./Checkout";

export default function Main() {
  return (
    <View style={{ flex: 1 }}>
      <AppBar />
      <Routes>
        <Route path="/" exact element={<RepositoryList />} />
        <Route path="/signin" exact element={<Login />} />
        <Route path="/checkout" exact element={<Checkout />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </View>
  );
}
