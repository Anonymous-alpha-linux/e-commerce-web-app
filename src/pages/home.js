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
import Loading from "./loading";

export default function Home() {
  const { user, loading: authLoading, toastList, pullToast } = useAuthorizationContext();
  const location = useLocation();

  if (authLoading) return <Loading></Loading>
  if (!user.isLoggedIn) {
    return <Navigate to="/login" state={{ from: location }} replace></Navigate>
  }
  return (
    <WorkspaceContext>
      <PostContext>
        <ContainerComponent.Flex style={{
          position: 'fixed',
          bottom: '0',
          right: '10px',
          zIndex: 100,
          padding: '10px',
          flexDirection: 'column',
          gap: '10px',
          maxHeight: '200px'
        }}>
          {toastList.map((toast, index) => {
            return <Toast key={index + 1} message={toast.message} type={toast.type} timeout={toast.timeout || 3000} pullItem={pullToast} />
          })}
        </ContainerComponent.Flex>
        <Outlet></Outlet>
      </PostContext>
    </WorkspaceContext>
  )
}
