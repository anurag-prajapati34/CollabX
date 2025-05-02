import { Canvas } from "./_components/canvas";
interface BoardIdPageProps{
    boardId:string,
}

 const BoardIdPage=({boardId}:BoardIdPageProps)=>{

    return (
        <Canvas boardId={boardId}/>
    )
}

export default BoardIdPage;
