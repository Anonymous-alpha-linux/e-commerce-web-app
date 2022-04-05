import React, { useEffect, useRef, useState } from "react";
import { VscThreeBars } from "react-icons/vsc";
import {Logo} from '../containers'
import {
  AnimateComponent,
  ContainerComponent,
  Icon,
  Text,
} from "../components";
import { useMedia, useModal } from "../hooks";
import { useAuthorizationContext, useWorkspaceContext } from "../redux";
import Sidebar from "./sidebar";
import { media } from '../fixtures';

function DashBoardHeader({ children }) {
  const { workspace } = useWorkspaceContext();
  const { user } = useAuthorizationContext();

  // const [openSideBar, setOpenSidebar] = useState(false);
  const [openSideBar, toggleSidebar] = useModal();
  const sideBarRef = useState(null);
  const device = useMedia(500, 1080);

  return (
    <ContainerComponent className="manager_root">
      <ContainerComponent className="manager__header" style={{ padding: "10px 25px", position: "sticky", top: 0, left: 0, zIndex: 10, background:'#163D3C',color:'white'}}>
        <ContainerComponent.Flex style={{ justifyContent: "space-between", alignItems: "center" }}>
          <ContainerComponent.Item>
            <Icon
              onClick={() => toggleSidebar()}
              style={{ cursor: "pointer" }}
            >
              <VscThreeBars style={{ fontSize: "25px" }}></VscThreeBars>
            </Icon>
          </ContainerComponent.Item>
          {device !== media.MOBILE &&
            <ContainerComponent.Item>
              <Text.Title>Welcome to {workspace.workTitle}</Text.Title>
              <Text.Subtitle style={{ textAlign: "center" }}>
                Hello, {user.role.toUpperCase()}-{user.account}
              </Text.Subtitle>
            </ContainerComponent.Item>
          }
          <ContainerComponent.Item>
            <Logo></Logo>
          </ContainerComponent.Item>

        </ContainerComponent.Flex>
      </ContainerComponent>
      <ContainerComponent className="manager__body" style={{ background: '#A9C39E'}}>
        <AnimateComponent.SlideRight className="sidebar__root" state={openSideBar}>
          <Sidebar closeSidebar={() => toggleSidebar()}></Sidebar>
        </AnimateComponent.SlideRight>
        <ContainerComponent.Section className="sidebar__content">
          {children}
        </ContainerComponent.Section>
      </ContainerComponent>
    </ContainerComponent>
  );
}

export default DashBoardHeader;
