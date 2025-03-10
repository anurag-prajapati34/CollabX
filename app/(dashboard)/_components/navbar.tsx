"use client";
import { UserButton } from "@clerk/nextjs";
import React from "react";

const navbar = () => {
  return (
    <div className="flex items-center gap-x-4 p-5 bg-green-500">
      <div className=" bg-yellow-500 flex-1">
        {/*todo: search*/}
        Search
      </div>

      <div>
        PI
        <UserButton />
      </div>
    </div>
  );
};

export default navbar;
