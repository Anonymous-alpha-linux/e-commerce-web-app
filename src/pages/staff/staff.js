import React from "react";
import {
  AddGroupContainer,
  MessageBoxContainer,
  Toast,
} from "../../containers";
import { toastTypes } from "../../fixtures";
import { Outlet } from "react-router-dom";
export default function Staff() {
  return (
    <>
      <Outlet></Outlet>
      <Toast message="Success" timeout={3000} />
    </>
  );
}
