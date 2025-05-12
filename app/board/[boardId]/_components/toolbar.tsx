import {
  CircleIcon,
  Hand,
  MousePointer,

  Pencil,
  Redo2,
  Square,
  StickyNote,
  Type,
  Undo2,
} from "lucide-react";
import { ToolButton } from "./tool-button";
import { CanvasMode, CanvasState, LayerType } from "@/types/canvas";



interface ToolbarProps{
        canvasState:CanvasState,
        setCanvasState:(newState:CanvasState)=>void;
        undo:()=>void;
        redo:()=>void;
        canUndo:boolean,
        canRedo:boolean,

}

export const Toolbar = ({
canvasState,
setCanvasState,
undo,
redo,
canRedo,
canUndo,
}:ToolbarProps) => {
  return (
    <div
      className="absolute top-[50%] 
    -translate-y-[50%] left-2 flex flex-col gap-y-4"
    >
      <div
        className="bg-white rounded-md p-1.5 
        flex gap-y-1 flex-col items-cneter shadow-md"
      >
        <ToolButton
          lablel="Select"
          icon={MousePointer}
          onClick={() => setCanvasState({mode:CanvasMode.None})}
          isDisabled={false}
          isActive={
            canvasState.mode===CanvasMode.None ||
            canvasState.mode===CanvasMode.Translating ||
            canvasState.mode===CanvasMode.Pressing ||
            canvasState.mode===CanvasMode.Resizing ||
            canvasState.mode===CanvasMode.SelectionNet
          }
        />
        <ToolButton
          lablel="Text"
          icon={Type}
          onClick={() => setCanvasState({mode:CanvasMode.Inserting,
            layerType:LayerType.Text
          })}
          isDisabled={false}
          isActive={
            canvasState.mode===CanvasMode.Inserting &&
            canvasState.layerType===LayerType.Text
          }
        />
        <ToolButton
          lablel="Sticky notes"
          icon={StickyNote}
          onClick={() => setCanvasState({
            mode:CanvasMode.Inserting,
            layerType:LayerType.Note,
            
          })}
          isDisabled={false}
          isActive={canvasState.mode===CanvasMode.Inserting&&
            canvasState.layerType===LayerType.Note

          }
        />
        <ToolButton
          lablel="Rectangle"
          icon={Square}
          onClick={() => setCanvasState({
            mode:CanvasMode.Inserting,
            layerType:LayerType.Rectangle,
            
          })}
          isDisabled={false}
          isActive={canvasState.mode===CanvasMode.Inserting&&
            canvasState.layerType===LayerType.Rectangle

          }
        />
        <ToolButton
          lablel="Ellipse"
          icon={CircleIcon}
          onClick={() => setCanvasState({
            mode:CanvasMode.Inserting,
            layerType:LayerType.Ellipse,
            
          })}
          isDisabled={false}
          isActive={canvasState.mode===CanvasMode.Inserting&&
            canvasState.layerType===LayerType.Ellipse

          }
        />
        <ToolButton
          lablel="Pen"
          icon={Pencil}
          onClick={() => setCanvasState({
            mode:CanvasMode.Pencil,
            
            
          })}
          isDisabled={false}
          isActive={canvasState.mode===CanvasMode.Pencil

          }
        />
        {/* <ToolButton
          lablel="Hand"
          icon={Hand}
          onClick={() => {}}
          isDisabled={false}
          isActive={false}
        /> */}
      </div>
      <div
        className="bg-white rounded-md p-1.5 
        flex gap-y-1 flex-col items-cneter shadow-md"
      >
        <ToolButton
          lablel="Undo"
          icon={Undo2}
          onClick={undo}
          isDisabled={!canUndo}
          isActive={false}
        />
        <ToolButton
          lablel="Redo"
          icon={Redo2}
          onClick={redo}
          isDisabled={!canRedo}
          isActive={false}
        />
      </div>
    </div>
  );
};

export function ToolbarSkeleton() {
  return (
    <div
      className="absolute top-[50%] bg-white
    -translate-y-[50%] left-2 flex flex-col gap-y-4 
    shadow-md h-[360px] w-[52px]"
    />
  );
}
