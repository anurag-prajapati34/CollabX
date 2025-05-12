"use client";

import { LayerType } from "@/types/canvas";
import { useStorage } from "@liveblocks/react/suspense";
import { memo } from "react";
import { Rectangle } from "./rectangle";
import { Ellipse } from "./ellipse";
import { Text } from "./text";
import { Note } from "./note";
import { Path } from "./path";
import { colorToCss } from "@/lib/utils";

interface LayerPreviewProps {
  id: string;
  onLayerPointerDown: (e: React.PointerEvent, layerId: string) => void;

  selectionColor?: string;
}
export const LayerPreview = memo(
  ({ id, onLayerPointerDown, selectionColor }: LayerPreviewProps) => {
    const layer = useStorage((root) => root.layers.get(id));

    if (!layer) {
      return null;
    }


switch (layer.type) {
     case LayerType.Path:
      return (
        <Path
        key={id}
        x={layer.x}
        y={layer.y}
        fill={layer.fill?colorToCss(layer.fill):"#000"}
        points={layer.points}
        onPointerDown={(e)=>onLayerPointerDown(e,id)}
        stroke={selectionColor}

        />
      )
      case LayerType.Note:
        return(
          <Note
          key={id}
          id={id}
          layer={layer}
          onPointerDown={onLayerPointerDown}
          selectionColor={selectionColor}
          />
        )
      case LayerType.Text:
        return(
          <Text
          key={id}
          id={id}
          layer={layer}
          onPointerDown={onLayerPointerDown}
          selectionColor={selectionColor}
          />
        )
      case LayerType.Ellipse:
        return(
          <Ellipse
          key={id}
            id={id}
            layer={layer}
            onPointerDown={onLayerPointerDown}
            selectionColor={selectionColor}

          />
        )
      case LayerType.Rectangle:
        return (
          <Rectangle
            key={id}
            id={id}
            layer={layer}
            onPointerDown={onLayerPointerDown}
            selectionColor={selectionColor}
          />
        );
    
       
      default:
        return null;

    
  }
}
);
LayerPreview.displayName = "LayerPreview";
