"use client"


import { useState } from "react"
import { Info } from "./info"
import { Participants } from "./participants"
import { Toolbar } from "./toolbar"
import { CanvasMode, CanvasState } from "@/types/canvas"
import { useCanRedo, useCanUndo, useHistory } from "@liveblocks/react"
interface CanvasProps{
    boardId:string,
}
export const Canvas=({boardId}:CanvasProps)=>{
   
const [canvasState,setCanvasState]=useState<CanvasState>({
    mode:CanvasMode.None
});

const history=useHistory();
const canUndo=useCanUndo();
const canRedo=useCanRedo();


    return (
        <main className=" min-h-screen w-full relative bg-neutral-100 touch none">
         <Info boardId={boardId}/>
         <Participants/>
         <Toolbar
         canvasState={canvasState}
         setCanvasState={setCanvasState}
         canRedo={canRedo}
         canUndo={canUndo}
         undo={history.undo}
         redo={history.redo}
         
         />
        </main>
    )
}