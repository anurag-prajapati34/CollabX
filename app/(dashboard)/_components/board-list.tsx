"use client";
import React from "react";
import EmptySearch from "./empty-search";
import EmptyFavorites from "./empty-favorites";
import EmptyBoards from "./empty-boards";
interface BoardListPorps {
  orgId: string;
  query: {
    search?: string;
    favorites?: string;
  };
}
const BoardList = ({ orgId, query }: BoardListPorps) => {
  const data = []; //TODO: change to API CAll

  if (!data.length && query.search) {
    return <EmptySearch/>;
  }

  if (!data.length && query.favorites) {
    return <EmptyFavorites/>;
  }

  if (!data.length) {
    return <EmptyBoards/>;
  }


  return <div>{JSON.stringify(query)} Baord list</div>;
};

export default BoardList;
