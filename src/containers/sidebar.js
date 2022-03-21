import React from "react";
import {
  ButtonComponent,
  ContainerComponent,
  Form,
  Icon,
  Preview,
  Text,
} from "../components";
import { FaHome, FaPenSquare, FaSignOutAlt } from "react-icons/fa";
import { MdOutlineWork } from "react-icons/md";
import { AiFillCaretDown, AiFillPieChart } from "react-icons/ai";
import { GrDocumentText } from "react-icons/gr";
import { useState } from "react";
import { RiAccountCircleFill } from "react-icons/ri";
import { TiPlus } from "react-icons/ti";
import { GrStackOverflow } from "react-icons/gr";
import TimespanChild from "./timespan";
import { Button } from "../components/button/styles/button";

const EditToggle = ({ item }) => {
  const [switchToggleChild, setSwitchToggleChild] = useState(false);
  const [editToggle, setEditToggle] = useState(false);

  return (
    <>
      <ContainerComponent.Item
        className="c-modal__container"
        style={{
          width: "100%",
          padding: "10px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "40px",
        }}
      >
        <Icon style={{ fontSize: "25px" }}>
          <GrStackOverflow></GrStackOverflow>
        </Icon>
        <ContainerComponent.Pane>
          <Text.Title style={{ textAlign: "center" }}>
            {item.workTitle}
          </Text.Title>
          <TimespanChild></TimespanChild>
        </ContainerComponent.Pane>
        <Icon style={{ fontSize: "20px" }}>
          <AiFillCaretDown
            key={item.id}
            onClick={() => setEditToggle(!editToggle)}
          ></AiFillCaretDown>
        </Icon>
      </ContainerComponent.Item>

      {editToggle && (
        <ContainerComponent.Toggle
          className={switchToggleChild ? "opera" : "empty"}
          style={{ display: "flex", justifyContent: "center" }}
        >
          <ContainerComponent.Flex
            style={{
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
              gap: "15px",
            }}
          >
            <ButtonComponent>Add QA Coodinator</ButtonComponent>
            <ButtonComponent style={{ width: "177px", textAlign: "center" }}>
              Edit Time/Title
            </ButtonComponent>
          </ContainerComponent.Flex>
        </ContainerComponent.Toggle>
      )}
    </>
  );
};
export default function MenuContainer() {
  const [workspaces, setWorkspaces] = useState([
    {
      id: 1,
      workTitle: "Market",
      exprieTime: "2022-03-21T07:27:17.505+00:00",
    },
    {
      id: 2,
      workTitle: "Buiness",
      exprieTime: "2022-03-21T07:27:17.505+00:00",
    },
    {
      id: 3,
      workTitle: "Art",
      exprieTime: "2022-03-21T07:27:17.505+00:00",
    },
  ]);
  const [switchToggle, setSwitchToggle] = useState(false);

  return (
    <ContainerComponent.Toggle
      className="manager__sideBar"
      style={{ width: "375px", height: "100vh", background: "white" }}
    >
      <ContainerComponent.Inner
        style={{ position: "absolute" }}
      ></ContainerComponent.Inner>
      <ContainerComponent.Inner>
        <ContainerComponent.Flex
          style={{
            justifyContent: "center",
            alignItems: "center",
            padding: "25px",
          }}
        >
          <Preview.Images
            image={"https://tinyurl.com/vwcvkbhv"}
            style={{
              width: "70px",
              height: "70px",
              borderRadius: "50%",
            }}
          ></Preview.Images>
        </ContainerComponent.Flex>
        <ContainerComponent.Flex>
          <ContainerComponent.Item
            style={{
              width: "100%",
              padding: "20px",
              display: "flex",
              alignItems: "center",
              position: "relative",
            }}
          >
            <Icon style={{ marginLeft: "20px" }}>
              <FaHome style={{ fontSize: "30px" }}></FaHome>
            </Icon>
            <Text.Title
              style={{
                left: "50%",
                transform: "translateX(-50%)",
                position: "absolute",
              }}
            >
              DashBoard
            </Text.Title>
          </ContainerComponent.Item>
          <ContainerComponent.Item
            style={{
              width: "100%",
              padding: "20px",
              display: "flex",
              alignItems: "center",
              position: "relative",
            }}
          >
            <Icon style={{ marginLeft: "20px" }}>
              <AiFillPieChart style={{ fontSize: "30px" }}></AiFillPieChart>
            </Icon>
            <Text.Title
              style={{
                left: "50%",
                transform: "translateX(-50%)",
                position: "absolute",
              }}
            >
              Chart
            </Text.Title>
          </ContainerComponent.Item>
          <ContainerComponent.Item
            style={{
              width: "100%",
              padding: "20px",
              display: "flex",
              alignItems: "center",
              position: "relative",
            }}
          >
            <Icon style={{ marginLeft: "20px", fontSize: "35px" }}>
              <GrDocumentText style={{ fontSize: "30px" }}></GrDocumentText>
            </Icon>
            <Text.Title
              style={{
                left: "50%",
                transform: "translateX(-50%)",
                position: "absolute",
              }}
            >
              Document
            </Text.Title>
          </ContainerComponent.Item>
          <ContainerComponent.Item
            style={{
              width: "100%",
              padding: "20px",
              display: "flex",
              alignItems: "center",
              position: "relative",
            }}
          >
            <Icon style={{ marginLeft: "20px" }}>
              <FaPenSquare style={{ fontSize: "30px" }}></FaPenSquare>
            </Icon>
            <Text.Title
              style={{
                left: "50%",
                transform: "translateX(-50%)",
                position: "absolute",
              }}
            >
              Post
            </Text.Title>
          </ContainerComponent.Item>
          <ContainerComponent.Item
            style={{
              width: "100%",
              padding: "20px",
              display: "flex",
              alignItems: "center",
              position: "relative",
            }}
          >
            <Icon style={{ marginLeft: "20px" }}>
              <RiAccountCircleFill
                style={{ fontSize: "30px" }}
              ></RiAccountCircleFill>
            </Icon>
            <Text.Title
              style={{
                left: "50%",
                transform: "translateX(-50%)",
                position: "absolute",
              }}
            >
              Account
            </Text.Title>
          </ContainerComponent.Item>
          <ContainerComponent.Item
            style={{
              width: "100%",
              padding: "20px",
              display: "flex",
              alignItems: "center",
              position: "relative",
            }}
          >
            <Icon style={{ marginLeft: "20px" }}>
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
              style={{ position: "absolute", right: "5%", fontSize: "20px" }}
              onClick={() => setSwitchToggle(!switchToggle)}
            >
              <AiFillCaretDown></AiFillCaretDown>
            </Icon>
          </ContainerComponent.Item>

          <ContainerComponent.Toggle
            className={switchToggle ? "show" : "hide"}
            style={{ margin: "0 auto" }}
          >
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
            {workspaces &&
              workspaces.map((item) => (
                <ContainerComponent.Item key={item.id}>
                  <ContainerComponent.Inner
                    style={{ margin: "0" }}
                  ></ContainerComponent.Inner>
                  <EditToggle item={item}></EditToggle>
                </ContainerComponent.Item>
              ))}
          </ContainerComponent.Toggle>
        </ContainerComponent.Flex>
      </ContainerComponent.Inner>
    </ContainerComponent.Toggle>
  );
}
