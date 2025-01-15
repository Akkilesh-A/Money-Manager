import React from "react";
import { SideBar } from "./side-bar";

const SideBarWrapper = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={"flex flex-col md:flex-row min-h-screen"}>
      <SideBar />
      <div className={`flex-1 p-8 md:p-8 pt-8 overflow-x-hidden ${className}`}>
        {children}
      </div>
    </div>
  );
};

export default SideBarWrapper;
