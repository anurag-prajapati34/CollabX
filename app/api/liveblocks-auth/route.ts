import { Liveblocks } from "@liveblocks/node";
import { ConvexHttpClient } from "convex/browser";
import { currentUser, auth } from '@clerk/nextjs/server'
import { api } from "@/convex/_generated/api";


const convex = new ConvexHttpClient(
    process.env.NEXT_PUBLIC_CONVEX_URL!
);

const liveblocks = new Liveblocks({
    secret: process.env.NEXT_PUBLIC_LIVE_BLOCKS_SECRET_KEY!,
})

export async function POST(request: Request) {

    const authorization = await auth();
    const user = await currentUser();


    if (!authorization || !user) {
        return new Response("Unauthorized", { status: 403 });
    }
    const room = await request.json();


    if (!room?.room) {
        return new Response("Unauthorized", { status: 403 });

    }
    const board = await convex.query(api.board.get, { id: room?.room })


    if (board?.orgId != authorization.orgId) {
        return new Response("Unauthorized", { status: 403 });
    }

    const userInfo = {
        name: user.firstName || "Anonymous",
        avatar: user.imageUrl,
    };
    const session = liveblocks.prepareSession(
        user.id,
        {
            userInfo
        }
    )

    if (room?.room) {
        session.allow(room?.room, session.FULL_ACCESS);
    }

    const { status, body } = await session.authorize();

    return new Response(body, { status });

}