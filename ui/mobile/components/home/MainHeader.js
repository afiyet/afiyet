import React from 'react'
import { Text, View, StyleSheet, Button, TouchableOpacity } from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import { Searchbar } from "react-native-paper";
import { useNavigation } from '@react-navigation/native';

export default function MainHeader() {
    const insets = useSafeAreaInsets();

    const [searchQuery, setSearchQuery] = React.useState('');

    const onChangeSearch = query => setSearchQuery(query);
    const navigation = useNavigation();

  return (
    <View style={[styles.container, {marginTop: insets.top}]}>
      <Text style={styles.title}>Tunali Hilmi Cad.</Text>
      <Searchbar
        placeholder="Search Restaurant and Food"
      
        onPressIn={() => {navigation.navigate("Search")}}
      />
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: "#DDE4EA",
      height: "20%",
      paddingBottom: 28
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 20
    },
  });