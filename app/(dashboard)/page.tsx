
"use client"
import React from 'react'
import { RedirectToSignIn, useOrganization, useUser } from '@clerk/nextjs'

import EmptyOrg from './_components/empty-org';
import BoardList from './_components/board-list';

interface DashBoardPageProps{
  searchParams:{
    search:string,
    favorites:string,
  }
}

const DashBoardPage = ({searchParams}:DashBoardPageProps) => {
const {isSignedIn} = useUser();
const {organization}=useOrganization();

if(!isSignedIn){
 return  <RedirectToSignIn/>
}


  return (
    <div className='min-h-[100vh] flex-1 h-[calc(100%-80px)] p-6
    '>
      {JSON.stringify(searchParams)}
        {
          !organization?<EmptyOrg/>:<BoardList
          orgId={organization.id} 
          query={searchParams} />
        }
        
    </div>
  )
}

export default DashBoardPage