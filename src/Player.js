import React, { useRef, useEffect } from "react";
import {
  View,
  SafeAreaView,
  Text,
  Image,
  FlatList,
  Dimensions,
  Animated,
} from "react-native";

import songs from "./data";
import Controller from "./Controller";

const { width } = Dimensions.get("window");

export default function Player() {
  const scrollX = useRef(0);
  const albumList = useRef(null);

  useEffect(() => {
    console.log(scrollX);
  }, [scrollX]);

  const renderItem = ({ item }) => {
    return (
      <View style={{ alignItems: "center", width: width }}>
        <Image source={item.image} style={{ width: 320, height: 320 }} />
        <Text style={{ fontSize: 28, textTransform: "capitalize" }}>
          {item.title}
        </Text>
      </View>
    );
  };
  const goNext = () => {
    albumList.current.scrollToOffset({
      offset: scrollX.current + width,
      animated: true,
    });
  };
  const goPrv = () => {
    albumList.current.scrollToOffset({
      offset: scrollX.current - width,
      animated: true,
    });
  };
  return (
    <SafeAreaView>
      <FlatList
        ref={albumList}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={60}
        data={songs}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        onScroll={(e) => (scrollX.current = e.nativeEvent.contentOffset.x)}
      />
      <Controller goNext={goNext} goPrv={goPrv} />
    </SafeAreaView>
  );
}
