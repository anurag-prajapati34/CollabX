"use client"

import { LiveList, LiveMap, LiveObject } from "@liveblocks/client";
import { Layer } from "@/types/canvas";
import {
    ClientSideSuspense,
    LiveblocksProvider,
    RoomProvider
} from "@liveblocks/react/suspense"
import { ReactNode } from "react";

interface RoomPorps {
    children: React.ReactNode,
    roomId: string,
    fallback: NonNullable<ReactNode> | null;
}

export const Room = ({ children, roomId, fallback }: RoomPorps) => {

    const live_blocks_public_key = process.env.NEXT_PUBLIC_LIVE_BLOCKS_PUBLIC_KEY!;
    return <LiveblocksProvider
        // publicApiKey={live_blocks_public_key}
        authEndpoint={"/api/liveblocks-auth"}
        throttle={16}
    >
        <RoomProvider id={roomId}
            initialPresence={{
                cursor:null,
                selection:[],
                pencilDraft:null,
                penColor:null
            }}

            initialStorage={{
                layers: new LiveMap<string, LiveObject<Layer>>(),
                layerIds: new LiveList([]),

            

            }}

        >
            <ClientSideSuspense fallback={fallback}>
                {children}
            </ClientSideSuspense>

        </RoomProvider>
    </LiveblocksProvider>
}