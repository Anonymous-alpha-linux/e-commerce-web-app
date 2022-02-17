import React, { Component } from "react";
import { ContainerComponent, Text, Icon, Form } from "../components";
import { FaLock, FaThumbsUp, FaThumbsDown } from "react-icons/fa";
import { FiSend } from "react-icons/fi";
import { BsFillPersonFill } from "react-icons/bs";

export default function Comment() {
  return (
    <ContainerComponent
      style={{
        padding: "10px",
      }}
    >
      <ContainerComponent.Grid columns={3}>
        <ContainerComponent.Item>
          <Text.Date>Block after 3 hours</Text.Date>
        </ContainerComponent.Item>
        <ContainerComponent.Item></ContainerComponent.Item>
        <ContainerComponent.Item>
          <Form.Select style={{ margin: "16px 0px" }}>
            <option value="Most Popular">Most Popular</option>
            <option value="Most Popular">Most Favorite</option>
          </Form.Select>
        </ContainerComponent.Item>
      </ContainerComponent.Grid>
      <ContainerComponent.Flex style={{ alignItems: "center" }}>
        <ContainerComponent.Item>
          <Icon.CircleIcon>
            <BsFillPersonFill />
          </Icon.CircleIcon>
        </ContainerComponent.Item>
        <ContainerComponent.Item>
          <ContainerComponent.Pane>
            <Text.Subtitle style={{ margin: 0 }}>
              User Name
              <FaLock style={{ margin: "0 10px" }} />
            </Text.Subtitle>
            <Form.Input placeholder="Post your idea"></Form.Input>
          </ContainerComponent.Pane>
        </ContainerComponent.Item>
        <ContainerComponent.Item>
          <Icon.CircleIcon>
            <FiSend />
          </Icon.CircleIcon>
        </ContainerComponent.Item>
      </ContainerComponent.Flex>
      <ContainerComponent.Inner>
        <ContainerComponent.Flex>
          <ContainerComponent.Item>
            <Icon.CircleIcon>
              <BsFillPersonFill />
            </Icon.CircleIcon>
          </ContainerComponent.Item>
          <ContainerComponent.Item>
            <ContainerComponent.Pane>
              <ContainerComponent.Flex>
                <Text.Subtitle style={{ margin: 0 }}>Staff Name</Text.Subtitle>
                <Text.Date style={{ margin: "5px 5px 10px" }}>20:30</Text.Date>
              </ContainerComponent.Flex>
              <Text.Paragraph>Nice Content. Good job Bro!</Text.Paragraph>
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
              <ContainerComponent.Item>
              <Text.Subtitle>Reply</Text.Subtitle>
              </ContainerComponent.Item>
              </ContainerComponent.Flex>
            </ContainerComponent.Pane>
          </ContainerComponent.Item>
        </ContainerComponent.Flex>
      </ContainerComponent.Inner>
      <ContainerComponent.Item>
        <Text.Subtitle
          style={{ textAlign: "center", width: "100%", margin: "10px 0" }}
        >
          More...
        </Text.Subtitle>
      </ContainerComponent.Item>
    </ContainerComponent>
  );
}
