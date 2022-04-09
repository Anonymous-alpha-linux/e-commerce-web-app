import React, { useState, useEffect, useRef } from "react";
import { Loader } from ".";
import { Text } from "../components";

export default function TriggerLoading({
  children,
  loader,
  loadMore = false,
  ...restProps
}) {
  /* restProps:
        1. loader: [Function]:
        + callback
        2. loadMore: [Boolean]
     */
  const [loading, setLoading] = useState(false);
  const loaderRef = useRef(loader);

  useEffect(() => {
    loaderRef.current = loader;
  }, [loader]);

  return (
    <>
      {children}
      {loadMore && (
        <Text.Subtitle
          style={{
            textAlign: "center",
            width: "100%",
            padding: "10px 0",
            cursor: "pointer",
          }}
          onClick={async () => {
            await setLoading(true);
            await loaderRef.current();
            await setLoading(false);
          }}
        >
          {(loading && <Loader></Loader>) || "More..."}
        </Text.Subtitle>
      )}
    </>
  );
}
