import {
  ActivityIndicator,
  FlatList,
  type NativeScrollEvent,
  View,
  Text,
  StyleSheet,
} from 'react-native';
import type { InfiniteScrollerListProps } from '../types/InfiniteScrollerListProps';

const isCloseToBottom = (
  { layoutMeasurement, contentOffset, contentSize }: NativeScrollEvent,
  triggerThreshold: number = 0
) => {
  return (
    layoutMeasurement.height + contentOffset.y >=
    contentSize.height - triggerThreshold
  );
};

/**
 * @param data
 * @param isLoading
 * @param triggerThreshold
 * @param onFetchTrigger
 * @param totalLength
 * @param fallbackTextOnEmptyData
 * @param customLoader
 * @param fallbackTextContainerStyle
 * @param fallbackTextStyle
 * @param endOfListMessage
 * @param endOfListMessageStyle
 * @param restFlatListProps
 * @constructor
 */
const InfiniteScrollerList = <T,>({
  data,
  isLoading = false,
  triggerThreshold = 100,
  onFetchTrigger,
  totalLength = 0,
  fallbackTextOnEmptyData = 'No data available.',
  customLoader = <ActivityIndicator size="large" />,
  fallbackTextContainerStyle = {},
  fallbackTextStyle = {},
  endOfListMessage = 'Page End Reached',
  endOfListMessageStyle = {},
  ...restFlatListProps
}: InfiniteScrollerListProps<T>): JSX.Element => {
  return (
    <FlatList
      data={data}
      {...restFlatListProps}
      ListFooterComponent={() => {
        if (isLoading) {
          return customLoader;
        }
        if (totalLength === data?.length) {
          return (
            <Text style={[styles.endOfListText, endOfListMessageStyle]}>
              {endOfListMessage}
            </Text>
          );
        }
        if (!data || data.length === 0) {
          return (
            <View
              style={[styles.fallbackContainer, fallbackTextContainerStyle]}
            >
              <Text style={[styles.fallbackText, fallbackTextStyle]}>
                {fallbackTextOnEmptyData}
              </Text>
            </View>
          );
        }
        return null;
      }}
      onScroll={({ nativeEvent }) => {
        if (
          isCloseToBottom(nativeEvent, triggerThreshold) &&
          !isLoading &&
          totalLength !== data?.length
        ) {
          onFetchTrigger();
        }
      }}
    />
  );
};

const styles = StyleSheet.create({
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
  endOfListText: {
    textAlign: 'center',
    color: '#888',
    padding: 10,
  },
});

export default InfiniteScrollerList;
