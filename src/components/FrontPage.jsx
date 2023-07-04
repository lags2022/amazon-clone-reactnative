import { TouchableOpacity, Text, View } from "react-native";
import Constants from "expo-constants";

const FrontPage = ({ setShow }) => {
  return (
    <View
      style={{
        backgroundColor: "#24292e",
        paddingTop: Constants.statusBarHeight + 10,
      }}
      className="relative w-full h-full"
    >
      <View className="absolute left-0 top-0 w-full h-full">
        <Text className="text-4xl text-white top-1/2 px-10 font-bold">
          Welcome Amazon Clone
        </Text>
        <TouchableOpacity
          className="bg-white px-4 py-2 top-3/4 mx-auto w-32 text-center rounded-xl"
          onPress={() => setShow(false)}
        >
          <Text className="text-black font-bold text-center text-lg">Go</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default FrontPage;
