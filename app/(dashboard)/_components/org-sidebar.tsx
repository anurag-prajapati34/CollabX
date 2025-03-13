"use client";
import { cn } from "@/lib/utils";
import { Poppins } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { OrganizationSwitcher } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { LayoutDashboard, Star } from "lucide-react";
import { useSearchParams } from "next/navigation";
const font = Poppins({
  subsets: ["latin"],
  weight: "600",
});

const OrgSidebar = () => {
  const searchParams = useSearchParams();
  const favorites = searchParams.get("favorites");

  return (
    <div className="hidden  lg:flex flex-col space-y-6 w-[206px] pl-5 pt-5 ">
      <Link href={"/"}>
        <div className="flex items-center justify-center gap-x-2">
          <Image src="/logo.svg" alt="Logo" height={60} width={60} />
          <span className={cn("font-semibold text-2xl", font.className)}>
            Board
          </span>
        </div>
      </Link>
      <OrganizationSwitcher
        hidePersonal
        appearance={{
          elements: {
            rootBox: {
              display: "flex",
              justifyContent: "center",
              alignItme: "center",
              width: "100%",
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

      <div className="space-y-1 w-full ">
        <Button asChild size={"lg"} variant={favorites ? "ghost" : "secondary"}>
          <Link href={"/"}>
            <LayoutDashboard className="h-4 w-4 mr-2 text-black" />
            Team boards
          </Link>
        </Button>
        <Button asChild size={"lg"} variant={favorites ? "secondary" : "ghost"}>
          <Link
            href={{
              pathname: "/",
              query: { favorites: true },
            }}
          >
            <Star className="h-4 w-4 mr-2 text-black" />
            Favorite boards
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default OrgSidebar;
