"use client";

import { LayerType } from "@/types/canvas";
import { useStorage } from "@liveblocks/react/suspense";
import { memo } from "react";
import { Rectangle } from "./rectangle";

interface LayerPreviewProps {
  id: string;
  onLayerPointerDown: (e: React.PointerEvent, layerId: string) => void;

  selectionColor?: string;
}
export const LayerPreview = memo(
  ({ id, onLayerPointerDown, selectionColor }: LayerPreviewProps) => {
    const layer = useStorage((root) => root.layers.get(id));
    console.log("layer-preview",{layer,type:layer?.type})
    if (!layer) {
      return null;
    }


switch (layer.type) {
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
    
        return (
          <div
            key={id}
            style={{
              position: "absolute",
              left: layer.x,
              top: layer.y,
              width: layer.width,
              height: layer.height,
              backgroundColor: "yellow",
              border: `1px solid ${selectionColor}`,
            }}
            onPointerDown={(e) => onLayerPointerDown(e, id)}
          >
            Note
          </div>
        );
      default:
        console.warn("Unknown layer type", layer.type);
        return null;

    
  }
}
);
LayerPreview.displayName = "LayerPreview";
