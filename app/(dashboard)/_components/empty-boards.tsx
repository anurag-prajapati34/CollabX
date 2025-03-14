import Image from 'next/image'
import React from 'react'
import { CreateOrgButton } from './create-org-button'

const EmptyBoards = () => {
  return (
    <div className='min-h-[100vh] w-full flex flex-col items-center justify-center'>
        

        <Image 
        src="/logo.svg"
        height={140}
        width={140}
        alt='Empty'/>
        <h2 className='text-2xl font-semibold mt-6'>
            No borads at all !
        </h2>
        <p className='text-muted-foreground text-sm mt-2'>
            Start by creating board for your organization 

        </p>
        <div className='mt-6'>
          <CreateOrgButton/>
        </div>
    </div>
  )
}

export default EmptyBoards