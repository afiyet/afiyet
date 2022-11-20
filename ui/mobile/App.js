import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

export default function App() {

  const [text, setText] = useState("");

  const change = () => {
    setText("değişti");
  }

  return (
    <View style={styles.container}>
      <Text>{text}</Text>
      <Button 
        title='eqweqw'
        onPress={change}
      >

      </Button>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
