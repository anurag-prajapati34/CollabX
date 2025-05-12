import { Hint } from "@/components/hint";
import { colorToCss, hexToRgb } from "@/lib/utils";
import { Color } from "@/types/canvas";


interface CustomColorButtonProps {
  onChange: (color: Color) => void;
  color:Color;
}
export const CustomColorButton=({onChange,color}:CustomColorButtonProps)=>{

  const handleColorChange=(e:React.ChangeEvent<HTMLInputElement>)=>{

    const rgbColor=hexToRgb(e.target.value);
    onChange(rgbColor);
   

  }


  return <Hint
  label="Custom Color"
  side="right"
  sideOffset={14}
  
  >
    <div className=" relative w-8 h-8 items-center flex justify-center hover:opacity-75 transition overflow-hidden cursor-pointer">
      <input type="color" className=" absolute h-fit w-full  rounded-md border border-neutral-300 opacity-0 cursor-pointer" 
       onChange={(e)=>handleColorChange(e)}
       
       alt="select color"/>

       <div
        className="h-8 w-8  border border-black rounded-full cursor-pointer"
        style={{
          backgroundColor: colorToCss(color),
        }}
      />
  </div>
  </Hint>


}