"use client"

import { useSelf } from "@liveblocks/react/suspense"
import { Info } from "./info"
import { Participants } from "./participants"
import { Toolbar } from "./toolbar"
interface CanvasProps{
    boardId:string,
}
export const Canvas=({boardId}:CanvasProps)=>{
    const {name,avatar}=useSelf((me)=>me.info);
    console.log("joined user : ",{name,avatar})
    return (
        <main className=" min-h-screen w-full relative bg-neutral-100 touch none">
         <Info boardId={boardId}/>
         <Participants/>
         <Toolbar/>
        </main>
    )
}