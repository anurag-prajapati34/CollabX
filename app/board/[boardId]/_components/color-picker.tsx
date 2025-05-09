"use client";

import { colorToCss } from "@/lib/utils";
import { Color } from "@/types/canvas";

interface ColorPickerPorps {
  onChange: (color: Color) => void;
}

export const ColorPicker = ({ onChange }: ColorPickerPorps) => {
  return (
    <div className="flex flex-wrap max-w-[164px] pr-2 mr-2 border-r border-neutral-200 gap-1">
      <ColorButton
        color={{
          r: 243,
          g: 82,
          b: 35,
        }}
        onClick={onChange}
      />
      <ColorButton
        color={{
          r: 82,
          g: 243,
          b: 35,
        }}
        onClick={onChange}
      />
      <ColorButton
        color={{
          r: 35,
          g: 82,
          b: 243,
        }}
        onClick={onChange}
      />
      <ColorButton
        color={{
          r: 255,
          g: 249,
          b: 177,
        }}
        onClick={onChange}
      />
      <ColorButton
        color={{
          r: 68,
          g: 202,
          b: 99,
        }}
        onClick={onChange}
      />
      <ColorButton
        color={{
          r: 39,
          g: 142,
          b: 237,
        }}
        onClick={onChange}
      />
      <ColorButton
        color={{
          r: 0,
          g: 0,
          b: 0,
        }}
        onClick={onChange}
      />
      <ColorButton
        color={{
          r: 255,
          g: 255,
          b: 255,
        }}
        onClick={onChange}
      />
    </div>
  );
};

interface ColorButtonProps {
  onClick: (color: Color) => void;
  color: Color;
}
const ColorButton = ({ onClick, color }: ColorButtonProps) => {
  return (
    <button
      className="w-8 h-8 items-center flex justify-center hover:opacity-75 transition"
      onClick={() => onClick(color)}
    >
      <div
        className="h-8 w-8 rounded-md border border-neutral-300 "
        style={{
          backgroundColor: colorToCss(color),
        }}
      />
    </button>
  );
};
