
# `react-native-infinite-scroller`

The `react-native-infinite-scroller` component is a customizable React Native component for rendering data lists with lazy loading, infinite scrolling, and fallback options when no data is available. This component simplifies managing data fetching, loading states, and UI updates in list-based views.

## Features
- Supports lazy loading with customizable fetch triggers.
- Displays a fallback message when the data list is empty.
- Shows a customizable loader while fetching data.
- Handles end-of-list messages when all items are loaded.
- Fully customizable styles and messages for fallback and loading states.

## Installation

Install the necessary dependencies:

```bash
npm install react-native-infinite-scroller
```

## Usage

Here is a basic example of how to use the `InfiniteScrollList` component:

```tsx
import React, { useState } from 'react';
import { View, Text } from 'react-native';
import InfiniteScrollList from 'react-native-infinite-scroller';

const App = () => {
    const [data, setData] = useState<number[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const totalLength = 50;

    const fetchMoreData = () => {
        if (data.length >= totalLength) return;

        setIsLoading(true);
        setTimeout(() => {
            setData(prevData => [
                ...prevData,
                ...Array.from({ length: 10 }, (_, i) => prevData.length + i + 1),
            ]);
            setIsLoading(false);
        }, 1500);
    };

    return (
        <InfiniteScrollList
            data={data}
            keyExtractor={(item) => item.toString()}
            renderItem={({ item }) => (
                <View style={{ padding: 10 }}>
                    <Text>Item {item}</Text>
                </View>
            )}
            isLoading={isLoading}
            totalLength={totalLength}
            onFetchTrigger={fetchMoreData}
        />
    );
};

export default App;
```

## Props

Since InfiniteScrollerList internally uses `FlatList`, it automatically supports all `FlatList` props. Below are the specific props that can be passed to `InfiniteScrollerList`:

| Prop Name                    | Type                 | Default Value                                                              | Description                                                                        |
|------------------------------|----------------------|----------------------------------------------------------------------------|------------------------------------------------------------------------------------|
| `isLoading`                  | `boolean`            | `false`                                                                    | Indicates if the component is loading data.                                        |
| `triggerThreshold`           | `number`             | `100`                                                                      | The threshold (in pixels) from the bottom of the list to trigger `onFetchTrigger`. |
| `onFetchTrigger`             | `() => void`         | **Required**                                                               | Function to be called when the user scrolls near the bottom of the list.           |
| `totalLength`                | `number`             | `0`                                                                        | Total number of items available in the data source.                                |
| `fallbackTextOnEmptyData`    | `string`             | `"No data available."`                                                     | Custom fallback text when no data is present.                                      |
| `customLoader`               | `React.ReactNode`    | `<ActivityIndicator size="large" />`                                       | Custom loader component for loading state.                                         |
| `fallbackTextContainerStyle` | `ViewStyle`          | `{ flex: 1, justifyContent: "center", alignItems: "center", height: 200 }` | Style for the container of fallback text when no data is present.                  |
| `fallbackTextStyle`          | `TextStyle`          | `{ textAlign: "center", color: "#888" }`                                   | Style for the fallback text when no data is present.                               |
| `endOfListMessage`           | `string`             | `"Page End Reached"`                                                       | Message to display when the user reaches the end of the list.                      |
| `endOfListMessageStyle`      | `TextStyle`          | `{ textAlign: "center", color: "#888", padding: 10 }`                      | Style for the end-of-list message text.                                            |

## Customization

You can customize the fallback text, loader, and end-of-list message styles by passing the appropriate props:

```tsx
<InfiniteScrollList
    fallbackTextOnEmptyData="No items found. Please try again later."
    customLoader={<CustomLoaderComponent />}
    endOfListMessage="You've reached the end of the list."
    fallbackTextContainerStyle={{ backgroundColor: 'lightgray' }}
    fallbackTextStyle={{ fontSize: 16, color: 'red' }}
    endOfListMessageStyle={{ fontSize: 14, fontStyle: 'italic' }}
    // other props
/>
```

## Styling

The component provides default styles that can be overridden using the following props:
- `fallbackTextContainerStyle`
- `fallbackTextStyle`
- `endOfListMessageStyle`

## Improvements & Updates
- Added default values for all props in the documentation.
- Enhanced customization options for fallback text, loaders, and end-of-list messages.
- Improved the overall flexibility and usability of the component.

## License

This project is licensed under the MIT License.
