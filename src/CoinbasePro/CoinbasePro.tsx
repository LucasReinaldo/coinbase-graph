import React from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import { LongPressGestureHandler, State } from "react-native-gesture-handler";
import Animated, {
  add,
  diffClamp,
  eq,
  modulo,
  sub
} from "react-native-reanimated";
import { onGestureEvent, useValues } from "react-native-redash";
import data from "./data.json";
import Values from "./Values";
import Line from "./Line";
import Content from "./Content";
import Header from "./Header";
import { Candle } from "./Model";
import Chart from "./Chart";
import Label from "./Label";

const { width: size } = Dimensions.get("window");
const candles = data.slice(0, 20);
const values = candles.map(candle => [candle.low, candle.high]).flat();
const domain: [number, number] = [Math.min(...values), Math.max(...values)];
const caliber = size / candles.length;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black"
  }
});

export default () => {
  const [x, y, state] = useValues([0, 0, State.UNDETERMINED], []);
  const gestureHandler = onGestureEvent({ x, y, state });
  const opacity = eq(state, State.ACTIVE);
  const translateY = diffClamp(y, 0, size);
  const translateX = add(sub(x, modulo(x, caliber)), caliber / 2);

  return (
    <View style={styles.container}>
      <View>
        <Header />
        <Animated.View style={{ opacity }}>
          <Values x={translateX} {...{ caliber, candles }} />
        </Animated.View>
      </View>
      <View>
        <Chart {...{ candles, size, caliber, domain }} />
        <LongPressGestureHandler minDurationMs={0.4} {...gestureHandler}>
          <Animated.View style={StyleSheet.absoluteFill}>
            <Animated.View
              style={{
                transform: [{ translateY }],
                opacity,
                ...StyleSheet.absoluteFillObject
              }}
            >
              <Line x={size} y={0} />
            </Animated.View>
            <Animated.View
              style={{
                transform: [{ translateX }],
                opacity,
                ...StyleSheet.absoluteFillObject
              }}
            >
              <Line x={0} y={size} />
            </Animated.View>
            <Label {...{ translateY, domain, size, opacity }} />
          </Animated.View>
        </LongPressGestureHandler>
      </View>
      <Content />
    </View>
  );
};
