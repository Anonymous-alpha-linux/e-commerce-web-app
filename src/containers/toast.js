import { useRef, useEffect, useState } from "react";
import ReactDOM from 'react-dom';
import { toastTypes } from "../fixtures";
import styles from "./styles/ToastMessage.module.css";
import { useAuthorizationContext } from "../redux";
import { Text } from "../components";

export default function ToastMessage({ message, timeout, pullItem, type = toastTypes.WARNING }) {
  const toastRef = useRef();
  useEffect(() => {
    toastRef.current.style.width = "0%";
    const timeoutVal = setTimeout(() => {
      pullItem();
    }, timeout + 100);
    return () => {
      clearTimeout(timeoutVal);
    };
  }, []);
  return ReactDOM.createPortal(
    <div className={`${styles.ToastMessage} ${styles[type]}`}>
      <Text.MiddleLine>
        <h3>{type.toUpperCase()}</h3>
      </Text.MiddleLine>
      <span>{message}</span>
      <div className={styles.Loader}>
        <div
          className={styles.Bar}
          ref={toastRef}
          style={{ "--timeout": `${timeout / 1000}s` }}
        ></div>
      </div>
    </div>
    , document.body);
}
