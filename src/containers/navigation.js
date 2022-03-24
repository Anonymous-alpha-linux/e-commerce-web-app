import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import { AiOutlineMessage } from "react-icons/ai";
import { IoNotificationsOutline, IoSearchSharp } from "react-icons/io5";
import { BsList } from "react-icons/bs";

import logo from '../assets/Logoidea2.jpg';

import { AnimateComponent, ButtonComponent, ContainerComponent, Icon, Text } from "../components";
import { navigator as navigators, navData } from '../fixtures';
import { useAuthorizationContext, useNotifyContext } from "../redux";

export default function Navigation() {
  const [screenColumn, setScreenColumn] = useState(2);
  const [openNavigator, setOpenNavigator] = useState(false);
  const navigate = useNavigate();

  const responsiveHandler = () => {
    const { width } = window.screen;
    if (width <= 650) {
      setScreenColumn(2);
    } else {
      setScreenColumn(3);
    }
  };

  useEffect(() => {
    responsiveHandler();
    window.addEventListener("resize", () => {
      responsiveHandler();
    });
    return () => {
      window.removeEventListener("resize", responsiveHandler);
    };
  }, [window.screen.width]);

  return (
    <ContainerComponent className="navigation__container" style={{ background: "#163d3c", position: "sticky", top: 0, left: 0, zIndex: 100, }}>
      <ContainerComponent.Flex className="navigation__grid" columns={screenColumn}>
        <ContainerComponent.Item>
          <ContainerComponent.Flex
            style={{
              alignItems: "center",
            }}
          >
            <ContainerComponent.Item>
              <Icon.CircleIcon onClick={() => navigate('/', {
                replace: true
              })}>
                {/* <IoLogoApple></IoLogoApple> */}
                <Icon.Image src={logo} alt={'logo'}></Icon.Image>
              </Icon.CircleIcon>
            </ContainerComponent.Item>
            <ContainerComponent.Item>
              <Link to="/portal/search"
                style={{
                  paddingLeft: "0",
                  color: "#fff",
                  display: "inline-block",
                  verticalAlign: "middle",
                  lineHeight: "100%",
                  margin: 0,
                }}
              >
                <IoSearchSharp></IoSearchSharp>
              </Link>
            </ContainerComponent.Item>
          </ContainerComponent.Flex>
        </ContainerComponent.Item>
        {screenColumn > 2 && (
          <ContainerComponent.Item style={{ color: '#fff' }}>
            <ContainerComponent.MiddleInner>
              <ContainerComponent.Flex>
                {navData.map((link, index) => {
                  return <ContainerComponent.Item key={index + 1}>
                    <Link
                      to={link.path}
                      style={{ color: '#fff' }}>
                      <Text.MiddleLine style={{ marginRight: '5px' }}>
                        <Icon>{link.icon}</Icon>
                      </Text.MiddleLine>
                      <Text>
                        {link.name}
                      </Text>
                    </Link>
                  </ContainerComponent.Item>
                })}
              </ContainerComponent.Flex>
            </ContainerComponent.MiddleInner>
          </ContainerComponent.Item>
        )}
        <ContainerComponent.Item>
          <AuthStatus
            screenColumn={screenColumn}
            openNavigator={() => setOpenNavigator(true)}
          ></AuthStatus>
        </ContainerComponent.Item>
      </ContainerComponent.Flex>
      {
        openNavigator && (
          <Navigator closeNavigator={() => setOpenNavigator(false)}></Navigator>
        )
      }
    </ContainerComponent>
  );
}

const Navigator = ({ closeNavigator }) => {
  return (
    <>
      <ContainerComponent.BackDrop
        onClick={closeNavigator}
      ></ContainerComponent.BackDrop>
      <ContainerComponent
        className="navigator__container"
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          zIndex: 10,
          borderRadius: "20px 20px 0 0",
          background: "#333",
          color: "#fff",
          padding: "10px",
        }}>
        <ContainerComponent.GridThreeColumns style={{ zIndex: 10 }}>
          {navigators.map((navigate, index) => (
            <ContainerComponent.Item key={index + 1} onClick={closeNavigator}>
              <Link to={navigate.link} style={{
                color: '#fff'
              }}>
                <ContainerComponent.MiddleInner>
                  <Icon.CircleIcon>{navigate.icon}</Icon.CircleIcon>
                  <Icon.Label
                    style={{
                      fontWeight: "bold",
                      textTransform: "capitalize",
                    }}
                  >
                    {navigate.label}
                  </Icon.Label>
                </ContainerComponent.MiddleInner>
              </Link>
            </ContainerComponent.Item>
          ))}
        </ContainerComponent.GridThreeColumns>
      </ContainerComponent>
    </>
  );
};

const AuthStatus = React.memo(function AuthStatus({
  screenColumn,
  openNavigator,
}) {
  const { user, logout } = useAuthorizationContext();
  const { notify } = useNotifyContext();
  const [isNew, setIsNew] = useState(false);

  useEffect(() => {
    if (notify.newNodes.length > 0) {
      setIsNew(true);
    }
  }, [notify.newNodes.length]);

  function turnOffBadge(e) {
    setIsNew(false);
  }

  if (!user.isLoggedIn) {
    return (
      <div
        style={{
          textAlign: "right",
        }}
      >
        <Link to={"/login"} onClick={logout}>
          Login
        </Link>
      </div>
    );
  };

  return (
    <ContainerComponent.Flex
      style={{
        justifyContent: "flex-end",
        flexWrap: "nowrap",
      }}
    >
      {/* <ContainerComponent.Item>
        <Icon.CircleIcon>
          <Link to="/portal/message">
            <AiOutlineMessage></AiOutlineMessage>
          </Link>
        </Icon.CircleIcon>
      </ContainerComponent.Item> */}
      <ContainerComponent.Item>
        <Icon.CircleIcon onClick={turnOffBadge}>
          <Link to="/portal/notification">
            <IoNotificationsOutline></IoNotificationsOutline>
          </Link>
        </Icon.CircleIcon>
        {isNew && <Icon.Badge></Icon.Badge>}
        {/* {screenColumn < 3 &&
                    ||
                    <AnimateComponent
                        className="fixed__container"
                        run={openNotify}
                        component={
                            <Icon.CircleIcon>
                                <IoNotificationsOutline></IoNotificationsOutline>
                            </Icon.CircleIcon>}
                        classNames={"dropdown"}
                        unmountOnExit={true}
                        timeout={300}>
                        <NotificationContainer></NotificationContainer>
                    </AnimateComponent>
                } */}
      </ContainerComponent.Item>
      <ContainerComponent.Item>
        {screenColumn < 3 &&
          <Icon.CircleIcon onClick={openNavigator}>
            <BsList></BsList>
          </Icon.CircleIcon>
          ||
          <Text.MiddleLine style={{ verticalAlign: 'text-bottom' }}>
            <Link to={"/"} style={{
              color: '#fff'
            }} onClick={logout}>
              <ButtonComponent >
                Logout
              </ButtonComponent>
            </Link>
          </Text.MiddleLine>
        }
      </ContainerComponent.Item>
    </ContainerComponent.Flex>
  );
});
