import React from "react";
import { Text, View, Image, ScrollView } from "react-native";
import moment from "moment";

function Order({ id, amount, amountShipping, items, timestamp, images }) {
  return (
    <View className="border shadow-xl bg-white rounded-2xl mx-2" style={{ padding: 10, borderWidth: 1, marginHorizontal: 5 }}>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <View>
          <Text className="text-black">
            Order Placed : {moment.unix(timestamp).format("DD MMMM YYYY")}
          </Text>
          <Text className="text-black" style={{ marginBottom: 5 }}>
            Total : ${amount} - Delivery : ${amountShipping}
          </Text>
        </View>
        <View
          style={{
            alignItems: "flex-end",
          }}
        >
          <Text className="text-black">Order # : {id.slice(0, 5)}...</Text>
          <Text className="text-black">{items.length} items</Text>
        </View>
      </View>

      <ScrollView horizontal={true}>
        <View style={{ flexDirection: "row" }}>
          {images.map((image, i) => (
            <Image
              key={i}
              style={{ width: 70, height: 70, marginHorizontal: 5 }}
              source={{ uri: image }}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

export default Order;
