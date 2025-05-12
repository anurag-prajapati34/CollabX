"use client"

import { Room } from "@/components/room";
import { Canvas } from "./_components/canvas";
import { Loading } from "./_components/canvas-loading";
import { useParams } from "next/navigation";


 const BoardIdPage=()=>{

    const params=useParams();
    const boardId=params.boardId as string;
    return (
        <Room roomId={boardId} fallback={<Loading/>}>
            <Canvas boardId={boardId}/>
        </Room>
    )
}

export default BoardIdPage;
