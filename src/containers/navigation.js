import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { AiFillCaretDown } from "react-icons/ai";
import { IoNotificationsOutline, IoSearchSharp } from "react-icons/io5";
import { BsList } from "react-icons/bs";
import { GrStackOverflow } from "react-icons/gr";
import { ImSpinner } from "react-icons/im";

import { AnimateComponent, ButtonComponent, ContainerComponent, Form, Icon, Text } from "../components";
import { Modal, DropDownButton, NotificationContainer, Logo, TriggerLoading } from ".";
import { ListMember } from "../pages";

import { useAuthorizationContext, useNotifyContext, useWorkspaceContext } from "../redux";
import { useMedia, useModal, OutsideAlert } from "../hooks";

import { navigator as navigators, navData, media } from '../fixtures';


export default function Navigation() {
  const { user } = useAuthorizationContext();
  const { workspace } = useWorkspaceContext();

  const [screenColumn, setScreenColumn] = useState(2);
  const [openNavigator, setOpenNavigator] = useState(false);
  const [openSearch, setOpenSearch] = useState(false);

  const [openMemberModal, toggleMemberModal] = useModal();
  const navigate = useNavigate();

  const device = useMedia(480, 1050);

  const responsiveHandler = () => {
    const { width } = window.screen;
    if (width <= 768) {
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
              <ContainerComponent.Pane
                onClick={() =>
                  navigate("/", {
                    replace: true,
                  })
                }
              >
                <Logo></Logo>
              </ContainerComponent.Pane>
            </ContainerComponent.Item>

            <ContainerComponent.Item>
              {device !== media.MOBILE ?
                <AnimateComponent.Width>
                  {openSearch && (
                    <OutsideAlert
                      style={{ position: "absolute" }}
                      toggleShowing={() => setOpenSearch((prev) => !prev)}
                    >
                      <Form.Input placeholder="Search post/username/workspace"></Form.Input>
                    </OutsideAlert> || <Icon onClick={() => {
                      setOpenSearch((prev) => !prev);
                    }}>
                      <IoSearchSharp></IoSearchSharp>
                    </Icon>
                  )}
                </AnimateComponent.Width>
                :
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
                  <Icon>
                    <IoSearchSharp></IoSearchSharp>
                  </Icon>
                </Link>}
            </ContainerComponent.Item>
          </ContainerComponent.Flex>
        </ContainerComponent.Item>

        {device === media.PC && (
          <ContainerComponent.Item style={{ color: "#fff" }}>
            <ContainerComponent.MiddleInner
              style={{ flexDirection: "row", height: "100%", gap: "2.5rem" }}
            >
              <ContainerComponent.Item>
                <Link to="/" style={{ display: "flex", justifyContent: "center", alignItems: "center", color: '#fff' }}>
                  <Text style={{ background: "0" }} className="navigation__text">Home</Text>
                </Link>
              </ContainerComponent.Item>

              <AnimateComponent.Dropdown style={{ marginTop: '16px', marginRight: '5px', maxHeight: '320px', overflowY: 'scroll' }} triggerComponent={<Text className="navigation__text">Workspace</Text>}>
                <WorkspaceList toggleMemberModal={toggleMemberModal}></WorkspaceList>
              </AnimateComponent.Dropdown>
              {
                navData.map((link, index) => {
                  return <ContainerComponent.Item key={index + 1}>
                    {link.authorized.includes(user.role) && (
                      (link.path && <Link to={link.path}
                        style={{ color: '#fff' }}>
                        <Text className="navigation__text">
                          {link.name}
                        </Text>
                      </Link>) ||
                      <Text className="navigation__text">
                        {link.name}
                      </Text>) || <></>
                    }
                  </ContainerComponent.Item>
                })
              }

              {workspace.manager === user.accountId && <ContainerComponent.Item>
                <Link to="/workspace_detail">
                  <Text className="navigation__text">
                    My dashboard
                  </Text>
                </Link>
              </ContainerComponent.Item>}
            </ContainerComponent.MiddleInner>

            <Modal isShowing={openMemberModal} toggle={toggleMemberModal}>
              <ListMember workspaceId={user.workspace}></ListMember>
            </Modal>
          </ContainerComponent.Item>
        )
        }
        <ContainerComponent.Item>
          <AuthStatus
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
  const { user } = useAuthorizationContext();
  const [openModal, toggleModal] = useModal();

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
        }}
      >
        <ContainerComponent.GridThreeColumns style={{ zIndex: 10 }}>
          {navigators.map((navigate, index) =>
            navigate.trigger ? (
              <ContainerComponent.Item key={index + 1}
                onClick={() => {
                  toggleModal();
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
              </ContainerComponent.Item>
            ) : navigate.destination ? (
              <ContainerComponent.Item key={index + 1} onClick={closeNavigator}>
                <Link to={navigate.link}
                  // to={`${navigate.link + user.workspace}`}
                  style={{
                    color: "#fff",
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
            ) : (
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
            )
          )}
        </ContainerComponent.GridThreeColumns>
        {/* <Modal
          isShowing={openModal}
          toggle={toggleModal}
          style={{
            zIndex: 100,
            padding: "1px 10px 10px 10px",
            background: "#fff",
          }}
        >
          <ContainerComponent.Flex>
            <ContainerComponent.Item onClick={toggleModal}>
              <Icon.CircleIcon>
                <FaTimes></FaTimes>
              </Icon.CircleIcon>
            </ContainerComponent.Item>
            <WorkspaceList></WorkspaceList>
          </ContainerComponent.Flex>
        </Modal> */}
      </ContainerComponent>
    </>
  );
};
const AuthStatus = React.memo(function AuthStatus({
  openNavigator,
}) {
  const { user, logout } = useAuthorizationContext();
  const device = useMedia(480, 1050);

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
      {/* <ContainerComponent.Item>
        <Icon.CircleIcon>
          <Link to="/portal/message">
            <AiOutlineMessage></AiOutlineMessage>
          </Link>
        </Icon.CircleIcon>
      </ContainerComponent.Item> */}

      <ContainerComponent.Item>
        <Notification></Notification>
      </ContainerComponent.Item>
      <ContainerComponent.Item>
        {
          device !== media.PC &&
          <Icon.CircleIcon onClick={openNavigator}>
            <BsList style={{ fontWeight: "600", fontSize: "20px" }}></BsList>
          </Icon.CircleIcon>
          ||
          <Text.MiddleLine className="navigation__logoutFrame">
            <Link to={"/"}
              style={{
                color: '#fff'
              }} onClick={logout}>
              <ButtonComponent className="navigation__logout">
                Logout
              </ButtonComponent>
            </Link>
          </Text.MiddleLine>
        }
      </ContainerComponent.Item>
    </ContainerComponent.Flex>
  );
});
const WorkspaceList = ({ toggleMemberModal }) => {
  const { user } = useAuthorizationContext();
  const { workspaces, loadMore, loadMoreWorkspaceList } = useWorkspaceContext();
  return (
    <ContainerComponent.Section className="workspaceList__container" style={{ background: '#fff', color: '#000', padding: '2px 5px' }}>
      <TriggerLoading loader={loadMoreWorkspaceList} loadMore={loadMore}>
        {!!workspaces.length &&
          workspaces.map((item, index) => {
            const disabled = user.workspace === item._id;
            const disabledStyled = disabled ? {
              background: "#fff",
              color: "#000",
              cursor: 'unset'
            } : {
              background: "rgb(22, 61, 60)",
              color: "#fff",
              cursor: 'pointer'
            };
            return (
              <ContainerComponent.Item
                className="workspaceList__item"
                key={index + 1}
                style={{
                  width: "100%",
                  padding: "10px",
                  minWidth: "280px",
                  ...disabledStyled,
                }}
              >
                <WorkspaceItem
                  item={item}
                  toggleMemberModal={toggleMemberModal}
                ></WorkspaceItem>
              </ContainerComponent.Item>
            );
          })}
      </TriggerLoading>
    </ContainerComponent.Section>

  );
};
function WorkspaceItem({ item, toggleMemberModal }) {
  const { user, editCurrentWorkspace } = useAuthorizationContext();

  const [loading, setLoading] = useState(false);
  const [openButtonGroup, setButtonGroup] = useState(false);
  const ref = useRef(null);

  const navigate = useNavigate();
  const location = useLocation();
  const disabled = user.workspace === item._id;

  useEffect(() => {
    if (openButtonGroup && ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [ref.current, openButtonGroup]);

  function selectHandler(workspaceId) {
    setLoading(true);
    editCurrentWorkspace(workspaceId, async () => {
      await setLoading(false);
      navigate(location.pathname);
    });
  }
  if (loading) return <Text.CenterLine style={{ height: '50px', fontSize: '40px' }}>
    <Icon.Spinner>
      <ImSpinner></ImSpinner>
    </Icon.Spinner>
  </Text.CenterLine>
  return <OutsideAlert toggleShowing={() => setButtonGroup(false)}>
    <ContainerComponent.Flex onClick={(e) => {
      e.stopPropagation();
      if (!disabled) {
        selectHandler(item._id);
      }
    }
    } style={{ alignItems: "center", justifyContent: "space-between", textAlign: 'center' }}>
      <Text.MiddleLine className="workspace-item__icon">
        <Icon style={{ fontSize: "25px" }}>
          <GrStackOverflow></GrStackOverflow>
        </Icon>
      </Text.MiddleLine>

      <Text.MiddleLine className="workspace-item__timespan">
        <ContainerComponent.Pane>
          <Text.Title style={{ textAlign: "center", textTransform: 'capitalize' }}>
            {item.workTitle}
          </Text.Title>
          <TimespanChild expireTime={item.expireTime}></TimespanChild>
        </ContainerComponent.Pane>
      </Text.MiddleLine>

      <Text.MiddleLine className="workspace-item__dropdownIcon">
        {user.accountId === item.manager &&
          <>
            <ContainerComponent.Pane>
              <Icon onClick={() => setButtonGroup(o => !o)}>
                <AiFillCaretDown></AiFillCaretDown>
              </Icon>
            </ContainerComponent.Pane>
          </>
        }
      </Text.MiddleLine>
    </ContainerComponent.Flex>
    {openButtonGroup &&
      <ContainerComponent.Flex forwardRef={ref} style={{ flexDirection: 'column', scrollsSnapAlign: 'start' }}>
        <ContainerComponent.Item style={{ cursor: 'pointer' }}>
          <ButtonComponent style={{ textOverflow: 'clip', whiteSpace: 'nowrap' }}
            onClick={() => {
              toggleMemberModal();
            }}>
            Add member
          </ButtonComponent>
        </ContainerComponent.Item>
        <ContainerComponent.Item style={{ cursor: 'pointer' }}>
          <ButtonComponent style={{ textOverflow: 'clip', whiteSpace: 'nowrap', background: '' }}
            onClick={() => {
              navigate('/workspace_detail');
            }}>
            Workspace report
          </ButtonComponent>
        </ContainerComponent.Item>
      </ContainerComponent.Flex>}
  </OutsideAlert>
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
    seconds,
  });
  const [loading, setLoading] = useState(false);
  const [blockWorkspace, setBlockWorkspace] = useState(false);

  useEffect(() => {
    setLoading(true);
    const interval = setInterval(() => {
      const now = new Date().getTime();
      var timeleft = expireDate - now;
      var days = Math.floor(timeleft / (1000 * 60 * 60 * 24));
      var hours = Math.floor(
        (timeleft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      var minutes = Math.floor((timeleft % (1000 * 60 * 60)) / (1000 * 60));
      var seconds = Math.floor((timeleft % (1000 * 60)) / 1000);
      if (days > 0 || hours > 0 || minutes > 0 || seconds > 0) {
        setBlockWorkspace(false);
        setCounterTimer({
          days,
          hours,
          minutes,
          seconds,
        });
      } else {
        setBlockWorkspace(true);
        setCounterTimer({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
        });
      }
      setLoading(false);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  function convertTo2Digit(number) {
    return number.toLocaleString("en-US", {
      minimumIntegerDigits: 2,
      useGrouping: false,
    });
  }
  return (
    <ContainerComponent.Section className="timespan__container">
      <ContainerComponent.Inner
        style={{ margin: "0 auto", textAlign: "center" }}
      >
        {(loading && <Text.MiddleLine>
          <Icon.Spinner>
            <ImSpinner></ImSpinner>
          </Icon.Spinner>
        </Text.MiddleLine>)
          ||
          (!blockWorkspace && (
            <ContainerComponent.Flex
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
                <ButtonComponent
                  style={{ padding: "5px 10px" }}
                >{`${convertTo2Digit(counterTimer.hours)}`}</ButtonComponent>
              </ContainerComponent.Item>

              <ContainerComponent.Item>
                <Text>:</Text>
              </ContainerComponent.Item>

              <ContainerComponent.Item
                style={{ fontSize: "13px", padding: "5px 0" }}
              >
                <ButtonComponent
                  style={{ padding: "5px 10px" }}
                >{`${convertTo2Digit(counterTimer.minutes)}`}</ButtonComponent>
              </ContainerComponent.Item>

              <ContainerComponent.Item>
                <Text>:</Text>
              </ContainerComponent.Item>

              <ContainerComponent.Item
                style={{ fontSize: "13px", padding: "5px 0" }}
              >
                <ButtonComponent
                  style={{ padding: "5px 10px" }}
                >{`${convertTo2Digit(counterTimer.seconds)}`}</ButtonComponent>
              </ContainerComponent.Item>
            </ContainerComponent.Flex>
          ))
          ||
          <ContainerComponent.Pane style={{ color: "red", fontWeight: 500, fontSize: "0.8em" }}
          >Closed</ContainerComponent.Pane>}
      </ContainerComponent.Inner>
    </ContainerComponent.Section>
  );
}
function Notification() {
  const { notify } = useNotifyContext();
  const device = useMedia(480, 1080);
  const [isNew, setIsNew] = useState(false);

  useEffect(() => {
    if (notify.newNodes.length > 0) {
      setIsNew(true);
    }
  }, [notify.newNodes.length]);

  function turnOffBadge(e) {
    setIsNew(false);
  }

  return (
    <>
      {(device === media.MOBILE && (
        <Icon.CircleIcon className="" onClick={turnOffBadge}>
          <Link to="/portal/notification">
            <IoNotificationsOutline></IoNotificationsOutline>
          </Link>
        </Icon.CircleIcon>
      )) || (
          <AnimateComponent.Dropdown
            position="right"
            triggerComponent={
              <Icon.CircleIcon onClick={turnOffBadge}>
                <IoNotificationsOutline></IoNotificationsOutline>
              </Icon.CircleIcon>
            }
            hideArrow={true}
            style={{
              minWidth: "420px",
              maxHeight: "567px",
              overflowY: "scroll",
              marginTop: "10px",
            }}
          >
            <NotificationContainer></NotificationContainer>
          </AnimateComponent.Dropdown>
        )}
      {isNew && <Icon.Badge></Icon.Badge>}
    </>
  );
}
