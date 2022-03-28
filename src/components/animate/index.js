import React, { useState } from "react";
import { CSSTransition } from "react-transition-group";
import { useSpring, animated, useTransition } from "react-spring";
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
AnimateComponent.SlideRight = function AnimatedSlideRight({
  children,
  state,
  ...props
}) {
  // const props = useSpring({ to: { opacity: 0, transform: 'translateX(-200vw)' }, from: { opacity: 1, transform: 'translateX(0)' }, delay: 300 });
  const childrenArr = React.Children.toArray(children);
  const transition = useTransition(state, {
    from: { opacity: 0, transform: "translateX(-100vw)" },
    enter: { opacity: 1, transform: "translateX(0%)" },
    leave: { opacity: 0, transform: "translateX(-100vw)" },
    config: { duration: 300 },
  });
  return (
    <>
      {transition((style, state) => {
        return state ? (
          <animated.div style={style} {...props}>
            {children}
          </animated.div>
        ) : (
          ""
        );
      })}
    </>
  );
};
