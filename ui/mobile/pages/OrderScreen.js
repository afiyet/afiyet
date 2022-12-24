import { useEffect } from "react";
import { View, Text } from "react-native";
import { useNavigation } from '@react-navigation/native';

function OrderScreen(props) {
    const {
        setBottomNavLabel
    } = props;

    const navigation = useNavigation();

    useEffect(() => {
        setBottomNavLabel("Order");
    },[]);

    return(
        <View>
            <Text>DASHDJKASHDJK</Text>
        </View>
    );
}

export default OrderScreen;