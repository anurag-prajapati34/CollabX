import { Camera } from "@/types/canvas";
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

const COLORS=[
  "#EA2027",
  "#0098DA",
  "#FFC107",
  "#34C759",
  "#FF5722",

]
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function connectionIdToColor(connectionId:number){
return COLORS[connectionId%COLORS.length];
}


export function pointerEventToCanvasPoint(e:React.PointerEvent,camera:Camera){

  return {
    x:Math.round(e.clientX-camera.x),
    y:Math.round(e.clientY-camera.y)
  }
}
