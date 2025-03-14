import Image from 'next/image'
import React from 'react'

const EmptyFavorites = () => {
  return (
    <div className='min-h-[100vh] w-full flex flex-col items-center justify-center'>
        

        <Image 
        src="/logo.svg"
        height={140}
        width={140}
        alt='Empty'/>
        <h2 className='text-2xl font-semibold mt-6'>
            No Favorite boards !
        </h2>
        <p className='text-muted-foreground text-sm mt-2'>
            Try favoriting board

        </p>
    </div>
  )
}

export default EmptyFavorites