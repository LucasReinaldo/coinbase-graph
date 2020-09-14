import { ScaleLinear } from "d3-scale";
import React from "react";
import { Line, Rect } from "react-native-svg";
import { Candle } from "./Model";

interface CandleProps {
  index: number;
  candle: Candle;
  caliber: number;
  scaleY: ScaleLinear<number, number>;
  scaleX: ScaleLinear<number, number>;
}

const MARGIN = 4;

export default ({
  candle: { low, high, open, close },
  index,
  caliber,
  scaleY,
  scaleX
}: CandleProps) => {
  const x = caliber * index + 0.5 * caliber;
  const color = open > close ? "#4AFA9A" : "#E33F64";

  return (
    <>
      <Line
        x1={x}
        x2={x}
        y1={scaleY(high)}
        y2={scaleY(low)}
        stroke={color}
        strokeWidth={1}
      />
      <Rect
        x={caliber * index + MARGIN / 2}
        y={scaleY(Math.max(open, close))}
        width={caliber - MARGIN}
        height={scaleX(Math.max(open, close) - Math.min(open, close))}
        fill={color}
      />
    </>
  );
};
