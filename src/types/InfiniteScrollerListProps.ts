import type { FlatListProps, TextStyle, ViewStyle } from 'react-native';
import React from 'react';

type InfiniteScrollerListProps<T> = FlatListProps<T> & {
  /**
   * Indicates if the component is loading data.
   * Default: `false`
   */
  isLoading?: boolean;

  /**
   * The threshold (in pixels) from the bottom of the list to trigger `onFetchTrigger`.
   * Default: `100`
   */
  triggerThreshold?: number;

  /**
   * Function to be called when the user scrolls near the bottom of the list.
   * **Required**
   */
  onFetchTrigger: () => void;

  /**
   * Total number of items available in the data source.
   * Default: `0`
   */
  totalLength?: number;

  /**
   * Custom fallback text when no data is present.
   * Default: `"No data available."`
   */
  fallbackTextOnEmptyData?: string;

  /**
   * Custom loader component for loading state.
   * Default: `<ActivityIndicator size="large" />`
   */
  customLoader?: React.ReactNode;

  /**
   * Style for the container of fallback text when no data is present.
   * Default:
   * ```javascript
   * {
   *   flex: 1,
   *   justifyContent: "center",
   *   alignItems: "center",
   *   height: 200,
   * }
   * ```
   */
  fallbackTextContainerStyle?: ViewStyle;

  /**
   * Style for the fallback text when no data is present.
   * Default:
   * ```javascript
   * {
   *   textAlign: "center",
   *   color: "#888",
   * }
   * ```
   */
  fallbackTextStyle?: TextStyle;

  /**
   * Message to display when the user reaches the end of the list.
   * Default: `"Page End Reached"`
   */
  endOfListMessage?: string;

  /**
   * Style for the end-of-list message text.
   * Default:
   * ```javascript
   * {
   *   textAlign: "center",
   *   color: "#888",
   *   padding: 10,
   * }
   * ```
   */
  endOfListMessageStyle?: TextStyle;
};

export type { InfiniteScrollerListProps };
