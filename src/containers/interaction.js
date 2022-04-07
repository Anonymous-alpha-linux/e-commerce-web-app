import React, { useRef, useState, useEffect } from 'react'
import { Text, Icon } from '../components';
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";
import { useAuthorizationContext } from '../redux';

function Interaction({ like, dislike, likedAccounts, dislikedAccounts, isLiked, isDisliked, entity, interactLoader, children, ...props }) {
    const { user } = useAuthorizationContext();

    // const interactLoaderRef = useRef(interactLoader);
    const checkedHandler = async (e) => {
        if (e.target.name === "like") {
            likeHandler();
        }
        if (e.target.name === "dislike") {
            dislikeHandler();
        }
    };
    const likeHandler = () => {
        interactLoader({
            ...entity,
            like: !isLiked ? like + 1 : like - 1,
            dislike: isDisliked ? dislike - 1 : dislike,
            likedAccounts: !isLiked ? [...likedAccounts, user.accountId] : likedAccounts.filter(acc => acc !== user.accountId),
            dislikedAccounts: isDisliked ? dislikedAccounts.filter(acc => acc !== user.accountId) : dislikedAccounts,
            liked: !isLiked,
            disliked: false,
        });
    }
    const dislikeHandler = () => {
        interactLoader({
            ...entity,
            like: isLiked ? like - 1 : like,
            dislike: !isDisliked ? dislike + 1 : dislike - 1,
            likedAccounts: isLiked ? likedAccounts.filter(acc => acc !== user.accountId) : likedAccounts,
            dislikedAccounts: !isDisliked ? [...dislikedAccounts, user.accountId] : dislikedAccounts.filter(acc => acc !== user.accountId),
            liked: false,
            disliked: !isDisliked,
        });
    }
    // useEffect(() => {
    //     interactLoaderRef.current = interactLoader;
    // }, [interactLoader]);
    return (
        <Text.Line className="interacts">
            <Text.MiddleLine className="like">
                {/* <input
                    type="checkbox"
                    name="like"
                    id={`like - ${props._id} `}
                    value={isLiked}
                    onChange={checkedHandler}
                    style={{ display: "none" }}
                ></input> */}
                <Icon.CircleIcon
                    className="likeIcon"
                    style={{ marginRight: "5px" }}
                    onClick={() => {
                        // document.getElementById(`like - ${props._id} `).click();
                        likeHandler();
                    }}
                >
                    <FaThumbsUp
                        stroke="#163D3C"
                        strokeWidth={20}
                        style={{
                            fill: `${isLiked ? "#163D3C" : "transparent"} `,
                            position: "absolute",
                            top: "50%",
                            transform: "translate(-50%,-50%)",
                            left: "50%",
                        }}
                    />
                </Icon.CircleIcon>
                {like}
            </Text.MiddleLine>

            <Text.MiddleLine className="dislike" style={{ margin: "0 10px" }}>
                {/* <input
                    type="checkbox"
                    name="dislike"
                    id={`dislike ${props._id}`}
                    value={isDisliked}
                    onChange={checkedHandler}
                    style={{ display: "none" }}
                ></input> */}
                <Icon.CircleIcon
                    className="dislikeIcon"
                    style={{ marginRight: "5px" }}
                    onClick={() => {
                        // document.getElementById(`dislike ${props._id} `).click();
                        dislikeHandler();
                    }}
                >
                    <FaThumbsDown
                        stroke="#163D3C"
                        strokeWidth={20}
                        style={{
                            fill: `${isDisliked ? "#163D3C" : "transparent"} `,
                            position: "absolute",
                            top: "50%",
                            transform: "translate(-50%,-50%)",
                            left: "50%",
                        }}
                    />
                </Icon.CircleIcon>
                {dislike}
            </Text.MiddleLine>
            <Text.MiddleLine className="another__container">
                {children}
            </Text.MiddleLine>
        </Text.Line>
    )
}

export default Interaction