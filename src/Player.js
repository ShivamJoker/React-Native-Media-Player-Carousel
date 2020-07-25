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
  const scrollX = useRef(0);
  const prvScrollX = useRef(0);

  const albumList = useRef(null);
  const [songIndex, setSongIndex] = useState(0);

  useEffect(() => {
    console.log(songIndex);
  }, [songIndex]);

  const renderItem = ({ item }) => {
    return (
      <View style={{ alignItems: "center", width: width }}>
        <Image source={item.image} style={{ width: 320, height: 320 }} />
      </View>
    );
  };
  const goNext = () => {
    albumList.current.scrollToOffset({
      offset: scrollX.current + width,
      animated: true,
    });
    // stop index from exeeding max length
    if (songIndex === songs.length - 1) return;
    setSongIndex((prv) => prv + 1);
  };
  const goPrv = () => {
    albumList.current.scrollToOffset({
      offset: scrollX.current - width,
      animated: true,
    });
    // stop songindex from going below 0
    if (songIndex === 0) return;
    setSongIndex((prv) => prv - 1);
  };

  // we will fire this function when user stops swiping
  const onScrollEnd = () => {
    // round scrollX to make sure everything matches
    const scrX = Math.round(scrollX.current);

    console.log(prvScrollX.current, scrX);

    // // stop app from crashing
    // if (songIndex === songs.length - 1 || songIndex === -1) return;

    // we will only change index if user has changed the card
    // storing prv scroll data to keep track of it
    if (scrX !== prvScrollX.current) {
      console.log("user changed music");
      if (scrX < prvScrollX.current) {
        //right swipe
        // if prvScroll is > currentscroll then its left swipe else its right
        setSongIndex((prv) => prv - 1); // dec index on left swipe
      } else {
        // left swipe
        setSongIndex((prv) => prv + 1); // inc index on right swipe
      }
      // update the new data in prv scroll
      prvScrollX.current = scrX;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <SafeAreaView style={{height: 320}}>
        <FlatList
          ref={albumList}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          scrollEventThrottle={60}
          data={songs}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          onMomentumScrollEnd={() => onScrollEnd()}
          onScroll={(e) => {
            scrollX.current = e.nativeEvent.contentOffset.x;
          }}
        />
      </SafeAreaView>
      <Text style={styles.title}>{songs[songIndex].title}</Text>
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
  container: {
    justifyContent: "space-between",
    alignItems: "center",
    height: height - 200,
    marginTop: 50,
    marginBottom: 50,
  },
});
