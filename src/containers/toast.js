import { useRef, useEffect } from "react";
import { toastTypes } from "../fixtures";
import styles from "./styles/ToastMessage.module.css";

export default function ToastMessage({
  message,
  timeout,
  type = toastTypes.SUCCESS,
}) {
  const ToastRef = useRef();
  useEffect(() => {
    ToastRef.current.style.opacity = 1;
    const LoaderBar = ToastRef.current.lastElementChild.children[0];
    LoaderBar.style.transition = `all ${
      timeout / 1000
    }s cubic-bezier(0,0,1,1) `;
    LoaderBar.style.width = "0%";
    const timeoutVal = setTimeout(() => {
      clearTimeout(timeoutVal);
      ToastRef.current.parentElement.removeChild(ToastRef.current);
    }, timeout + 100);
  }, []);
  return (
    <div
      className={`${styles.ToastMessage} ${styles[type]}`}
      ref={(node) => {
        if (node) ToastRef.current = node;
      }}
    >
      <span>{message}</span>
      <div className={styles.Loader}>
        <div className={styles.Bar}></div>
      </div>
    </div>
  );
}
