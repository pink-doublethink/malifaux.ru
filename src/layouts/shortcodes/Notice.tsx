import React from "react";

interface NoticeProps {
  type: string;
  children: React.ReactNode;
}

function Notice({ type, children }: NoticeProps) {
  return (
    <div className={`notice ${type} relative rounded mt-8`}>
      <div className="absolute h-[30px] -top-[30px] z-10 left-0 p-3 flex items-center">
        <p className="my-0 text-dark ml-1.5 capitalize">{type}</p>
      </div>
      <div className="p-3">{children}</div>
    </div>
  );
}

export default Notice;