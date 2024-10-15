import { ReactNode } from "react";

export function H4({children,className}:{children:ReactNode,className?:string}) {
    return (
      <h4 className={`scroll-m-20 text-xl font-semibold tracking-tight ${className}`}>
        {children}
      </h4>
    )
  }
  