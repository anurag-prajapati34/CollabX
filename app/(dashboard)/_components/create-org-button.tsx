import React from 'react'
import { Button } from '@/components/ui/button';
import { Dialog,DialogTrigger,DialogContent } from '@/components/ui/dialog';
import { CreateOrganization } from '@clerk/nextjs';

export const CreateOrgButton = () => {
  return (
    <Dialog>
    <DialogTrigger asChild>
     
      
        <Button >
      Create Organization
        </Button>
      
        

    </DialogTrigger>
    <DialogContent>
      <CreateOrganization/>
    </DialogContent>
  </Dialog>
    
  )
}

