import React from "react";
import { Button } from "./styles/button";

export default function ButtonComponent({ children, ...restProps }) {
  return (
    <button href={restProps.link} {...restProps}>
      {children}
    </button>
  );
}

ButtonComponent.Toggle = function ({ children, ...props }) {
    return <Button>{children}</Button>
}
ButtonComponent.Submit = function ({ children, ...restProp }) {
<<<<<<< HEAD
  return <a className="button__submit" {...restProp}></a>;
};
ButtonComponent.Upload = function ({ children, ...restProp }) {
  return (
    <a className="button__upload" {...restProp}>
      {children}
    </a>
  );
};
=======
    return (
        <a className="button__submit" {...restProp}>
            {children}
        </a>
    )
}
ButtonComponent.Upload = function ({ children, ...restProp }) {
    return (
        <a className="button__upload" {...restProp}>
            {children}
        </a>
    )
}
>>>>>>> a21e38ce11a718bbe729f8f482ac27b8c4e5e572
