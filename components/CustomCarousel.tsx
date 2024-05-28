import React, { useRef, useState, forwardRef, useImperativeHandle } from 'react';
import {
  View,
  FlatList,
  useWindowDimensions,
  Animated,
  ViewabilityConfig,
  ViewToken,
  TouchableOpacity,
} from 'react-native';

export interface CustomCarouselProps {
  slider: React.ReactNode[];
}

export interface CustomCarouselRef {
  scrollToIndex: (index: number) => void;
}

const CustomCarousel = forwardRef<CustomCarouselRef, CustomCarouselProps>(({ slider }, ref) => {
  const { width } = useWindowDimensions();
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollx = useRef(new Animated.Value(0)).current;
  const sliderRef = useRef<FlatList>(null);

  const viewConfig: ViewabilityConfig = { viewAreaCoveragePercentThreshold: 50 };
  const viewableItemChanged = useRef(({ viewableItems }: { viewableItems: ViewToken[] }) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index ?? 0);
    }
  }).current;

  useImperativeHandle(ref, () => ({
    scrollToIndex: (index: number) => {
      if (sliderRef.current) {
        sliderRef.current.scrollToIndex({ animated: true, index });
      }
    },
  }));

  return (
    <View>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        bounces={false}
        data={slider}
        renderItem={({ item, index }) => (
          <View key={index} style={{ width }}>
            {item}
          </View>
        )}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollx } } }], {
          useNativeDriver: false,
        })}
        scrollEventThrottle={32}
        viewabilityConfig={viewConfig}
        onViewableItemsChanged={viewableItemChanged}
        ref={sliderRef}
        keyExtractor={(_, index) => index.toString()}
      />
      <View className=" flex-row justify-center gap-8">
        {slider.map((_, index) => (
          <View
            key={index}
            className={`h-6 w-6 rounded-full ${currentIndex === index ? 'bg-primary' : 'bg-[#C7D6FB]'}`}
          />
        ))}
      </View>
    </View>
  );
});

export default CustomCarousel;
