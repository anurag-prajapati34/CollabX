"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Overlay } from "./overlay";
import { formatDistanceToNow } from "date-fns";
import { useAuth } from "@clerk/nextjs";
import { Footer } from "./footer";
import { Skeleton } from "@/components/ui/skeleton";
import { Actions } from "@/components/actions";
import { MoreHorizontal } from "lucide-react";
import { useApiMutation } from "@/hooks/use-api-mutation";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";

interface BoardCardProps {
  id: string;
  title: string;
  imageUrl: string;
  authorId: string;
  authorName: string;
  createdAt: number;
  orgId: string;
  isFavorite: boolean;
}

const BoardCard = ({
  id,
  title,
  imageUrl,
  authorId,
  authorName,
  createdAt,
  isFavorite,
  orgId,
}: BoardCardProps) => {
  const { userId } = useAuth();
  const authorLabel = userId === authorId ? "You" : authorName;
  const createdAtLabel = formatDistanceToNow(createdAt, {
    addSuffix: true,
  });
  const {mutate:onFavorite,pending:pendingFavorite}=useApiMutation(api.board.favorite);
  const {mutate:onUnFavorite,pending:pendingUnFavorite}=useApiMutation(api.board.unFavorite);

  const toggleFavorite=()=>{
    if(isFavorite){
        onUnFavorite({id})
        .then(()=>toast.success("Unfavorited"))
        .catch((err)=>toast.error("Failed to unfavorite"))
    }else{
      onFavorite({id,orgId})
      .then(()=>toast.success("Favorited"))
      .catch((err)=>toast.error("Failed to favorite"))
    }
}
  return (
    <span>
      <div className="group aspect-[100/127] border rounded-lg flex flex-col justify-between overflow-hidden">
        <div className="relative flex-1 bg-amber-50">
          <Image src={imageUrl} alt={title} fill className="object-fit" />

          <Link href={`/board/${id}`}>
            <Overlay />
          </Link>
          <Actions id={id} title={title} side="right">
            <button className="absolute z-50 top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity px-3 py-2 outline-none ">
              <MoreHorizontal className="text-white opacity-75 hover:opacity-100 transition-opacity" />
            </button>
          </Actions>
        </div>
        <Footer
          isFavorite={isFavorite}
          title={title}
          authorLabel={authorLabel}
          createdAtLabel={createdAtLabel}
          onClick={toggleFavorite}
          disabled={pendingFavorite||pendingUnFavorite}
        />
      </div>
    </span>
  );
};

BoardCard.Skeleton = function BoardCardSkeleton() {
  return (
    <div className="group aspect-[100/127] border rounded-lg  overflow-hidden">
      <Skeleton className="h-full w-full" />
    </div>
  );
};
export default BoardCard;
