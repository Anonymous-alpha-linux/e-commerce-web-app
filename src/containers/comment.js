import React, { Component } from "react";
import { ContainerComponent, Text, Icon, Form } from "../components";
import { FaLock, FaThumbsUp, FaThumbsDown } from "react-icons/fa";
import { FiSend } from "react-icons/fi";
import { BsFillPersonFill } from "react-icons/bs";

export default function Comment() {
<<<<<<< HEAD
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
=======
    return <ContainerComponent.Section className="comment__section" style={{
        padding: '10px'
    }}>
        <ContainerComponent.Pane className="comment__header">
            <ContainerComponent.Flex style={{
                justifyContent: 'space-between'
            }}>
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
            <ContainerComponent.Flex style={{ alignItems: 'center', flexWrap: 'nowrap' }}>
                <ContainerComponent.Item>
                    <Icon.CircleIcon style={{
                        background: '#163d3c',
                        color: '#fff'
                    }}>
                        <BsFillPersonFill />
                    </Icon.CircleIcon>
                </ContainerComponent.Item>
                <ContainerComponent.Item style={{
                    flexGrow: 1
                }}>
                    <Text.Subtitle style={{ margin: '8px' }}>
                        User Name
                        <FaLock style={{ margin: '0 10px' }} />
                    </Text.Subtitle>
                    <Text.Line>
                        <Form.Input placeholder="Post your idea" style={{
                            width: '80%'
                        }}></Form.Input>
                        <Text.MiddleLine>
                            <Text.CenterLine>
                                <Icon.CircleIcon>
                                    <FiSend />
                                </Icon.CircleIcon>
                            </Text.CenterLine>
                        </Text.MiddleLine>
                    </Text.Line>
                </ContainerComponent.Item>
            </ContainerComponent.Flex>
        </ContainerComponent.Pane>
        <ContainerComponent.Pane className="comment__log" style={{
            paddingTop: '12px'
        }}>
            <Comment.Tab></Comment.Tab>
        </ContainerComponent.Pane>
        <ContainerComponent.Pane className="comment__footer">
            <Text.Subtitle style={{ textAlign: 'center', width: '100%', margin: '10px 0' }}>
                More...
            </Text.Subtitle>
        </ContainerComponent.Pane>
    </ContainerComponent.Section>
}

Comment.Tab = function ({ children, ...props }) {
    return <>
        <Text.Group>
            <Icon.CircleIcon>
                <BsFillPersonFill />
            </Icon.CircleIcon>
        </Text.Group>
        <Text.Group>
            <Text.MiddleLine>
                <Text.Bold style={{ margin: 0 }}>
                    Staff Name
                </Text.Bold>
            </Text.MiddleLine>
            <Text.MiddleLine>
                <Text.Date style={{
                    marginLeft: '8px'
                }}>20:30</Text.Date>
            </Text.MiddleLine>
            <Text.Line>
                <Text.Paragraph style={{
                    margin: '8px 0'
                }}>Nice Content. Good job Bro!</Text.Paragraph>
            </Text.Line>
        </Text.Group>
    </>
}
>>>>>>> d426380107bdb3f0458837556fe1e8c8a013279a
