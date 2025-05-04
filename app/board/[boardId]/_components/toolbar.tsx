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

export const Toolbar = () => {
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
          onClick={() => {}}
          isDisabled={false}
          isActive={false}
        />
        <ToolButton
          lablel="Text"
          icon={Type}
          onClick={() => {}}
          isDisabled={false}
          isActive={false}
        />
        <ToolButton
          lablel="Sticky notes"
          icon={StickyNote}
          onClick={() => {}}
          isDisabled={false}
          isActive={false}
        />
        <ToolButton
          lablel="Rectangle"
          icon={Square}
          onClick={() => {}}
          isDisabled={false}
          isActive={false}
        />
        <ToolButton
          lablel="Circle"
          icon={CircleIcon}
          onClick={() => {}}
          isDisabled={false}
          isActive={false}
        />
        <ToolButton
          lablel="Pen"
          icon={Pencil}
          onClick={() => {}}
          isDisabled={false}
          isActive={false}
        />
        <ToolButton
          lablel="Hand"
          icon={Hand}
          onClick={() => {}}
          isDisabled={false}
          isActive={false}
        />
      </div>
      <div
        className="bg-white rounded-md p-1.5 
        flex gap-y-1 flex-col items-cneter shadow-md"
      >
        <ToolButton
          lablel="Undo"
          icon={Undo2}
          onClick={() => {}}
          isDisabled={true}
          isActive={false}
        />
        <ToolButton
          lablel="Redo"
          icon={Redo2}
          onClick={() => {}}
          isDisabled={true}
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
