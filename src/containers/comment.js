import React, { Component, useState } from "react";
import { ContainerComponent, Text, Icon, Form } from "../components";
import { FaLock, FaThumbsUp, FaThumbsDown } from "react-icons/fa";
import { FiSend } from "react-icons/fi";
import { BsFillPersonFill } from "react-icons/bs";
import { useAuthorizationContext, usePostContext } from "../redux";


export default function Comment({ postId, commentLogs }) {
  const { user } = useAuthorizationContext();
  const { interactPost } = usePostContext();
  const [input, setInput] = useState({
    content: ''
  });
  console.log(commentLogs, postId, input);
  const inputHandler = (e) => {
    setInput({
      [e.target.name]: e.target.value
    })
  }
  const submitHandler = (e) => {
    e.preventDefault();
    interactPost(postId, 'comment', input);
  }
  return (
    <ContainerComponent.Section
      className="comment__section"
      style={{
        padding: "10px",
      }}
    >
      <ContainerComponent.Pane className="comment__header">
        <ContainerComponent.Flex
          style={{
            justifyContent: "space-between",
          }}
        >
          <ContainerComponent.Item>
            <Text.Date>Block after 3 hours</Text.Date>
          </ContainerComponent.Item>
          <ContainerComponent.Item>
            <Form.Select>
              <Form.Option>Most Popular</Form.Option>
              <Form.Option>Most Favorite</Form.Option>
            </Form.Select>
          </ContainerComponent.Item>
        </ContainerComponent.Flex>
      </ContainerComponent.Pane>
      <ContainerComponent.Pane className="comment__body">
        <ContainerComponent.Flex
          style={{ alignItems: "center", flexWrap: "nowrap" }}
        >
          <ContainerComponent.Item>
            <Icon.CircleIcon
              style={{
                background: "#163d3c",
                color: "#fff",
                padding: 0
              }}
            >
              <Icon.Image src={user.profileImage}></Icon.Image>
            </Icon.CircleIcon>
          </ContainerComponent.Item>
          <ContainerComponent.Item
            style={{
              flexGrow: 1,
            }}
          >
            <Text.Subtitle>
              {user.account}
              <FaLock style={{ margin: "0 10px" }} />
            </Text.Subtitle>
            <Text.Line>
              <Form
                method='POST'
                style={{ paddingLeft: 0 }}
                onSubmit={submitHandler}
              >
                <Form.Input
                  placeholder="Leave your comment"
                  name='content'
                  value={input.body}
                  onChange={inputHandler}
                  style={{ width: '90%' }}
                ></Form.Input>
                <input type='submit' style={{ display: 'none' }}></input>
                <Text.RightLine>
                  <Text.MiddleLine>
                    <Text.CenterLine>
                      <Icon.CircleIcon>
                        <Form.Input component={<FiSend />}></Form.Input>
                      </Icon.CircleIcon>
                    </Text.CenterLine>
                  </Text.MiddleLine>
                </Text.RightLine>
              </Form>
            </Text.Line>
          </ContainerComponent.Item>
        </ContainerComponent.Flex>
        <ContainerComponent.Pane className="comment__log__footer">

        </ContainerComponent.Pane>
      </ContainerComponent.Pane>
      <ContainerComponent.Pane
        className="comment__log"
        style={{
          paddingTop: "12px",
        }}
      >
        {commentLogs.map(comment => <Comment.Tab key={comment._id} comment={comment}></Comment.Tab>)}
      </ContainerComponent.Pane>
      <ContainerComponent.Pane className="comment__footer">
        <Text.Subtitle
          style={{ textAlign: "center", width: "100%", margin: "10px 0" }}
        >
          More...
        </Text.Subtitle>
      </ContainerComponent.Pane>
    </ContainerComponent.Section>
  );
}

Comment.Tab = function ({ children, ...props }) {
  console.log(props);
  return (
    <>
      <Text.Group>
        <Icon.CircleIcon>
          <BsFillPersonFill />
        </Icon.CircleIcon>
      </Text.Group>
      <Text.Group>
        <Text.MiddleLine>
          <Text.Bold style={{ margin: 0 }}>Staff Name</Text.Bold>
        </Text.MiddleLine>
        <Text.MiddleLine>
          <Text.Date
            style={{
              marginLeft: "8px",
            }}
          >
            20:30
          </Text.Date>
        </Text.MiddleLine>
        <Text.Line>
          <Text.Paragraph
            style={{
              margin: "8px 0",
            }}
          >
            Nice Content. Good job Bro!
          </Text.Paragraph>
        </Text.Line>
      </Text.Group>
      <Text.Line>
        <Text.MiddleLine>
          <Icon.CircleIcon>
            <FaThumbsUp />
          </Icon.CircleIcon>
          240
        </Text.MiddleLine>
        <Text.MiddleLine style={{ margin: "0 10px" }}>
          <Icon.CircleIcon>
            <FaThumbsDown />
          </Icon.CircleIcon>
          240
        </Text.MiddleLine>
        <Text.MiddleLine>
          Reply
        </Text.MiddleLine>
      </Text.Line>
    </>
  );
};
