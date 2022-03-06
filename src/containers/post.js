import React, { useState, useRef } from "react";
import { ContainerComponent, Icon, Text, Preview, Dropdown } from "../components";
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";

// import { IoEarth } from "react-icons/io5";
import { IoIosArrowDown } from 'react-icons/io';
import { Comment, DropDownButton, GridPreview } from ".";
import { useAuthorizationContext, usePostContext } from "../redux";
import { Link } from "react-router-dom";

export default function Post({ postHeader, postBody, postFooter, removeIdea }) {
    const [openComment, setOpenComment] = useState(false);
    const { user } = useAuthorizationContext();
    const { interactPost } = usePostContext();
    const date = `${new Date(postHeader.date).getHours()}:${new Date(postHeader.date).getMinutes()}`;

    const isFirstRender = useRef(true);
    const interactRef = useRef(interactPost);

    const [interact, setInteract] = useState({
        liked: postFooter.isLiked,
        disliked: postFooter.isDisliked
    })

    const checkedHandler = async (e) => {
        const isChecked = e.target.checked;
        if (e.target.name === 'like') {
            setInteract({
                ...interact,
                liked: !interact.liked,
                disliked: interact.disliked && false,
            });
        }
        if (e.target.name === 'dislike') {
            setInteract({
                ...interact,
                disliked: !interact.disliked,
                liked: interact.liked && false
            });
        }
    }

    React.useEffect(() => {
        if (!isFirstRender.current) {
            interactRef.current(postHeader.id, 'rate', interact, () => { });
        }
    }, [interact]);

    React.useEffect(() => {
        isFirstRender.current = false;
    }, []);

    React.useEffect(() => {
        interactRef.current = interactPost;
    }, [interactRef]);

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
                        {/* <Text>
                            <IoEarth />
                        </Text> */}
                    </ContainerComponent.Flex>
                </ContainerComponent.InlineGroup>
                {user.accountId === postHeader.postAuthor && <Text.RightLine>
                    <DropDownButton component={<IoIosArrowDown></IoIosArrowDown>}>
                        <Dropdown.Item>
                            <Link to={`/portal/idea/${postHeader.id}`}>
                                <Text>
                                    Edit
                                </Text>
                            </Link>
                        </Dropdown.Item>
                        <Dropdown.Item>
                            <Text onClick={removeIdea}>
                                Delete
                            </Text>
                        </Dropdown.Item>
                    </DropDownButton>
                </Text.RightLine>}
            </ContainerComponent.Pane>
            <ContainerComponent.Pane className="post__body">
                <Text.Paragraph>
                    {postBody.content}
                </Text.Paragraph>
                {/* <ContainerComponent.Flex>
                    {postBody.attachment.map(attach => {
                        const imageRegex = new RegExp("image/*");
                        if (imageRegex.test(attach.fileType))
                            return <ContainerComponent.Item key={attach._id} >
                                <Preview.Images image={attach.image || 'https://img.freepik.com/free-vector/hand-painted-watercolor-pastel-sky-background_23-2148902771.jpg'} alt={'background'}>
                                </Preview.Images>
                            </ContainerComponent.Item>
                        return;
                    })}
                </ContainerComponent.Flex> */}
                {postBody.attachment.length && <GridPreview files={postBody.attachment}></GridPreview>}

            </ContainerComponent.Pane>
            {/* {Like, Dislike} */}
            <ContainerComponent.Pane className="post__footer" style={{
                background: '#EEF5EB',
                boxShadow: '1px 1px .5px solid #000'
            }}>
                <ContainerComponent.GridThreeColumns>
                    <ContainerComponent.Item>
                        <Text.MiddleLine>
                            <input type='checkbox'
                                name="like"
                                id={`like ${postHeader.id}`}
                                value={interact.liked}
                                onChange={checkedHandler}
                                style={{ display: 'none' }}></input>
                            <Icon.CircleIcon
                                onClick={() => { document.getElementById(`like ${postHeader.id}`).click() }}
                                style={{
                                    marginRight: '10px',
                                    color: '#fff',
                                    position: 'relative',
                                }}>
                                <FaThumbsUp stroke='#000'
                                    strokeWidth={20}
                                    style={{
                                        fill: `${interact.liked ? 'blue' : 'transparent'}`,
                                        position: "absolute",
                                        top: '50%',
                                        transform: 'translate(-50%,-50%)',
                                        left: '50%'
                                    }} />
                            </Icon.CircleIcon>
                            {postFooter.like}
                        </Text.MiddleLine>
                    </ContainerComponent.Item>
                    <ContainerComponent.Item>
                        <Text.MiddleLine>
                            <input type='checkbox'
                                name="dislike"
                                id={`dislike ${postHeader.id}`}
                                value={interact.disliked}
                                onChange={checkedHandler}
                                style={{ display: 'none' }}></input>
                            <Text.CenterLine>
                                <Icon.CircleIcon
                                    onClick={() => { document.getElementById(`dislike ${postHeader.id}`).click() }}
                                    style={{
                                        marginRight: '10px',
                                        color: '#fff',
                                        position: 'relative',
                                    }}>
                                    <FaThumbsDown stroke='#000' strokeWidth={20} style={{
                                        fill: `${interact.disliked ? 'blue' : 'transparent'}`,
                                        position: "absolute",
                                        top: '50%',
                                        transform: 'translate(-50%,-50%)',
                                        left: '50%'
                                    }} />
                                </Icon.CircleIcon>
                                {postFooter.dislike}
                            </Text.CenterLine>
                        </Text.MiddleLine>
                    </ContainerComponent.Item>
                    <ContainerComponent.Item onClick={() => setOpenComment(!openComment)}>
                        <Text.AbsoluteMiddle>
                            <Text.CenterLine>
                                Comment
                            </Text.CenterLine>
                        </Text.AbsoluteMiddle>
                    </ContainerComponent.Item>
                </ContainerComponent.GridThreeColumns>
            </ContainerComponent.Pane>
            {
                openComment && <Comment
                    postId={postHeader.id}
                    commentLogs={postFooter.comment}></Comment>
            }
        </ContainerComponent.Section>
    );
}
