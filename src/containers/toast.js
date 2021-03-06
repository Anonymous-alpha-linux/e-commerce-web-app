import React, { useRef, useEffect, useState } from "react";


import { toastTypes } from "../fixtures";
import { AnimateComponent } from "../components";

import styles from "./styles/ToastMessage.module.css";

const ToastMessage = React.memo(({
  message,
  timeout,
  type = toastTypes.WARNING,
  pullItem,
  ...props
}) => {
  const toastRef = useRef();
  const [isExpired, setExpired] = useState(false);

  useEffect(() => {
    toastRef.current.style.width = "0%";
    const timeoutVal = setTimeout(() => {
      setExpired(true);
      pullItem();
    }, timeout);
    return () => {
      clearTimeout(timeoutVal);
    };
  }, []);

  return !isExpired ? (
    <AnimateComponent.FadeInRight initialPosition={{ x: '1000px', y: 0 }}>
      <div {...props} className={`${styles.ToastMessage} ${styles[type]}`}>
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
    </AnimateComponent.FadeInRight>
  ) : null;
});


export default ToastMessage;
