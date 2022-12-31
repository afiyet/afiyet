import {
    StyleSheet,
    SafeAreaView,
    View,
    Text,
    TouchableOpacity,
    Image,
    Animated,
    SectionList
} from "react-native";

function RestaurantMenuItem({title}){

   // const {title} = props;

    return(
        <View >
          <Text >{title}</Text>
        </View>
    );
}

export default RestaurantMenuItem;