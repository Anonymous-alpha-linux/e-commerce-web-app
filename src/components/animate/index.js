import React, { useState } from "react";
import { CSSTransition } from "react-transition-group";
import { useSpring, animated, useTransition } from "react-spring";
import { BsCaretDownFill } from 'react-icons/bs';
import { Icon, Text } from '..';
import { OutsideAlert } from "../../hooks";
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
AnimateComponent.FadeInRight = function AnimatedFadeInRight({ children, initialPosition = { x: 200, y: 200 }, style }) {
  let { x, y } = initialPosition;
  const transition = useTransition(children, {
    // keys: (item) => item.key,
    keys: children.key,
    from: { transform: `translate(${x}, ${y})`, opacity: 0 },
    enter: { transform: `translate(0,0)`, opacity: 1 },
    leave: { transform: `translate(${x}, ${y})`, opacity: 0, position: 'absolute' },
    // delay: 200,
    reset: false
  });
  return transition((style, item) => item && <animated.div style={style}>
    {item}
  </animated.div> || <></>)
}
AnimateComponent.Dropdown = function AnimatedDropdown({ children, state, triggerComponent, position = "middle", style, ...props }) {
  const [isToggled, setToggle] = useState(false);
  let menuPosition = position === 'middle' && {
    ...props.style,
    left: '50%',
    transform: 'translateX(-50%)',
  } || position === 'left' && {
    ...style,
    left: '0'
  } || {
    ...props.style,
    right: 0
  }
  const menubg = useSpring({
    position: 'relative'
  });
  const { y } = useSpring({
    y: isToggled ? 180 : 0
  });
  const menuAppear = useSpring({
    from: {
      height: 0,
      size: 0,
    },
    to: {
      position: 'absolute',
      size: 'auto',
      height: 'auto',
      transform: isToggled ? "translate3D(0,0,0)" : "translate3D(0,-10px,0)",
      opacity: isToggled ? 1 : 0,
      ...menuPosition,
      ...style,
    }
  });
  return (
    <animated.div
      style={menubg}
      className="radiowrapper"
    >
      <OutsideAlert toggleShowing={() => setToggle(false)}>
        <Text.Line onClick={() => setToggle(o => !o)}>
          <Text.MiddleLine>
            {triggerComponent}
          </Text.MiddleLine>
          <animated.span
            style={{
              transform: y.interpolate((y) => `rotateX(${y}deg)`),
              display: 'inline-block',
              verticalAlign: 'middle'
            }}>
            <Icon>
              <BsCaretDownFill></BsCaretDownFill>
            </Icon>
          </animated.span>
        </Text.Line>

        <animated.div style={menuAppear}>
          {isToggled ? <>
            {children}
          </>
            : null}
        </animated.div>
      </OutsideAlert>
    </animated.div>

  );
}
AnimateComponent.DropdownHover = function AnimatedDropdownHover({ children, state, triggerComponent, position = "middle", style, ...props }) {
  const [isToggled, setToggle] = useState(false);
  const menubg = useSpring({
    // background: isToggled ? "#333" : "transparent",
    position: 'relative'
  });
  const { y } = useSpring({
    y: isToggled ? 180 : 0
  });

  let menuPosition = position === 'middle' && {
    ...props.style,
    left: '50%',
    transform: 'translateX(-50%)',
  } || position === 'left' && {
    ...props.style,
    left: '0'
  } || {
    ...props.style,
    right: 0
  }

  const menuAppear = useSpring({
    position: 'absolute',
    transform: isToggled ? "translate3D(0,0,0)" : "translate3D(0,-120px,0)",
    opacity: isToggled ? 1 : 0,
    ...menuPosition,
    ...style,
  });

  return (
    <>
      <animated.div
        style={menubg}
        className="radiowrapper"
        onMouseEnter={() => setToggle(true)}
        onMouseLeave={() => setToggle(false)}
      >
        <Text.MiddleLine>
          {triggerComponent}
        </Text.MiddleLine>
        <animated.span
          style={{
            transform: y.interpolate((y) => `rotateX(${y}deg)`),
            display: 'inline-block',
            verticalAlign: 'middle'
          }}
        >
          <Icon>
            <BsCaretDownFill></BsCaretDownFill>
          </Icon>
        </animated.span>
        <animated.div style={menuAppear}>
          {isToggled ?
            { children }
            : null}
        </animated.div>
      </animated.div>
    </>
  );
}
AnimateComponent.DropdownClick = function AnimatedDropdownClick({
  children,
  style,
  ...props
}) {
  const arrChild = React.Children.toArray(children);
  const transition = useTransition(arrChild, {
    keys: (item) => item.key,
    from: { maxHeight: 0, overflow: "hidden" },
    enter: (item) => async (next, cancel) => {
      await next({ maxHeight: 800, ...style });
      await next({ overflow: "visible" });
    },
    leave: [{ overflow: "hidden" }, { maxHeight: 0 }],
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
    leave: { transform: `scale(0)`, opacity: 0 },
    delay: 200,
    reset: false
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

AnimateComponent.TextFadeIn = function TextFadeIn({ children, style = { color: '#000' }, duration = 1000, ...props }) {
  const textStyle = useSpring({
    to: { color: style.color, opacity: 1 },
    from: { color: 'transparent', opacity: 0 },
    loop: false,
    config: { duration: duration }
  });
  return <animated.div style={textStyle}>
    {children}
  </animated.div>
}