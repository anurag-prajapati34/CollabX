"use client";
import { Hint } from "@/components/hint";
import { Button } from "@/components/ui/button";
import { LucideIcon } from "lucide-react";
interface ToolButtonProps {
  lablel: string;
  icon: LucideIcon;
  onClick: () => void;
  isDisabled: boolean;
  isActive: boolean;
}

export const ToolButton = ({
  lablel,
  icon: Icon,
  onClick,
  isDisabled,
  isActive,
}: ToolButtonProps) => {
  return (
    <Hint label={lablel} side="right" sideOffset={14}>
      <Button
        disabled={isDisabled}
        onClick={onClick}
        size={"icon"}
        variant={isActive ? "boardActive" : "board"}
      >
        <Icon />
      </Button>
    </Hint>
  );
};
