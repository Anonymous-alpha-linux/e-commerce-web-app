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
AnimateComponent.Dropdown = function AnimatedDropdown({ children, state, triggerComponent, position = "middle", style, ...props }) {
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
        onClick={() => setToggle(!isToggled)}
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
            <OutsideAlert toggleShowing={() => setToggle(o => !o)}>
              {children}
            </OutsideAlert>
            : null}
        </animated.div>
      </animated.div>
    </>
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