import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import { AiOutlineMessage } from "react-icons/ai";
import { IoNotificationsOutline, IoSearchSharp } from "react-icons/io5";
import { BsList } from "react-icons/bs";

import logo from "../assets/Logoidea2.jpg";

import {
  AnimateComponent,
  ButtonComponent,
  ContainerComponent,
  Icon,
  Text,
  Dropdown,
} from "../components";
import { NotificationContainer } from "../containers";
import { navigator as navigators, navData, QAManagerOps } from "../fixtures";
import { useAuthorizationContext } from "../redux";

export default function Navigation() {
  const [screenColumn, setScreenColumn] = useState(2);
  const [openNavigator, setOpenNavigator] = useState(false);
  const [dropdown, setDropdown] = useState(false);
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
    <ContainerComponent
      className="navigation__container"
      style={{
        background: "#163d3c",
        position: "sticky",
        top: 0,
        left: 0,
        zIndex: 100,
      }}
    >
      <ContainerComponent.Flex
        className="navigation__grid"
        columns={screenColumn}
      >
        <ContainerComponent.Item>
          <ContainerComponent.Flex
            style={{
              alignItems: "center",
            }}
          >
            <ContainerComponent.Item>
              <Icon.CircleIcon
                onClick={() =>
                  navigate("/", {
                    replace: true,
                  })
                }
              >
                {/* <IoLogoApple></IoLogoApple> */}
                <Icon.Image src={logo} alt={"logo"}></Icon.Image>
              </Icon.CircleIcon>
            </ContainerComponent.Item>
            <ContainerComponent.Item>
              <Link
                to="/portal/search"
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
          <ContainerComponent.Item style={{ color: "#fff" }}>
            <ContainerComponent.MiddleInner>
              <ContainerComponent.Flex>
                {navData.map((link, index) => {
                  return (
                    <ContainerComponent.Item key={index + 1}>
                      <Link to={link.path} style={{ color: "#fff" }}>
                        <Text.MiddleLine style={{ marginRight: "5px" }}>
                          <Icon>{link.icon}</Icon>
                        </Text.MiddleLine>
                        <Text>{link.name}</Text>
                      </Link>
                    </ContainerComponent.Item>
                  );
                })}

                <ContainerComponent.Item
                  onClick={() => setDropdown((prev) => !prev)}
                >
                  {"QA Manager feature"}
                  {dropdown && (
                    <Dropdown.Content style={{ top: "30px", left: "0px" }}>
                      {QAManagerOps.map((option) => {
                        return (
                          <Dropdown.Item>
                            <Link to={option.link}>{option.label}</Link>
                          </Dropdown.Item>
                        );
                      })}
                    </Dropdown.Content>
                  )}
                </ContainerComponent.Item>
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
      {openNavigator && (
        <Navigator closeNavigator={() => setOpenNavigator(false)}></Navigator>
      )}
      {/* {openMessage && <MessageContainer></MessageContainer>} */}
    </ContainerComponent>
  );
}

const Navigator = ({ closeNavigator }) => {
  const [dropdown, setDropdown] = useState(false);
  return (
    <ContainerComponent
      className="navigator__container"
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        zIndex: 10000,
        borderRadius: "20px 20px 0 0",
        background: "#333",
        color: "#fff",
        padding: "10px",
      }}
    >
      <ContainerComponent.BackDrop
        onClick={closeNavigator}
      ></ContainerComponent.BackDrop>

      {dropdown && (
        <ContainerComponent.Flex
          style={{
            position: "absolute",
            width: "100%",
            top: "-50px",
            margin: "-10px",
            padding: "5px",
            gap: "5px",
          }}
        >
          {QAManagerOps.map((option) => {
            return (
              <ButtonComponent
                style={{ backgroundColor: "rgb(48, 45, 45)", flex: 1 }}
              >
                <ContainerComponent.MiddleInner>
                  <Link to={option.link} style={{ color: "#fff" }}>
                    {option.label}
                  </Link>
                </ContainerComponent.MiddleInner>
              </ButtonComponent>
            );
          })}
        </ContainerComponent.Flex>
      )}

      <ContainerComponent.GridThreeColumns>
        {navigators.map((navigate, index) => (
          <ContainerComponent.Item key={index + 1} onClick={closeNavigator}>
            <Link
              to={navigate.link}
              style={{
                color: "#fff",
              }}
            >
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

        <ContainerComponent.Item
          onClick={() => {
            setDropdown((prev) => !prev);
          }}
        >
          <ContainerComponent.MiddleInner>
            <Icon.CircleIcon></Icon.CircleIcon>
            <Icon.Label
              style={{
                fontWeight: "bold",
                textTransform: "capitalize",
              }}
            >
              {"QA Manager features"}
            </Icon.Label>
          </ContainerComponent.MiddleInner>
        </ContainerComponent.Item>
      </ContainerComponent.GridThreeColumns>
    </ContainerComponent>
  );
};

const AuthStatus = React.memo(
  ({ screenColumn, openNotify, openNavigator, setOpenNotify, openMessage }) => {
    const { user, logout } = useAuthorizationContext();

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
    }

    return (
      <ContainerComponent.Flex
        style={{
          justifyContent: "flex-end",
          flexWrap: "nowrap",
        }}
      >
        <ContainerComponent.Item>
          <Icon.CircleIcon>
            <Link to="/portal/message">
              <AiOutlineMessage></AiOutlineMessage>
            </Link>
          </Icon.CircleIcon>
        </ContainerComponent.Item>
        <ContainerComponent.Item>
          <Icon.CircleIcon>
            <Link to="/portal/notification">
              <IoNotificationsOutline></IoNotificationsOutline>
            </Link>
          </Icon.CircleIcon>
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
          {(screenColumn < 3 && (
            <Icon.CircleIcon onClick={openNavigator}>
              <BsList></BsList>
            </Icon.CircleIcon>
          )) || (
            <Text.MiddleLine style={{ verticalAlign: "text-bottom" }}>
              <Link
                to={"/"}
                style={{
                  color: "#fff",
                }}
                onClick={logout}
              >
                <ButtonComponent>Logout</ButtonComponent>
              </Link>
            </Text.MiddleLine>
          )}
        </ContainerComponent.Item>
      </ContainerComponent.Flex>
    );
  }
);
