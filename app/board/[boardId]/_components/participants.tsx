"use client"
import { useOthers, useSelf } from '@liveblocks/react';
import { UserAvatar } from './user-avatar';
import { connectionIdToColor } from '@/lib/utils';
const MAX_SHOWN_USERS = 2;
export const Participants = () => {
    const users = useOthers();
    const currentUser = useSelf();
    const hasMoreUsers = users.length > MAX_SHOWN_USERS;
    return <div className="absolute h-12 top-2 right-2
     bg-white p-3 flex items-center shadow-md rounded-md">
        <div
            className='flex '
        >
            {
                currentUser && (
                    <UserAvatar
                        src={currentUser?.info?.avatar}
                        name={currentUser?.info?.name + " (You)"}
                        fallback={currentUser?.info?.name[0] || "ME"}
                        borderColor={connectionIdToColor(currentUser?.connectionId)}
                    />
                )
            }
            {
                users.slice(0, MAX_SHOWN_USERS)
                    .map(({ connectionId, info }) => {
                        console.log("user", info);
                        return <UserAvatar
                            key={connectionId}
                            src={info?.avatar}
                            name={info?.name}
                            fallback={info?.name[0] || "T"}
                            borderColor={connectionIdToColor(connectionId)}


                        />
                    })
            }

            {
                hasMoreUsers && (
                    <UserAvatar

                        name={users?.length - MAX_SHOWN_USERS + " more"}
                        fallback={"+" + (users?.length - MAX_SHOWN_USERS)}

                    />
                )
            }

        </div>
    </div>
}

export function ParticipantsSkeleton() {
    return (<div className="absolute h-12 top-2
     right-2 bg-white p-3 flex items-center shadow-md
    w-[100px]"/>
    )
}

