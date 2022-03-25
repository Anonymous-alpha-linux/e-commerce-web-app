import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { ContainerComponent } from "../components";
import { Toast } from "../containers";
import { toastTypes } from '../fixtures';
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
        {!!toastList.length && <ContainerComponent.Flex style={{
          position: 'fixed',
          bottom: '0',
          right: '10px',
          zIndex: 100,
          padding: '10px',
          flexDirection: 'column',
          gap: '10px'
        }}>
          {toastList.map((toast, index) => {
            return <Toast key={index + 1} message={toast.message} type={toast.type} timeout={3000} pullItem={pullToast} />
          })}
        </ContainerComponent.Flex>}
        <Outlet></Outlet>
      </PostContext>
    </WorkspaceContext>
  );
}
