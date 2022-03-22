import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { ContainerComponent } from "../components";
import { Toast } from "../containers";
import {
  useAuthorizationContext,
  PostContext,
  WorkspaceContext,
} from "../redux";

export default function Home() {
  const { user, toastList, pushToast, pullToast } = useAuthorizationContext();
  const location = useLocation();
  if (!user.isLoggedIn) {
    return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
  }
  return (
    <WorkspaceContext>
      <PostContext>
        <Outlet></Outlet>
        <ContainerComponent.Flex style={{
          position: 'fixed',
          right: 0,
          bottom: 0,
          padding: '10px'
        }}>
          {toastList.length && toastList.map(toast => <Toast message={toast.message} type={toast.type} timeout={3000} pullItem={pullToast} />)}
        </ContainerComponent.Flex>
      </PostContext>
    </WorkspaceContext>
  );
}
