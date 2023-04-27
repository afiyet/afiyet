import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const CategoryListItem = ({name, isActive, selectCategory}) => {
  return (
    <View style={styles.container}>
      <Text
        style={
          isActive ? styles.activeCategoryText : styles.inActiveCategoryText
        }
        onPress={() => selectCategory(name)}>
        {name}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#D82227',
    paddingHorizontal: 15,
    height: 50,
    justifyContent: 'center',
  },
  activeCategoryText: {
    fontSize: 20,
    color: "#dde4ea",
    fontWeight: "bold"
  },
  inActiveCategoryText: {
    fontSize: 15,
    color: "#dde4ea",
  },
});

export default CategoryListItem;