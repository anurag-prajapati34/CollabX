"use client";

import { useCallback, useState } from "react";
import { Info } from "./info";
import { Participants } from "./participants";
import { Toolbar } from "./toolbar";
import { Camera, CanvasMode, CanvasState, Color, LayerType, Point } from "@/types/canvas";
import {
  useCanRedo,
  useCanUndo,
  useHistory,
  useMutation,
  useStorage,
} from "@liveblocks/react";
import { CursorsPresence } from "./cursors-presense";
import { pointerEventToCanvasPoint } from "@/lib/utils";
import {nanoid} from "nanoid"
import { LiveObject } from "@liveblocks/client";
import { Key } from "lucide-react";
import { LayerPreview } from "./layer-preview";
interface CanvasProps {
  boardId: string;
}

const MAX_LAYERS=100;
export const Canvas = ({ boardId }: CanvasProps) => {


    const layerIds=useStorage((root)=>root.layerIds);

const [lastUsedColor,setLastUsedColor]=useState<Color>({
    r:0,
    g:0,
    b:0
});

  const [canvasState, setCanvasState] = useState<CanvasState>({
    mode: CanvasMode.None,
  });
  const [camera, setCamera] = useState<Camera>({ x: 0, y: 0 });
  const history = useHistory();
  const canUndo = useCanUndo();
  const canRedo = useCanRedo();


  const insertLayer=useMutation(({setMyPresence,storage},
    layerType:LayerType.Ellipse|LayerType.Rectangle | LayerType.Note|LayerType.Text ,
    position:Point,
  )=>{

    const liveLayers=storage.get("layers");

    if(liveLayers.size>=MAX_LAYERS){
        return;
    }

    const liveLayerIds=storage.get("layerIds");
    const layerId=nanoid();

    const layer=new LiveObject({
        type:layerType,
        x:position.x,
        y:position.y,
        height:100,
        width:100,
        fill:lastUsedColor
    });

    liveLayerIds.push(layerId);
    liveLayers.set(layerId,layer);

    setMyPresence({
        selection:[layerId]
    },{
        addToHistory:true
    })

    setCanvasState({
        mode:CanvasMode.None
    })

  },[lastUsedColor])

const onPointerUp=useMutation(({},e)=>{

    const point=pointerEventToCanvasPoint(e,camera);
    if(canvasState.mode===CanvasMode.Inserting){
        insertLayer(canvasState.layerType,point);
    }
    else {
        setCanvasState({
            mode:CanvasMode.None
        });
    }

    history.resume();
},[camera,canvasState,insertLayer,history])

  const onWheel = useCallback((e: React.WheelEvent) => {
   
    setCamera((camera) => ({
      x: camera.x - e.deltaX,
      y: camera.y - e.deltaY,
    }));
  }, []);

  const onPointerMove = useMutation(
    ({ setMyPresence }, e: React.PointerEvent) => {
      e.preventDefault();
      
      const current = pointerEventToCanvasPoint(e, camera);
      setMyPresence({ cursor: current });
    },
    []
  );

  const onPointerLeave=useMutation(({setMyPresence},e:React.PointerEvent)=>{
    e.preventDefault();
    setMyPresence({cursor:null})
  },[])



  return (
    <main className=" min-h-screen w-full relative bg-neutral-100 touch none">
      <Info boardId={boardId} />
      <Participants />
      <Toolbar
        canvasState={canvasState}
        setCanvasState={setCanvasState}
        canRedo={canRedo}
        canUndo={canUndo}
        undo={history.undo}
        redo={history.redo}
      />
      <svg
        onWheel={onWheel}
        onPointerMove={onPointerMove}
        onPointerLeave={onPointerLeave}
        onPointerUp={onPointerUp}
        className="h-[100vh] w-[100vh]"
      >
        <g
        style={{
            transform:`translate(${camera.x}px,${camera.y}px)`
        }}
        
        >
            {
                layerIds?.map((layerdId)=>(
                   <LayerPreview
                   key={layerdId}
                   id={layerdId}
                   onLayerPointerDown={()=>{}}
                   selectionColor={"#000"}
                
                   />
                ))
            }
          <CursorsPresence />
        </g>
      </svg>
    </main>
  );
};
