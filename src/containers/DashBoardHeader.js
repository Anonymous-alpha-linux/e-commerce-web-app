import React, { useEffect, useRef, useState } from "react";
import { VscThreeBars } from "react-icons/vsc";
import {
  AnimateComponent,
  ContainerComponent,
  Icon,
  LogoIcon,
  Text,
} from "../components";
import { useAuthorizationContext, useWorkspaceContext } from "../redux";
import Sidebar from "./sidebar";

function DashBoardHeader({ children }) {
  const { workspace } = useWorkspaceContext();
  const { user } = useAuthorizationContext();

  const [openSideBar, setOpenSidebar] = useState(false);

  const sideBarRef = useState(null);

  useEffect(() => {
    console.log(sideBarRef.current);
    document.querySelector('.sidebar__content').style.marginLeft = sideBarRef.current?.clientWidth + 'px';
  }, [sideBarRef.current?.clientWidth]);
  return (
    <ContainerComponent className="manager_root">
      <ContainerComponent
        className="manager__header"
        style={{
          padding: "10px 25px",
          position: "sticky",
          top: 0,
          left: 0,
          zIndex: 10,
        }}
      >
        <ContainerComponent.Flex
          style={{ justifyContent: "space-between", alignItems: "center" }}
        >
          <ContainerComponent.Item>
            <Icon
              onClick={() => setOpenSidebar((e) => !e)}
              style={{ cursor: "pointer" }}
            >
              <VscThreeBars style={{ fontSize: "25px" }}></VscThreeBars>
            </Icon>
          </ContainerComponent.Item>

          <ContainerComponent.Item>
            <Text.Title>Welcome to {workspace.workTitle}</Text.Title>
            <Text.Subtitle style={{ textAlign: "center" }}>
              Hello {user.account}
            </Text.Subtitle>
          </ContainerComponent.Item>

          <ContainerComponent.Item>
            {/* <ContainerComponent.Pane style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", width: "60px", height: "60px", background: "black", borderRadius: "50%" }}>
                            <Text.Title style={{ color: "white" }}>Idea</Text.Title>
                            <Text.Title style={{ background: "#f79817", width: "35px", textAlign: "center", borderRadius: "20px" }}>Hub</Text.Title>
                        </ContainerComponent.Pane> */}
            <LogoIcon></LogoIcon>
          </ContainerComponent.Item>
        </ContainerComponent.Flex>
      </ContainerComponent>
      <ContainerComponent className="manager__body">
        <AnimateComponent.SlideRight className="sidebar__root" state={openSideBar}>
          <Sidebar closeSidebar={() => setOpenSidebar(false)} forwardRef={sideBarRef}></Sidebar>
        </AnimateComponent.SlideRight>
        <ContainerComponent.Section className="sidebar__content">
          {children}
        </ContainerComponent.Section>
      </ContainerComponent>
    </ContainerComponent>
  );
}

export default DashBoardHeader;
