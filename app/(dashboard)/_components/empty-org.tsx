import Image from "next/image";
import React from "react";

import { NewButton } from "./new-button";
import { CreateOrgButton } from "./create-org-button";

const EmptyOrg = () => {
  return (
    <div className="h-full flex flex-col justify-center items-center w-full min-h-screen">
      <Image src="/logo.svg" alt="Logo" height={200} width={200} />
      <h2 className="text-2xl font-semibold mt-6">Welcome to Board</h2>
      <p className=" text-muted-foreground text-sm mt-2">
        Creaete an organization to get started
      </p>

      <div className="mt-6">
        <CreateOrgButton />
      </div>
    </div>
  );
};

export default EmptyOrg;
