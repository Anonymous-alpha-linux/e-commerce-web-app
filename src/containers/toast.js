import { useRef, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { toastTypes } from "../fixtures";
import styles from "./styles/ToastMessage.module.css";
import { useAuthorizationContext } from "../redux";
import { Text } from "../components";

export default function ToastMessage({
  message,
  error,
  timeout,
  type = toastTypes.WARNING,
  setError,
  setMessage,
}) {
  const toastRef = useRef();
  useEffect(() => {
    toastRef.current.style.width = "0%";
    const timeoutVal = setTimeout(() => {
      setError((o) => "");
      setMessage((o) => "");
    }, timeout + 100);
    return () => {
      clearTimeout(timeoutVal);
    };
  }, []);
  return (
    (
      <div
        className={`${styles.ToastMessage} ${
          styles[error ? toastTypes.ERROR : toastTypes.SUCCESS]
        }`}
      >
        <h5
          style={{
            color: `${error ? "red" : "green"}`,
            textTransform: "uppercase",
          }}
        >
          {error ? "error" : "success"}
        </h5>
        {/* <span>{message}</span> */}
        <div className={styles.Loader}>
          <div
            className={styles.Bar}
            ref={toastRef}
            style={{ "--timeout": `${timeout / 1000}s` }}
          ></div>
        </div>
      </div>
    ),
    document.body
  );
}
