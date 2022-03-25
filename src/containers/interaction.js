import React, { useRef, useState, useEffect } from 'react'
import { Text, Icon } from '../components';
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";
import { useAuthorizationContext } from '../redux';

function Interaction({ like, dislike, likedAccounts, dislikedAccounts, entity, interactLoader, children, ...props }) {
    const { user } = useAuthorizationContext();
    const [interact, setInteract] = useState({
        liked: !!likedAccounts.find((acc) => acc === user.accountId),
        disliked: !!dislikedAccounts.find((acc) => acc === user.accountId),
        ...entity,
    });
    const interactLoaderRef = useRef(interactLoader);
    // const isFirstRender = useRef(true);
    const checkedHandler = async (e) => {
        if (e.target.name === "like") {
            setInteract({
                ...interact,
                liked: !interact.liked,
                disliked: interact.disliked && false,
            });
            interactLoaderRef.current({
                ...interact,
                liked: !interact.liked,
                disliked: interact.disliked && false,
            });
        }
        if (e.target.name === "dislike") {
            setInteract({
                ...interact,
                disliked: !interact.disliked,
                liked: interact.liked && false,
            });
            interactLoaderRef.current({
                ...interact,
                disliked: !interact.disliked,
                liked: interact.liked && false,
            })
        }
    };
    useEffect(() => {
        interactLoaderRef.current = interactLoader;
    }, [interactLoader]);
    // useEffect(() => {
    //     isFirstRender.current = false;
    // }, []);
    // useEffect(() => {
    //     if (!isFirstRender.current) {
    //         interactLoaderRef.current(interact);
    //     }
    // }, [interact]);
    return (
        <Text.Line className="interacts">
            <Text.MiddleLine className="like">
                <input
                    type="checkbox"
                    name="like"
                    id={`like - ${props._id} `}
                    value={interact.liked}
                    onChange={checkedHandler}
                    style={{ display: "none" }}
                ></input>
                <Icon.CircleIcon
                    className="likeIcon"
                    onClick={() => {
                        document.getElementById(`like - ${props._id} `).click();
                    }}
                >
                    <FaThumbsUp
                        stroke="#000"
                        strokeWidth={20}
                        style={{
                            fill: `${interact.liked ? "blue" : "transparent"} `,
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
                <input
                    type="checkbox"
                    name="dislike"
                    id={`dislike ${props._id} `}
                    value={interact.disliked}
                    onChange={checkedHandler}
                    style={{ display: "none" }}
                ></input>
                <Icon.CircleIcon
                    className="dislikeIcon"
                    onClick={() => {
                        document.getElementById(`dislike ${props._id} `).click();
                    }}
                >
                    <FaThumbsDown
                        stroke="#000"
                        strokeWidth={20}
                        style={{
                            fill: `${interact.disliked ? "blue" : "transparent"} `,
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