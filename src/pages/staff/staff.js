import React from "react";
import {
  AddGroupContainer,
  MessageBoxContainer,
  Toast,
} from "../../containers";

import { Outlet } from "react-router-dom";
export default function Staff() {
  return (
    <>
      <Outlet></Outlet>
    </>
  );
}
