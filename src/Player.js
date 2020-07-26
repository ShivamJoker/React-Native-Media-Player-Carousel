import React, { useRef, useEffect, useState } from "react";
import {
  View,
  SafeAreaView,
  Text,
  Image,
  FlatList,
  Dimensions,
  Animated,
  StyleSheet,
} from "react-native";

import songs from "./data";
import Controller from "./Controller";

const { width, height } = Dimensions.get("window");

export default function Player() {
  const scrollX = useRef(new Animated.Value(0)).current;
  const scrollXcur = useRef(0);

  const albumList = useRef(null);
  const [songIndex, setSongIndex] = useState(0);

  const position = useRef(Animated.divide(scrollX, width)).current;
  const currentPosition = useRef(0);

  useEffect(() => {
    position.addListener(({ value }) => {
      console.log(value);
    });

    scrollX.addListener(({ value }) => {
      scrollXcur.current = value;
      const val = Math.round(value / width);


      //if previous index is not same then only update it
      if (val !== songIndex) {
        setSongIndex(val);
      }

    });

    return ()=>{
      scrollX.removeAllListeners()
    }
  }, []);

  const goNext = () => {
    console.log(scrollXcur);
    albumList.current.scrollToOffset({
      offset: scrollXcur.current + width,
      animated: true,
    });
    // stop index from exeeding max length
    if (songIndex === songs.length - 1) return;
    // setSongIndex((prv) => prv + 1);
  };

  const goPrv = () => {
    albumList.current.scrollToOffset({
      offset: scrollXcur.current - width,
      animated: true,
    });
    // stop songindex from going below 0
    if (songIndex === 0) return;
    // setSongIndex((prv) => prv - 1);
  };

  // we will fire this function when user stops swiping
  const onScrollEnd = ({ nativeEvent }) => {
    // console.log("Scroll ended with position", scrollXcur);
  };

  const renderItem = ({ index, item }) => {
    // console.log(Animated.multiply(Animated.add(position, -index), -100));
    return (
      <Animated.View
        style={{
          alignItems: "center",
          width: width,
          transform: [
            {
              translateX: Animated.multiply(
                Animated.add(position, -index),
                -100
              ),
            },
          ],
        }}
      >
        <Animated.Image
          source={item.image}
          style={{ width: 320, height: 320 }}
        />
      </Animated.View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <SafeAreaView style={{ height: 320 }}>
        <Animated.FlatList
          ref={albumList}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          scrollEventThrottle={16}
          data={songs}
          renderItem={renderItem}
          onScrollEndDrag={onScrollEnd}
          keyExtractor={(item) => item.id}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: true }
          )}
        />
      </SafeAreaView>
      <View>
        <Text style={styles.title}>{songs[songIndex].title}</Text>
        <Text style={styles.artist}>{songs[songIndex].artist}</Text>
      </View>

      <Controller goNext={goNext} goPrv={goPrv} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 28,
    textAlign: "center",
    textTransform: "capitalize",
  },
  artist: {
    fontSize: 18,
    textAlign: "center",
    textTransform: "capitalize",
  },
  container: {
    justifyContent: "space-between",
    alignItems: "center",
    height: height - 200,
    marginTop: 50,
    marginBottom: 50,
  },
});
