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
  triggerThreshold: number
) => {
  return (
    layoutMeasurement.height + contentOffset.y >=
    contentSize.height - triggerThreshold
  );
};

/**
 * A component to display a list with Lazy Loading / Infinite Scrolling functionality.
 *
 * @template T - Type of the items in the data array.
 * @param {T[]} data - The data to be displayed in the list.
 * @param {boolean} [isLoading=false] - Indicates if data is being loaded.
 * @param {number} [triggerThreshold=100] - Threshold to trigger fetching more data.
 * @param {Function} onFetchTrigger - Function to call when the threshold is reached.
 * @param {number} totalLength - The total length of data available.
 * @param {string} [fallbackTextOnEmptyData='No data available.'] - Text to display when no data is available.
 * @param {React.ReactNode} [customLoader=<ActivityIndicator size="large" />] - Custom loader to show while loading.
 * @param {object} [fallbackTextContainerStyle={}] - Custom styles for the fallback container.
 * @param {object} [fallbackTextStyle={}] - Custom styles for the fallback text.
 * @param {string} [endOfListMessage='Page End Reached'] - Message to show at the end of the list.
 * @param {object} [endOfListMessageStyle={}] - Custom styles for the end of list message.
 * @param {FlatListProps<T>} [restFlatListProps] - Any other props for FlatList.
 * @returns {JSX.Element} - The rendered component.
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
