import React, { useState, useEffect } from "react";

import { ButtonComponent, ContainerComponent, Form, Icon, Preview, Text } from '../components'
import { FaHome, FaPenSquare, FaSignOutAlt } from 'react-icons/fa';
import { MdOutlineWork } from 'react-icons/md';
import { AiFillCaretDown, AiFillPieChart, AiFillRightCircle } from 'react-icons/ai';
import { GrDocumentText } from 'react-icons/gr'
import { RiAccountCircleFill } from 'react-icons/ri'
import { TiPlus } from 'react-icons/ti'
import { GrStackOverflow } from "react-icons/gr"

import { Link } from "react-router-dom";
import { sidebarData } from "../fixtures";
import { icons } from "react-icons";
import { useAuthorizationContext, useWorkspaceContext } from "../redux";
import { AddFromWorkspace } from ".";

export default function Sidebar() {
  const [switchToggle, setSwitchToggle] = useState(false);
  const [modalWS, setModalWS] = useState(false);
  const { workspaces } = useWorkspaceContext();
  const { user } = useAuthorizationContext()
  const ToggleSwitch = () => {
    switchToggle ? setSwitchToggle(false) : setSwitchToggle(true);
  };
  return (<>
    <ContainerComponent.Toggle className="sidebar__root">
      <ContainerComponent.Inner>
        <ContainerComponent.Flex style={{ justifyContent: "center", alignItems: "center", padding: "5px", }}>
          <Preview.Images
            image={"https://us.123rf.com/450wm/triken/triken1608/triken160800029/61320775-male-avatar-profile-picture-default-user-avatar-guest-avatar-simply-human-head-vector-illustration-i.jpg?ver=6"}
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
          {sidebarData.map(item =>
            <ContainerComponent.Item className="" style={{ width: "100%", padding: "20px", display: "flex", alignItems: "center", position: "relative", }}>
              <Icon style={{ fontSize: '30px' }}>
                {item.icon}
              </Icon>
              <Text.Title
                style={{
                  left: "50%",
                  transform: "translateX(-50%)",
                  position: "absolute",
                }}
              >
                {item.title}
              </Text.Title>
            </ContainerComponent.Item>
          )}
          <ContainerComponent.Item
            style={{
              width: "100%",
              padding: "20px",
              display: "flex",
              alignItems: "center",
              position: "relative",
            }}
          >
            <Icon>
              <MdOutlineWork style={{ fontSize: "35px" }}></MdOutlineWork>
            </Icon>
            <Text.Title
              style={{
                left: "50%",
                transform: "translateX(-50%)",
                position: "absolute",
              }}
            >
              Workspace
            </Text.Title>
            <Icon
              style={{ position: "absolute", right: "5%", fontSize: "25px" }}
              onClick={ToggleSwitch}
            >
              <AiFillRightCircle></AiFillRightCircle>
            </Icon>
          </ContainerComponent.Item>
          <ContainerComponent.Toggle
            className={switchToggle ? "show" : "hide"}
            style={{ margin: "0 auto" }}>
          </ContainerComponent.Toggle>

        </ContainerComponent.Flex>
        <ContainerComponent.Toggle className={switchToggle ? "show" : "hide"} style={{ margin: "0 auto" }}>
          <ContainerComponent.Item style={{ width: "100%", padding: 20, paddingTop: 25, boxShadow: '2px 0 5px #000', display: "flex", alignItems: "center", gap: "20px", position: "relative" }} onClick={() => setModalWS(!modalWS)}>
            <Icon style={{ transform: "translateX(-50%)", fontSize: "33px", position: "absolute" }}>
              <TiPlus></TiPlus>
            </Icon>
            <Text.Title style={{ right: "50%", transform: "translateX(50%)", position: "absolute" }}>
              Add Workspace
            </Text.Title>
          </ContainerComponent.Item>
          {
            workspaces && workspaces.map((item) => <ContainerComponent.Item key={item.id} >
              <ContainerComponent.Inner style={{ margin: "0" }}>
              </ContainerComponent.Inner>
              <EditToggle item={item}></EditToggle>
            </ContainerComponent.Item>
            )
          }
        </ContainerComponent.Toggle>
      </ContainerComponent.Inner>
    </ContainerComponent.Toggle>
    {modalWS && (
      <>
        <ContainerComponent.BackDrop style={{ zIndex: 2 }}>
        </ContainerComponent.BackDrop>
        <div style={{ height: "0px", zIndex: '10', position: 'fixed', top: '20%', left: '50%', transform: 'translate(-50%,-50%)' }}>
          <AddFromWorkspace setModal={setModalWS} modal={modalWS} />
        </div>
      </>
    )}
  </>
  );
}

const EditToggle = ({ item }) => {
  const [switchToggleChild, setSwitchToggleChild] = useState(false);
  const [editToggle, setEditToggle] = useState(false);

  return (
    <>
      <ContainerComponent.Item className="c-modal__container" style={{ width: "100%", padding: "10px" }}>
        <ContainerComponent.Flex style={{ alignItems: 'center', justifyContent: 'space-between' }}>
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
              <TimespanChild></TimespanChild>
            </ContainerComponent.Pane>
          </Text.MiddleLine>
          <Text.MiddleLine>
            <Icon
              style={{ fontSize: "20px" }}
            >
              <AiFillCaretDown key={item.id} onClick={() => setEditToggle(!editToggle)}></AiFillCaretDown>
            </Icon>
          </Text.MiddleLine>
        </ContainerComponent.Flex>
        <Text.Line style={{ width: '100%' }}>
          {editToggle &&
            <ContainerComponent.Toggle className={switchToggleChild ? "opera" : "empty"} style={{ display: "flex", justifyContent: "center", position: 'absolute', border: '1px solid', borderRadius: '10px', right: 0, padding: '20px', zIndex: 3, background: '#fff' }}>
              <ContainerComponent.Flex style={{ alignItems: "center", justifyContent: "center", flexDirection: "column", gap: "15px" }}>
                <ButtonComponent>Add QA Coodinator</ButtonComponent>
                <ButtonComponent style={{ width: "177px", textAlign: "center" }}>Edit Time/Title</ButtonComponent>
              </ContainerComponent.Flex>
            </ContainerComponent.Toggle>}
        </Text.Line>
      </ContainerComponent.Item>

    </>
  )
}

function TimespanChild({
  startTime = Date.now(),
  expireTime,
}) {
  const startDate = new Date(startTime);
  const expireDate = new Date(expireTime);
  const [counterTimer, setCounterTimer] = useState({
    days: expireDate.getDate() - startDate.getDate(),
    hours: 23 - startDate.getHours(),
    minutes: 59 - startDate.getMinutes(),
    seconds: 59 - startDate.getSeconds()
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
    }
  }, [counterTimer]);

  return <ContainerComponent.Section

    className="timespan__container"
  >
    <ContainerComponent.Inner
      style={{
        margin: '0 auto',
        textAlign: 'center',
      }}
    >
      <ContainerComponent.Flex
        style={{
          // alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <ContainerComponent.Item style={{ fontSize: "13px", padding: "5px 0" }} >
          <ButtonComponent style={{ padding: "5px 15px" }}>{`${counterTimer.hours < 10 && '0' || ''}${counterTimer.hours}`} </ButtonComponent>
        </ContainerComponent.Item>

        <ContainerComponent.Item >
          <Text>:</Text>
        </ContainerComponent.Item>

        <ContainerComponent.Item style={{ fontSize: "13px", padding: "5px 0" }}>
          <ButtonComponent style={{ padding: "5px 10px" }}>{`${counterTimer.minutes < 10 && '0' || ''}${counterTimer.minutes}`}</ButtonComponent>
        </ContainerComponent.Item>

        <ContainerComponent.Item>
          <Text>:</Text>
        </ContainerComponent.Item>

        <ContainerComponent.Item style={{ fontSize: "13px", padding: "5px 0" }}>
          <ButtonComponent style={{ padding: "5px 10px" }}>{`${counterTimer.seconds < 10 && '0' || ''}${counterTimer.seconds}`}</ButtonComponent>
        </ContainerComponent.Item>
      </ContainerComponent.Flex>
    </ContainerComponent.Inner>
  </ContainerComponent.Section>
}
