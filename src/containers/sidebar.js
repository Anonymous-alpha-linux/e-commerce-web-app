import React, { useState, useEffect } from "react";
import { useSpring, animated } from "react-spring";
import { Link } from "react-router-dom";

import { MdOutlineWork } from "react-icons/md";
import { AiFillCaretDown, AiFillRightCircle } from "react-icons/ai";
import { TiPlus } from "react-icons/ti";
import { GrStackOverflow } from "react-icons/gr";
import { GoSignOut } from "react-icons/go";
import { ImSpinner6 } from "react-icons/im";

import {
  ButtonComponent,
  ContainerComponent,
  Icon,
  Preview,
  Text,
  AnimateComponent,
  Form,
} from "../components";
import { UserAll, ListMember } from "../pages";
import { sidebarData, media, toastTypes } from "../fixtures";
import { useAuthorizationContext, useWorkspaceContext } from "../redux";
import { useModal, useMedia, useValidate } from "../hooks";

import { AddFromWorkspace, TriggerLoading, Modal } from ".";
import { Dropdown } from "../components";

export default function Sidebar({ closeSidebar, forwardRef }) {
  // const [switchToggle, setSwitchToggle] = useState(false);
  // const [modalWS, setModalWS] = useState(false);
  const [modalWS, setModalWS] = useModal(false);
  const [switchToggle, setSwitchToggle] = useModal(false);
  const { workspaces, loadMore, loadMoreWorkspaceList } = useWorkspaceContext();
  const { user } = useAuthorizationContext();

  return (
    <>
      <ContainerComponent.Section
        forwardRef={forwardRef}
      // className="sidebar__root
      >
        <ContainerComponent.Toggle className="sidebar__inner">
          <ContainerComponent.Inner>
            <ContainerComponent.Flex
              style={{
                justifyContent: "center",
                alignItems: "center",
                padding: "5px",
              }}
            >
              <Link to="/profile/personal" onClick={closeSidebar}>
                <Preview.Images
                  image={user.profileImage ||
                    "https://us.123rf.com/450wm/triken/triken1608/triken160800029/61320775-male-avatar-profile-picture-default-user-avatar-guest-avatar-simply-human-head-vector-illustration-i.jpg?ver=6"
                  }
                  style={{
                    width: "70px",
                    height: "70px",
                    borderRadius: "50%",
                  }}
                ></Preview.Images>
              </Link>
            </ContainerComponent.Flex>

            <Text.CenterLine>
              <Link to="/profile/personal" onClick={closeSidebar}>
                <Text> {user.account}</Text>
              </Link>
            </Text.CenterLine>
            {/* sidebar links */}
            <ContainerComponent.Flex>
              {sidebarData.map((item, index) => {
                return (
                  (item.authorized.indexOf(user.role) > -1 && (
                    <ContainerComponent.Item
                      className="sidebar__links"
                      key={index + 1}
                      style={{
                        width: "100%",
                        padding: "20px",
                        position: "relative",
                      }}
                    >
                      <Link to={item.link}>
                        <Text.Line onClick={closeSidebar}>
                          <Text.MiddleLine style={{ width: "20%" }}>
                            <Icon style={{ fontSize: "30px" }}>
                              {item.icon}
                            </Icon>
                          </Text.MiddleLine>
                          <Text.MiddleLine
                            style={{ width: "80%", paddingLeft: "2rem" }}
                          >
                            <Text.Title>{item.title}</Text.Title>
                          </Text.MiddleLine>
                        </Text.Line>
                      </Link>
                    </ContainerComponent.Item>
                  )) || (
                    <ContainerComponent.Item
                      key={index + 1}
                    ></ContainerComponent.Item>
                  )
                );
              })}
              <ContainerComponent.Item
                style={{ width: "100%", padding: "20px", position: "relative" }}
              >
                <Text.Line>
                  <Text.MiddleLine style={{ width: "20%" }}>
                    <Icon style={{ fontSize: "30px" }}>
                      <MdOutlineWork></MdOutlineWork>
                    </Icon>
                  </Text.MiddleLine>
                  <Text.MiddleLine
                    style={{ width: "80%", paddingLeft: "2rem" }}
                  >
                    <Text.Title>Workspace</Text.Title>
                  </Text.MiddleLine>

                  <Text.RightLine>
                    <Icon
                      style={{
                        position: "absolute",
                        right: "5%",
                        fontSize: "25px",
                        top: "50%",
                      }}
                      onClick={setSwitchToggle}
                    >
                      <AnimateComponent.Rotate state={switchToggle} deg={90}>
                        <AiFillRightCircle></AiFillRightCircle>
                      </AnimateComponent.Rotate>
                    </Icon>
                  </Text.RightLine>
                </Text.Line>
              </ContainerComponent.Item>
            </ContainerComponent.Flex>

            {switchToggle && (
              <ContainerComponent.Toggle
                style={{ margin: "0 auto", padding: "0 10px" }}
              >
                <ContainerComponent.Item
                  style={{
                    width: "100%",
                    padding: "10px",
                    // boxShadow: "2px 0 5px #000",
                    position: "relative",
                    cursor: "pointer",
                  }}
                  onClick={() => setModalWS(!modalWS)}
                >
                  <Text.MiddleLine>
                    <Icon
                      style={{
                        fontSize: "33px",
                      }}
                    >
                      <TiPlus></TiPlus>
                    </Icon>
                  </Text.MiddleLine>
                  <Text.MiddleLine
                    style={{
                      width: "calc(100% - 20px)",
                    }}
                  >
                    <Text.Title style={{ textAlign: 'center' }}>Add Workspace</Text.Title>
                  </Text.MiddleLine>
                </ContainerComponent.Item>
                {/* workspaceData */}
                <ContainerComponent.Item
                  style={{ maxHeight: "260px", overflowY: "scroll" }}
                >
                  <TriggerLoading
                    loadMore={loadMore}
                    loader={loadMoreWorkspaceList}
                  >
                    {workspaces && workspaces.map((item, index) => {
                      return <EditToggle
                        item={item}
                        key={index + 1}
                        clickLoader={closeSidebar}
                      ></EditToggle>
                    })}
                  </TriggerLoading>
                </ContainerComponent.Item>
              </ContainerComponent.Toggle>
            )}
          </ContainerComponent.Inner>

          <ContainerComponent.Pane
            className="logout__button sidebar__links"
            style={{ width: "100%", padding: "20px", position: "relative" }}
          >
            <Link to="/logout">
              <Text.Line>
                <Text.MiddleLine style={{ width: "20%" }}>
                  <Icon style={{ fontSize: "30px" }}>
                    <GoSignOut></GoSignOut>
                  </Icon>
                </Text.MiddleLine>
                <Text.MiddleLine style={{ width: "80%", paddingLeft: "2rem" }}>
                  <Text.Title>Logout</Text.Title>
                </Text.MiddleLine>
              </Text.Line>
            </Link>
          </ContainerComponent.Pane>
        </ContainerComponent.Toggle>
      </ContainerComponent.Section>
      <Modal isShowing={modalWS} toggle={setModalWS}>
        <AddFromWorkspace setModal={setModalWS} modal={modalWS} />
      </Modal>
    </>
  );
}
function EditToggle({ item, clickLoader }) {
  const [modal, toggleModal] = useModal();
  const [memberModal, toggleMemberModal] = useModal();
  const [workspaceModal, toggleWorkspaceModal] = useModal();
  const [openDropdown, setDropdown] = useState(false);
  const device = useMedia(480, 1080);

  // const { onLoadWorkspace } = useWorkspaceContext();
  const { editCurrentWorkspace } = useAuthorizationContext();

  return (
    <>
      <ContainerComponent.Item
        id={`workspace-${item._id}`}
        onMouseLeave={() => setDropdown(false)}
        style={{ width: "100%", padding: "10px", minWidth: "230px" }}
      >
        <ContainerComponent.Flex
          style={{ alignItems: "center", justifyContent: "space-between" }}
        >
          <Text.MiddleLine>
            <Icon style={{ fontSize: "25px" }}>
              <GrStackOverflow></GrStackOverflow>
            </Icon>
          </Text.MiddleLine>

          <Text.MiddleLine>
            <ContainerComponent.Pane>
              <Text.Title
                style={{ textAlign: "center", textTransform: "capitalize" }}
              >
                {item.workTitle}
              </Text.Title>
              <TimespanChild expireTime={(new Date(item.expireTime)).toISOString()}></TimespanChild>
            </ContainerComponent.Pane>
          </Text.MiddleLine>
          <AnimateComponent.Rotate state={openDropdown} deg={-180}>
            <Text.MiddleLine onClick={() => setDropdown((prev) => !prev)}>
              <Dropdown>
                <Icon style={{ fontSize: "20px" }}>
                  <AiFillCaretDown></AiFillCaretDown>
                </Icon>
              </Dropdown>
            </Text.MiddleLine>
          </AnimateComponent.Rotate>
        </ContainerComponent.Flex>
        <AnimateComponent.DropdownClick>
          {openDropdown && (
            <ContainerComponent.Flex style={{ flexDirection: "column" }}>
              <ContainerComponent.Item style={{ cursor: 'pointer' }}>
                {(device === media.MOBILE && (
                  <ButtonComponent>
                    <Link
                      to={`/management/workspace/${item._id}`}
                      style={{ color: "#fff" }}
                      onClick={clickLoader}
                    >
                      <Text.Line style={{ textAlign: "center" }}>
                        <Text.NoWrapText>Assign QA Coordinator</Text.NoWrapText>
                      </Text.Line>
                    </Link>
                  </ButtonComponent>
                )) || (
                    <ButtonComponent onClick={toggleModal}>
                      <Text.Line style={{ textAlign: "center" }}>
                        <Text.NoWrapText>Assign QA Coordinator</Text.NoWrapText>
                      </Text.Line>
                    </ButtonComponent>
                  )}
              </ContainerComponent.Item>
              <ContainerComponent.Item style={{ cursor: 'pointer' }}>
                {(device === media.MOBILE && (
                  <ButtonComponent>
                    <Link
                      to={`/management/workspace_member/${item._id}`}
                      style={{ color: "#fff" }}
                      onClick={clickLoader}
                    >
                      <Text.Line style={{ textAlign: "center" }}>
                        <Text.NoWrapText>Add Member</Text.NoWrapText>
                      </Text.Line>
                    </Link>
                  </ButtonComponent>
                )) || (
                    <ButtonComponent onClick={toggleMemberModal}>
                      <Text.Line style={{ textAlign: "center" }}>
                        <Text.NoWrapText>Add Member</Text.NoWrapText>
                      </Text.Line>
                    </ButtonComponent>
                  )}
              </ContainerComponent.Item>
              <ContainerComponent.Item style={{ cursor: 'pointer' }}>
                {(device === media.MOBILE && (
                  <ButtonComponent>
                    <Text.Line style={{ textAlign: "center" }}>
                      <Text.NoWrapText>Edit Time/Title</Text.NoWrapText>
                    </Text.Line>
                  </ButtonComponent>
                )) || (
                    <ButtonComponent onClick={toggleWorkspaceModal}>
                      <Text.Line style={{ textAlign: "center" }}>
                        <Text.NoWrapText>Edit Time/Title</Text.NoWrapText>
                      </Text.Line>
                    </ButtonComponent>
                  )}
              </ContainerComponent.Item>
              <ContainerComponent.Item style={{ cursor: 'pointer' }}>
                <ButtonComponent onClick={() => editCurrentWorkspace(item._id)}>
                  <Link to="/workspace">
                    <Text.Line style={{ textAlign: "center" }}>
                      <Text.NoWrapText>See workspace</Text.NoWrapText>
                    </Text.Line>
                  </Link>
                </ButtonComponent>
              </ContainerComponent.Item>
            </ContainerComponent.Flex>
          )}
        </AnimateComponent.DropdownClick>
      </ContainerComponent.Item>

      <Modal
        style={{
          background: "#fff",
          maxWidth: "420px",
          borderRadius: "10px",
          overflow: "hidden",
        }}
        isShowing={modal}
        toggle={toggleModal}
      >
        <UserAll workspaceId={item._id}></UserAll>
      </Modal>
      <Modal
        style={{
          background: "#fff",
          maxWidth: "420px",
          borderRadius: "10px",
          overflow: "hidden",
        }}
        isShowing={memberModal}
        toggle={toggleMemberModal}
      >
        <ListMember workspaceId={item._id}></ListMember>
      </Modal>
      <Modal
        style={{
          background: "transparent",
          maxWidth: "420px",
          borderRadius: "10px",
          overflow: "hidden",
        }}
        isShowing={workspaceModal}
        toggle={toggleWorkspaceModal}
      >
        <WorkspaceModal
          workspaceId={item._id}
          toggleModal={toggleWorkspaceModal}
          workTitle={item.workTitle}
        ></WorkspaceModal>
      </Modal>
    </>
  );
};
function TimespanChild({ startTime = Date.now(), expireTime }) {
  const startDate = new Date(startTime).getTime();
  const expireDate = new Date(expireTime).getTime();
  const [loading, setLoading] = useState(false);

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
  const [blockWorkspace, setBlockWorkspace] = useState(false);

  useEffect(() => {
    setLoading(true);
    const interval = setInterval(() => {
      const now = new Date().getTime();
      var timeleft = expireDate - now;
      var days = Math.floor(timeleft / (1000 * 60 * 60 * 24));
      var hours = Math.floor((timeleft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
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
  }, [expireTime]);

  function convertTo2Digit(number) {
    return number.toLocaleString("en-US", {
      minimumIntegerDigits: 2,
      useGrouping: false,
    });
  }

  return (
    <ContainerComponent.Section className="timespan__container">
      {(loading && (
        <ContainerComponent.Inner
          style={{ margin: "0 auto", textAlign: "center" }}
        >
          <Text.CenterLine>
            <Icon.Spinner style={{ fontSize: "400px" }}>
              <ImSpinner6></ImSpinner6>
            </Icon.Spinner>
          </Text.CenterLine>
        </ContainerComponent.Inner>
      )) || (
          <ContainerComponent.Inner
            style={{ margin: "0 auto", textAlign: "center" }}
          >
            {(!blockWorkspace && (
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
            )) || (
                <ContainerComponent.Pane
                  style={{ color: "red", fontWeight: 500, fontSize: "0.8em" }}
                >
                  Closed
                </ContainerComponent.Pane>
              )}
          </ContainerComponent.Inner>
        )}
    </ContainerComponent.Section>
  );
}
function WorkspaceModal({ workspaceId, workTitle, toggleModal }) {
  const [workspaceInfo, setWorkspaceInfo] = useState({
    workTitle: workTitle,
    eventTime: Date.now(),
    expireTime: Date.now(),
  });
  const { pushToast } = useAuthorizationContext();
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { editWorkspace } = useWorkspaceContext();

  async function HandleWSInput(e) {
    setWorkspaceInfo({ ...workspaceInfo, [e.target.name]: e.target.value });
  }
  async function onSubmit(e) {
    e.preventDefault();
    setLoading(true);

    validateInput((data) => {
      if (data?.error) {
        setLoading(false);
      }
      else {
        editWorkspace(
          workspaceId,
          workspaceInfo.workTitle,
          workspaceInfo.expireTime,
          workspaceInfo.eventTime,
          () => {
            setLoading(false);
            toggleModal();
          }
        );
      }
    });
  }
  async function validateInput(cb) {
    try {
      await Object.entries(workspaceInfo).forEach((entry) => {
        const key = entry[0];
        const value = entry[1];
        const validate = new useValidate(value);

        if (key === "workTitle") validate.isEmpty();
        else if (key === "eventTime") validate.isEmpty();
        else if (key === "expireTime") validate.isEmpty();
      });
      cb();
    } catch (error) {
      setError(error.message);
      setMessage("");
      cb({ error: error.message });
    }
  };
  return (
    <div className="c-modal__container">
      {(loading && (
        <Text.CenterLine>
          <Icon.Spinner style={{ fontSize: "400px" }}>
            <ImSpinner6></ImSpinner6>
          </Icon.Spinner>
        </Text.CenterLine>
      )) || (
          <form onSubmit={onSubmit}>
            <div className="form-container">
              <div className="question-container">
                <label className="question-label">Workspace Title</label>
                <input className="row-input"
                  type="text"
                  name="workTitle"
                  onChange={HandleWSInput}
                  value={workspaceInfo.workTitle}
                />
              </div>
              <div className="question-container">
                <label className="question-label">
                  Close Event(comment, etc.)
                </label>
                <input
                  className="row-input"
                  type="date"
                  name="eventTime"
                  onChange={HandleWSInput}
                // value={workspaceInfo.eventTime}
                />
              </div>
              <div className="question-container">
                <label className="question-label">Closure Date</label>
                <input
                  className="row-input"
                  type="date"
                  name="expireTime"
                  onChange={HandleWSInput}
                // value={workspaceInfo.expireTime}
                />
              </div>
            </div>
            <div className="form-container">
              <div className="question-container">
                <button type="submit" className="submit_category">
                  Add
                </button>
                {/* <button className="btn-trans-Cancel" type="button" onClick={toggleModal}>
                  Close
                </button> */}
              </div>
            </div>
            {error && <Form.ErrorMessage style={{ fontWeight: '700', color: 'red', textAlign: 'center' }}>
              {error}
            </Form.ErrorMessage>}
          </form>
        )}
    </div>
  );
}
