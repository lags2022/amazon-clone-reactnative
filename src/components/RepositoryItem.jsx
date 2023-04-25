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
  children,
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
    <View key={id} style={styles.container}>
      <StyledText>{category}</StyledText>
      <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
      <StyledText fontSize="subheading" fontWeight="bold">
        {title}
      </StyledText>
      <StyledText>{description}</StyledText>
      <StyledText>{`\$${price}`}</StyledText>
      <View style={{ flexDirection: "row" }}>
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
                  <FontAwesomeIcon color={"#D1D5DB"} key={i} icon={faStar} />
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
      <Button
        title="Add to Basket"
        onPress={() => dispatch(addToBasket(product))}
      />
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 5,
    paddingTop: 5,
  },
});

export default RepositoryItem;
