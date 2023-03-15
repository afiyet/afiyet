import {
    StyleSheet,
    SafeAreaView,
    View,
    Text,
    TouchableOpacity,
    Image,
    Animated,
    SectionList,
    ScrollView,
    Pressable
} from "react-native";

function FoodDetails() {
    return (
        <ScrollView>
            <View
                style={{
                    height: 190,
                    borderRadius: 15,
                    backgroundColor: "grey"
                }}>
                <Image
                    source={{ uri: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80" }}
                    resizeMode="contain"
                    style={{ width: "100%", height: 170 }}
                />
            </View>
            <View
                style={{ marginTop: 20 }}
            >
                <Text>FOOD NAME</Text>
                <Text>FOOD DESCRITION</Text>
            </View>
        </ScrollView>
    );
}

export default FoodDetails;