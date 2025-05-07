import {  useSelf, useStorage } from "@liveblocks/react/suspense";
import {shallow} from '@liveblocks/react'

import { Layer,XYWH } from "@/types/canvas";

const boundingBox=(layers:Layer[]):XYWH | null =>{

    console.log({layers})
    const first=layers[0];
    if(!first){
        return null;
    }

    let left=first.x;
    let right=first.x+first.width;
    let top=first.y;
    let bottom=first.y+first.height;

    for(let i=1; i<layers.length; i++){
        const {x,y,height,width}=layers[i];
        if(left>x){
            left=x;
        }
        if(right<x+width){
            right=x+width;
        }
        if(top>y){
            top=y;
        }
        if(bottom<y+height){
            bottom=y+height;
        }
    }

    return {
        x:left,
        y:top,
        width:right-left,
        height:bottom-top
    }
}

export default function useSelectionBounds(){
    const selection=useSelf((me)=>(me.presence.selection));
    console.log({selection})
    return useStorage((root)=>{
        const selectedLayers = selection ? selection.map((layerdId) => root.layers.get(layerdId)!).filter(Boolean) : [];
        
console.log({selectedLayers})
        return boundingBox(selectedLayers);
    },shallow)
}