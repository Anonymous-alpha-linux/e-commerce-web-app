import React, { useRef, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { toastTypes } from "../fixtures";
import styles from "./styles/ToastMessage.module.css";
import { useAuthorizationContext } from "../redux";
import { Text } from "../components";
import { useModal } from "../hooks";

const ToastMessage = React.forwardRef(
  (
    { message, timeout, type = toastTypes.WARNING, pullItem, ...props },
    ref
  ) => {
    const toastRef = useRef();
    const [isExpired, setExpired] = useState(false);
    useEffect(() => {
      toastRef.current.style.width = "0%";
      const timeoutVal = setTimeout(() => {
        setExpired(true);
        pullItem(message);
      }, timeout + 100);
      return () => {
        clearTimeout(timeoutVal);
      };
    }, []);

    return !isExpired ? (
      <div
        ref={ref}
        className={`${styles.ToastMessage} ${styles[type]}`}
        {...props}
      >
        <h5
          style={{
            color: `${type === toastTypes.ERROR ? "red" : "green"}`,
            textTransform: "uppercase",
            margin: 0,
          }}
        >
          {type}
        </h5>
        <span>{message}</span>
        <div className={styles.Loader}>
          <div
            className={styles.Bar}
            ref={toastRef}
            style={{ "--timeout": `${timeout / 1000}s` }}
          ></div>
        </div>
      </div>
    ) : null;
  }
);

export default ToastMessage;
