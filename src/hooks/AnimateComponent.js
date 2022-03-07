import React, { useEffect, useState } from "react";
import { CSSTransition } from "react-transition-group";
export default function Component({ children, ...props }) {
  const [isMounted, toggleMounted] = useState(false);
  return (
    <>
      <button onClick={() => toggleMounted(!isMounted)} className={props.Class}>
        {props.name}
      </button>
      <CSSTransition
        in={isMounted}
        timeout={0}
        unmountOnExit
        classNames="transition"
      >
        {children}
      </CSSTransition>
    </>
  );
}
