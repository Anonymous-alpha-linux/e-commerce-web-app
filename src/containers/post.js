import React from "react";
import { ContainerComponent, Form, Icon, Text, Preview } from "../components";
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";
import { BiExit } from "react-icons/bi";
import { IoEarth } from "react-icons/io5";
import { BsFillPersonFill } from "react-icons/bs";

export default function Post() {
  return (
    <ContainerComponent.Section
      style={{
        padding: "20px",
      }}
    >
      <Icon.CircleIcon>
        <BiExit />
      </Icon.CircleIcon>
      <ContainerComponent.Inner>
        <ContainerComponent.Pane>
          <Icon.CircleIcon>
            <BsFillPersonFill />
          </Icon.CircleIcon>
          <ContainerComponent.Pane>
            <Text.Title>Staff Name</Text.Title>
            <ContainerComponent.Flex>
              <Text.Date>20: 20</Text.Date>
              <Icon style={{ margin: "16px 10px 10px" }}>
                <IoEarth />
              </Icon>
            </ContainerComponent.Flex>
          </ContainerComponent.Pane>
        </ContainerComponent.Pane>
    <ContainerComponent.Pane style={{ position: "relative" }}>
          <Text.Paragraph>
            Một cảm xúc gì đó rất lạ, một cái chất rất khó tả ở Hải Bột, một
            người nghệ sĩ rất “nghệ sĩ”! Anh cũng là một gã “gàn dở”, nhưng cũng
            là một kẻ vô tư, treo ngược tâm hồn mình cheo leo ở đâu đó tận trên
            mây, như một nhà thơ.
          </Text.Paragraph>
          {/* Preivew */}
          <Preview.Images image={'https://img.freepik.com/free-vector/hand-painted-watercolor-pastel-sky-background_23-2148902771.jpg'} alt={'background'} style={{width:"100%"}}>
                    Avatar
                </Preview.Images>
        </ContainerComponent.Pane>
        {/* {Like, Dislike} */}
        <ContainerComponent.Flex>
          <ContainerComponent.Item>
            <Icon.CircleIcon>
              <FaThumbsUp />
            </Icon.CircleIcon>
          </ContainerComponent.Item>
          <ContainerComponent.Item>
            <Icon.CircleIcon>
              <FaThumbsDown />
            </Icon.CircleIcon>
          </ContainerComponent.Item>
        </ContainerComponent.Flex>
      </ContainerComponent.Inner>
    </ContainerComponent.Section>
  );
}
