"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Info } from "./info";
import { Participants } from "./participants";
import { Toolbar } from "./toolbar";
import {
  Camera,
  CanvasMode,
  CanvasState,
  Color,
  LayerType,
  Point,
  Side,
  XYWH,
} from "@/types/canvas";
import {
  useCanRedo,
  useCanUndo,
  useHistory,
  useMutation,
  useOthersMapped,
  useSelf,
  useStorage,
} from "@liveblocks/react/suspense";
import { CursorsPresence } from "./cursors-presense";
import {
  cn,
  colorToCss,
  connectionIdToColor,
  findInterSectingLayersWithRectangle,
  penPointsToPathLayer,
  pointerEventToCanvasPoint,
  resizeBounds,
} from "@/lib/utils";
import { nanoid } from "nanoid";
import { LiveObject } from "@liveblocks/client";
import { Key } from "lucide-react";
import { LayerPreview } from "./layer-preview";
import { SelectionBox } from "./selection-box";
import { SelectionTools } from "./selection-tools";
import { Path } from "./path";
import { useDisableScrollBounce } from "@/hooks/use-disable-scroll-bounce";
import { useDeleteLayers } from "@/hooks/use-delete-layers";
interface CanvasProps {
  boardId: string;
}

const MAX_LAYERS = 100;
const SELECTIONNET_THRESHOLD = 5;
export const Canvas = ({ boardId }: CanvasProps) => {
  const layerIds = useStorage((root) => root.layerIds);
  const pencilDraft=useSelf((me)=>me.presence.pencilDraft);

  const [lastUsedColor, setLastUsedColor] = useState<Color>({
    r: 0,
    g: 0,
    b: 0,
  });

  const [canvasState, setCanvasState] = useState<CanvasState>({
    mode: CanvasMode.None,
  });
  const [camera, setCamera] = useState<Camera>({ x: 0, y: 0 });
  useDisableScrollBounce();
  const history = useHistory();
  const canUndo = useCanUndo();
  const canRedo = useCanRedo();

  const insertLayer = useMutation(
    (
      { setMyPresence, storage },
      layerType:
        | LayerType.Ellipse
        | LayerType.Rectangle
        | LayerType.Note
        | LayerType.Text,
      position: Point
    ) => {
      const liveLayers = storage.get("layers");

      if (liveLayers.size >= MAX_LAYERS) {
        return;
      }

      const liveLayerIds = storage.get("layerIds");
      const layerId = nanoid();

      const layer = new LiveObject({
        type: layerType,
        x: position.x,
        y: position.y,
        height: 100,
        width: 100,
        fill: lastUsedColor,
      });

      liveLayerIds.push(layerId);
      liveLayers.set(layerId, layer);

      setMyPresence(
        {
          selection: [layerId],
        },
        {
          addToHistory: true,
        }
      );

      setCanvasState({
        mode: CanvasMode.None,
      });
    },
    [lastUsedColor]
  );

  const unSelectLayers = useMutation(({ self, setMyPresence }) => {
    if (self.presence.selection.length > 0) {
      setMyPresence(
        {
          selection: [],
        },
        {
          addToHistory: true,
        }
      );
    }
  }, []);
  const translateSelectedLayer = useMutation(
    ({ storage, self }, point: Point) => {
      const offset = {
        x: point.x - canvasState.current.x,
        y: point.y - canvasState.current.y,
      };

      const liveLayers = storage.get("layers");

      for (const id of self.presence.selection) {
        const layer = liveLayers.get(id);
        if (layer) {
          layer.update({
            x: layer.get("x") + offset.x,
            y: layer.get("y") + offset.y,
          });
        }
      }

      setCanvasState({
        mode: CanvasMode.Translating,
        current: point,
      });
    },
    [canvasState]
  );
  const updateSelectionNet = useMutation(
    ({ storage, setMyPresence }, current: Point, origin: Point) => {
      const layers = storage.get("layers").toImmutable();
      setCanvasState({
        mode: CanvasMode.SelectionNet,
        origin,
        current,
      });

      const ids = findInterSectingLayersWithRectangle(
        layerIds,
        layers,
        origin,
        current
      );

      setMyPresence({
        selection: ids,
      });
    },
    [layerIds]
  );
  const startMulitSelection = useCallback((current: Point, origin: Point) => {
    if (
      Math.abs(current.x - origin.x) + Math.abs(current.y - origin.y) >
      SELECTIONNET_THRESHOLD
    ) {
      setCanvasState({
        mode: CanvasMode.SelectionNet,
        origin,
        current,
      });
    }
  }, []);

  const continueDrawing = useMutation(
    ({ self, setMyPresence }, point: Point, e: React.PointerEvent) => {
      const { pencilDraft } = self.presence;
      if (
        canvasState.mode != CanvasMode.Pencil ||
        e.buttons != 1 ||
        pencilDraft == null
      ) {
        return;
      }
      setMyPresence({
        cursor: point,
        pencilDraft:
          pencilDraft.length === 1 &&
          pencilDraft[0][0] === point.x &&
          pencilDraft[0][1] === point.y
            ? pencilDraft
            : [...pencilDraft, [point.x, point.y, e.pressure]],
      });
    },
    [canvasState.mode]
  );
  const insertPath = useMutation(({ storage, self, setMyPresence }) => {
    const liveLayers = storage.get("layers");
    const { pencilDraft } = self.presence;
    if (
      pencilDraft == null ||
      pencilDraft.length < 2 ||
      liveLayers.size > MAX_LAYERS
    ) {
      setMyPresence({ pencilDraft: null });
      return;
    }

    const id = nanoid();
    liveLayers.set(id,new LiveObject(penPointsToPathLayer(pencilDraft,lastUsedColor)));

    const liveLayerIds=storage.get("layerIds");
    liveLayerIds.push(id);
    setMyPresence({
      pencilDraft:null
    });
    setCanvasState({mode:CanvasMode.Pencil})

  }, [lastUsedColor]);
  const startDrawing = useMutation(
    ({ setMyPresence }, point: Point, pressure: number) => {
      setMyPresence({
        pencilDraft: [[point.x, point.y, pressure]],
        penColor: lastUsedColor,
      });
    },
    [lastUsedColor]
  );
  const resizeSelectedLayer = useMutation(
    ({ storage, self }, point: Point) => {
      if (canvasState.mode != CanvasMode.Resizing) {
        return;
      }

      const bounds = resizeBounds(
        canvasState.initialBounds,
        canvasState.corner,
        point
      );

      const liveLayers = storage.get("layers");
      const layer = liveLayers.get(self.presence.selection[0]);
      if (layer) {
        layer.update(bounds);
      }
    },
    [canvasState]
  );

  const onResizeHandlePointerDown = useCallback(
    (corner: Side, initialBounds: XYWH) => {
      history.pause();
      setCanvasState({
        mode: CanvasMode.Resizing,
        initialBounds,
        corner,
      });
    },
    [history]
  );

  const onPointerUp = useMutation(
    ({}, e) => {
      const point = pointerEventToCanvasPoint(e, camera);
      if (
        canvasState.mode === CanvasMode.None ||
        canvasState.mode === CanvasMode.Pressing
      ) {
        setCanvasState({
          mode: CanvasMode.None,
        });
        unSelectLayers();
      } else if (canvasState.mode === CanvasMode.Pencil) {
        insertPath();
      } else if (canvasState.mode === CanvasMode.Inserting) {
        insertLayer(canvasState.layerType, point);
      } else {
        setCanvasState({
          mode: CanvasMode.None,
        });
      }

      history.resume();
    },
    [
      camera,
      canvasState,
      insertLayer,
      history,
      unSelectLayers,
      insertPath,
      setCanvasState,
    ]
  );

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
      if (canvasState.mode === CanvasMode.Pressing) {
        startMulitSelection(current, canvasState.origin);
      } else if (canvasState.mode === CanvasMode.SelectionNet) {
        updateSelectionNet(current, canvasState.origin);
      } else if (canvasState.mode === CanvasMode.Translating) {
        translateSelectedLayer(current);
      } else if (canvasState.mode === CanvasMode.Resizing) {
        resizeSelectedLayer(current);
      } else if (canvasState.mode === CanvasMode.Pencil) {
        continueDrawing(current, e);
      }
      setMyPresence({ cursor: current });
    },
    [
      canvasState,
      resizeSelectedLayer,
      camera,
      translateSelectedLayer,
      continueDrawing,
      startMulitSelection,
      updateSelectionNet,
    ]
  );

  const onPointerLeave = useMutation(
    ({ setMyPresence }, e: React.PointerEvent) => {
      e.preventDefault();
      setMyPresence({ cursor: null });
    },
    []
  );

  const onPointerDown = useCallback(
    (e: React.PointerEvent) => {
      const point = pointerEventToCanvasPoint(e, camera);
      if (canvasState.mode === CanvasMode.Inserting) {
        return;
      }

      if (canvasState.mode === CanvasMode.Pencil) {
        startDrawing(point, e.pressure);
        return;
      }

      setCanvasState({ origin: point, mode: CanvasMode.Pressing });
    },
    [camera, canvasState.mode, setCanvasState, startDrawing]
  );

  const selections = useOthersMapped((other) => other.presence.selection);

  const onLayerPointerDown = useMutation(
    ({ self, setMyPresence }, e: React.PointerEvent, layerId: string) => {
      if (
        canvasState.mode === CanvasMode.Pencil ||
        canvasState.mode === CanvasMode.Inserting
      ) {
        return;
      }
      history.pause();
      e.stopPropagation();

      const point = pointerEventToCanvasPoint(e, camera);
      if (!self.presence.selection?.includes(layerId)) {
        setMyPresence({ selection: [layerId] }, { addToHistory: true });
      }
      setCanvasState({
        mode: CanvasMode.Translating,
        current: point,
      });
    },
    [setCanvasState, camera, history, canvasState.mode]
  );

  const layerIdsToColorSelection = useMemo(() => {
    const layerIdsToColorSelection: Record<string, string> = {};

    for (const user of selections) {
      const [connectionId, selection] = user;
      if (!selection) return {};
      for (const layerId of selection) {
        layerIdsToColorSelection[layerId] = connectionIdToColor(connectionId);
      }
    }
    return layerIdsToColorSelection;
  }, [selections]);

  const selectAll=useMutation(({setMyPresence})=>{

    setMyPresence({
      selection:layerIds
    },{
      addToHistory:true
    })
  },[
    layerIds

  ])

  const deleteLayers=useDeleteLayers();
  useEffect(()=>{

    function onKeyDown(e:KeyboardEvent){
      switch(e.key){
        case "Delete":{
          if(canvasState.mode===CanvasMode.None){
            deleteLayers();
          }
        }
        break;
        case "a": {
          if (e.ctrlKey || e.metaKey) {
            e.preventDefault();
            setCanvasState({ mode: CanvasMode.None });
            selectAll();
          }
        }
        break;
        case "y":{
          if(e.ctrlKey||e.metaKey){
            history.redo();
          }
        }
        break;
        case "z":{
          if(e.ctrlKey||e.metaKey){
           
              history.undo();
            
          }
        }
        break;
      }
    }
    document.addEventListener("keydown",onKeyDown);
    return ()=>{
      document.removeEventListener("keydown",onKeyDown);
    }
  },[deleteLayers,history,selectAll,canvasState.mode]);
  
  return (
    <main className={cn('min-h-screen w-full relative bg-neutral-100 touch none',canvasState.mode===CanvasMode.Pencil&&'cursor-crosshair')}>
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

      <SelectionTools camera={camera} setLastUsedColor={setLastUsedColor} />

      <svg
      onWheel={onWheel}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      onPointerUp={onPointerUp}
      onPointerDown={onPointerDown}
      className="h-[100vh] w-full "
      >
      <defs>
        <pattern
          id="dot-grid"
          x="0"
          y="0"
          width="30"
          height="30"
          patternUnits="userSpaceOnUse"
        >
          <circle cx="2" cy="2" r="2" fill="#cfd1d1" />
        </pattern>
      </defs>
      <rect
        
        width={10000}
        height={10000}
        fill="url(#dot-grid)"
      />
      <g
        style={{
        transform: `translate(${camera.x}px,${camera.y}px)`,
        }}
      >
        {layerIds?.map((layerdId) => (
        <LayerPreview
          key={layerdId}
          id={layerdId}
          onLayerPointerDown={onLayerPointerDown}
          selectionColor={layerIdsToColorSelection[layerdId]}
        />
        ))}

        <SelectionBox onResizeHandlePointerDown={onResizeHandlePointerDown} />
        {canvasState.mode === CanvasMode.SelectionNet &&
        canvasState.current != null && (
          <rect
          className="fill-blue-500/5 stroke-blue-500 stroke-1"
          x={Math.min(canvasState.origin.x, canvasState.current.x)}
          y={Math.min(canvasState.origin.y, canvasState.current.y)}
          width={Math.abs(canvasState.origin.x - canvasState.current.x)}
          height={Math.abs(canvasState.origin.y - canvasState.current.y)}
          />
        )}
        <CursorsPresence />
        {pencilDraft != null && pencilDraft?.length > 0 && (
        <Path
          points={pencilDraft}
          fill={colorToCss(lastUsedColor)}
          x={0}
          y={0}
        />
        )}
      </g>
      </svg>
    </main>
  );
};
