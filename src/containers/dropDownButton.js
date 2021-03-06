import React, { useEffect, useRef, useState } from "react";
import { Dropdown, AnimateComponent } from "../components";
import DropDown from "../components/dropdown";
import { OutsideAlert, useModal } from "../hooks";

export default function DropdownButton({
  children,
  component,
  height,
  position = "middle",
  ...props
}) {
  const [openContent, toggleContent] = useModal();
  // const [openContent, setOpenContent] = useState(false);
  const contentRef = useRef(null);

  return (
    <Dropdown
    // onMouseLeave={() => setOpenContent(false)}
    >
      <DropDown.DropBtn onClick={toggleContent}>{component}</DropDown.DropBtn>
      {openContent && (
        <OutsideAlert toggleShowing={toggleContent}>
          <DropDown.Content
            forwardref={contentRef}
            style={
              (position === "middle" && {
                ...props.style,
                left: "50%",
                transform: "translateX(-50%)",
              }) ||
              (position === "left" && {
                ...props.style,
                left: "0",
              }) || {
                ...props.style,
                right: 0,
              }
            }
          >
            <AnimateComponent.DropdownClick>
              {React.Children.toArray(children).map((item, index) => {
                return (
                  <DropDown.Item
                    key={index + 1}
                    value={item.value}
                    style={{ cursor: "pointer" }}
                  >
                    {item}
                  </DropDown.Item>
                );
              })}
            </AnimateComponent.DropdownClick>
          </DropDown.Content>
        </OutsideAlert>
      )}
    </Dropdown>
  );
}
