import { useRef, useEffect } from "react";
import { toastTypes } from "../fixtures";
import styles from "./styles/ToastMessage.module.css";
import { useAuthorizationContext } from "../redux";
export default function ToastMessage({
  message,
  timeout,
  type = toastTypes.WARNING,
}) {
  const ToastRef = useRef();
  const { setError, setMessage } = useAuthorizationContext();
  useEffect(() => {
    ToastRef.current.style.opacity = 1;
    const LoaderBar = ToastRef.current.lastElementChild.children[0];
    LoaderBar.style = `width: 0%; transition: all ${
      timeout / 1000
    }s cubic-bezier(0,0,1,1);
    `;
    const timeoutVal = setTimeout(() => {
      clearTimeout(timeoutVal);
      setError("");
      setMessage("");
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
