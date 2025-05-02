"use client";
import React from "react";
import EmptySearch from "./empty-search";
import EmptyFavorites from "./empty-favorites";
import EmptyBoards from "./empty-boards";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import BoardCard from "./borad-card";
import { NewBoardButton } from "./new-board-button";
interface BoardListPorps {
  orgId: string;
  query: {
    search?: string;
    favorites?: string;
  };
}
const BoardList = ({ orgId, query }: BoardListPorps) => {
  const data = useQuery(api.boards.get, { orgId,search:query.search,favorites:query.favorites });
 
  if (data==undefined) {
    return (
      <div>
        <h2 className="text-3xl">
          {query.favorites ? "Favorite boards" : "Team boards"}
        </h2>
        <div className="grid grid-cols-5 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-5 mt-8 pb-10">
          <NewBoardButton disabled={true} orgId={orgId} />
          <BoardCard.Skeleton />
          <BoardCard.Skeleton />
          <BoardCard.Skeleton />
          <BoardCard.Skeleton />
        </div>
      </div>
    );
  }

  if (!data.length && query.search) {
    return <EmptySearch />;
  }

  if (!data.length && query.favorites) {
    return <EmptyFavorites />;
  }

  if (!data.length) {
    return <EmptyBoards />;
  }

  return (
    <div>
      <h2 className="text-3xl">
        {query.favorites ? "Favorite boards" : "Team boards"}
      </h2>
      <div className="grid grid-cols-5 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-5 mt-8 pb-10">
        <NewBoardButton disabled={false} orgId={orgId} />
        {data.map((board) => {
          return (
            <BoardCard
              key={board._id}
              id={board._id}
              title={board.title}
              imageUrl={board.imageUrl}
              authorId={board.authorId}
              authorName={board.authorName}
              createdAt={board._creationTime}
              orgId={board.orgId}
              isFavorite={board.isFavorite}
            />
          );
        })}
      </div>
    </div>
  );
};

export default BoardList;
