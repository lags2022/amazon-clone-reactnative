import { View, Image, StyleSheet, Button } from "react-native";
import StyledText from "./StyledText";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons/faStar";
import { useDispatch } from "react-redux";
import { addToBasket } from "../redux/slice/basketSlice";

function RepositoryItem({
  id,
  title,
  category,
  image,
  description,
  price,
  rating,
  hasprime,
}) {
  const dispatch = useDispatch();

  const product = {
    id,
    title,
    category,
    image,
    description,
    price,
    rating,
    hasprime,
  };
  return (
    <View
      className="flex flex-col items-center gap-2 justify-center bg-white shadow-2xl mx-4 my-2 px-3 rounded-2xl"
      key={id}
    >
      <StyledText
        fontSize="subheading"
        fontWeight="bold"
        className="text-center m-0 p-0"
      >
        {title}
      </StyledText>
      <View className="flex flex-row gap-4 m-0 p-0">
        <View className="flex justify-start items-center gap-1">
          <StyledText className="p-0 m-0">{category}</StyledText>
          <Image source={{ uri: image }} className="w-32 h-32 object-contain" />
          <View className="mb-2" style={{ flexDirection: "row" }}>
            {Array(rating)
              .fill()
              .map((_, i) => (
                <FontAwesomeIcon color={"#FACC15"} key={i} icon={faStar} />
              ))
              .concat(
                Array(5 - rating)
                  .fill()
                  .map((_, i) => {
                    i += 100;
                    return (
                      <FontAwesomeIcon
                        color={"#D1D5DB"}
                        key={i}
                        icon={faStar}
                      />
                    );
                  })
              )}
          </View>
          {hasprime && (
            <Image
              style={{ width: 50, height: 50 }}
              source={{ uri: "https://links.papareact.com/fdw" }}
            />
          )}
        </View>
        <View className="flex-1 flex flex-col justify-start items-start mb-4">
          <StyledText className="my-1">
            {description.substring(0, 180)}
          </StyledText>
          <StyledText className="my-1 font-bold">{`\$${price}`}</StyledText>
          <Button
            title="Add to Basket"
            className="bg-black my-1"
            onPress={() => dispatch(addToBasket(product))}
          />
        </View>
      </View>
    </View>
  );
}

export default RepositoryItem;
