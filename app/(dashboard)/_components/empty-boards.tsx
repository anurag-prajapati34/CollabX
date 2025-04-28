"use client";
import Image from "next/image";
import React from "react";

import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useOrganization } from "@clerk/nextjs";

import { Button } from "@/components/ui/button";
import { useApiMutation } from "@/hooks/use-api-mutation";
import { toast } from "sonner";


const EmptyBoards = () => {
  const { organization } = useOrganization();
  const { mutate, pending } = useApiMutation(api.board.create);

  const onClick =  () => {
    
    if (!organization) return;

    mutate({
      orgId: organization.id,
      title: "Untitled",
    })
  };

  return (
    <div className="min-h-[100vh] w-full flex flex-col items-center justify-center">
      <Image src="/logo.svg" height={140} width={140} alt="Empty" />
      <h2 className="text-2xl font-semibold mt-6">No borads at all !</h2>
      <p className="text-muted-foreground text-sm mt-2">
        Start by creating board for your organization
      </p>
      <div className="mt-6">
        {/* <CreateOrgButton/> */}
        <Button disabled={pending} size="lg" onClick={onClick}>
          Create Board
        </Button>
      </div>
    </div>
  );
};

export default EmptyBoards;
