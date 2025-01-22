import { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { InfiniteScrollerList } from 'react-native-infinite-scroller';

const App = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const totalLength = 50;

  const fetchMoreData = () => {
    if (data.length >= totalLength) return;

    setIsLoading(true);
    setTimeout(() => {
      setData((prevData) => [
        ...prevData,
        ...Array.from({ length: 10 }, (_, i) => prevData.length + i + 1),
      ]);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <View style={styles.container}>
      <InfiniteScrollerList
        data={data}
        keyExtractor={(item) => item.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>Item {item}</Text>
          </View>
        )}
        isLoading={isLoading}
        totalLength={totalLength}
        onFetchTrigger={fetchMoreData}
        fallbackTextOnEmptyData="No items found."
        customLoader={<Text>Loading...</Text>}
        endOfListMessage="You've reached the end."
        endOfListMessageStyle={styles.endOfListMessage}
        fallbackTextContainerStyle={styles.fallbackContainer}
        fallbackTextStyle={styles.fallbackText}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 10,
  },
  item: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  endOfListMessage: {
    fontSize: 14,
    color: '#888',
    textAlign: 'center',
    padding: 10,
  },
  fallbackContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 200,
  },
  fallbackText: {
    textAlign: 'center',
    color: '#888',
  },
});

export default App;
