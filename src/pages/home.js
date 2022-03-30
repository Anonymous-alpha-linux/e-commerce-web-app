import React from "react";
import { Outlet, useLocation } from "react-router-dom";

import {
  useAuthorizationContext,
  PostContext,
  WorkspaceContext,
  NotifyContext,
} from "../redux";
import Loading from "./loading";

export default function Home() {
  const { loading: authLoading } = useAuthorizationContext();
  if (authLoading) return <Loading></Loading>
  return (
    <NotifyContext>
      <WorkspaceContext>
        <PostContext>
          <Outlet></Outlet>
        </PostContext>
      </WorkspaceContext>
    </NotifyContext>
  )
}
