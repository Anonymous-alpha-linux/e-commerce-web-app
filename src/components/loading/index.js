import React from "react";
export default function Loading({ children, ...props }) {
  return (
    <div className="loading__container" {...props}>
      {children}
    </div>
  );
}
Loading.Dot = ({ children, ...props }) => {
  return <div className="loading__dot" {...props}>{children}</div>
}
