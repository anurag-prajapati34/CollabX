
"use client"
import React from 'react'
import { RedirectToSignIn, useOrganization, useUser } from '@clerk/nextjs'
import { OrganizationInvitation } from '@clerk/nextjs/server';
import EmptyOrg from './_components/empty-org';
const DashBoardPage = () => {
const {isSignedIn} = useUser();
const {organization}=useOrganization();

if(!isSignedIn){
 return  <RedirectToSignIn/>
}


  return (
    <div className='min-h-[100vh] flex-1 h-[calc(100%-80px)] p-6
    '>
      
        {
          !organization?<EmptyOrg/>:<p>Board List !</p>
        }
        
    </div>
  )
}

export default DashBoardPage