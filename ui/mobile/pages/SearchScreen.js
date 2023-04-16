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

  const onSearchSubmit = (searchKey) => {
    setIsShowResults(true);
    setSearch(searchKey);
    setSearchResults([]);
    if(searchKey.trim().length > 0) {
      setWaiting(true);
      getSearchResults(searchKey)
      .then((res) => {
        if (res.data !== null) {
          setSearchResults(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setWaiting(false);
      })
    }
    dispatch(SearchActions.addToRecentlySearched(searchKey));
  };

  const clearSearch = () => {
    setSearch("");
    setIsShowResults(false);
  }

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
              search={search}
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