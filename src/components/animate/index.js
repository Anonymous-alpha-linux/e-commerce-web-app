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

AnimateComponent.Dropdown = function AnimatedDropdown({
  children,
  style,
  ...props
}) {
  const arrChild = React.Children.toArray(children);
  const transition = useTransition(arrChild, {
    keys: (item) => item.key,
    from: { maxHeight: 0 },
    enter: { maxHeight: 800, overflow: "hidden", ...style },
    leave: { maxHeight: 0 },
    config: { duration: 600 },
  });
  return transition(
    (prop, item) =>
      item && (
        <animated.div style={prop} {...props}>
          {item}
        </animated.div>
      )
  );
};

AnimateComponent.Rotate = function AnimatedRotate({
  children,
  state,
  deg,
  style,
  ...props
}) {
  const spring = useSpring({
    transform: `rotate(${state ? deg : 0}deg)`,
    ...style,
  });
  return (
    <animated.div style={spring} {...props}>
      {children}
    </animated.div>
  );
};

AnimateComponent.Zoom = function AnimatedZoom({
  children,
  zoom = 1,
  style,
  ...props
}) {
  let [x, y] = zoom instanceof Object ? [zoom.x, zoom.y] : [zoom, zoom];
  var arrChild = React.Children.toArray(children);
  const transition = useTransition(arrChild, {
    keys: (item) => item.key,
    from: { transform: `scale(0)`, opacity: 0 },
    enter: { transform: `scale(${x}, ${y})`, opacity: 1, ...style },
    delay: 200,
  });
  return transition(
    (style, item) =>
      item && (
        <animated.div style={style} {...props}>
          {item}
        </animated.div>
      )
  );
};

AnimateComponent.Width = function AnimateWidth({ children, style, ...props }) {
  const arrChild = React.Children.toArray(children);
  const transition = useTransition(arrChild, {
    keys: (item) => item.key,
    from: { maxWidth: 0, opacity: 0 },
    enter: { maxWidth: 200, opacity: 1, ...style },
    leave: { maxWidth: 0, opacity: 0 },
    config: { duration: 400 },
  });
  return transition(
    (prop, item) =>
      item && (
        <animated.div style={prop} {...props}>
          {item}
        </animated.div>
      )
  );
};
