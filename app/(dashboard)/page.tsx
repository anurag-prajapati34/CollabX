
"use client"
import React from 'react'
import { RedirectToSignIn, useOrganization, useUser } from '@clerk/nextjs'

import EmptyOrg from './_components/empty-org';
import BoardList from './_components/board-list';
import { useSearchParams } from 'next/navigation';



const DashBoardPage = () => {
const {isSignedIn} = useUser();
const {organization}=useOrganization();

const searchParams=useSearchParams();
if(!isSignedIn){
 return  <RedirectToSignIn/>
}

const search=searchParams.get('search')||'';
const favorites=searchParams.get('favorites')||'';

  return (
    <div className='min-h-[100vh] flex-1 h-[calc(100%-80px)] p-6
    '>
    
        {
          !organization?<EmptyOrg/>:<BoardList
          orgId={organization.id} 
          query={{
            search,
            favorites
          }} />
        }
        
    </div>
  )
}

export default DashBoardPage