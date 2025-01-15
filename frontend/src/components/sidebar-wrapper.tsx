import React from "react";
import { SideBar } from "./side-bar";
import { cn } from "@/lib/utils";

const SideBarWrapper = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col md:flex-row min-h-screen", className)}>
      <SideBar />
      <div className="flex-1 p-8 md:p-8 pt-8 overflow-x-hidden">{children}</div>
    </div>
  );
};

export default SideBarWrapper;
