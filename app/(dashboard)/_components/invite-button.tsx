import { Plus } from "lucide-react";
import { CreateOrganization, OrganizationProfile, OrganizationSwitcher } from "@clerk/nextjs";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Hint } from "@/components/hint";
import { DialogTitle } from "@radix-ui/react-dialog";
export const InviteButton = () => {
  return (
    <Dialog>
    <DialogTrigger asChild>
    <Button variant="outline">
      <Plus className="h-4 w-4 mr-2"/>
      Invite Members

    </Button>
       
  
    </DialogTrigger>
   
    <DialogContent className="p-0 bg-transparent max-w-[880px] border-none">
    <OrganizationProfile routing="hash" />
    </DialogContent>
  </Dialog>
  );
};
