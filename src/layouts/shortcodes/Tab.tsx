import React, { ReactNode } from "react";

interface TabProps {
  children: ReactNode;
}

function Tab({ children }: TabProps) {
  return <li className="tab-item my-0 hidden">{children}</li>;
}

export default Tab;