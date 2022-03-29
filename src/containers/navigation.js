import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import { FaTimes } from 'react-icons/fa';
import { AiOutlineMessage, AiFillCaretDown } from "react-icons/ai";
import { IoNotificationsOutline, IoSearchSharp, IoHomeSharp } from "react-icons/io5";
import { BsList, BsCaretDownFill } from "react-icons/bs";
import { GrStackOverflow } from 'react-icons/gr';

import logo from '../assets/Logoidea2.jpg';

import { ButtonComponent, ContainerComponent, Dropdown, Icon, Text } from "../components";
import { navigator as navigators, navData, roles } from '../fixtures';
import { useAuthorizationContext, useNotifyContext, useWorkspaceContext } from "../redux";
import DropdownButton from "./dropDownButton";
import { useModal } from "../hooks";
import Modal from "./modal";

export default function Navigation() {
  const [screenColumn, setScreenColumn] = useState(2);
  const [openNavigator, setOpenNavigator] = useState(false);
  const navigate = useNavigate();
  const { workspaces } = useWorkspaceContext();

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
            <ContainerComponent.MiddleInner style={{ flexDirection: 'row', height: '100%', gap: '1.2rem' }}>
              <ContainerComponent.Item>
                <Link to="/" style={{ color: '#fff' }}>
                  <Text.MiddleLine style={{ marginRight: '5px' }}>
                    <Icon>
                      <IoHomeSharp></IoHomeSharp>
                    </Icon>
                  </Text.MiddleLine>
                  <Text>Home</Text>
                </Link>
              </ContainerComponent.Item>
              <DropdownButton position="middle" style={{ paddingTop: '16px', background: 'rgb(22, 61, 60)', color: '#fff' }} component={<>
                <Text style={{ marginRight: '5px' }}>Workspace</Text>
                <Text.MiddleLine>
                  <Icon>
                    <BsCaretDownFill></BsCaretDownFill>
                  </Icon>
                </Text.MiddleLine>
              </>}>
                <WorkspaceList></WorkspaceList>
              </DropdownButton>

              {navData.map((link, index) => {
                return <ContainerComponent.Item key={index + 1}>
                  {link.path && <Link
                    to={link.path}
                    style={{ color: '#fff' }}>
                    {/* <Text.MiddleLine style={{ marginRight: '5px' }}>
                        <Icon>{link.icon}</Icon>
                      </Text.MiddleLine> */}
                    <Text>
                      {link.name}
                    </Text>
                  </Link> || <>
                      {/* <Text.MiddleLine style={{ marginRight: '5px' }}>
                          <Icon>{link.icon}</Icon>
                        </Text.MiddleLine> */}
                      <Text>
                        {link.name}
                      </Text>
                    </>}
                  {link.subDocs && <DropdownButton component={<></>}></DropdownButton>}
                </ContainerComponent.Item>
              })}
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
  const [openModal, toggleModal] = useModal();
  return (
    <>
      <ContainerComponent.BackDrop
        onClick={closeNavigator}
      ></ContainerComponent.BackDrop>
      <ContainerComponent className="navigator__container" style={{ position: "fixed", bottom: 0, left: 0, zIndex: 10, borderRadius: "20px 20px 0 0", background: "#333", color: "#fff", padding: "10px" }}>
        <ContainerComponent.GridThreeColumns style={{ zIndex: 10 }}>
          {navigators.map((navigate, index) => (navigate.trigger ? <ContainerComponent.Item onClick={() => {
            toggleModal()
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
          </ContainerComponent.Item>
            :
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
        <Modal isShowing={openModal} toggle={toggleModal} style={{ zIndex: 100, padding: '1px 10px 10px 10px', background: '#fff' }}>
          <ContainerComponent.Flex>
            <ContainerComponent.Item onClick={toggleModal}>
              <Icon.CircleIcon>
                <FaTimes></FaTimes>
              </Icon.CircleIcon>
            </ContainerComponent.Item>
            <WorkspaceList></WorkspaceList>
          </ContainerComponent.Flex>
        </Modal>
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
const WorkspaceList = () => {
  const { user, editCurrentWorkspace } = useAuthorizationContext();
  const { workspaces } = useWorkspaceContext();
  function selectHandler(workspaceId) {
    editCurrentWorkspace(workspaceId);
  }
  return <>
    {!!workspaces.length && workspaces.map((item, index) => {
      const disabled = user.workspace === item._id;
      const disabledStyled = () => ({
        background: `${disabled ? '#f2f3f4' : "rgb(22, 61, 60)"}`,
        color: `${disabled ? '#000' : "#fff"}`,
      })
      return <ContainerComponent.Item className="workspaceList__item" key={index + 1} onClick={(e) => {
        e.stopPropagation();
        if (!disabled) {
          selectHandler(item._id);
        }
      }} style={{ width: "100%", padding: "10px", minWidth: "230px", ...disabledStyled() }}>
        <ContainerComponent.Flex style={{ alignItems: "center", justifyContent: "space-between" }}>
          <Text.MiddleLine>
            <Icon style={{ fontSize: "25px" }}>
              <GrStackOverflow></GrStackOverflow>
            </Icon>
          </Text.MiddleLine>

          <Text.MiddleLine>
            <ContainerComponent.Pane>
              <Text.Title style={{ textAlign: "center" }}>
                {item.workTitle}
              </Text.Title>
              <TimespanChild expireTime={item.expireTime}></TimespanChild>
            </ContainerComponent.Pane>
          </Text.MiddleLine>

          <Text.MiddleLine>
            {user.role !== roles.STAFF && <DropdownButton position="left" component={<ContainerComponent.Pane>
              <Icon>
                <AiFillCaretDown></AiFillCaretDown>
              </Icon>
            </ContainerComponent.Pane>}>
              <ToolPanel></ToolPanel>
            </DropdownButton>
            }
          </Text.MiddleLine>
        </ContainerComponent.Flex>
      </ContainerComponent.Item>
    })}
  </>
}
function TimespanChild({ startTime = Date.now(), expireTime }) {
  const startDate = new Date(startTime).getTime();
  const expireDate = new Date(expireTime).getTime();

  var timeleft = expireDate - startDate;
  var days = Math.floor(timeleft / (1000 * 60 * 60 * 24));
  var hours = Math.floor((timeleft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((timeleft % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((timeleft % (1000 * 60)) / 1000);

  const [counterTimer, setCounterTimer] = useState({
    days,
    hours,
    minutes,
    seconds
  });
  const [blockWorkspace, setBlockWorkspace] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      var timeleft = expireDate - now;
      var days = Math.floor(timeleft / (1000 * 60 * 60 * 24));
      var hours = Math.floor((timeleft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      var minutes = Math.floor((timeleft % (1000 * 60 * 60)) / (1000 * 60));
      var seconds = Math.floor((timeleft % (1000 * 60)) / 1000);
      if (days > 0) {
        setCounterTimer({
          days,
          hours,
          minutes,
          seconds
        });
      }
      else {
        setBlockWorkspace(true);
        setCounterTimer({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
        });
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    }
  }, []);


  function convertTo2Digit(number) {
    return number.toLocaleString('en-US', {
      minimumIntegerDigits: 2,
      useGrouping: false
    });
  }
  return (
    <ContainerComponent.Section className="timespan__container">
      <ContainerComponent.Inner style={{ margin: "0 auto", textAlign: "center" }}>
        {counterTimer.days > 0 && <ContainerComponent.Flex
          style={{
            // alignItems: 'center',
            justifyContent: "center",
          }}
        >
          <ContainerComponent.Item
            style={{ fontSize: "13px", padding: "5px 0" }}
          >
            <ButtonComponent style={{ padding: "5px 15px" }}>
              {`${counterTimer.days}`}
            </ButtonComponent>
          </ContainerComponent.Item>

          <ContainerComponent.Item>
            <Text>:</Text>
          </ContainerComponent.Item>

          <ContainerComponent.Item
            style={{ fontSize: "13px", padding: "5px 0" }}
          >
            <ButtonComponent style={{ padding: "5px 10px" }}>{`${convertTo2Digit(counterTimer.hours)}`}</ButtonComponent>
          </ContainerComponent.Item>

          <ContainerComponent.Item>
            <Text>:</Text>
          </ContainerComponent.Item>

          <ContainerComponent.Item
            style={{ fontSize: "13px", padding: "5px 0" }}
          >
            <ButtonComponent style={{ padding: "5px 10px" }}>{`${convertTo2Digit(counterTimer.minutes)}`}</ButtonComponent>
          </ContainerComponent.Item>

          <ContainerComponent.Item>
            <Text>:</Text>
          </ContainerComponent.Item>

          <ContainerComponent.Item
            style={{ fontSize: "13px", padding: "5px 0" }}
          >
            <ButtonComponent style={{ padding: "5px 10px" }}>{`${convertTo2Digit(counterTimer.seconds)}`}</ButtonComponent>
          </ContainerComponent.Item>

        </ContainerComponent.Flex> || <ContainerComponent.Pane>Closed</ContainerComponent.Pane>}
      </ContainerComponent.Inner>
    </ContainerComponent.Section>
  );
}
function ToolPanel() {
  return <ButtonComponent>Add new staff</ButtonComponent>
}
