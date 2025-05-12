"use client";

import {
  DropdownMenuContent,
  DropdownMenuContentProps,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenu,
} from "@radix-ui/react-dropdown-menu";

// import { DropdownMenu } from "./ui/dropdown-menu";
import { Link2, Pencil, Trash } from "lucide-react";
import { toast } from "sonner";
import { useApiMutation } from "@/hooks/use-api-mutation";
import { api } from "@/convex/_generated/api";
import { ConfirmModal } from "./modals/confirm-modal";
import { Button } from "./ui/button";

import { RenameTitleModal } from "./modals/rename-title-modal";
interface ActionsProps {
  children: React.ReactNode;
  side?: DropdownMenuContentProps["side"];
  sideOffset?: DropdownMenuContentProps["sideOffset"];
  id: string;
  title: string;
}

export const Actions = ({
  children,
  side,
  id,
  title,
  sideOffset,
}: ActionsProps) => {
  const { mutate, pending } = useApiMutation(api.board.remove);
 

  const onCopyLink = () => {
    navigator.clipboard
      .writeText(`${window.location.origin}/board/${id}`)
      .then(() => toast.success("Link copied"))
      .catch(() => toast.error("Failed to copy link"));
  };
  const onDelete = () => {
    mutate({ id })
      .then(() => toast.success("Board delted"))
      .catch(() => toast.error("Failed to delete board"));
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent
        // onClick={(e) => e.stopPropagation()}
        side={side}
        sideOffset={sideOffset}
        className="w-60 z-50 "
        id={id}
      >
        <DropdownMenuItem
          onClick={() => onCopyLink()}
          className="cursor-pointer p-3 flex gap-1 items-center bg-gray-100 rounded-lg "
        >
          <Link2 className="h-4 w-4 mr-2" />
          Copy board link
        </DropdownMenuItem>

        <RenameTitleModal  id={id} title={title}>
          <Button
            variant={"ghost"}
            className="cursor-pointer p-3 text-sm w-full flex gap-1 justify-start bg-gray-100 rounded-lg font-normal"
          >
            <Pencil className="h-4 w-4 mr-2" />
            Rename board
          </Button>
        </RenameTitleModal>
        <ConfirmModal
          header="Delete board ?"
          disabled={pending}
          onConfirm={onDelete}
          description="Are you sure you want to delete this board? This action cannot be undone."
        >
          <Button
            variant={"ghost"}
            className="cursor-pointer p-3 text-sm w-full flex gap-1 justify-start bg-gray-100 rounded-lg font-normal"
          >
            <Trash className="h-4 w-4 mr-2" />
            Delete board
          </Button>
        </ConfirmModal>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
