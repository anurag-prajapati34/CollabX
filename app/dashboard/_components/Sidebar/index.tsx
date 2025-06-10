import React from "react";
import { NewButton } from "../new-button";
import List from "../Sidebar/list";
const index = () => {
  return (
    <aside className="fixed left-0 bg-blue-950 h-full w-[60px] flex p-3 flex-col gap-y-4">
      <List />
      <NewButton />
    </aside>
  );
};

export default index;
