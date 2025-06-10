"use client";
import {OrganizationSwitcher, UserButton } from "@clerk/nextjs";
import React from "react";
import { SearchInput } from "./search-intput";

import { InviteButton } from "./invite-button";
import { useOrganization } from "@clerk/nextjs";

const Navbar = () => {

  const {organization}=useOrganization();
  return (
    <div className="flex items-center gap-x-4 p-5 ">
      <div className=" hidden lg:flex lg:flex-1">
        
        <SearchInput />
      </div>

      <div className="block lg:hidden flex-1">
        <OrganizationSwitcher
          hidePersonal
          appearance={{
            elements: {
              rootBox: {
                display: "flex",
                justifyContent: "center",
                alignItme: "center",
                width: "100%",
                maxWidth:"376px",
              },
              organizationSwitcherTrigger: {
                padding: "6px",
                width: "100%",
                borderRadius: "8px",
                border: "1px solid #E5E7EB",
                justifyContent: "space-between",
                backgroundColor: "white",
              },
            },
          }}
        />
      </div>
 

     {
      organization && <InviteButton/>
     }
      <UserButton />
    </div>
  );
};

export default Navbar;
