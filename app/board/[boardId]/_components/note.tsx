import { cn, colorToCss, getContrastingColor } from "@/lib/utils";
import { TextLayer,NoteLayer } from "@/types/canvas";

import { Kalam } from "next/font/google";
import ContentEditable from "react-contenteditable";
import { useMutation } from "@liveblocks/react/suspense";
const font = Kalam({
  subsets: ["latin"],
  weight: ["400"],
});

interface NoteProps {
  id: string;
  layer: NoteLayer;
  onPointerDown: (e: React.PointerEvent, id: string) => void;
  selectionColor?: string;
}

export const Note = ({
  layer,
  id,
  onPointerDown,
  selectionColor,
}: NoteProps) => {
  const { x, y, width, height, fill, value } = layer;

  const calculateFontSize = (width: number, height: number) => {
    const maxFontSize = 76;
    const scaleFactor = 0.15;
    const fontSizeBasedOnHeight = height * scaleFactor;
    const fontSizeBasedOnWidth = width * scaleFactor;
    return Math.min(maxFontSize, fontSizeBasedOnHeight, fontSizeBasedOnWidth);
  };

  const updateValue = useMutation(({ storage }, newValue: string) => {
    const liveLayers = storage.get("layers");
    liveLayers.get(id)?.set("value", newValue);
  }, []);

  const handleContentChange = (e: ContentEditable) => {
    updateValue(e?.target?.value);
  };

  return (
    <foreignObject
      x={x}
      y={y}
      width={width}
      height={height}
      onPointerDown={(e) => onPointerDown(e, id)}
      style={{
        outline: selectionColor ? `1px solid ${selectionColor}` : "none",
        backgroundColor:fill?colorToCss(fill):"#000"
      }}
    >
      <ContentEditable
        html={value || "Text"}
        onChange={(e) => handleContentChange(e)}
        className={cn(
          "h-full w-full flex items-center justify-center text-center  outline-none",
          font.className
        )}
        style={{
          fontSize: calculateFontSize(width, height),
          color: fill ? getContrastingColor(fill) : "#000",
        }}
      />
    </foreignObject>
  );
};
