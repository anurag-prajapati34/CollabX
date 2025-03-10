
"use client"
import React from 'react'
import { RedirectToSignIn, useUser } from '@clerk/nextjs'
const page = () => {
const {isSignedIn} = useUser();

if(!isSignedIn){
 return  <RedirectToSignIn/>
}


  return (
    <div>
        DashBoard route page
    </div>
  )
}

export default page