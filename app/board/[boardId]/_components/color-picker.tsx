"use client";

import { colorToCss, hexToRgb } from "@/lib/utils";
import { Color } from "@/types/canvas";
import { useState } from "react";
interface ColorPickerPorps {
  onChange: (color: Color) => void;
}

export const ColorPicker = ({ onChange }: ColorPickerPorps) => {
  return (
    <div className="flex flex-wrap max-w-[164px] pr-2 mr-2 border-r border-neutral-200 gap-1">
      <ColorButton
        color={{
          r: 30,
          g: 245,
          b: 82,
        }}
        onClick={onChange}
      />
      <ColorButton
        color={{
          r: 245,
          g: 30,
          b: 82,
        }}
        onClick={onChange}
      />
      <ColorButton
        color={{
          r: 30,
          g: 82,
          b: 245,
        }}
        onClick={onChange}
      />
      <ColorButton
        color={{
          r: 143,
          g: 130,
          b: 177,
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
      <ColorButton
        color={{
          r: 128,
          g: 0,
          b: 128,
        }}
        onClick={onChange}
      />
      <ColorButton
        color={{
          r: 0,
          g: 255,
          b: 255,
        }}
        onClick={onChange}
      />
      
      
      <CustomColorButton onChange={onChange}/>
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

interface CustomColorButtonProps {
  onChange: (color: Color) => void;
}
const CustomColorButton=({onChange}:CustomColorButtonProps)=>{

  const handleColorChange=(e:React.ChangeEvent<HTMLInputElement>)=>{

    const rgbColor=hexToRgb(e.target.value);
    onChange(rgbColor);
    setColor(e.target.value);

  }
  
  const [color,setColor]=useState("purple");

  return <div className=" relative w-8 h-8 items-center flex justify-center hover:opacity-75 transition overflow-hidden cursor-pointer">
      <input type="color" className=" absolute h-fit w-full  rounded-md border border-neutral-300 opacity-0 cursor-pointer" 
       onChange={(e)=>handleColorChange(e)}
       
       alt="select color"/>

       <div
        className="h-8 w-8  border border-black rounded-full cursor-pointer"
        style={{
          backgroundColor: color,
        }}
      />
  </div>


}
