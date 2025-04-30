"use client";
import { useApiMutation } from "@/hooks/use-api-mutation";
import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";

interface NewBoardButtonProps {
  orgId: string;
  disabled: boolean;
}
export const NewBoardButton = ({ orgId, disabled }: NewBoardButtonProps) => {
  const { mutate, pending } = useApiMutation(api.board.create);
  const onClick = () => {
    mutate({
      orgId,
      title: "Untitled",
    })
      .then((id) => {
        toast.success("Board created");
        //TODO:redirect to /board/{id}
      })
      .catch((error) => toast.error("Failed to create board"));
  };
  return (
    <button
      disabled={pending || disabled}
      onClick={() => onClick()}
      className={cn(
        "group bg-blue-600 aspect-[100/127] border rounded-lg flex flex-col justify-center items-center overflow-hidden cursor-pointer hover:bg-blue-800 transition-colors duration-200",
        (pending || disabled) && "opacity-75 cursor-not-allowed bg-blue-600"
      )}
    >
      <Plus className="h-12 w-12 text-white stroke-1" />
      <p className="text-small text-white font-light ">New Board</p>
    </button>
  );
};
