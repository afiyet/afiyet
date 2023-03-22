import { View, Text, TextInput, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import Searchbar from '../components/search/Searchbar';


export default function SearchScreen() {
  const [search, setSearch] = useState('');
  return (
    <View style={styles.container}>
      <Searchbar 
        search={search}
        setSearch={setSearch}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});