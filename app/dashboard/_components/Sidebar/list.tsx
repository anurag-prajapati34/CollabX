"use client"

import { useOrganizationList } from "@clerk/nextjs"
import { Item } from "./item";

const List=()=>{

    const {userMemberships} =useOrganizationList({
        userMemberships:{
            infinite:true,
        }
    })


    if(!userMemberships.data?.length) return null;

    return (
        <ul className="flex flex-col gap-y-4">
            {userMemberships.data.map((mem)=><Item key={mem.organization.id} id={mem.organization.id} imageUrl={mem.organization.imageUrl} name={mem.organization.name} />
            )}
        </ul>
    )
}

export default List
