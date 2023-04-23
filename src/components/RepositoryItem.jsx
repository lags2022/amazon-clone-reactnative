import { View, Image, StyleSheet } from "react-native";
import StyledText from "./StyledText";

function RepositoryItem(props) {
  return (
    <View key={props.id} style={styles.container}>
      <StyledText>{props.category}</StyledText>
      <Image
        source={{ uri: props.image }}
        style={{ width: 200, height: 200 }}
      />
      <StyledText fontSize="subheading" fontWeight="bold">
        {props.title}
      </StyledText>
      <StyledText>{props.description}</StyledText>
      <StyledText>{props.price}</StyledText>
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
