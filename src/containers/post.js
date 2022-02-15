import React, { useState } from "react";
import { ContainerComponent, Icon, Text, Preview } from "../components";
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";

import { IoEarth } from "react-icons/io5";
import { BsFillPersonFill } from "react-icons/bs";
import { Comment } from ".";

export default function Post() {
    const [openComment, setOpenComment] = useState(false);
    return (
        <ContainerComponent.Section
            className="post__container"
            style={{
                padding: "20px",
            }}>
            <ContainerComponent.Pane className="post__header">
                <Icon.CircleIcon style={{
                    verticalAlign: 'middle',
                    background: '#163d3c',
                    color: '#fff'
                }}>
                    <BsFillPersonFill />
                </Icon.CircleIcon>
                <ContainerComponent.InlineGroup style={{
                    margin: '0 10px'
                }}>
                    <Text.Title>Staff Name</Text.Title>
                    <ContainerComponent.Flex>
                        <Text.Date style={{
                            marginRight: '8px'
                        }}>20: 20</Text.Date>
                        <Text>
                            <IoEarth />
                        </Text>
                    </ContainerComponent.Flex>
                </ContainerComponent.InlineGroup>
            </ContainerComponent.Pane>
            <ContainerComponent.Pane className="post__body">
                <Text.Paragraph>
                    Một cảm xúc gì đó rất lạ, một cái chất rất khó tả ở Hải Bột, một
                    người nghệ sĩ rất “nghệ sĩ”! Anh cũng là một gã “gàn dở”, nhưng cũng
                    là một kẻ vô tư, treo ngược tâm hồn mình cheo leo ở đâu đó tận trên
                    mây, như một nhà thơ.
                </Text.Paragraph>
                {/* Preivew */}
                <Preview.Images image={'https://img.freepik.com/free-vector/hand-painted-watercolor-pastel-sky-background_23-2148902771.jpg'} alt={'background'}>
                    Avatar
                </Preview.Images>
            </ContainerComponent.Pane>
            {/* {Like, Dislike} */}
            <ContainerComponent.Pane className="post__footer" style={{
                background: '#EEF5EB',
                boxShadow: '1px 1px .5px solid #000'
            }}>
                <ContainerComponent.GridThreeColumns>
                    <ContainerComponent.Item>
                        <Text.MiddleLine>
                            <Icon.CircleIcon style={{
                                marginRight: '10px'
                            }}>
                                <FaThumbsUp />
                            </Icon.CircleIcon>
                            240
                        </Text.MiddleLine>
                    </ContainerComponent.Item>
                    <ContainerComponent.Item>
                        <Text.CenterLine>
                            <Icon.CircleIcon style={{
                                marginRight: '10px'
                            }}>
                                <FaThumbsDown />
                            </Icon.CircleIcon>
                            240
                        </Text.CenterLine>
                    </ContainerComponent.Item>
                    <ContainerComponent.Item onClick={() => setOpenComment(!openComment)}>
                        <Text.CenterLine>
                            <Text.MiddleLine>
                                Comment
                            </Text.MiddleLine>
                        </Text.CenterLine>
                    </ContainerComponent.Item>
                </ContainerComponent.GridThreeColumns>
            </ContainerComponent.Pane>
            {openComment && <Comment></Comment>}
        </ContainerComponent.Section>
    );
}
