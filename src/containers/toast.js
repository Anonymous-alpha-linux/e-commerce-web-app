import { useRef, useEffect } from "react";
import { toastTypes } from "../fixtures";
import styles from "./styles/ToastMessage.module.css";
import { useAuthorizationContext } from "../redux";

export default function ToastMessage({
  message,
  timeout,
  type = toastTypes.WARNING,
}) {
  const { setError, setMessage } = useAuthorizationContext();
  const toastRef = useRef();
  useEffect(() => {
    // ToastRef.current.style.opacity = 1;
    // const LoaderBar = ToastRef.current.lastElementChild.children[0];
    toastRef.current.style.width = "0%";
    const timeoutVal = setTimeout(() => {
      setError("");
      setMessage("");
    }, timeout + 100);
    return () => {
      clearTimeout(timeoutVal);
    };
  }, []);
  return (
    <div className={`${styles.ToastMessage} ${styles[type]}`}>
      <span>{message}</span>
      <div className={styles.Loader}>
        <div
          className={styles.Bar}
          ref={toastRef}
          style={{ "--timeout": `${timeout / 1000}s` }}
        ></div>
      </div>
    </div>
  );
}
