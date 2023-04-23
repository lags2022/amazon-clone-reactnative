import React from "react";
import { Text, View } from "react-native";
import RepositoryList from "./RepositoryList";
import AppBar from "./AppBar";
import { Routes, Route, Navigate } from "react-router-native";

export default function Main() {
  return (
    <View style={{ flex: 1 }}>
      <AppBar />
      <Routes>
        <Route path="/" exact element={<RepositoryList />} />
        <Route path="/signin" exact element={<Text>Working on it</Text>} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </View>
  );
}
