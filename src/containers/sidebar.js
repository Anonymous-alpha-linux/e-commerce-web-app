import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { MdOutlineWork } from "react-icons/md";
import { AiFillCaretDown, AiFillRightCircle } from "react-icons/ai";
import { TiPlus } from "react-icons/ti";
import { GrStackOverflow } from "react-icons/gr";
import { GoSignOut } from "react-icons/go";


import { ButtonComponent, ContainerComponent, Icon, Preview, Text, } from "../components";
import { UserAll } from '../pages';
import { sidebarData, media } from "../fixtures";
import { useAuthorizationContext, useWorkspaceContext } from "../redux";
import { AddFromWorkspace } from ".";
import { useModal, useMedia } from "../hooks";
import Modal from "./modal";
import DropdownButton from "./dropDownButton";


export default function Sidebar({ closeSidebar, forwardRef }) {
  // const [switchToggle, setSwitchToggle] = useState(false);
  // const [modalWS, setModalWS] = useState(false);
  const [modalWS, setModalWS] = useModal(false);
  const [switchToggle, setSwitchToggle] = useModal(false);
  const { workspaces } = useWorkspaceContext();
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
              <Preview.Images
                image={
                  "https://us.123rf.com/450wm/triken/triken1608/triken160800029/61320775-male-avatar-profile-picture-default-user-avatar-guest-avatar-simply-human-head-vector-illustration-i.jpg?ver=6"
                }
                style={{
                  width: "70px",
                  height: "70px",
                  borderRadius: "50%",
                }}
              ></Preview.Images>
            </ContainerComponent.Flex>
            <Text.CenterLine>
              <Text> {user.account}</Text>
            </Text.CenterLine>
            <ContainerComponent.Flex>
              {sidebarData.map((item, index) => {
                return item.authorized.indexOf(user.role) > -1 && <ContainerComponent.Item className="sidebar__links" key={index + 1} style={{
                  width: "100%",
                  padding: "20px",
                  position: "relative",
                }}>
                  <Link to={item.link}>
                    <Text.Line>
                      <Text.MiddleLine style={{ width: "20%" }}>
                        <Icon style={{ fontSize: "30px" }}>{item.icon}</Icon>
                      </Text.MiddleLine>
                      <Text.MiddleLine
                        style={{ width: "80%", paddingLeft: "2rem" }}
                      >
                        <Text.Title>{item.title}</Text.Title>
                      </Text.MiddleLine>
                    </Text.Line>
                  </Link>
                </ContainerComponent.Item> || <ContainerComponent.Item key={index + 1}></ContainerComponent.Item>
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
                      }}
                      onClick={setSwitchToggle}
                    >
                      <AiFillRightCircle></AiFillRightCircle>
                    </Icon>
                  </Text.RightLine>
                </Text.Line>
              </ContainerComponent.Item>
            </ContainerComponent.Flex>

            {switchToggle && <ContainerComponent.Toggle style={{ margin: "0 auto" }}>
              <ContainerComponent.Item
                style={{
                  width: "100%",
                  padding: 20,
                  paddingTop: 25,
                  boxShadow: "2px 0 5px #000",
                  display: "flex",
                  alignItems: "center",
                  gap: "20px",
                  position: "relative",
                }}
                onClick={() => setModalWS(!modalWS)}
              >
                <Icon
                  style={{
                    transform: "translateX(-50%)",
                    fontSize: "33px",
                    position: "absolute",
                  }}
                >
                  <TiPlus></TiPlus>
                </Icon>
                <Text.Title
                  style={{
                    right: "50%",
                    transform: "translateX(50%)",
                    position: "absolute",
                  }}
                >
                  Add Workspace
                </Text.Title>
              </ContainerComponent.Item>
              <ContainerComponent.Item
                style={{ maxHeight: "260px", overflowY: "scroll" }}
              >
                {workspaces &&
                  workspaces.map((item, index) => (
                    <EditToggle
                      item={item}
                      key={index + 1}
                      clickLoader={closeSidebar}
                    ></EditToggle>
                  ))}
              </ContainerComponent.Item>
            </ContainerComponent.Toggle>}

          </ContainerComponent.Inner>

          <ContainerComponent.Pane className="logout__button sidebar__links" style={{ width: "100%", padding: "20px", position: "relative", }}>
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

const EditToggle = ({ item, clickLoader }) => {
  const [modal, toggleModal] = useModal();
  const device = useMedia(480, 1080);
  return (
    <>
      <ContainerComponent.Item style={{ width: "100%", padding: "10px", minWidth: "230px" }}>
        <ContainerComponent.Flex style={{ alignItems: "center", justifyContent: "space-between" }}>
          <Text.MiddleLine >
            <Icon style={{ fontSize: "25px" }}>
              <GrStackOverflow></GrStackOverflow>
            </Icon>
          </Text.MiddleLine>
          <Text.MiddleLine>
            <ContainerComponent.Pane>
              <Text.Title style={{ textAlign: "center" }}>
                {item.workTitle}
              </Text.Title>
              <TimespanChild></TimespanChild>
            </ContainerComponent.Pane>
          </Text.MiddleLine>
          <Text.MiddleLine>
            <DropdownButton position="right" component={<Icon style={{ fontSize: "20px" }}>
              <AiFillCaretDown></AiFillCaretDown>
            </Icon>}>

              {device === media.MOBILE && <ButtonComponent>
                <Link to={`/management/workspace/${item._id}`} style={{ color: "#fff", }} onClick={clickLoader}>
                  <Text.Line>
                    <Text.NoWrapText>
                      Assign QA Coordinator
                    </Text.NoWrapText>
                  </Text.Line>
                </Link>
              </ButtonComponent> || <ButtonComponent onClick={toggleModal}>
                  <Text.Line>
                    <Text.NoWrapText>
                      Assign QA Coordinator
                    </Text.NoWrapText>
                  </Text.Line>
                </ButtonComponent>
              }

              <ButtonComponent>
                <Link to={`/management/member/${item._id}`} style={{ color: "#fff" }} onClick={clickLoader}>
                  <Text.Line>
                    <Text.NoWrapText>
                      Add Member
                    </Text.NoWrapText>
                  </Text.Line>
                </Link>
              </ButtonComponent>
              <ButtonComponent>
                <Text.Line>
                  <Text.NoWrapText>
                    Edit Time/Title
                  </Text.NoWrapText>
                </Text.Line>
              </ButtonComponent>
            </DropdownButton>
          </Text.MiddleLine>
        </ContainerComponent.Flex>
      </ContainerComponent.Item>

      <Modal style={{ background: '#fff', maxWidth: '420px', borderRadius: '10px', overflow: 'hidden' }} isShowing={modal} toggle={toggleModal}>
        <UserAll workspaceId={item._id}></UserAll>
      </Modal>
    </>
  );
};

function TimespanChild({ startTime = Date.now(), expireTime }) {
  const startDate = new Date(startTime);
  const expireDate = new Date(expireTime);
  const [counterTimer, setCounterTimer] = useState({
    days: expireDate.getDate() - startDate.getDate(),
    hours: 23 - startDate.getHours(),
    minutes: 59 - startDate.getMinutes(),
    seconds: 59 - startDate.getSeconds(),
  });

  useEffect(() => {
    let timeout = setTimeout(() => {
      setCounterTimer({
        days: expireDate.getDate() - startDate.getDate(),
        hours: 23 - startDate.getHours(),
        minutes: 59 - startDate.getMinutes(),
        seconds: 59 - startDate.getSeconds(),
      });
    }, 1000);

    return () => {
      clearTimeout(timeout);
    };
  }, [counterTimer]);

  return (
    <ContainerComponent.Section className="timespan__container">
      <ContainerComponent.Inner
        style={{
          margin: "0 auto",
          textAlign: "center",
        }}
      >
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
              {`${(counterTimer.hours < 10 && "0") || ""}${counterTimer.hours}`}{" "}
            </ButtonComponent>
          </ContainerComponent.Item>

          <ContainerComponent.Item>
            <Text>:</Text>
          </ContainerComponent.Item>

          <ContainerComponent.Item
            style={{ fontSize: "13px", padding: "5px 0" }}
          >
            <ButtonComponent style={{ padding: "5px 10px" }}>{`${(counterTimer.minutes < 10 && "0") || ""
              }${counterTimer.minutes}`}</ButtonComponent>
          </ContainerComponent.Item>

          <ContainerComponent.Item>
            <Text>:</Text>
          </ContainerComponent.Item>

          <ContainerComponent.Item
            style={{ fontSize: "13px", padding: "5px 0" }}
          >
            <ButtonComponent style={{ padding: "5px 10px" }}>{`${(counterTimer.seconds < 10 && "0") || ""
              }${counterTimer.seconds}`}</ButtonComponent>
          </ContainerComponent.Item>
        </ContainerComponent.Flex>
      </ContainerComponent.Inner>
    </ContainerComponent.Section>
  );
}
