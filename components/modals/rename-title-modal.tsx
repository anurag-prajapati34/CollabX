"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { DialogClose } from "@radix-ui/react-dialog";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useApiMutation } from "@/hooks/use-api-mutation";
import { api } from "@/convex/_generated/api";

import { toast } from "sonner";
import { useState } from "react";

interface RenameTitleModalProps {
  children: React.ReactNode;
  id: string;
  title: string;
  
}

export const RenameTitleModal = ({ children, id, title }: RenameTitleModalProps) => {
  const [newTitle, setNewTitle] = useState(title);

  const { mutate, pending } = useApiMutation(api.board.update);
  const onSubmit = () => {
    mutate({ id, title: newTitle })
      .then(() => toast.success("Board title updated"))
      .catch(() => toast.error("Failed to update board title"));
  };
  return (
    <Dialog>
      <DialogTrigger  asChild>{children}</DialogTrigger>
      <DialogContent className="space-y-4" >
        <DialogHeader>
          <DialogTitle>Rename Board</DialogTitle>
          <DialogDescription>Enter new board title</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Input
            onChange={(e) => {
              setNewTitle(e.target.value);
            }}
            disabled={pending}
            maxLength={60}
          />
          <DialogClose>Cancel</DialogClose>
          <Button onClick={() => onSubmit()} disabled={pending}>
            Rename
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
