import React, { Component } from 'react';
import { ContainerComponent, Text, Icon, Form } from '../components';
import { FaLock } from "react-icons/fa";
import { FiSend } from "react-icons/fi";
import { BsFillPersonFill } from "react-icons/bs";

export default function Comment() {
    return <ContainerComponent.Section className="comment__container" style={{
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
                        <Text.Middle>
                            <Text.Center>
                                <Icon.CircleIcon>
                                    <FiSend />
                                </Icon.CircleIcon>
                            </Text.Center>
                        </Text.Middle>
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
        <Text.Middle>
            <Icon.CircleIcon>
                <BsFillPersonFill />
            </Icon.CircleIcon>
        </Text.Middle>
        <Text>
            <Text.Middle>
                <Text.Bold style={{ margin: 0 }}>
                    Staff Name
                </Text.Bold>
            </Text.Middle>
            <Text.Middle>
                <Text.Date style={{
                    marginLeft: '8px'
                }}>20:30</Text.Date>
            </Text.Middle>
            <Text.Line>
                <Text.Paragraph style={{
                    margin: '8px 0'
                }}>Nice Content. Good job Bro!</Text.Paragraph>
            </Text.Line>
        </Text>
    </>
}