import { View, Text, TextInput, StyleSheet, ScrollView } from 'react-native'
import React, { useState } from 'react'
import Searchbar from '../components/search/Searchbar';
import RecentlySearched from '../components/search/RecentlySearched';
import { useDispatch, useSelector } from 'react-redux';
import { SearchActions } from '../actions';



export default function SearchScreen() {
  const [search, setSearch] = useState('');
  const searchState = useSelector(state => state.searchState);
  const dispatch = useDispatch();
  
  const onSearchSubmit = () => {
    dispatch(SearchActions.addToRecentlySearched(search));
  };
  
  console.log(searchState.recentlySearched)
  return (
    <View style={styles.container}>
      <Searchbar
        search={search}
        setSearch={setSearch}
        onSearchSubmit={onSearchSubmit}
      />
      <ScrollView>
        {
          (searchState.recentlySearched.length > 0) ?
            <RecentlySearched
              recentlySearched={searchState.recentlySearched}
              setSearch={setSearch}
              onSearchSubmit={onSearchSubmit}
            />
            :
            null
        }
      </ScrollView>


    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});