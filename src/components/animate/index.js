import React, { useState } from "react";
import { CSSTransition } from "react-transition-group";
export default function AnimateComponent({
  children,
  timeout,
  component,
  unmountOnExit,
  classNames,
}) {
  const [isMounted, setMounted] = useState(true);
  return (
    <>
      <div
        className="transition__container"
        onClick={() => setMounted(!isMounted)}
      >
        {component}
      </div>
      <CSSTransition
        in={isMounted}
        timeout={timeout}
        unmountOnExit={true}
        classNames={classNames}
      >
        {children}
      </CSSTransition>
    </>
  );
}
