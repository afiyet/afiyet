import { View, Text, TextInput, StyleSheet, ScrollView } from 'react-native'
import React, { useState } from 'react'
import Searchbar from '../components/search/Searchbar';
import RecentlySearched from '../components/search/RecentlySearched';
import { useDispatch, useSelector } from 'react-redux';
import { SearchActions } from '../actions';
import { getSearchResults } from '../endpoints';
import SearchResults from '../components/search/SearchResults';



export default function SearchScreen() {
  const [search, setSearch] = useState('');
  const [waiting, setWaiting] = useState(false);
  const searchState = useSelector(state => state.searchState);
  const [isShowResults, setIsShowResults] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const dispatch = useDispatch();

  const onSearchSubmit = () => {
    dispatch(SearchActions.addToRecentlySearched(search));
    setWaiting(true);
    setSearchResults([]);
    //TODO check trim and length

    getSearchResults(search)
      .then((res) => {
        console.log(res);
        if (res.data !== null) {
          setSearchResults(res.data);
        }
        setIsShowResults(true);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setWaiting(false);
      })
    /* setIsShowResults(true);
    setWaiting(false); */
  };

  const clearSearch = () => {
    setSearch("");
    setIsShowResults(false);
  }

  console.log(searchState.recentlySearched)
  return (
    <View style={styles.container}>
      <Searchbar
        search={search}
        setSearch={setSearch}
        onSearchSubmit={onSearchSubmit}
        waiting={waiting}
        clearSearch={clearSearch}
      />
      <ScrollView>
        {
          (!isShowResults && searchState.recentlySearched.length > 0) ?
            <RecentlySearched
              recentlySearched={searchState.recentlySearched}
              setSearch={setSearch}
              onSearchSubmit={onSearchSubmit}
            />
            :
            (isShowResults) ?
              <SearchResults
                searchedKey={search}
                searchResults={searchResults}
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