import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import {
  useAuthorizationContext,
  PostContext,
  WorkspaceContext,
} from "../redux";

export default function Home() {
  const { user } = useAuthorizationContext();
  const location = useLocation();
  if (!user.isLoggedIn) {
    return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
  }
  return (
    <WorkspaceContext>
      <PostContext>
        <Outlet></Outlet>
      </PostContext>
    </WorkspaceContext>
  );
}
