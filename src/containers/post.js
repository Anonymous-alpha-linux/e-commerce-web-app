import React, { useState, useEffect } from "react";
import { ContainerComponent, Icon, Text, Preview, ButtonComponent } from "../components";
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";

import { IoEarth } from "react-icons/io5";
import { BsFillPersonFill } from "react-icons/bs";
import { Comment } from ".";
import { useAuthorizationContext, usePostContext } from "../redux";
import { useParams, Link } from "react-router-dom";

export default function Post({ postHeader, postBody, postFooter, removeIdea }) {
    const [openComment, setOpenComment] = useState(false);
    const [disliked, setDisliked] = useState(false);
    const [liked, setLiked] = useState(false);
    const { getSocket, user } = useAuthorizationContext();
    const { posts } = usePostContext();
    const date = `${new Date(postHeader.date).getHours()}:${new Date(postHeader.date).getMinutes()}`;
    useEffect(() => {
        console.log(postHeader, postBody, postFooter);
    }, [postFooter, postBody, postFooter]);

    const thumpupHandler = () => {
        console.log(user);
        getSocket().emit('like', {

        });
    }
    const thumpdownHandler = () => {
        getSocket().emit('dislike', {

        })
    }
    return (
        <ContainerComponent.Section
            className="post__section"
            style={{
                padding: "20px",
            }}>
            <ContainerComponent.Pane className="post__header">
                <ContainerComponent.InlineGroup>
                    <Icon.Avatar style={{
                        verticalAlign: 'middle',
                        background: '#163d3c',
                        color: '#fff'
                    }}>
                        <Preview.Images image={postHeader.image} alt={postHeader.alt}></Preview.Images>
                    </Icon.Avatar>
                </ContainerComponent.InlineGroup>
                <ContainerComponent.InlineGroup style={{
                    margin: '0 10px'
                }}>
                    <Text.Title>{postHeader.hideAuthor && 'Anonymous' || postHeader.username}</Text.Title>
                    <ContainerComponent.Flex>
                        <Text.Date style={{
                            marginRight: '8px'
                        }}>{date}</Text.Date>
                        <Text>
                            <IoEarth />
                        </Text>
                    </ContainerComponent.Flex>
                </ContainerComponent.InlineGroup>
                {user.accountId === postHeader.postAuthor && <>
                    <Link to={`/portal/idea/${postHeader.id}`}>
                        <ButtonComponent>
                            Edit
                        </ButtonComponent>
                    </Link>

                    <ButtonComponent onClick={removeIdea}>
                        Delete
                    </ButtonComponent>
                </>}
            </ContainerComponent.Pane>
            <ContainerComponent.Pane className="post__body">
                <Text.Paragraph>
                    {postBody.content}
                </Text.Paragraph>
                <ContainerComponent.Flex>
                    {postBody.attachment.map(attach => {
                        const imageRegex = new RegExp("image/*");
                        if (imageRegex.test(attach.fileType))
                            return <ContainerComponent.Item key={attach._id} >
                                <Preview.Images image={attach.image || 'https://img.freepik.com/free-vector/hand-painted-watercolor-pastel-sky-background_23-2148902771.jpg'} alt={'background'}>
                                </Preview.Images>
                            </ContainerComponent.Item>
                        return;
                    })}
                </ContainerComponent.Flex>
            </ContainerComponent.Pane>
            {/* {Like, Dislike} */}
            <ContainerComponent.Pane className="post__footer" style={{
                background: '#EEF5EB',
                boxShadow: '1px 1px .5px solid #000'
            }}>
                <ContainerComponent.GridThreeColumns>
                    <ContainerComponent.Item>
                        <Text.MiddleLine>
                            <Icon.CircleIcon
                                onClick={() => {

                                }}
                                style={{
                                    marginRight: '10px'
                                }}>
                                <FaThumbsUp />
                            </Icon.CircleIcon>
                            {postFooter.like}
                        </Text.MiddleLine>
                    </ContainerComponent.Item>
                    <ContainerComponent.Item>
                        <Text.CenterLine>
                            <Icon.CircleIcon style={{
                                marginRight: '10px'
                            }}>
                                <FaThumbsDown />
                            </Icon.CircleIcon>
                            {postFooter.dislike}
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
            {openComment && <Comment commentLogs={postFooter.comment}></Comment>}
        </ContainerComponent.Section>
    );
}
