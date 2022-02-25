import React from "react";
import { Button } from "./styles/button";

export default function ButtonComponent({ children, ...restProps }) {
  return <a className="button" {...restProps}>{children}</a>;
}

ButtonComponent.Toggle = React.forwardRef(function ({ children, ...props }, ref) {
  
  return <label className="switch">
    <input type="checkbox"
      className="switch__input"
      name={props.name}
      id={props.id}
      onClick={props.onClick}
      ref={ref} />
    <span className="switch__slider round">
      <span className="switch__slider--on">{props.onText}</span>
      <span className="switch__slider--off">{props.offText}</span>
    </span>
  </label>
});
ButtonComponent.Submit = function ({ children, ...restProp }) {
  return (
    <a className="button__submit" {...restProp}>
      {children}
    </a>
  );
};
ButtonComponent.Upload = function ({ children, ...restProp }) {
  return (
    <a className="button__upload" {...restProp}>
      {children}
    </a>
  );
};
