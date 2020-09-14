import React from "react";
import Svg from "react-native-svg";
import { scaleLinear } from "d3-scale";
import { Candle as CandleModel } from "./Model";
import Candle from "./Candle";

interface ChartProps {
  candles: CandleModel[];
  size: number;
  caliber: number;
  domain: [number, number];
}

export default ({ candles, caliber, size, domain }: ChartProps) => {
  const scaleY = scaleLinear()
    .domain(domain)
    .range([size, 0]);
  const scaleX = scaleLinear()
    .domain([0, Math.max(...domain) - Math.min(...domain)])
    .range([0, size]);
  return (
    <Svg width={size} height={size}>
      {candles.map((candle, index) => (
        <Candle key={index} {...{ candle, caliber, scaleY, scaleX, index }} />
      ))}
    </Svg>
  );
};
