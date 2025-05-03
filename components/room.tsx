"use client"

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
    >
        <RoomProvider id={roomId}
            initialPresence={{}}

        >
            <ClientSideSuspense fallback={fallback}>
                {children}
            </ClientSideSuspense>

        </RoomProvider>
    </LiveblocksProvider>
}